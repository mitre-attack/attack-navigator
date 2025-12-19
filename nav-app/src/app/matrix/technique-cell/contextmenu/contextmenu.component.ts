import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewEncapsulation } from '@angular/core';
import { ContextMenuItem, Link, TechniqueVM, ViewModel } from '../../../classes';
import { Technique, Tactic } from '../../../classes/stix';
import { ViewModelsService } from '../../../services/viewmodels.service';
import { ConfigService } from '../../../services/config.service';
import { CellPopover } from '../cell-popover';
import { NgClass, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-contextmenu',
    templateUrl: './contextmenu.component.html',
    styleUrls: ['./contextmenu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgClass, NgIf, NgFor],
})
export class ContextmenuComponent extends CellPopover implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    public placement: string;
    @Output() close = new EventEmitter<any>();

    public get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    public get links(): Link[] {
        return this.techniqueVM.links;
    }

    constructor(
        private element: ElementRef,
        public configService: ConfigService,
        public viewModelsService: ViewModelsService
    ) {
        super(element);
    }

    ngOnInit() {
        this.placement = this.getPosition();
    }

    public closeContextmenu() {
        this.close.emit();
    }

    public select() {
        this.viewModel.clearSelectedTechniques();
        this.viewModel.selectTechnique(this.technique, this.tactic);
        this.closeContextmenu();
    }

    public addSelection() {
        this.viewModel.selectTechnique(this.technique, this.tactic);
        this.closeContextmenu();
    }

    public removeSelection() {
        this.viewModel.unselectTechnique(this.technique, this.tactic);
        this.closeContextmenu();
    }

    public selectAll() {
        this.viewModel.selectAllTechniques();
        this.closeContextmenu();
    }

    public deselectAll() {
        this.viewModel.clearSelectedTechniques();
        this.closeContextmenu();
    }

    public invertSelection() {
        this.viewModel.invertSelection();
        this.closeContextmenu();
    }

    public selectAnnotated() {
        this.viewModel.selectAnnotated();
        this.closeContextmenu();
    }

    public selectUnannotated() {
        this.viewModel.selectUnannotated();
        this.closeContextmenu();
    }

    public selectAllInTactic() {
        this.viewModel.selectAllTechniquesInTactic(this.tactic);
        this.closeContextmenu();
    }

    public deselectAllInTactic() {
        this.viewModel.unselectAllTechniquesInTactic(this.tactic);
        this.closeContextmenu();
    }

    public viewTechnique() {
        window.open(this.technique.url, '_blank');
        this.closeContextmenu();
    }

    public viewTactic() {
        window.open(this.tactic.url, '_blank');
        this.closeContextmenu();
    }

    public pinCell() {
        this.viewModelsService.pinnedCell =
            this.viewModelsService.pinnedCell === this.techniqueVM.technique_tactic_union_id ? '' : this.techniqueVM.technique_tactic_union_id;
        this.closeContextmenu();
    }

    public openCustomContextMenuItem(customItem: ContextMenuItem) {
        window.open(customItem.getReplacedURL(this.technique, this.tactic), '_blank');
        this.closeContextmenu();
    }

    public openLink(link: Link) {
        window.open(link.url);
        this.closeContextmenu();
    }
}
