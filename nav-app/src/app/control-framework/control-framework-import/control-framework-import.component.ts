import { Component, OnInit, Input } from '@angular/core';
import { ViewModel } from '../../viewmodels.service';
import * as Excel from 'exceljs/dist/es5/exceljs.browser';
import { NistItemFactory } from '../control-frameworks/nist-item-factory';
import { OwaspAsvsFactory } from '../control-frameworks/asvs-owasp-item-factory';
import { CisToNistItemFactory } from '../control-frameworks/cis-to-nist-item-factory';
import { AsvsNist80053Rev4MappingItemFactory } from '../control-frameworks/Asvs-Nist-80053Rev4-Mapping-Item-Factory';
import { MappingAware } from '../control-frameworks/interfaces/mapping-aware';
import { FrameworkItemFactory } from '../control-frameworks/interfaces/framework-item-factory';
import { Framework } from '../control-frameworks/interfaces/framework';

@Component({
    selector: 'ControlFrameworkImport',
    templateUrl: './control-framework-import.component.html',
    styleUrls: ['./control-framework-import.component.scss']
})
export class ControlFrameworkImportComponent {
    @Input() viewModel: ViewModel;
    frameworks: Framework[] = [{ id: 1, name: "NIST" }, { id: 2, name: "CIS" }, { id: 3, name: "OWASP ASVS" }, { id: 5, name: "ASVS Nist Mapping" }];
    selectedObject: Framework = null;
    nistItemFactory: NistItemFactory = new NistItemFactory();
    message: string = '';

    onFileSelect(input: { files: any[]; value: any }) {
        this.message = '';

        if (input.files && input.files[0]) {

            // This is an excel sheet so use the excel importer
            let factory: FrameworkItemFactory;
            let collection: any[] = [];

            if (this.selectedObject.id === 1) {
                factory = new NistItemFactory();
            } else if (this.selectedObject.id === 2) {
                factory = new CisToNistItemFactory();
            } else if(this.selectedObject.id === 3) {
                factory = new OwaspAsvsFactory();
            } else {
                factory = new AsvsNist80053Rev4MappingItemFactory();
            }

            const wb = new Excel.Workbook();
            const reader = new FileReader()
            var fileToParse = input.files[0];

            reader.readAsArrayBuffer(fileToParse)
            reader.onload = () => {
                const buffer = reader.result;

                if (fileToParse.name.endsWith('.xlsx')) {
                    wb.xlsx.load(buffer).then(this.processWorkbookFunction(factory, collection))
                }

                input.value = null;
                this.message = "Success. Parsed file."
            }

        }
    }

    private _lastItem: MappingAware;

    private processWorkbookFunction(factory: FrameworkItemFactory, collection: any[]): any {
        return (workbook: { eachSheet: (func: (sheet: any, id: any) => void) => void; }) => {
            workbook.eachSheet((sheet, id) => {
                sheet.eachRow((row: any[], rowIndex: number) => {

                    this.passRowToFactory(row, rowIndex, sheet, factory, collection);

                });
            });

            if (this.selectedObject.id === 1) {
                this.viewModel.controlFramework.nistItems = collection;
            }
            else if (this.selectedObject.id === 2) {
                this.viewModel.controlFramework.cisItems = collection;
            }
            else if(this.selectedObject.id === 3) {
                this.viewModel.controlFramework.owaspAsvs = collection;
            }
        else {
                
                this.viewModel.controlFramework.asvsNist80053Mapping = collection;
            }
        };
    }

    private passRowToFactory(row: any[], rowIndex: number, sheet: any, factory: FrameworkItemFactory, resultingCollection: any[]) {
        let currentItem: MappingAware = factory.parseRow(row, rowIndex, sheet);

        if (currentItem !== null && currentItem !== undefined) {
            if (this._lastItem && this._lastItem.mappingGroupingId() === currentItem.mappingGroupingId()) {
                // This item is the same as the last item with an additional informative reference
                this._lastItem.mappings = { ...this._lastItem.mappings, ...currentItem.mappings };
            }
            else {
                resultingCollection.push(currentItem);
                this._lastItem = currentItem;
            }
        }
    }
}


