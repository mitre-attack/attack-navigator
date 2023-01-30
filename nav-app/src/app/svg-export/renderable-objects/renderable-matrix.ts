import { Matrix } from "../../data.service";
import { ViewModel } from "../../viewmodels.service";
import { RenderableTactic } from "./renderable-tactic";

export class RenderableMatrix {
    public readonly matrix: Matrix;
    public readonly tactics: RenderableTactic[] = [];

    public get height() {
        let heights = this.tactics.map(function(tactic: RenderableTactic) { return tactic.height; })
        return Math.max(...heights);
    }

    constructor(matrix: Matrix, viewModel: ViewModel, config: any) {
        this.matrix = matrix;
        let filteredTactics = viewModel.filterTactics(matrix.tactics, matrix);
        for (let tactic of filteredTactics) {
            this.tactics.push(new RenderableTactic(tactic, matrix, viewModel, config));
        }
    }
}