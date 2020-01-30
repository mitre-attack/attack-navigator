import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Technique, Tactic } from '../../../data.service';
import { ViewModel, TechniqueVM } from '../../../viewmodels.service';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit {
    @Input() technique: Technique;
    @Input() tactic: Tactic;
    @Input() viewModel: ViewModel;
    @Input() placement: string;
    @Output() close = new EventEmitter<any>();

    private get techniqueVM(): TechniqueVM {
        return this.viewModel.getTechniqueVM(this.technique, this.tactic);
    }

    constructor(private configService: ConfigService) { }

    ngOnInit() {
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
