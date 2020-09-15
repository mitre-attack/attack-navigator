import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { Http } from '@angular/http'
import { Observable } from "rxjs/Rx"
import { fromPromise } from 'rxjs/observable/fromPromise';
import { TaxiiConnect, Server, Collections, Collection, Status } from './taxii2lib';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor(private http: HttpClient) {
        console.log("initializing data service singleton")
        this.getConfig().subscribe((config) => {
            this.setUpURLs(config["versions"]);
            //TODO: default open latest version of enterprise attack
            //this.dynamicLoadData("https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v7.2/enterprise-attack/enterprise-attack.json", false);
            this.dynamicLoadData(this.domainVersions[0]["id"], false);
        })
    }

    public domains = new Map<string, Domain>();

    public subtechniquesEnabled: boolean = true;
    public dataLoaded: boolean = false;
    public dataLoadedCallbacks: any[] = [];

    /**
     * Callback functions passed to this function will be called after data is loaded
     * @param {*} callback callback function to call when data is done loading
     */
    public onDataLoad(callback) {
        this.dataLoadedCallbacks.push(callback);
    }

    /**
     * Parse the given stix bundle into the relevant data holders
     * @param {any[]} stixBundle: the STIX bundle to parse
     */
    parseBundle(domainVersion: any, stixBundle: any[]): void {
        let domain = new Domain(domainVersion, this)
        let techniqueSDOs = [];
        let matrixSDOs = [];
        let idToTechniqueSDO = new Map<string, any>();
        let idToTacticSDO = new Map<string, any>();
        
        for (let sdo of stixBundle[0].objects) { //iterate through stix domain objects in the bundle
            // ignore deprecated and revoked objects in the bundle
            if (sdo.x_mitre_deprecated || sdo.revoked) continue; 
            // parse according to type
            switch(sdo.type) {
                case "intrusion-set":
                    domain.groups.push(new Group(sdo, this));
                    break;
                case "malware":
                case "tool":
                    domain.software.push(new Software(sdo, this));
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
                        }
                    } else if (sdo.relationship_type == "mitigates") {
                        if (domain.relationships["mitigates"].has(sdo.source_ref)) {
                            let ids = domain.relationships["mitigates"].get(sdo.source_ref);
                            ids.push(sdo.target_ref);
                        } else {
                            domain.relationships["mitigates"].set(sdo.source_ref, [sdo.target_ref])
                        }
                    }
                    break;
                case "attack-pattern":
                    idToTechniqueSDO.set(sdo.id, sdo);
                    if (sdo.x_mitre_is_subtechnique) {
                        if (this.subtechniquesEnabled) {
                            domain.subtechniques.push(new Technique(sdo, [], this));
                        }
                    } else techniqueSDOs.push(sdo);
                    break;
                case "x-mitre-tactic":
                    idToTacticSDO.set(sdo.id, sdo);
                    break;
                case "x-mitre-matrix":
                    matrixSDOs.push(sdo);
                    break;
            }
        }

        //create techniques
        for (let techniqueSDO of techniqueSDOs) {
            let subtechniques: Technique[] = [];
            if (this.subtechniquesEnabled) {
                if (domain.relationships.subtechniques_of.has(techniqueSDO.id)) {
                    domain.relationships.subtechniques_of.get(techniqueSDO.id).forEach((sub_id) => {
                        if (idToTechniqueSDO.has(sub_id)) subtechniques.push(new Technique(idToTechniqueSDO.get(sub_id), [], this));
                        // else the target was revoked or deprecated and we can skip honoring the relationship
                    })
                }
            }
            domain.techniques.push(new Technique(techniqueSDO, subtechniques, this));
        }
        //create matrices, which also creates tactics and filters techniques
        for (let matrixSDO of matrixSDOs) {
            domain.matrices.push(new Matrix(matrixSDO, idToTacticSDO, domain.techniques, this));
        }
    
        this.domains.set(domain.id, domain);

        console.log("data.service parsing complete")
        this.dataLoaded = true;
        for (let callback of this.dataLoadedCallbacks) {
            callback();
        }
    }

    // Observable for data in config.json
    private configData$: Observable<Object>;

    // Observable for data
    private domainData$: Observable<Object>;

    // URLs in case config file doesn't load properly
    //private enterpriseAttackURL: string = "https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json";
    //private mobileDataURL: string = "https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json";

    private useTAXIIServer: boolean = false;
    private taxiiVersions: any[] = [];
    public domainVersions: any[] = [
        { // default enterprise attack domain
            "id": "enterprise-latest",
            "name": "enterprise",
            "version": "latest",
            "urls": ["https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json"]
        },
        { // default mobile attack domain
            "id": "mobile-latest",
            "name": "mobile",
            "version": "latest",
            "urls": ["https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json"]
        }
    ];

    /**
     * Set up the URLs for data
     * @param {string} eAttackURL enterprise domain url
     * @param {string} preAttackURL pre-attack domain url
     * @param {string} mURL mobile-attack url
     * @param {boolean} useTAXIIServer use taxii server?
     * @param {string} taxiiURL the URL of the taxii server
     * @param {string[]} taxiiCollections taxii collections to fetch from
     * @memberof DataService
     */
    setUpURLs(versions: []){
        versions.forEach( (version: any) => {
            let v: string = version["name"].replace(/\s/g, "-").toLowerCase();
            version["domains"].forEach( (domain: any) => {
                if (domain["taxii_url"] && domain["taxii_collection"]) {
                    this.useTAXIIServer = true;
                    let domainVersion: any = {
                        "id": domain["name"].replace(/\s/g, "-").concat('-', v).toLowerCase(),
                        "name": domain["name"].toLowerCase(),
                        "version": v,
                        "taxii_url": domain["taxii_url"],
                        "taxii_collection": domain["taxii_collection"]
                    };
                    this.taxiiVersions.push(domainVersion);
                } else {
                    let domainVersion: any = {
                        "id": domain["name"].replace(/\s/g, "-").concat('-', v).toLowerCase(),
                        "name": domain["name"].toLowerCase(),
                        "version": v,
                        "urls": domain["data"]
                    };
                    this.domainVersions.push(domainVersion)
                }
            });
        });
    }

    /**
     * get the current config
     * @param {boolean} refresh: if true fetches the config from file. Otherwise, only fetches if it's never been fetched before
     */
    getConfig(refresh:boolean = false){
        if (refresh || !this.configData$) {
            this.configData$ = this.http.get("./assets/config.json");
        }
        return this.configData$;
    }


    getData(loadURLs: string[], refresh: boolean = false) : Observable<Object>{
        if (this.useTAXIIServer) {
            //TODO: add data fetch from taxii server
            console.log("fetching data from TAXII server");
        } else if (refresh || !this.domainData$ || !this.domainVersions) {
            console.log("retrieving data", loadURLs)
            let bundleData = [];
            loadURLs.forEach((url) => {
                bundleData.push(this.http.get(url));
            })

            this.domainData$ = Observable.forkJoin(bundleData);
        }
        return this.domainData$;
    }

    dynamicLoadData(domainVersionID: string, refresh: boolean = false): void {
        let domainVersion = this.domainVersions.find((dv) => dv.id == domainVersionID);
        if (domainVersion) { //exists
            this.getData(domainVersion["urls"], false).subscribe((data: Object[]) => {
                this.parseBundle(domainVersion, data);
            });
        }
    }

    //TODO: remove individual Mobile/Enterprise data retrieval
    /**
     * fetch the enterprise data from the endpoint
     */
    // getEnterpriseData(refresh: boolean = false, useTAXIIServer: boolean = false) : Observable<Object>{
    //     if (useTAXIIServer) {
    //         console.log("fetching data from TAXII server") 
    //         let conn = new TaxiiConnect(this.taxiiURL, '', '', 5000);
    //         let enterpriseCollectionInfo: any = {
    //             'id': this.taxiiCollections['enterprise_attack'],
    //             'title': 'Enterprise ATT&CK',
    //             'description': '',
    //             'can_read': true,
    //             'can_write': false,
    //             'media_types': ['application/vnd.oasis.stix+json']
    //         }
    //         const enterpriseCollection = new Collection(enterpriseCollectionInfo, this.taxiiURL + 'stix', conn);

    //         let preattackCollectionInfo: any = {
    //             'id': this.taxiiCollections['pre_attack'],
    //             'title': 'Pre-ATT&CK',
    //             'description': '',
    //             'can_read': true,
    //             'can_write': false,
    //             'media_types': ['application/vnd.oasis.stix+json']
    //         }

    //         const preattackCollection = new Collection(preattackCollectionInfo, this.taxiiURL + 'stix', conn);

    //         this.enterpriseData$ = Observable.forkJoin(
    //             fromPromise(enterpriseCollection.getObjects('', undefined)),
    //             fromPromise(preattackCollection.getObjects('', undefined))
    //         )
    //     }
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
    protected readonly dataService: DataService;
    constructor(stixSDO: any, dataService: DataService) {
        this.id = stixSDO.id;
        this.name = stixSDO.name;
        this.description = stixSDO.description;
        this.attackID = stixSDO.external_references[0].external_id;
        this.url = stixSDO.external_references[0].url;
        this.dataService = dataService;
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
        this.tactics = stixSDO.tactic_refs.map((tacticID) => new Tactic(idToTacticSDO.get(tacticID), techniques, this.dataService))
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
        this.techniques = techniques.filter((technique: Technique) => technique.tactics.includes(this.shortname));
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
        this.platforms = stixSDO.x_mitre_platforms;
      	if (stixSDO.x_mitre_data_sources !== undefined)
		      this.datasources = stixSDO.x_mitre_data_sources.toString();
	      else
		      this.datasources = "";
        this.tactics = stixSDO.kill_chain_phases.map((phase) => phase.phase_name);

        this.subtechniques = subtechniques;
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
        let tactic_shortname = tactic instanceof Tactic? tactic.shortname : tactic;
        if (!this.tactics.includes(tactic_shortname)) throw new Error(tactic_shortname + " is not a tactic of " + this.attackID);
        return this.attackID + "^" + tactic_shortname;
    }

    /**
     * Get all possible IDs identifying this technique under tactics
     * Basically the same as calling get_technique_tactic_id with all valid tactic values
     */
    public get_all_technique_tactic_ids(): string[] {
        return this.tactics.map((shortname: string) => this.get_technique_tactic_id(shortname));
    }
}

