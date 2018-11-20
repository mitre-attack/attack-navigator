import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'
import { Http } from '@angular/http'
import { Observable } from "rxjs/Rx"
import { fromPromise } from 'rxjs/observable/fromPromise';
import { TaxiiConnect, Server, Collections, Collection, Status } from './taxii2lib';

@Injectable()
export class DataService {

    constructor(private http: Http) {}

    // Observable for data in config.json
    private configData$: Observable<Object>;

    // Observables for data
    private enterpriseData$: Observable<Object>;
    private mobileData$: Observable<Object>;

    // Order of tactics to be displayed in application
    private actTacticsOrder: String[] = [];
    private prepareTacticsOrder: String[] = [];
    private totalTacticsOrder: String[] = [];

    // URLs in case config file doesn't load properly
    private enterpriseAttackURL: string = "https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json";
    private pre_attack_URL: string = "https://raw.githubusercontent.com/mitre/cti/master/pre-attack/pre-attack.json";
    private mobileDataURL: string = "https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json";

    private useTAXIIServer: boolean = false;
    private taxiiURL: string = '';
    private taxiiCollections: String[] = [];

    setUpURLs(eAttackURL, preAttackURL, mURL, useTAXIIServer, taxiiURL, taxiiCollections){
        this.enterpriseAttackURL = eAttackURL;
        this.pre_attack_URL = preAttackURL;
        this.mobileDataURL = mURL;
        this.useTAXIIServer = useTAXIIServer;
        this.taxiiURL = taxiiURL;
        this.taxiiCollections = taxiiCollections;
    }

    getConfig(refresh:boolean = false){
        if (refresh || !this.configData$){
            this.configData$ = this.http.get("./assets/config.json").map(res => res.json())
        }
        return this.configData$;
    }

    getEnterpriseData(refresh: boolean = false, useTAXIIServer: boolean = false){
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
            this.enterpriseData$ = Observable.forkJoin(
                this.http.get(this.enterpriseAttackURL).map(res => res.json()),
                this.http.get(this.pre_attack_URL).map(res => res.json())
            );
        }
        return this.enterpriseData$ //observable
    }

    getMobileData(refresh: boolean = false, useTAXIIServer: boolean = false){
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
            this.mobileData$ = Observable.forkJoin(
                this.http.get(this.mobileDataURL).map(res => res.json()),
                this.http.get(this.pre_attack_URL).map(res => res.json())
            );
        }
        return this.mobileData$ //observable
    }

    setTacticOrder(retrievedTactics){
        // this.totalTacticsOrder = retrievedTactics;
        for(var i = 0; i < retrievedTactics.length; i++){
            var phase = retrievedTactics[i].phase;
            var tactic = retrievedTactics[i].tactic;
            if(phase.localeCompare("prepare") === 0){
                this.prepareTacticsOrder.push(tactic);
            } else {
                this.actTacticsOrder.push(tactic);
            }
            this.totalTacticsOrder.push(tactic);
        }
    }

    /**
     * Convert a list of techniques to a list of tactics, each one containing the techniques of the tactic
     * @param  {[object]} techniques the techniques to convert
     * @return {object}              object with keys of each tactic and values of the techniques of those tactics
     */
    techniquesToTactics(techniques: Technique[]) {
        if (techniques.length === 0) return []
        var tactics = {};
        techniques.forEach(function(technique) {
            var tt = technique.tactic;
            if (tactics[tt]) tactics[tt].push(technique)
            else tactics[tt] = [technique];

        });
        return tactics;
    }

    /**
     * Extract all tactic names from the list of techniques
     * @param  {[object]} techniques the techniques to extract
     * @return {[string]}            an array of all tactic names
     */
    tacticNames(techniques: Technique[]) {
        if (techniques.length === 0) return []
        var techniquesFinal: String[] = [];
        var seen = new Set();
        techniques.forEach(function(technique) {
            var tt = technique.tactic;
            seen.add(tt);
        });
        for(var i = 0; i < this.totalTacticsOrder.length; i++){
            var tactic = this.totalTacticsOrder[i];
            if(seen.has(tactic)){
                techniquesFinal.push(tactic);
            }
        }
        return techniquesFinal;
    }
}

export class Technique {
    description: string;
    external_references_url: string;
    id: string;
    tactic: string;
    name: string;
    platforms: string[];
    technique_id: string;
    technique_tactic_union_id: string;
    constructor(name: string, description: string, tactic: string, url: string, platforms: string[], id: string, tid: string) {
        this.name = name; this.description = description, this.tactic = tactic;
        this.id = id; this.platforms = platforms; this.external_references_url = url;
        this.technique_id = tid;
        this.technique_tactic_union_id = this.technique_id + "^" + this.tactic;
    }
}
