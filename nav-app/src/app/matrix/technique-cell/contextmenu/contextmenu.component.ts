import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Technique, Tactic } from '../../../data.service';
import { ViewModel, TechniqueVM } from '../../../viewmodels.service';
import { ConfigService, ContextMenuItem } from '../../../config.service';
import { CellPopover } from '../cell-popover';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent extends CellPopover implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    public placement: string;
    @Output() close = new EventEmitter<any>();

    private get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(private element: ElementRef, public configService: ConfigService) {
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

    public selectAllInTactic(){
        this.viewModel.selectAllTechniquesInTactic(this.tactic);
        this.closeContextmenu();
    }

    public deselectAllInTactic(){
        this.viewModel.unselectAllTechniquesInTactic(this.tactic);
        this.closeContextmenu();
    }

    public viewTechnique() {
        window.open(this.technique.url, "_blank");
        this.closeContextmenu();
    }

    public viewTactic() {
        window.open(this.tactic.url, "_blank");
        this.closeContextmenu();
    }

    public openCustomContextMenuItem(customItem: ContextMenuItem) {
        window.open(customItem.getReplacedURL(this.technique, this.tactic), "_blank");
        this.closeContextmenu();
    }
}
