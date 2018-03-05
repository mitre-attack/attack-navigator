import { Injectable } from '@angular/core';
import { Technique } from "./data.service";

declare var tinygradient: any; //use tinygradient
// import * as tinygradient from 'tinygradient'
declare var tinycolor: any; //use tinycolor2
// import * as tinycolor from 'tinycolor2';
import * as FileSaver from 'file-saver';
declare var math: any; //use mathjs
import * as globals from './globals'; //global variables

@Injectable()
export class ViewModelsService {

    domain = "mitre-mobile";

    constructor() {

        // attempt to restore viewmodels
        // console.log(this.getCookie("viewModels"))
        // this.saveViewModelsCookies()
    }

    viewModels: ViewModel[] = [];

    /**
     * Create and return a new viewModel
     * @param {string} name the viewmodel name
     * @return {ViewModel} the created ViewModel
     */
    newViewModel(name: string) {
        let vm = new ViewModel(name, this.domain);
        this.viewModels.push(vm);
        // console.log("created new viewModel", this.viewModels)

        // this.saveViewModelsCookies()
        return vm;
    }

    /**
     * Destroy the viewmodel completely Nessecary if tab is closed!
     * @param vm viewmodel to destroy.
     */
    destroyViewModel(vm: ViewModel): void {
        for (let i = 0; i < this.viewModels.length; i++) {
            if (this.viewModels[i] == vm) {
                // console.log("destroying viewmodel", vm)
                this.viewModels.splice(i,1)
                return;
            }
        }
    }

    /**
     * Get a UID for a viewmodel at the current moment. UID can change as viewmodels are closed.
     * @param  vm viewmodel to get UID for
     * @return    uid integer
     */
    getViewModelUID(vm: ViewModel): number {
        for (let i = 0; i < this.viewModels.length; i++) {
            if (this.viewModels[i] == vm) {
                return i;
            }
        }
        return -1;
    }

