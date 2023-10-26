import { DataService } from '../../services/data.service';
import { StixObject } from './stix-object';

export class Software extends StixObject {
    public readonly platforms: string[] = []; //platforms for this software

    /**
     * Creates an instance of Software.
     * @param {any} stixSDO for the software
     * @param {DataService} DataService the software occurs within
     */
    constructor(stixSDO: any, dataService: DataService) {
        super(stixSDO, dataService);
        this.platforms = stixSDO.x_mitre_platforms ? stixSDO.x_mitre_platforms.map((platform) => platform.trim()) : undefined;
    }

    /**
     * Get techniques used by this software
     * @param domainVersionID the ID of the domain and version
     * @returns {string[]} technique IDs used by this software
     */
    public used(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.software_uses;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        } else {
            return [];
        }
    }
    /**
     * Get all techniques related to the software
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.used(domainVersionID);
    }
}
