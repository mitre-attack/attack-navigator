import { Component, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { Tab, Domain, Version, ViewModel } from '../classes';
import { ConfigService } from '../services/config.service';
import { VersionUpgradeComponent } from '../version-upgrade/version-upgrade.component';
import { HelpComponent } from '../help/help.component';
import { SvgExportComponent } from '../svg-export/svg-export.component';
import { ViewModelsService } from '../services/viewmodels.service';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ChangelogComponent } from '../changelog/changelog.component';
import { Subscription, forkJoin } from 'rxjs';
import * as globals from '../utils/globals';
import { LayerInformationComponent } from '../layer-information/layer-information.component';
import { isSafari } from '../utils/utils';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatLabel, MatSelect, MatOption, MatFormField, MatHint, MatSuffix } from '@angular/material/select';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { DataTableComponent } from '../datatable/data-table.component';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [ViewModelsService],
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgIf,
        MatTooltip,
        NgClass,
        MatTabNav,
        NgFor,
        MatTabLink,
        MatIconButton,
        MatIcon,
        MatTabNavPanel,
        MatButton,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogClose,
        MatLabel,
        MatSelect,
        MatOption,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatFormField,
        FormsModule,
        MatInput,
        MatHint,
        MatSuffix,
        MatCheckbox,
        DataTableComponent,
    ],
})
export class TabsComponent implements AfterViewInit {
    @Input() userTheme: string;
    @Output() onUserThemeChange = new EventEmitter<string>();
    @ViewChild('safariWarning') safariWarning: TemplateRef<any>;
    @ViewChild('versionWarning') versionWarning: TemplateRef<any>;

    public activeTab: Tab = null;
    public dropdownEnabled: string = '';
    public layerTabs: Tab[] = [];
    public adjustedHeaderHeight: number = 0;
    public safariDialogRef;
    public versionDialogRef;
    public versionMinorSnackbarRef;
    public showHelpDropDown: boolean = false;
    public loadURL: string = '';
    public layerLinkURLs: string[] = [];
    public bannerContent: string;
    public subscription: Subscription;
    public copiedRecently: boolean = false; // true if copyLayerLink is called, reverts to false after 2 seconds
    public loadData: any = {
        url: undefined,
        version: undefined,
        identifier: undefined,
    };

    // user input for layer-layer operations
    public opSettings: any = {
        domain: '',
        gradientVM: null,
        coloringVM: null,
        commentVM: null,
        linkVM: null,
        metadataVM: null,
        enabledVM: null,
        filterVM: null,
        scoreExpression: '',
        legendVM: null,
    };

    public get latestDomains(): Domain[] {
        return this.filterDomains(this.dataService.versions[0]);
    }

    public get minimumSupportedVersion(): string {
        return globals.minimumSupportedVersion;
    }

    public get navVersion(): string {
        return globals.navVersion;
    }

    constructor(
        public dialog: MatDialog,
        public viewModelsService: ViewModelsService,
        public dataService: DataService,
        public http: HttpClient,
        public configService: ConfigService,
        public snackBar: MatSnackBar
    ) {
        console.debug('initializing tabs component');
        this.newBlankTab();
        this.loadTabs(configService.defaultLayers).then(() => {
            // failed to load from URL, create a new blank layer
            if (this.layerTabs.length == 0) this.newLayer(this.dataService.domains[0].id);

            // if there is no active tab set, activate the first
            if (!this.activeTab) this.selectTab(this.layerTabs[0]);
        });
        this.bannerContent = this.configService.banner;
    }

    ngAfterViewInit(): void {
        if (isSafari('<=13')) {
            // open safari version incompatibility warning
            this.safariDialogRef = this.dialog.open(this.safariWarning, {
                width: '350px',
                disableClose: true,
                panelClass: this.userTheme,
            });
        }
    }

    /**
     * Adjust the header height on scroll event
     */
    public adjustHeader(newHeight) {
        this.adjustedHeaderHeight = newHeight;
    }

