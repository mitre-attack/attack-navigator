import { DataService } from '../services/data.service';
import { Filter } from './filter';
import { Gradient } from './gradient';
import { LayoutOptions } from './layout-options';
import { Link } from './link';
import { Metadata } from './metadata';
import { Technique, Tactic, Matrix } from './stix';
import { TechniqueVM } from './technique-vm';
import { VersionChangelog } from './version-changelog';
import * as globals from '../utils/globals';
import tinycolor from 'tinycolor2';

export class ViewModel {
    public name: string; // layer name
    public domain: string = ''; // attack domain
    public version: string = ''; // attack version
    public domainVersionID: string; // layer domain & version
    public description: string = ''; // layer description
    public uid: string; // unique identifier for this ViewModel
    public bundleURL: string; // the STIX bundle URL that a custom layer was loaded from
    public loaded: boolean = false; // whether or not techniqueVMs are loaded

    public techniqueVMs: Map<string, TechniqueVM> = new Map<string, TechniqueVM>(); // configuration for each technique
    public selectedTechniques: Set<string> = new Set<string>(); // currently selected techniques (technique_tactic_id)
    public activeTvm: TechniqueVM; // first selected techniqueVM

    private linkMismatches: string[] = []; // subsequent selected technique_tactic_ids that do not have matching links
    public get linksMatch(): boolean {
        return !this.linkMismatches.length;
    }
    private metadataMismatches: string[] = []; // subsequent selected technique_tactic_ids that do not have matching metadata
    public get metadataMatch(): boolean {
        return !this.metadataMismatches.length;
    }

    public highlightedTactic: Tactic = null;
    public highlightedTechniques: Set<string> = new Set<string>();
    public highlightedTechnique: Technique = null; // the Technique that was actually moused over

    public filters: Filter;
    public layout: LayoutOptions = new LayoutOptions();
    public hideDisabled: boolean = false; // are disabled techniques hidden?
    public showTacticRowBackground: boolean = false;
    public tacticRowBackground: string = '#dddddd';
    public stickyToolbar = true;

    public gradient: Gradient = new Gradient(); // scoring gradient
    public legendItems: any[] = [];
    public backgroundPresets: string[] = [
        '#e60d0d',
        '#fc3b3b',
        '#fc6b6b',
        '#fca2a2',
        '#e6550d',
        '#fd8d3c',
        '#fdae6b',
        '#fdd0a2',
        '#e6d60d',
        '#fce93b',
        '#fcf26b',
        '#fcf3a2',
        '#31a354',
        '#74c476',
        '#a1d99b',
        '#c7e9c0',
        '#3182bd',
        '#6baed6',
        '#9ecae1',
        '#c6dbef',
        '#756bb1',
        '#9e9ac8',
        '#bcbddc',
        '#dadaeb',
        '#636363',
        '#969696',
        '#bdbdbd',
        '#d9d9d9',
    ];
    public legendColorPresets: string[] = [];
    public initializeScoresTo = ''; // value to initialize scores to

    public metadata: Metadata[] = [];
    public links: Link[] = [];
    public technique_show_subtechnique = false;

    /*
     * 0: ascending alphabetically
     * 1: descending alphabetically
     * 2: ascending numerically
     * 3: descending numerically
     */
    public sorting: number = 0;

    public selectTechniquesAcrossTactics: boolean = true;
    public selectSubtechniquesWithParent: boolean = false;
    public selectVisibleTechniques: boolean = false;

    public compareTo?: ViewModel;
    public versionChangelog?: VersionChangelog;

    private _sidebarOpened: boolean;
    public get sidebarOpened(): boolean {
        return this._sidebarOpened;
    }
    public set sidebarOpened(newVal: boolean) {
        this._sidebarOpened = newVal;
    }

    public readonly sidebarContentTypes = ['layerUpgrade', 'search', 'layerSettings'];
    private _sidebarContentType: string;
    public get sidebarContentType(): string {
        return this._sidebarContentType;
    }
    public set sidebarContentType(newVal: string) {
        if (this.sidebarContentTypes.includes(newVal)) this._sidebarContentType = newVal;
        else this._sidebarContentType = '';
    }

    constructor(
        name: string,
        uid: string,
        domainVersionID: string,
        public dataService: DataService
    ) {
        console.debug("initializing ViewModel '" + name + "'");
        this.domainVersionID = domainVersionID;
        this.filters = new Filter();
        this.name = name;
        this.uid = uid;
        this.legendColorPresets = this.backgroundPresets;
    }

    public openSidebar(contentType: string) {
        this.sidebarContentType = contentType;
        this.sidebarOpened = true;
    }

    public loadVMData(): void {
        let domain = this.dataService.getDomain(this.domainVersionID);
        if (domain.isCustom) {
            this.bundleURL = domain.urls[0];
        }

        if (!this.domainVersionID || !domain.dataLoaded) {
            let self = this;
            this.dataService.onDataLoad(this.domainVersionID, function () {
                self.initTechniqueVMs();
                self.filters.initPlatformOptions(self.dataService.getDomain(self.domainVersionID));
            });
        } else {
            this.initTechniqueVMs();
            this.filters.initPlatformOptions(domain);
        }
        this.loaded = true;
    }

