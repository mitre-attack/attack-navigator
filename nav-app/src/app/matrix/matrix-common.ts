import { Input, Output, EventEmitter } from '@angular/core';
import { Matrix, Technique, Tactic } from '../data.service';
import { ViewModel } from '../viewmodels.service';
import { ConfigService } from '../config.service';

export abstract class MatrixCommon {
    @Input() matrix: Matrix;
    @Input() viewModel: ViewModel;
    private configService: ConfigService;

    // @Output() techniqueRightClicked = new EventEmitter<TechniqueEvent>();
    // @Output() techniqueLeftClicked = new EventEmitter<TechniqueEvent>();
    // @Output() techniqueHighlight = new EventEmitter<TechniqueEvent>();

    constructor(configService: ConfigService) {
        this.configService = configService;
     }

    onTechniqueRightClick(event: any, technique: Technique) {
        console.log("rc", technique, event);
        // this.techniqueRightClicked.emit(new TechniqueEvent(event, technique));
    }

    onTechniqueLeftClick(event: any, technique: Technique, tactic: Tactic) {
        if (!this.configService.getFeature('selecting_techniques')) {
            //if selecting is disabled, same behavior as right click
            this.onTechniqueRightClick(event, technique);
            return;
        }
        if (event.shift || event.ctrl || event.meta) {
            // add to selection
            if (this.viewModel.isTechniqueSelected(technique, tactic)) this.viewModel.unselectTechnique(technique, tactic);
            else this.viewModel.selectTechnique(technique, tactic)
        } else {
            // replace selection
            if (this.viewModel.getSelectedTechniqueCount() > 1) {
                if (this.viewModel.isTechniqueSelected)
                this.viewModel.clearSelectedTechniques();
                this.viewModel.selectTechnique(technique, tactic);
            } else if (this.viewModel.isTechniqueSelected(technique, tactic))  { //unselect currently selected
                this.viewModel.clearSelectedTechniques();
            } else { //replace
                this.viewModel.clearSelectedTechniques();
                this.viewModel.selectTechnique(technique, tactic);
            }
        }
    }

    onToggleSubtechniquesVisible(technique: Technique, tactic: Tactic) {
        if (technique.subtechniques.length == 0) return;
        let tvm = this.viewModel.getTechniqueVM(technique, tactic);
        tvm.showSubtechniques = !tvm.showSubtechniques;
    }

    onTechniqueHighlight(event: any, technique: Technique, tactic: Tactic) {
        this.viewModel.highlightTechnique(technique, tactic);
    }
    onTechniqueUnhighlight(event: any) {
        this.viewModel.clearHighlight();
    }

    onTacticClick(tactic: Tactic) {
        if (this.viewModel.isTacticSelected(tactic)) this.viewModel.clearSelectedTactic();
        else this.viewModel.selectTactic(tactic);
    }
}

// export class TechniqueEvent {
//     public readonly event: Event;
//     public readonly technique: Technique;
//     constructor(event, technique) {
//         this.technique = technique;
//         this.event = event;
//     }
// }
