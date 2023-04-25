import { StixObject } from "./stix-object";

export class Mitigation extends StixObject {
    /**
     * get techniques mitigated by this mitigation
     * @returns {string[]} list of technique IDs
     */
    public mitigated(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.mitigates;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        }
        else return [];
    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.mitigated(domainVersionID);
    }
}