    /**
     * layer combination operation
     * @param  scoreExpression math expression of score expression
     * @param  scoreVariables  variables in math expression, mapping to viewmodel they correspond to
     * @param  comments           what viewmodel to inherit comments from
     * @param  coloring           what viewmodel to inherit manual colors from
     * @param  enabledness        what viewmodel to inherit state from
     * @param  layerName          new layer name
     * @param  filters            viewmodel to inherit filters from
     * @return                    new viewmodel inheriting above properties
     */
    layerLayerOperation(scoreExpression: string, scoreVariables: Map<string, ViewModel>, comments: ViewModel, coloring: ViewModel, enabledness: ViewModel, layerName: string, filters: ViewModel): ViewModel {
        let result = new ViewModel("layer by operation", this.domain);

        if (scoreExpression) {
            scoreExpression = scoreExpression.toLowerCase() //should be enforced by input, but just in case
            //Build maps
            let index = 0;
            let indexToTechniqueVM = new Map<number, TechniqueVM>();
            let techniqueIDToIndex = new Map<string, number>();
            // assign unique integer ID to each score varaible technique
            scoreVariables.forEach(function(vm, key) {
                vm.techniqueVMs.forEach(function(tvm, key) {
                    if (!techniqueIDToIndex.has(tvm.techniqueID)) {
                        indexToTechniqueVM.set(index, tvm)
                        techniqueIDToIndex.set(tvm.techniqueID, index);
                        index += 1;
                    }
                })
                // techniqueList.forEach(function(technique) {
                //     console.log(technique)
                //     if (!techniqueIDToIndex.has(technique.technique_id)) {
                //         indexToTechnique.set(index, technique)
                //         techniqueIDToIndex.set(technique.technique_id, index);
                //         index += 1;
                //     }
                // });
            });

            // console.log(techniqueIDToIndex, indexToTechniqueVM)

            let scope = {};
            // build arrays where each index is mapped to a specific techniqueVM.
            // build scope for mathjs

            let missingTechniques = new Map<string, number>(); //count of how many viewModels are missing each technique
            let countMissingTechnique = function(techniqueID) {
                if (missingTechniques.has(techniqueID)) {
                    let value = missingTechniques.get(techniqueID)
                    value++;
                    missingTechniques.set(techniqueID, value)
                } else {
                    missingTechniques.set(techniqueID, 1)
                }
            }

            scoreVariables.forEach(function(vm, key) {
                let scoreArray = [];
                for (let i = 0; i < index; i++) {
                    let scoreValue: number;
                    // parse weird possible values. All non-numbers become 0. Count empty scores so that if all vms have no score it can omit them
                    if (!vm.hasTechniqueVM(indexToTechniqueVM.get(i).techniqueID)) {
                        scoreValue = 0;
                        // console.log(vm, "doesn't have TVM", indexToTechniqueVM.get(i));
                        countMissingTechnique(indexToTechniqueVM.get(i).techniqueID);
                    } else {
                        let storedValue = vm.getTechniqueVM(indexToTechniqueVM.get(i).techniqueID).score;
                        if (storedValue == "") {
                            // console.log("empty score",  indexToTechniqueVM.get(i))
                            scoreValue = 0;
                            countMissingTechnique(indexToTechniqueVM.get(i).techniqueID);
                        } else if (isNaN(Number(storedValue))) {
                            // console.log("NaN score:", storedValue, indexToTechniqueVM.get(i))
                            scoreValue = 0;
                            countMissingTechnique(indexToTechniqueVM.get(i).techniqueID);
                        } else {
                            scoreValue = Number(storedValue);
                        }
                    }
                    scoreArray[i] = scoreValue;
                }
                scope[key] = scoreArray;
            });

            // console.log(scoreExpression, scope)

            //evaluate math
            let mathResult = math.eval(scoreExpression, scope);

            // console.log(scoreExpression, "(",scoreVariables,")", "->", scope, "->", mathResult)
            if (! (typeof(mathResult) === "number")) { //had defined variables, applies uniqely to tvms
                // console.log("matrix result")
                // assign the reult to new viewmodel
                for (let i = 0; i < mathResult.length; i++) {
                    let techniqueVM = indexToTechniqueVM.get(i);
                    let vm = new TechniqueVM(techniqueVM.techniqueID);
                    if (typeof(mathResult[i]) === "boolean") {
                        mathResult[i] = mathResult[i] ? "1" : "0"; //parse booleans to binary
                        result.gradient.maxValue = 1;
                        result.gradient.minValue = 0;
                        result.gradient.setGradientPreset("whiteblue");
                    }
                    vm.score = String(mathResult[i])

                    result.setTechniqueVM(vm)
                }
            } else { //evaulated to single number: apply number to all tvms
                if (typeof(mathResult) === "boolean") {
                    mathResult = mathResult ? "1" : "0";  //parse booleans to binary
                    result.gradient.maxValue = 1;
                    result.gradient.minValue = 0;
                    result.gradient.setGradientPreset("whiteblue");
                }
                // console.log("non-matrix result")
                indexToTechniqueVM.forEach(function(tvm, index) {
                    let new_tvm = new TechniqueVM(tvm.techniqueID);
                    new_tvm.score = mathResult;
                    result.setTechniqueVM(new_tvm);

                })
            }

            missingTechniques.forEach(function(count, techniqueID) {
                // console.log(result.getTechniqueVM(techniqueID).techniqueName, count)
                if (count == scoreVariables.size) {
                    // enough misses that this technique had no score in any viewmodels
                    result.getTechniqueVM(techniqueID).score = "";
                }
            })
        }


        /**
         * Inherit a field from a vm
         * @param  {ViewModel} inherit_vm the viewModel to inherit from
         * @param  {string}    fieldname  the field to inherit from the viewmodel
         */
        function inherit(inherit_vm: ViewModel, fieldname: string) {
            // console.log("inherit", fieldname)
            inherit_vm.techniqueVMs.forEach(function(inherit_TVM) {
                let tvm = result.hasTechniqueVM(inherit_TVM.techniqueID) ? result.getTechniqueVM(inherit_TVM.techniqueID) : new TechniqueVM(inherit_TVM.techniqueID)
                tvm[fieldname] = inherit_TVM[fieldname];
                // console.log(inherit_TVM.techniqueName, "->", tvm)
                result.techniqueVMs.set(inherit_TVM.techniqueID, tvm);
            })
        }

        if (comments)    inherit(comments, "comment")
        if (coloring)    inherit(coloring, "color")
        if (enabledness) inherit(enabledness, "enabled")

        if (filters) { //copy filter settings
            result.filters = JSON.parse(JSON.stringify(filters.filters))
        }

        result.name = layerName;
        // console.log(result)
        this.viewModels.push(result)
        result.updateGradient();
        return result;
    } //end layer layer operation
}



