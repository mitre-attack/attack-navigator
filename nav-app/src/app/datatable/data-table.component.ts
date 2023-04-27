import { Component, Input, ViewChild, AfterViewInit, ViewEncapsulation, OnDestroy, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { ConfigService } from '../services/config.service';
import { TabsComponent } from '../tabs/tabs.component';
import { ViewModel, ViewModelsService } from "../services/viewmodels.service";
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as Excel from 'exceljs/dist/es5/exceljs.browser';
import * as is from 'is_js';
import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'DataTable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
    @ViewChild('scrollRef') private scrollRef: ElementRef;

    @Input() viewModel: ViewModel; // ViewModel being used by this data-table
    @Input() currentDropdown: string = ""; // current dropdown menu

    @Output() dropdownChange = new EventEmitter<any>();
    @Output() onScroll = new EventEmitter<any>();

    public customContextMenuItems = []; // items for custom context menu
    public showingLegend = false; // is the legend panel currently expanded

    // scroll handling
    public previousScrollTop: number = 0;
    public headerHeight: number = 0;
    public footerHeight: number = 32;
    public controlsHeight: number = 34;
    public isScrollUp: boolean = true;
    public handleScroll = (e) => {
        const diff = this.scrollRef.nativeElement.scrollTop - this.previousScrollTop;
        if (!this.isScrollUp && diff < 0) {
            this.isScrollUp =  diff < 0;
            this.calculateScrollHeight();
            this.previousScrollTop = this.scrollRef.nativeElement.scrollTop;
        } else if (this.isScrollUp && diff > 0) {
            this.isScrollUp =  diff < 0;
            this.calculateScrollHeight();
            this.previousScrollTop = this.scrollRef.nativeElement.scrollTop;
        } else if (!this.isScrollUp && this.scrollRef.nativeElement.scrollTop > 0 && diff === 0) {
            this.calculateScrollHeight();
        }
    }
    public calculateScrollHeight = () => {
        const tabOffset = this.isScrollUp ? 0 : this.headerHeight;
        this.onScroll.emit(-1 * tabOffset);
        const scrollWindowHeight = this.isScrollUp ? this.headerHeight + this.controlsHeight + this.footerHeight : this.controlsHeight;
        this.scrollRef.nativeElement.style.height = `calc(100vh - ${scrollWindowHeight}px)`;
    }

    // edit field bindings
    public commentEditField: string = "";
    public scoreEditField: string = "";

    private selectionChangeSubscription: Subscription;
    
    constructor(public dataService: DataService,
                private tabs: TabsComponent,
                private sanitizer: DomSanitizer,
                private viewModelsService: ViewModelsService,
                public configService: ConfigService) {

        this.selectionChangeSubscription = this.viewModelsService.onSelectionChange.subscribe(() => {
            this.onTechniqueSelect();
        })
    }

    ngAfterViewInit(): void {
        this.headerHeight = document.querySelector<HTMLElement>('.header-wrapper')?.offsetHeight;
        this.scrollRef.nativeElement.style.height = `calc(100vh - ${this.headerHeight + this.controlsHeight + this.footerHeight}px)`;
        this.scrollRef.nativeElement.addEventListener('scroll', this.handleScroll);
    }

    ngOnDestroy(): void {
        this.selectionChangeSubscription.unsubscribe();
        document.body.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * Save the given blob
     * @param blob the blob to download
     * @param filename save as filename
     */
    public saveBlob(blob, filename): void {
        if (is.ie()) { // internet explorer
            window.navigator.msSaveOrOpenBlob(blob, filename)
        } else {
            let svgUrl = URL.createObjectURL(blob);
            let downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = filename
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    /**
     * Stringifies the current view model into a JSON string,
     * stores the string as a blob, and saves the blob as a
     * JSON file
     */
    public saveLayerLocally(): void {
        let json = this.viewModel.serialize();
        let blob = new Blob([json], {type: "text/json"});
        let filename = this.viewModel.name.toLowerCase().replace(/ /g, "_") + ".json";
        this.saveBlob(blob, filename);
    }

    /**
     * Helper function for exporting to excel to stylize cells
     */
    public styleCells(cell, technique, tvm): void {
        cell.value = this.getDisplayName(technique);

        // cell format
        cell.alignment = {vertical: 'top', horizontal: 'left'};
        if(tvm.enabled) {
            if (tvm.color) { //manually assigned
                cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + tvm.color.substring(1)}};
                cell.font = {color: {'argb': 'FF' + tinycolor.mostReadable(tvm.color, ["white", "black"]).toHex()}};
            }
            else if (this.viewModel.layout._showAggregateScores && tvm.aggregateScoreColor) {
                cell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + tvm.aggregateScoreColor.toHex()}};
                cell.font = {color: {'argb': 'FF' + tinycolor.mostReadable(tvm.aggregateScoreColor, ["white", "black"]).toHex()}};
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

    /** Export layer to Excel */
    public saveLayerLocallyExcel(): void {
        // create new excel workbook
        let workbook = new Excel.Workbook();
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);

        // create a worksheet for each matrix in the domain
        for (let matrix of domain.matrices) {
            let worksheet = workbook.addWorksheet(matrix.name + " (v" + domain.getVersion() + ")");

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
                    const seen = [];
                    subtechniqueCol.eachCell(cell => {
                        if(cell.row > 1) {
                            if(cell.value && cell.value !== undefined) {
                                let subtechnique = subtechniqueList.find(s => {
                                    return s.name == cell.value.substring(cell.value.indexOf(':') + 1).trim() && !seen.includes(s.attackID) });
                                seen.push(subtechnique.attackID);
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
                } else if (!this.viewModel.layout.showID && !this.viewModel.layout.showName) {
                    column.width = 10;
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
            const filename = this.viewModel.name.toLowerCase().replace(/ /g, "_") + ".xlsx";
            this.saveBlob(blob, filename);
        });
    }

    /**
     * Get the display name for technique/tactic as shown in layout
     */
    public getDisplayName(technique): string {
        if (this.viewModel.layout.showID && this.viewModel.layout.showName) {
            return technique.attackID + ': ' + technique.name;
        } else if (this.viewModel.layout.showID) {
            return technique.attackID;
        } else if (this.viewModel.layout.showName) {
            return technique.name;
        } else {
            return '';
        }
    }

    /**
     * Handle drop down change
     */
    public handleDescriptionDropdown(): void {
        if (this.currentDropdown !== 'description') {
            this.currentDropdown = 'description';
        } else {
            this.currentDropdown = '';
        }
        this.dropdownChange.emit(this.currentDropdown);
    }

    /**
     * Triggered on left click of technique
     */
    public onTechniqueSelect(): void {
        if (!this.viewModel.isCurrentlyEditing()) {
            if (["comment", "score", "colorpicker", "link", "metadata"].includes(this.currentDropdown)) {
                //remove technique control dropdowns, because everything was deselected
                this.currentDropdown = "";
            }
            return;
        }
        if (this.currentDropdown == "link" || this.currentDropdown == "metadata") {
            this.currentDropdown = "";
            return;
        }
        //else populate editing controls
        this.populateEditFields();
    }

    /**
     * Show all sub-techniques in layout view
     */
    public expandSubtechniques(showAnnotatedOnly?: boolean): void {
        if (this.viewModel.layout.layout == "mini") return; // control disabled in mini layout
        for (let technique of this.dataService.getDomain(this.viewModel.domainVersionID).techniques) {
            if (technique.subtechniques.length > 0) {
                for (let id of technique.get_all_technique_tactic_ids()) {
                    let tvm = this.viewModel.getTechniqueVM_id(id);
                    if (!showAnnotatedOnly) {
                        tvm.showSubtechniques = true;
                    } else {
                        for (let subtechnique of technique.subtechniques) {
                            tvm.showSubtechniques = tvm.showSubtechniques || subtechnique.get_all_technique_tactic_ids().some((sid) => {
                                let svm = this.viewModel.getTechniqueVM_id(sid);
                                return svm.annotated();
                            })
                        }
                    }
                }
            }
        }
    }

    /**
     * Hide all sub-techniques in layout view
     */
    public collapseSubtechniques(): void {
        if (this.viewModel.layout.layout == "mini") return; // control disabled in mini layout
        this.viewModel.techniqueVMs.forEach(function(tvm, key) {
            tvm.showSubtechniques = false;
        });
    }

    /**
     * Populate edit fields. Gets common values if common values exist for all editing values.
     */
    public populateEditFields(): void {
        this.commentEditField = this.viewModel.getEditingCommonValue("comment");
        this.scoreEditField = this.viewModel.getEditingCommonValue("score");
    }

    /**
     * Set the state (enabled/disabled) of the selected features
     */
    public setSelectedState(): void {
        let currentState = this.viewModel.getEditingCommonValue('enabled')
        if (currentState === '') this.viewModel.editSelectedTechniques('enabled', false)
        else                     this.viewModel.editSelectedTechniques('enabled', !currentState)
    }

    /**
     * Sanitize the given css so that it can be displayed without error
     */
    public sanitize(css) {
        return this.sanitizer.bypassSecurityTrustStyle(css);
    }

    /**
     * Is score input valid number
     * @param  event keypress event just in case we need it
     * @return       true if valid number
     */
    public validateScoreInput(event): boolean {
        let result: boolean = isNaN(Number(this.scoreEditField))
        return result
    }

    /**
     * Return whether the given dropdown element would overflow the side of the page if aligned to the right of its anchor
     * @param  dropdown the DOM node of the panel
     * @return          true if it would overflow
     */
    public checkalign(dropdown): boolean {
        let anchor = dropdown.parentNode;
        return anchor.getBoundingClientRect().left + dropdown.getBoundingClientRect().width > document.body.clientWidth;
    }

    /**
     * Open an export layer render tab for the current layer
     */
    public exportRender(): void {
        this.tabs.openSVGDialog(this.viewModel);
    }

    /**
     * Open search & multiselect sidebar
     */
    public openSearch(): void {
        if (this.viewModel.sidebarContentType !== 'layerUpgrade') {
            this.viewModel.sidebarOpened = (this.viewModel.sidebarContentType !== 'search') ? true : !this.viewModel.sidebarOpened;
            this.viewModel.sidebarContentType = 'search';
        }
    }
}
