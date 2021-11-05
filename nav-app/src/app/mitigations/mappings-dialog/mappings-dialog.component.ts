import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewModel } from '../../viewmodels.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MappingsExporter } from '../mappings-exporter';
import { DataService } from '../../data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ControlFramework } from '../../control-framework/control-framework';
import { scoredMitigationVM } from '../scored-mitigation-vm';

@Component({
    selector: 'mappings-dialog-button',
    templateUrl: 'mappings-dialog-button.component.html'
})
export class MappingsDialogButtonComponent {
    @Input() viewModel: ViewModel;

    constructor(public dialog: MatDialog) { }

    openDialog(): void {
        const dialogRef: MatDialogRef<MappingsDialogComponent> = this.dialog.open(MappingsDialogComponent, {
            data: this.viewModel,
            height: "99%",
            width: "99%",
            panelClass: 'mappings-dialog'
        });
    }

}

@Component({
    selector: 'mappings-dialog',
    templateUrl: 'mappings-dialog.component.html',
    styleUrls: ['mappings-dialog.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])]
})
export class MappingsDialogComponent {
    mappingsExporter = new MappingsExporter();
    controlFramework = new ControlFramework();
    selectedIdValue = '';
    nistItems = [];
    mappingKey = 'mitigations';
    expandedElement = {};

    constructor(@Inject(MAT_DIALOG_DATA) public viewModel: ViewModel, private dataService: DataService) {
        this.nistItems = this.controlFramework.nistItems;
    }

    displayedColumns: string[] = ['attackId', 'name', 'score'];

    attackIdAccessor(element: scoredMitigationVM): string { return element.mitigation.attackID }
    nameAccessor(element: scoredMitigationVM): string { return element.mitigation.name }


    clickExportAll() {
        this.mappingsExporter.exportToExcel(this.dataService.getDomain(this.viewModel.domainID).techniques.filter(x => !x.isSubtechnique), this.viewModel, "All Mappings Export");
    }

    getNistItems(mitigation: scoredMitigationVM) {
        return this.controlFramework.getNistByMitigationId(mitigation.mitigation.attackID).sort((a, b) => b.subcategory.id > a.subcategory.id ? 1 : b.subcategory.id === a.subcategory.id ? 0 : -1);
    }

    removeMapping(nistSubCatId, mitigationAttackId) {
        this.controlFramework.removeMapping(nistSubCatId, mitigationAttackId);
    }

    addMapping(mitigationAttackId) {
        if (this.selectedIdValue !== '') {
            this.controlFramework.addMapping(this.selectedIdValue, mitigationAttackId);
        }
    }

    mitigations() { return this.viewModel.scoredMitigations; }

    allNist() {
        return this.controlFramework.getNistItemsWithMappings();
    }

    nistFiltered() {
        let distinctNistItems = [...new Set(this.viewModel.scoredMitigations.map(x => this.getNistItems(x)).reduce((x, i) => x.concat(i), []))];
        let nistIds = distinctNistItems.map(x => x.subcategory.id);

        return this.controlFramework.getNistItemsWithMappings().filter(x => nistIds.includes(x.nist.subcategory.id));
    }

}
