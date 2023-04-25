import { BaseStix } from "./base-stix";

export class Mitigation extends BaseStix {
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