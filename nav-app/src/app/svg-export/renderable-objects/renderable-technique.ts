import { Matrix, Tactic, Technique } from '../../classes/stix';
import { TechniqueVM, ViewModel } from '../../classes';
import tinycolor from 'tinycolor2';

export class RenderableTechnique {
    public readonly yPosition: number;
    public readonly technique: Technique;
    public readonly tactic: Tactic;
    public readonly matrix: Matrix;
    public readonly showSubtechniques;
    public readonly viewModel: ViewModel;

    constructor(yPosition, technique: Technique, tactic: Tactic, matrix: Matrix, viewModel: ViewModel, showSubtechniques = false) {
        this.yPosition = yPosition;
        this.technique = technique;
        this.tactic = tactic;
        this.matrix = matrix;
        this.viewModel = viewModel;
        this.showSubtechniques = showSubtechniques;
    }

    public get fill() {
        if (this.viewModel.hasTechniqueVM(this.technique, this.tactic)) {
            let techniqueVM: TechniqueVM = this.viewModel.getTechniqueVM(this.technique, this.tactic);
            if (!techniqueVM.enabled) return 'white';
            if (techniqueVM.color) return techniqueVM.color;
            if (this.viewModel.layout.showAggregateScores && techniqueVM.aggregateScoreColor) return techniqueVM.aggregateScoreColor;
            if (techniqueVM.score) return techniqueVM.scoreColor;
        }
        return null; //default
    }

    public get textColor() {
        if (this.viewModel.hasTechniqueVM(this.technique, this.tactic)) {
            let techniqueVM: TechniqueVM = this.viewModel.getTechniqueVM(this.technique, this.tactic);
            if (!techniqueVM.enabled) return '#aaaaaa';
        }
        if (this.fill) {
            return tinycolor.mostReadable(this.fill, ['white', 'black']); //default;
        }
        return null;
    }

    public get text() {
        let text = [];
        if (this.viewModel.layout.showID) text.push(this.technique.attackID);
        if (this.viewModel.layout.showName) text.push(this.technique.name);
        return text.join(': ');
    }
}
