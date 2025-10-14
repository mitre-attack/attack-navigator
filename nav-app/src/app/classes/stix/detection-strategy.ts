import { DataService } from 'src/app/services/data.service';
import { StixObject } from './stix-object';

export class DetectionStrategy extends StixObject {
    public analyticRefs: string[] = [];

    /**
     * Creates an instance of DetectionStrategy.
     * @param {any} stixSDO for the detection strategy
     * @param {Technique[]} subtechniques occuring under the technique
     */
    constructor(stixSDO: any, dataService: DataService) {
        super(stixSDO, dataService);
        this.analyticRefs = stixSDO.x_mitre_analytic_refs ?? [];
    }

    /**
     * Get techniques detected by this detection strategy
     * @returns {string[]} technique IDs detected by this detection strategy
     */
    public detects(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.detection_strategies_detect;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        } else {
            return [];
        }
    }

    /**
     * Get all techniques related to the detection strategy
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.detects(domainVersionID);
    }
}
