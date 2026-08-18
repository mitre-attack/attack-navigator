import { Matrix, Tactic, Technique } from '../../classes/stix';
import { TechniqueVM, ViewModel } from '../../classes';
import tinycolor from 'tinycolor2';

export class RenderableTechnique {
    public yPosition: number;
    public height: number;
    public readonly technique: Technique;
    public readonly tactic: Tactic;
    public readonly matrix: Matrix;
    public readonly showSubtechniques: boolean;
    public readonly hasSubtechniques: boolean;
    public lines: string[];
    public readonly viewModel: ViewModel;
    public columnSpan: number = 1;
    public spanFollower: boolean = false;

    constructor(
        yPosition: number,
        technique: Technique,
        tactic: Tactic,
        matrix: Matrix,
        viewModel: ViewModel,
        showSubtechniques: boolean = false,
        height: number = 1,
        hasSubtechniques: boolean = false,
        lines: string[] = []
    ) {
        this.yPosition = yPosition;
        this.height = height;
        this.technique = technique;
        this.tactic = tactic;
        this.matrix = matrix;
        this.viewModel = viewModel;
        this.showSubtechniques = showSubtechniques;
        this.hasSubtechniques = hasSubtechniques;
        this.lines = lines.length > 0 ? lines : [this.text];
    }

    public get showSubtechniqueMarker(): boolean {
        return this.hasSubtechniques && !this.showSubtechniques;
    }

    public get highlighted(): boolean {
        if (!this.viewModel.hasTechniqueVM(this.technique, this.tactic)) return false;
        const techniqueVM: TechniqueVM = this.viewModel.getTechniqueVM(this.technique, this.tactic);
        return techniqueVM.enabled && this.fill !== null;
    }

    /** Identity plus every state that can make two exported parent cells differ. */
    public spanStateKey(renderSubtechniqueMarker: boolean): string {
        const normalizedColor = (value: any): string | null => {
            if (value === null || value === undefined || value === '') return null;
            const color = tinycolor(value.toString());
            return color.isValid() ? color.toHex8String() : value.toString();
        };
        return JSON.stringify([
            this.technique.id,
            normalizedColor(this.fill),
            normalizedColor(this.textColor),
            this.viewModel.isTechniqueSelected(this.technique, this.tactic),
            this.showSubtechniques,
            renderSubtechniqueMarker && this.showSubtechniqueMarker,
        ]);
    }

    public setLayout(yPosition: number, lines: string[], columnSpan: number = 1, spanFollower: boolean = false): void {
        this.yPosition = yPosition;
        this.lines = lines;
        this.height = Math.max(lines.length, 1);
        this.columnSpan = columnSpan;
        this.spanFollower = spanFollower;
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