    /**
     * Open initial tabs on application load
     * @param defaultLayers any default layers defined in the config file
     */
    public async loadTabs(defaultLayers) {
        let bundleURL = this.getNamedFragmentValue('bundleURL')[0];
        let bundleVersion = this.getNamedFragmentValue('version')[0];
        let bundleDomain = this.getNamedFragmentValue('domain')[0];
        let layerURLs = this.getNamedFragmentValue('layerURL');

        let self = this;
        if (bundleURL?.length && bundleVersion && bundleDomain?.length) {
            // load base data from URL
            self.newLayerFromURL({
                url: bundleURL,
                version: bundleVersion,
                identifier: bundleDomain,
            });
        } else if (layerURLs?.length) {
            // load layer from URL
            let first = true;
            for (let url of layerURLs) {
                await self.loadLayerFromURL(url, first, true);
                first = false;
            }
        } else if (defaultLayers['enabled']) {
            // load default layers from config file
            let first = true;
            for (let url of defaultLayers['urls']) {
                await self.loadLayerFromURL(url, first, true);
                first = false;
            }
        }
    }

    /**
     * Open a new tab
     * @param  {string}     title       title of new tab
     * @param  {ViewModel}  viewModel   the view model for the template
     * @param  {Boolean}    isCloseable is the tab closeable, default false
     * @param  {Boolean}    replace     replace the current tab with the new tab, default false
     * @param  {Boolean}    forceNew    force open a new tab even if a tab of that name already exists, default false
     * @param  {Boolean}    isDataTable is the tab a data table, if so tab text should be editable, default false
     */
    public openTab(title: string, viewModel: ViewModel, isCloseable = false, replace = true, forceNew = false, isDataTable = false): void {
        if (!forceNew) {
            // if tab is already open, change to that tab
            let tab: Tab = this.layerTabs.find((t) => t.title === title);
            this.selectTab(tab);
            return;
        }

        // create a new tab
        let domain = viewModel ? viewModel.domainVersionID : '';
        let tab = new Tab(title, isCloseable, false, domain, isDataTable);
        tab.viewModel = viewModel;

        // select new tab
        if (!replace || this.layerTabs.length === 0) {
            this.layerTabs.push(tab); // don't replace
            this.selectTab(this.layerTabs[this.layerTabs.length - 1]);
        } else {
            // find active tab index
            for (let i = 0; i < this.layerTabs.length; i++) {
                if (this.layerTabs[i] == this.activeTab) {
                    if (this.layerTabs[i].title == 'new tab') {
                        // close current and don't let it create a replacement tab
                        this.closeActiveTab(true);
                    }
                    this.layerTabs.splice(i, 0, tab); // replace
                    this.selectTab(this.layerTabs[i]);
                    return;
                }
            }
        }
        // reset dropdown
        this.dropdownEnabled = '';
    }

    /**
     * Open a new "blank" tab with new layer options
     * @param  {boolean} replace replace the current tab with this blank tab, default false
     */
    public newBlankTab(replace: boolean = false): void {
        this.openTab('new tab', null, true, replace, true, false);
    }

    /**
     * Select the specified tab, deselect other tabs
     * @param  {Tab} tab the tab to select
     */
    public selectTab(tab: Tab): void {
        this.activeTab = tab;

        // close search sidebar
        this.viewModelsService.viewModels.forEach((viewModel) => {
            if (viewModel.sidebarContentType === 'search') {
                viewModel.sidebarOpened = false;
                viewModel.sidebarContentType = '';
            }
        });
    }

    /**
     * Close the specified tab
     * @param  {Tab}     tab        the tab to close
     * @param  {boolean} allowNoTab if true, doesn't select another tab, and won't open a new tab if there are none, default false
     */
    public closeTab(tab: Tab, allowNoTab: boolean = false) {
        let action = 0; // controls post close-tab behavior

        // destroy tab viewmodel
        this.viewModelsService.destroyViewModel(tab.viewModel);

        // check if the tab we're closing is the active tab
        let i = this.layerTabs.findIndex((t) => t === tab);
        if (tab == this.activeTab) {
            if (i == 0 && this.layerTabs.length > 1)
                action = 1; // closing first tab, first tab is active, and more tabs exist
            else if (i > 0)
                action = 2; // not closing first tab, implicitly more tabs exist
            else action = 3; // closing first tab and no other tabs exist
        }

        // remove the tab
        this.layerTabs.splice(i, 1);

        // handle post close-tab behavior
        if (allowNoTab) return;

        switch (action) {
            case 0: // should only occur if the active tab is not closed, don't select another tab
                break;
            case 1: // closing the first tab and more tabs exist
                this.selectTab(this.layerTabs[0]); // select first tab
                break;
            case 2: // closing any tab other than the first
                this.selectTab(this.layerTabs[0]); // select first tab
                break;
            case 3: // closing first tab and no other tab exist
                this.newBlankTab(); // create a new blank tab, automatically opens this tab
                break;
            default: // should never occur
                console.error('post closetab action not specified (this should never happen)');
        }
    }

