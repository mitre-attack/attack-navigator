import { Component, Input, ViewChild, HostListener, AfterViewInit, ViewEncapsulation, ɵregisterNgModuleType } from '@angular/core';
import {DataService, Technique, Matrix} from '../data.service';
import {ConfigService} from '../config.service';
import { ExportData } from "../exporter/exporter.component";
import { TabsComponent } from '../tabs/tabs.component';
import { ViewModel, TechniqueVM, Filter, Gradient, Gcolor, ViewModelsService } from "../viewmodels.service";
import {FormControl} from '@angular/forms';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuTrigger} from '@angular/material/menu';
import * as Excel from 'exceljs/dist/es5/exceljs.browser';
import * as is from 'is_js';

declare var tinygradient: any; //use tinygradient
declare var tinycolor: any; //use tinycolor2

import * as FileSaver from 'file-saver';
import { ColorPickerModule } from 'ngx-color-picker';
import { TechniquesSearchComponent } from '../techniques-search/techniques-search.component';

@Component({
    selector: 'DataTable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent implements AfterViewInit {

    //items for custom context menu
    customContextMenuItems = [];
    //is the legend panel currently expanded
    showingLegend = false;

    // The ViewModel being used by this data-table
    @Input() viewModel: ViewModel;

    currentDropdown: string = ""; //current dropdown menu


    //////////////////////////////////////////////////////////
    // Stringifies the current view model into a json string//
    // stores the string as a blob                          //
    // and then saves the blob as a json file               //
    //////////////////////////////////////////////////////////

    saveLayerLocally(){
        var json = this.viewModel.serialize(); //JSON.stringify(this.viewModel.serialize(), null, "\t");
        var blob = new Blob([json], {type: "text/json"});
        let filename = this.viewModel.name.replace(/ /g, "_") + ".json";
        // FileSaver.saveAs(blob, this.viewModel.name.replace(/ /g, "_") + ".json");
        this.saveBlob(blob, filename);
        
    }

    saveBlob(blob, filename){
        if (is.ie()) { //internet explorer
            window.navigator.msSaveBlob(blob, filename)
        } else {
            var svgUrl = URL.createObjectURL(blob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = filename
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    /////////////////////////////
    //     EXPORT TO EXCEL     //
    /////////////////////////////


    saveLayerLocallyExcel() {
        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet(this.viewModel.name);
        let matrices = this.viewModel.filters.filterMatrices(this.dataService.matrices);
        for (let matrix of matrices) {
            //TODO: check for multiple matrices
            
            // CREATE TACTIC COLUMNS
            let columns = matrix.tactics.map(tactic => {
                return {header: tactic.name, key: tactic.name};
            })
            worksheet.columns = columns;

            // CREATE CELLS
            for (let tactic of matrix.tactics) {
                let tacticCol = worksheet.getColumn(tactic.name);
                let techniques = this.viewModel.applyControls(tactic.techniques, tactic, matrix);
                let techniqueCells = techniques.map(technique => { return technique.name });
                let subtechniqueList = [];

                // SUBTECHNIQUES
                let subtechniqueCells = [];
                for (let technique of techniques) {
                    let techniqueRow = techniqueCells.indexOf(technique.name);
                    let tvm = this.viewModel.getTechniqueVM(technique, tactic);
                    if(tvm.showSubtechniques) {
                        // retrieve subtechniques
                        let subtechniques = this.viewModel.applyControls(technique.subtechniques, tactic, matrix)
                            .map( sub => { return sub.name });
                        technique.subtechniques.forEach(sub => subtechniqueList.push(sub));

                        // format technique cells for subtechniques
                        let excelIndex = 0;
                        for (let subtechnique of subtechniques) {
                            if(excelIndex !== 0) {
                                techniqueCells.splice(techniqueRow + excelIndex, 0, technique.name);
                            }
                            subtechniqueCells[techniqueRow + excelIndex++] = subtechnique;
                        }

                        // merge technique cells
                        worksheet.mergeCells(techniqueRow + 2, tacticCol.number,
                                             techniqueRow + excelIndex + 1, tacticCol.number);
                    }
                }

                if(subtechniqueCells.length > 0) {
                    // add subtechniques column
                    let id = columns.findIndex(col => col.key == tactic.name);
                    columns.splice(id + 1, 0, {header: tactic.name, key: tactic.name + " Subtechniques"});
                    worksheet.columns = columns;

                    // merge subtechniques header
                    let subtechniqueCol = worksheet.getColumn(tactic.name + " Subtechniques");
                    worksheet.mergeCells(tacticCol.letter + '1:' + subtechniqueCol.letter + '1');
                    subtechniqueCol.values = [tactic.name.toString() + ' Subtechniques'].concat(subtechniqueCells);

                    // STYLE SUBTECHNIQUE CELLS
                    subtechniqueCol.eachCell(cell => {
                        if(cell.row > 1) {
                            if(cell.value && cell.value !== undefined) {
                                let subtechnique = subtechniqueList.find(s => { return s.name == cell.value });
                                let svm = this.viewModel.getTechniqueVM(subtechnique, tactic);
                                this.styleCells(cell, svm);
                            }
                        }
                    });
                }

                tacticCol.values = [tactic.name.toString()].concat(techniqueCells);
                
                // STYLE TECHNIQUE CELLS
                tacticCol.eachCell(cell => {
                    if (cell.row > 1) {
                        if(cell.value && cell.value !== undefined) {
                            let technique = techniques.find( t => { return t.name === cell.value });
                            let tvm = this.viewModel.getTechniqueVM(technique, tactic);
                            this.styleCells(cell, tvm);
                        }
                    }
                });
            }
        }

        // STYLE HEADERS
        worksheet.columns.forEach(column => {column.width = column.header.length < 30 ? 30 : column.header.length});
        if (this.viewModel.showTacticRowBackground) {
            worksheet.getRow(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {'argb': 'FF' + this.viewModel.tacticRowBackground.substring(1)}}
            worksheet.getRow(1).font = {bold: true, color: {"argb": 'FF' + tinycolor.mostReadable(this.viewModel.tacticRowBackground, ["white", "black"]).toHex()}};
            worksheet.getRow(1).alignment = {horizontal: 'center'};
        } else {
            worksheet.getRow(1).font = {bold: true};
            worksheet.getRow(1).alignment = {horizontal: 'center'};
        }

        // SAVE
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob( [data], {type: "application/octet-stream"} );
            const filename = this.viewModel.name.replace(/ /g, "_") + ".xlsx";
            this.saveBlob(blob, filename);
        });
    }

    styleCells(cell, tvm) {
        cell.alignment = {vertical: 'top', horizontal: 'left'};
        if(tvm.enabled) {
            if (tvm.color) { //manually assigned
                cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + tvm.color.substring(1)}};
                cell.font = {color: {'argb': 'FF' + tinycolor.mostReadable(tvm.color, ["white", "black"]).toHex()}};
            }
            else if (tvm.score) { //score assigned
                cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + tvm.scoreColor.toHex()}};
                cell.font = {color: {'argb': 'FF' + tinycolor.mostReadable(tvm.scoreColor, ["white", "black"]).toHex()}};
            }
            if (tvm.comment) { //comment present on technique
                cell.note = tvm.comment;
            }
        } else { //disabled
            cell.font = {color: {'argb': 'FFBCBCBC'}}
        }
    }

    constructor(private dataService: DataService, 
                private tabs: TabsComponent, 
                private sanitizer: DomSanitizer, 
                private viewModelsService: ViewModelsService, 
                private configService: ConfigService) { }

    /**
     * Angular lifecycle hook
     */
    ngAfterViewInit(): void {}

    // open custom url in a new tab
    openCustomURL(event, technique, url){
        // var formattedTechniqueName = this.contextMenuSelectedTechnique.name.replace(/ /g, "_");

        // var formattedURL = url.replace(/~Technique_ID~/g, this.contextMenuSelectedTechnique.technique_id);
        // formattedURL = formattedURL.replace(/~Technique_Name~/g, formattedTechniqueName);
        // formattedURL = formattedURL.replace(/~Tactic_Name~/g, this.contextMenuSelectedTactic);

        // var win = window.open(formattedURL);
        // if (win) {
        //     win.focus();
        // } else {
        //     alert('Please allow popups for this website');
        // }
    }


    // edit field bindings
    commentEditField: string = "";
    scoreEditField: string = "";
    /**
     * triggered on left click of technique
     * @param  technique      technique which was left clicked
     * @param  addToSelection add to the technique selection (shift key) or replace selection?
     */
    onTechniqueSelect(technique, addToSelection, eventX, eventY): void {
        
        if (!this.viewModel.isCurrentlyEditing()) {
            if (["comment", "score", "colorpicker"].includes(this.currentDropdown)) this.currentDropdown = ""; //remove technique control dropdowns, because everything was deselected
            return;
        }
        //else populate editing controls
        this.populateEditFields();
    }

    /**
     * populate edit fields. Gets common values if common values exist for all editing values
     */
    populateEditFields(): void {
        this.commentEditField = this.viewModel.getEditingCommonValue("comment");
        this.scoreEditField = this.viewModel.getEditingCommonValue("score");
    }

    /**
     * Set the state (enabled/disabled) of the selected features
     */
    setSelectedState(): void {
        let currentState = this.viewModel.getEditingCommonValue('enabled')
        if (currentState === '') this.viewModel.editSelectedTechniques('enabled', false)
        else                     this.viewModel.editSelectedTechniques('enabled', !currentState)
    }

    //sanitize the given css so that it can be displayed without error
    sanitize(css) {
        return this.sanitizer.bypassSecurityTrustStyle(css);
    }

    /**
     * Is score input valid number
     * @param  event keypress event just in case we need it
     * @return       true if valid number
     */
    validateScoreInput(event) {
        let result: boolean = isNaN(Number(this.scoreEditField))
        return result
    }

    /**
     * Return whether the given dropdown element would overflow the side of the page if aligned to the right of its anchor
     * @param  dropdown the DOM node of the panel
     * @return          true if it would overflow
     */
    checkalign(dropdown): boolean {
        // console.log(anchor)
        let anchor = dropdown.parentNode;
        return anchor.getBoundingClientRect().left + dropdown.getBoundingClientRect().width > document.body.clientWidth;
    }

    /**
     * open an export layer render tab for the current layer
     */
    exportRender(): void {
        // let viewModelCopy = new ViewModel(this.viewModel.name, this.viewModel.domain, "vm" + this.viewModelsService.getNonce(), this.dataService);
        // viewModelCopy.deSerialize(this.viewModel.serialize());
        // let exportData = new ExportData(viewModelCopy, JSON.parse(JSON.stringify(this.tactics)), this.dataService.tacticNames(this.filteredTechniques),  JSON.parse(JSON.stringify(this.filteredTechniques)));
        // this.tabs.newExporterTab(exportData);
    }
}