/**
 * Gradient class used by viewmodels
 */
export class Gradient {
    //official colors used in gradients:
    labelToColor: object = {white: "#ffffff", red: "#ff6666", orange: "#ffaf66", yellow: "#ffe766", green: "#8ec843", blue: "#66b1ff", purple: "#ff66f4"};

    colors: Gcolor[] = [new Gcolor("red"), new Gcolor("green")]; //current colors
    options: string[] = ["white", "red", "orange", "yellow", "green", "blue", "purple"]; //possible colors
    minValue: number = 0;
    maxValue: number = 100;
    gradient: any;
    gradientRGB: any;

    /**
     * Create a string version of this gradient
     * @return string version of gradient
     */
    serialize(): string {
        let colorList: string[] = [];
        let self = this;
        this.colors.forEach(function(gColor: Gcolor) {
            let hexstring = (gColor.color in self.labelToColor) ? self.labelToColor[gColor.color] : tinycolor(gColor.color).toHexString()
            colorList.push(hexstring)
        });

        let rep = {
                "colors": colorList,
                "minValue": this.minValue,
                "maxValue": this.maxValue,
              }
        return JSON.stringify(rep, null, "\t")
    }

    /**
     * Restore this gradient from the given serialized representation
     * @param  rep serialized gradient
     */
    deSerialize(rep: string): void {
        let obj = JSON.parse(rep)
        let isColorStringArray = function(check): boolean {
            for (let i = 0; i < check.length; i++) {
                if (typeof(check[i]) !== "string" || !tinycolor(check[i]).isValid()) {
                    console.error("TypeError:", check[i], "(",typeof(check[i]),")", "is not a color-string")
                    return false;
                }
            }
            return true;
        }


        if (isColorStringArray(obj.colors)) {
            this.colors = []
            let self = this;
            obj.colors.forEach(function(hex: string) {
                self.colors.push(new Gcolor(hex));
            });
        } else console.error("TypeError: gradient colors field is not a color-string[]")
        this.minValue = obj.minValue;
        this.maxValue = obj.maxValue;
        this.updateGradient();
    }

    //presets in dropdown menu
    presets = {
        redgreen: [new Gcolor("red"), new Gcolor("yellow"), new Gcolor("green")],
        greenred: [new Gcolor("green"), new Gcolor("yellow"), new Gcolor("red")],
        bluered: [new Gcolor("blue"), new Gcolor("purple"), new Gcolor("red")],
        redblue: [new Gcolor("red"), new Gcolor("purple"), new Gcolor("blue")],
        whiteblue: [new Gcolor("white"), new Gcolor("blue")],
        whitered: [new Gcolor("white"), new Gcolor("red")]
    }

    /**
     * Convert a preset to tinycolor array
     * @param  preset preset name from preset array
     * @return        [description]
     */
    presetToTinyColor(preset) {
        let colorarray = []
        let self = this;
        this.presets[preset].forEach(function(gcolor: Gcolor) {
            colorarray.push(self.labelToColor[gcolor.color]);
        });
        return tinygradient(colorarray).css('linear', 'to right');
    }

    constructor() { this.setGradientPreset('redgreen'); }

    /**
     * set this gradient to use the preset
     * @param  preset preset to use
     */
    setGradientPreset(preset: string): void {
        this.colors = this.presets[preset];
        this.updateGradient();
    }

    /**
     * recompute gradient
     */
    updateGradient(): void {
        // console.log("update gradient")
        let colorarray = [];
        let self = this;
        this.colors.forEach(function(colorobj) {
            // figure out what kind of color this is
            // let format = tinycolor(colorobj.color).getFormat();
            // if (format == "name" && colorobj.color in self.labelToColor)
            if (colorobj.color in self.labelToColor) colorarray.push(self.labelToColor[colorobj.color])
            else colorarray.push(colorobj.color)
        });
        this.gradient = tinygradient(colorarray);
        this.gradientRGB = this.gradient.rgb(100);
    }