    private initTechniqueVMs(): void {
        for (let technique of this.dataService.getDomain(this.domainVersionID).techniques) {
            // init techniques
            for (let id of technique.get_all_technique_tactic_ids()) {
                let techniqueVM = new TechniqueVM(id);
                techniqueVM.score = this.initializeScoresTo;
                this.setTechniqueVM(techniqueVM, false);
            }

            // init sub-techniques
            for (let subtechnique of technique.subtechniques) {
                for (let id of subtechnique.get_all_technique_tactic_ids()) {
                    let techniqueVM = new TechniqueVM(id);
                    techniqueVM.score = this.initializeScoresTo;
                    this.setTechniqueVM(techniqueVM, false);
                }
            }
        }
        // display annotated subtechniques if "annotated" option is selected
        if (this.layout.expandedSubtechniques == 'annotated') {
            for (let technique of this.dataService.getDomain(this.domainVersionID).techniques) {
                if (technique.subtechniques.length > 0) {
                    for (let id of technique.get_all_technique_tactic_ids()) {
                        let tvm = this.getTechniqueVM_id(id);
                        for (let subtechnique of technique.subtechniques) {
                            tvm.showSubtechniques =
                                tvm.showSubtechniques ||
                                subtechnique.get_all_technique_tactic_ids().some((sid) => {
                                    let svm = this.getTechniqueVM_id(sid);
                                    return svm.annotated();
                                });
                        }
                    }
                }
            }
        }
        // display all subtechniques if "all" option is selected
        else if (this.layout.expandedSubtechniques == 'all') {
            for (let technique of this.dataService.getDomain(this.domainVersionID).techniques) {
                if (technique.subtechniques.length > 0) {
                    for (let id of technique.get_all_technique_tactic_ids()) {
                        let tvm = this.getTechniqueVM_id(id);
                        tvm.showSubtechniques = true;
                    }
                }
            }
        } else {
            for (let technique of this.dataService.getDomain(this.domainVersionID).techniques) {
                if (technique.subtechniques.length > 0) {
                    for (let id of technique.get_all_technique_tactic_ids()) {
                        let tvm = this.getTechniqueVM_id(id);
                        if (tvm.showSubtechniques) {
                            this.technique_show_subtechnique = true;
                            break;
                        }
                    }
                }
            }
            if (this.layout.expandedSubtechniques == 'none' && !this.technique_show_subtechnique) {
                this.techniqueVMs.forEach(function (tvm) {
                    tvm.showSubtechniques = false;
                });
            }
        }
        // display none of the subtechniques if "none" option is selected
    }

    public getTechniqueVM(technique: Technique, tactic: Tactic): TechniqueVM {
        if (!this.hasTechniqueVM(technique, tactic)) {
            throw Error('technique VM not found: ' + technique.attackID + ', ' + tactic.attackID);
        }
        return this.techniqueVMs.get(technique.get_technique_tactic_id(tactic));
    }

    public getTechniqueVM_id(technique_tactic_id: string): TechniqueVM {
        if (!this.hasTechniqueVM_id(technique_tactic_id)) {
            throw Error('technique VM not found: ' + technique_tactic_id);
        }
        return this.techniqueVMs.get(technique_tactic_id);
    }

    /**
     * setter
     * @param {techniqueVM} techniqueVM: the techniqueVM to set
     * @param {boolean} overwrite (default true) if true, overwrite existing techniqueVMs under that ID.
     */
    public setTechniqueVM(techniqueVM: TechniqueVM, overwrite = true): void {
        if (this.techniqueVMs.has(techniqueVM.technique_tactic_union_id)) {
            if (overwrite) this.techniqueVMs.delete(techniqueVM.technique_tactic_union_id);
            else return;
        }
        this.techniqueVMs.set(techniqueVM.technique_tactic_union_id, techniqueVM);
    }

    public hasTechniqueVM(technique: Technique, tactic: Tactic): boolean {
        return this.techniqueVMs.has(technique.get_technique_tactic_id(tactic));
    }

    public hasTechniqueVM_id(technique_tactic_id: string): boolean {
        return this.techniqueVMs.has(technique_tactic_id);
    }

    /**
     * Highlight the given technique under the given tactic
     * @param {Technique} technique to highlight
     * @param {Tactic} tactic wherein the technique occurs
     */
    public highlightTechnique(technique: Technique, tactic?: Tactic | null): void {
        if (this.selectSubtechniquesWithParent && technique.isSubtechnique) this.highlightedTechniques.add(technique.parent.id);
        this.highlightedTechnique = technique;
        this.highlightedTechniques.add(technique.id);
        this.highlightedTactic = tactic;
    }

    /**
     * Clear the technique highlight
     */
    public clearHighlight(): void {
        this.highlightedTactic = null;
        this.highlightedTechnique = null;
        this.highlightedTechniques = new Set<string>();
    }

    /**
     * Select the given technique. Depending on selectTechniquesAcrossTactics, either selects in all tactics or in given tactic
     * @param {Technique} technique to select
     * @param {Tactic} tactic wherein the technique occurs
     */
    public selectTechnique(technique: Technique, tactic: Tactic): void {
        if (this.selectTechniquesAcrossTactics) this.selectTechniqueAcrossTactics(technique);
        else this.selectTechniqueInTactic(technique, tactic);
    }

    /**
     * Unselect the given technique. Depending on selectTechniquesAcrossTactics, either unselects in all tactics or in given tactic
     * @param {Technique} technique to select
     * @param {Tactic} tactic wherein the technique occurs
     */
    public unselectTechnique(technique: Technique, tactic: Tactic): void {
        if (this.selectTechniquesAcrossTactics) this.unselectTechniqueAcrossTactics(technique);
        else this.unselectTechniqueInTactic(technique, tactic);
    }

    /**
     * Select the given technique in the given tactic
     * @param {Technique} technique to select
     * @param {Tactic} tactic wherein the technique occurs
     * @param {boolean} walkChildren (recursion helper) if true and selectSubtechniquesWithParent is true, walk selection up to parent technique
     */
    public selectTechniqueInTactic(technique: Technique, tactic: Tactic, walkChildren = true): void {
        if (this.selectSubtechniquesWithParent && walkChildren) {
            // check parent / children / siblings
            if (technique.isSubtechnique) {
                // select from parent
                this.selectTechniqueInTactic(technique.parent, tactic, true);
                return;
            } else {
                // select sub-techniques
                for (let subtechnique of technique.subtechniques) {
                    this.selectTechniqueInTactic(subtechnique, tactic, false);
                }
            }
        }

        let technique_tactic_id = technique.get_technique_tactic_id(tactic);
        if (!this.isCurrentlyEditing()) {
            // first selection
            this.activeTvm = this.getTechniqueVM_id(technique_tactic_id);
        }
        if ((this.selectVisibleTechniques && this.getTechniqueVM_id(technique_tactic_id).isVisible) || !this.selectVisibleTechniques) {
            this.selectedTechniques.add(technique_tactic_id);
            this.checkValues(true, technique_tactic_id);
        }
    }

    /**
     * Select all techniques under the given tactic
     * @param {Tactic} tactic wherein the techniques occur
     */
    public selectAllTechniquesInTactic(tactic: Tactic): void {
        for (let technique of tactic.techniques) {
            this.selectTechnique(technique, tactic);
        }
    }

