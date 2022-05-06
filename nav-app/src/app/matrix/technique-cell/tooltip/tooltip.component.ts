import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { Technique, Tactic, DataService, Note } from '../../../data.service';
import { ViewModel, TechniqueVM, ViewModelsService } from '../../../viewmodels.service';
import { CellPopover } from '../cell-popover';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TooltipComponent extends CellPopover implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    public placement: string;
    public notes: Note[];

    public get isCellPinned(): boolean {
        return this.viewModelsService.pinnedCell === this.techniqueVM.technique_tactic_union_id
    }

    public get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(private element: ElementRef, private dataService: DataService, private viewModelsService: ViewModelsService) {
        super(element);
    }

    ngOnInit() {
        this.placement = this.getPosition();
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
        this.notes = domain.notes.filter(note => {
            return note.object_refs.includes(this.technique.id);
        });
    }
}
