import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../viewmodels.service';
import { DataService, Tactic, Technique, VersionChangelog } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DndDropEvent } from 'ngx-drag-drop';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayerUpgradeComponent implements OnInit {
    @Input() viewModel: ViewModel; // view model of new version
    @ViewChild('closeDialog') closeDialog : TemplateRef<any>;
    public closeDialogRef;

    public changelog: VersionChangelog;
    public compareTo: ViewModel; // view model of old version
    public showAnnotatedOnly: boolean = true; // filter
    public sections: string[] = [
        "additions", "changes", "minor_changes",
        "deprecations", "revocations", "unchanged"
    ];

    constructor(public dataService: DataService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.changelog = this.viewModel.versionChangelog;
        this.compareTo = this.viewModel.compareTo;
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
     * Counts the number of objects in the filtered changelog section
     * @param section name of the changelog section
     * @returns {number} number of objects shown in the given section
     */
    public sectionLength(section: string): number {
        if (this.showAnnotatedOnly) {
            return this.changelog[section].filter(attackID => this.anyAnnotated(attackID)).length;
        } else {
            return this.changelog[section].length;
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
        let object = this.getTechnique(attackID, vm, section);
        let domain = this.dataService.getDomain(vm.domainVersionID);
        return object.tactics.map(shortname => domain.tactics.find(t => t.shortname == shortname));
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
     * Marks all objects in the section as reviewed
     * @param section the name of the changelog section
     */
    public reviewAll(section: string): void {
        this.changelog[section].forEach(attackID => this.changelog.reviewed.add(attackID));
    }

    /**
     * Marks all objects in the section as not yet reviewed
     * @param section the name of the changelog section
     */
    public unreviewAll(section: string): void {
        this.changelog[section].forEach(attackID => this.changelog.reviewed.delete(attackID));
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
     * Are all objects in the changelog section marked as reviewed?
     * @param section the name of the changelog section
     * @returns {boolean} true if all objects are marked as reviewed
     */
    public allReviewed(section: string): boolean {
        return this.changelog[section].every(attackID => this.changelog.reviewed.has(attackID));
    }

    /**
     * Are any of the objects in the changelog section marked as reviewed?
     * @param section the name of the changelog section
     * @returns {boolean} true if at least one object is marked as reviewed
     */
    public anyReviewed(section: string): boolean {
        return this.changelog[section].some(attackID => this.changelog.reviewed.has(attackID));
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
     * @param object the technique in the old version
     * @param tactic the tactic the technique is found under
     * @param vm the view model
     * @returns true if the TechniqueVM is annotated
     */
    public isAnnotated(object: Technique, tactic: Tactic, vm: ViewModel): boolean {
        return vm.getTechniqueVM(object, tactic).annotated();
    }

    /**
     * Determine if the annotations of the technique under the given tactic
     * in the old version have been copied to the new version
     * @param object the technique in the old version
     * @param tactic the tactic the technique is found under
     * @returns {boolean} true if the annotations have been copied to the
     * object in the new version
     */
    public isCopied(object: Technique, tactic: Tactic): boolean {
        if (this.changelog.copied.has(object.get_technique_tactic_id(tactic))) return true;
        else return false;
    }

    /**
     * Copy the annotations from the TechniqueVM in the old version
     * to the TechniqueVM in the new version
     * @param attackID the ATT&CK ID of the technique
     * @param tactic the tactic the technique is found under
     */
    public onCopy(attackID: string, tactic: Tactic): void {
        // mark as not reviewed during changes
        this.changelog.reviewed.delete(attackID);

        // retrieve relevant technique VMs
        let fromTechnique = this.getTechnique(attackID, this.compareTo);
        let toTechnique = this.getTechnique(attackID, this.viewModel);
        let fromTvm = this.compareTo.getTechniqueVM(fromTechnique, tactic);
        let toTvm = this.viewModel.getTechniqueVM(toTechnique, tactic);

        // copy annotations
        let rep = fromTvm.serialize();
        toTvm.deSerialize(rep, attackID, tactic.shortname);
        fromTvm.enabled = false;

        // mark as copied
        this.changelog.copied.add(fromTechnique.get_technique_tactic_id(tactic));

        // mark as reviewed if all are copied
        if (fromTechnique.get_all_technique_tactic_ids().every(id => this.changelog.copied.has(id))) this.changelog.reviewed.add(attackID);
    }

    /**
     * Re-enable the annotations from the TechniqueVM in the old version and
     * reset the annotations from the new version
     * @param attackID the ATT&CK ID of the technique
     * @param tactic the tactic the technique is found under
     */
    public onRevertCopy(attackID: string, tactic: Tactic): void {
        // mark as not reviewed during changes
        this.changelog.reviewed.delete(attackID)

        // retrieve relevant technique VMs
        let fromTechnique = this.getTechnique(attackID, this.compareTo);
        let toTechnique = this.getTechnique(attackID, this.viewModel);
        let fromTvm = this.compareTo.getTechniqueVM(fromTechnique, tactic);
        let toTvm = this.viewModel.getTechniqueVM(toTechnique, tactic);

        // reset new technique's annotations
        toTvm.resetAnnotations();
        fromTvm.enabled = true;

        // unmark as copied
        this.changelog.copied.delete(fromTechnique.get_technique_tactic_id(tactic));

        // mark as not reviewed if not all are copied
        if (!fromTechnique.get_all_technique_tactic_ids().every(id => this.changelog.copied.has(id))) this.changelog.reviewed.delete(attackID);
    }

    /**
     * Copy the annotations from the TechniqueVM in the old version
     * to the TechniqueVM that the element was dropped over
     * @param event the ngx drop event
     * @param attackID the ATT&CK ID of the technique
     * @param toTechnique the technique object to copy annotations to
     * @param toTactic the tactic object to copy annotations to
     */
    public onDrop(event: DndDropEvent, attackID: string, toTechnique: Technique, toTactic: Tactic): void {
        // retrieve relevant technique VMs
        let fromDomain = this.dataService.getDomain(this.compareTo.domainVersionID);
        let fromTactic = fromDomain.tactics.find(t => t.shortname == event.data);
        let fromTechnique = this.getTechnique(attackID, this.compareTo);
        let fromTvm = this.compareTo.getTechniqueVM(fromTechnique, fromTactic);
        let toTvm = this.viewModel.getTechniqueVM(toTechnique, toTactic);

        // copy annotations
        let rep = fromTvm.serialize();
        toTvm.resetAnnotations();
        toTvm.deSerialize(rep, attackID, toTactic.shortname);
    }

    /**
     * Remove all annotations from the VM
     * @param object the technique object to remove annotations from
     * @param tactic the tactic the technique is found under
     */
    public clearAnnotations(object: Technique, tactic: Tactic): void {
        this.viewModel.getTechniqueVM(object, tactic).resetAnnotations();
    }

    /**
     * Retrieve the total count of the techniques currently shown in
     * the layer upgrade UI
     * @returns the number of techniques currently shown
     */
    public totalCount(): number {
        if (!this.showAnnotatedOnly) return this.changelog.length();
        
        let annotated = [];
        for (let s of this.sections) {
            for (let id of this.changelog[s]) {
                if (this.anyAnnotated(id)) annotated.push(id);
            }
        }
        return annotated.length;
    }

    /**
     * Retrieve the number of techniques currently shown in
     * the layer upgrade UI that have been marked as reviewed
     * @returns the number of reviewed techniques currently shown
     */
    public updatedCount(): number {
        if (!this.showAnnotatedOnly) return this.changelog.reviewed.size;

        let annotated = [];
        for (let id of this.changelog.reviewed) {
            if (this.anyAnnotated(id)) annotated.push(id);
        }
        return annotated.length;
    }

    /**
     * Open the close dialog template
     */
     public openDialog(): void {
        this.closeDialogRef = this.dialog.open(this.closeDialog, {
            width: '350px',
            disableClose: true
        });
        let subscription = this.closeDialogRef.afterClosed().subscribe({
            next: (result) => {
                // close sidebar
                if (result) {
                    this.viewModel.sidebarOpened = !this.viewModel.sidebarOpened;
                    this.viewModel.sidebarContentType = '';
                }
            },
            complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
        });
    }
}