    /**
     * select the given technique across all tactics in which it occurs
     * @param {Technique} technique to select
     * @param {boolean} walkChildren (recursion helper) if true and selectSubtechniquesWithParent is true, walk selection up to parent technique
     * @param highlightTechniques, if true, highlight techniques rather than add to selected techniques group
     */
    public selectTechniqueAcrossTactics(technique: Technique, walkChildren = true, highlightTechniques = false): void {
        if (this.selectSubtechniquesWithParent && walkChildren) {
            // walk to parent / children / siblings
            if (technique.isSubtechnique) {
                // select from parent
                this.selectTechniqueAcrossTactics(technique.parent, true, highlightTechniques);
                return;
            } else {
                // select sub-techniques
                for (let subtechnique of technique.subtechniques) {
                    this.selectTechniqueAcrossTactics(subtechnique, false, highlightTechniques);
                }
            }
        }
        if (highlightTechniques) {
            // highlight technique
            this.highlightTechnique(technique);
        } else {
            for (let id of technique.get_all_technique_tactic_ids()) {
                if (!this.isCurrentlyEditing()) this.activeTvm = this.getTechniqueVM_id(id); // first selection
                if ((this.selectVisibleTechniques && this.getTechniqueVM_id(id).isVisible) || !this.selectVisibleTechniques) {
                    this.selectedTechniques.add(id);
                    this.checkValues(true, id);
                }
            }
        }
    }

    /**
     * Unselect the given technique in the given tactic
     * @param {Technique} technique to unselect
     * @param {Tactic} tactic wherein the technique occurs
     * @param {boolean} walkChildren (recursion helper) if true and selectSubtechniquesWithParent is true, walk selection up to parent technique
     */
    public unselectTechniqueInTactic(technique: Technique, tactic: Tactic, walkChildren = true): void {
        if (this.selectSubtechniquesWithParent && walkChildren) {
            // walk to parent / children / siblings
            if (technique.isSubtechnique) {
                // select from parent
                this.unselectTechniqueInTactic(technique.parent, tactic, true);
                return;
            } else {
                // select sub-techniques
                for (let subtechnique of technique.subtechniques) {
                    this.unselectTechniqueInTactic(subtechnique, tactic, false);
                }
            }
        }

        let technique_tactic_id = technique.get_technique_tactic_id(tactic);
        this.selectedTechniques.delete(technique_tactic_id);
        this.checkValues(false, technique_tactic_id);
    }

    /**
     * Unselect all techniques in the given tactic
     * @param {Tactic} tactic wherein the techniques occur
     */
    public unselectAllTechniquesInTactic(tactic: Tactic): void {
        for (let technique of tactic.techniques) {
            this.unselectTechnique(technique, tactic);
        }
    }

    /**
     * Unselect the given technique across all tactics in which it occurs
     * @param {Technique} technique to unselect
     * @param {boolean} walkChildren (recursion helper) if true and selectSubtechniquesWithParent is true, walk selection up to parent technique
     */
    public unselectTechniqueAcrossTactics(technique: Technique, walkChildren = true): void {
        if (this.selectSubtechniquesWithParent && walkChildren) {
            // walk to parent / children / siblings
            if (technique.isSubtechnique) {
                // select from parent
                this.unselectTechniqueAcrossTactics(technique.parent, true);
                return;
            } else {
                // select sub-techniques
                for (let subtechnique of technique.subtechniques) {
                    this.unselectTechniqueAcrossTactics(subtechnique, false);
                }
            }
        }

        for (let id of technique.get_all_technique_tactic_ids()) {
            this.selectedTechniques.delete(id);
            this.checkValues(false, id);
        }
    }

    /* Unselect all techniques */
    public clearSelectedTechniques(): void {
        this.selectedTechniques.clear();
        this.activeTvm = undefined;
        this.linkMismatches = [];
        this.metadataMismatches = [];
    }

    /* Select all techniques */
    public selectAllTechniques(): void {
        this.clearSelectedTechniques();
        this.invertSelection();
    }

    /* Set all selected techniques to deselected, and select all techniques not currently selected */
    public invertSelection(): void {
        let previouslySelected = new Set(this.selectedTechniques);
        this.clearSelectedTechniques();

        let self = this;
        this.techniqueVMs.forEach(function (tvm, key) {
            if (!previouslySelected.has(tvm.technique_tactic_union_id)) {
                if ((self.selectVisibleTechniques && tvm.isVisible) || !self.selectVisibleTechniques) {
                    if (!self.isCurrentlyEditing()) {
                        // first selection
                        self.activeTvm = self.getTechniqueVM_id(tvm.technique_tactic_union_id);
                    }
                    self.selectedTechniques.add(tvm.technique_tactic_union_id);
                    self.checkValues(true, tvm.technique_tactic_union_id);
                }
            }
        });
    }

    /**
     * Select all techniques with annotations if nothing is currently selected, or
     * select a subset of the current selection that has annotations
     */
    public selectAnnotated(): void {
        let self = this;
        if (this.isCurrentlyEditing()) {
            // deselect techniques without annotations
            let selected = new Set(this.selectedTechniques);
            this.techniqueVMs.forEach(function (tvm, key) {
                if (selected.has(tvm.technique_tactic_union_id) && !tvm.annotated()) {
                    self.selectedTechniques.delete(tvm.technique_tactic_union_id);
                    self.checkValues(false, tvm.technique_tactic_union_id);
                }
            });
        } else {
            // select all techniques with annotations
            this.techniqueVMs.forEach(function (tvm, key) {
                if (tvm.annotated()) {
                    if ((self.selectVisibleTechniques && tvm.isVisible) || !self.selectVisibleTechniques) {
                        if (!self.isCurrentlyEditing()) self.activeTvm = self.getTechniqueVM_id(tvm.technique_tactic_union_id); // first selection
                        self.selectedTechniques.add(tvm.technique_tactic_union_id);
                        self.checkValues(true, tvm.technique_tactic_union_id);
                    }
                }
            });
        }
    }

