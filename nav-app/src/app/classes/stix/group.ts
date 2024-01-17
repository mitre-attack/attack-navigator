import { StixObject } from './stix-object';

export class Group extends StixObject {
    /**
     * Get the techniques used by this group
     * @param domainVersionID the ID of the domain and version
     * @returns {string[]} technique IDs used by this group
     */
    public used(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.group_uses;
        if (rels.has(this.id)) {
            return rels.get(this.id);
        } else {
            return [];
        }
    }

    /**
     * Get techniques used by campaigns attributed to this group
     * @param domainVersionID the ID of the domain and version
     * @returns {string[]} technique IDs used by campaigns attributed to this group
     */
    public campaignsUsed(domainVersionID): string[] {
        // get campaigns attributed to groups
        let attributedCampaigns = this.dataService.getDomain(domainVersionID).relationships.campaigns_attributed_to;
        // get techniques used by campaigns
        let rels = this.dataService.getDomain(domainVersionID).relationships.campaign_uses;
        if (attributedCampaigns.has(this.id)) {
            // get set of techniques used by attributed campaigns
            let techniques = [];
            attributedCampaigns.get(this.id).forEach((campaign_id) => {
                if (rels.has(campaign_id)) techniques = techniques.concat(rels.get(campaign_id));
            });
            return techniques;
        } else return []; // no attributed campaigns
    }

    /**
     * Get all techniques related to the group
     */
    public relatedTechniques(domainVersionID): string[] {
        let usedSet = new Set(this.used(domainVersionID).concat(this.campaignsUsed(domainVersionID)));
        return Array.from(usedSet);
    }
}
