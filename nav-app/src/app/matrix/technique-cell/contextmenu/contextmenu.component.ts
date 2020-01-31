import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Technique, Tactic } from '../../../data.service';
import { ViewModel, TechniqueVM } from '../../../viewmodels.service';
import { ConfigService } from '../../../config.service';
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
    private placement: string;
    @Output() close = new EventEmitter<any>();

    private get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(private element: ElementRef, private configService: ConfigService) {
        super(element);
    }

    ngOnInit() {
        this.placement = this.getPosition();
    }

    private closeContextmenu() {
        this.close.emit();
    }

    private select() {
        this.viewModel.clearSelectedTechniques();
        this.viewModel.selectTechnique(this.technique, this.tactic);
    }

    private addSelection() {
        this.viewModel.selectTechnique(this.technique, this.tactic);
    }

    private removeSelection() {
        this.viewModel.unselectTechnique(this.technique, this.tactic);
    }

    private selectAll() {
        this.viewModel.selectAllTechniques();
    }

    private deselectAll() {
        this.viewModel.clearSelectedTechniques()
    }

    private invertSelection() {
        this.viewModel.invertSelection();
    }

    private viewTechnique() {
        window.open(this.technique.url, "_blank");
    }
}
