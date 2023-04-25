import { DataService } from "../data.service";
import { BaseStix } from "./base-stix";

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