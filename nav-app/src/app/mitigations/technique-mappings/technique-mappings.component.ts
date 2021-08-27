import { Component, Input, OnInit } from '@angular/core';
import { ViewModel, ViewModelsService } from '../../viewmodels.service';
import { DataService, Technique } from '../../data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MappingsExporter } from '../mappings-exporter';
import { scoredMitigationVM } from '../scored-mitigation-vm';

@Component({
    selector: 'technique-mappings',
    templateUrl: './technique-mappings.component.html',
    styleUrls: ['./technique-mappings.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class TechniqueMappingsComponent implements OnInit {
    @Input() viewModel: ViewModel;
    techniqueDisplayedColumns: string[] = ['attackID', 'name', "techniqueToNist", "techniqueToCis", "techniqueToAsvs"];

    expandedElement = {};
    mappingsExporter;

    constructor(private dataService: DataService, private viewModelsService: ViewModelsService) {
        this.techniquesSortBy = this.techniquesSortBy.bind(this);
        this.techniqueToNist = this.techniqueToNist.bind(this);
        this.techniqueToAsvs = this.techniqueToAsvs.bind(this);
        this.techniqueToCisCount = this.techniqueToCisCount.bind(this);
        this.sortBy = this.sortBy.bind(this);


        this.sortByDesc = this.sortByDesc.bind(this);
        this.sortScoredMitigationsBy = this.sortScoredMitigationsBy.bind(this);
        this.techniqueToCis = this.techniqueToCis.bind(this);
        this.techniqueToAsvsCount = this.techniqueToAsvsCount.bind(this);
        this.techniqueToNistCount = this.techniqueToNistCount.bind(this);
        this.mappingsExporter = new MappingsExporter(dataService, viewModelsService);
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

    techniqueToNist(technique: Technique) {
        return this.viewModel.controlFramework.getTechniqueMapping(technique, this.viewModel.domainID)?.mapping.nist.map(x => x.subcategory.id);
    }

    techniqueToNistCount(technique: Technique) {
        return this.techniqueToNist(technique)?.length;
    }

    techniqueToCis(technique: Technique) {
        return this.viewModel.controlFramework.getTechniqueMapping(technique, this.viewModel.domainID)?.mapping.cis.map(x => x.cisSubControlId);
    }

    techniqueToCisCount(technique: Technique) {
        return this.techniqueToCis(technique)?.length;
    }

    techniqueToAsvs(technique: Technique) {
        return this.viewModel.controlFramework.getTechniqueMapping(technique, this.viewModel.domainID)?.mapping.asvs.map(x => x.itemId);
    }

    techniqueToAsvsCount(technique: Technique) {
        return this.techniqueToAsvs(technique)?.length;
    }

    ngOnInit() {
    }

    componentsChanged(event, value) {
        this.viewModel.selectedComponents = value.filter(x => x.selected).map(x => x.value);
    }

    attackIdAccessor(element: scoredMitigationVM): string { return element.mitigation.attackID }
    nameAccessor(element: scoredMitigationVM): string { return element.mitigation.name }
}