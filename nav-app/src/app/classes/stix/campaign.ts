import { StixObject } from "./stix-object";

export class Campaign extends StixObject {
    /**
     * Get techniques used by the campaign
     * @param domainVersionID the ID of the domain and version
     * @returns {string[]} technique IDs used by the campaign
     */
    public used(domainVersionID): string[] {
        let relationships = this.dataService.getDomain(domainVersionID).relationships.campaign_uses;
        if (relationships.has(this.id)) {
            return relationships.get(this.id);
        } else { return []; }
    }

    /**
     * Get all techniques related to the campaign
     * @param domainVersionID the ID of the domain and version
     * @returns {string[]} technique IDs used by the campaign
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.used(domainVersionID);
    }
}