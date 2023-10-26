import { StixObject } from './stix-object';

export class Asset extends StixObject {
    /**
     * Get techniques targeting this asset
     * @returns {string[]} technique IDs targeting this asset
     */
    public targeted(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.targeted_assets;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        } else {
            return [];
        }
    }

    /**
     * Get all techniques related to the asset
     */
    public relatedTechniques(domainVersionID): string[] {
        return this.targeted(domainVersionID);
    }
}
