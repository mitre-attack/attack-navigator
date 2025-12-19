import { Component, Input, ViewChild, AfterViewInit, ViewEncapsulation, OnDestroy, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { ConfigService } from '../services/config.service';
import { TabsComponent } from '../tabs/tabs.component';
import { ViewModelsService } from '../services/viewmodels.service';
import { ViewModel } from '../classes';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import tinycolor from 'tinycolor2';
import { isIE } from '../utils/utils';
import { NgIf, NgClass, NgFor, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ColorPickerDirective } from 'ngx-color-picker';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { ListInputComponent } from '../list-input/list-input.component';
import { MatDrawerContainer, MatDrawerContent, MatDrawer } from '@angular/material/sidenav';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatrixSideComponent } from '../matrix/matrix-side/matrix-side.component';
import { MatrixFlatComponent } from '../matrix/matrix-flat/matrix-flat.component';
import { MatrixMiniComponent } from '../matrix/matrix-mini/matrix-mini.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'DataTable',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgIf,
        MatTooltip,
        NgClass,
        FormsModule,
        NgFor,
        NgSwitch,
        NgSwitchCase,
        MatIcon,
        ColorPickerDirective,
        MatFormField,
        MatLabel,
        MatInput,
        MatHint,
        ListInputComponent,
        MatDrawerContainer,
        MatDrawerContent,
        MatProgressSpinner,
        MatrixSideComponent,
        MatrixFlatComponent,
        MatrixMiniComponent,
        MatDrawer,
        SidebarComponent,
        MatIconButton,
        MatSuffix,
        TitleCasePipe,
    ],
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
    @ViewChild('scrollRef') private scrollRef: ElementRef;

    @Input() viewModel: ViewModel; // ViewModel being used by this data-table
    @Input() currentDropdown: string = ''; // current dropdown menu

    @Output() dropdownChange = new EventEmitter<any>();
    @Output() onScroll = new EventEmitter<any>();

    public customContextMenuItems = []; // items for custom context menu
    public showingLegend = false; // is the legend panel currently expanded

    public get layerDomainVersion(): string {
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
        return `${domain.name} v${domain.version.number}`;
    }

    // scroll handling
    public previousScrollTop: number = 0;
    public headerHeight: number = 0;
    public footerHeight: number = 32;
    public controlsHeight: number = 34;
    public includedControls: any;
    public isScrollUp: boolean = true;
    public handleScroll = (e) => {
        const diff = this.scrollRef.nativeElement.scrollTop - this.previousScrollTop;
        if ((!this.isScrollUp && diff < 0) || (this.isScrollUp && diff > 0)) {
            this.isScrollUp = diff < 0;
            this.calculateScrollHeight();
            this.previousScrollTop = this.scrollRef.nativeElement.scrollTop;
        } else if (!this.isScrollUp && this.scrollRef.nativeElement.scrollTop > 0 && diff === 0) {
            this.calculateScrollHeight();
        }
    };
    public calculateScrollHeight = () => {
        const tabOffset = this.isScrollUp ? 0 : this.headerHeight;
        this.onScroll.emit(-1 * tabOffset);
        const scrollWindowHeight = this.isScrollUp ? this.headerHeight + this.controlsHeight + this.footerHeight : this.controlsHeight;
        this.scrollRef.nativeElement.style.height = `calc(100vh - ${scrollWindowHeight}px)`;
    };

    /*
     * 0: expand subtechniques
     * 1: expand annotated subtechniques
     * 2: collapse subtechniques
     */
    public showSubtechniquesType: number = 0;

    public downloadAnnotationsOnVisibleTechniques: boolean = false;

    showControlsBar = true;
    previousControlSection = '';

    currentControlSection = 'selection';

    showHelpDropDown = false;

    // edit field bindings
    public commentEditField: string = '';
    public scoreEditField: string = '';

    private selectionChangeSubscription: Subscription;

    public layerControlsList = [];
    public techniqueControlsList = [];
    public selectionControlsList = [];

    showControlLabels = {
        selection: false,
        layer: false,
        technique: false,
    };

    constructor(
        public dataService: DataService,
        private tabs: TabsComponent,
        private sanitizer: DomSanitizer,
        private viewModelsService: ViewModelsService,
        public configService: ConfigService
    ) {
        this.selectionChangeSubscription = this.viewModelsService.onSelectionChange.subscribe(() => {
            this.onTechniqueSelect();
        });
        this.includedControls = configService.featureList;
        for (let i = 0; i < this.includedControls.length; i++) {
            if (this.includedControls[i].name == 'layer_controls') {
                for (let j = 0; j < this.includedControls[i].subfeatures.length; j++) {
                    this.layerControlsList.push(this.includedControls[i].subfeatures[j].display_name);
                }
            } else if (this.includedControls[i].name == 'technique_controls') {
                for (let j = 0; j < this.includedControls[i].subfeatures.length; j++) {
                    this.techniqueControlsList.push(this.includedControls[i].subfeatures[j].display_name);
                }
            } else if (this.includedControls[i].name == 'selection_controls') {
                for (let j = 0; j < this.includedControls[i].subfeatures.length; j++) {
                    this.selectionControlsList.push(this.includedControls[i].subfeatures[j].display_name);
                }
            }
        }
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

    public updateStickyToolbar() {
        this.viewModel.stickyToolbar = !this.viewModel.stickyToolbar;
        if (this.viewModel.stickyToolbar) {
            this.headerHeight = document.querySelector<HTMLElement>('.header-wrapper')?.offsetHeight;
            this.scrollRef.nativeElement.style.height = `calc(100vh - ${this.headerHeight + this.controlsHeight + this.footerHeight}px)`;
            this.scrollRef.nativeElement.addEventListener('scroll', this.handleScroll);
        } else {
            this.scrollRef.nativeElement.style.height = null;
            this.scrollRef.nativeElement.addEventListener('scroll', this.handleScroll);
        }
    }

    handleSelectionControlsSettingsDropdown() {
        if (this.currentDropdown !== 'selection_control_settings') {
            this.currentDropdown = 'selection_control_settings';
        } else {
            this.currentDropdown = '';
        }
        this.dropdownChange.emit(this.currentDropdown);
    }

    handleLayerControlsSettingsDropdown() {
        if (this.currentDropdown !== 'layer_control_settings') {
            this.currentDropdown = 'layer_control_settings';
        } else {
            this.currentDropdown = '';
        }
        this.dropdownChange.emit(this.currentDropdown);
    }

    handleTechniqueControlsSettingsDropdown() {
        if (this.currentDropdown !== 'technique_control_settings') {
            this.currentDropdown = 'technique_control_settings';
        } else {
            this.currentDropdown = '';
        }
        this.dropdownChange.emit(this.currentDropdown);
    }

    handleKeyDownTechnique(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleTechniqueControlsSettingsDropdown();
        }
    }

    handleKeyDownSelection(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleSelectionControlsSettingsDropdown();
        }
    }

    handleKeyDownLayer(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleLayerControlsSettingsDropdown();
        }
    }

    isControlIncluded(control, subfeature) {
        for (let i = 0; i < this.includedControls.length; i++) {
            if (this.includedControls[i].name == control) {
                for (let j = 0; j < this.includedControls[i].subfeatures.length; j++) {
                    if (this.includedControls[i].subfeatures[j].name == subfeature) {
                        if (this.includedControls[i].subfeatures[j].enabled) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
        return false;
    }

    getControlDisplayName(control, subfeature): Object {
        for (let i = 0; i < this.includedControls.length; i++) {
            if (this.includedControls[i].name == control) {
                for (let j = 0; j < this.includedControls[i].subfeatures.length; j++) {
                    if (this.includedControls[i].subfeatures[j].name == subfeature) {
                        return this.includedControls[i].subfeatures[j].display_name;
                    }
                }
            }
        }
        return null;
    }

    getControl(control, subfeature): Object {
        for (let i = 0; i < this.includedControls.length; i++) {
            if (this.includedControls[i].name == control) {
                for (let j = 0; j < this.includedControls[i].subfeatures.length; j++) {
                    if (this.includedControls[i].subfeatures[j].display_name == subfeature) {
                        return this.includedControls[i].subfeatures[j];
                    }
                }
            }
        }
        return null;
    }
    /**
     * Save the given blob
     * @param blob the blob to download
     * @param filename save as filename
     */
    public saveBlob(blob, filename): void {
        if (isIE()) {
            // internet explorer
            const nav = window.navigator as any;
            nav.msSaveOrOpenBlob(blob, filename);
        } else {
            let svgUrl = URL.createObjectURL(blob);
            let downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = filename;
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
        let json = this.viewModel.serialize(this.downloadAnnotationsOnVisibleTechniques);
        let blob = new Blob([json], { type: 'text/json' });
        this.saveLayerJson_helper(blob);
    }

    /**
     * Stringifies the current view model with all the layers into a JSON string,
     * stores the string as a blob, and saves the blob as a
     * JSON file
     */
    public saveAllLayersLocally(): void {
        let myarr = [];
        for (let viewModel of this.viewModelsService.viewModels) {
            myarr.push(JSON.parse(viewModel.serialize(this.downloadAnnotationsOnVisibleTechniques)));
        }
        let blob = new Blob([JSON.stringify(myarr)], { type: 'text/json' });
        this.saveLayerJson_helper(blob);
    }

    /** Helper function for saving layer in JSON format */
    public saveLayerJson_helper(blob): void {
        let filename = this.viewModel.name.toLowerCase().replace(/ /g, '_') + '.json';
        this.saveBlob(blob, filename);
    }

    /**
     * Helper function for exporting to excel to stylize cells
     */
    public styleCells(cell, technique, tvm): void {
        cell.value = this.getDisplayName(technique);

        // cell format
        cell.alignment = { vertical: 'top', horizontal: 'left' };
        if (tvm.enabled) {
            if (tvm.color) {
                //manually assigned
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + tvm.color.substring(1) } };
                cell.font = { color: { argb: 'FF' + tinycolor.mostReadable(tvm.color, ['white', 'black']).toHex() } };
            } else if (this.viewModel.layout._showAggregateScores && tvm.aggregateScoreColor) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + tvm.aggregateScoreColor.substring(1) } };
                cell.font = { color: { argb: 'FF' + tinycolor.mostReadable(tvm.aggregateScoreColor, ['white', 'black']).toHex() } };
            } else if (tvm.score) {
                //score assigned
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + tvm.scoreColor.substring(1) } };
                cell.font = { color: { argb: 'FF' + tinycolor.mostReadable(tvm.scoreColor, ['white', 'black']).toHex() } };
            }
            if (tvm.comment) {
                //comment present on technique
                cell.note = tvm.comment;
            }
        } else {
            //disabled
            cell.font = { color: { argb: 'FFBCBCBC' } };
        }

        // subtechniques border
        if (tvm.showSubtechniques) {
            cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } };
        } else if (technique.isSubtechnique) {
            cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        }
    }

    /** Export single layer to Excel */
    public saveLayerLocallyExcel(): void {
        // create new excel workbook
        let workbook = new Excel.Workbook();
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
        // create a worksheet for each matrix in the domain
        for (let matrix of domain.matrices) {
            let worksheet = workbook.addWorksheet(matrix.name + ' (v' + domain.getVersion() + ')');
            this.saveLayerExcel_helper(matrix, worksheet, this.viewModel);
        }

        // save file
        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const filename = this.viewModel.name.toLowerCase().replace(/ /g, '_') + '.xlsx';
            this.saveBlob(blob, filename);
        });
    }

    /** Export all layers to Excel */
    public saveAllLayersLocallyExcel(): void {
        // create new excel workbook
        let workbook = new Excel.Workbook();
        for (let i = 0; i < this.viewModelsService.viewModels.length; i++) {
            let domain = this.dataService.getDomain(this.viewModelsService.viewModels[i].domainVersionID);
            // create a worksheet for each matrix in the domain
            for (let matrix of domain.matrices) {
                let worksheet = workbook.addWorksheet(
                    matrix.name + ' v' + domain.getVersion() + ' (' + this.viewModelsService.viewModels[i].name + '-' + i + ')'
                );
                this.saveLayerExcel_helper(matrix, worksheet, this.viewModelsService.viewModels[i]);
            }
        }
        // save file
        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const filename = this.viewModel.name.toLowerCase().replace(/ /g, '_') + '.xlsx';
            this.saveBlob(blob, filename);
        });
    }

    /** Helper function for saving layer in Excel format */
    public saveLayerExcel_helper(matrix, worksheet, viewModel): void {
        // create a worksheet for each matrix in the domain
        // create tactic columns
        let columns = viewModel.filterTactics(matrix.tactics, matrix).map((tactic) => {
            return { header: this.getDisplayName(tactic), key: tactic.name };
        });
        worksheet.columns = columns;

        // create cells
        for (let tactic of viewModel.filterTactics(matrix.tactics, matrix)) {
            let tacticCol = worksheet.getColumn(tactic.name);
            let techniques = viewModel.applyControls(tactic.techniques, tactic, matrix);
            let techniqueCells = techniques.map((technique) => {
                return technique.name;
            });
            let subtechniqueList = [];

            // create subtechnique cells, if shown
            let subtechniqueCells = [];
            for (let technique of techniques) {
                let techniqueRow = techniqueCells.indexOf(technique.name);
                let tvm = viewModel.getTechniqueVM(technique, tactic);

                if (!tvm.showSubtechniques) continue; // do not show sub-techniques, skip

                // retrieve subtechniques
                let subtechniques = viewModel.applyControls(technique.subtechniques, tactic, matrix).map((sub) => {
                    return sub.name;
                });
                subtechniqueList = subtechniqueList.concat(technique.subtechniques);

                // format technique cells for subtechniques
                let excelIndex = this.addSubtechniqueCells(subtechniqueCells, techniqueCells, subtechniques, technique);

                // merge technique cells
                if (excelIndex > 0) {
                    worksheet.mergeCells(techniqueRow + 2, tacticCol.number, techniqueRow + excelIndex + 1, tacticCol.number);
                }
            }

            if (subtechniqueCells.length > 0) {
                // add subtechniques column
                let id = columns.findIndex((col) => col.key == tactic.name);
                columns.splice(id + 1, 0, { header: this.getDisplayName(tactic), key: tactic.name + 'Subtechniques' });
                worksheet.columns = columns;

                // merge subtechniques header
                let subtechniqueCol = worksheet.getColumn(tactic.name + 'Subtechniques');
                worksheet.mergeCells(tacticCol.letter + '1:' + subtechniqueCol.letter + '1');
                subtechniqueCol.values = [tactic.name.toString() + 'Subtechniques'].concat(subtechniqueCells);

                // style subtechnique cells
                this.styleTechniqueCells(subtechniqueCol, subtechniqueList, viewModel, tactic, true);
            }
            tacticCol.values = [this.getDisplayName(tactic)].concat(techniqueCells);

            // style technique cells
            this.styleTechniqueCells(tacticCol, techniques, viewModel, tactic);
        }

        // style tactic headers
        this.styleTacticHeaders(worksheet, viewModel);

        worksheet.getRow(1).alignment = { horizontal: 'center' };
        worksheet.getRow(1).border = { bottom: { style: 'thin' } };
        worksheet.getRow(1).font = { bold: true };
        if (viewModel.showTacticRowBackground) {
            worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + viewModel.tacticRowBackground.substring(1) } };
            worksheet.getRow(1).font = {
                bold: true,
                color: { argb: 'FF' + tinycolor.mostReadable(viewModel.tacticRowBackground, ['white', 'black']).toHex() },
            };
        }
    }

    /**
     * Style technique cells for Excel worksheet
     */
    public styleTechniqueCells(column, techniqueList, viewModel, tactic, isSubtechnique = false): void {
        const seen = [];

        column.eachCell((cell) => {
            if (cell.row > 1 && cell.value && cell.value !== undefined) {
                let technique = techniqueList.find((t) => {
                    if (isSubtechnique) {
                        return t.name == cell.value.substring(cell.value.indexOf(':') + 1).trim() && !seen.includes(t.attackID);
                    }
                    return t.name == cell.value.substring(cell.value.indexOf(':') + 1).trim() || t.attackID === cell.value;
                });
                seen.push(technique.attackID);
                let tvm = viewModel.getTechniqueVM(technique, tactic);
                this.styleCells(cell, technique, tvm);
            }
        });
    }

    /**
     * Style tactic headers for Excel worksheet
     */
    public styleTacticHeaders(worksheet, viewModel): void {
        worksheet.columns.forEach((column) => {
            if (viewModel.layout.showID && !viewModel.layout.showName) {
                column.width = column.header.length < 15 ? 15 : column.header.length;
            } else if (!viewModel.layout.showID && !viewModel.layout.showName) {
                column.width = 10;
            } else {
                column.width = column.header.length < 30 ? 30 : column.header.length;
            }
        });
    }

    /**
     * Format technique cells for sub-technique cells
     */
    public addSubtechniqueCells(subtechniqueCells, techniqueCells, subtechniques, technique): number {
        let techniqueRow = techniqueCells.indexOf(technique.name);
        let excelIndex = 0;
        for (let subtechnique of subtechniques) {
            if (excelIndex !== 0) {
                techniqueCells.splice(techniqueRow + excelIndex, 0, technique.name);
            }
            subtechniqueCells[techniqueRow + excelIndex++] = subtechnique;
        }
        return excelIndex;
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

    toggleShowControlsBar() {
        this.showControlsBar = !this.showControlsBar;
    }

    setCurrentControlSection(controlType) {
        this.currentControlSection = controlType;
        if (this.previousControlSection === controlType && this.showControlsBar) {
            this.showControlsBar = false;
        } else {
            this.showControlsBar = true;
        }
        this.previousControlSection = controlType;
    }

    /**
     * Handle export drop down change
     */
    public handleExportDropdown(): void {
        if (this.currentDropdown !== 'export') {
            this.currentDropdown = 'export';
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
            if (['comment', 'score', 'colorpicker', 'link', 'metadata'].includes(this.currentDropdown)) {
                //remove technique control dropdowns, because everything was deselected
                this.currentDropdown = '';
            }
            return;
        }
        if (this.currentDropdown == 'link' || this.currentDropdown == 'metadata') {
            this.currentDropdown = '';
            return;
        }
        //else populate editing controls
        this.populateEditFields();
    }

    /**
     * Show all sub-techniques in layout view
     */
    public expandSubtechniques(showAnnotatedOnly?: boolean): void {
        if (this.viewModel.layout.layout == 'mini') return; // control disabled in mini layout
        this.viewModel.layout.expandedSubtechniques = showAnnotatedOnly ? 'annotated' : 'all';

        for (let technique of this.dataService.getDomain(this.viewModel.domainVersionID).techniques) {
            if (!technique.subtechniques?.length) continue; // no sub-techniques

            for (let id of technique.get_all_technique_tactic_ids()) {
                let tvm = this.viewModel.getTechniqueVM_id(id);
                if (!showAnnotatedOnly) {
                    // expand all sub-techniques
                    tvm.showSubtechniques = true;
                    continue;
                }
                if (showAnnotatedOnly) {
                    // expand all sub-techniques
                    tvm.showSubtechniques = false;
                }

                // expand only if sub-techniques have annotations
                for (let subtechnique of technique.subtechniques) {
                    tvm.showSubtechniques =
                        tvm.showSubtechniques ||
                        subtechnique.get_all_technique_tactic_ids().some((sid) => {
                            let svm = this.viewModel.getTechniqueVM_id(sid);
                            return svm.annotated();
                        });
                }
            }
        }
    }

    /**
     * Hide all sub-techniques in layout view
     */
    public collapseSubtechniques(): void {
        if (this.viewModel.layout.layout == 'mini') return; // control disabled in mini layout
        this.viewModel.techniqueVMs.forEach(function (tvm, key) {
            tvm.showSubtechniques = false;
        });
        this.viewModel.layout.expandedSubtechniques = 'none';
    }

    /**
     * Expand all, annotated or no subtechniques based on selection
     */
    public showSubtechniquesTypeAlgorithm() {
        switch (this.showSubtechniquesType) {
            case 1: // expand all subtechniques
                this.expandSubtechniques();
                console.log(this.showSubtechniquesType);
                break;
            case 2: // expand only annotated subtechniques
                this.expandSubtechniques(true);
                console.log(this.showSubtechniquesType);
                break;
            case 3: // collapse all subtechniques
                this.collapseSubtechniques();
                console.log(this.showSubtechniquesType);
                this.showSubtechniquesType = 0;
                break;
            case 0:
                break;
            default:
                // expand all subtechniques
                this.expandSubtechniques();
        }
    }

    /**
     * Populate edit fields. Gets common values if common values exist for all editing values.
     */
    public populateEditFields(): void {
        this.commentEditField = this.viewModel.getEditingCommonValue('comment');
        this.scoreEditField = this.viewModel.getEditingCommonValue('score');
    }

    /**
     * Set the state (enabled/disabled) of the selected features
     */
    public setSelectedState(): void {
        let currentState = this.viewModel.getEditingCommonValue('enabled');
        if (currentState === '') this.viewModel.editSelectedTechniques('enabled', false);
        else this.viewModel.editSelectedTechniques('enabled', !currentState);
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
        let result: boolean = isNaN(Number(this.scoreEditField));
        return result;
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
            this.viewModel.sidebarOpened = this.viewModel.sidebarContentType !== 'search' ? true : !this.viewModel.sidebarOpened;
            this.viewModel.sidebarContentType = 'search';
        }
    }

    /**
     * Open layer settings in sidebar
     */
    public openLayerSettings(): void {
        this.viewModel.sidebarOpened = this.viewModel.sidebarContentType !== 'layerSettings' ? true : !this.viewModel.sidebarOpened;
        this.viewModel.sidebarContentType = 'layerSettings';
    }
}