    /**
     * Add a color to the end of the gradient
     */
    addColor(): void {
        this.colors.push(new Gcolor(this.colors[this.colors.length - 1].color));
    }

    /**
     * Remove color at the given index
     * @param index index to remove color at
     */
    removeColor(index): void {
        this.colors.splice(index, 1)
    }

    // get the gradient color for a given value in the scale. Value is string format number
    getColor(valueString: string) {
        if (!this.gradient) this.updateGradient();

        let value: number;
        if (valueString.length == 0) return;
        else value = Number(valueString);

        if (value >= this.maxValue) { return this.gradientRGB[this.gradientRGB.length - 1]; }
        if (value <= this.minValue) { return this.gradientRGB[0]; }
        let index = (value - this.minValue)/(this.maxValue - this.minValue) * 100;
        // console.log(value, "->", index)
        return this.gradientRGB[Math.round(index)];
    }
}
//a color in the gradient
export class Gcolor {color: string; constructor(color: string) {this.color = color}};

//semi-synonymous with "layer"
export class ViewModel {
    constructor(name: string, domain: string) {
        this.domain = domain;
        // console.log("INITIALIZING VIEW MODEL FOR DOMAIN: " + this.domain);
        this.filters = new Filter(this.domain);
        this.name = name;
    }
    // PROPERTIES & DEFAULTS

    name: string; // layer name
    domain: string; //layer domain, TODO
    description: string = ""; //layer description

    filters: Filter;

    /*
     * sorting int meanings (see data-table.filterTechniques()):
     * 0: ascending alphabetically
     * 1: descending alphabetically
     * 2: ascending numerically
     * 3: descending numerically
     */
    sorting: number = 0;
    viewFullTable: boolean = true;

    hideDisabled: boolean = false; //are disabled techniques hidden?

    highlightedTactic: string = "";
    highlightedTechnique: Technique = null;

    gradient: Gradient = new Gradient(); //gradient for scores

     //  _____ ___ ___ _  _ _  _ ___ ___  _   _ ___     _   ___ ___
     // |_   _| __/ __| || | \| |_ _/ _ \| | | | __|   /_\ | _ \_ _|
     //   | | | _| (__| __ | .` || | (_) | |_| | _|   / _ \|  _/| |
     //   |_| |___\___|_||_|_|\_|___\__\_\\___/|___| /_/ \_\_| |___|

    techniqueVMs: Map<string, TechniqueVM> = new Map<string, TechniqueVM>(); //configuration for each technique
    // Getter
    getTechniqueVM(techniqueID: string): TechniqueVM {
        return this.techniqueVMs.get(techniqueID)
    }
    // Setter
    setTechniqueVM(techniqueVM: TechniqueVM): void {
        if (this.techniqueVMs.has(techniqueVM.techniqueID)) this.techniqueVMs.delete(techniqueVM.techniqueID)
        this.techniqueVMs.set(techniqueVM.techniqueID, techniqueVM);
    }
    //checker
    hasTechniqueVM(techniqueID: string): boolean {
        return this.techniqueVMs.has(techniqueID)
    }

    //  ___ ___ ___ _____ ___ _  _  ___     _   ___ ___
    // | __|   \_ _|_   _|_ _| \| |/ __|   /_\ | _ \_ _|
    // | _|| |) | |  | |  | || .` | (_ |  / _ \|  _/| |
    // |___|___/___| |_| |___|_|\_|\___| /_/ \_\_| |___|

    selectedTechniques: string[] = []; //technique_id array of selected techniques

    /**
     * Add a technique to the current selection
     * @param {Technique} technique technique to add
     */
    addToTechniqueSelection(technique: Technique): void {
        if (!this.isTechniqueSelected(technique)) this.selectedTechniques.push(technique.technique_id)
    }

