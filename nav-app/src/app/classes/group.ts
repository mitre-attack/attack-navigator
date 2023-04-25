import { BaseStix } from "./base-stix";

export class Group extends BaseStix {
    /**
     * get techniques used by this group
     * @returns {string[]} technique IDs used by this group
     */
    public used(domainVersionID): string[] {
        let rels = this.dataService.getDomain(domainVersionID).relationships.group_uses;
        if (rels.has(this.id)) return rels.get(this.id);
        else return [];
    }
    /**
     * get techniques used by campaigns attributed to this group
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
            attributedCampaigns.get(this.id).forEach(campaign_id => {
                if (rels.has(campaign_id)) techniques = techniques.concat(rels.get(campaign_id))
            });
            return techniques;
        } else return []; // no attributed campaigns

    }
    /**
     * Return all related techniques
     */
    public relatedTechniques(domainVersionID): string[] {
        let usedSet = new Set(this.used(domainVersionID).concat(this.campaignsUsed(domainVersionID)));
        return Array.from(usedSet);
    }
}
