// https://embed.plnkr.co/wWKnXzpm8V31wlvu64od/
import { Component, AfterContentInit, QueryList, ContentChildren, ViewChild, ComponentFactoryResolver } from '@angular/core';


import { DynamicTabsDirective } from './dynamic-tabs.directive';
import { TabComponent } from '../tab/tab.component';
import { DataService, Technique } from '../data.service'; //import the DataService component so we can use it
import { ConfigService } from '../config.service';
import { DataTableComponent} from '../datatable/data-table.component';
import { VersionUpgradeComponent } from '../version-upgrade/version-upgrade.component';

import { ViewModelsService, ViewModel, TechniqueVM, Gradient, Gcolor } from "../viewmodels.service";

import {ErrorStateMatcher} from '@angular/material/core'
import {FormControl} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as globals from './../globals';
import { log } from 'util';

declare var math: any; //use mathjs

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [ViewModelsService]

})
export class TabsComponent implements AfterContentInit {

    //  _____ _   ___   ___ _____ _   _ ___ ___
    // |_   _/_\ | _ ) / __|_   _| | | | __| __|
    //   | |/ _ \| _ \ \__ \ | | | |_| | _|| _|
    //   |_/_/ \_\___/ |___/ |_|  \___/|_| |_|


    // these variables refer to the templates of the same name defined in the HTML.
    // to open a tab use one of these variables as the template variable.
    @ViewChild('blankTab') blankTab;
    @ViewChild('layerTab') layerTab;
    @ViewChild('helpTab', {static: true}) helpTab;
    @ViewChild('exporterTab') exporterTab;

