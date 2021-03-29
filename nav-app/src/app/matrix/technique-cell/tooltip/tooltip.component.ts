import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Technique, Tactic, DataService, Note } from '../../../data.service';
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
    public notes: Note[];

    public get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(private element: ElementRef, private dataService: DataService) {
        super(element);
    }

    ngOnInit() {
        this.placement = this.getPosition();
        let domain = this.dataService.getDomain(this.viewModel.domainID);
        this.notes = domain.notes.filter(note => {
            return note.object_refs.includes(this.technique.id);
        });
    }
}
