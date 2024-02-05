import { Matrix, Tactic } from '../../classes/stix';
import { RenderableTechnique } from './renderable-technique';
import { ViewModel } from '../../classes';

export class RenderableTactic {
    public readonly tactic: Tactic;
    public readonly techniques: RenderableTechnique[] = [];
    public readonly subtechniques: RenderableTechnique[] = [];
    public height: number;

    constructor(tactic: Tactic, matrix: Matrix, viewModel: ViewModel, renderConfig: any) {
        this.tactic = tactic;
        let filteredTechniques = viewModel.sortTechniques(viewModel.filterTechniques(tactic.techniques, tactic, matrix), tactic);
        let yPosition = 1; // start at 1 to make space for tactic label
        for (let technique of filteredTechniques) {
            let techniqueVM = viewModel.getTechniqueVM(technique, tactic);
            let filteredSubtechniques = viewModel.filterTechniques(technique.subtechniques, tactic, matrix);

            let showSubtechniques =
                renderConfig.showSubtechniques == 'all' || (renderConfig.showSubtechniques == 'expanded' && techniqueVM.showSubtechniques);

            this.techniques.push(new RenderableTechnique(yPosition++, technique, tactic, matrix, viewModel, showSubtechniques));

            if (filteredSubtechniques.length > 0 && showSubtechniques) {
                for (let subtechnique of filteredSubtechniques) {
                    this.subtechniques.push(new RenderableTechnique(yPosition++, subtechnique, tactic, matrix, viewModel, renderConfig));
                }
            }
        }
        this.height = yPosition;
    }
}