    /**
     * Select all techniques without annotations if nothing is currently selected, or
     * select a subset of the current selection that do not have annotations
     */
    public selectUnannotated(): void {
        let self = this;
        if (this.isCurrentlyEditing()) {
            // deselect techniques with annotations
            let selected = new Set(this.selectedTechniques);
            this.techniqueVMs.forEach(function (tvm, key) {
                if (selected.has(tvm.technique_tactic_union_id) && tvm.annotated()) {
                    self.selectedTechniques.delete(tvm.technique_tactic_union_id);
                    self.checkValues(false, tvm.technique_tactic_union_id);
                }
            });
        } else {
            // select all techniques without annotations
            this.selectAnnotated();
            this.invertSelection();
        }
    }

    /**
     * Copies all annotations from unchanged techniques and techniques
     * which have had minor changes
     */
    public initCopyAnnotations(): void {
        let self = this;

        function copy(attackID: string) {
            let fromTechnique = self.dataService.getTechnique(attackID, self.compareTo.domainVersionID);
            let domain = self.dataService.getDomain(self.domainVersionID);
            let tactics = fromTechnique.tactics.map((shortname) => domain.tactics.find((t) => t.shortname == shortname));
            tactics.forEach((tactic) => {
                let fromVM = self.compareTo.getTechniqueVM(fromTechnique, tactic);
                if (fromVM.annotated()) {
                    let toTechnique = self.dataService.getTechnique(attackID, self.domainVersionID);
                    self.copyAnnotations(fromTechnique, toTechnique, tactic);
                }
            });
        }

        if (this.versionChangelog) {
            this.versionChangelog.unchanged.forEach((attackID) => copy(attackID));
            this.versionChangelog.minor_changes.forEach((attackID) => copy(attackID));
        }
    }

    /**
     * Copy annotations from one technique to another under the given tactic.
     * The previous technique will be disabled
     * @param fromTechnique the technique to copy annotations from
     * @param toTechnique the technique to copy annotations to
     * @param tactic the tactic the techniques are found under
     */
    public copyAnnotations(fromTechnique: Technique, toTechnique: Technique, tactic: Tactic): void {
        let fromVM = this.compareTo.getTechniqueVM(fromTechnique, tactic);
        let toVM = this.getTechniqueVM(toTechnique, tactic);

        this.versionChangelog.reviewed.delete(fromTechnique.attackID);

        toVM.deserialize(fromVM.serialize(), fromTechnique.attackID, tactic.shortname);
        this.updateScoreColor(toVM);
        fromVM.enabled = false;

        this.versionChangelog.copied.add(fromVM.technique_tactic_union_id);
        if (fromTechnique.get_all_technique_tactic_ids().every((id) => this.versionChangelog.copied.has(id))) {
            this.versionChangelog.reviewed.add(fromTechnique.attackID);
        }
    }

    /**
     * Reset the techniqueVM that the annotations were previously copied to
     * and re-enable the technique the annotations were copied from
     * @param fromTechnique the technique that annotations were copied from
     * @param toTechnique the technique that annotations were copied to
     * @param tactic the tactic the techniques are found under
     */
    public revertCopy(fromTechnique: Technique, toTechnique: Technique, tactic: Tactic): void {
        let fromVM = this.compareTo.getTechniqueVM(fromTechnique, tactic);
        let toVM = this.getTechniqueVM(toTechnique, tactic);
        this.versionChangelog.reviewed.delete(fromTechnique.attackID);

        toVM.resetAnnotations();
        fromVM.enabled = true;

        this.versionChangelog.copied.delete(fromVM.technique_tactic_union_id);
        if (!fromTechnique.get_all_technique_tactic_ids().every((id) => this.versionChangelog.copied.has(id))) {
            this.versionChangelog.reviewed.delete(fromTechnique.attackID);
        }
    }

    /**
     * Return true if the given technique is selected, false otherwise
     * @param  {Technique}  technique the technique to check
     * * @param  {Tactic}  tactic wherein the technique occurs
     * @return {boolean}           true if selected, false otherwise
     */
    public isTechniqueSelected(technique: Technique, tactic: Tactic, walkChildren = true): boolean {
        if (this.selectTechniquesAcrossTactics) {
            if (this.selectSubtechniquesWithParent && walkChildren) {
                // check parent / children / siblings
                if (technique.isSubtechnique) {
                    // select from parent
                    return this.isTechniqueSelected(technique.parent, tactic, true);
                } else {
                    for (let subtechnique of technique.subtechniques) {
                        if (this.isTechniqueSelected(subtechnique, tactic, false)) return true;
                    }
                }
            }

            for (let id of technique.get_all_technique_tactic_ids()) {
                if (this.selectedTechniques.has(id)) return true;
            }
            return false;
        } else {
            if (this.selectSubtechniquesWithParent && walkChildren) {
                // check parent / children / siblings
                if (technique.isSubtechnique) {
                    // select from parent
                    return this.isTechniqueSelected(technique.parent, tactic, true);
                } else {
                    for (let subtechnique of technique.subtechniques) {
                        if (this.isTechniqueSelected(subtechnique, tactic, false)) return true;
                    }
                }
            }
            return this.selectedTechniques.has(technique.get_technique_tactic_id(tactic));
        }
    }

    /**
     * Return the number of selected techniques
     * @return {number} the number of selected techniques
     */
    public getSelectedTechniqueCount(): number {
        if (this.selectTechniquesAcrossTactics) {
            if (this.selectSubtechniquesWithParent) {
                // match across tactics
                // match subtechniques and parents

                // matches this part
                // vvvvv
                // T1001.001^TA1000
                let ids = new Set();
                this.selectedTechniques.forEach((unionID) => ids.add(unionID.split('^')[0].split('.')[0]));
                return ids.size;
            } else {
                // match across tactics
                // differentiate subtechniques and parents

                // matches this part
                // vvvvv vvv
                // T1001.001^TA1000
                let ids = new Set();
                this.selectedTechniques.forEach((unionID) => ids.add(unionID.split('^')[0]));
                return ids.size;
            }
        } else {
            if (this.selectSubtechniquesWithParent) {
                // differentiate tactics
                // match subtechniques and parents

                // matches this part
                // vvvvv     vvvvvv
                // T1001.001^TA1000
                let ids = new Set();
                this.selectedTechniques.forEach((unionID) => {
                    let split = unionID.split('^');
                    let tacticID = split[1];
                    let techniqueID = split[0].split('.')[0];
                    ids.add(techniqueID + '^' + tacticID);
                });
                return ids.size;
            } else {
                // differentiate tactics
                // differentiate subtechniques and parents

                // matches this part
                // vvvvv vvv vvvvvv
                // T1001.001^TA1000
                return this.selectedTechniques.size;
            }
        }
    }

