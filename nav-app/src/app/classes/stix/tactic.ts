import { DataService } from '../../services/data.service';
import { StixObject } from './stix-object';
import { Technique } from './technique';

export class Tactic extends StixObject {
    public readonly techniques: Technique[]; // techniques found under this tactic
    public readonly shortname: string; // shortname property, AKA phase-name for techniques' kill-chain phases

    /**
     * Creates an instance of Tactic.
     * @param {any} stixSDO for the tactic
     * @param {Technique[]} techniques all techniques in the domain
     */
    constructor(stixSDO: any, techniques: Technique[], dataService: DataService) {
        super(stixSDO, dataService);
        this.shortname = stixSDO.x_mitre_shortname;
        this.techniques = techniques.filter((technique: Technique) => {
            if (!technique.revoked && !technique.deprecated) return technique.tactics.includes(this.shortname);
        });
    }
}