    /**
     * Close the currently selected tab
     * @param  {boolean} allowNoTab if true, doesn't select another tab, and won't open a new tab if there are none, default false
     */
    public closeActiveTab(allowNoTab: boolean = false): void {
        if (this.activeTab) this.closeTab(this.activeTab, allowNoTab);
    }

    /**
     * Handle tab click event
     * @param {Tab} tab the selected tab
     */
    public handleTabClick(tab: Tab): void {
        if (this.activeTab !== tab) {
            this.activeTab = tab;
            this.dropdownEnabled = '';
        } else this.dropdownEnabled = this.dropdownEnabled !== 'description' ? 'description' : '';
    }

    /**
     * Filter domains on version
     * @param {Version} version the version to filter by
     * @returns list of domains in the given version
     */
    public filterDomains(version: Version): Domain[] {
        return this.dataService.domains.filter((d) => d.version == version);
    }

    /**
     * Check if the given feature is defined in the config file
     * @param {string} featureName the name of the feature
     * @returns true, if the feature is defined, false otherwise
     */
    public hasFeature(featureName: string): boolean {
        return this.configService.getFeature(featureName);
    }

    /**
     * Handle theme change
     * @param {string} theme the selected theme
     */
    public handleUserThemeChange(theme: string) {
        this.onUserThemeChange.emit(theme);
    }

    /**
     * Open the selected dialog
     * @param {string} dialogName {"changelog"|"help"} the dialog to open
     */
    public openDialog(dialogName: string) {
        const settings = { maxWidth: '75ch', panelClass: this.userTheme, autoFocus: false, data: { theme: this.userTheme } };
        if (dialogName == 'changelog') {
            this.dialog.open(ChangelogComponent, settings);
        } else if (dialogName == 'help') {
            this.dialog.open(HelpComponent, settings);
        } else if (dialogName == 'layers') {
            this.dialog.open(LayerInformationComponent, settings);
        }
    }

    /**
     * Open the SVG exporter dialog
     * @param {ViewModel} viewModel the viewModel to render
     */
    public openSVGDialog(viewModel: ViewModel) {
        this.dialog.open(SvgExportComponent, {
            data: { vm: viewModel },
            panelClass: ['dialog-custom', this.userTheme],
            autoFocus: false,
        });
    }

    /**
     * Given a unique root, get a layer name that does not conflict any existing layers, e.g 'new layer' -> 'new layer 1'
     * @param  {string} root the root string to get the non-conflicting version of
     * @return {string}      non-conflicted version
     */
    public getUniqueLayerName(root: string): string {
        let id = 0;

        function isInteger(str: string): boolean {
            let n = Math.floor(Number(str));
            return String(n) === str;
        }

        for (let viewModel of this.viewModelsService.viewModels) {
            if (!viewModel.name.startsWith(root)) continue;
            if (viewModel.name === root) {
                // case where it's "layer" aka "layer0"
                id = Math.max(id, 1);
                continue;
            }

            // find the lowest number higher than existing number
            let substr = viewModel.name.substring(root.length, viewModel.name.length);
            if (isInteger(substr)) {
                id = Math.max(id, Number(substr) + 1);
            }
        }

        // if no layers of this name exist (id == 0) just return root
        if (id != 0) root = root + id;
        return root;
    }