    /**
     * Add a technique to the current selection
     * @param {string} techniqueID techniqueID of technique to add
     */
    addToTechniqueSelection_id(techniqueID: string): void {
        if (!this.isTechniqueSelected_id(techniqueID)) this.selectedTechniques.push(techniqueID)
    }

    /**
     * Remove the technique from the current selection
     * @param {Technique} technique technique to remove
     */
    removeFromTechniqueSelection(technique: Technique): void {
        if (this.isTechniqueSelected(technique)) {
            let index = this.selectedTechniques.indexOf(technique.technique_id)
            this.selectedTechniques.splice(index, 1);
        }
    }

    /**
     * Remove the technique from the current selection
     * @param {Technique} technique techniqueID of technique to remove
     */
    removeFromTechniqueSelection_id(techniqueID: string): void {
        if (this.isTechniqueSelected_id(techniqueID)) {
            let index = this.selectedTechniques.indexOf(techniqueID)
            this.selectedTechniques.splice(index, 1);
        }
    }

    /**
     * Replace the current selection of techniques with the given technique
     * @param {Technique} technique technique to replace selection with
     */
    replaceTechniqueSelection(technique: Technique): void {
        this.selectedTechniques = [technique.technique_id]
    }

    /**
     * Unselect all techniques
     */
    clearTechniqueSelection(): void {
        this.selectedTechniques = []
    }

    /**
     * Select all techniques
     */
    selectAllTechniques(): void {
        this.clearTechniqueSelection()
        this.invertSelection();
        // console.log(self.selectedTechniques)
    }

    /**
     * Set all selected techniques to deselected, and select all techniques not currently selected
     */
    invertSelection(): void {
        let backup_selected = JSON.parse(JSON.stringify(this.selectedTechniques)) // deep copy
        let self = this;
        this.clearTechniqueSelection()
        this.techniqueVMs.forEach(function(tvm, key) {
            if (!backup_selected.includes(tvm.techniqueID)) self.selectedTechniques.push(tvm.techniqueID)
        });
    }

    /**
     * are all techniques currently being edited?
     * @return [description]
     */
    isEditingAllTechniques(): boolean {
        let backup_selected = JSON.stringify(this.selectedTechniques) // deep copy
        this.selectAllTechniques();
        let all = JSON.stringify(this.selectedTechniques) // deep copy
        this.selectedTechniques = JSON.parse(backup_selected);
        return backup_selected == all;
    }

    /**
     * Return true if the given technique is selected, false otherwise
     * @param  {[type]}  technique the technique to check
     * @return {boolean}           true if selected, false otherwise
     */
    isTechniqueSelected(technique): boolean {
        return this.selectedTechniques.includes(technique.technique_id)
    }

    /**
     * Return true if the given technique is selected, false otherwise
     * @param  {string}  techniqueID the techniqueID to check
     * @return {boolean}           true if selected, false otherwise
     */
    isTechniqueSelected_id(techniqueID: string): boolean {
        return this.selectedTechniques.includes(techniqueID)
    }

    /**
     * return the number of selected techniques
     * @return {number} the number of selected techniques
     */
    getSelectedTechniqueCount(): number {
        return this.selectedTechniques.length;
    }

    /**
     * Return true if currently editing any techniques, false otherwise
     * @return {boolean} true if currently editing any techniques, false otherwise
     */
    isCurrentlyEditing(): boolean {
        return this.getSelectedTechniqueCount() > 0;
    }

    /**
     * edit the selected techniques
     * @param {string} field the field to edit
     * @param {any}    value the value to place in the field
     */
    editSelectedTechniques(field: string, value: any): void {
        for (let i = 0; i < this.selectedTechniques.length; i++) {
            let tvm = this.getTechniqueVM(this.selectedTechniques[i]);
            tvm[field] = value;
        }
    }

    /**
     * Get get a common value from the selected techniques
     * @param  field the field to get the common value from
     * @return       the value of the field if all selected techniques have the same value, otherwise ""
     */
    getEditingCommonValue(field: string): any {
        if (!this.isCurrentlyEditing()) return "";
        let commonValue = this.getTechniqueVM(this.selectedTechniques[0])[field];
        for (let i = 1; i < this.selectedTechniques.length; i++) {
            if (this.getTechniqueVM(this.selectedTechniques[i])[field] != commonValue) return ""
        }

        return commonValue;
    }