    /**
     * Returns true if the given tactic is selected
     * @param  {Tactic}  tactic to check
     * @return {boolean} true if selected
     */
    public isTacticSelected(tactic: Tactic): boolean {
        let self = this;
        let isSelected = tactic.techniques.every(function (technique) {
            return self.isTechniqueSelected(technique, tactic);
        });
        return isSelected;
    }

    /**
     * Return true if currently editing any techniques, false otherwise
     * @return {boolean} true if currently editing any techniques, false otherwise
     */
    public isCurrentlyEditing(): boolean {
        return this.getSelectedTechniqueCount() > 0;
    }

    /**
     * Edit the selected techniques
     * @param {string} field the field to edit
     * @param {any}    value the value to place in the field
     */
    public editSelectedTechniques(field: string, value: any): void {
        this.selectedTechniques.forEach((id) => {
            this.getTechniqueVM_id(id)[field] = value;
        });
    }

    /**
     * Edit the selected techniques list attribute
     * @param {string}  field the field to edit
     * @param {(Link|Metadata)[]} values the list of values to place in the field
     */
    public editSelectedTechniqueValues(field: string, values: (Link | Metadata)[]): void {
        let fieldToType: any = { links: Link, metadata: Metadata };
        this.selectedTechniques.forEach((id) => {
            const value_clone = values.map((value) => {
                // deep copy
                let clone = new fieldToType[field]();
                clone.deserialize(value.serialize());
                return clone;
            });
            this.getTechniqueVM_id(id)[field] = value_clone;
        });
    }

    /**
     * Reset the selected techniques' annotations to their default values
     */
    public resetSelectedTechniques(): void {
        this.selectedTechniques.forEach((id) => {
            this.getTechniqueVM_id(id).resetAnnotations();
        });
    }

    /**
     * Get get a common value from the selected techniques
     * @param  field the field to get the common value from
     * @return       the value of the field if all selected techniques have the same value, otherwise ""
     */
    public getEditingCommonValue(field: string): any {
        if (!this.isCurrentlyEditing()) return '';
        let ids = Array.from(this.selectedTechniques);
        let commonValue = this.getTechniqueVM_id(ids[0])[field];
        for (let i = 1; i < ids.length; i++) {
            if (this.getTechniqueVM_id(ids[i])[field] != commonValue) return '';
        }
        return commonValue;
    }

    /**
     * If a technique has been selected, checks whether the link & metadata values of the selected technique match
     * the link & metadata values of the first selected technique. If a technique has been deselected, removes it from
     * the lists of mismatching techniques (if applicable) or re-evalutes the lists of mismatching
     * techniques in the case where the deselected technique was the first selected technique
     * @param selected true if the technique was selected, false if it was deselected
     * @param id the technique_tactic_union_id of the technique
     */
    public checkValues(selected: boolean, id: string): void {
        if (selected) {
            // selected technique(s)
            let tvm = this.getTechniqueVM_id(id);
            if (this.activeTvm.linkStr !== tvm.linkStr) this.linkMismatches.push(id);
            if (this.activeTvm.metadataStr !== tvm.metadataStr) this.metadataMismatches.push(id);
        } else {
            // deselected technique(s)
            if (this.linkMismatches.includes(id)) this.linkMismatches.splice(this.linkMismatches.indexOf(id), 1);
            if (this.metadataMismatches.includes(id)) this.metadataMismatches.splice(this.metadataMismatches.indexOf(id), 1);

            if (this.activeTvm && this.activeTvm.technique_tactic_union_id == id) {
                // edge case where deselection was the first selected technique
                let first_id = this.selectedTechniques.values().next().value;
                this.activeTvm = first_id ? this.getTechniqueVM_id(first_id) : undefined;

                // re-evaluate mismatched values
                this.linkMismatches = [];
                this.metadataMismatches = [];
                for (let technique_tactic_id of Array.from(this.selectedTechniques.values())) {
                    let tvm = this.getTechniqueVM_id(technique_tactic_id);
                    if (this.activeTvm.linkStr !== tvm.linkStr) this.linkMismatches.push(technique_tactic_id);
                    if (this.activeTvm.metadataStr !== tvm.metadataStr) this.metadataMismatches.push(technique_tactic_id);
                }
            }
        }
    }

    /**
     * Filter tactics according to viewmodel state
     * @param {Tactic[]} tactics to filter
     * @param {Matrix} matrix that the tactics fall under
     * @returns {Tactic[]} filtered tactics
     */
    public filterTactics(tactics: Tactic[], matrix: Matrix): Tactic[] {
        if (!this.loaded) return; // still initializing technique VMs
        return tactics.filter((tactic: Tactic) => this.filterTechniques(tactic.techniques, tactic, matrix).length > 0);
    }

    /**
     * Filter techniques according to viewModel state
     * @param {Technique[]} techniques list of techniques to filter
     * @param {Tactic} tactic tactic the techniques fall under
     * @param {Matrix} matrix that the techniques fall under
     * @returns {Technique[]} filtered techniques
     */
    public filterTechniques(techniques: Technique[], tactic: Tactic, matrix: Matrix): Technique[] {
        return techniques.filter((technique: Technique) => {
            let techniqueVM = this.getTechniqueVM(technique, tactic);
            // filter by enabled
            if (this.hideDisabled && !this.isSubtechniqueEnabled(technique, techniqueVM, tactic)) {
                techniqueVM.setIsVisible(false);
                technique.subtechniques.forEach((subtechnique) => {
                    let subtechniqueVM = this.getTechniqueVM(subtechnique, tactic);
                    subtechniqueVM.setIsVisible(false);
                });
                return false;
            }
            if (matrix.name == 'PRE-ATT&CK') {
                techniqueVM.setIsVisible(true);
                technique.subtechniques.forEach((subtechnique) => {
                    let subtechniqueVM = this.getTechniqueVM(subtechnique, tactic);
                    subtechniqueVM.setIsVisible(true);
                });
                return true; // don't filter by platform if it's pre-attack
            }
            // filter by platform
            let platforms = new Set(technique.platforms);
            if (platforms.size == 0) {
                platforms.add('None');
            }
            for (let platform of this.filters.platforms.selection) {
                if (platforms.has(platform)) {
                    techniqueVM.setIsVisible(true);
                    technique.subtechniques.forEach((subtechnique) => {
                        let subtechniqueVM = this.getTechniqueVM(subtechnique, tactic);
                        subtechniqueVM.setIsVisible(true);
                    });
                    return true; //platform match
                }
            }
            techniqueVM.setIsVisible(false);
            technique.subtechniques.forEach((subtechnique) => {
                let subtechniqueVM = this.getTechniqueVM(subtechnique, tactic);
                subtechniqueVM.setIsVisible(false);
            });
            return false; // no platform match
        });
    }

