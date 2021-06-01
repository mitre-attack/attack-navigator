import { Component, Input, OnInit } from '@angular/core';
import { ViewModel } from '../../viewmodels.service';
import { BaseStix, DataService, Tactic, Technique, VersionChangelog } from '../../data.service';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss']
})
export class LayerUpgradeComponent implements OnInit {
    @Input() viewModel: ViewModel; // latest version viewmodel
    public changelog: VersionChangelog<BaseStix>;
    public compareTo: ViewModel; // view model of previous version
    public showUnannotated: boolean = true;
    public sections: string[] = [
        "additions", "changes", "minor_changes",
        "deprecations", "revocations"
    ];
    public reviewed: string[] = [];

    constructor(public dataService: DataService) { }

    ngOnInit(): void {
        this.changelog = this.viewModel.versionChangelog;
        this.compareTo = this.viewModel.compareTo;
        this.filterObjects();
    }

    public filterObjects() {
    }

    public sectionHeader(section: string): string {
        return section.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }

    public version(version: string): string {
        return version.match(/v[0-9]/g)[0].toLowerCase();
    }

    public upgradeLayer(): void {
        // close sidebar
        this.viewModel.sidebarOpened = !this.viewModel.sidebarOpened;
    }

    public isReviewed(id: string): boolean {
        return this.reviewed.includes(id);
    }

    public reviewedChanged(id: string) {
        if (this.isReviewed(id)) {
            let i = this.reviewed.indexOf(id);
            if (i >= 0) this.reviewed.splice(i, 1);
        } else {
            this.reviewed.push(id);
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
