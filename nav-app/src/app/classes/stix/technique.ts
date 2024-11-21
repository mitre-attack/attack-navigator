import { DataService } from '../../services/data.service';
import { StixObject } from './stix-object';
import { Tactic } from './tactic';

export class Technique extends StixObject {
    public readonly platforms: string[]; // platforms for this technique.
    public readonly tactics: string[]; // tactics this technique is found under in phase-name format
    public readonly subtechniques: Technique[]; // subtechniques under this technique
    public readonly datasources: string; // data sources of the technique
    public parent: Technique = null; // parent technique. Only present if it's a sub-technique
    public get isSubtechnique() {
        return this.parent != null;
    }

    /**
     * Creates an instance of Technique.
     * @param {any} stixSDO for the technique
     * @param {Technique[]} subtechniques occuring under the technique
     */
    constructor(stixSDO: any, subtechniques: Technique[], dataService: DataService) {
        super(stixSDO, dataService);
        this.platforms = stixSDO.x_mitre_platforms ? stixSDO.x_mitre_platforms.map((platform) => platform.trim()) : undefined;
        this.datasources = stixSDO.x_mitre_data_sources ? stixSDO.x_mitre_data_sources.toString() : '';
        if (!this.revoked && !this.deprecated) {
            this.tactics = stixSDO.kill_chain_phases.map((phase) => phase.phase_name);
        }

        this.subtechniques = subtechniques.filter((sub) => !(sub.deprecated || sub.revoked));
        for (let subtechnique of this.subtechniques) {
            subtechnique.parent = this;
        }
    }

    /**
     * Get an ID identifying this technique under a specific tactic
     * @param {string|Tactic} tactic tactic name in phase-name/shortname format, or a Tactic object itself
     * @returns {string} ID for this technique under that tactic
     */
    public get_technique_tactic_id(tactic: string | Tactic): string {
        let tactic_shortname = tactic instanceof Tactic ? tactic.shortname : tactic;

        if (!this.tactics.includes(tactic_shortname)) {
            throw new Error(tactic_shortname + ' is not a tactic of ' + this.attackID);
        }
        return this.attackID + '^' + tactic_shortname;
    }

    /**
     * Get all possible IDs identifying this technique under tactics
     * Basically the same as calling get_technique_tactic_id with all valid tactic values
     */
    public get_all_technique_tactic_ids(): string[] {
        if (this.revoked || this.deprecated) return [];
        return this.tactics.map((shortname: string) => this.get_technique_tactic_id(shortname));
    }
}
