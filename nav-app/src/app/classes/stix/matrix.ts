import { DataService } from '../../services/data.service';
import { StixObject } from './stix-object';
import { Tactic } from './tactic';
import { Technique } from './technique';

export class Matrix extends StixObject {
    public readonly tactics: Tactic[]; //tactics found under this Matrix

    /**
     * Creates an instance of Matrix.
     * @param {*} stixSDO for the matrix
     * @param {Map<string, any>} idToTacticSDO map of tactic ID to tactic SDO
     * @param {Technique[]} techniques all techniques defined in the domain
     */
    constructor(stixSDO: any, idToTacticSDO: Map<string, any>, techniques: Technique[], dataService: DataService) {
        super(stixSDO, dataService);
        this.tactics = stixSDO.tactic_refs
            .map((tacticID) => idToTacticSDO.get(tacticID)) // Get tacticSDOs
            .filter((tacticSDO) => tacticSDO) // Filter out nulls (tacticSDO not found)
            .map((tacticSDO) => new Tactic(tacticSDO, techniques, this.dataService)); // Create Tactic objects
    }
}
