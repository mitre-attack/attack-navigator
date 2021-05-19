import { Component, Input, OnInit } from '@angular/core';
import { ViewModel } from '../../viewmodels.service';
import { BaseStix, DataService, Technique, VersionChangelog } from '../../data.service';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss']
})
export class LayerUpgradeComponent implements OnInit {
    @Input() changelog: VersionChangelog<BaseStix>;
    @Input() viewModel: ViewModel;
    public showUnannotated: boolean = false;
    public sections: string[] = [
        "additions", "changes", "minor_changes",
        "deprecations", "revocations"
    ];
    public updated: BaseStix[] = [];
    public object_updated: boolean = false;

    constructor(public dataService: DataService) { }

    ngOnInit(): void {
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

    public getIDs(object: Technique) {
        let ids = object.get_all_technique_tactic_ids()
        return ids
        // getTechniqueVM_id
    }
}