    /**
     * Create a new layer from URL
     */
    public newLayerFromURL(loadData: any, obj: any = undefined): void {
        let domainID = loadData.identifier.toLowerCase();
        let domainVersionID = this.dataService.getDomainVersionID(domainID, loadData.version);

        // validate input data
        let valid = this.validateInput(loadData, domainVersionID);
        if (!valid) return;

        // load from URL
        let url = new URL(loadData.url).toString();
        let subscription;
        subscription = this.http.get(url).subscribe({
            next: (res) => {
                // check for custom domain
                let exists = this.dataService.domains.find((d) => d.isCustom && d.id === domainVersionID);
                if (!exists) {
                    // create or retrieve version
                    let v: Version = this.dataService.versions.find((v) => v.number == loadData.version);
                    if (!v) {
                        v = new Version(`ATT&CK v${loadData.version}`, String(loadData.version));
                        this.dataService.versions.push(v);
                    }

                    // create new custom domain object
                    let domainObject = new Domain(domainID, domainID, v, [url]);
                    domainObject.isCustom = true;
                    this.dataService.domains.push(domainObject);
                }

                this.newLayer(domainVersionID, obj);
            },
            error: (err) => {
                console.error(err);
                alert('ERROR retrieving data from ' + url + ', check the javascript console for more information.');
            },
            complete: () => {
                if (subscription) subscription.unsubscribe();
            }, // prevent memory leaks
        });
    }

    /**
     * Validate user input data before loading data from collection or STIX bundle URL
     * @param {any} loadData the user input
     * @param {string} domainVersionID the domain and version
     * @returns true if user input is valid, false otherwise
     */
    public validateInput(loadData: any, domainVersionID: string): boolean {
        try {
            // validate URL
            let url = new URL(loadData.url);

            // validate version
            if (isNaN(loadData.version)) {
                throw Error('version is not a number');
            }

            // validate domainVersionID is unique
            let exists = this.dataService.domains.find((d) => d.id == domainVersionID);
            // Note: if a user inputs the same domain, version, AND url, do not check for collisions, just reload the custom dataset
            if (exists && !(exists.isCustom && exists.urls[0] == url.toString())) {
                throw Error(`the domain and version specified conflict with an existing set of ATT&CK data (${exists.name} ${exists.version.name})`);
            }

            return true; // passed validation
        } catch (err) {
            console.error(err);
            if (err instanceof TypeError) {
                alert('ERROR: invalid url, check the javascript console for more information.');
            } else {
                alert('ERROR ' + err.message);
            }
            return false; // failed validation
        }
    }

    /**
     * Create a new layer in the given domain and version
     */
    public newLayer(domainVersionID: string, obj: any = undefined): void {
        // load domain data, if not yet loaded
        let domain = this.dataService.getDomain(domainVersionID);
        if (!domain.dataLoaded) {
            this.dataService.loadDomainData(domainVersionID, true);
        }

        // find non conflicting name
        let name;
        if (obj && 'name' in obj && obj['name']) {
            name = obj['name'];
        } else name = this.getUniqueLayerName('layer');

        // create and open the view model
        let viewModel = this.viewModelsService.newViewModel(name, domainVersionID);
        if (obj) {
            // restore view model from the given string
            viewModel.deserialize(obj);
        }
        viewModel.loadVMData();
        this.openTab(name, viewModel, true, true, true, true);
    }

    /**
     * Get the layer score expression variable for the tab at the given index
     * @param {number} index the index of the tab
     * @return {string} the score expression character
     */
    public indexToChar(index: number): string {
        let viewModelIndex = 0;
        for (let i = 0; i < index; i++) {
            // check if tab has a view model
            if (this.layerTabs[i].viewModel) viewModelIndex++;
        }
        return String.fromCharCode(97 + viewModelIndex);
    }

    /**
     * Inverse of indextoChar, maps the character to the tab it corresponds to
     * @param {string} char the score expression character
     * @return {number} the index of the tab
     */
    public charToIndex(char: string): number {
        let viewModelIndex = 0;
        for (let i = 0; i < this.layerTabs.length; i++) {
            if (this.layerTabs[i].viewModel) {
                let currChar = String.fromCharCode(97 + viewModelIndex);
                viewModelIndex++;
                if (currChar == char) return i;
            }
        }
    }

