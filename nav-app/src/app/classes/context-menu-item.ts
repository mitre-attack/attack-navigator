import { Tactic } from './stix/tactic';
import { Technique } from './stix/technique';

/**
 * A single entry in a ContextMenuItem's limit_techniques filter.
 * A bare ATT&CK ID (e.g. "T1059") applies to that technique under any tactic it
 * appears in. An { id, tactic } pair scopes the entry to that technique under
 * one specific tactic (tactic given in shortname/phase-name format, matching
 * the optional `tactic` field on technique objects in the layer format).
 */
export type ContextMenuTechniqueFilter = string | { id: string; tactic: string };

export class ContextMenuItem {
    public readonly label: string;
    private readonly url: string;
    private readonly subtechnique_url: string;
    private readonly limit_techniques: ContextMenuTechniqueFilter[];

    constructor(label, url, subtechnique_url = null, limit_techniques: ContextMenuTechniqueFilter[] = null) {
        this.label = label;
        this.url = url;
        this.subtechnique_url = subtechnique_url;
        this.limit_techniques = limit_techniques;
    }

    /**
     * Determine whether this custom context menu item should be shown for the
     * given technique/tactic combination.
     *
     * If limit_techniques is not set (or empty), the item applies to every
     * technique, preserving the existing default behavior. Otherwise the item
     * only applies if the technique matches a bare-ID entry, or matches an
     * { id, tactic } entry under the specific tactic being viewed.
     * @param {Technique} technique the technique the context menu was opened on
     * @param {Tactic} tactic the tactic column the technique is being viewed under
     * @returns {boolean} true if this item should be shown for this technique/tactic
     */
    public appliesTo(technique: Technique, tactic: Tactic): boolean {
        if (!this.limit_techniques || this.limit_techniques.length === 0) return true;

        return this.limit_techniques.some((entry) => {
            if (typeof entry === 'string') return entry === technique.attackID;
            return entry.id === technique.attackID && entry.tactic === tactic.shortname;
        });
    }

    public getReplacedURL(technique: Technique, tactic: Tactic): string {
        if (this.subtechnique_url && technique.isSubtechnique) {
            return this.subtechnique_url
                .replace(/{{parent_technique_attackID}}/g, technique.parent.attackID)
                .replace(/{{parent_technique_stixID}}/g, technique.parent.id)
                .replace(/{{parent_technique_name}}/g, technique.parent.name.replace(/ /g, '-').toLowerCase())

                .replace(/{{subtechnique_attackID}}/g, technique.attackID)
                .replace(/{{subtechnique_attackID_suffix}}/g, technique.attackID.split('.')[1])
                .replace(/{{subtechnique_stixID}}/g, technique.id)
                .replace(/{{subtechnique_name}}/g, technique.name.replace(/ /g, '-').toLowerCase())

                .replace(/{{tactic_attackID}}/g, tactic.attackID)
                .replace(/{{tactic_stixID}}/g, tactic.id)
                .replace(/{{tactic_name}}/g, tactic.shortname);
        } else {
            return this.url
                .replace(/{{technique_attackID}}/g, technique.attackID)
                .replace(/{{technique_stixID}}/g, technique.id)
                .replace(/{{technique_name}}/g, technique.name.replace(/ /g, '-').toLowerCase())

                .replace(/{{tactic_attackID}}/g, tactic.attackID)
                .replace(/{{tactic_stixID}}/g, tactic.id)
                .replace(/{{tactic_name}}/g, tactic.shortname);
        }
    }
}