    public isSubtechniqueEnabled(technique, techniqueVM, tactic): boolean {
        if (techniqueVM.enabled) return true;
        else if (technique.subtechniques.length > 0) {
            return technique.subtechniques.some((subtechnique) => {
                let sub_platforms = new Set(subtechnique.platforms);
                let filter = new Set(this.filters.platforms.selection);
                let platforms = new Set(Array.from(filter.values()).filter((p) => sub_platforms.has(p)));
                return this.getTechniqueVM(subtechnique, tactic).enabled && platforms.size > 0;
            });
        } else return false;
    }

    /**
     * Sort techniques according to viewModel state
     * @param {Technique[]} techniques techniques to sort
     * @param {Tactic} tactic tactic the techniques fall under
     * @returns {Technique[]} sorted techniques
     */
    public sortTechniques(techniques: Technique[], tactic: Tactic): Technique[] {
        return techniques.sort((technique1: Technique, technique2: Technique) => {
            const techniqueVM1 = this.getTechniqueVM(technique1, tactic);
            const techniqueVM2 = this.getTechniqueVM(technique2, tactic);

            this.sortSubTechniques(technique1, tactic);
            this.sortSubTechniques(technique2, tactic);

            // prefer techniques scored 0 over unscored
            let score1 = techniqueVM1.score.length > 0 ? Number(techniqueVM1.score) : Number.NEGATIVE_INFINITY;
            let score2 = techniqueVM2.score.length > 0 ? Number(techniqueVM2.score) : Number.NEGATIVE_INFINITY;

            if (this.layout.showAggregateScores) {
                // if enabled, factor aggregate scores of parent techniques into sorting
                if (technique1.subtechniques.length > 0) score1 = this.calculateAggregateScore(technique1, tactic);
                if (technique2.subtechniques.length > 0) score2 = this.calculateAggregateScore(technique2, tactic);
            }
            return this.sortingAlgorithm(technique1, technique2, score1, score2);
        });
    }

    /**
     * Sort subtechniques according to viewModel state
     * @param {Technique} technique technique to sort
     * @param {Tactic} tactic tactic the technique falls under
     */
    public sortSubTechniques(technique: Technique, tactic: Tactic) {
        technique.subtechniques.sort((technique1: Technique, technique2: Technique) => {
            const techniqueVM1 = this.getTechniqueVM(technique1, tactic);
            const techniqueVM2 = this.getTechniqueVM(technique2, tactic);
            const score1 = techniqueVM1.score.length > 0 ? Number(techniqueVM1.score) : 0;
            const score2 = techniqueVM2.score.length > 0 ? Number(techniqueVM2.score) : 0;
            return this.sortingAlgorithm(technique1, technique2, score1, score2);
        });
    }

    /**
     * Execute the sorting algorithm for techniques according to the viewModel state
     * @param {Technique} technique1 the first technique in the comparison
     * @param {Technique} technique2 the second technique in the comparison
     * @param {number} score1 the first score in the comparison
     * @param {number} score2 the second score in the comparison
     * @returns technique or score comparison
     */
    private sortingAlgorithm(technique1: Technique, technique2: Technique, score1: number, score2: number) {
        switch (this.sorting) {
            case 1: // Z-A
                return technique2.name.localeCompare(technique1.name);
            case 2: // 1-2
                if (score1 === score2) {
                    return technique1.name.localeCompare(technique2.name);
                } else {
                    return score1 - score2;
                }
            case 3: // 2-1
                if (score1 === score2) {
                    return technique1.name.localeCompare(technique2.name);
                } else {
                    return score2 - score1;
                }
            case 0: // A-Z
            default:
                return technique1.name.localeCompare(technique2.name);
        }
    }

    public calculateAggregateScore(technique: Technique, tactic: Tactic): any {
        const tvm = this.getTechniqueVM(technique, tactic);
        let score = tvm.score.length > 0 ? Number(tvm.score) : 0;
        let validTechniquesCount = tvm.score.length > 0 ? 1 : 0;
        let scores = [score];

        technique.subtechniques.forEach((subtechnique) => {
            const svm = this.getTechniqueVM(subtechnique, tactic);
            const scoreNum = svm.score.length > 0 ? Number(svm.score) : 0;
            if (svm.score.length > 0) {
                validTechniquesCount += 1;
                scores.push(scoreNum);
            }
        });

        if (validTechniquesCount === 0) return tvm.score.length > 0 ? score : Number.NEGATIVE_INFINITY;

        let aggScore: any = 0;

        switch (this.layout.aggregateFunction) {
            case 'min':
                if (scores.length > 0) aggScore = Math.min(...scores);
                break;
            case 'max':
                if (scores.length > 0) aggScore = Math.max(...scores);
                break;
            case 'sum':
                aggScore = scores.reduce((a, b) => a + b);
                break;
            case 'average':
            default:
                // Divide by count of all subtechniques + 1 (for parent technique) if counting unscored is enabled
                // Otherwise, divide by count of all scored only
                score = scores.reduce((a, b) => a + b);
                aggScore = score / (this.layout.countUnscored ? technique.subtechniques.length + 1 : validTechniquesCount);
                break;
        }

        aggScore = aggScore.toFixed(2);
        tvm.aggregateScoreColor = this.gradient.getHexColor(aggScore.toString());
        tvm.aggregateScore = Number.isFinite(+aggScore) ? (+aggScore).toString() : '';
        return +aggScore;
    }