    //  ___ ___ ___ ___   _   _    ___ ____  _ _____ ___ ___  _  _
    // / __| __| _ \_ _| /_\ | |  |_ _|_  / /_\_   _|_ _/ _ \| \| |
    // \__ \ _||   /| | / _ \| |__ | | / / / _ \| |  | | (_) | .` |
    // |___/___|_|_\___/_/ \_\____|___/___/_/ \_\_| |___\___/|_|\_|

    /**
     * stringify this vm
     * @return string representation
     */
    serialize(): string {
        let modifiedTechniqueVMs = []
        let self = this;
        this.techniqueVMs.forEach(function(value,key) {
            if (value.modified()) modifiedTechniqueVMs.push(JSON.parse(value.serialize())) //only save techniqueVMs which have been modified
        })
        let rep: {[k: string]: any } = {};
        rep.name = this.name;
        rep.version = String(globals.layer_version);
        rep.domain = this.domain

        rep.description = this.description;
        rep.filters = JSON.parse(this.filters.serialize());
        rep.sorting = this.sorting;
        rep.viewFullTable = this.viewFullTable;
        rep.hideDisabled = this.hideDisabled;
        rep.techniques = modifiedTechniqueVMs;
        rep.gradient = JSON.parse(this.gradient.serialize());
        return JSON.stringify(rep, null, "\t");
    }

    /**
     * restore this vm from a string
     * @param  rep string to restore from
     */
    deSerialize(rep: string): void {
        let obj = JSON.parse(rep)
        this.name = obj.name
        this.domain = obj.domain;
        if ("description" in obj) {
            if (typeof(obj.description) === "string") this.description = obj.description;
            else console.error("TypeError: description field is not a string")
        }
        if ("filters" in obj) { this.filters.deSerialize(obj.filters); }
        if ("sorting" in obj) {
            if (typeof(obj.sorting) === "number") this.sorting = obj.sorting;
            else console.error("TypeError: sorting field is not a number")
        }
        if ("viewFullTable" in obj) {
            if (typeof(obj.viewFullTable) === "boolean") this.viewFullTable = obj.viewFullTable;
            else console.error("TypeError: viewFullTable field is not a boolean")
        }
        if ("hideDisabled" in obj) {
            if (typeof(obj.hideDisabled) === "boolean") this.hideDisabled = obj.hideDisabled;
            else console.error("TypeError: hideDisabled field is not a boolean")
        }

        if ("gradient" in obj) {
            this.gradient = new Gradient();
            this.gradient.deSerialize(JSON.stringify(obj.gradient))
        }

        if ("techniques" in obj) {
            for (let i = 0; i < obj.techniques.length; i++) {
                let tvm = new TechniqueVM("");
                tvm.deSerialize(JSON.stringify(obj.techniques[i]))
                // console.log("deserialized", tvm)
                this.setTechniqueVM(tvm)
            }
        }

        // console.log("finished deserializing", this)
        this.updateGradient();
    }

    /**
     * Add a color to the end of the gradient
     */
    addGradientColor(): void {
        this.gradient.addColor();
        this.updateGradient();
    }

    /**
     * Remove color at the given index
     * @param index index to remove color at
     */
    removeGradientColor(index: number): void {
        this.gradient.removeColor(index)
        this.updateGradient();
    }

    /**
     * Update this vm's gradient
     */
    updateGradient(): void {
        this.gradient.updateGradient();
        let self = this;
        this.techniqueVMs.forEach(function(tvm, key) {
            tvm.scoreColor = self.gradient.getColor(tvm.score);
        });
    }


}

// the viewmodel for a specific technique
export class TechniqueVM {
    techniqueID: string;

    score: string = "";
    scoreColor: any; //color for score gradient

    color: string = ""; //manually assigned color-class name
    enabled: boolean = true;
    comment: string = ""

    //print this object to the console
    print(): void {
        console.log(this.serialize())
        console.log(this)
    }

