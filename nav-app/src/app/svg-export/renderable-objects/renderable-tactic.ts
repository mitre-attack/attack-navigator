import { Matrix, Tactic } from "../../data.service";
import { ViewModel } from "../../viewmodels.service";
import { RenderableTechnique } from "./renderable-technique";

export class RenderableTactic {
    public readonly tactic: Tactic;
    public readonly techniques: RenderableTechnique[] = [];
    public readonly subtechniques: RenderableTechnique[] = [];
    public readonly height: number;

    constructor(tactic: Tactic, matrix: Matrix, viewModel: ViewModel, config: any) {
        this.tactic = tactic;
        let filteredTechniques = viewModel.sortTechniques(viewModel.filterTechniques(tactic.techniques, tactic, matrix), tactic);
        let yPosition = 1; // start at 1 to make space for tactic label
        for (let technique of filteredTechniques) {
            let techniqueVM = viewModel.getTechniqueVM(technique, tactic);
            let filteredSubtechniques = viewModel.filterTechniques(technique.subtechniques, tactic, matrix);
            
            let showSubtechniques = config.showSubtechniques == "all" || (config.showSubtechniques == "expanded" && techniqueVM.showSubtechniques)

            this.techniques.push(new RenderableTechnique(yPosition++, technique, tactic, matrix, viewModel, showSubtechniques));

            if (filteredSubtechniques.length > 0 && showSubtechniques) {
                for (let subtechnique of filteredSubtechniques) {
                    this.subtechniques.push(new RenderableTechnique(yPosition++, subtechnique, tactic, matrix, viewModel, config));
                }
            }
        }
        this.height = yPosition;
    }
}