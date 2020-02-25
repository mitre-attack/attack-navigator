import { Input, Output, EventEmitter } from '@angular/core';
import { Matrix, Technique, Tactic } from '../data.service';
import { ViewModel } from '../viewmodels.service';
import { ConfigService } from '../config.service';
declare var tinycolor: any; //use tinycolor2

export abstract class MatrixCommon {
    @Input() matrix: Matrix;
    @Input() viewModel: ViewModel;
    @Output() selectionChanged = new EventEmitter<any>();
    private configService: ConfigService;

    constructor(configService: ConfigService) {
        this.configService = configService;
    }


    /**
     * filter tactics according to viewmodel state
     * @param {Tactic[]} tactics to filter
     * @returns {Tactic[]} filtered tactics
     */
    private filterTactics(tactics: Tactic[]): Tactic[] {
        return tactics.filter((tactic: Tactic) => this.filterTechniques(tactic.techniques, tactic).length > 0);
    }

    /**
     * filter techniques according to viewModel state
     * @param {Technique[]} techniques list of techniques to filter
     * @param {Tactic} tactic tactic the techniques fall under
     * @returns {Technique[]} filtered techniques
     */
    private filterTechniques(techniques: Technique[], tactic: Tactic): Technique[] {
        return techniques.filter((technique: Technique) => {
            let techniqueVM = this.viewModel.getTechniqueVM(technique, tactic);
            // filter by enabled
            if (this.viewModel.hideDisabled && !techniqueVM.enabled) return false;
            if (this.matrix.name == "PRE-ATT&CK") return true; // don't filter by platform if it's pre-attack
            // filter by platform
            let platforms = new Set(technique.platforms)
            for (let platform of this.viewModel.filters.platforms.selection) {
                if (platforms.has(platform)) return true; //platform match
            }
            return false; //no platform match
        })
    }

    /**
     * sort techniques accoding to viewModel state
     * @param {Technique[]} techniques techniques to sort
     * @param {Tactic} tactic tactic the techniques fall under
     * @returns {Technique[]} sorted techniques
     */
    private sortTechniques(techniques: Technique[], tactic: Tactic): Technique[] {
        return techniques.sort((technique1: Technique, technique2: Technique) => {
            let techniqueVM1 = this.viewModel.getTechniqueVM(technique1, tactic);
            let techniqueVM2 = this.viewModel.getTechniqueVM(technique2, tactic);
            let score1 = techniqueVM1.score.length > 0 ? Number(techniqueVM1.score) : 0;
            let score2 = techniqueVM2.score.length > 0 ? Number(techniqueVM2.score) : 0;
            switch(this.viewModel.sorting) {
                default:
                case 0:
                    return technique1.name.localeCompare(technique2.name);
                case 1:
                    return technique2.name.localeCompare(technique1.name);
                case 2:
                    if (score1 === score2) return technique1.name.localeCompare(technique2.name);
                    else return score1 - score2;
                case 3:
                    if (score1 === score2) return technique1.name.localeCompare(technique2.name);
                    else return score2 - score1;
            }
        })
    }

    /**
     * apply sort and filter state to techniques
     * @param {Technique[]} techniques techniques to sort and filter
     * @param {Tactic} tactic that the techniques fall under
     * @returns {Technique[]} sorted and filtered techniques
     */
    private applyControls(techniques: Technique[], tactic: Tactic): Technique[] {
        //apply sort and filter
        return this.sortTechniques(this.filterTechniques(techniques, tactic), tactic);
    }

    private onTechniqueRightClick(event: any, technique: Technique) {
        console.log("rc", technique, event);
        // this.techniqueRightClicked.emit(new TechniqueEvent(event, technique));
    }

    private onTechniqueLeftClick(event: any, technique: Technique, tactic: Tactic) {
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
        this.selectionChanged.emit();
    }

    private onToggleSubtechniquesVisible(technique: Technique, tactic: Tactic) {
        if (technique.subtechniques.length == 0) return;
        let tvm = this.viewModel.getTechniqueVM(technique, tactic);
        tvm.showSubtechniques = !tvm.showSubtechniques;
    }

    private onTechniqueHighlight(event: any, technique: Technique, tactic: Tactic) {
        this.viewModel.highlightTechnique(technique, tactic);
    }
    private onTechniqueUnhighlight(event: any) {
        this.viewModel.clearHighlight();
    }

    private onTacticClick(tactic: Tactic) {
        if (this.viewModel.isTacticSelected(tactic)) this.viewModel.clearSelectedTactic();
        else this.viewModel.selectTactic(tactic);
    }

    private get tacticRowStyle(): any {
        return this.viewModel.showTacticRowBackground ? { 
            "background": this.viewModel.tacticRowBackground,
            "color": tinycolor.mostReadable(this.viewModel.tacticRowBackground, ['white', 'black'])
         } : {}
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
