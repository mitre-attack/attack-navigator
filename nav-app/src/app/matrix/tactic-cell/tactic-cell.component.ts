import { Component, OnInit, Input } from '@angular/core';
import { Technique, Tactic } from '../../data.service';
import { ViewModel } from '../../viewmodels.service';

@Component({
  selector: 'tactic-cell',
  templateUrl: './tactic-cell.component.html',
  styleUrls: ['./tactic-cell.component.scss']
})
export class TacticCellComponent implements OnInit {
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;

    constructor() { }

    ngOnInit() {
    }
}