    /**
     * Has this TechniqueVM been modified from its initialized state?
     * @return true if it has been modified, false otherwise
     */
    modified(): boolean {
        return (this.score != "" || this.color != "" || !this.enabled || this.comment != "");
    }

    /**
     * Convert to string representation
     * @return string representation
     */
    serialize(): string {
        let rep: {[k: string]: any } = {};
        rep.techniqueID = this.techniqueID;
        if (this.score !== "" && !(isNaN(Number(this.score)))) rep.score = Number(this.score);
        rep.color = this.color;
        rep.comment = this.comment;
        rep.enabled = this.enabled;

        return JSON.stringify(rep, null, "\t")
    }

    /**
     * Restore this technique from serialized technique
     * @param rep serialized technique string
     */
    deSerialize(rep: string): void {
        let obj = JSON.parse(rep);
        if ("techniqueID" in obj) this.techniqueID = obj.techniqueID;
        else console.error("ERROR: TechniqueID field not present in technique")
        if ("comment" in obj) {
            if (typeof(obj.comment) === "string") this.comment = obj.comment;
            else console.error("TypeError: technique comment field is not a number:", obj.comment, "(",typeof(obj.comment),")")
        }
        if ("color" in obj && obj.color !== "") {
            if (typeof(obj.color) === "string" && tinycolor(obj.color).isValid()) this.color = obj.color;
            else console.error("TypeError: technique color field is not a color-string:", obj.color, "(", typeof(obj.color),")")
        }
        if ("score" in obj) {
            if (typeof(obj.score) === "number") this.score = String(obj.score);
            else console.error("TypeError: technique score field is not a number:", obj.score, "(", typeof(obj.score), ")")
        }
        if ("enabled" in obj) {
            if (typeof(obj.enabled) === "boolean") this.enabled = obj.enabled;
            else console.error("TypeError: technique enabled field is not a boolean:", obj.enabled, "(", typeof(obj.enabled), ")");
        }
    }

    constructor(techniqueID: string) {this.techniqueID = techniqueID}
}

// the data for a specific filter
export class Filter {
    stages: {
        options: string[]
        selection: string[]
    }
    platforms: {
        options: string[]
        selection: string[]
    }
    constructor(domain) {
        this.stages = {options: ["prepare", "act"], selection: ["act"]}
        // this.stages.selection = ["act"];
        // this.stages.options = ["prepare", "act"];
        if (domain == "mitre-enterprise") {
            this.platforms = {selection: ["windows", "linux", "mac"], options: ["windows", "linux", "mac"]}
        } else if (domain == "mitre-mobile") {
            this.platforms = {selection: ["android", "ios"], options: ["android", "ios"]}

        }
    }

    toggleInFilter(filterName, value): void {
        if (!this[filterName].options.includes(value)) { console.log("not a valid option to toggle", value, this[filterName]); return }
        if (this[filterName].selection.includes(value)) {
            let index = this[filterName].selection.indexOf(value)
            this[filterName].selection.splice(index, 1);
        } else {
            this[filterName].selection.push(value);
        }
    }

    inFilter(filterName, value): boolean {
        return this[filterName].selection.includes(value)
    }

    /**
     * Return the string representation of this filter
     * @return [description]
     */
    serialize(): string {
        return JSON.stringify({"stages": this.stages.selection, "platforms": this.platforms.selection})
    }

    /**
     * Replace the properties of this object with those of the given serialized filter
     * @param rep filter object
     */
    deSerialize(rep: any): void {
        // console.log(rep)
        let isStringArray = function(check): boolean {
            for (let i = 0; i < check.length; i++) {
                if (typeof(check[i]) !== "string") {
                    console.error("TypeError:", check[i], "(",typeof(check[i]),")", "is not a string")
                    return false;
                }

            }
            return true;
        }
        // let obj = JSON.parse(rep);
        if (rep.platforms) {
            if (isStringArray(rep.platforms)) this.platforms.selection = rep.platforms
            else console.error("TypeError: filter platforms field is not a string[]");
        }
        if (rep.stages) {
            if (isStringArray(rep.stages)) this.stages.selection = rep.stages
            else console.error("TypeError: filter stages field is not a string[]");

        }
    }
}
