import { Component, Input, ViewChild, HostListener, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {DataService, Technique, Matrix, Domain} from '../data.service';
import {ConfigService} from '../config.service';
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
import { TmplAstVariable } from '@angular/compiler';

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
        let domain = this.dataService.getDomain(this.viewModel.domainID);
        for (let matrix of domain.matrices) {
            var worksheet = workbook.addWorksheet(matrix.name + " (v" + domain.getVersion() + ")");  
                      
            // create tactic columns
            let columns = this.viewModel.filterTactics(matrix.tactics, matrix).map(tactic => { return {header: this.getDisplayName(tactic), key: tactic.name} });
            worksheet.columns = columns;

            // create cells
            for (let tactic of this.viewModel.filterTactics(matrix.tactics, matrix)) {
                let tacticCol = worksheet.getColumn(tactic.name);
                let techniques = this.viewModel.applyControls(tactic.techniques, tactic, matrix);
                let techniqueCells = techniques.map(technique => { return technique.name });
                let subtechniqueList = [];

                // create subtechnique cells, if shown
                let subtechniqueCells = [];
                for (let technique of techniques) {
                    let techniqueRow = techniqueCells.indexOf(technique.name);
                    let tvm = this.viewModel.getTechniqueVM(technique, tactic);
                    if(tvm.showSubtechniques) {
                        // retrieve subtechniques
                        let subtechniques = this.viewModel.applyControls(technique.subtechniques, tactic, matrix)
                            .map( sub => { return sub.name });
                        subtechniqueList = subtechniqueList.concat(technique.subtechniques);

                        // format technique cells for subtechniques
                        let excelIndex = 0;
                        for (let subtechnique of subtechniques) {
                            if(excelIndex !== 0) {
                                techniqueCells.splice(techniqueRow + excelIndex, 0, technique.name);
                            }
                            subtechniqueCells[techniqueRow + excelIndex++] = subtechnique;
                        }

                        // merge technique cells
                        if (excelIndex > 0) {
                            worksheet.mergeCells(techniqueRow + 2, tacticCol.number, techniqueRow + excelIndex + 1, tacticCol.number);
                        }
                    }
                }

                if(subtechniqueCells.length > 0) {
                    // add subtechniques column
                    let id = columns.findIndex(col => col.key == tactic.name);
                    columns.splice(id + 1, 0, {header: this.getDisplayName(tactic), key: tactic.name + "Subtechniques"});
                    worksheet.columns = columns;

                    // merge subtechniques header
                    let subtechniqueCol = worksheet.getColumn(tactic.name + "Subtechniques");
                    worksheet.mergeCells(tacticCol.letter + '1:' + subtechniqueCol.letter + '1');
                    subtechniqueCol.values = [tactic.name.toString() + "Subtechniques"].concat(subtechniqueCells);

                    // style subtechnique cells
                    subtechniqueCol.eachCell(cell => {
                        if(cell.row > 1) {
                            if(cell.value && cell.value !== undefined) {
                                let subtechnique = subtechniqueList.find(s => { 
                                    return s.name == cell.value.substring(cell.value.indexOf(':') + 1).trim() || s.attackID === cell.value });
                                let svm = this.viewModel.getTechniqueVM(subtechnique, tactic);
                                this.styleCells(cell, subtechnique, svm);
                            }
                        }
                    });
                }
                tacticCol.values = [this.getDisplayName(tactic)].concat(techniqueCells);

                // style technique cells
                tacticCol.eachCell(cell => {
                    if (cell.row > 1) {
                        if(cell.value && cell.value !== undefined) {
                            let technique = techniques.find( t => { 
                                return t.name === cell.value.substring(cell.value.indexOf(':') + 1).trim() || t.attackID === cell.value });
                            let tvm = this.viewModel.getTechniqueVM(technique, tactic);
                            this.styleCells(cell, technique, tvm);
                        }
                    }
                });
            }
            
            // style tactic headers
            worksheet.columns.forEach(column => {
                if (this.viewModel.layout.showID && !this.viewModel.layout.showName) {
                    column.width = column.header.length < 15 ? 15 : column.header.length;
                } else {
                    column.width = column.header.length < 30 ? 30 : column.header.length;
                }
            });

            worksheet.getRow(1).alignment = {horizontal: 'center'};
            worksheet.getRow(1).border = {bottom: {style: 'thin'}};
            worksheet.getRow(1).font = {bold: true};
            if (this.viewModel.showTacticRowBackground) {
                worksheet.getRow(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {'argb': 'FF' + this.viewModel.tacticRowBackground.substring(1)}}
                worksheet.getRow(1).font = {bold: true, color: {"argb": 'FF' + tinycolor.mostReadable(this.viewModel.tacticRowBackground, ["white", "black"]).toHex()}};
            }
        }

        // save file
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob( [data], {type: "application/octet-stream"} );
            const filename = this.viewModel.name.replace(/ /g, "_") + ".xlsx";
            this.saveBlob(blob, filename);
        });
    }

    /**
     * Get the display name for technique/tactic as shown in layout
     */
    getDisplayName(technique) {
        if (this.viewModel.layout.showID && this.viewModel.layout.showName) {
            return technique.attackID + ': ' + technique.name;
        } else if (this.viewModel.layout.showID) {
            return technique.attackID;
        } else {
            return technique.name;
        }
    }

    /**
     * Helper function for exporting to excel to stylize cells
     */
    styleCells(cell, technique, tvm) {
        cell.value = this.getDisplayName(technique);

        // cell format
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

        // subtechniques border
        if (tvm.showSubtechniques) {
            cell.border = {top: {style: 'thin'}, bottom:{style: 'thin'}, left: {style: 'thin'}}
        } else if (technique.isSubtechnique) {
            cell.border = {top: {style: 'thin'}, bottom:{style: 'thin'}, right: {style: 'thin'}}
        }
    }

    constructor(public dataService: DataService, 
                private tabs: TabsComponent, 
                private sanitizer: DomSanitizer, 
                private viewModelsService: ViewModelsService, 
                public configService: ConfigService) { }

    /**
     * Angular lifecycle hook
     */
    ngAfterViewInit(): void {
        // setTimeout(() => this.exportRender(), 500);
    }

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
     * Show all sub-techniques in layout view
     */
    expandSubtechniques(): void {
        if (this.viewModel.layout.layout == "mini") return; //control disabled in mini layout
        for (let technique of this.dataService.getDomain(this.viewModel.domainID).techniques) {
            if (technique.subtechniques.length > 0) {
                for (let id of technique.get_all_technique_tactic_ids()) {
                    let tvm = this.viewModel.getTechniqueVM_id(id);
                    tvm.showSubtechniques = true;
                }
            }
        }
    }

    /**
     * Hide all sub-techniques in layout view
     */
    collapseSubtechniques(): void {
        if (this.viewModel.layout.layout == "mini") return; //control disabled in mini layout
        this.viewModel.techniqueVMs.forEach(function(tvm, key) {
            tvm.showSubtechniques = false; });
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
        this.tabs.openSVGDialog(this.viewModel);
    }
}