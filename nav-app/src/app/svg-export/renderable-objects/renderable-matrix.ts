import { Matrix } from '../../classes/stix';
import { RenderableTactic } from './renderable-tactic';
import { ViewModel } from '../../classes';

export class RenderableMatrix {
    public matrix: Matrix;
    public tactics: RenderableTactic[] = [];

    public get height() {
        let heights = this.tactics.map(function (tactic: RenderableTactic) {
            return tactic.height;
        });
        return Math.max(...heights);
    }

    constructor(matrix: Matrix, viewModel: ViewModel, renderConfig: any) {
        this.matrix = matrix;
        let filteredTactics = viewModel.filterTactics(matrix.tactics, matrix);
        for (let tactic of filteredTactics) {
            this.tactics.push(new RenderableTactic(tactic, matrix, viewModel, renderConfig));
        }
    }
}
