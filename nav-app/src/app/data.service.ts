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
            this.setUpURLs(config["enterprise_attack_url"],
                           config["pre_attack_url"],
                           config["mobile_data_url"],
                           config["taxii_server"]["enabled"],
                           config["taxii_server"]["url"],
                           config["taxii_server"]["collections"]);
            if(config["domain"] === "mitre-enterprise") {
                console.log("using enterprise data")
                this.getEnterpriseData(false, config["taxii_server"]["enabled"]).subscribe((enterpriseData: Object[]) => {
                    this.parseBundle(enterpriseData);
                });
            } else if (config["domain"] === "mitre-mobile") {
                console.log("using mobile data")
                this.getMobileData(false, config["taxii_server"]["enabled"]).subscribe((mobileData: Object[]) => {
                    this.parseBundle(mobileData);
                });
            }
        })
    }

    public matrices: Matrix[] = [];
    public tactics: Tactic[] = [];
    public techniques: Technique[] = [];
    public software: Software[] = [];
    public groups: Group[] = [];
    public mitigations: Mitigation[] = [];
    public relationships: any = {
        // subtechniqye subtechnique-of technique
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
     * Parse the given stix bundle into the relevant data holders (above)
     * @param {any[]} stixBundle: the STIX bundle to parse
     */
    parseBundle(stixBundle: any[]): void {

        let techniqueSDOs = [];
        let idToTechniqueSDO = new Map<string, any>();
        let subtechniqueSDOs = [];
        let matrixSDOs = [];

        let idToTacticSDO = new Map<string, any>();
        
        
        let phases = [
            {name: "prepare", objects: stixBundle[1]["objects"]},
            {name: "act",     objects: stixBundle[0]["objects"]}
        ];
        for (let phase of phases) {
            for (let sdo of phase.objects) { //iterate through stix domain objects in the bundle
                // ignore deprecated and revoked objects in the bundle
                if (sdo.x_mitre_deprecated || sdo.revoked) continue; 
                // parse according to type
                switch(sdo.type) {
                    case "intrusion-set":
                        this.groups.push(new Group(sdo, this));
                        break;
                    case "malware":
                    case "tool":
                        this.software.push(new Software(sdo, this));
                        break;
                    case "course-of-action":
                        this.mitigations.push(new Mitigation(sdo, this));
                        break;
                    case "relationship":
                        if (sdo.relationship_type == "subtechnique-of") {
                            // record subtechnique:technique relationship
                            if (this.relationships["subtechniques_of"].has(sdo.target_ref)) {
                                let ids = this.relationships["subtechniques_of"].get(sdo.target_ref);
                                ids.push(sdo.source_ref);
                            } else {
                                this.relationships["subtechniques_of"].set(sdo.target_ref, [sdo.source_ref])
                            }
                        } else if (sdo.relationship_type == "uses") {
                            if (sdo.source_ref.startsWith("intrusion-set") && sdo.target_ref.startsWith("attack-pattern")) {
                                // record group:technique relationship
                                if (this.relationships["group_uses"].has(sdo.source_ref)) {
                                    let ids = this.relationships["group_uses"].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    this.relationships["group_uses"].set(sdo.source_ref, [sdo.target_ref])
                                }
                            } else if ((sdo.source_ref.startsWith("malware") || sdo.source_ref.startsWith("tool")) && sdo.target_ref.startsWith("attack-pattern")) {
                                // record software:technique relationship
                                if (this.relationships["software_uses"].has(sdo.source_ref)) {
                                    let ids = this.relationships["software_uses"].get(sdo.source_ref);
                                    ids.push(sdo.target_ref);
                                } else {
                                    this.relationships["software_uses"].set(sdo.source_ref, [sdo.target_ref])
                                }
                            }
                        } else if (sdo.relationship_type == "mitigates") {
                            if (this.relationships["mitigates"].has(sdo.source_ref)) {
                                let ids = this.relationships["mitigates"].get(sdo.source_ref);
                                ids.push(sdo.target_ref);
                            } else {
                                this.relationships["mitigates"].set(sdo.source_ref, [sdo.target_ref])
                            }
                        }
                        break;
                    case "attack-pattern":
                        idToTechniqueSDO.set(sdo.id, sdo);
                        if (sdo.x_mitre_is_subtechnique) subtechniqueSDOs.push(sdo);
                        else techniqueSDOs.push(sdo);
                        break;
                    case "x-mitre-tactic":
                        idToTacticSDO.set(sdo.id, sdo);
                        break;
                    case "x-mitre-matrix":
                        matrixSDOs.push(sdo);
                        break;
                }
            }
        }

        //create techniques
        for (let techniqueSDO of techniqueSDOs) {
            let subtechniques: Technique[] = [];
            if (this.relationships.subtechniques_of.has(techniqueSDO.id)) {
                this.relationships.subtechniques_of.get(techniqueSDO.id).forEach((sub_id) => {
                    if (idToTechniqueSDO.has(sub_id)) subtechniques.push(new Technique(idToTechniqueSDO.get(sub_id), [], this));
                    // else the target was revoked or deprecated and we can skip honoring the relationship
                })
            }
            this.techniques.push(new Technique(techniqueSDO, subtechniques, this));
        }
        //create matrices, which also creates tactics and filters techniques
        for (let matrixSDO of matrixSDOs) {
            this.matrices.push(new Matrix(matrixSDO, idToTacticSDO, this.techniques, this));
        }

        console.log("data.service parsing complete")
        this.dataLoaded = true;
        for (let callback of this.dataLoadedCallbacks) {
            callback();
        }
    }

    // Observable for data in config.json
    private configData$: Observable<Object>;

    // Observables for data
    private enterpriseData$: Observable<Object>;
    private mobileData$: Observable<Object>;

    // URLs in case config file doesn't load properly
    private enterpriseAttackURL: string = "https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json";
    private pre_attack_URL: string = "https://raw.githubusercontent.com/mitre/cti/master/pre-attack/pre-attack.json";
    private mobileDataURL: string = "https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json";

    private useTAXIIServer: boolean = false;
    private taxiiURL: string = '';
    private taxiiCollections: String[] = [];

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
    setUpURLs(eAttackURL: string, preAttackURL: string, mURL: string, useTAXIIServer: boolean, taxiiURL: string, taxiiCollections: string[]){
        this.enterpriseAttackURL = eAttackURL;
        this.pre_attack_URL = preAttackURL;
        this.mobileDataURL = mURL;
        this.useTAXIIServer = useTAXIIServer;
        this.taxiiURL = taxiiURL;
        this.taxiiCollections = taxiiCollections;
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

    /**
     * fetch the enterprise data from the endpoint
     */
    getEnterpriseData(refresh: boolean = false, useTAXIIServer: boolean = false) : Observable<Object>{
        if (useTAXIIServer) {
            console.log("fetching data from TAXII server") 
            let conn = new TaxiiConnect(this.taxiiURL, '', '', 5000);
            let enterpriseCollectionInfo: any = {
                'id': this.taxiiCollections['enterprise_attack'],
                'title': 'Enterprise ATT&CK',
                'description': '',
                'can_read': true,
                'can_write': false,
                'media_types': ['application/vnd.oasis.stix+json']
            }
            const enterpriseCollection = new Collection(enterpriseCollectionInfo, this.taxiiURL + 'stix', conn);

            let preattackCollectionInfo: any = {
                'id': this.taxiiCollections['pre_attack'],
                'title': 'Pre-ATT&CK',
                'description': '',
                'can_read': true,
                'can_write': false,
                'media_types': ['application/vnd.oasis.stix+json']
            }

            const preattackCollection = new Collection(preattackCollectionInfo, this.taxiiURL + 'stix', conn);

            this.enterpriseData$ = Observable.forkJoin(
                fromPromise(enterpriseCollection.getObjects('', undefined)),
                fromPromise(preattackCollection.getObjects('', undefined))
            )
        }
        else if (refresh || !this.enterpriseData$){
            console.log("retrieving data", this.enterpriseAttackURL),
            this.enterpriseData$ = Observable.forkJoin(
                this.http.get(this.enterpriseAttackURL),
                this.http.get(this.pre_attack_URL)
            );
        }
        return this.enterpriseData$ //observable
    }

    /**
     * fetch the mobile data from the endpoint
     */
    getMobileData(refresh: boolean = false, useTAXIIServer: boolean = false): Observable<Object> {
        //load from remote if not yet loaded or refresh=true
        if (useTAXIIServer) {
            console.log("fetching data from TAXII server")
            let conn = new TaxiiConnect(this.taxiiURL, '', '', 5000);
            let mobileCollectionInfo: any = {
                'id': this.taxiiCollections['mobile_attack'],
                'title': 'Mobile ATT&CK',
                'description': '',
                'can_read': true,
                'can_write': false,
                'media_types': ['application/vnd.oasis.stix+json']
            }
            const mobileCollection = new Collection(mobileCollectionInfo, this.taxiiURL + 'stix', conn);

            let preattackCollectionInfo: any = {
                'id': this.taxiiCollections['pre_attack'],
                'title': 'Pre-ATT&CK',
                'description': '',
                'can_read': true,
                'can_write': false,
                'media_types': ['application/vnd.oasis.stix+json']
            }

            const preattackCollection = new Collection(preattackCollectionInfo, this.taxiiURL + 'stix', conn);

            this.mobileData$ = Observable.forkJoin(
                fromPromise(mobileCollection.getObjects('', undefined)),
                fromPromise(preattackCollection.getObjects('', undefined))
            )
        }
        else if (refresh || !this.mobileData$){
            console.log("retrieving data", this.mobileDataURL),
            this.mobileData$ = Observable.forkJoin(
                this.http.get(this.mobileDataURL),
                this.http.get(this.pre_attack_URL)
            );
        }
        return this.mobileData$ //observable
    }
}

/** 
 * Common attributes for STIX objects
 */ 
export abstract class BaseStix {
    public readonly id: string;          //STIX ID
    public readonly attackID: string;    // ATT&CK ID
    public readonly name: string;        // name of object
    public readonly description: string; // description of object
    public readonly url: string;         // URL of object on the ATT&CK website
    public readonly stage: string;       // prepare or act
    protected readonly dataService: DataService;
    constructor(stixSDO: any, dataService: DataService) {
        this.id = stixSDO.id;
        this.name = stixSDO.name;
        this.description = stixSDO.description;
        this.attackID = stixSDO.external_references[0].external_id;
        this.stage = stixSDO.external_references[0].source_name == "mitre-pre-attack" ? "prepare" : "act";
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
    public used(): string[] {
        let rels = this.dataService.relationships.software_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(): string[] {
        return this.used();
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
    public used(): string[] {
        let rels = this.dataService.relationships.group_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(): string[] {
        return this.used();
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
    public mitigated(): string[] {
        let rels = this.dataService.relationships.mitigates;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(): string[] {
        return this.mitigated();
    }
}
