import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { Observable } from "rxjs/Rx";
import { fromPromise } from 'rxjs/observable/fromPromise';
import { TaxiiConnect, Collection } from './taxii2lib';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor(private http: HttpClient) {
        console.log("initializing data service")
        let subscription = this.getConfig().subscribe({
            next: (config) => {
                this.setUpURLs(config["versions"]);
            },
            complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
        })
    }

    public domain_backwards_compatibility = {
        "mitre-enterprise": "enterprise-attack",
        "mitre-mobile": "mobile-attack"
    }

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
    public parseBundle(domain: Domain, stixBundles: any[]): void {
        let platforms = new Set<String>();
        let seenIDs = new Set<String>();
        for (let bundle of stixBundles) {
            let techniqueSDOs = [];
            let matrixSDOs = [];
            let idToTechniqueSDO = new Map<string, any>();
            let idToTacticSDO = new Map<string, any>();
            for (let sdo of bundle.objects) { //iterate through stix domain objects in the bundle
                // Filter out object not included in this domain if domains field is available
                if ("x_mitre_domains" in sdo && sdo.x_mitre_domains.length > 0 && !sdo.x_mitre_domains.includes(domain.domain_identifier)) continue;

                // filter out duplicates
                if (!seenIDs.has(sdo.id)) seenIDs.add(sdo.id)
                else continue;

                // parse according to type
                switch (sdo.type) {
                    case "x-mitre-data-component":
                        domain.dataComponents.push(new DataComponent(sdo, this));
                        break;
                    case "x-mitre-data-source":
                        domain.dataSources.set(sdo.id, { name: sdo.name, external_references: sdo.external_references });
                        break;
                    case "intrusion-set":
                        domain.groups.push(new Group(sdo, this));
                        break;
                    case "malware":
                    case "tool":
                        domain.software.push(new Software(sdo, this));
                        break;
                    case "campaign":
                        domain.campaigns.push(new Campaign(sdo, this));
                        break;
                    case "course-of-action":
                        domain.mitigations.push(new Mitigation(sdo, this));
                        break;
                    case "relationship":
                        if (sdo.relationship_type == "subtechnique-of" && this.subtechniquesEnabled) {
                            // record subtechnique:technique relationship
                            if (domain.relationships["subtechniques_of"].has(sdo.target_ref)) {
                                let ids = domain.relationships["subtechniques_of"].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                domain.relationships["subtechniques_of"].set(sdo.target_ref, [sdo.source_ref])
                            }
                        } else if (sdo.relationship_type == "uses") {
                            if (sdo.source_ref.startsWith("intrusion-set") && sdo.target_ref.startsWith("attack-pattern")) {
                                // record group:technique relationship
                                if (domain.relationships["group_uses"].has(sdo.source_ref)) {
                                    let ids = domain.relationships["group_uses"].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    domain.relationships["group_uses"].set(sdo.source_ref, [sdo.target_ref])
                                }
                            } else if ((sdo.source_ref.startsWith("malware") || sdo.source_ref.startsWith("tool")) && sdo.target_ref.startsWith("attack-pattern")) {
                                // record software:technique relationship
                                if (domain.relationships["software_uses"].has(sdo.source_ref)) {
                                    let ids = domain.relationships["software_uses"].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    domain.relationships["software_uses"].set(sdo.source_ref, [sdo.target_ref])
                                }
                            } else if (sdo.source_ref.startsWith("campaign") && sdo.target_ref.startsWith("attack-pattern")) {
                                // record campaign:technique relationship
                                if (domain.relationships["campaign_uses"].has(sdo.source_ref)) {
                                    let ids = domain.relationships["campaign_uses"].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    domain.relationships["campaign_uses"].set(sdo.source_ref, [sdo.target_ref])
                                }
                            }
                        } else if (sdo.relationship_type == "mitigates") {
                            if (domain.relationships["mitigates"].has(sdo.source_ref)) {
                                let ids = domain.relationships["mitigates"].get(sdo.source_ref);
                                ids.push(sdo.target_ref);
                            } else {
                                domain.relationships["mitigates"].set(sdo.source_ref, [sdo.target_ref])
                            }

                            // Add the inverse so that we can quickly grab all mitigations for a particular technique
                            if (domain.relationships["mitigatedBy"].has(sdo.target_ref)) {
                                let ids = domain.relationships["mitigatedBy"].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                domain.relationships["mitigatedBy"].set(sdo.target_ref, [sdo.source_ref])
                            }

                        } else if (sdo.relationship_type == 'revoked-by') {
                            // record stix object: stix object relationship
                            domain.relationships["revoked_by"].set(sdo.source_ref, sdo.target_ref)
                        } else if (sdo.relationship_type === 'detects') {
                            if (domain.relationships["component_rel"].has(sdo.source_ref)) {
                                let ids = domain.relationships["component_rel"].get(sdo.source_ref);
                                ids.push(sdo.target_ref);
                            } else {
                                domain.relationships["component_rel"].set(sdo.source_ref, [sdo.target_ref])
                            }
                        } else if (sdo.relationship_type == "attributed-to") {
                            if (domain.relationships["campaigns_attributed_to"].has(sdo.target_ref)) {
                                let ids = domain.relationships["campaigns_attributed_to"].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                domain.relationships["campaigns_attributed_to"].set(sdo.target_ref, [sdo.source_ref]); // group -> [campaigns]
                            }
                        }
                        break;
                    case "attack-pattern":
                        idToTechniqueSDO.set(sdo.id, sdo);
                        if (!sdo.x_mitre_is_subtechnique) {
                            techniqueSDOs.push(sdo);
                        }
                        break;
                    case "x-mitre-tactic":
                        idToTacticSDO.set(sdo.id, sdo);
                        break;
                    case "x-mitre-matrix":
                        matrixSDOs.push(sdo);
                        break;
                    case "note":
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
                        })
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
                        platforms.add(platform)
                    }
                }
            }
            for (let subtechnique of domain.subtechniques) {
                for (let platform of subtechnique.platforms) {
                    platforms.add(platform)
                }
            }

            domain.platforms = Array.from(platforms); // convert to array

            // data loading complete; update watchers
            domain.dataLoaded = true;
            for (let callback of domain.dataLoadedCallbacks) {
                callback();
            }
        }
    }

    // Observable for data in config.json
    private configData$: Observable<Object>;

    // Observable for data
    private domainData$: Observable<Object>;

    // URLs in case config file doesn't load properly
    private latestVersion: Version = { name: "ATT&CK v12", number: "12" };
    private enterpriseAttackURL: string = "https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json";
    private mobileAttackURL: string = "https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json";
    private icsAttackURL: string = "https://raw.githubusercontent.com/mitre/cti/master/ics-attack/ics-attack.json";
    private nistEnterpriseAttackURL: string = "https://raw.githubusercontent.com/jonwrobson/attack-control-framework-mappings/master/frameworks/ATT%26CK-v9.0/nist800-53-r5/stix/nist800-53-r5-enterprise-attack.json";

    /**
     * Set up the URLs for data
     * @param {versions} list of versions and domains defined in the configuration file
     * @memberof DataService
     */
    setUpURLs(versions: []) {
        versions.forEach((version: any) => {
            let v: Version = new Version(version["name"], version["version"].match(/[0-9]+/g)[0]);
            this.versions.push(v);
            version["domains"].forEach((domain: any) => {
                let identifier = domain["identifier"];
                let domainObject = new Domain(identifier, domain["name"], v);
                if (version["authentication"]) domainObject.authentication = version["authentication"];
                if (domain["taxii_url"] && domain["taxii_collection"]) {
                    domainObject.taxii_url = domain["taxii_url"];
                    domainObject.taxii_collection = domain["taxii_collection"];
                } else {
                    domainObject.urls = domain["data"];
                }
                this.domains.push(domainObject);
            });
        });

        if (this.domains.length == 0) { // issue loading config
            this.versions.push(this.latestVersion);
            let enterpriseDomain = new Domain("enterprise-attack", "Enterprise", this.latestVersion, [this.enterpriseAttackURL]);
            let mobileDomain = new Domain("mobile-attack", "Mobile", this.latestVersion, [this.mobileAttackURL]);
            let icsDomain = new Domain("ics-attack", "ICS", this.latestVersion, [this.icsAttackURL]);
            this.domains.push(...[enterpriseDomain, mobileDomain, icsDomain]);
        }
    }

    /**
     * get the current config
     * @param {boolean} refresh: if true fetches the config from file. Otherwise, only fetches if it's never been fetched before
     */
    getConfig(refresh: boolean = false) {
        if (refresh || !this.configData$) {
            this.configData$ = this.http.get("./assets/config.json");
        }
        return this.configData$;
    }

    /**
     * Fetch the domain data from the endpoint
     */
    getDomainData(domain: Domain, refresh: boolean = false): Observable<Object> {
        if (domain.taxii_collection && domain.taxii_url) {
            console.log("fetching data from TAXII server");
            let conn = new TaxiiConnect(domain.taxii_url, '', '', 5000);
            let collectionInfo: any = {
                'id': domain.taxii_collection,
                'title': domain.name,
                'description': '',
                'can_read': true,
                'can_write': false,
                'media_types': ['application/vnd.oasis.stix+json']
            }
            const collection = new Collection(collectionInfo, domain.taxii_url + 'stix', conn);
            this.domainData$ = Observable.forkJoin(fromPromise(collection.getObjects('', undefined)));
        } else if (refresh || !this.domainData$) {
            console.log("retrieving data", domain.urls)
            let bundleData = [];
            const httpOptions = {
                headers: undefined
            }
            if (domain.authentication && domain.authentication.enabled) { // include authorization header, if configured (integrations)
                let token = `${domain.authentication.serviceName}:${domain.authentication.apiKey}`;
                httpOptions.headers = new HttpHeaders({ 'Authorization': 'Basic ' + Buffer.from(token).toString('base64') })
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
            if (domain.dataLoaded && !refresh) resolve(null);
            if (domain) {
                let subscription = this.getDomainData(domain, refresh).subscribe({
                    next: (data: Object[]) => {
                        this.parseBundle(domain, data);
                        resolve(null);
                    },
                    complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
                });
            } else if (!domain) { // domain not defined in config
                reject("'" + domainVersionID + "' is not a valid domain & version.")
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
        if (!versionNumber) { // layer with no specified version defaults to current version
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
        return all_techniques.find(t => t.attackID == attackID);
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
        let supported = this.versions.map(v => v.number);
        let match = version.match(/[0-9]+/g)[0];
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
            latestTechniques.map(technique => [technique.id, previousTechniques.find(p => p.id == technique.id)])
        );

        for (let latestTechnique of latestTechniques) {
            if (!latestTechnique) continue;

            let prevTechnique = objectLookup.get(latestTechnique.id);
            if (!prevTechnique) {
                // object doesn't exist in previous version, added to latest version
                changelog.additions.push(latestTechnique.attackID);
            }
            else if (latestTechnique.modified == prevTechnique.modified) {
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
                } else { // minor change
                    changelog.minor_changes.push(latestTechnique.attackID);
                }
            }
        }
        return changelog;
    }
}

/**
 * Common attributes for STIX objects
 */
export abstract class BaseStix {
    public readonly id: string;          // STIX ID
    public readonly attackID: string;    // ATT&CK ID
    public readonly name: string;        // name of object
    public readonly description: string; // description of object
    public readonly url: string;         // URL of object on the ATT&CK website
    public readonly created: string;     // date object was created
    public readonly modified: string;    // date object was last modified
    public readonly revoked: boolean;    // is the object revoked?
    public readonly deprecated: boolean; // is the object deprecated?
    public readonly version: string;     // object version
    protected readonly dataService: DataService;
    constructor(stixSDO: any, dataService: DataService, supportsAttackID = true) {
        this.id = stixSDO.id;
        if (supportsAttackID) {
            if (stixSDO.external_references && stixSDO.external_references[0] && stixSDO.external_references[0].external_id) this.attackID = stixSDO.external_references[0].external_id; else {
                alert('Error: external_references has invalid format in imported BaseStix object (ID: ' + stixSDO.id + ')');
                throw new Error('Error: external_references has invalid format in imported BaseStix object. Read more here: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_72bcfr3t79jx');
            }
        }
        this.name = stixSDO.name;
        this.description = stixSDO.description;
        if (stixSDO.id.includes("x-mitre-data-component")) {
            this.attackID = '';
        } else if (stixSDO.external_references && stixSDO.external_references[0] && stixSDO.external_references[0].external_id) {
            this.attackID = stixSDO.external_references[0].external_id;
        } else {
            alert('Error: external_references has invalid format in imported BaseStix object (ID: ' + stixSDO.id + ')');
            throw new Error('Error: external_references has invalid format in imported BaseStix object. Read more here: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_72bcfr3t79jx');
        }
        if ("external_references" in stixSDO && stixSDO.external_references.length > 0) {
            this.url = stixSDO.external_references[0].url;
        } else {
            this.url = "";
        }
        this.created = stixSDO.created;
        this.modified = stixSDO.modified;
        this.revoked = stixSDO.revoked ? stixSDO.revoked : false;
        this.deprecated = stixSDO.x_mitre_deprecated ? stixSDO.x_mitre_deprecated : false;
        this.version = stixSDO.x_mitre_version ? stixSDO.x_mitre_version : '';
        this.dataService = dataService;
    }

    /**
     * Compare this object's version number to another object's version number
     * @param that the object to compare to
     * @returns 0 if the objects have the same version,
     *          > 0 if this object's version is greater,
     *          < 0 if that object's version is greater
     */
    public compareVersion(that: BaseStix): number {
        if (!this.version || !that.version) return 0; // one or both of the objects have no version

        let thisVersion = this.version.split('.');
        let thatVersion = that.version.split('.');

        for (let i = 0; i < Math.max(thisVersion.length, thatVersion.length); i++) {
            if (thisVersion.length == thatVersion.length && thisVersion.length < i) return 0;
            if (thisVersion.length < i) return -1;
            if (thatVersion.length < i) return 1;
            if (+thisVersion[i] == +thatVersion[i]) continue;
            return +thisVersion[i] - +thatVersion[i];
        }
        return 0;
    }

    /**
     * get the stix object that this object is revoked by
     * @param {string} domainVersionID the ID of the domain & version this object is found in
     * @returns {string} object ID this object is revoked by
     */
    public revoked_by(domainVersionID): string {
        let rels = this.dataService.getDomain(domainVersionID).relationships.revoked_by;
        if (rels.has(this.id)) return rels.get(this.id);
        else return undefined;
    }
}

/**
 * Object representing an ATT&CK matrix (x-mitre-matrix)
 */
export class Matrix extends BaseStix {
    public readonly tactics: Tactic[]; //tactics found under this Matrix
    /**
     * Creates an instance of Matrix.
     * @param {*} stixSDO for the matrix
     * @param {Map<string, any>} idToTacticSDO map of tactic ID to tactic SDO
     * @param {Technique[]} techniques all techniques defined in the domain
     */
    constructor(stixSDO: any, idToTacticSDO: Map<string, any>, techniques: Technique[], dataService: DataService) {
        super(stixSDO, dataService);
        this.tactics = stixSDO.tactic_refs
            .map(tacticID => idToTacticSDO.get(tacticID))  // Get tacticSDOs
            .filter(tacticSDO => tacticSDO)                // Filter out nulls (tacticSDO not found)
            .map(tacticSDO => new Tactic(tacticSDO, techniques, this.dataService));  // Create Tactic objects
    }
}

/**
 * Object representing a Tactic (x-mitre-tactic) in the ATT&CK matrix
 */
export class Tactic extends BaseStix {
    public readonly techniques: Technique[];  // techniques found under this tactic
    public readonly shortname: string;        // shortname property, AKA phase-name for techniques' kill-chain phases
    /**
     * Creates an instance of Tactic.
     * @param {*} stixSDO for the tactic
     * @param {Technique[]} techniques all techniques in the domain
     */
    constructor(stixSDO: any, techniques: Technique[], dataService: DataService) {
        super(stixSDO, dataService);
        this.shortname = stixSDO.x_mitre_shortname;
        this.techniques = techniques.filter((technique: Technique) => {
            if (!technique.revoked && !technique.deprecated)
                return technique.tactics.includes(this.shortname)
        });
    }
}
/**
 * Object representing a Technique (attack-pattern) in the ATT&CK matrix
 */
export class Technique extends BaseStix {
    public readonly platforms: string[];        // platforms for this technique.
    public readonly tactics: string[];          // tactics this technique is found under in phase-name format
    public readonly subtechniques: Technique[]; // subtechniques under this technique
    public readonly datasources: string;        // data sources of the technique
    public parent: Technique = null;            // parent technique. Only present if it's a sub-technique
    public get isSubtechnique() { return this.parent != null; }
    /**
     * Creates an instance of Technique.
     * @param {*} stixSDO for the technique
     * @param {Technique[]} subtechniques occuring under the technique
     */
    constructor(stixSDO: any, subtechniques: Technique[], dataService: DataService) {
        super(stixSDO, dataService);
        this.platforms = stixSDO.x_mitre_platforms ? stixSDO.x_mitre_platforms.map(platform => platform.trim()) : undefined;
        this.datasources = stixSDO.x_mitre_data_sources ? stixSDO.x_mitre_data_sources.toString() : "";

        if (!this.revoked && !this.deprecated) {
            this.tactics = stixSDO.kill_chain_phases.map((phase) => phase.phase_name);
        }

        this.subtechniques = subtechniques.filter(sub => !(sub.deprecated || sub.revoked));
        for (let subtechnique of this.subtechniques) {
            subtechnique.parent = this;
        }
    }

    /**
     * Get an ID identifying this technique under a specific tactic
     * @param {string|Tactic} tactic tactic name in phase-name/shortname format, or a Tactic object itself
     * @returns {string} ID for this technique under that tactic
     */
    public get_technique_tactic_id(tactic: string | Tactic): string {
        let tactic_shortname = tactic instanceof Tactic ? tactic.shortname : tactic;
        if (!this.tactics.includes(tactic_shortname)) {
            throw new Error(tactic_shortname + " is not a tactic of " + this.attackID);
        }
        return this.attackID + "^" + tactic_shortname;
    }

    /**
     * Get all possible IDs identifying this technique under tactics
     * Basically the same as calling get_technique_tactic_id with all valid tactic values
     */
    public get_all_technique_tactic_ids(): string[] {
        if (this.revoked || this.deprecated) return [];
        return this.tactics.map((shortname: string) => this.get_technique_tactic_id(shortname));
    }

    /**
     * Gets all of the mitigations associated with this technique
     * @param domain the domain ID of the search domain for mitigations
     */
    public getAllMitigationsForDomain(domainVersionID: string): Mitigation[] {
        let mitigatedByIds = this.dataService.getDomain(domainVersionID).relationships.mitigatedBy.get(this.id);
        return mitigatedByIds ? this.dataService.getDomain(domainVersionID).mitigations.filter(x => mitigatedByIds.includes(x.id)) : null;
    }
}

export class VersionChangelog {
    public oldDomainVersionID: string;
    public newDomainVersionID: string;
    public additions: string[] = []; // new objects added to newest version
    public changes: string[] = []; // object changes between versions
    public minor_changes: string[] = []; // changes to objects without version increments
    public deprecations: string[] = []; // objects deprecated since older version
    public revocations: string[] = []; // objects revoked since older version
    public unchanged: string[] = []; // objects which have not changed between versions

    public reviewed = new Set<string>();
    public copied = new Set<string>();

    constructor(oldDomainVersionID: string, newDomainVersionID: string) {
        this.oldDomainVersionID = oldDomainVersionID;
        this.newDomainVersionID = newDomainVersionID;
    }

    public length(): number {
        return this.additions.length
            + this.changes.length
            + this.minor_changes.length
            + this.deprecations.length
            + this.revocations.length
            + this.unchanged.length;
    }
}

/**
 * Object representing a Data Component in the ATT&CK catalogue
 */
export class DataComponent extends BaseStix {
    public readonly url: string;
    public readonly dataSource: string;
    /**
     * get techniques related to this data component
     * @returns {string[]} technique IDs used by this data component
     */
    public techniques(domainVersionID): string[] {
        const techniques = [];
        const domain = this.dataService.getDomain(domainVersionID);
        let rels = domain.relationships.component_rel;
        if (rels.has(this.id)) {
            rels.get(this.id).forEach((targetID) => {
                const t = domain.techniques.find((t) => t.id === targetID);
                if (t) techniques.push(t);
            })
        }
        return techniques;
    }
    /**
     * get data source related to this data component
     * @returns {name: string, url: string} name, and first url of data source referenced by this data component
     */
    public source(domainVersionID) {
        const dataSources = this.dataService.getDomain(domainVersionID).dataSources;
        if (dataSources.has(this.dataSource)) {
            const source = dataSources.get(this.dataSource);
            let url = "";
            if (source.external_references && source.external_references[0] && source.external_references[0].url)
                url = source.external_references[0].url;
            return { name: source.name, url: url };
        }
        else return { name: '', url: '' };
    }

    constructor(stixSDO: any, dataService: DataService) {
        super(stixSDO, dataService, false);
        this.dataSource = stixSDO.x_mitre_data_source_ref;
    }
}

/**
 * Object representing a Software (tool, malware) in the ATT&CK catalogue
 */
export class Software extends BaseStix {
    public readonly platforms: string[] = []; //platforms for this software

    /**
     * Creates an instance of Software.
     * @param {*} stixSDO for the software
     * @param {DataService} DataService the software occurs within
    */
    constructor(stixSDO: any, dataService: DataService) {
        super(stixSDO, dataService);
        this.platforms = stixSDO.x_mitre_platforms ? stixSDO.x_mitre_platforms.map(platform => platform.trim()) : undefined;
    }

    /**
     * get techniques used by this software
     * @returns {string[]} technique IDs used by this software
     */
    public used(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.software_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.used(domainVersionID);
    }
}

/**
 * Object representing a Group (intrusion-set) in the ATT&CK catalogue
 */
export class Group extends BaseStix {
    /**
     * get techniques used by this group
     * @returns {string[]} technique IDs used by this group
     */
    public used(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.group_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * get techniques used by campaigns attributed to this group
     * @returns {string[]} technique IDs used by campaigns attributed to this group
     */
    public campaignsUsed(domainVersionID): string[] {
        // get campaigns attributed to groups
        let attributedCampaigns = this.dataService.getDomain(domainVersionID).relationships.campaigns_attributed_to;
        // get techniques used by campaigns
        let rels = this.dataService.getDomain(domainVersionID).relationships.campaign_uses;
        if (attributedCampaigns.has(this.id)) {
            // get set of techniques used by attributed campaigns
            let techniques = [];
            attributedCampaigns.get(this.id).forEach(campaign_id => {
                if (rels.has(campaign_id)) techniques = techniques.concat(rels.get(campaign_id))
            });
            return techniques;
        } else return []; // no attributed campaigns

    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainVersionID): string[] {
        let usedSet = new Set(this.used(domainVersionID).concat(this.campaignsUsed(domainVersionID)));
        return Array.from(usedSet);
    }
}

/**
 * Object representing a Mitigation (course-of-action) in the ATT&CK catalogue
 */
export class Mitigation extends BaseStix {
    /**
     * get techniques mitigated by this mitigation
     * @returns {string[]} list of technique IDs
     */
    public mitigated(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.mitigates;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        }
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.mitigated(domainVersionID);
    }

    public serialisable() {
        return { ...this, dataService: undefined }
    }
}

export class Campaign extends BaseStix {
    /**
     * get techniques used by this campaign
     * @returns {string[]} technique IDs used by this campaign
     */
    public used(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.campaign_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }

    /**
     * Return all related techniques
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.used(domainVersionID);
    }
}

export class Note {
    public readonly abstract?: string; // brief summary of note content
    public readonly content: string; // content of the note
    public readonly object_refs: string[]; // list of STIX objects the note is applied to

    /**
     * Creates an instance of Note.
     * @param {*} stixSDO for the note
    */
    constructor(stixSDO: any) {
        if (stixSDO.abstract) this.abstract = stixSDO.abstract;
        this.content = stixSDO.content;
        this.object_refs = stixSDO.object_refs;
    }
}

export class Domain {
    public readonly id: string; // domain ID
    public readonly domain_identifier: string //domain ID without the version suffix
    public readonly name: string; // domain display name
    public readonly version: Version; // ATT&CK version

    public urls: string[] = [];
    public taxii_url: string = "";
    public taxii_collection: string = "";
    public authentication: ServiceAuth;
    public dataLoaded: boolean = false;
    public dataLoadedCallbacks: any[] = [];

    public matrices: Matrix[] = [];

    public get tactics(): Tactic[] {
        let tactics = [];
        for (let matrix of this.matrices) {
            tactics = tactics.concat(matrix.tactics);
        }
        return tactics;
    }
    public techniques: Technique[] = [];
    public platforms: String[] = []; // platforms defined on techniques and software of the domain
    public subtechniques: Technique[] = [];
    public software: Software[] = [];
    public campaigns: Campaign[] = [];
    public dataComponents: DataComponent[] = [];
    public dataSources = new Map<string, { name: string, external_references: any[] }>(); // Map data source ID to name and urls to be used by data components
    public groups: Group[] = [];
    public mitigations: Mitigation[] = [];
    public notes: Note[] = [];
    public relationships: any = {
        // subtechnique subtechnique-of technique
        // ID of technique to [] of subtechnique IDs
        subtechniques_of: new Map<string, string[]>(),
        // data component related to technique
        // ID of data component to [] of technique IDs
        component_rel: new Map<string, string[]>(),
        // group uses technique
        // ID of group to [] of technique IDs
        group_uses: new Map<string, string[]>(),
        // software uses technique
        // ID of software to [] of technique IDs
        software_uses: new Map<string, string[]>(),
        // campaign uses technique
        // ID of campaign to [] of technique IDs
        campaign_uses: new Map<string, string[]>(),
        // campaigns attributed to group
        // ID of group to [] of campaign IDs
        campaigns_attributed_to: new Map<string, string[]>(),
        // mitigation mitigates technique
        // ID of mitigation to [] of technique IDs
        mitigates: new Map<string, string[]>(),
        // mitigations grouped by technique
        // ID of technique to [] of mitigation IDs
        mitigatedBy: new Map<string, string[]>(),
        // object is revoked-by object
        // ID of object to ID of revoking object
        revoked_by: new Map<string, string>()
    }

    constructor(domain_identifier: string, name: string, version: Version, urls?: string[]) {
        this.id = `${domain_identifier}-${version.number}`;
        this.domain_identifier = domain_identifier;
        this.name = name;
        this.version = version;
        if (urls) this.urls = urls;
    }

    /**
     * Get the version number for this domain
     */
    getVersion(): string {
        return this.version.number;
    }
}
export class Version {
    public readonly name: string;
    public readonly number: string;

    /**
     * Creates an instance of Version
     * @param name version name
     * @param number version number
     */
    constructor(name: string, number: string) {
        this.name = name;
        this.number = number;
    }
}

export interface ServiceAuth {
    enabled: boolean;
    serviceName: string;
    apiKey: string;
}
