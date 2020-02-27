import { Component, Input, ViewChild, HostListener, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {DataService, Technique} from '../data.service';
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
        // let self = this;
        // var workbook = new Excel.Workbook();
        // var worksheet = workbook.addWorksheet('layer');

        // // CREATE COLS
        // worksheet.columns = this.dataService.tacticNames(this.filteredTechniques).map(tacticname => {
        //     return {header: tacticname, key: tacticname}
        // })
       
        // // CREATE CELLS
        // for (const tacticName of this.dataService.tacticNames(this.filteredTechniques)) {
        //     let col = worksheet.getColumn(tacticName);
        //     let techniques = this.tactics[tacticName.toString()]
        //     let cells = techniques.map(technique => {
        //         return technique.name;
        //         // return this.viewModel.getTechniqueVM(technique.technique_tactic_union_id).;
        //     })
        //     //toString because String != string
        //     col.values = [this.tacticDisplayNames[tacticName.toString()]].concat(cells) //insert header cell at top of col
        //     col.eachCell((cell, rowNumber) => {
        //         if (rowNumber > 1) { //skip tactic header

        //             let index = rowNumber - 2; //skip header, and exceljs indexes starting at 1 
        //             if (cell.value && cell.value != "") { // handle jagged cols
        //                 // console.log(cell.value);
                        
        //                 let tvm = this.viewModel.getTechniqueVM(techniques[index].technique_tactic_union_id);
        //                 if (tvm.enabled) {
        //                     if (tvm.color) { //manually assigned
        //                         cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + tvm.color.substring(1)}};
        //                         cell.font = {color: {'argb': 'FF' + tinycolor.mostReadable(tvm.color, ["white", "black"]).toHex()}}
        //                     }
        //                     else if (tvm.score) { //score assigned
        //                         cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + tvm.scoreColor.toHex()}};
        //                         cell.font = {color: {'argb': 'FF' + tinycolor.mostReadable(tvm.scoreColor, ["white", "black"]).toHex()}}
        //                     }
        //                     if (tvm.comment) { //comment present on technique
        //                         cell.note = tvm.comment;
        //                     }
        //                 } else { //disabled
        //                     cell.font = {color: {'argb': 'FFBCBCBC'}}
        //                 }
        //             }
        //         }
        //     })
        // }

        // // STYLE      
        // // width of cols
        // worksheet.columns.forEach(column => {column.width = column.header.length < 20 ? 20 : column.header.length});
        // //tactic background
        // if (this.viewModel.showTacticRowBackground) {
        //     worksheet.getRow(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {'argb': 'FF' + this.viewModel.tacticRowBackground.substring(1)}}
        //     worksheet.getRow(1).font = {bold: true, color: {"argb": 'FF' + tinycolor.mostReadable(this.viewModel.tacticRowBackground, ["white", "black"]).toHex()}};
        // } else {
        //     worksheet.getRow(1).font = {bold: true}; //bold header
        // }
        //  // Save the workbook
        //  workbook.xlsx.writeBuffer().then( data => {
        //     const blob = new Blob( [data], {type: "application/octet-stream"} );
        //     const filename = this.viewModel.name.replace(/ /g, "_") + ".xlsx";
        //     this.saveBlob(blob, filename);

        //   });
    }

    constructor(private dataService: DataService, 
                private tabs: TabsComponent, 
                private sanitizer: DomSanitizer, 
                private viewModelsService: ViewModelsService, 
                private configService: ConfigService) { }

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
        let viewModelCopy = new ViewModel(this.viewModel.name, this.viewModel.domain, "vm" + this.viewModelsService.getNonce(), this.dataService);
        viewModelCopy.deSerialize(this.viewModel.serialize());
        // let exportData = new ExportData(viewModelCopy, JSON.parse(JSON.stringify(this.tactics)), this.dataService.tacticNames(this.filteredTechniques),  JSON.parse(JSON.stringify(this.filteredTechniques)));
        this.tabs.newExporterTab(this.viewModel);
    }
}