    /**
     * Create a new layer by operation based on user input
     */
    public layerByOperation(): void {
        // build score expression map, mapping inline variables to their actual VMs
        let scoreVariables = new Map<string, ViewModel>();
        let regex = /\b[a-z]\b/g; // \b matches word boundary
        let matches = this.opSettings.scoreExpression.match(regex);

        let self = this;
        if (matches) {
            matches.forEach(function (match) {
                let index = self.charToIndex(match);
                let vm = self.layerTabs[index].viewModel;
                scoreVariables.set(match, vm);
            });
        }

        let layerName = this.getUniqueLayerName('layer by operation');
        try {
            // all layers must be of the same domain/version
            let vms = Array.from(scoreVariables.values());
            if (vms && !vms.every((vm) => vm.domainVersionID === vms[0].domainVersionID)) {
                throw Error('cannot apply operations to layers of different domains');
            }

            // execute the layer operation
            let vm = this.viewModelsService.layerOperation(scoreVariables, layerName, this.opSettings);

            // load domain data and open new layer operation tab
            if (!this.dataService.getDomain(this.opSettings.domain).dataLoaded) {
                this.dataService.loadDomainData(this.opSettings.domain, true).then(() => {
                    vm.loadVMData();
                    vm.updateGradient();
                    this.openTab(layerName, vm, true, true, true, true);
                });
            } else {
                vm.loadVMData();
                vm.updateGradient();
                this.openTab(layerName, vm, true, true, true, true);
            }
        } catch (err) {
            console.error(err);
            alert('Layer Layer operation error: ' + err.message);
        }
    }

    /**
     * Check if there's an error in the score expression (syntax, etc)
     * @return {string} error or null if no error
     */
    public getScoreExpressionError(): string {
        let self = this;
        try {
            // build fake scope
            let regex = /\b[a-z]\b/g; // \b matches word boundary
            let scope = {};
            let matches = self.opSettings.scoreExpression.match(regex);

            if (matches) {
                let noMatch = '';
                matches.forEach(function (match) {
                    scope[match] = 0;

                    // check if letter is too large
                    if (typeof self.charToIndex(match) == 'undefined') {
                        noMatch = 'Variable ' + match + ' does not match any layers';
                    } else if (
                        self.opSettings.domain &&
                        self.layerTabs[self.charToIndex(match)].viewModel.domainVersionID !== self.opSettings.domain
                    ) {
                        noMatch = 'Layer ' + match + ' does not match the chosen domain';
                    }
                });
                if (noMatch.length > 0) return noMatch;
            }
            return null;
        } catch (err) {
            return err.message;
        }
    }

    /**
     * Open prompt to upload a layer
     */
    public openUploadPrompt(): void {
        let input = <HTMLInputElement>document.getElementById('uploader');
        input.click();
    }

    /**
     * Dialog to upgrade version if layer is not the latest version
     */
    public versionUpgradeDialog(viewModel: ViewModel): Promise<any> {
        let dataPromise: Promise<any> = new Promise((resolve, reject) => {
            let currVersion = this.dataService.latestVersion.number;
            if (viewModel.version !== currVersion) {
                // ask to upgrade
                let dialog = this.dialog.open(VersionUpgradeComponent, {
                    data: {
                        layerName: viewModel.name,
                        vmVersion: viewModel.version,
                        currVersion: currVersion,
                    },
                    disableClose: true,
                    width: '25%',
                    panelClass: this.userTheme,
                    autoFocus: false,
                });
                this.subscription = dialog.afterClosed().subscribe({
                    next: (result) => {
                        if (!result.upgrade && !this.dataService.isSupported(viewModel.version)) {
                            reject(
                                new Error(`Uploaded layer version (${String(viewModel.version)}) is not supported by Navigator v${this.navVersion}`)
                            );
                        }
                        if (result.upgrade) {
                            let newDomainVersionID = this.dataService.getDomainVersionID(viewModel.domain, currVersion);
                            resolve({ oldID: viewModel.domainVersionID, newID: newDomainVersionID });
                        }
                        resolve(null);
                    },
                    complete: () => {
                        if (this.subscription) this.subscription.unsubscribe();
                    }, //prevent memory leaks
                });
            } else resolve(null); // layer is already current version
        });
        return dataPromise;
    }

