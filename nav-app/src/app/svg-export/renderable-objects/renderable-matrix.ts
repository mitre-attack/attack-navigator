import { Matrix } from "../../classes/stix";
import { RenderableTactic } from "./renderable-tactic";
import { ViewModel } from "../../services/viewmodels.service";

export class RenderableMatrix {
    public readonly matrix: Matrix;
    public readonly tactics: RenderableTactic[] = [];
    public get height() {
        let heights = this.tactics.map(function(tactic: RenderableTactic) { return tactic.height; })
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
