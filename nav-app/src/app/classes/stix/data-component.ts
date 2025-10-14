import { DataService } from '../../services/data.service';
import { StixObject } from './stix-object';
import { Technique } from './technique';

export class DataComponent extends StixObject {
    public readonly url: string;
    public readonly dataSource: string;

    constructor(stixSDO: any, dataService: DataService) {
        super(stixSDO, dataService, false);
        this.dataSource = stixSDO.x_mitre_data_source_ref;
    }

    /**
     * Get techniques related to the data component
     * @param domainVersionID the ID of the domain and version
     * @returns {Technique[]} list of techniques used by the data component
     */
    public techniques(domainVersionID): Technique[] {
        let techniques = [];
        const domain = this.dataService.getDomain(domainVersionID);

        if (domain.supportsLegacyDataSources) {
            // backwards compatibility with data sources
            let relationships = domain.relationships.component_rel;
            if (relationships.has(this.id)) {
                relationships.get(this.id).forEach((targetID) => {
                    const technique = domain.techniques.find((t) => t.id === targetID);
                    if (technique) techniques.push(technique);
                });
            }
        } else {
            techniques = domain.dataComponentsToTechniques.get(this.id) ?? [];
        }

        return techniques;
    }
    /**
     * Get the data source related to this data component
     * @param domainVersionID the ID of the domain and version
     * @returns { name: string, url: string } the name and first url of the data source referenced by this data component
     */
    public source(domainVersionID) {
        const dataSources = this.dataService.getDomain(domainVersionID).dataSources;
        if (dataSources.has(this.dataSource)) {
            const source = dataSources.get(this.dataSource);
            let url = '';
            if (source.external_references?.[0]?.url)
                url = source.external_references[0].url;
            return { name: source.name, url: url };
        } else return { name: '', url: '' };
    }
}
