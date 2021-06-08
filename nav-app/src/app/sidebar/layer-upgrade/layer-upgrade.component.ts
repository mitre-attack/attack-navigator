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
    public showAnnotatedOnly: boolean = false;
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

    public isAnnotated(id: string): boolean {
        let tvm = this.compareTo.getTechniqueVM_id(id);
        if (tvm && tvm.annotated()) return true;
        return false;
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
                    if (this.getIDs(object).some(id => annotatedIDs.includes(id))) return true;
                    else return false;
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

    public reviewedChanged(id: string, unselect?: boolean) {
        if (this.isReviewed(id) || unselect) {
            this.reviewed.delete(id);
        } else {
            this.reviewed.add(id);
        }
    }

    public getClass() {
        let style = 'link noselect cell';
        if (this.viewModel.layout.showID) style += " showID";
        if (this.viewModel.layout.showName) style += " showName"
        return style;
    }

    public getIDs(object: Technique) {
        let ids = object.get_all_technique_tactic_ids()
        return ids
    }

    public getSectionTactics(section: string) {
        let tactics = new Set();
        let objects: Technique[] = this.applyFilter()[section];
        for(let object of objects) {
            if (object.tactics) object.tactics.forEach(tactics.add, tactics);
        }
        return tactics;
    }

    public getTacticObjects(section: string, tactic: string) {
        let objectIDs = [];
        let sectionObjects = this.changelog[section];
        for (let object of sectionObjects) {
            let ids = this.getIDs(object);
            for (let id of ids) {
                if (id.includes(tactic)) objectIDs.push(id);
            }
        }
        return objectIDs;
    }

    public allSelected(section: string) {
        let objectIDs = [];
        for (let object of this.changelog[section]) {
            this.getIDs(object).forEach(id => objectIDs.push(id));
        }
        return objectIDs.every(id => this.reviewed.has(id));
    }

    public selectAllChanged(section: string) {
        if (this.allSelected(section)) {
            // unselect all
            for (let object of this.changelog[section]) {
                this.getIDs(object).forEach(id => { this.reviewedChanged(id, true); })
            }
        } else {
            // select all
            for (let object of this.changelog[section]) {
                this.getIDs(object).forEach(id => {this.reviewed.add(id)});
            }
        }
    }

    public getTactic(id: string, vm: ViewModel) {
        let shortname = vm.getTechniqueVM_id(id).tactic;
        let domain = this.dataService.getDomain(vm.domainID);
        let tactics = [];
        for (let matrix of domain.matrices) {
            tactics = tactics.concat(matrix.tactics);
        }
        return tactics.find(t => t.shortname == shortname);
    }

    public getTechnique(id: string, vm: ViewModel) {
        let technique_id = vm.getTechniqueVM_id(id).techniqueID;
        let domain = this.dataService.getDomain(vm.domainID);
        let techniques = domain.techniques.concat(domain.subtechniques);
        return techniques.find(t => t.attackID == technique_id);
    }

    public getMatrix(id: string, vm: ViewModel) {
        let domain = this.dataService.getDomain(vm.domainID);
        for (let matrix of domain.matrices) {
            for (let tactic of matrix.tactics) {
                if (tactic.techniques.includes(this.getTechnique(id, vm))) return matrix;
            }
        }
        return;
    }

    public onTechniqueHighlight(event: any, technique: Technique, tactic: Tactic) {
        this.viewModel.highlightTechnique(technique, tactic);
    }
    public onTechniqueUnhighlight(event: any) {
        this.viewModel.clearHighlight();
    }

    public copyAnnotations(id: string) {
        this.reviewedChanged(id);
    }

    public undoCopy(id: string) {
        this.reviewedChanged(id);
    }
}
