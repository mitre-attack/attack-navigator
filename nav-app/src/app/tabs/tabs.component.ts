import { Component, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { Domain } from '../classes/stix';
import { Tab, Version, ViewModel } from '../classes';
import { ConfigService } from '../services/config.service';
import { VersionUpgradeComponent } from '../version-upgrade/version-upgrade.component';
import { HelpComponent } from '../help/help.component';
import { SvgExportComponent } from '../svg-export/svg-export.component';
import { ViewModelsService } from "../services/viewmodels.service";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ChangelogComponent } from "../changelog/changelog.component";
import { forkJoin } from 'rxjs';
import * as is from 'is_js';
import * as globals from '../utils/globals';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [ViewModelsService],
    encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements AfterViewInit {
    @Input() userTheme: string;
    @Output() onUserThemeChange = new EventEmitter<string>();
    @ViewChild('safariWarning') safariWarning: TemplateRef<any>;

    public activeTab: Tab = null;
    public dropdownEnabled: string = '';
    public layerTabs: Tab[] = []; // TODO: rename to 'tabs' or 'allTabs'?
    public adjustedHeaderHeight: number = 0;
    public navVersion = globals.nav_version;
    public safariDialogRef;
    public showHelpDropDown: boolean = false;
    public loadURL: string = "";
    public layerLinkURLs: string[] = [];
    public customizedConfig: any[] = [];
    public bannerContent: string;
    public copiedRecently: boolean = false; // true if copyLayerLink is called, reverts to false after 2 seconds

    public loadData: any = {
        url: undefined,
        version: undefined,
        identifier: undefined
    }

    // user input for layer-layer operations
    public opSettings: any = {
        domain: "",
        gradientVM: null,
        coloringVM: null,
        commentVM: null,
        linkVM: null,
        metadataVM: null,
        enabledVM: null,
        filterVM: null,
        scoreExpression: "",
        legendVM: null
    }

    public get filteredVMs(): ViewModel[] {
        return this.viewModelsService.viewModels.filter((vm) => vm.domainVersionID == this.opSettings.domain);
    }

    constructor(private dialog: MatDialog, 
                private viewModelsService: ViewModelsService, 
                public  dataService: DataService, 
                private http: HttpClient, 
                private configService: ConfigService) {
        console.debug("initializing tabs component");
        let subscription = dataService.getConfig().subscribe({
            next: (config: Object) => {
                this.newBlankTab();
                this.loadTabs(config["default_layers"]).then( () => {
                    // if failed to load from url, create a new blank layer
                    if (this.layerTabs.length == 0) this.newLayer(this.dataService.domains[0].id);

                    // if there is no active tab set, activate the first
                    if (!this.activeTab) this.selectTab(this.layerTabs[0]);
                });
                this.customizedConfig = this.configService.getFeatureList()
                this.bannerContent = this.configService.banner;
            },
            complete: () => { if (subscription) subscription.unsubscribe(); } // prevent memory leaks
        });
    }

    ngAfterViewInit(): void {
        if (is.safari('<=13')) {
            // open safari version incompatibility warning
            this.safariDialogRef = this.dialog.open(this.safariWarning, {
                width: '350px',
                disableClose: true,
                panelClass: this.userTheme
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
    private async loadTabs(defaultLayers) {
        let bundleURL = this.getNamedFragmentValue("bundleURL")[0];
        let bundleVersion = this.getNamedFragmentValue("version")[0];
        let bundleDomain = this.getNamedFragmentValue("domain")[0];
        let layerURLs = this.getNamedFragmentValue("layerURL");

        let self = this;
        if (bundleURL?.length && bundleVersion && bundleDomain?.length) {
            // load base data from URL
            self.newLayerFromURL({
                'url': bundleURL,
                'version': bundleVersion,
                'identifier': bundleDomain
            });
        } else if (layerURLs?.length) {
            // load layer from URL
            let first = true;
            for (let url of layerURLs) {
                await self.loadLayerFromURL(url, first, true);
                first = false;
            }
        } else if (defaultLayers["enabled"]) {
            // load default layers from config file
            let first = true;
            for (let url of defaultLayers["urls"]) {
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
    private openTab(title: string, viewModel: ViewModel, isCloseable = false, replace = true, forceNew = false, isDataTable = false): void {
        if (!forceNew) {
            // if tab is already open, change to that tab
            let tab: Tab = this.layerTabs.find(t => t.title === title);
            this.selectTab(tab);
            return;
        }

        // create a new tab
        let domain = viewModel ? viewModel.domainVersionID : "";
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
                    if(this.layerTabs[i].title == "new tab") {
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
    private selectTab(tab: Tab): void {
        this.activeTab = tab;

        // close search sidebar
        this.viewModelsService.viewModels.forEach(viewModel => {
            if (viewModel.sidebarContentType === 'search') {
                viewModel.sidebarOpened = false;
                viewModel.sidebarContentType = "";
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
        let i = this.layerTabs.findIndex(t => t === tab);
        if (tab == this.activeTab) {
            if (i == 0 && this.layerTabs.length > 1) action = 1; // closing first tab, first tab is active, and more tabs exist
            else if (i > 0) action = 2; // not closing first tab, implicitly more tabs exist
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
                this.selectTab(this.layerTabs[0]) // select first tab
                break;
            case 2: // closing any tab other than the first
                this.selectTab(this.layerTabs[0]); // select first tab
                break;
            case 3:// closing first tab and no other tab exist
                this.newBlankTab(); // create a new blank tab, automatically opens this tab
                break;
            default: // should never occur
                console.error("post closetab action not specified (this should never happen)");
        }
    }

    /**
     * Close the currently selected tab
     * @param  {boolean} allowNoTab if true, doesn't select another tab, and won't open a new tab if there are none, default false
     */
    private closeActiveTab(allowNoTab: boolean = false): void {
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
        }
        else this.dropdownEnabled = this.dropdownEnabled !== 'description' ? 'description' : '';
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
        const settings = { maxWidth: "75ch", panelClass: this.userTheme };
        if (dialogName == 'changelog') this.dialog.open(ChangelogComponent, settings);
        else if (dialogName == 'help') this.dialog.open(HelpComponent, settings);
    }

    /**
     * Open the SVG exporter dialog
     * @param {ViewModel} viewModel the viewModel to render
     */
    public openSVGDialog(viewModel: ViewModel) {
        this.dialog.open(SvgExportComponent, {
            data: {vm: viewModel},
            panelClass: ['dialog-custom', this.userTheme]
        });
    }

    /**
     * Given a unique root, get a layer name that does not conflict any existing layers, e.g 'new layer' -> 'new layer 1'
     * @param  {string} root the root string to get the non-conflicting version of
     * @return {string}      non-conflicted version
     */
    private getUniqueLayerName(root: string): string {
        let id = 0;

        function isInteger(str: string): boolean {
            let n = Math.floor(Number(str));
            return String(n) === str;
        }

        for (let viewModel of this.viewModelsService.viewModels) {
            if (!viewModel.name.startsWith(root)) continue;
            if (viewModel.name === root) { // case where it's "layer" aka "layer0"
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
        if (id != 0) root = root + id
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
        let subscription = this.http.get(url).subscribe({
            next: (res) => {
                // check for custom domain
                let exists = this.dataService.domains.find(d => d.isCustom && d.id === domainVersionID);
                if (!exists) {
                    // create or retrieve version
                    let v: Version = this.dataService.versions.find(v => v.number == loadData.version);
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
                alert("ERROR retrieving data from " + url + ", check the javascript console for more information.")
            },
            complete: () => { if (subscription) subscription.unsubscribe(); } // prevent memory leaks
        });
    }

    /**
     * Validate user input data before loading data from collection or STIX bundle URL
     * @param {any} loadData the user input
     * @param {string} domainVersionID the domain and version
     * @returns true if user input is valid, false otherwise
     */
    private validateInput(loadData: any, domainVersionID: string): boolean {
        try {
            // validate URL
            let url = new URL(loadData.url);

            // validate version
            if (isNaN(loadData.version)) {
                throw Error("version is not a number");
            }

            // validate domainVersionID is unique
            let exists = this.dataService.domains.find(d => d.id == domainVersionID);
            // Note: if a user inputs the same domain, version, AND url, do not check for collisions, just reload the custom dataset
            if (exists && !(exists.isCustom && exists.urls[0] == url.toString())) {
                throw Error(`the domain and version specified conflict with an existing set of ATT&CK data (${exists.name} ${exists.version.name})`);
            }

            return true; // passed validation
        } catch (err) {
            console.error(err);
            if (err instanceof TypeError) {
                alert("ERROR: invalid url, check the javascript console for more information.");
            } else {
                alert("ERROR " + err.message);
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
        } else name = this.getUniqueLayerName("layer");

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
        return String.fromCharCode(97+viewModelIndex);
    }

    /**
     * Inverse of indextoChar, maps the character to the tab it corresponds to
     * @param {string} char the score expression character
     * @return {number} the index of the tab
     */
    private charToIndex(char: string): number {
        let viewModelIndex = 0;
        for (let i = 0; i < this.layerTabs.length; i++) {
            if (this.layerTabs[i].viewModel) {
                let currChar = String.fromCharCode(97+viewModelIndex);
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
        let regex = /\b[a-z]\b/g // \b matches word boundary
        let matches = this.opSettings.scoreExpression.match(regex);

        let self = this;
        if (matches) {
            matches.forEach(function(match) {
                let index = self.charToIndex(match);
                let vm = self.layerTabs[index].viewModel;
                scoreVariables.set(match, vm);
            });
        }

        let layerName = this.getUniqueLayerName("layer by operation");
        try {
            // all layers must be of the same domain/version
            let vms = Array.from(scoreVariables.values());
            if (vms && !vms.every((vm) => vm.domainVersionID === vms[0].domainVersionID)) {
                throw Error("cannot apply operations to layers of different domains");
            }

            // execute the layer operation
            let vm = this.viewModelsService.layerOperation(scoreVariables, layerName, this.opSettings);

            // load domain data and open new layer operation tab
            if (!this.dataService.getDomain(this.opSettings.domain).dataLoaded) {
                this.dataService.loadDomainData(this.opSettings.domain, true).then( () => {
                    vm.loadVMData();
                    vm.updateGradient();
                    this.openTab(layerName, vm, true, true, true, true);
                })
            } else {
                vm.loadVMData();
                vm.updateGradient();
                this.openTab(layerName, vm, true, true, true, true);
            }
        } catch (err) {
            console.error(err);
            alert("Layer Layer operation error: " + err.message);
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
            let regex = /\b[a-z]\b/g // \b matches word boundary
            let scope = {};
            let matches = self.opSettings.scoreExpression.match(regex);

            if (matches) {
                let noMatch = ""
                matches.forEach(function(match) {
                    scope[match] = 0;

                    // check if letter is too large
                    if (typeof(self.charToIndex(match)) == "undefined") {
                        noMatch = "Variable " + match + " does not match any layers"
                    } else if (self.opSettings.domain && self.layerTabs[self.charToIndex(match)].viewModel.domainVersionID !== self.opSettings.domain) {
                        noMatch = "Layer " + match + " does not match the chosen domain"
                    }
                });
                if (noMatch.length > 0) return noMatch;
            }
            return null;
        } catch(err) {
            return err.message;
        }
    }

    /**
     * Open prompt to upload a layer
     */
    public openUploadPrompt(): void {
        let input = (<HTMLInputElement>document.getElementById("uploader"));
        input.click();
    }

    /**
     * Dialog to upgrade version if layer is not the latest version
     */
    private versionUpgradeDialog(viewModel: ViewModel): Promise<any> {
        let dataPromise: Promise<any> = new Promise((resolve, reject) => {
            let currVersion = this.dataService.getCurrentVersion().number;
            if (viewModel.version !== currVersion) { // ask to upgrade
                let dialog = this.dialog.open(VersionUpgradeComponent, {
                    data: {
                        layerName: viewModel.name,
                        vmVersion: viewModel.version,
                        currVersion: currVersion
                    },
                    disableClose: true,
                    width: "25%",
                    panelClass: this.userTheme
                });
                let subscription = dialog.afterClosed().subscribe({
                    next: (result) => {
                        if (!result.upgrade && !this.dataService.isSupported(viewModel.version)) {
                            reject(new Error(`Uploaded layer version (${String(viewModel.version)}) is not supported by Navigator v${this.navVersion}`));
                        }
                        if (result.upgrade) {
                            let newDomainVersionID = this.dataService.getDomainVersionID(viewModel.domain, currVersion);
                            resolve({oldID: viewModel.domainVersionID, newID: newDomainVersionID});
                        }
                        resolve(null);
                    },
                    complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
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
            if (defaultLayers) {
                // this is a default layer, do not upgrade
                this.loadLayerFromVM(oldViewModel, serialized, replace);
                resolve(null);
            } else {
                this.versionUpgradeDialog(oldViewModel).then((versions) => {
                    if (versions) {
                        // user upgraded to latest version
                        // create and open the latest version
                        let newViewModel = this.viewModelsService.newViewModel(oldViewModel.name, versions.newID);
                        newViewModel.version = this.dataService.getCurrentVersion().number; // update version to new ID
                        newViewModel.loadVMData();
                        newViewModel.compareTo = oldViewModel;
                        this.openTab("new layer", newViewModel, true, replace, true, true);
                        newViewModel.sidebarOpened = true;
                        newViewModel.sidebarContentType = 'layerUpgrade'
                        newViewModel.selectTechniquesAcrossTactics = false;
        
                        // load layer version & latest ATT&CK version
                        let loads: any = {
                            old: this.dataService.loadDomainData(versions.oldID, true),
                            new: this.dataService.loadDomainData(versions.newID, true)
                        };
                        let dataSubscription = forkJoin(loads).subscribe({
                            next: () => {
                                newViewModel.versionChangelog = this.dataService.compareVersions(versions.oldID, versions.newID);
                                // load vm for uploaded layer
                                oldViewModel.deserialize(serialized);
                                oldViewModel.loadVMData();
                                newViewModel.initCopyAnnotations();
                                resolve(null);
                            },
                            complete: () => { dataSubscription.unsubscribe(); }
                        });
                    } else {
                        // user did not upgrade, keep the old version
                        this.loadLayerFromVM(oldViewModel, serialized, replace);
                        resolve(null);
                    }
                }).catch( (err) => {
                    console.error(err);
                    alert("ERROR parsing file, check the javascript console for more information.");
                    resolve(null);
                });
            }
        })
    }

    /**
     * Load a layer with given view model
     * @param {ViewModel}   viewModel layer viewmodel
     * @param {any}         serialized the viewmodel's raw serialized JSON string
     * @param {boolean}     replace replace if true, replace the current active tab with the layer
     */
    public loadLayerFromVM(viewModel: ViewModel, serialized: any, replace: boolean): void {
        this.openTab("new layer", viewModel, true, replace, true, true);
        if (!this.dataService.getDomain(viewModel.domainVersionID).dataLoaded) {
            this.dataService.loadDomainData(viewModel.domainVersionID, true).then( () => {
                viewModel.deserialize(serialized);
                viewModel.loadVMData();
            });
        } else {
            viewModel.deserialize(serialized);
            viewModel.loadVMData();
        }
    }

    /**
     * Load a layer from file
     */
    public loadLayerFromFile(): void {
        let input = (<HTMLInputElement>document.getElementById("uploader"));
        if (input.files.length < 1) {
            alert("You must select a file to upload!");
            return;
        }
        this.readJSONFile(input.files[0]);
    }

    /**
     * Reads the JSON file, adds the properties to a view model, and
     * loads the view model into a new layer
     */
    private readJSONFile(file: File) {
        let reader = new FileReader();
        let viewModel: ViewModel;
        reader.onload = (e) => {
            let result = String(reader.result);

            function loadObjAsLayer(self, obj): void {
                viewModel = self.viewModelsService.newViewModel("loading layer...", undefined);
                viewModel.deserializeDomainVersionID(obj);
                let isCustom = "customDataURL" in obj;
                if (!isCustom) {
                    if (!self.dataService.getDomain(viewModel.domainVersionID)) {
                        throw new Error(`Error: '${viewModel.domain}' (v${viewModel.version}) is an invalid domain.`);
                    }
                    self.upgradeLayer(viewModel, obj, true);
                } else {
                    // load as custom data
                    viewModel.deserialize(obj);
                    self.openTab("new layer", viewModel, true, true, true, true);
                    self.newLayerFromURL({
                        'url': obj['customDataURL'],
                        'version': viewModel.version,
                        'identifier': viewModel.domain
                    }, obj);
                }
            }

            try {
                let objList = (typeof(result) == "string") ? JSON.parse(result) : result;
                if ('length' in objList) {
                    for (let obj of objList) {
                        loadObjAsLayer(this, obj);
                    }
                } else {
                    let obj = (typeof(result) == "string") ? JSON.parse(result) : result;
                    loadObjAsLayer(this, obj);
                }
            }
            catch (err) {
                viewModel = this.viewModelsService.newViewModel("loading layer...", undefined);
                console.error("ERROR: Either the file is not JSON formatted, or the file structure is invalid.", err);
                alert("ERROR: Either the file is not JSON formatted, or the file structure is invalid.");
                this.viewModelsService.destroyViewModel(viewModel);
            }
        }
        reader.readAsText(file);
    }

    /**
     * Load layer from URL
     * @param {string} loadURL the url to load
     * @param {boolean} replace replace the current active with the loaded layer?
     * @param {boolean} defaultLayers is this loading reflecting a set of default layers (from the config file or from the query string)?
     * 
     */
    public async loadLayerFromURL(loadURL: string, replace: boolean, defaultLayers: boolean = false): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let subscription = this.http.get(loadURL).subscribe({
                next: async (res) => {
                    let viewModel = this.viewModelsService.newViewModel("loading layer...", undefined);
                    try {
                        viewModel.deserializeDomainVersionID(res);
                        if (!this.dataService.getDomain(viewModel.domainVersionID)) {
                            throw new Error(`Error: '${viewModel.domain}' (v${viewModel.version}) is an invalid domain.`);
                        }
                        await this.upgradeLayer(viewModel, res, replace, defaultLayers);
                        console.debug("loaded layer from", loadURL);
                        resolve(null); //continue
                    } catch(err) {
                        console.error(err);
                        this.viewModelsService.destroyViewModel(viewModel);
                        alert(`ERROR parsing layer from ${loadURL}, check the javascript console for more information.`);
                        resolve(null); // continue
                    }
                },
                error: (err) => {
                    console.error(err);
                    alert(`ERROR retrieving layer from ${loadURL}, check the javascript console for more information.`);
                    resolve(null); // continue
                },
                complete: () => { if (subscription) subscription.unsubscribe(); } // prevent memory leaks
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
        this.layerLinkURLs.push("");
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
        let str = window.location.href.split("#")[0];
        let join = "#"; // hash first, then ampersand
        for (let layerLinkURL of this.layerLinkURLs) {
            str += join + "layerURL=" + encodeURIComponent(layerLinkURL);
            join = "&";
        }
        for (let feature of this.customizedConfig) {
            if (feature.subfeatures) {
                for (let subfeature of feature.subfeatures) {
                    if (!subfeature.enabled) {
                        str += join + subfeature.name + "=false";
                        join = "&";
                    }
                }
            } else if (!feature.enabled) {
                str += join + feature.name + "=false";
                join = "&";
            }
        }
        return str;
    }

    /**
     * Select the layer link field text
     */
    public selectLayerLink(): void {
        let copyText = <HTMLInputElement>document.getElementById("layerLink");
        console.debug('copied', copyText.value)
        copyText.select();
    }

    /**
     * Copy the created layer link to clipboard
     */
    public copyLayerLink(): void {
        this.selectLayerLink();
        document.execCommand("Copy");
        this.copiedRecently = true;
        let self = this;
        window.setTimeout(function() {
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
    private getNamedFragmentValue(name: string, url?: string): any {
        if (!url) url = window.location.href;

        name = name.replace(/[[\]]/g, "\\$&");
        let regex = new RegExp("[#&]" + name + "(?:=([^&#]*)|&|#|$)", "g");
        
        // match as many results as exist under the name
        let results = [];
        let match = regex.exec(url);
        while (match != null) {
            results.push(decodeURIComponent(match[1].replace(/\+/g, " ")));
            match = regex.exec(url);
        }
        return results;
    }
}