    ds: DataService = null;
    vms: ViewModelsService = null;
    techniques: Technique[] = [];
    alwaysUpgradeVersion: boolean;
    nav_version = globals.nav_version;
    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private dialog: MatDialog, private viewModelsService: ViewModelsService, private dataService: DataService, private http: HttpClient, public configService: ConfigService) {
        console.log("tabs component initializing");
        this.ds = dataService;
        this.viewModelsService = viewModelsService;
    }

    dynamicTabs: TabComponent[] = [];
    @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;


    ngAfterContentInit() {
        this.ds.getConfig().subscribe((config: Object) => {
            this.newBlankTab();
            this.loadTabs(config["default_layers"]).then( () => {
                if (this.dynamicTabs.length == 0) {
                    this.newLayer(this.dataService.domains[0].id); // failed load from url, so create new blank layer
                }
                let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);

                // if there is no active tab set, activate the first
                if(activeTabs.length === 0) { this.selectTab(this.dynamicTabs[0]); }
            });
            this.customizedConfig = this.configService.getFeatureList()
        });
    }

    /**
     * Open initial tabs on application load
     */
    loadTabs(defaultLayers): Promise<any> {
        let loadPromise: Promise<any> = new Promise( (resolve, reject) => {
            let fragment_value = this.getNamedFragmentValue("layerURL");
            if (fragment_value && fragment_value.length > 0) {
                let first = true;
                let self = this;
                (async function() {
                    for (var _i = 0, urls_1 = fragment_value; _i < urls_1.length; _i++) {
                        var url = urls_1[_i];
                        await self.loadLayerFromURL(url, first);
                        first = false;
                    }
                    resolve();
                })();
            } else if (defaultLayers["enabled"]) {
                let first = true;
                let self = this;
                (async function() {
                    for (let url of defaultLayers["urls"]) {
                        await self.loadLayerFromURL(url, first);
                        first = false;
                    }
                    resolve();
                })();
            }
            resolve();
        });
        return loadPromise;
    }

    /**
     * Open a new tab
     * @param  {[type]}  title               title of new tab
     * @param  {[type]}  template            template of content
     * @param  {[type]}  data                data to put in template
     * @param  {Boolean} [isCloseable=false] can this tab be closed?
     * @param  {Boolean} [replace=false]     replace the current tab with the new tab, TODO
     * @param  {Boolean} [forceNew=false]    force open a new tab even if a tab of that name already exists
     * @param  {Boolean} [dataTable=false]   is this a data-table tab? if so tab text should be editable

     */
    openTab(title: string, template, data, isCloseable = false, replace = true, forceNew = false, dataTable = false) {

        if (!template) {
            console.error("ERROR: no template defined for tab titled ''", title, "''");
        }

        // determine if tab is already open. If it is, just change to that tab
        if (!forceNew) {
            for (let i = 0; i < this.dynamicTabs.length; i++) {
                if (this.dynamicTabs[i].title === title) {
                    this.selectTab(this.dynamicTabs[i])
                    return;
                }
            }
        }

        // get a component factory for our TabComponent
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

        // fetch the view container reference from our anchor directive
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

        // alternatively...
        // let viewContainerRef = this.dynamicTabPlaceholder;

        // create a component instance
        let componentRef = viewContainerRef.createComponent(componentFactory);

        // set the according properties on our component instance
        let instance: TabComponent = componentRef.instance as TabComponent;
        instance.title = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        instance.showScoreVariables = false;
        instance.domain = data? data.domainID : "";
        instance.isDataTable = dataTable

        // remember the dynamic component for rendering the
        // tab navigation headers
        // this.dynamicTabs.push(componentRef.instance as TabComponent); //don't replace
        if (!replace || this.dynamicTabs.length === 0) {
            this.dynamicTabs.push(componentRef.instance as TabComponent); //don't replace
            this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
        } else {
            // find active tab index
            for (let i = 0; i < this.dynamicTabs.length; i++) {
                if (this.dynamicTabs[i].active) {
                    this.closeActiveTab(true) //close current and don't let it create a replacement tab
                    this.dynamicTabs.splice(i,0,componentRef.instance as TabComponent) //replace
                    this.selectTab(this.dynamicTabs[i]);
                    return
                }
            }

        }
    }

    /**
     * Select a given tab: deselects other tabs.
     * @param  {TabComponent} tab tab to select
     */
    selectTab(tab: TabComponent){
        // deactivate all tabs
        this.dynamicTabs.forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
    }

    /**
     * close a tab
     * @param  {TabComponent} tab              tab to close
     * @param  {[type]}       allowNoTab=false if true, doesn't select another tab, and won't open a new tab if there are none
     */
    closeTab(tab: TabComponent, allowNoTab=false) {
        let action = 0; //controls post close-tab behavior

        // destroy tab viewmodel
        this.viewModelsService.destroyViewModel(tab.dataContext);

        for(let i=0; i<this.dynamicTabs.length;i++) {
            if(this.dynamicTabs[i] === tab) { //close this tab

                if (this.dynamicTabs[i].active) { //is the tab we're closing currently open??
                    if (i == 0 && this.dynamicTabs.length > 1) { //closing first tab, first tab is active, and more tabs exist
                        action = 1;
                    } else if (i > 0) { //closing not first tab, implicitly more tabs exist
                        action = 2;
                    } else { //else closing first tab and no other tab exist
                        action = 3;
                    }
                }

                // remove the tab from our array
                this.dynamicTabs.splice(i,1);

                // destroy our dynamically created component again
                let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
                // let viewContainerRef = this.dynamicTabPlaceholder;
                viewContainerRef.remove(i);

                break;
            }
        }
        // post close-tab behavior: select new tab?
        if (!allowNoTab) {
            switch (action) {
                case 0: //should only occur if the active tab is not closed: don't select another tab
                    break;
                case 1: //closing the first tab, more exist
                    this.selectTab(this.dynamicTabs[0]) // select first tab
                    break;
                case 2: //closing any tab other than the first
                    this.selectTab(this.dynamicTabs[0]); //select first tab
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
        let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);
        if(activeTabs.length > 0)  {
            // close the 1st active tab (should only be one at a time)
            this.closeTab(activeTabs[0], allowNoTab);
        }
    }

    getActiveTab() {
        let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);
        return activeTabs[0];
    }

    filterDomains(version: string) {
        return this.dataService.domains.filter((d) => d.version === version)
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
        this.openTab('new tab', this.blankTab, null, true, replace, true, false)
    }

    /**
     * create a new help tab
     * @param replace=false  replace currently open tab?
     * @param forceNew=false if false, select currently open help tab if possible
     */
    newHelpTab(replace=false, forceNew=false): void {
        if (replace) this.closeActiveTab()
        this.openTab('help', this.helpTab, null, true, replace, false)
    }

    newExporterTab(vm: ViewModel) {
        this.openTab('render: ' + vm.name, this.exporterTab, vm, true, false, true)
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
    newLayer(domainID: string) {
        // load domain data, if not yet loaded
        if (!this.dataService.getDomain(domainID).dataLoaded) {
            this.dataService.loadDomainData(domainID, true);
        }

        // find non conflicting name
        let name = this.getUniqueLayerName("layer")

        // create and open VM
        let vm = this.viewModelsService.newViewModel(name, domainID);
        vm.loadVMData();
        this.openTab(name, this.layerTab, vm, true, true, true, true)
    }

    /**
     * Get a layer score expression variable for a tab
     * @param  index index of tab
     * @return       char expression variable
     */
    indexToChar(index: number) {
        let realIndex = 0;
        for (let i = 0; i < index; i++) {
            if (this.dynamicTabs[i].dataContext) realIndex++;
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
        for (let i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i].dataContext) {
                let charHere = String.fromCharCode(97+realIndex);
                // console.log(charHere, this.dynamicTabs[i].dataContext.name)
                realIndex++;
                if (charHere == char) return i;
            }
        }
    }

    domain: string = "";
    gradient: ViewModel = null;
    coloring: ViewModel = null;
    comments: ViewModel = null;
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
                // console.log(match, index)
                let vm = self.dynamicTabs[index].dataContext;
                scoreVariables.set(match, vm);
            });
        }

        let layerName = this.getUniqueLayerName("layer by operation")
        try {
            // all layers must be of the same domain/version
            let vms = Array.from(scoreVariables.values());
            if(vms && !vms.every((vm) => vm.domainID === vms[0].domainID)) {
                throw {message: "cannot apply operations to layers of different domains"};
            }
            let vm = this.viewModelsService.layerLayerOperation(this.domain, this.scoreExpression, scoreVariables, this.comments, this.gradient, this.coloring, this.enabledness, layerName, this.filters, this.legendItems)
            if (!this.dataService.getDomain(this.domain).dataLoaded) {
                this.dataService.loadDomainData(this.domain, true).then( () => {
                    vm.loadVMData();
                    vm.updateGradient();
                    this.openTab(layerName, this.layerTab, vm, true, true, true, true)
                })
            } else {
                vm.loadVMData();
                vm.updateGradient();
                this.openTab(layerName, this.layerTab, vm, true, true, true, true)
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
        return this.viewModelsService.viewModels.filter((vm) => vm.domainID == this.domain)
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
                    // console.log("chartoindex["+match+"]", self.charToIndex(match))
                    if (typeof(self.charToIndex(match)) == "undefined") {
                        noMatch = "Variable " + match + " does not match any layers"
                    } else if (self.domain && self.dynamicTabs[self.charToIndex(match)].dataContext.domainID !== self.domain) {
                        noMatch = "Layer " + match + " does not match the chosen domain"
                    }
                });
                // console.log(noMatch)
                if (noMatch.length > 0) return noMatch;
            }
            let result = math.eval(self.scoreExpression, scope)
            // console.log(result)
            return null
        } catch(err) {
            // console.log(err.message)
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
            let currVersion = this.dataService.getCurrentVersion();
            if (this.alwaysUpgradeVersion) { // remember user choice to always upgrade layer
                viewModel.version = currVersion;
                viewModel.domainID = this.dataService.getDomainID(viewModel.domain, viewModel.version);
                resolve();
            } else if (viewModel.version !== currVersion && this.alwaysUpgradeVersion == undefined) { // ask to upgrade
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.width = '25%';
                dialogConfig.data = {
                    layerName: viewModel.name,
                    vmVersion: viewModel.version,
                    currVersion: currVersion
                }
                const dialogRef = this.dialog.open(VersionUpgradeComponent, dialogConfig);
                dialogRef.afterClosed().subscribe(result => {
                    if (!result.upgrade && !this.dataService.isSupported(viewModel.version)) {
                        reject("Uploaded layer version (" + String(viewModel.version) + ") is not supported by Navigator v" + globals.nav_version)
                    }
                    if (result.dontAsk) {
                        this.alwaysUpgradeVersion = result.upgrade;
                    }
                    if (result.upgrade) {
                        viewModel.version = currVersion
                        viewModel.domainID = this.dataService.getDomainID(viewModel.domain, viewModel.version);
                    }
                    resolve();
                });
            } else { // remember user choice not to upgrade or layer is already current version
                resolve();
            }
        });
        return dataPromise;
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
                viewModel.deSerializeDomainID(string);
                if (!this.dataService.getDomain(viewModel.domainID)) {
                    throw {message: "Error: '" + viewModel.domain + "' (" + viewModel.version + ") is an invalid domain."};
                }
                this.versionUpgradeDialog(viewModel).then( () => {
                    this.openTab("new layer", this.layerTab, viewModel, true, true, true, true);
                    if (!this.dataService.getDomain(viewModel.domainID).dataLoaded) {
                        this.dataService.loadDomainData(viewModel.domainID, true).then( () => {
                            viewModel.deSerialize(string);
                            viewModel.loadVMData();
                        });
                    } else {
                        viewModel.deSerialize(string);
                        viewModel.loadVMData();
                    }
                })
                .catch( (err) => {
                    console.error(err.message);
                    alert("ERROR parsing file, check the javascript console for more information.");
                });
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
     */
    loadLayerFromURL(loadURL, replace): Promise<any> {
        let layerPromise: Promise<any> = new Promise((resolve, reject) => {
            // if (!loadURL.startsWith("http://") && !loadURL.startsWith("https://") && !loadURL.startsWith("FTP://")) loadURL = "https://" + loadURL;
            this.http.get(loadURL).subscribe((res) => {
                let viewModel = this.viewModelsService.newViewModel("loading layer...", undefined);
                try {
                    viewModel.deSerializeDomainID(res);
                    if (!this.dataService.getDomain(viewModel.domainID)) {
                        throw {message: "Error: '" + viewModel.domain + "' (" + viewModel.version + ") is an invalid domain."};
                    }
                    this.versionUpgradeDialog(viewModel).then( () => {
                        this.openTab("new layer", this.layerTab, viewModel, true, replace, true, true);
                        if (!this.dataService.getDomain(viewModel.domainID).dataLoaded) {
                            this.dataService.loadDomainData(viewModel.domainID, true).then( () => {
                                viewModel.deSerialize(res);
                                viewModel.loadVMData();
                                resolve();
                            });
                        } else {
                            viewModel.deSerialize(res);
                            viewModel.loadVMData();
                            resolve();
                        }
                    })
                    .catch( (err) => {
                        console.error(err.message);
                        alert("ERROR parsing layer from " + loadURL + ", check the javascript console for more information.");
                        resolve();
                    });
                    console.log("loaded layer from", loadURL);
                } catch(err) {
                    console.error(err)
                    this.viewModelsService.destroyViewModel(viewModel);
                    alert("ERROR parsing layer from " + loadURL + ", check the javascript console for more information.")
                    resolve(); //continue
                }
            }, (err) => {
                console.error(err)
                if (err.status == 0) {
                    // no response
                    alert("ERROR retrieving layer from " + loadURL + ", check the javascript console for more information.")
                } else {
                    // response, but not a good one
                    alert("ERROR retrieving layer from " + loadURL + ", check the javascript console for more information.")
                }
                resolve(); //continue
            });
        });
        return layerPromise;
    }


    //   ___ _   _ ___ _____ ___  __  __ ___ _______ ___    _  _   ___   _____ ___   _ _____ ___  ___   ___ _____ _   _ ___ ___
    //  / __| | | / __|_   _/ _ \|  \/  |_ _|_  / __|   \  | \| | /_\ \ / /_ _/ __| /_\_   _/ _ \| _ \ / __|_   _| | | | __| __|
    // | (__| |_| \__ \ | || (_) | |\/| || | / /| _|| |) | | .` |/ _ \ V / | | (_ |/ _ \| || (_) |   / \__ \ | | | |_| | _|| _|
    //  \___|\___/|___/ |_| \___/|_|  |_|___/___|___|___/  |_|\_/_/ \_\_/ |___\___/_/ \_\_| \___/|_|_\ |___/ |_|  \___/|_| |_|
    // layerLinkURL = ""; //the user inputted layer link which will get parsed into a param
    layerLinkURLs: string[] = [];
    customizedConfig = [];

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
