import { Component, Input, OnInit } from '@angular/core';
import { ViewModel } from '../../viewmodels.service';
import { ConfigService } from '../../config.service';
import { DataService, Technique } from '../../data.service';
import { TechniqueCellComponent } from '../../matrix/technique-cell/technique-cell.component';

@Component({
    selector: 'changelog-cell',
    templateUrl: './changelog-cell.component.html',
    styleUrls: ['./changelog-cell.component.scss']
})
export class ChangelogCellComponent extends TechniqueCellComponent implements OnInit {
    @Input() compareTo?: Technique;
    @Input() compareToVM?: ViewModel;

    constructor(public configService: ConfigService, public dataService: DataService) {
        super(configService, dataService);
    }

    ngOnInit(): void {
    }

}
