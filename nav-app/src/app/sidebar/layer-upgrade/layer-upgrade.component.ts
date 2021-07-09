import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../../viewmodels.service';
import { DataService, Tactic, Technique, VersionChangelog } from '../../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayerUpgradeComponent implements OnInit {
    @Input() viewModel: ViewModel; // view model of latest version
    @ViewChild('closeDialog') closeDialog : TemplateRef<any>;
    public closeDialogRef;

    public changelog: VersionChangelog;
    public compareTo: ViewModel; // view model of previous version
    public showAnnotatedOnly: boolean = true; // filter
    public sections: string[] = [
        "additions", "changes", "minor_changes",
        "deprecations", "revocations", "unchanged"
    ];
    public reviewed = new Set();
    public copied = new Set();

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
     * Get the version number from the domain ID
     * @param domainID the domain ID
     * @returns {string} the version number
     */    
    public version(domainID: string): string {
        return domainID.match(/v[0-9]/g)[0].toLowerCase();
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
        let domain = this.dataService.getDomain(vm.domainID);
        let all_techniques = domain.techniques.concat(domain.subtechniques);
        let technique = all_techniques.find(t => t.attackID == attackID);

        if (section == 'revocations' && this.viewModel.version == vm.version) {
            // get revoking object
            let revokedByID = technique.revoked_by(vm.domainID);
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
        let domain = this.dataService.getDomain(vm.domainID);
        return object.tactics.map(shortname => domain.tactics.find(t => t.shortname == shortname));
    }

    /**
     * Determine if the lists of tactics between the technique in the latest version and
     * previous version are the same
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
        return this.reviewed.has(attackID);
    }

    /**
     * Marks or unmarks a single given technique as reviewed
     * @param attackID the ATT&CK ID of the technique
     */
    public reviewedChanged(attackID: string): void {
        if (this.isReviewed(attackID)) {
            this.reviewed.delete(attackID);
        } else {
            this.reviewed.add(attackID);
        }
    }

    /**
     * Determine if all objects in the changelog section have been marked as reviewed
     * @param section the name of the changelog section
     * @returns {boolean} true if all objects are marked as reviewed
     */
    public allReviewed(section: string): boolean {
        return this.changelog[section].every(attackID => this.reviewed.has(attackID));
    }

    /**
     * Marks or unmarks all objects in the changelog section as reviewed
     * @param section the name of the changelog section
     */
    public reviewAllChanged(section: string): void {
        if (this.allReviewed(section)) {
            this.changelog[section].forEach(attackID => this.reviewed.delete(attackID));
        } else {
            this.changelog[section].forEach(attackID => this.reviewed.add(attackID));
        }
    }

    /**
     * Determine if any techniqueVM in the previous version with the given
     * ATT&CK ID has annotations
     * @param attackID the ATT&CK ID of the technique
     * @returns {boolean} true if any TechniqueVM for this technique is annotated
     */
     public anyAnnotated(attackID: string): boolean {
        let prevTechnique = this.getTechnique(attackID, this.compareTo);
        if (prevTechnique) {
            let technique_tactic_ids = prevTechnique.get_all_technique_tactic_ids();

            for (let id of technique_tactic_ids) {
                if (this.compareTo.getTechniqueVM_id(id).annotated()) return true;
            }
        }
        return false;
    }

    /**
     * Is the TechniqueVM for this technique-tactic annotated?
     * @param object the technique in the previous version
     * @param tactic the tactic the technique is found under
     * @param vm the view model
     * @returns true if the TechniqueVM is annotated
     */
    public isAnnotated(object: Technique, tactic: Tactic, vm: ViewModel): boolean {
        return vm.getTechniqueVM(object, tactic).annotated();
    }

    /**
     * Determine if the annotations of the technique under the given tactic
     * in the previous version have been copied to the latest version
     * @param object the technique in the previous version
     * @param tactic the tactic the technique is found under
     * @returns {boolean} true if the annotations have been copied to the
     * object in the latest version
     */
    public isCopied(object: Technique, tactic: Tactic): boolean {
        if (this.copied.has(object.get_technique_tactic_id(tactic))) return true;
        else return false;
    }

    /**
     * Copy the annotations from the TechniqueVM in the previous version
     * to the TechniqueVM in the latest version
     * @param attackID the ATT&CK ID of the technique
     * @param tactic the tactic the technique is found under
     */
    public onCopy(attackID: string, tactic: Tactic): void {
        // mark as not reviewed during changes
        this.reviewed.delete(attackID);

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
        this.copied.add(fromTechnique.get_technique_tactic_id(tactic));

        // mark as reviewed if all are copied
        if (fromTechnique.get_all_technique_tactic_ids().every(id => this.copied.has(id))) this.reviewed.add(attackID);
    }

    /**
     * Re-enable the annotations from the TechniqueVM in the previous version and
     * reset the annotations from the latest version
     * @param attackID the ATT&CK ID of the technique
     * @param tactic the tactic the technique is found under
     */
    public onRevertCopy(attackID: string, tactic: Tactic): void {
        // mark as not reviewed during changes
        this.reviewed.delete(attackID)

        // retrieve relevant technique VMs
        let fromTechnique = this.getTechnique(attackID, this.compareTo);
        let toTechnique = this.getTechnique(attackID, this.viewModel);
        let fromTvm = this.compareTo.getTechniqueVM(fromTechnique, tactic);
        let toTvm = this.viewModel.getTechniqueVM(toTechnique, tactic);

        // reset new technique's annotations
        toTvm.resetAnnotations();
        fromTvm.enabled = true;

        // unmark as copied
        this.copied.delete(fromTechnique.get_technique_tactic_id(tactic));

        // mark as not reviewed if not all are copied
        if (!fromTechnique.get_all_technique_tactic_ids().every(id => this.copied.has(id))) this.reviewed.delete(attackID);
    }

    /**
     * Copy the annotations from the TechniqueVM in the previous version
     * to the TechniqueVM that the element was dropped over
     * @param event the ngx drop event
     * @param attackID the ATT&CK ID of the technique
     * @param toTechnique the technique object to copy annotations to
     * @param toTactic the tactic object to copy annotations to
     */
    public onDrop(event: DndDropEvent, attackID: string, toTechnique: Technique, toTactic: Tactic): void {
        // retrieve relevant technique VMs
        let fromDomain = this.dataService.getDomain(this.compareTo.domainID);
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