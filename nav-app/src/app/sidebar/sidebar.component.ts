import { Component, Input, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { ViewModel } from '../classes';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
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