    /**
     * Apply sort and filter state to techniques
     * @param {Technique[]} techniques techniques to sort and filter
     * @param {Tactic} tactic that the techniques fall under
     * @param {Matrix} matrix that the techniques fall under
     * @returns {Technique[]} sorted and filtered techniques
     */
    public applyControls(techniques: Technique[], tactic: Tactic, matrix: Matrix): Technique[] {
        return this.sortTechniques(this.filterTechniques(techniques, tactic, matrix), tactic);
    }

    /**
     * List of visible technique and subtechnique attack IDs
     * @returns list of strings of each visible technique and subtechnique attack ID
     */
    public getVisibleTechniquesList(): string[] {
        let visibleTechniques: string[] = [];
        this.techniqueVMs.forEach((t) => {
            if (t.isVisible) {
                visibleTechniques.push(t.technique_tactic_union_id);
            }
        });
        return visibleTechniques;
    }

    /**
     * Number of modified hidden techniques
     * @returns number of hidden techniques that are annotated
     */
    public modifiedHiddenTechniques(): number {
        let modifiedHiddenTechniques = 0;
        this.techniqueVMs.forEach(function (value, key) {
            if (value.modified() && value.isVisible === false) {
                modifiedHiddenTechniques++;
            }
        });
        return modifiedHiddenTechniques;
    }

    /**
     * Stringify this ViewModel
     * @return string representation
     */
    public serialize(downloadAnnotationsOnVisibleTechniques: boolean): string {
        let modifiedTechniqueVMs = [];
        this.techniqueVMs.forEach(function (value, key) {
            if (value.modified() && !downloadAnnotationsOnVisibleTechniques) {
                modifiedTechniqueVMs.push(JSON.parse(value.serialize())); //only save techniqueVMs which have been modified
            } else if (value.modified() && value.isVisible === true && downloadAnnotationsOnVisibleTechniques) {
                modifiedTechniqueVMs.push(JSON.parse(value.serialize())); //only save techniqueVMs which have been modified and are visible
            }
        });
        let rep: { [k: string]: any } = {};
        rep.name = this.name;

        rep.versions = {
            attack: this.dataService.getDomain(this.domainVersionID).getVersion(),
            navigator: globals.navVersion,
            layer: globals.layerVersion,
        };

        let domain = this.dataService.getDomain(this.domainVersionID);
        rep.domain = domain.domain_identifier;
        if (domain.isCustom) {
            // custom data url
            rep.customDataURL = domain.urls[0];
        }
        rep.description = this.description;
        rep.filters = JSON.parse(this.filters.serialize());
        rep.sorting = this.sorting;
        rep.layout = this.layout.serialize();
        rep.hideDisabled = this.hideDisabled;
        rep.techniques = modifiedTechniqueVMs;
        rep.gradient = JSON.parse(this.gradient.serialize());
        rep.legendItems = JSON.parse(JSON.stringify(this.legendItems));
        rep.metadata = this.metadata.filter((m) => m.valid()).map((m) => m.serialize());
        rep.links = this.links.filter((l) => l.valid()).map((l) => l.serialize());

        rep.showTacticRowBackground = this.showTacticRowBackground;
        rep.tacticRowBackground = this.tacticRowBackground;
        rep.selectTechniquesAcrossTactics = this.selectTechniquesAcrossTactics;
        rep.selectSubtechniquesWithParent = this.selectSubtechniquesWithParent;
        rep.selectVisibleTechniques = this.selectVisibleTechniques;

        return JSON.stringify(rep, null, '\t');
    }

    /**
     * Restore the domain and version from a string
     * @param rep string to restore from
     * @return string representation of the obj version
     */
    public deserializeDomainVersionID(rep: any): string {
        let versionNumber = '';
        let obj = typeof rep == 'string' ? JSON.parse(rep) : rep;
        this.name = obj.name;
        // layer with no specified version defaults to current version
        this.version = this.dataService.latestVersion.number;
        if ('versions' in obj) {
            if ('attack' in obj.versions) {
                if (typeof obj.versions.attack === 'string') {
                    if (obj.versions.attack.length > 0) this.version = obj.versions.attack.match(/\d+/g)[0];
                } else console.error('TypeError: attack version field is not a string');
            }
            versionNumber = String(obj.versions['layer']);
        }
        if ('version' in obj) {
            // backwards compatibility with Layer Format 3
            versionNumber = String(obj.version);
        }
        // patch for old domain name convention
        if (obj.domain in this.dataService.domain_backwards_compatibility) {
            this.domain = this.dataService.domain_backwards_compatibility[obj.domain];
        } else {
            this.domain = obj.domain;
        }
        this.domainVersionID = this.dataService.getDomainVersionID(this.domain, this.version);
        return versionNumber;
    }

