// https://embed.plnkr.co/wWKnXzpm8V31wlvu64od/
import { Component, AfterContentInit, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DataService, Technique, Version } from '../data.service'; //import the DataService component so we can use it
import { ConfigService } from '../config.service';
import * as is from 'is_js';
import { forkJoin } from 'rxjs';
import { VersionUpgradeComponent } from '../version-upgrade/version-upgrade.component';
import { HelpComponent } from '../help/help.component';
import { ExporterComponent } from '../exporter/exporter.component';
import { ViewModelsService, ViewModel } from "../viewmodels.service";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as globals from './../globals';
import { ChangelogComponent } from "../changelog/changelog.component";

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [ViewModelsService],
    encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements AfterContentInit, AfterViewInit {
    @Input() userTheme: string;
    @Output() onUserThemeChange = new EventEmitter<string>();
    //  _____ _   ___   ___ _____ _   _ ___ ___
    // |_   _/_\ | _ ) / __|_   _| | | | __| __|
    //   | |/ _ \| _ \ \__ \ | | | |_| | _|| _|
    //   |_/_/ \_\___/ |___/ |_|  \___/|_| |_|


    ds: DataService = null;
    vms: ViewModelsService = null;
    activeTab: Tab = null;
    dropdownEnabled = '';
    layerTabs: Tab[] = [];
    adjustedHeaderHeight = 0;
    techniques: Technique[] = [];

    nav_version = globals.nav_version;

    constructor(private dialog: MatDialog, private viewModelsService: ViewModelsService, private dataService: DataService, private http: HttpClient, private configService: ConfigService) {
        console.log("tabs component initializing");
        this.ds = dataService;
        this.viewModelsService = viewModelsService;
    }

    @ViewChild('safariWarning') safariWarning : TemplateRef<any>;

    ngAfterContentInit() {
        let subscription = this.ds.getConfig().subscribe({
            next: (config: Object) => {
                this.newBlankTab();
                this.loadTabs(config["default_layers"]).then( () => {
                    if (this.layerTabs.length == 0) {
                        this.newLayer(this.ds.domains[0].id); // failed load from url, so create new blank layer
                    }
                    // let activeTabs = this.layerTabs.filter((tab)=>tab.active);

                    // if there is no active tab set, activate the first
                    if(!this.activeTab) { this.selectTab(this.layerTabs[0]); }
                });
                this.customizedConfig = this.configService.getFeatureList()
                this.bannerContent = this.configService.banner;
            },
            complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
        });
    }

    public safariDialogRef;
    ngAfterViewInit() {
        if (is.safari('<=13')) {
            this.safariDialogRef = this.dialog.open(this.safariWarning, {
                width: '350px',
                disableClose: true,
                panelClass: this.userTheme
            });
        }
    }

    tabHeight = 48;
    adjustHeader(newHeight) {
        this.adjustedHeaderHeight = newHeight;
    }

    /**
     * Open initial tabs on application load
     */
     async loadTabs(defaultLayers) {
            let fragment_value = this.getNamedFragmentValue("layerURL");

            if (fragment_value && fragment_value.length > 0) {
                let first = true;
                let self = this;

                    for (var _i = 0, urls_1 = fragment_value; _i < urls_1.length; _i++) {
                        var url = urls_1[_i];
                        await self.loadLayerFromURL(url, first, true);
                        first = false;
                    }
            } else if (defaultLayers["enabled"]) {
                let first = true;
                let self = this;
                    for (let url of defaultLayers["urls"]) {
                        console.log("loading", url, first)
                        await self.loadLayerFromURL(url, first, true);
                        first = false;
                        console.log("done")
                    }
            }
    }

    /**
     * Open a new tab
     * @param  {[type]}  title               title of new tab
     * @param  {[type]}  data                data to put in template
     * @param  {Boolean} [isCloseable=false] can this tab be closed?
     * @param  {Boolean} [replace=false]     replace the current tab with the new tab, TODO
     * @param  {Boolean} [forceNew=false]    force open a new tab even if a tab of that name already exists
     * @param  {Boolean} [dataTable=false]   is this a data-table tab? if so tab text should be editable

     */
    openTab(title: string, data, isCloseable = false, replace = true, forceNew = false, dataTable = false) {
        // determine if tab is already open. If it is, just change to that tab
        if (!forceNew) {
            for (let i = 0; i < this.layerTabs.length; i++) {
                if (this.layerTabs[i].title === title) {
                    this.selectTab(this.layerTabs[i])
                    return;
                }
            }
        }

        // create a new tab
        let domain = data? data.domainVersionID : "";
        let tab = new Tab(title, isCloseable, false, domain, dataTable);
        tab.dataContext = data;

        // select new tab
        if (!replace || this.layerTabs.length === 0) {
            this.layerTabs.push(tab); //don't replace
            this.selectTab(this.layerTabs[this.layerTabs.length - 1]);
        } else {
            // find active tab index
            for (let i = 0; i < this.layerTabs.length; i++) {
                if (this.layerTabs[i] == this.activeTab) {
                    this.closeActiveTab(true) //close current and don't let it create a replacement tab
                    this.layerTabs.splice(i, 0, tab) //replace
                    this.selectTab(this.layerTabs[i]);
                    return
                }
            }
        }
        this.dropdownEnabled = '';
    }

    /**
     * Select a given tab: deselects other tabs.
     * @param  {Tab} tab tab to select
     */
    selectTab(tab: Tab){
        // deactivate all tabs
        // this.layerTabs.forEach(tab => tab.active = false);
        this.activeTab = tab;
        // activate the tab the user has clicked on.
        // tab.active = true;
        this.viewModelsService.viewModels.forEach(viewModel => {
            if (viewModel.sidebarContentType === 'search') {
                viewModel.sidebarOpened = false;
                viewModel.sidebarContentType = "";
            }
        });
    }

    /**
     * close a tab
     * @param  {Tab} tab              tab to close
     * @param  {[type]}       allowNoTab=false if true, doesn't select another tab, and won't open a new tab if there are none
     */
    closeTab(tab: Tab, allowNoTab=false) {
        let action = 0; //controls post close-tab behavior

        // destroy tab viewmodel
        this.viewModelsService.destroyViewModel(tab.dataContext);

        for(let i=0; i<this.layerTabs.length;i++) {
            if(this.layerTabs[i] === tab) { //close this tab

                if (this.layerTabs[i] == this.activeTab) { //is the tab we're closing currently open??
                    if (i == 0 && this.layerTabs.length > 1) { //closing first tab, first tab is active, and more tabs exist
                        action = 1;
                    } else if (i > 0) { //closing not first tab, implicitly more tabs exist
                        action = 2;
                    } else { //else closing first tab and no other tab exist
                        action = 3;
                    }
                }
                // remove the tab from our array
                this.layerTabs.splice(i,1);
                break;
            }
        }

        // post close-tab behavior: select new tab?
        if (!allowNoTab) {
            switch (action) {
                case 0: //should only occur if the active tab is not closed: don't select another tab
                    break;
                case 1: //closing the first tab, more exist
                    this.selectTab(this.layerTabs[0]) // select first tab
                    break;
                case 2: //closing any tab other than the first
                    this.selectTab(this.layerTabs[0]); //select first tab
                    break;
                case 3://closing first tab and no other tab exist
                    this.newBlankTab(); //make a new blank tab, automatically opens this tab
                    break;
                default: //should never occur
                    console.error("post closetab action not specified (this should never happen)")
            }
        }
    }

    /**
     * Close the currently selected tab
     * @param  {[type]} allowNoTab=false if true, doesn't select another tab, and won't open a new tab if there are none
     */
    closeActiveTab(allowNoTab=false) {
        if (this.activeTab) this.closeTab(this.activeTab, allowNoTab);
        // this.activeTab = null;
        // let activeTabs = this.layerTabs.filter((tab)=>tab.active);
        // if(activeTabs.length > 0)  {
        //     // close the 1st active tab (should only be one at a time)
        //     this.closeTab(activeTabs[0], allowNoTab);
        // }
    }

    getActiveTab() {
        return this.activeTab;
        // let activeTabs = this.layerTabs.filter((tab)=>tab.active);
        // return activeTabs[0];
    }

    handleTabClick(tab) {
        if (this.activeTab !== tab) {
            this.activeTab = tab;
            this.dropdownEnabled = '';
        }
        else this.dropdownEnabled = this.dropdownEnabled !== 'description' ? 'description' : '';
    }

    filterDomains(version: Version) {
        return this.dataService.domains.filter((d) => d.version == version)
    }

    hasFeature(featureName: string): boolean {
        return this.configService.getFeature(featureName);
    }


    //  _      ___   _____ ___   ___ _____ _   _ ___ ___
    // | |    /_\ \ / / __| _ \ / __|_   _| | | | __| __|
    // | |__ / _ \ V /| _||   / \__ \ | | | |_| | _|| _|
    // |____/_/ \_\_| |___|_|_\ |___/ |_|  \___/|_| |_|

    /**
     * open a new "blank" tab showing a new layer button and an open layer button
     * @param  {[type]} replace=false replace the current tab with this blank tab?
     */
    newBlankTab(replace=false) {
        this.openTab('new tab', null, true, replace, true, false)
    }

    showHelpDropDown: boolean = false;


    handleUserThemeChange(theme) {
      this.onUserThemeChange.emit(theme);
    }

    /**
     * open the help dialog
     */
    openDialog(dialogName: string) {
        const settings = { maxWidth: "75ch", panelClass: this.userTheme };
        if (dialogName == 'changelog') this.dialog.open(ChangelogComponent, settings);
        else if (dialogName == 'help') this.dialog.open(HelpComponent, settings);
    }

    /**
     * open the SVG exporter dialog
     * @param {ViewModel} vm    the viewModel to render
     */
    openSVGDialog(vm: ViewModel) {
        this.dialog.open(ExporterComponent,
            { data: {vm: vm},
              panelClass: ['dialog-custom', this.userTheme]
            });
    }

    /**
     * Given a unique root, returns a layer name that does not conflict any existing layers, e.g 'new layer' -> 'new layer 1'
     * @param  {string} root the root string to get the non-conflicting version of
     * @return {string}      non-conflicted version
     */
    getUniqueLayerName(root: string) {
        let conflictNumber = 0;
        let viewModels = this.viewModelsService.viewModels

        function isInteger(str) {
            var n = Math.floor(Number(str));
            return String(n) === str;
        }

        for (let i = 0; i < viewModels.length; i++) {
            if (!viewModels[i].name.startsWith(root)) continue;
            if (viewModels[i].name === root) { //case where it's "new layer" aka  "new layer 0"
                conflictNumber = Math.max(conflictNumber, 1);
                continue;
            }

            let numberPortion = viewModels[i].name.substring(root.length, viewModels[i].name.length)

            //find lowest number higher than existing number
            if (isInteger(numberPortion)) {
                conflictNumber = Math.max(conflictNumber, Number(numberPortion) + 1)
            }
        }
        // if no layers of this name exist (conflictNumber == 0) just return root
        if (conflictNumber != 0) root = root + conflictNumber
        return root;
    }

    /**
     * Open a new blank layer tab
     */
    newLayer(domainVersionID: string) {
        // load domain data, if not yet loaded
        if (!this.dataService.getDomain(domainVersionID).dataLoaded) {
            this.dataService.loadDomainData(domainVersionID, true);
        }

        // find non conflicting name
        let name = this.getUniqueLayerName("layer")

        // create and open VM
        let vm = this.viewModelsService.newViewModel(name, domainVersionID);
        vm.loadVMData();
        this.openTab(name, vm, true, true, true, true)
    }

    /**
     * Get a layer score expression variable for a tab
     * @param  index index of tab
     * @return       char expression variable
     */
    indexToChar(index: number) {
        let realIndex = 0;
        for (let i = 0; i < index; i++) {
            if (this.layerTabs[i].dataContext) realIndex++;
        }
        return String.fromCharCode(97+realIndex);
    }

    /**
     * Inverse of indextoChar, maps char to the tab it corresponds to
     * @param  char score expression variable
     * @return      tab index
     */
    charToIndex(char: string): number {
        // console.log("searching for char", char)
        let realIndex = 0;
        for (let i = 0; i < this.layerTabs.length; i++) {
            if (this.layerTabs[i].dataContext) {
                let charHere = String.fromCharCode(97+realIndex);
                realIndex++;
                if (charHere == char) return i;
            }
        }
    }

    domain: string = "";
    gradient: ViewModel = null;
    coloring: ViewModel = null;
    comments: ViewModel = null;
    links: ViewModel = null;
    metadata: ViewModel = null;
    enabledness: ViewModel = null;
    filters: ViewModel = null;
    scoreExpression: string = "";
    legendItems: ViewModel = null;
    /**
     * layer layer operation
     */
    layerByOperation(): void {
        // build score expression map, mapping inline variables to their actual VMs
        let scoreVariables = new Map<string, ViewModel>();
        let regex = /\b[a-z]\b/g //\b matches word boundary
        let matches = this.scoreExpression.match(regex);
        let self = this;
        if (matches) {
            matches.forEach(function(match) {
                // trim
                let index = self.charToIndex(match);
                let vm = self.layerTabs[index].dataContext;
                scoreVariables.set(match, vm);
            });
        }

        let layerName = this.getUniqueLayerName("layer by operation")
        try {
            // all layers must be of the same domain/version
            let vms = Array.from(scoreVariables.values());
            if(vms && !vms.every((vm) => vm.domainVersionID === vms[0].domainVersionID)) {
                throw {message: "cannot apply operations to layers of different domains"};
            }
            let vm = this.viewModelsService.layerLayerOperation(this.domain, this.scoreExpression, scoreVariables, this.comments, this.links, this.metadata, this.gradient, this.coloring, this.enabledness, layerName, this.filters, this.legendItems)
            if (!this.dataService.getDomain(this.domain).dataLoaded) {
                this.dataService.loadDomainData(this.domain, true).then( () => {
                    vm.loadVMData();
                    vm.updateGradient();
                    this.openTab(layerName, vm, true, true, true, true)
                })
            } else {
                vm.loadVMData();
                vm.updateGradient();
                this.openTab(layerName, vm, true, true, true, true)
            }
        } catch (err) {
            console.error(err)
            alert("Layer Layer operation error: " + err.message)
        }


    }

    /**
     * Retrieves a list of view models with the chosen domain
     */
    getLayers(): ViewModel[] {
        return this.viewModelsService.viewModels.filter((vm) => vm.domainVersionID == this.domain)
    }

    /**
     * Check if there's an error in the score expression (syntax, etc)
     * @return error or null if no error
     */
    getScoreExpressionError(): string {
        let self = this;
        try {
            // build fake scope
            let regex = /\b[a-z]\b/g //\b matches word boundary
            let matches = self.scoreExpression.match(regex);

            let scope = {}
            if (matches) {
                let noMatch = ""
                matches.forEach(function(match) {
                    // trim
                    scope[match] = 0;
                    // check if letter is too large
                    if (typeof(self.charToIndex(match)) == "undefined") {
                        noMatch = "Variable " + match + " does not match any layers"
                    } else if (self.domain && self.layerTabs[self.charToIndex(match)].dataContext.domainVersionID !== self.domain) {
                        noMatch = "Layer " + match + " does not match the chosen domain"
                    }
                });
                if (noMatch.length > 0) return noMatch;
            }
            return null;
        } catch(err) {
            return err.message
        }
    }

    /**
     * open upload new layer prompt
     */
    openUploadPrompt(): void {
        var input = (<HTMLInputElement>document.getElementById("uploader"));
        input.click();
    }

    /**
     * Dialog to upgrade version if layer is not the latest version
     */
    versionUpgradeDialog(viewModel): Promise<any> {
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
                            reject("Uploaded layer version (" + String(viewModel.version) + ") is not supported by Navigator v" + globals.nav_version)
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
     * check if the layer needs to be upgraded and initialize the layer upgrade process if the user accepts the resultant dialog
     * @param oldViewModel: blank viewmodel to upgrade
     * @param serialized the viewmodel's raw serialized JSON string
     * @param replace: replace if true, replace the current active tab with the layer
     * @param defaultLayers: is this a layer being loaded by default (from the config or query string)?
     *                       if so, will act as if the user decided not to upgrade the layer
     */
    layerUpgrade(oldViewModel: ViewModel, serialized: any, replace: boolean, defaultLayers: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!defaultLayers) { 
            this.versionUpgradeDialog(oldViewModel).then( (versions) => {
                    if (versions) { // user upgraded to latest version
                        // create and open the latest version
                        let newViewModel = this.viewModelsService.newViewModel("loading layer...", undefined);
                        newViewModel.name = oldViewModel.name;
                        newViewModel.domainVersionID = versions.newID; // update domainVersionID to new ID
                        newViewModel.version = this.dataService.getCurrentVersion().number; // update version to new ID
                        newViewModel.loadVMData();
                        newViewModel.compareTo = oldViewModel;
                        this.openTab("new layer", newViewModel, true, replace, true, true);
                        newViewModel.sidebarOpened = true;
                        newViewModel.sidebarContentType = 'layerUpgrade'
                        newViewModel.selectTechniquesAcrossTactics = false;
        
                        // load layer version & latest ATT&CK version
                        let loads: any = {};
                        if (!this.dataService.getDomain(versions.oldID).dataLoaded) loads.old = this.dataService.loadDomainData(versions.oldID, true);
                        if (!this.dataService.getDomain(versions.newID).dataLoaded) loads.new = this.dataService.loadDomainData(versions.newID, true);
                        if (Object.keys(loads).length) { //needs to fetch data
                            let dataSubscription = forkJoin(loads).subscribe({
                                next: () => {
                                    newViewModel.versionChangelog = this.dataService.compareVersions(versions.oldID, versions.newID);
                                    // load vm for uploaded layer
                                    oldViewModel.deSerialize(serialized);
                                    oldViewModel.loadVMData();
                                    newViewModel.initCopyAnnotations();
                                    resolve(null);
                                },
                                complete: () => { dataSubscription.unsubscribe(); }
                            });
                        } else { // did not need to fetch data
                            newViewModel.versionChangelog = this.dataService.compareVersions(versions.oldID, versions.newID);
                            // load vm for uploaded layer
                            oldViewModel.deSerialize(serialized);
                            oldViewModel.loadVMData();
                            newViewModel.initCopyAnnotations();
                            resolve(null);
                        }
                    } else { // user did not upgrade, keep the old version
                        this.openTab("new layer", oldViewModel, true, replace, true, true);
                        if (!this.dataService.getDomain(oldViewModel.domainVersionID).dataLoaded) {
                            this.dataService.loadDomainData(oldViewModel.domainVersionID, true).then( () => {
                                oldViewModel.deSerialize(serialized);
                                oldViewModel.loadVMData();
                                resolve(null);
                            });
                        } else {
                            oldViewModel.deSerialize(serialized);
                            oldViewModel.loadVMData();
                            resolve(null);
                        }
                    }
                })
                .catch( (err) => {
                    console.error(err);
                    alert("ERROR parsing file, check the javascript console for more information.");
                    resolve(null);
                });
            } else { // is a default layer, do not upgrade
                this.openTab("new layer", oldViewModel, true, replace, true, true);
                if (!this.dataService.getDomain(oldViewModel.domainVersionID).dataLoaded) {
                    this.dataService.loadDomainData(oldViewModel.domainVersionID, true).then( () => {
                        oldViewModel.deSerialize(serialized);
                        oldViewModel.loadVMData();
                        resolve(null);
                    });
                } else {
                    oldViewModel.deSerialize(serialized);
                    oldViewModel.loadVMData();
                    resolve(null);
                }
            }
        })
    }

    /**
     * Loads an existing layer into a tab
     */
    loadLayerFromFile(): void {
        var input = (<HTMLInputElement>document.getElementById("uploader"));
        if(input.files.length < 1){
            alert("You must select a file to upload!")
            return;
        }
        this.readJSONFile(input.files[0]);
    }

    /**
     * Retrieves a file from the input element,
     * reads the json,
     * and adds the properties to a new viewModel, and loads that viewmodel into a new layer.
     */
    readJSONFile(file: File) {
        // var input = (<HTMLInputElement>document.getElementById("uploader"));
        var reader = new FileReader();
        let viewModel = this.viewModelsService.newViewModel("loading layer...", undefined);

        reader.onload = (e) =>{
            var string = String(reader.result);
            try{
                viewModel.deSerializeDomainVersionID(string);
                if (!this.dataService.getDomain(viewModel.domainVersionID)) {
                    throw {message: "Error: '" + viewModel.domain + "' (v" + viewModel.version + ") is an invalid domain."};
                }
                this.layerUpgrade(viewModel, string, true);
            }
            catch(err){
                console.error("ERROR: Either the file is not JSON formatted, or the file structure is invalid.", err);
                alert("ERROR: Either the file is not JSON formatted, or the file structure is invalid.");
                this.viewModelsService.destroyViewModel(viewModel);
            }
        }
        reader.readAsText(file);
    }

    loadURL: string = "";
    /**
     * attempt an HTTP GET to loadURL, and load the response (if it exists) as a layer.
     * @param loadURL the url to load
     * @param replace replace the current active with the loaded layer?
     * @param defaultLayers is this loading reflecting a set of default layers (from the config file or from the query string)?
     * 
     */
    async loadLayerFromURL(loadURL, replace, defaultLayers = false): Promise<any> {
        return new Promise(async(resolve, reject) => {
            // if (!loadURL.startsWith("http://") && !loadURL.startsWith("https://") && !loadURL.startsWith("FTP://")) loadURL = "https://" + loadURL;
            let subscription = this.http.get(loadURL).subscribe({
                next: async (res) => {
                    let viewModel = this.viewModelsService.newViewModel("loading layer...", undefined);
                    try {
                        viewModel.deSerializeDomainVersionID(res);
                        if (!this.dataService.getDomain(viewModel.domainVersionID)) {
                            throw {message: "Error: '" + viewModel.domain + "' (v" + viewModel.version + ") is an invalid domain."};
                        }
                        await this.layerUpgrade(viewModel, res, replace, defaultLayers);
                        console.log("loaded layer from", loadURL);
                        resolve(null); //continue
                    } catch(err) {
                        console.error(err)
                        this.viewModelsService.destroyViewModel(viewModel);
                        alert("ERROR parsing layer from " + loadURL + ", check the javascript console for more information.")
                        resolve(null); //continue
                    }
                },
                error: (err) => {
                    console.error(err)
                    if (err.status == 0) {
                        // no response
                        alert("ERROR retrieving layer from " + loadURL + ", check the javascript console for more information.")
                    } else {
                        // response, but not a good one
                        alert("ERROR retrieving layer from " + loadURL + ", check the javascript console for more information.")
                    }
                    resolve(null); //continue
                },
                complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
            });
        });
    }


    //   ___ _   _ ___ _____ ___  __  __ ___ _______ ___    _  _   ___   _____ ___   _ _____ ___  ___   ___ _____ _   _ ___ ___
    //  / __| | | / __|_   _/ _ \|  \/  |_ _|_  / __|   \  | \| | /_\ \ / /_ _/ __| /_\_   _/ _ \| _ \ / __|_   _| | | | __| __|
    // | (__| |_| \__ \ | || (_) | |\/| || | / /| _|| |) | | .` |/ _ \ V / | | (_ |/ _ \| || (_) |   / \__ \ | | | |_| | _|| _|
    //  \___|\___/|___/ |_| \___/|_|  |_|___/___|___|___/  |_|\_/_/ \_\_/ |___\___/_/ \_\_| \___/|_|_\ |___/ |_|  \___/|_| |_|
    // layerLinkURL = ""; //the user inputted layer link which will get parsed into a param
    layerLinkURLs: string[] = [];
    customizedConfig = [];
    bannerContent: string;

    /**
     * Helper function to track which layerLinkURLs have been added or removed
     */
    trackByFunction(index: number, obj: any): any {
        return index;
    }

    /**
     * Add a new empty layer link to the layerLinkURLs array
     */
    addLayerLink(): void {
        this.layerLinkURLs.push("");
    }

    /**
     * Remove the given layer link URL from layerLinkURLs
     * @param {number} index the index to remove
     */
    removeLayerLink(index: number): void {
        console.log("removing index", index)
        console.log(this.layerLinkURLs);
        if (this.layerLinkURLs.length == 1) this.layerLinkURLs = [];
        else this.layerLinkURLs.splice(index, 1);
        console.log(this.layerLinkURLs);
    }

    /**
     * Convert layerLinkURL to a query string value for layerURL query string
     * @return URL such that when opened will create navigator instance with a query String
     *         specifying layerLinkURL as the URL to fetch the default layer from
     */
    getLayerLink(): string {
        // if (!this.layerLinkURL) return "";
        let str = window.location.href.split("#")[0];
        let join = "#" //hash first, then ampersand
        for (let layerLinkURL of this.layerLinkURLs) {
            str += join + "layerURL=" + encodeURIComponent(layerLinkURL)
            join = "&";
        }
        for (let i = 0; i < this.customizedConfig.length; i++) {
            if (this.customizedConfig[i].subfeatures) {
                for (let j = 0; j < this.customizedConfig[i].subfeatures.length; j++) {
                    if (!this.customizedConfig[i].subfeatures[j].enabled) {
                        str += join + this.customizedConfig[i].subfeatures[j].name + "=false"
                        join = "&";
                    }
                }
            } else {
                if (!this.customizedConfig[i].enabled) {
                    str += join + this.customizedConfig[i].name + "=false"
                    join = "&";
                }
            }
        }

        return str
    }
    /**
     * Select the layer link field text
     */
    selectLayerLink(): void {
        let copyText = <HTMLInputElement>document.getElementById("layerLink");
        console.log(copyText)
        console.log(copyText.value)
        copyText.select();
    }

    copiedRecently = false; // true if copyLayerLink has been called recently -- reverts to false after 2 seconds
    /**
     * copy the created layer link to the user's clipboard
     */
    copyLayerLink(): void {
        console.log("attempting copy")
        this.selectLayerLink();
        document.execCommand("Copy");
        this.copiedRecently = true;
        let self = this;
        window.setTimeout(function() {self.copiedRecently = false}, 2000);
    }

    /**
     * Return true if the text is only letters a-z, false otherwise
     * @param  text text to eval
     * @return      true if a-z, false otherwise
     */
    alphabetical(text: string): boolean {
        return /^[a-z]+$/.test(text);
    }

    /**
     * get a key=value fragment value by key
     * @param  {string} name name of param to get the value of
     * @param  {string} url  optional, if unspecified searches in current window location. Otherwise searches this string
     * @return {string}      fragment param value
     */
    getNamedFragmentValue(name: string, url?: string): any {

        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[#&]" + name + "(?:=([^&#]*)|&|#|$)", "g");
        //match as many results as exist under the name
        let results = [];
        let match = regex.exec(url);
        while (match != null) {
            results.push(decodeURIComponent(match[1].replace(/\+/g, " ")));
            match = regex.exec(url);
        }
        return results
    }

}

export class Tab {
    title: string;
    dataContext;
    domain: string = "";
    isDataTable: boolean;

    isCloseable: boolean = false;
    showScoreVariables: boolean = false;

    constructor(title: string, isCloseable: boolean, showScoreVariables: boolean, domain: string, dataTable: boolean) {
        this.title = title;
        this.isCloseable = isCloseable;
        this.showScoreVariables = showScoreVariables;
        this.domain = domain;
        this.isDataTable = dataTable;
    }
}
