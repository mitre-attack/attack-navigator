import { Component, OnInit, Input } from '@angular/core';
import { Technique, Tactic } from '../../../data.service';
import { ViewModel, TechniqueVM } from '../../../viewmodels.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    @Input() placement: string;

    private get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor() {}

    ngOnInit() {}

}
