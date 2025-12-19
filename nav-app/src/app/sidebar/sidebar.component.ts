import { Component, Input, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { ViewModel } from '../classes';
import { NgIf } from '@angular/common';
import { SearchAndMultiselectComponent } from '../search-and-multiselect/search-and-multiselect.component';
import { LayerUpgradeComponent } from '../layer-upgrade/layer-upgrade.component';
import { LayerSettingsComponent } from '../layer-settings/layer-settings.component';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [NgIf, SearchAndMultiselectComponent, LayerUpgradeComponent, LayerSettingsComponent],
})
export class SidebarComponent implements OnChanges {
    @Input() viewModel: ViewModel;
    public reloadToggle: boolean = true;

    constructor(public dataService: DataService) {}

    ngOnChanges(): void {
        this.reloadToggle = false;
        setTimeout(() => (this.reloadToggle = true));
    }
}