/**
 * Object representing a Software (tool, malware) in the ATT&CK catalogue
 */
export class Software extends BaseStix {
    /**
     * get techniques used by this software
     * @returns {string[]} technique IDs used by this software
     */
    public used(domainID): string[] {
        let rels = this.dataService.domains.get(domainID).relationships.software_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainID): string[] {
        return this.used(domainID);
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
    public used(domainID): string[] {
        // let rels = this.dataService.domains.get(this.domainID).relationships.group_uses;
        let rels = this.dataService.domains.get(domainID).relationships.group_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainID): string[] {
        return this.used(domainID);
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
    public mitigated(domainID): string[] {
        let rels = this.dataService.domains.get(domainID).relationships.mitigates;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        } 
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainID): string[] {
        return this.mitigated(domainID);
    }
}

export class Domain {
    public readonly id: string; // domain ID
    public readonly name: string;
    public readonly version: string;
    protected readonly dataService: DataService;

    public dataLoaded: boolean = false;
    //public dataLoadedCallbacks: any[] = [];

    public matrices: Matrix[] = [];
    public tactics: Tactic[] = [];
    public techniques: Technique[] = [];
    public subtechniques: Technique[] = [];
    public software: Software[] = [];
    public groups: Group[] = [];
    public mitigations: Mitigation[] = [];
    public relationships: any = {
        // subtechnique subtechnique-of technique
        // ID of technique to [] of subtechnique IDs
        subtechniques_of: new Map<string, string[]>(), 
        // group uses technique
        // ID of group to [] of technique IDs
        group_uses: new Map<string, string[]>(), 
        // group uses technique
        // ID of group to [] of technique IDs
        software_uses: new Map<string, string[]>(),
        // mitigation mitigates technique
        // ID of mitigation to [] of technique IDs
        mitigates: new Map<string, string[]>()
    }

    constructor(domainVersion: any, dataService: DataService) {
        this.id = domainVersion.id;
        this.name = domainVersion.name;
        this.version = domainVersion.version;
        this.dataService = dataService;
    }
}
