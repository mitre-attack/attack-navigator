import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { forkJoin, from, Observable } from 'rxjs';
import { Asset, Campaign, DataComponent, Group, Software, Matrix, Technique, Mitigation, Note, DetectionStrategy } from '../classes/stix';
import { TaxiiConnect, Collection } from '../utils/taxii2lib';
import { Domain, Version, VersionChangelog } from '../classes';
import { ConfigService } from './config.service';
import * as globals from '../utils/globals';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        console.debug('initializing data service');
        if (configService.versions?.enabled) {
            // parse versions structure from configuration file
            // support for workbench integration, taxii and custom data
            this.setUpDomains(configService.versions.entries);
        }
        if (configService.collectionIndex) {
            // parse versions from collection index
            this.parseCollectionIndex(configService.collectionIndex);
        }
        this.versions.sort((a, b) => (+a.number > +b.number ? -1 : 1));
        this.latestVersion = this.versions[0];
    }

    public domain_backwards_compatibility = {
        'mitre-enterprise': 'enterprise-attack',
        'mitre-mobile': 'mobile-attack',
    };
    public domains: Domain[] = [];
    public versions: Version[] = [];
    public latestVersion: Version; // set in constructor

    // Observable for data
    private domainData$: Observable<Object>;

    /**
     * Callback functions passed to this function will be called after data is loaded
     * @param {string} domainVersionID the ID of the domain and version to load
     * @param {*} callback callback function to call when data is done loading
     */
    public onDataLoad(domainVersionID, callback) {
        this.getDomain(domainVersionID).dataLoadedCallbacks.push(callback);
    }

    /**
     * Parse the given stix bundles into the relevant data holders
     * @param domain
     * @param stixBundles
     */
    public parseBundles(domain: Domain, stixBundles: any[]): void {
        let platforms = new Set<string>();
        let seenIDs = new Set<string>();
        let matrixSDOs = [];
        let idToTacticSDO = new Map<string, any>();
        let matrixToTechniqueSDOs = new Map<string, any[]>();
        for (let bundle of stixBundles) {
            let techniqueSDOs = [];
            let bundleMatrices = [];
            let idToTechniqueSDO = new Map<string, any>();
            let analyticSDOs = [];
            // iterate through stix domain objects in the bundle
            for (let sdo of bundle.objects) {
                // filter out duplicates, except for matrices
                // which are needed to properly build the datatables
                if (sdo.type != 'x-mitre-matrix') {
                    if (seenIDs.has(sdo.id)) continue;
                    seenIDs.add(sdo.id);
                }

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
                    case 'x-mitre-detection-strategy':
                        domain.detectionStrategies.push(new DetectionStrategy(sdo, this));
                        break;
                    case 'x-mitre-analytic':
                        analyticSDOs.push(sdo);
                        break;
                    case 'course-of-action':
                        domain.mitigations.push(new Mitigation(sdo, this));
                        break;
                    case 'relationship':
                        this.parseRelationship(sdo, domain);
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
                        bundleMatrices.push(sdo);
                        break;
                    case 'note':
                        domain.notes.push(new Note(sdo));
                        break;
                }
            }

            // create techniques
            this.createTechniques(techniqueSDOs, idToTechniqueSDO, domain);

            // create map of matrices to techniques
            for (let matrixSDO of bundleMatrices) {
                if (!matrixToTechniqueSDOs.get(matrixSDO.id)) {
                    matrixToTechniqueSDOs.set(matrixSDO.id, techniqueSDOs);
                } else {
                    matrixToTechniqueSDOs.get(matrixSDO.id).push(...techniqueSDOs);
                }
            }

            // parse platforms
            this.parsePlatforms(domain).forEach(platforms.add, platforms);

            // build data component to techniques map
            if (domain.detectionStrategies && analyticSDOs.length && domain.relationships.detection_strategies_detect) {
                this.buildDataComponentToTechniquesMap(domain, analyticSDOs);
            }
        }

        // create matrices
        this.createMatrices(matrixSDOs, idToTacticSDO, matrixToTechniqueSDOs, domain);

        domain.platforms = Array.from(platforms); // convert to array

        // data loading complete; update watchers
        domain.dataLoaded = true;
        domain.executeCallbacks();
    }

    /**
     * Creates techniques and sub-techniques from the given technique SDOs
     * @param techniqueSDOs list of parent-level technique SDOs to create
     * @param idToTechniqueSDO map of all technique IDs to SDOs (incl. sub-techniques)
     * @param domain the domain to add the techniques to
     */
    public createTechniques(techniqueSDOs: any, idToTechniqueSDO: Map<string, any>, domain: Domain): void {
        for (let techniqueSDO of techniqueSDOs) {
            let subtechniques: Technique[] = [];
            if (this.configService.subtechniquesEnabled) {
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
    }

    /**
     * Creates the matrices, which also creates its tactics and filters the techniques
     * @param matricesList list of matrix SDOs to create
     * @param tacticsList list of tactic SDOs
     * @param domain the domain to add the matrix/tactics to
     */
    public createMatrices(matrixSDOs: any[], idToTacticSDO: Map<string, any>, matrixToTechniqueSDOs, domain: Domain): void {
        let createdMatrixIDs = [];
        for (let matrixSDO of matrixSDOs) {
            // check if matrix was already created
            if (createdMatrixIDs.includes(matrixSDO.id)) continue;

            // check if matrix is deprecated
            if (matrixSDO.x_mitre_deprecated) continue;

            // retrieve relevant matrix techniques
            let techniqueSDOs = matrixToTechniqueSDOs.get(matrixSDO.id);
            let techniqueIDs = techniqueSDOs.map((t) => t.id);
            let techniques = domain.techniques.filter((t) => techniqueIDs.includes(t.id));
            domain.matrices.push(new Matrix(matrixSDO, idToTacticSDO, techniques, this));

            // add to list of created matrices
            createdMatrixIDs.push(matrixSDO.id);
        }
    }

    /**
     * Extracts the set of platforms from the list of techniques
     * in the given domain
     * @param domain the domain for which to parse the platforms
     * @returns the set of platforms found
     */
    public parsePlatforms(domain: Domain): Set<string> {
        let platforms = new Set<string>();
        let allTechniques = domain.techniques.concat(domain.subtechniques);

        // parse platforms
        allTechniques.forEach((technique) => {
            if (!technique.deprecated && !technique.revoked) {
                technique.platforms?.forEach(platforms.add, platforms);
            }
        });

        return platforms;
    }

    public buildDataComponentToTechniquesMap(domain: Domain, analytics: any[]) {
        for (let det of domain.detectionStrategies) {
            let techniqueRefs = domain.relationships.detection_strategies_detect.get(det.id);
            let techniqueRef = techniqueRefs.length > 0 ? techniqueRefs[0] : undefined; // should only be one
            const technique = domain.getTechniqueById(techniqueRef);
            if (!technique) continue; // no technique found, skip
            for (let analytic_ref of det.analyticRefs) {
                let analytic = analytics.find(an => an.id === analytic_ref);
                let dataComponentRefs = analytic?.x_mitre_log_source_references?.map(
                    logSource => logSource.x_mitre_data_component_ref
                ) ?? []; // handle optional field
                this.addTechniqueToDataComponents(domain, dataComponentRefs, technique);
            }
        }
    }

    public addTechniqueToDataComponents(domain: Domain, dataComponentRefs: string[], technique: Technique) {
        for (let dataComponentRef of dataComponentRefs) {
            if (!domain.dataComponentsToTechniques.has(dataComponentRef)) {
                domain.dataComponentsToTechniques.set(dataComponentRef, []);
            }
            const techniqueList = domain.dataComponentsToTechniques.get(dataComponentRef);
            if (techniqueList.some(t => t.id === technique.id)) continue; // technique already added
            techniqueList.push(technique);
        }
    }

    /**
     * Parses the given SRO into the domain relationship map
     * @param sro the SRO to parse
     * @param domain the domain to add the relationship to
     */
    public parseRelationship(sro: any, domain: Domain): void {
        // for existing keys, add the given value to the list of values
        // otherwise, add the key with the value as the first item in the list
        let addRelationshipToMap = function (map, key, value) {
            if (map.has(key)) map.get(key).push(value);
            else map.set(key, [value]);
        };

        switch (sro.relationship_type) {
            case 'subtechnique-of':
                if (!this.configService.subtechniquesEnabled) return;
                // record subtechnique:technique relationship
                addRelationshipToMap(domain.relationships['subtechniques_of'], sro.target_ref, sro.source_ref);
                break;
            case 'uses':
                if (sro.source_ref.startsWith('intrusion-set') && sro.target_ref.startsWith('attack-pattern')) {
                    // record group:technique relationship
                    addRelationshipToMap(domain.relationships['group_uses'], sro.source_ref, sro.target_ref);
                } else if (
                    (sro.source_ref.startsWith('malware') || sro.source_ref.startsWith('tool')) &&
                    sro.target_ref.startsWith('attack-pattern')
                ) {
                    // record software:technique relationship
                    addRelationshipToMap(domain.relationships['software_uses'], sro.source_ref, sro.target_ref);
                } else if (sro.source_ref.startsWith('campaign') && sro.target_ref.startsWith('attack-pattern')) {
                    // record campaign:technique relationship
                    addRelationshipToMap(domain.relationships['campaign_uses'], sro.source_ref, sro.target_ref);
                }
                break;
            case 'mitigates':
                // record mitigation:technique relationship
                addRelationshipToMap(domain.relationships['mitigates'], sro.source_ref, sro.target_ref);
                break;
            case 'revoked-by':
                // record stix object: stix object relationship
                domain.relationships['revoked_by'].set(sro.source_ref, sro.target_ref);
                break;
            case 'detects':
                if (sro.source_ref.startsWith('x-mitre-data-component')) {
                    // backwards compatibility for old data component detects techniques
                    // record data component: technique relationship
                    addRelationshipToMap(domain.relationships['component_rel'], sro.source_ref, sro.target_ref);
                } else if (sro.source_ref.startsWith('x-mitre-detection-strategy')) {
                    // record detection strategy: technique relationship
                    addRelationshipToMap(domain.relationships['detection_strategies_detect'], sro.source_ref, sro.target_ref);
                }
                break;
            case 'attributed-to':
                // record campaign:group relationship
                addRelationshipToMap(domain.relationships['campaigns_attributed_to'], sro.target_ref, sro.source_ref);
                break;
            case 'targets':
                // record technique:asset relationship
                addRelationshipToMap(domain.relationships['targeted_assets'], sro.target_ref, sro.source_ref);
                break;
        }
    }

    /**
     * Set up the URLs for domains in the list defined in the config file
     * @param {versions} list of versions and domains
     */
    public setUpDomains(versions: any[]) {
        versions.forEach((version: any) => {
            let v = this.addVersion(version['name'], version['version'].match(/\d+/g)[0]);
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
    }

    /**
     * Parses the collection index for domains/versions
     * @param collectionIndex the collection index
     */
    public parseCollectionIndex(collectionIndex: any) {
        for (let collection of collectionIndex.collections) {
            let domainIdentifier = this.getDomainIdentifier(collection.name);

            // only most recent minor versions of a major release
            let minorVersionMap = collection.versions.reduce((acc, version) => {
                const [major, minor] = version.version.split('.').map(Number);
                if (!acc[major] || acc[major].minor < minor) {
                    acc[major] = { version: version.version, url: version.url };
                }
                return acc;
            }, {});
            let versions: Array<{ version: string; url: string }> = Object.values(minorVersionMap);

            for (let version of versions) {
                let versionNumber = version.version.split('.')[0]; // major version only
                let versionName = `${collectionIndex.name} v${versionNumber}`;
                if (+versionNumber < +globals.minimumSupportedVersion) {
                    console.debug(`version ${versionNumber} is not supported, skipping ${collection.name} v${versionNumber}`);
                    continue;
                }
                // create version & domain
                let v = this.addVersion(versionName, versionNumber);
                this.domains.push(new Domain(domainIdentifier, collection.name, v, [version.url]));
            }
        }
    }

    /**
     * Retrieves the domain identifier from the domain name
     * Helper function for parseCollectionIndex()
     * @param domainName the name of the domain
     * @returns the domain identifier (e.g. 'enterprise-attack')
     */
    public getDomainIdentifier(domainName: string): string {
        return domainName.replace(/ /g, '-').replace(/&/g, 'a').toLowerCase();
    }

    /**
     * Adds a new version to the list of versions, checking if
     * one already exists.
     * @param versionName the name of the version
     * @param versionNumber the version number
     * @returns the existing or created Version object
     */
    public addVersion(versionName: string, versionNumber: string): Version {
        // check if version already exists
        let existingVersion = this.versions.find((v) => v.name === versionName && v.number === versionNumber);
        if (!existingVersion) {
            // create and add new version
            let version = new Version(versionName, versionNumber);
            this.versions.push(version);
            return version;
        }
        return existingVersion;
    }

    /**
     * Fetch the domain data from the endpoint
     */
    public getDomainData(domain: Domain, refresh: boolean = false): Observable<Object> {
        if (domain.taxii_collection && domain.taxii_url) {
            console.debug('fetching data from TAXII server');
            let conn = new TaxiiConnect(domain.taxii_url, '', '');
            let collectionInfo: any = {
                id: domain.taxii_collection,
                title: domain.name,
                description: '',
                can_read: true,
                can_write: false,
            };
            const collection = new Collection(collectionInfo, domain.taxii_url, conn);
            this.domainData$ = forkJoin(from(collection.getObjects('', undefined)));
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
            this.domainData$ = forkJoin(bundleData);
        }
        return this.domainData$;
    }

    /**
     * Load and parse domain data
     */
    public loadDomainData(domainVersionID: string, refresh: boolean = false): Promise<any> {
        let dataPromise: Promise<any> = new Promise((resolve, reject) => {
            let domain = this.getDomain(domainVersionID);
            if (domain) {
                if (domain.dataLoaded && !refresh) resolve(null);
                let subscription;
                subscription = this.getDomainData(domain, refresh).subscribe({
                    next: (data: Object[]) => {
                        this.parseBundles(domain, data);
                        resolve(null);
                    },
                    complete: () => {
                        if (subscription) subscription.unsubscribe();
                    }, //prevent memory leaks
                });
            } else if (!domain) {
                // domain not defined in config
                reject(new Error("'" + domainVersionID + "' is not a valid domain & version."));
            }
        });
        return dataPromise;
    }

    /**
     * Get domain object by domain ID
     */
    public getDomain(domainVersionID: string): Domain {
        return this.domains.find((d) => d.id === domainVersionID);
    }

    /**
     * Get the ID from domain name & version
     */
    public getDomainVersionID(domain: string, versionNumber: string): string {
        if (!versionNumber) {
            // layer with no specified version defaults to current version
            versionNumber = this.versions[0].number;
        }
        return domain + '-' + versionNumber;
    }

    /**
     * Retrieve the technique object with the given attackID in the given domain/version
     */
    public getTechnique(attackID: string, domainVersionID: string) {
        let domain = this.getDomain(domainVersionID);
        let all_techniques = domain.techniques.concat(domain.subtechniques);
        return all_techniques.find((t) => t.attackID == attackID);
    }

    /**
     * Is the given version supported?
     */
    public isSupported(version: string) {
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
                if (latestTechnique.deprecated || latestTechnique.revoked) {
                    // object doesn't exist in previous version, but is deprecated or revoked
                    // in the latest version
                    // this case is unlikely to occur and indicates that something has
                    // gone wrong in the data, such as the case in which a sub-technique
                    // was deprecated, had its ties erroneously severed with its parent
                    // and therefore, cannot be parsed correctly
                    continue;
                }

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
