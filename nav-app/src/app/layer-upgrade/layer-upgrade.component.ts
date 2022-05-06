import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../viewmodels.service';
import { DataService, Tactic, Technique, VersionChangelog } from '../data.service';
import { DndDropEvent } from 'ngx-drag-drop';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayerUpgradeComponent implements OnInit {
    @Input() viewModel: ViewModel; // view model of new version
    @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
    public paginator_map: Map<string, number> = new Map(); // section name mapped to index of paginator
    public filteredIDs: string[] = [];

    @ViewChild('stepper') stepper: MatStepper;

    public changelog: VersionChangelog;
    public compareTo: ViewModel; // view model of old version
    public sections: string[] = [
        "additions", "changes", "minor_changes",
        "revocations", "deprecations", "unchanged"
    ];
    public filter: any = {
        "changes": false,
        "minor_changes": false,
        "revocations": false,
        "deprecations": false,
        "unchanged": false
    }
    public loading: boolean = false;
    
    constructor(public dataService: DataService) { }

    ngOnInit(): void {
        this.changelog = this.viewModel.versionChangelog;
        this.compareTo = this.viewModel.compareTo;
        // map sections with techniques to paginator index
        let i = 0;
        for (let s of this.sections) {
            if (this.changelog[s].length) this.paginator_map.set(s, i++);
        }
        this.applyFilters(this.sections[0]);
        this.wait();
    }

    wait(): void {
        this.loading = true;
        setTimeout(() => this.loading = false, 1000);
    }

    /**
     * Get a readable version for the name of the changelog section
     * @param section name of the changelog section
     * @returns {string} readable section header text
     */
    public getHeader(section: string): string {
        return section.split(/[_-]+/).map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }

    /**
     * Retrieve the URL for a given technique in the previous ATT&CK version
     * @param attackID the ATT&CK ID of the technique
     * @returns {string} the URL
     */
    public getPreservedURL(attackID: string): string {
        let url = this.getTechnique(attackID, this.compareTo).url;
        let i = url.search('/techniques');
        return url.substring(0, i) + '/versions/v' + this.compareTo.version + url.substring(i);
    }

    /**
     * Disable the annotated techniques filter?
     * @param section the name of the changelog section
     * @returns true if there are no annotated techniques in the given section, false otherwise
     */
    public disableFilter(section: string): boolean {
        return !this.changelog[section].filter(id => this.anyAnnotated(id)).length
    }

    /**
     * Apply filters to the changelog section
     * @returns the list of filtered ATT&CK IDs in the changelog section
     */
    public applyFilters(section: string): void {
        let sectionIDs = this.changelog[section];
        if (this.filter[section]) sectionIDs = sectionIDs.filter(id => this.anyAnnotated(id));

        let i = this.paginator_map.get(section);
        let paginator = this.paginators.toArray()[i];
        if (paginator && (paginator.pageIndex * paginator.pageSize > sectionIDs.length)) {
            paginator.pageIndex = 0;
        }
        let start = paginator? paginator.pageIndex * paginator.pageSize : 0;
        let end = paginator? start + paginator.pageSize : 10;
        this.filteredIDs = sectionIDs.slice(start, end);
    }

    /**
     * Update the list of IDs to render on step change
     * @param section the name of the changelog section
     * @param offset -1 if moving to the previous step, 1 if moving to the next step
     */
    public onStepChange(section: string, offset: number): void {
        let i = this.sections.findIndex(s => s === section);
        if (i + offset < this.sections.length) {
            let nextSection = this.sections[i + offset];
            this.applyFilters(nextSection);
            if (this.changelog[nextSection].length > 0) this.wait();
        }
    }

    /**
     * Get the technique object in the domain of the given view model
     * @param attackID the ATT&CK ID of the technique
     * @param vm the view model
     * @param section name of the changelog section
     * @returns {Technique} the technique object
     */
    public getTechnique(attackID: string, vm: ViewModel, section?: string): Technique {
        let domain = this.dataService.getDomain(vm.domainVersionID);
        let all_techniques = domain.techniques.concat(domain.subtechniques);
        let technique = all_techniques.find(t => t.attackID == attackID);

        if (section == 'revocations' && this.viewModel.version == vm.version) {
            // get revoking object
            let revokedByID = technique.revoked_by(vm.domainVersionID);
            let revokingObject = all_techniques.find(t => t.id == revokedByID);
            return revokingObject;
        } else return technique;
    }

    /**
     * Get the list of tactic objects the given technique is found under 
     * @param attackID the ATT&CK ID of the object
     * @param vm the view model used to identify the domain
     * @param section name of the changelog section
     * @returns {Tactic[]} list of tactic objects the object is found under
     */
    public getTactics(attackID: string, vm: ViewModel, section?: string): Tactic[] {
        if (section == 'additions') vm = this.viewModel;
        let technique = this.getTechnique(attackID, vm, section);
        let domain = this.dataService.getDomain(vm.domainVersionID);
        return technique.tactics.map(shortname => domain.tactics.find(t => t.shortname == shortname));
    }

    /**
     * Determine if the lists of tactics between the technique in the new version and
     * old version are the same
     * @param attackID the ATT&CK ID of the object
     * @param section name of the changelog section
     * @returns {boolean} true if the list of tactics are not identical
     */
    public tacticsChanged(attackID: string, section: string): boolean {
        if (section == 'deprecations' || section == 'additions') return false;
        
        let oldTechnique = this.getTechnique(attackID, this.compareTo);
        let newTechnique = this.getTechnique(attackID, this.viewModel, section);

        if (!oldTechnique.tactics && !newTechnique.tactics) return false;
        if (oldTechnique.tactics.length !== newTechnique.tactics.length) return true;

        // order lists and compare
        let sortArray = function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        };
        let oldTactics = oldTechnique.tactics.sort(sortArray);
        let newTactics = newTechnique.tactics.sort(sortArray);
        if (oldTactics.every((value, i) => value === newTactics[i])) return false;
        return true;
    }

    /**
     * Determine if the technique is marked as reviewed
     * @param attackID the ATT&CK ID of the technique
     * @returns {boolean} true if the technique has been marked as reviewed
     */
    public isReviewed(attackID: string): boolean {
        return this.changelog.reviewed.has(attackID);
    }

    /**
     * Marks or unmarks a single given technique as reviewed
     * @param attackID the ATT&CK ID of the technique
     * @param panel the object's expansion panel
     */
    public reviewedChanged(attackID: string, panel: MatExpansionPanel): void {
        if (this.isReviewed(attackID)) {
            this.changelog.reviewed.delete(attackID);
        } else {
            this.changelog.reviewed.add(attackID);
            panel.expanded = false; // close on review
        }
    }

    /**
     * Get the number of techniques marked as reviewed in the given section
     * @param section the name of the changelog section
     * @returns number of reviewed techniques
     */
    public countReviewed(section: string): number {
        return this.changelog[section].filter(attackID => this.changelog.reviewed.has(attackID)).length;
    }

    // changelog section descriptions
    private descriptions: any = {
        "additions": "The following techniques have been added to the dataset since the layer was created. You can review the techniques below to identify which may require annotations. Annotations may be added using the 'technique controls' in the toolbar.",
        "changes": "The following techniques have undergone major changes since the layer was created such as changes to scope or technique name. You can view the annotations you had previously added, map them to the current ATT&CK version, and adjust them as needed. You can also review the previous and current technique definitions by clicking the version numbers in each row.",
        "minor_changes": "The following techniques have had minor revisions since the layer was created such as typo corrections. The annotations have automatically been copied for these techniques, but you can review them if desired. You can also view the previous and current technique definitions by clicking the version numbers under the technique.",
        "revocations": "These are techniques which have been replaced by other techniques since the layer was created. You can view the replacing techniques and transfer annotations from the replaced techniques, adjusting them as nessecary. You can also review the replaced and replacing technique definitions by clicking the version numbers under the technique.",
        "deprecations": "These are techniques which have been removed from the dataset. You can view any annotations you had previously added to these techniques.",
        "unchanged": "These are techniques which have not changed since the uploaded layer's ATT&CK version. The annotations have automatically been copied for these techniques, but you can review them if desired.",
        "finish": "The overview below indicates either the number of techniques you have reviewed in a section, if you have skipped a section, or if there are no techniques to review in that section. Annotations mapped to the current version have been saved to the new layer.\n\nVerify your changes and click 'Done' to complete the layer upgrade workflow. Once completed you cannot return to this workflow."
    }

    /**
     * Get the changelog section description
     * @param section the name of the changelog section
     * @returns the section description
     */
    public getDescription(section: string): string {
        return this.descriptions[section];
    }

    /**
     * Determine if any techniqueVM in the old version with the given
     * ATT&CK ID has annotations
     * @param attackID the ATT&CK ID of the technique
     * @returns {boolean} true if any TechniqueVM for this technique is annotated
     */
     public anyAnnotated(attackID: string): boolean {
        let oldTechnique = this.getTechnique(attackID, this.compareTo);
        if (oldTechnique) {
            let technique_tactic_ids = oldTechnique.get_all_technique_tactic_ids();

            for (let id of technique_tactic_ids) {
                if (this.compareTo.getTechniqueVM_id(id).annotated()) return true;
            }
        }
        return false;
    }

    /**
     * Is the TechniqueVM for this technique-tactic annotated?
     * @param technique the technique in the old version
     * @param tactic the tactic the technique is found under
     * @param vm the view model
     * @returns {boolean} true if the TechniqueVM is annotated, false otherwise
     */
    public isAnnotated(technique: Technique, tactic: Tactic, vm: ViewModel): boolean {
        return vm.getTechniqueVM(technique, tactic).annotated();
    }

    /**
     * Get the total number of techniques currently displayed in a given section
     * @param section the name of the changelog section
     * @returns the total number of annotated techniques in the section if the filter is enabled,
     * otherwise the total number of techniques in the seciton
     */
    public sectionLength(section: string): number {
        if (this.filter[section]) return this.changelog[section].filter(attackID => this.anyAnnotated(attackID)).length;
        else return this.changelog[section].length;
    }

    /**
     * Determine if the annotations of the technique under the given tactic
     * in the old version have been copied to the new version
     * @param technique the technique in the old version
     * @param tactic the tactic the technique is found under
     * @returns {boolean} true if the annotations have been copied to the
     * object in the new version
     */
    public isCopied(technique: Technique, tactic: Tactic): boolean {
        if (this.changelog.copied.has(technique.get_technique_tactic_id(tactic))) return true;
        return false;
    }

    /**
     * Copy the annotations from the technique in the old version
     * to the technique in the new version
     * @param attackID the ATT&CK ID of the technique
     * @param tactic the tactic the technique is found under
     */
    public copyAnnotations(attackID: string, tactic: Tactic, section: string): void {
        let fromTechnique = this.getTechnique(attackID, this.compareTo);
        let toTechnique = this.getTechnique(attackID, this.viewModel, section);
        this.viewModel.copyAnnotations(fromTechnique, toTechnique, tactic);
    }

    /**
     * Re-enable the annotations on the technique in the old version and
     * reset the annotations on the technique in the new version
     * @param attackID the ATT&CK ID of the technique
     * @param tactic the tactic the technique is found under
     */
    public revertCopy(attackID: string, tactic: Tactic, section: string): void {
        let fromTechnique = this.getTechnique(attackID, this.compareTo);
        let toTechnique = this.getTechnique(attackID, this.viewModel, section);
        this.viewModel.revertCopy(fromTechnique, toTechnique, tactic);
    }

    /**
     * Copy the annotations from the TechniqueVM in the old version
     * to the TechniqueVM that the element was dropped over
     * @param event the ngx drop event
     * @param toTechnique the technique object to copy annotations to
     * @param toTactic the tactic object to copy annotations to
     * @param section the name of the changelog section
     */
    public onDrop(event: DndDropEvent, toTechnique: Technique, toTactic: Tactic, section: string): void {
        let attackID = event.data.split("^")[0];
        let validTechnique = this.getTechnique(attackID, this.viewModel, section);

        if (validTechnique.id === toTechnique.id) { // copying annotations to a valid target?
            // retrieve relevant technique VMs
            let fromTvm = this.compareTo.getTechniqueVM_id(event.data);
            let toTvm = this.viewModel.getTechniqueVM(toTechnique, toTactic);

            // copy annotations
            let rep = fromTvm.serialize();
            toTvm.resetAnnotations();
            toTvm.deSerialize(rep, toTechnique.attackID, toTactic.shortname);
            this.viewModel.updateScoreColor(toTvm);
        } else {} // invalid target
    }

    /**
     * Remove all annotations from the VM
     * @param technique the technique object to remove annotations from
     * @param tactic the tactic the technique is found under
     */
    public clearAnnotations(technique: Technique, tactic: Tactic): void {
        this.viewModel.getTechniqueVM(technique, tactic).resetAnnotations();
    }

    /**
     * Close the layer upgrade sidebar
     */
    public closeSidebar(): void {
        this.viewModel.sidebarOpened = !this.viewModel.sidebarOpened;
        this.viewModel.sidebarContentType = '';
    }
}