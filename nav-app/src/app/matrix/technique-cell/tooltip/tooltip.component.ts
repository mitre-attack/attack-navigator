import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Technique, Tactic } from '../../../data.service';
import { ViewModel, TechniqueVM } from '../../../viewmodels.service';
import { CellPopover } from '../cell-popover';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent extends CellPopover implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    public placement: string;

    public get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(private element: ElementRef) {
        super(element);
    }

    ngOnInit() {
        this.placement = this.getPosition();
    }

}
