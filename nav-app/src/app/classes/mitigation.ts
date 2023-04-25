import { StixObject } from "./stix-object";

export class Mitigation extends StixObject {
    /**
     * Get techniques mitigated by this mitigation
     * @returns {string[]} technique IDs mitigated by this mitigation
     */
    public mitigated(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.mitigates;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        } else { return []; }
    }

    /**
     * Get all techniques related to the mitigation
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.mitigated(domainVersionID);
    }
}