import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ViewModel } from '../viewmodels.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() viewModel?: ViewModel;

    constructor(public dataService: DataService) { }

    ngOnInit(): void {
    }

}
