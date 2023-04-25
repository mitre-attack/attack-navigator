import { DataService } from "../data.service";
import { BaseStix } from "./base-stix";

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