    /**
     * Checks if the layer can be upgraded and initializes the layer upgrade process
     * @param {ViewModel}   oldViewModel viewmodel to upgrade
     * @param {any}         serialized the viewmodel's raw serialized JSON string
     * @param {boolean}     replace replace if true, replace the current active tab with the layer
     * @param {boolean}     defaultLayers is this a layer being loaded by default (from the config or query string)?
     *                      if so, will act as if the user decided not to upgrade the layer
     */
    public upgradeLayer(oldViewModel: ViewModel, serialized: any, replace: boolean, defaultLayers: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!defaultLayers) {
                this.versionUpgradeDialog(oldViewModel)
                    .then((versions) => {
                        if (versions) {
                            // user upgraded to latest version
                            // create and open the latest version
                            let newViewModel = this.viewModelsService.newViewModel(oldViewModel.name, versions.newID);
                            newViewModel.version = this.dataService.latestVersion.number; // update version to new ID
                            newViewModel.deserialize(serialized, false); // restore layer data, except for technique annotations
                            newViewModel.loadVMData();
                            newViewModel.compareTo = oldViewModel;
                            this.openTab('new layer', newViewModel, true, replace, true, true);
                            newViewModel.openSidebar('layerUpgrade');
                            newViewModel.selectTechniquesAcrossTactics = false;

                            // load layer version & latest ATT&CK version
                            let loads: any = {};
                            let dataSubscription: Subscription;
                            if (!this.dataService.getDomain(versions.oldID).dataLoaded)
                                loads.old = this.dataService.loadDomainData(versions.oldID, true);
                            if (!this.dataService.getDomain(versions.newID).dataLoaded)
                                loads.new = this.dataService.loadDomainData(versions.newID, true);
                            dataSubscription = forkJoin(loads).subscribe({
                                complete: () => {
                                    newViewModel.versionChangelog = this.dataService.compareVersions(versions.oldID, versions.newID);
                                    // load vm for uploaded layer
                                    oldViewModel.deserialize(serialized);
                                    oldViewModel.loadVMData();
                                    newViewModel.initCopyAnnotations();
                                    resolve(null);
                                    if (dataSubscription) dataSubscription.unsubscribe();
                                },
                            });
                        } else {
                            // user did not upgrade, keep the old version
                            this.openTab('new layer', oldViewModel, true, replace, true, true);
                            if (!this.dataService.getDomain(oldViewModel.domainVersionID).dataLoaded) {
                                this.dataService.loadDomainData(oldViewModel.domainVersionID, true).then(() => {
                                    oldViewModel.deserialize(serialized);
                                    oldViewModel.loadVMData();
                                    resolve(null);
                                });
                            } else {
                                oldViewModel.deserialize(serialized);
                                oldViewModel.loadVMData();
                                resolve(null);
                            }
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        alert('ERROR parsing file, check the javascript console for more information.');
                        resolve(null);
                    });
            } else {
                // default layer, do not upgrade
                this.openTab('new layer', oldViewModel, true, replace, true, true);
                if (!this.dataService.getDomain(oldViewModel.domainVersionID).dataLoaded) {
                    this.dataService.loadDomainData(oldViewModel.domainVersionID, true).then(() => {
                        oldViewModel.deserialize(serialized);
                        oldViewModel.loadVMData();
                        resolve(null);
                    });
                } else {
                    oldViewModel.deserialize(serialized);
                    oldViewModel.loadVMData();
                    resolve(null);
                }
            }
        });
    }

    /**
     * Load a layer from file
     */
    public loadLayerFromFile(): void {
        let input = <HTMLInputElement>document.getElementById('uploader');
        if (input.files.length < 1) {
            alert('You must select a file to upload!');
            return;
        }
        this.readJSONFile(input.files[0]);
    }

    /**
     * Reads the JSON file, adds the properties to a view model, and
     * loads the view model into a new layer
     */
    public async readJSONFile(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            let self = this;

            reader.onload = async (e) => {
                let loadObjAsLayer = async function (layerObj) {
                    let viewModel = self.viewModelsService.newViewModel('loading layer...', undefined);
                    try {
                        let layerVersionStr = viewModel.deserializeDomainVersionID(layerObj);
                        await self.versionMismatchWarning(layerVersionStr);
                        self.versionMismatchWarning(layerVersionStr);
                        if (!self.dataService.getDomain(viewModel.domainVersionID)) {
                            throw new Error(`Error: '${viewModel.domain}' (v${viewModel.version}) is an invalid domain.`);
                        }

                        let isCustom = 'customDataURL' in layerObj;
                        if (!isCustom) {
                            await self.upgradeLayer(viewModel, layerObj, true);
                            console.debug(`loaded layer "${viewModel.name}"`);
                        } else {
                            // load as custom data
                            viewModel.deserialize(layerObj);
                            let url = layerObj['customDataURL'];
                            self.newLayerFromURL({ url: url, version: viewModel.version, identifier: viewModel.domain }, layerObj);
                        }
                    } catch (err) {
                        console.error(err);
                        alert(`ERROR parsing layer, check the javascript console for more information.`);
                        self.viewModelsService.destroyViewModel(viewModel);
                        resolve(null); // continue
                    }
                };

                let result = String(reader.result);
                let layerFile = typeof result == 'string' ? JSON.parse(result) : result;
                if (layerFile?.length) {
                    console.debug('loading file with multiple layers');
                    for (let layer of layerFile) {
                        await loadObjAsLayer(layer);
                    }
                } else {
                    await loadObjAsLayer(layerFile);
                }
            };
            reader.readAsText(file);
        });
    }

    /**
     * Check if uploaded layer version is out of date and display
     * a snackbar warning message (for minor mismatches) or a dialog warning
     * (for major mismatches)
     * @param {string} layerVersionStr the uploaded layer version
     */
    public async versionMismatchWarning(layerVersionStr: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let globalVersionSplit = globals.layerVersion.split('.');
            let layerVersion = layerVersionStr.split('.');
            // if minor version change, snackbar will be displayed
            if (layerVersion[0] === globalVersionSplit[0] && layerVersion[1] !== globalVersionSplit[1]) {
                let snackMessage = `Uploaded layer version (${layerVersionStr}) is out of date. Please update to v${globals.layerVersion} for optimal compatibility.`;
                this.versionMinorSnackbarRef = this.snackBar.open(snackMessage, 'CHANGELOG', {
                    duration: 6500,
                });
                this.versionMinorSnackbarRef.onAction().subscribe(() => {
                    this.openDialog('changelog');
                });
                resolve(true);
            }
            // if major version change, keep the dialog open until user dismisses it
            else if (layerVersion[0] !== globalVersionSplit[0]) {
                this.versionDialogRef = this.dialog.open(this.versionWarning, {
                    width: '30em',
                    disableClose: true,
                    panelClass: this.userTheme,
                    data: {
                        objVersion: layerVersionStr,
                        globalVersion: globals.layerVersion,
                    },
                });
                this.versionDialogRef.afterClosed().subscribe((_) => {
                    resolve(true);
                });
            } else {
                resolve(true);
            }
        });
    }

    /**
     * Load layer from URL
     * @param {string} loadURL the url to load
     * @param {boolean} replace replace the current active with the loaded layer?
     * @param {boolean} defaultLayers is this loading reflecting a set of default layers (from the config file or from the query string)?
     *
     */
    public async loadLayerFromURL(loadURL: string, replace: boolean, defaultLayers: boolean = false): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let subscription;
            let self = this;
            subscription = self.http.get(loadURL).subscribe({
                next: async (res) => {
                    let loadLayerAsync = async function (layerObj) {
                        let viewModel = self.viewModelsService.newViewModel('loading layer...', undefined);
                        try {
                            let layerVersionStr = viewModel.deserializeDomainVersionID(layerObj);
                            await self.versionMismatchWarning(layerVersionStr);
                            if (!self.dataService.getDomain(viewModel.domainVersionID)) {
                                throw new Error(`Error: '${viewModel.domain}' (v${viewModel.version}) is an invalid domain.`);
                            }
                            await self.upgradeLayer(viewModel, layerObj, replace, defaultLayers);
                            console.debug(`loaded layer "${viewModel.name}" from ${loadURL}`);
                        } catch (err) {
                            console.error(err);
                            alert(`ERROR parsing layer from ${loadURL}, check the javascript console for more information.`);
                            self.viewModelsService.destroyViewModel(viewModel);
                            resolve(null); // continue
                        }
                    };

                    let layerFile = typeof res == 'string' ? JSON.parse(res) : res;
                    if (layerFile?.length) {
                        console.debug('loading file with multiple layers');
                        for (let layer of layerFile) {
                            await loadLayerAsync(layer);
                        }
                    } else {
                        await loadLayerAsync(layerFile);
                    }
                    resolve(null); //continue
                },
                error: (err) => {
                    console.error(err);
                    alert(`ERROR retrieving layer from ${loadURL}, check the javascript console for more information.`);
                    resolve(null); // continue
                },
                complete: () => {
                    if (subscription) subscription.unsubscribe();
                }, // prevent memory leaks
            });
        });
    }

    /**
     * Helper function to track which layerLinkURLs have been added or removed
     */
    public trackByFunction(index: number): any {
        return index;
    }

    /**
     * Add a new empty layer link to the layerLinkURLs array
     */
    public addLayerLink(): void {
        this.layerLinkURLs.push('');
    }

    /**
     * Remove the given layer link URL from layerLinkURLs
     * @param {number} index the index to remove
     */
    public removeLayerLink(index: number): void {
        this.layerLinkURLs.splice(index, 1);
    }

    /**
     * Convert layerLinkURL to a query string value for layerURL query string
     * @return URL such that when opened will create navigator instance with a query String
     *         specifying layerLinkURL as the URL to fetch the default layer from
     */
    public getLayerLink(): string {
        let str = window.location.href.split('#')[0];
        let join = '#'; // hash first, then ampersand
        for (let layerLinkURL of this.layerLinkURLs) {
            str += join + 'layerURL=' + encodeURIComponent(layerLinkURL);
            join = '&';
        }
        for (let feature of this.configService.customizefeatureList) {
            if (feature.subfeatures) {
                for (let subfeature of feature.subfeatures) {
                    if (!subfeature.enabled) {
                        str += join + subfeature.name + '=false';
                        join = '&';
                    }
                }
            } else if (!feature.enabled) {
                str += join + feature.name + '=false';
                join = '&';
            }
        }
        return str;
    }

    /**
     * Select the layer link field text
     */
    public selectLayerLink(): void {
        let copyText = <HTMLInputElement>document.getElementById('layerLink');
        console.debug('copied', copyText.value);
        copyText.select();
    }

    /**
     * Copy the created layer link to clipboard
     */
    public copyLayerLink(): void {
        this.selectLayerLink();
        document.execCommand('Copy');
        this.copiedRecently = true;
        let self = this;
        window.setTimeout(function () {
            self.copiedRecently = false;
        }, 2000);
    }

    /**
     * Return true if the text is only letters a-z, false otherwise
     * @param  text text to eval
     * @return      true if a-z, false otherwise
     */
    public isAlphabetical(text: string): boolean {
        return /^[a-z]+$/.test(text);
    }

    /**
     * Get a key=value fragment value by key
     * @param  {string} name name of param to get the value of
     * @param  {string} url  optional, if unspecified searches in current window location. Otherwise searches this string
     * @return {string}      fragment param value
     */
    public getNamedFragmentValue(name: string, url?: string): any {
        if (!url) url = window.location.href;

        name = name.replace(/[[\]]/g, '\\$&');
        let regex = new RegExp('[#&]' + name + '(?:=([^&#]*)|&|#|$)', 'g');

        // match as many results as exist under the name
        let results = [];
        let match = regex.exec(url);
        while (match != null) {
            results.push(decodeURIComponent(match[1].replace(/\+/g, ' ')));
            match = regex.exec(url);
        }
        return results;
    }

    /** Get all view models in the same domain/version */
    public getFilteredVMs(): ViewModel[] {
        return this.viewModelsService.viewModels.filter((vm) => vm.domainVersionID == this.opSettings.domain);
    }
}
