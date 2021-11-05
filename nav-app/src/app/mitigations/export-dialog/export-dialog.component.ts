import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MappingsExporter } from '../mappings-exporter';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../data.service';
import { ViewModel, ViewModelsService } from '../../viewmodels.service';

@Component({
    selector: 'export-dialog-button',
    templateUrl: 'export-dialog-button.component.html'
})
export class ExportDialogButtonComponent {
    @Input() viewModel: ViewModel;
    @Input() version: string;

    constructor(public dialog: MatDialog, private dataService: DataService, private viewModelsService: ViewModelsService) { }

    openDialog(): void {
        let mappingsExporter = new MappingsExporter();

        const dialogRef: MatDialogRef<ExportDialogComponent> = this.dialog.open(ExportDialogComponent, {
            height: "99%",
            width: "99%",
            panelClass: 'export-dialog'
        });
        dialogRef.componentInstance.mappingsExporter = mappingsExporter;
        dialogRef.componentInstance.version = this.version;
    }
}

@Component({
    selector: 'export-dialog',
    templateUrl: 'export-dialog.component.html',
    styleUrls: ['export-dialog.component.scss'],
})
export class ExportDialogComponent implements OnInit {
    displayedColumns: string[] = [];
    mappingsExporter: MappingsExporter;
    dataSource = new MatTableDataSource<any[]>();
    version: string;

    constructor(@Inject(MAT_DIALOG_DATA) objectsForTable: any[]) {
        this.dataSource.data = objectsForTable;
     }

    ngOnInit() {
        this.displayedColumns = this.dataSource.data && this.dataSource.data.length > 0 ? this.mappingsExporter.getDistinctObjectProps(this.dataSource.data) : [];
    }

    accessor(element: any, key: string, skipTrim: boolean): string {
        return (!skipTrim && element[key] && element[key].length > 100) ? element[key].slice(0, 100) + '...' : element[key];
    }

}