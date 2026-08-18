import { Matrix } from '../../classes/stix';
import { RenderableTactic, wrapTechniqueText } from './renderable-tactic';
import { RenderableTechnique } from './renderable-technique';
import { ViewModel } from '../../classes';

interface SpanCandidate {
    start: number;
    end: number;
    key: string;
    name: string;
}

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
        if (renderConfig.spanAdjacentTechniques) this.layoutSpanningTechniques(renderConfig);
    }

    /** Pack identical adjacent parent cells first, then lay out each tactic without gaps. */
    private layoutSpanningTechniques(renderConfig: any): void {
        if (this.tactics.length < 2) return;

        const columns = this.tactics.map((tactic) => tactic.techniques);
        const capacities = columns.map((column) => column.length);
        const grid: (RenderableTechnique | null)[][] = capacities.map((capacity) => Array(capacity).fill(null));
        const stateKeys = new Map<RenderableTechnique, string>();
        const occurrences = new Map<string, Map<number, RenderableTechnique>>();

        columns.forEach((column, columnIndex) => {
            column.forEach((technique) => {
                const key = technique.spanStateKey(renderConfig.showSubtechniqueMarker !== false);
                stateKeys.set(technique, key);
                if (!occurrences.has(key)) occurrences.set(key, new Map<number, RenderableTechnique>());
                occurrences.get(key)!.set(columnIndex, technique);
            });
        });

        const candidates: SpanCandidate[] = [];
        occurrences.forEach((byColumn, key) => {
            const present = Array.from(byColumn.keys()).sort((a, b) => a - b);
            let runStart = 0;
            while (runStart < present.length) {
                let runEnd = runStart + 1;
                while (runEnd < present.length && present[runEnd] === present[runEnd - 1] + 1) runEnd++;
                const run = present.slice(runStart, runEnd);
                for (let spanLength = run.length; spanLength >= 2; spanLength--) {
                    for (let offset = 0; offset <= run.length - spanLength; offset++) {
                        const start = run[offset];
                        candidates.push({ start, end: start + spanLength, key, name: byColumn.get(start)!.technique.name });
                    }
                }
                runStart = runEnd;
            }
        });

        candidates.sort((a, b) => {
            const spanDifference = b.end - b.start - (a.end - a.start);
            if (spanDifference !== 0) return spanDifference;
            const capacityDifference = Math.min(...capacities.slice(a.start, a.end)) - Math.min(...capacities.slice(b.start, b.end));
            if (capacityDifference !== 0) return capacityDifference;
            const nameDifference = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
            return nameDifference !== 0 ? nameDifference : a.start - b.start;
        });

        for (let candidate of candidates) {
            const assignedRows = new Set<number>();
            for (let column = candidate.start; column < candidate.end; column++) {
                grid[column].forEach((technique, row) => {
                    if (technique !== null && stateKeys.get(technique) === candidate.key) assignedRows.add(row);
                });
            }
            if (assignedRows.size > 1) continue;

            const rowsToCheck =
                assignedRows.size > 0
                    ? Array.from(assignedRows)
                    : Array.from({ length: Math.min(...capacities.slice(candidate.start, candidate.end)) }, (_, row) => row);
            const availableRows = rowsToCheck.filter((row) =>
                Array.from({ length: candidate.end - candidate.start }, (_, offset) => candidate.start + offset).every((column) => {
                    const entry = grid[column][row];
                    return entry === null || stateKeys.get(entry) === candidate.key;
                })
            );
            if (availableRows.length === 0) continue;
            const row = Math.min(...availableRows);
            if (
                Array.from({ length: candidate.end - candidate.start }, (_, offset) => candidate.start + offset).every((column) => {
                    const entry = grid[column][row];
                    return entry !== null && stateKeys.get(entry) === candidate.key;
                })
            ) {
                continue;
            }
            for (let column = candidate.start; column < candidate.end; column++) {
                grid[column][row] = occurrences.get(candidate.key)!.get(column)!;
            }
        }

        columns.forEach((column, columnIndex) => {
            const assigned = new Set<RenderableTechnique>(
                grid[columnIndex].filter((technique): technique is RenderableTechnique => technique !== null)
            );
            const remaining = column.filter((technique) => !assigned.has(technique));
            const emptyRows = grid[columnIndex].map((technique, row) => (technique === null ? row : -1)).filter((row) => row >= 0);
            emptyRows.forEach((row, index) => (grid[columnIndex][row] = remaining[index]));
        });

        const rowCount = Math.max(...capacities, 0);
        const rows = Array.from({ length: rowCount }, (_, row) =>
            columns.map((_column, column) => (row < grid[column].length ? grid[column][row] : null))
        );
        this.applySpanningLayout(rows, stateKeys, renderConfig);
    }

    private applySpanningLayout(rows: (RenderableTechnique | null)[][], stateKeys: Map<RenderableTechnique, string>, renderConfig: any): void {
        const cursors = this.tactics.map((tactic) => tactic.headerHeight);
        const orderedParents = this.tactics.map(() => [] as RenderableTechnique[]);
        const orderedSubtechniques = this.tactics.map(() => [] as RenderableTechnique[]);
        const childrenByParent = this.tactics.map((tactic) => {
            const children = new Map<string, RenderableTechnique[]>();
            tactic.subtechniques.forEach((subtechnique) => {
                const parentID = subtechnique.technique.parent?.id;
                if (!parentID) return;
                if (!children.has(parentID)) children.set(parentID, []);
                children.get(parentID).push(subtechnique);
            });
            return children;
        });
        const columnWidth = Math.max(Number(renderConfig.columnWidth) || 220, 1);
        const fontSize = Math.max(Number(renderConfig.fontSize) || 10, 1);
        const reserveMarker = (technique: RenderableTechnique) => renderConfig.showSubtechniqueMarker !== false && technique.showSubtechniqueMarker;
        const linesFor = (technique: RenderableTechnique, span: number) =>
            wrapTechniqueText(technique.text, columnWidth * span, fontSize, renderConfig.measureText, reserveMarker(technique));

        const appendChildren = (column: number, parent: RenderableTechnique): void => {
            for (let subtechnique of childrenByParent[column].get(parent.technique.id) || []) {
                subtechnique.setLayout(cursors[column], subtechnique.lines);
                orderedSubtechniques[column].push(subtechnique);
                cursors[column] += subtechnique.height;
            }
        };
        const layoutSingle = (column: number, technique: RenderableTechnique): void => {
            technique.setLayout(cursors[column], linesFor(technique, 1));
            orderedParents[column].push(technique);
            cursors[column] += technique.height;
            appendChildren(column, technique);
        };

        for (let row of rows) {
            let column = 0;
            while (column < row.length) {
                const technique = row[column];
                if (technique === null) {
                    column++;
                    continue;
                }
                const key = stateKeys.get(technique);
                let end = column + 1;
                while (end < row.length) {
                    const adjacent = row[end];
                    if (adjacent === null || stateKeys.get(adjacent) !== key) break;
                    end++;
                }

                const span = end - column;
                const aligned = span > 1 && new Set(cursors.slice(column, end)).size === 1;
                if (aligned) {
                    const yPosition = cursors[column];
                    const sharedLines = linesFor(technique, span);
                    for (let spanColumn = column; spanColumn < end; spanColumn++) {
                        const entry = row[spanColumn]!;
                        entry.setLayout(yPosition, sharedLines, span, spanColumn !== column);
                        orderedParents[spanColumn].push(entry);
                        cursors[spanColumn] += entry.height;
                    }
                    for (let spanColumn = column; spanColumn < end; spanColumn++) appendChildren(spanColumn, row[spanColumn]!);
                } else {
                    for (let spanColumn = column; spanColumn < end; spanColumn++) layoutSingle(spanColumn, row[spanColumn]!);
                }
                column = end;
            }
        }

        this.tactics.forEach((tactic, column) => {
            tactic.techniques.splice(0, tactic.techniques.length, ...orderedParents[column]);
            tactic.subtechniques.splice(0, tactic.subtechniques.length, ...orderedSubtechniques[column]);
            tactic.height = cursors[column];
        });
    }
}
