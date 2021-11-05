import { Component, Input, OnInit } from '@angular/core';
import { ViewModel, ViewModelsService } from '../viewmodels.service';
import { DataService, Technique } from '../data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MappingsExporter } from './mappings-exporter';
import { scoredMitigationVM } from './scored-mitigation-vm';

@Component({
    selector: 'app-mitigations',
    templateUrl: './mitigations.component.html',
    styleUrls: ['./mitigations.component.scss']
})
export class MitigationsComponent implements OnInit {
    @Input() viewModel: ViewModel;
    displayedColumns: string[] = ['attackId', 'name', 'score'];
    selection = new SelectionModel<scoredMitigationVM>(true, []);
    expandedElement = {};
    mappingsExporter;

    constructor(private dataService: DataService) {
        this.sortBy = this.sortBy.bind(this);
        this.sortByDesc = this.sortByDesc.bind(this);
        this.techniquesSortBy = this.techniquesSortBy.bind(this);
        this.selectMitigation = this.selectMitigation.bind(this);
        this.sortScoredMitigationsBy = this.sortScoredMitigationsBy.bind(this);
        this.processSelectedMitigations = this.processSelectedMitigations.bind(this);
        this.mappingsExporter = new MappingsExporter();
    }

    domainIsNotNist() : Boolean{
        return this.viewModel.domainID !== "nist-attack-v9";
    }

    sortScoredMitigationsBy(prop: string) {
        return this.viewModel.scoredMitigations.sort((a, b) => b[prop] > a[prop] ? 1 : b[prop] === a[prop] ? 0 : -1);
    }

    sortBy(array: Array<any>, prop: string) {
        return array.sort((a, b) => b[prop] < a[prop] ? 1 : b[prop] === a[prop] ? 0 : -1);
    }

    sortByDesc(array: Array<any>, prop: string) {
        return array.sort((a, b) => b[prop] > a[prop] ? 1 : b[prop] === a[prop] ? 0 : -1);
    }

    techniquesSortBy(prop: string) {
        return this.viewModel.mitigationTechnique.sort((a, b) => b[prop] > a[prop] ? 1 : b[prop] === a[prop] ? 0 : -1);
    }

    ngOnInit() {
    }

    clickExport() {
        this.mappingsExporter.exportToExcel(this.viewModel.mitigationTechnique, this.viewModel);
    }

    selectMitigation(row: scoredMitigationVM) {
        this.selection.toggle(row);

        this.processSelectedMitigations();
    }

    componentsChanged(event, value) {
        this.viewModel.selectedComponents = value.filter(x => x.selected).map(x => x.value);
    }

    private processSelectedMitigations() {
        this.viewModel.clearSelectedTechniques();

        let setOfTechniqueIds = new Set<string>();
        this.selection.selected.forEach((scoredMitigation: scoredMitigationVM) => {
            let relatedTechniques: string[] = scoredMitigation.mitigation.relatedTechniques(this.viewModel.domainID);
            relatedTechniques.forEach(x => setOfTechniqueIds.add(x));
        });

        let allTechniquesToSelect: Technique[] = [];
        this.getTechniquesByIds(setOfTechniqueIds).forEach((technique: Technique) => allTechniquesToSelect.push(technique));

        allTechniquesToSelect.forEach((techinique: Technique) => {
            this.viewModel.selectTechniqueAcrossTactics(techinique);
        });
    }

    private getTechniquesByIds(setOfTechniqueIds: Set<string>) {
        return this.dataService.getDomain(this.viewModel.domainID).techniques
            .filter((techniqueToFilter) => setOfTechniqueIds.has(techniqueToFilter.id));
    }

    IdAccessor(element: scoredMitigationVM): string { return element.mitigation.attackID }
    nameAccessor(element: scoredMitigationVM): string { return element.mitigation.name }
}