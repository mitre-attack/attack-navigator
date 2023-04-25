import { StixObject } from "./stix-object";

export class Campaign extends StixObject {
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