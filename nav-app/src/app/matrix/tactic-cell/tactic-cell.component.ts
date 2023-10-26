import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Tactic } from '../../classes/stix';
import { ViewModel } from '../../classes';

@Component({
    selector: 'tactic-cell',
    templateUrl: './tactic-cell.component.html',
    styleUrls: ['./tactic-cell.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TacticCellComponent implements OnInit {
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;

    constructor() {
        // intentionally left blank
    }

    ngOnInit() {
        // intentionally left blank
    }
}
