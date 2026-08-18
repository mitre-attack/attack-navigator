import { Matrix, Tactic, Technique } from '../../classes/stix';
import { RenderableTechnique } from './renderable-technique';
import { ViewModel } from '../../classes';

export function wrapTechniqueText(
    text: string,
    columnWidth: number = 220,
    fontSize: number = 10,
    measureText: (text: string, fontSize: number) => number = null,
    reserveMarker: boolean = false
): string[] {
    if (!text.trim()) return [''];

    const size = Math.max(Number(fontSize) || 10, 1);
    const availableWidth = Math.max(columnWidth - 8 - (reserveMarker ? 20 : 0), 1);
    const measure = measureText || ((value: string, valueFontSize: number) => value.length * valueFontSize * 0.46);
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (let word of words) {
        const candidate = currentLine ? `${currentLine} ${word}` : word;
        if (currentLine && measure(candidate, size) > availableWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = candidate;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines.length > 0 ? lines : [''];
}

export class RenderableTactic {
    public readonly tactic: Tactic;
    public readonly techniques: RenderableTechnique[] = [];
    public readonly subtechniques: RenderableTechnique[] = [];
    public readonly headerHeight: number = 2;
    public height: number;

    public get techniqueCount(): number {
        return this.techniques.length;
    }

    constructor(tactic: Tactic, matrix: Matrix, viewModel: ViewModel, renderConfig: any) {
        this.tactic = tactic;
        let filteredTechniques = viewModel.sortTechniques(viewModel.filterTechniques(tactic.techniques, tactic, matrix), tactic);
        let yPosition = this.headerHeight;
        for (let technique of filteredTechniques) {
            let techniqueVM = viewModel.getTechniqueVM(technique, tactic);
            let filteredSubtechniques = viewModel.filterTechniques(technique.subtechniques, tactic, matrix);

            let showSubtechniques =
                renderConfig.showSubtechniques == 'all' || (renderConfig.showSubtechniques == 'expanded' && techniqueVM.showSubtechniques);
            let hasSubtechniques = filteredSubtechniques.length > 0;
            let techniqueLines = this.wrapText(
                this.displayText(technique, viewModel),
                renderConfig.columnWidth,
                renderConfig.fontSize,
                renderConfig.measureText,
                hasSubtechniques && !showSubtechniques && renderConfig.showSubtechniqueMarker !== false
            );

            this.techniques.push(
                new RenderableTechnique(
                    yPosition,
                    technique,
                    tactic,
                    matrix,
                    viewModel,
                    showSubtechniques,
                    techniqueLines.length,
                    hasSubtechniques,
                    techniqueLines
                )
            );
            yPosition += techniqueLines.length;

            if (hasSubtechniques && showSubtechniques) {
                for (let subtechnique of filteredSubtechniques) {
                    let subtechniqueLines = this.wrapText(
                        this.displayText(subtechnique, viewModel),
                        Math.max((renderConfig.columnWidth || 220) - 15, 1),
                        renderConfig.fontSize,
                        renderConfig.measureText
                    );
                    this.subtechniques.push(
                        new RenderableTechnique(
                            yPosition,
                            subtechnique,
                            tactic,
                            matrix,
                            viewModel,
                            false,
                            subtechniqueLines.length,
                            false,
                            subtechniqueLines
                        )
                    );
                    yPosition += subtechniqueLines.length;
                }
            }
        }
        this.height = yPosition;
    }

    private displayText(technique: Technique, viewModel: ViewModel): string {
        let text = [];
        if (viewModel.layout.showID) text.push(technique.attackID);
        if (viewModel.layout.showName) text.push(technique.name);
        return text.join(': ');
    }

    private wrapText(
        text: string,
        columnWidth: number = 220,
        fontSize: number = 10,
        measureText: (text: string, fontSize: number) => number = null,
        reserveMarker: boolean = false
    ): string[] {
        return wrapTechniqueText(text, columnWidth, fontSize, measureText, reserveMarker);
    }
}
