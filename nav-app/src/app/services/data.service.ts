import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Asset, Campaign, Domain, DataComponent, Group, Software, Matrix, Technique, Mitigation, Note } from '../classes/stix';
import { TaxiiConnect, Collection } from '../utils/taxii2lib';
import { Version, VersionChangelog } from '../classes';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    public subscription;
    constructor(private http: HttpClient) {
        console.debug('initializing data service');
        this.subscription = this.getConfig().subscribe({
            next: (config) => {
                this.setUpURLs(config['versions']);
            },
            complete: () => {
                if (this.subscription) this.subscription.unsubscribe();
            }, //prevent memory leaks
        });
    }

    public domain_backwards_compatibility = {
        'mitre-enterprise': 'enterprise-attack',
        'mitre-mobile': 'mobile-attack',
    };
    public domains: Domain[] = [];
    public versions: Version[] = [];

    public subtechniquesEnabled: boolean = true;

    /**
     * Callback functions passed to this function will be called after data is loaded
     * @param {string} domainVersionID the ID of the domain and version to load
     * @param {*} callback callback function to call when data is done loading
     */
    public onDataLoad(domainVersionID, callback) {
        this.getDomain(domainVersionID).dataLoadedCallbacks.push(callback);
    }

    /**
     * Parse the given stix bundle into the relevant data holders
     * @param domain
     * @param stixBundles
     */
    parseBundle(domain: Domain, stixBundles: any[]): void {
        let platforms = new Set<string>();
        let seenIDs = new Set<string>();
        for (let bundle of stixBundles) {
            let techniqueSDOs = [];
            let matrixSDOs = [];
            let idToTechniqueSDO = new Map<string, any>();
            let idToTacticSDO = new Map<string, any>();
            for (let sdo of bundle.objects) {
                //iterate through stix domain objects in the bundle
                // Filter out object not included in this domain if domains field is available
                if (!domain.isCustom) {
                    if ('x_mitre_domains' in sdo && sdo.x_mitre_domains.length > 0 && !sdo.x_mitre_domains.includes(domain.domain_identifier))
                        continue;
                }

                // filter out duplicates
                if (!seenIDs.has(sdo.id)) seenIDs.add(sdo.id);
                else continue;

                // parse according to type
                switch (sdo.type) {
                    case 'x-mitre-data-component':
                        domain.dataComponents.push(new DataComponent(sdo, this));
                        break;
                    case 'x-mitre-data-source':
                        domain.dataSources.set(sdo.id, { name: sdo.name, external_references: sdo.external_references });
                        break;
                    case 'intrusion-set':
                        domain.groups.push(new Group(sdo, this));
                        break;
                    case 'malware':
                    case 'tool':
                        domain.software.push(new Software(sdo, this));
                        break;
                    case 'campaign':
                        domain.campaigns.push(new Campaign(sdo, this));
                        break;
                    case 'x-mitre-asset':
                        domain.assets.push(new Asset(sdo, this));
                        break;
                    case 'course-of-action':
                        domain.mitigations.push(new Mitigation(sdo, this));
                        break;
                    case 'relationship':
                        if (sdo.relationship_type == 'subtechnique-of' && this.subtechniquesEnabled) {
                            // record subtechnique:technique relationship
                            if (domain.relationships['subtechniques_of'].has(sdo.target_ref)) {
                                let ids = domain.relationships['subtechniques_of'].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                domain.relationships['subtechniques_of'].set(sdo.target_ref, [sdo.source_ref]);
                            }
                        } else if (sdo.relationship_type == 'uses') {
                            if (sdo.source_ref.startsWith('intrusion-set') && sdo.target_ref.startsWith('attack-pattern')) {
                                // record group:technique relationship
                                if (domain.relationships['group_uses'].has(sdo.source_ref)) {
                                    let ids = domain.relationships['group_uses'].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    domain.relationships['group_uses'].set(sdo.source_ref, [sdo.target_ref]);
                                }
                            } else if (
                                (sdo.source_ref.startsWith('malware') || sdo.source_ref.startsWith('tool')) &&
                                sdo.target_ref.startsWith('attack-pattern')
                            ) {
                                // record software:technique relationship
                                if (domain.relationships['software_uses'].has(sdo.source_ref)) {
                                    let ids = domain.relationships['software_uses'].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    domain.relationships['software_uses'].set(sdo.source_ref, [sdo.target_ref]);
                                }
                            } else if (sdo.source_ref.startsWith('campaign') && sdo.target_ref.startsWith('attack-pattern')) {
                                // record campaign:technique relationship
                                if (domain.relationships['campaign_uses'].has(sdo.source_ref)) {
                                    let ids = domain.relationships['campaign_uses'].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    domain.relationships['campaign_uses'].set(sdo.source_ref, [sdo.target_ref]);
                                }
                            }
                        } else if (sdo.relationship_type == 'mitigates') {
                            if (domain.relationships['mitigates'].has(sdo.source_ref)) {
                                let ids = domain.relationships['mitigates'].get(sdo.source_ref);
                                ids.push(sdo.target_ref);
                            } else {
                                domain.relationships['mitigates'].set(sdo.source_ref, [sdo.target_ref]);
                            }
                        } else if (sdo.relationship_type == 'revoked-by') {
                            // record stix object: stix object relationship
                            domain.relationships['revoked_by'].set(sdo.source_ref, sdo.target_ref);
                        } else if (sdo.relationship_type === 'detects') {
                            if (domain.relationships['component_rel'].has(sdo.source_ref)) {
                                let ids = domain.relationships['component_rel'].get(sdo.source_ref);
                                ids.push(sdo.target_ref);
                            } else {
                                domain.relationships['component_rel'].set(sdo.source_ref, [sdo.target_ref]);
                            }
                        } else if (sdo.relationship_type == 'attributed-to') {
                            // record campaign:group relationship
                            if (domain.relationships['campaigns_attributed_to'].has(sdo.target_ref)) {
                                let ids = domain.relationships['campaigns_attributed_to'].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                domain.relationships['campaigns_attributed_to'].set(sdo.target_ref, [sdo.source_ref]); // group -> [campaigns]
                            }
                        } else if (sdo.relationship_type == 'targets') {
                            // record technique:asset relationship
                            if (domain.relationships['targeted_assets'].has(sdo.target_ref)) {
                                let ids = domain.relationships['targeted_assets'].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                domain.relationships['targeted_assets'].set(sdo.target_ref, [sdo.source_ref]); // asset -> [techniques]
                            }
                        }
                        break;
                    case 'attack-pattern':
                        idToTechniqueSDO.set(sdo.id, sdo);
                        if (!sdo.x_mitre_is_subtechnique) {
                            techniqueSDOs.push(sdo);
                        }
                        break;
                    case 'x-mitre-tactic':
                        idToTacticSDO.set(sdo.id, sdo);
                        break;
                    case 'x-mitre-matrix':
                        matrixSDOs.push(sdo);
                        break;
                    case 'note':
                        domain.notes.push(new Note(sdo));
                        break;
                }
            }

            //create techniques
            for (let techniqueSDO of techniqueSDOs) {
                let subtechniques: Technique[] = [];
                if (this.subtechniquesEnabled) {
                    if (domain.relationships.subtechniques_of.has(techniqueSDO.id)) {
                        domain.relationships.subtechniques_of.get(techniqueSDO.id).forEach((sub_id) => {
                            if (idToTechniqueSDO.has(sub_id)) {
                                let subtechnique = new Technique(idToTechniqueSDO.get(sub_id), [], this);
                                subtechniques.push(subtechnique);
                                domain.subtechniques.push(subtechnique);
                            }
                            // else the target was revoked or deprecated and we can skip honoring the relationship
                        });
                    }
                }
                domain.techniques.push(new Technique(techniqueSDO, subtechniques, this));
            }

            //create matrices, which also creates tactics and filters techniques
            for (let matrixSDO of matrixSDOs) {
                if (matrixSDO.x_mitre_deprecated) continue;
                domain.matrices.push(new Matrix(matrixSDO, idToTacticSDO, domain.techniques, this));
            }

            // parse platforms
            for (let technique of domain.techniques) {
                if (technique.platforms) {
                    for (let platform of technique.platforms) {
                        platforms.add(platform);
                    }
                }
            }
            for (let subtechnique of domain.subtechniques) {
                for (let platform of subtechnique.platforms) {
                    platforms.add(platform);
                }
            }
        }
        domain.platforms = Array.from(platforms); // convert to array

        // data loading complete; update watchers
        domain.dataLoaded = true;
        for (let callback of domain.dataLoadedCallbacks) {
            callback();
        }
    }

    // Observable for data in config.json
    private configData$: Observable<Object>;

    // Observable for data
    private domainData$: Observable<Object>;

    // URLs in case config file doesn't load properly
    public latestVersion: Version = { name: 'ATT&CK v14', number: '14' };
    public lowestSupportedVersion: Version; // used by tabs component
    public enterpriseAttackURL: string = 'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json';
    public mobileAttackURL: string = 'https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json';
    public icsAttackURL: string = 'https://raw.githubusercontent.com/mitre/cti/master/ics-attack/ics-attack.json';

    /**
     * Set up the URLs for data
     * @param {versions} list of versions and domains defined in the configuration file
     * @memberof DataService
     */
    setUpURLs(versions: any[]) {
        versions.forEach((version: any) => {
            let v: Version = new Version(version['name'], version['version'].match(/\d+/g)[0]);
            this.versions.push(v);
            version['domains'].forEach((domain: any) => {
                let identifier = domain['identifier'];
                let domainObject = new Domain(identifier, domain['name'], v);
                if (version['authentication']) domainObject.authentication = version['authentication'];
                if (domain['taxii_url'] && domain['taxii_collection']) {
                    domainObject.taxii_url = domain['taxii_url'];
                    domainObject.taxii_collection = domain['taxii_collection'];
                } else {
                    domainObject.urls = domain['data'];
                }
                this.domains.push(domainObject);
            });
        });

        if (this.domains.length == 0) {
            // issue loading config
            this.versions.push(this.latestVersion);
            let enterpriseDomain = new Domain('enterprise-attack', 'Enterprise', this.latestVersion, [this.enterpriseAttackURL]);
            let mobileDomain = new Domain('mobile-attack', 'Mobile', this.latestVersion, [this.mobileAttackURL]);
            let icsDomain = new Domain('ics-attack', 'ICS', this.latestVersion, [this.icsAttackURL]);
            this.domains.push(...[enterpriseDomain, mobileDomain, icsDomain]);
        }

        this.lowestSupportedVersion = this.versions[this.versions.length - 1];
    }

    /**
     * get the current config
     * @param {boolean} refresh: if true fetches the config from file. Otherwise, only fetches if it's never been fetched before
     */
    getConfig(refresh: boolean = false) {
        if (refresh || !this.configData$) {
            this.configData$ = this.http.get('./assets/config.json');
        }
        return this.configData$;
    }

    /**
     * Fetch the domain data from the endpoint
     */
    getDomainData(domain: Domain, refresh: boolean = false): Observable<Object> {
        if (domain.taxii_collection && domain.taxii_url) {
            console.debug('fetching data from TAXII server');
            let conn = new TaxiiConnect(domain.taxii_url, '', '', 5000);
            let collectionInfo: any = {
                id: domain.taxii_collection,
                title: domain.name,
                description: '',
                can_read: true,
                can_write: false,
                media_types: ['application/vnd.oasis.stix+json'],
            };
            const collection = new Collection(collectionInfo, domain.taxii_url + 'stix', conn);
            this.domainData$ = Observable.forkJoin(fromPromise(collection.getObjects('', undefined)));
        } else if (refresh || !this.domainData$) {
            console.debug('retrieving data', domain.urls);
            let bundleData = [];
            const httpOptions = {
                headers: undefined,
            };
            if (domain.authentication && domain.authentication.enabled) {
                // include authorization header, if configured (integrations)
                let token = `${domain.authentication.serviceName}:${domain.authentication.apiKey}`;
                httpOptions.headers = new HttpHeaders({ Authorization: 'Basic ' + Buffer.from(token).toString('base64') });
            }
            domain.urls.forEach((url) => {
                bundleData.push(this.http.get(url, httpOptions));
            });
            this.domainData$ = Observable.forkJoin(bundleData);
        }
        return this.domainData$;
    }

    /**
     * Load and parse domain data
     */
    loadDomainData(domainVersionID: string, refresh: boolean = false): Promise<any> {
        let dataPromise: Promise<any> = new Promise((resolve, reject) => {
            let domain = this.getDomain(domainVersionID);
            if (domain) {
                if (domain.dataLoaded && !refresh) resolve(null);
                this.subscription = this.getDomainData(domain, refresh).subscribe({
                    next: (data: Object[]) => {
                        this.parseBundle(domain, data);
                        resolve(null);
                    },
                    complete: () => {
                        if (this.subscription) this.subscription.unsubscribe();
                    }, //prevent memory leaks
                });
            } else if (!domain) {
                // domain not defined in config
                reject("'" + domainVersionID + "' is not a valid domain & version.");
            }
        });
        return dataPromise;
    }

    /**
     * Get domain object by domain ID
     */
    getDomain(domainVersionID: string): Domain {
        return this.domains.find((d) => d.id === domainVersionID);
    }

    /**
     * Get the ID from domain name & version
     */
    getDomainVersionID(domain: string, versionNumber: string): string {
        if (!versionNumber) {
            // layer with no specified version defaults to current version
            versionNumber = this.versions[0].number;
        }
        return domain + '-' + versionNumber;
    }

    /**
     * Retrieve the technique object with the given attackID in the given domain/version
     */
    getTechnique(attackID: string, domainVersionID: string) {
        let domain = this.getDomain(domainVersionID);
        let all_techniques = domain.techniques.concat(domain.subtechniques);
        return all_techniques.find((t) => t.attackID == attackID);
    }

    /**
     * Retrieves the first version defined in the config file
     */
    getCurrentVersion() {
        return this.domains[0].version;
    }

    /**
     * Is the given version supported?
     */
    isSupported(version: string) {
        let supported = this.versions.map((v) => v.number);
        let match = version.match(/\d+/g)[0];
        return supported.includes(match);
    }

    /**
     * Compares techniques between two ATT&CK versions and returns a set of object changes
     * @param oldDomainVersionID imported layer domain & version to upgrade from
     * @param newDomainVersionID latest ATT&CK domain & version to upgrade to
     */
    public compareVersions(oldDomainVersionID: string, newDomainVersionID: string): VersionChangelog {
        let changelog = new VersionChangelog(oldDomainVersionID, newDomainVersionID);
        let oldDomain = this.getDomain(oldDomainVersionID);
        let newDomain = this.getDomain(newDomainVersionID);

        let previousTechniques = oldDomain.techniques.concat(oldDomain.subtechniques);
        let latestTechniques = newDomain.techniques.concat(newDomain.subtechniques);

        // object lookup to increase efficiency
        let objectLookup = new Map<string, Technique>(
            latestTechniques.map((technique) => [technique.id, previousTechniques.find((p) => p.id == technique.id)])
        );

        for (let latestTechnique of latestTechniques) {
            if (!latestTechnique) continue;

            let prevTechnique = objectLookup.get(latestTechnique.id);
            if (!prevTechnique) {
                // object doesn't exist in previous version, added to latest version
                changelog.additions.push(latestTechnique.attackID);
            } else if (latestTechnique.modified == prevTechnique.modified) {
                if (prevTechnique.revoked || prevTechnique.deprecated) {
                    // object is revoked or deprecated, ignore
                    continue;
                } else {
                    // no changes made to the object
                    changelog.unchanged.push(latestTechnique.attackID);
                }
            } else {
                // changes were made to the object
                if (latestTechnique.revoked && !prevTechnique.revoked) {
                    // object was revoked since the previous version
                    changelog.revocations.push(latestTechnique.attackID);
                } else if (latestTechnique.revoked && prevTechnique.revoked) {
                    // both objects are revoked, ignore
                    continue;
                } else if (latestTechnique.deprecated && !prevTechnique.deprecated) {
                    // object was deprecated since the previous version
                    changelog.deprecations.push(latestTechnique.attackID);
                } else if (latestTechnique.deprecated && prevTechnique.deprecated) {
                    // both objects are deprecated, ignore
                    continue;
                } else if (latestTechnique.compareVersion(prevTechnique) != 0) {
                    // version number changed
                    changelog.changes.push(latestTechnique.attackID);
                } else {
                    // minor change
                    changelog.minor_changes.push(latestTechnique.attackID);
                }
            }
        }
        return changelog;
    }
}

export interface ServiceAuth {
    enabled: boolean;
    serviceName: string;
    apiKey: string;
}
