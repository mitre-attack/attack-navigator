import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Technique, Tactic } from '../../data.service';
import { ViewModel } from '../../viewmodels.service';

@Component({
  selector: 'tactic-cell',
  templateUrl: './tactic-cell.component.html',
  styleUrls: ['./tactic-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TacticCellComponent implements OnInit {
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;

    constructor() { }

    ngOnInit() {
    }
}
