import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Technique, Tactic, Note } from '../../../classes/stix';
import { ViewModel, TechniqueVM } from '../../../classes';
import { ViewModelsService } from '../../../services/viewmodels.service';
import { CellPopover } from '../cell-popover';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgClass, NgIf, MatTooltip, MatIcon, NgFor],
})
export class TooltipComponent extends CellPopover implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    public placement: string;
    public notes: Note[];

    public get isCellPinned(): boolean {
        return this.viewModelsService.pinnedCell === this.techniqueVM.technique_tactic_union_id;
    }

    public get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(
        public element: ElementRef,
        public dataService: DataService,
        public viewModelsService: ViewModelsService
    ) {
        super(element);
    }

    ngOnInit() {
        this.placement = this.getPlacement();
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
        this.notes = domain.notes.filter((note) => {
            return note.object_refs.includes(this.technique.id);
        });
    }

    public getPlacement(): string {
        return this.getPosition();
    }

    public unpin(): void {
        this.viewModelsService.pinnedCell = '';
    }
}
