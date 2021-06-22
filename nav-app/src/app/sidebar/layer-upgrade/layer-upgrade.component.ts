import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../../viewmodels.service';
import { BaseStix, DataService, Tactic, Technique, VersionChangelog } from '../../data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayerUpgradeComponent implements OnInit {
    @Input() viewModel: ViewModel; // latest version viewmodel
    @ViewChild('closeDialog') closeDialog : TemplateRef<any>;
    public closeDialogRef;

    public changelog: VersionChangelog<BaseStix>;
    public compareTo: ViewModel; // view model of previous version
    public showAnnotatedOnly: boolean = true;
    public sections: string[] = [
        "additions", "changes", "minor_changes",
        "deprecations", "revocations", "unchanged"
    ];
    public reviewed = new Set();

    constructor(public dataService: DataService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.changelog = this.viewModel.versionChangelog;
        this.compareTo = this.viewModel.compareTo;
    }

    public applyFilter(): VersionChangelog<BaseStix> {
        if (this.showAnnotatedOnly) {
            // find annotated techniques
            let annotatedIDs = [];
            for (let [id, tvm] of this.compareTo.techniqueVMs) {
                if (tvm.annotated()) annotatedIDs.push(id);
            }

            // filter changelog sections
            let changelog_filter = new VersionChangelog<BaseStix>(this.compareTo.version, this.viewModel.version);
            for (let section of this.sections) {
                let filtered = this.changelog[section].filter(object => {
                    // let relatedObject = this.getRelatedObjectID(object, section, )
                    if (section !== 'revocations') {
                        if (this.getIDs(object).some(id => annotatedIDs.includes(id))) return true;
                        else return false;
                    } else {
                        let revokedObject = this.getRevokedTechnique(object);
                        if (this.getIDs(revokedObject).some(id => annotatedIDs.includes(id))) return true;
                        else return false;
                    }
                })
                changelog_filter[section] = filtered;
            }
            return changelog_filter;
        } else {
            return this.changelog;
        }
    }

    public getHeader(header: string): string {
        return header.split(/[_-]+/).map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }

    public version(version: string): string {
        return version.match(/v[0-9]/g)[0].toLowerCase();
    }

    public openDialog(): void {
        this.closeDialogRef = this.dialog.open(this.closeDialog, {
            width: '350px',
            disableClose: true
        });
        let subscription = this.closeDialogRef.afterClosed().subscribe({
            next: (result) => {
                // close sidebar
                if (result) this.viewModel.sidebarOpened = !this.viewModel.sidebarOpened;
            },
            complete: () => { if (subscription) subscription.unsubscribe(); } //prevent memory leaks
        });
    }

    public isReviewed(id: string): boolean {
        return this.reviewed.has(id);
    }

    public markAsReviewed(id: string) {
        this.reviewed.add(id);
    }

    public unmarkAsReviewed(id: string) {
        this.reviewed.delete(id);
    }

    public reviewedChanged(id: string) {
        if (this.isReviewed(id)) {
            this.unmarkAsReviewed(id);
        } else {
            this.markAsReviewed(id);
        }
    }

    public getIDs(object: Technique) {
        let ids = object.get_all_technique_tactic_ids()
        return ids
    }

    public getSectionTactics(section: string) {
        let tactics = [];
        let domain = this.dataService.getDomain(this.viewModel.domainID);
        for (let matrix of domain.matrices) {
            tactics = tactics.concat(matrix.tactics);
        }
        tactics = tactics.map(t => t.shortname);
        tactics = tactics.filter(t => this.getTacticObjects(section, t).length);

        return tactics;
    }

    public getTacticObjects(section: string, tactic: string): Technique[] {
        let objects = [];
        let sectionObjects: Technique[] = this.applyFilter()[section];
        for (let object of sectionObjects) {
            if (object.tactics && object.tactics.includes(tactic)) objects.push(object);
        }
        return objects;
    }

    public getRelatedObjectID(object: Technique, section: string, tactic: string): string {
        // check if object has no related object
        if (!['changes', 'minor_changes', 'revocations', 'unchanged'].includes(section)) return;

        let prevTechniques: Technique[];
        let domain = this.dataService.getDomain(this.compareTo.domainID);
        if (object.isSubtechnique) prevTechniques = domain.subtechniques;
        else prevTechniques = domain.techniques;

        // find related object
        let prevObject = prevTechniques.find(t => t.attackID === object.attackID);
        if (prevObject.tactics.includes(tactic)) return prevObject.get_technique_tactic_id(tactic);
        return;
    }

    public allSelected(section: string): boolean {
        let objectIDs = [];
        for (let object of this.changelog[section]) {
            if (['deprecations', 'revocations'].includes(section)) objectIDs.push(object.id);
            else this.getIDs(object).forEach(id => objectIDs.push(id));
        }
        return objectIDs.every(id => this.reviewed.has(id));
    }

    public selectAllChanged(section: string): void {
        if (this.allSelected(section)) {
            // unselect all
            for (let object of this.changelog[section]) {
                if (['deprecations', 'revocations'].includes(section)) this.unmarkAsReviewed(object.id)
                else this.getIDs(object).forEach(id => { this.unmarkAsReviewed(id); })
            }
        } else {
            // select all
            for (let object of this.changelog[section]) {
                if (['deprecations', 'revocations'].includes(section)) this.markAsReviewed(object.id);
                this.getIDs(object).forEach(id => {this.markAsReviewed(id)});
            }
        }
    }

    public getTactic(id: string, isCurrent: boolean = true): Tactic {
        let vm = this.viewModel;
        if (!isCurrent) vm = this.compareTo;

        let shortname = vm.getTechniqueVM_id(id).tactic;
        let domain = this.dataService.getDomain(vm.domainID);
        let tactics = [];
        for (let matrix of domain.matrices) {
            tactics = tactics.concat(matrix.tactics);
        }
        return tactics.find(t => t.shortname == shortname);
    }

    public getTechnique(id: string, isCurrent: boolean = true): Technique {
        let vm = this.viewModel;
        if (!isCurrent) vm = this.compareTo;

        let technique_id = vm.getTechniqueVM_id(id).techniqueID;
        let domain = this.dataService.getDomain(vm.domainID);
        let techniques = domain.techniques.concat(domain.subtechniques);
        return techniques.find(t => t.attackID == technique_id);
    }

    public copyAll(): void {
        for (let section of this.sections) {
            for (let tactic of this.getSectionTactics(section)) {
                for (let object of this.getTacticObjects(section, tactic)) {
                    let id = object.get_technique_tactic_id(tactic);
                    let compareId = this.getRelatedObjectID(object, section, tactic);
                    this.copyAnnotations(id, compareId);
                }
            }
        }
    }

    public copyAnnotations(id: string, compareId: string): void {
        let tvm = this.viewModel.getTechniqueVM_id(id);
        if (tvm.annotated()) return;
        let toCopyTvm = this.compareTo.getTechniqueVM_id(compareId);

        // copy annotations from previous technique
        let rep = toCopyTvm.serialize();
        tvm.deSerialize(rep, id.split("^")[0], id.split("^")[1])

        // disable previous technique
        toCopyTvm.enabled = false;

        // mark as reviewed
        this.markAsReviewed(id);
    }

    public revertCopy(id: string, compareId: string): void {
        let tvm = this.viewModel.getTechniqueVM_id(id);
        let toCopyTvm = this.compareTo.getTechniqueVM_id(compareId);

        // reset current technique's annotations
        tvm.resetAnnotations();

        // re-enable previous technique
        toCopyTvm.enabled = true;

        // mark as not yet reviewed
        this.unmarkAsReviewed(id);
    }

    public disableCopy(id: string): boolean {
        if (!this.compareTo.getTechniqueVM_id(id).annotated()) return true;
        return false;
    }

    // get the object from the current version that the object is revoked by
    public revokedBy(object: Technique): Technique {
        let revokedByID = object.revoked_by(this.viewModel.domainID);
        let domain = this.dataService.getDomain(this.viewModel.domainID);
        let revokingObject = domain.subtechniques.find(t => t.id == revokedByID) || domain.techniques.find(t => t.id == revokedByID);
        return revokingObject;
    }

    // get the object from the past version that has been revoked
    public getRevokedTechnique(object: Technique): Technique {
        let domain = this.dataService.getDomain(this.compareTo.domainID);
        let revokedObject = domain.subtechniques.find(t => t.attackID == object.attackID) || domain.techniques.find(t => t.attackID == object.attackID);
        return revokedObject;
    }

    // BUG this will only return one technique-tactic-id that has been annotated
    public annotatedTactic(revokedObject: Technique): Tactic {
        for (let shortname of revokedObject.tactics) {
            let ttid = revokedObject.get_technique_tactic_id(shortname);
            let tvm = this.compareTo.getTechniqueVM_id(ttid);
            if (tvm.annotated()) {
                return this.getTactic(ttid, false);
            }
        }
        return;
    }
}