    /**
     * Restore this vm from a string
     * @param  rep string to restore from
     */
    public deserialize(rep: any, restoreTechniques: boolean = true): void {
        let obj = typeof rep == 'string' ? JSON.parse(rep) : rep;

        if ('description' in obj) {
            if (typeof obj.description === 'string') this.description = obj.description;
            else console.error('TypeError: description field is not a string');
        }
        if ('filters' in obj) {
            this.filters.deserialize(obj.filters);
        }
        if ('sorting' in obj) {
            if (typeof obj.sorting === 'number') this.sorting = obj.sorting;
            else console.error('TypeError: sorting field is not a number');
        }
        if ('hideDisabled' in obj) {
            if (typeof obj.hideDisabled === 'boolean') this.hideDisabled = obj.hideDisabled;
            else console.error('TypeError: hideDisabled field is not a boolean');
        }

        if ('gradient' in obj) {
            this.gradient = new Gradient();
            this.gradient.deserialize(JSON.stringify(obj.gradient));
        }

        if ('legendItems' in obj) {
            for (let item of obj.legendItems) {
                let legendItem = {
                    color: '#defa217',
                    label: 'default label',
                };
                if (!('label' in item)) {
                    console.error("Error: LegendItem required field 'label' not present");
                    continue;
                }
                if (!('color' in item)) {
                    console.error("Error: LegendItem required field 'label' not present");
                    continue;
                }

                if (typeof item.label === 'string') {
                    legendItem.label = item.label;
                } else {
                    console.error('TypeError: legendItem label field is not a string');
                    continue;
                }

                if (typeof item.color === 'string' && tinycolor(item.color).isValid()) {
                    legendItem.color = item.color;
                } else {
                    console.error('TypeError: legendItem color field is not a color-string:', item.color, '(', typeof item.color, ')');
                    continue;
                }
                this.legendItems.push(legendItem);
            }
        }

        if ('showTacticRowBackground' in obj) {
            if (typeof obj.showTacticRowBackground === 'boolean') this.showTacticRowBackground = obj.showTacticRowBackground;
            else console.error('TypeError: showTacticRowBackground field is not a boolean');
        }
        if ('tacticRowBackground' in obj) {
            if (typeof obj.tacticRowBackground === 'string' && tinycolor(obj.tacticRowBackground).isValid())
                this.tacticRowBackground = obj.tacticRowBackground;
            else
                console.error(
                    'TypeError: tacticRowBackground field is not a color-string:',
                    obj.tacticRowBackground,
                    '(',
                    typeof obj.tacticRowBackground,
                    ')'
                );
        }
        if ('selectTechniquesAcrossTactics' in obj) {
            if (typeof obj.selectTechniquesAcrossTactics === 'boolean') this.selectTechniquesAcrossTactics = obj.selectTechniquesAcrossTactics;
            else console.error('TypeError: selectTechniquesAcrossTactics field is not a boolean');
        }
        if ('selectSubtechniquesWithParent' in obj) {
            if (typeof obj.selectSubtechniquesWithParent === 'boolean') this.selectSubtechniquesWithParent = obj.selectSubtechniquesWithParent;
            else console.error('TypeError: selectSubtechniquesWithParent field is not a boolean');
        }
        if ('selectVisibleTechniques' in obj) {
            if (typeof obj.selectVisibleTechniques === 'boolean') this.selectVisibleTechniques = obj.selectVisibleTechniques;
            else console.error('TypeError: selectVisibleTechniques field is not a boolean');
        }
        if ('techniques' in obj && restoreTechniques) {
            if (obj.techniques.length > 0) {
                for (let objTechnique of obj.techniques) {
                    if ('tactic' in objTechnique) {
                        let tvm = new TechniqueVM('');
                        tvm.deserialize(JSON.stringify(objTechnique), objTechnique.techniqueID, objTechnique.tactic);
                        this.setTechniqueVM(tvm);
                    } else {
                        // occurs in multiple tactics, match to Technique by attackID
                        for (let technique of this.dataService.getDomain(this.domainVersionID).techniques) {
                            if (technique.attackID == objTechnique.techniqueID) {
                                // match technique
                                // don't load deprecated/revoked, causes crash since tactics don't get loaded on revoked techniques
                                if (technique.deprecated || technique.revoked) break;

                                for (let tactic of technique.tactics) {
                                    let tvm = new TechniqueVM('');
                                    tvm.deserialize(JSON.stringify(objTechnique), objTechnique.techniqueID, tactic);
                                    this.setTechniqueVM(tvm);
                                }
                                break;
                            }
                            //check against subtechniques
                            for (let subtechnique of technique.subtechniques) {
                                if (subtechnique.attackID == objTechnique.techniqueID) {
                                    // don't load deprecated/revoked, causes crash since tactics don't get loaded on revoked techniques
                                    if (subtechnique.deprecated || subtechnique.revoked) break;

                                    for (let tactic of subtechnique.tactics) {
                                        let tvm = new TechniqueVM('');
                                        tvm.deserialize(JSON.stringify(objTechnique), objTechnique.techniqueID, tactic);
                                        this.setTechniqueVM(tvm);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if ('metadata' in obj) {
            for (let metadataObj of obj.metadata) {
                let m = new Metadata();
                m.deserialize(metadataObj);
                if (m.valid()) this.metadata.push(m);
            }
        }
        if ('links' in obj) {
            for (let link of obj.links) {
                let l = new Link();
                l.deserialize(link);
                if (l.valid()) this.links.push(l);
            }
        }
        // add custom data URL
        if ('customDataURL' in obj) {
            this.bundleURL = obj.customDataURL;
        }
        if ('layout' in obj) {
            this.layout.deserialize(obj.layout);
        } else if ('viewMode' in obj) {
            /*
             * viewMode backwards compatibility:
             * 0: full table (side layout, show name)
             * 1: compact table (side layout, show ID)
             * 2: mini table (mini layout, show neither name nor ID)
             */
            if (typeof obj.viewMode === 'number') {
                switch (obj.viewMode) {
                    case 1:
                        this.layout.layout = 'side';
                        this.layout.showName = false;
                        this.layout.showID = true;
                        break;
                    case 2:
                        this.layout.layout = 'mini';
                        this.layout.showName = false;
                        this.layout.showID = false;
                        break;
                    case 0:
                    default:
                        break; //default matrix layout already initialized
                }
            } else console.error('TypeError: viewMode field is not a number');
        }

        this.updateGradient();
    }

    /* Add a color to the end of the gradient */
    public addGradientColor(): void {
        this.gradient.addColor();
        this.updateGradient();
    }

    /**
     * Remove color at the given index
     * @param index index to remove color at
     */
    public removeGradientColor(index: number): void {
        this.gradient.removeColor(index);
        this.updateGradient();
    }

    /* Update this vm's gradient */
    public updateGradient(): void {
        this.gradient.updateGradient();
        let self = this;
        this.techniqueVMs.forEach(function (tvm, key) {
            tvm.scoreColor = self.gradient.getHexColor(tvm.score);
        });
        this.updateLegendColorPresets();
    }

    /**
     * Update the score color of a single technique VM to match the current
     * score and gradient
     * @param tvm technique VM to update
     */
    public updateScoreColor(tvm: TechniqueVM): void {
        tvm.scoreColor = this.gradient.getHexColor(tvm.score);
    }

    public addLegendItem(): void {
        let legendItem = {
            label: 'NewItem',
            color: '#00ffff',
        };
        this.legendItems.push(legendItem);
    }

    public deleteLegendItem(index: number): void {
        this.legendItems.splice(index, 1);
    }

    public clearLegend(): void {
        this.legendItems = [];
    }

    public updateLegendColorPresets(): void {
        this.legendColorPresets = [];
        this.backgroundPresets.forEach((preset) => this.legendColorPresets.push(preset));
        this.gradient.colors.forEach((color) => this.legendColorPresets.push(color.color));
    }
}
