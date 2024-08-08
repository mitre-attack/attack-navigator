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
            if (tactic.shortname === 'defense evasion') {
                let splitTactics = this.splitDefenseEvasion(tactic, matrix, viewModel, renderConfig);
                this.tactics.push(...splitTactics);
            } else {
                this.tactics.push(new RenderableTactic(tactic, matrix, viewModel, renderConfig));
            }
        }
    }

    private splitDefenseEvasion(tactic, matrix, viewModel, renderConfig): RenderableTactic[] {
        const techniques = tactic.techniques;
        const half = Math.ceil(techniques.length / 2);
        const firstHalfTactic = {
            ...tactic,
            techniques: techniques.slice(0, half),
            shortname: `${tactic.shortname} (1)`
        };
        const secondHalfTactic = {
            ...tactic,
            techniques: techniques.slice(half),
            shortname: `${tactic.shortname} (2)`
        };

        return [
            new RenderableTactic(firstHalfTactic, matrix, viewModel, renderConfig),
            new RenderableTactic(secondHalfTactic, matrix, viewModel, renderConfig)
        ];
    }
}
