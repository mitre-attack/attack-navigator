import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ViewModelsService } from '../../services/viewmodels.service';
import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';
import { Cell } from '../../matrix/cell';
import { NgStyle, NgClass } from '@angular/common';

@Component({
    selector: 'changelog-cell',
    templateUrl: './changelog-cell.component.html',
    styleUrls: ['./changelog-cell.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgStyle, NgClass],
})
export class ChangelogCellComponent extends Cell {
    @Input() isCurrentVersion?: boolean = true;
    @Input() isDraggable?: boolean = false;
    @Input() section: string;

    constructor(
        public configService: ConfigService,
        public dataService: DataService,
        public viewModelsService: ViewModelsService
    ) {
        super(dataService, configService);
    }

    /**
     * Highlight the moused over technique
     */
    public highlight(): void {
        if (this.isCurrentVersion) {
            this.viewModel.highlightTechnique(this.technique, this.tactic);
        }
    }

    /**
     * Clear the technique highlight
     */
    public unhighlight(): void {
        if (this.isCurrentVersion) this.viewModel.clearHighlight();
    }

    /**
     * Select or unselect this technique
     */
    public onClick(): void {
        if (this.isCurrentVersion) {
            // unselect technique
            if (this.viewModel.isTechniqueSelected(this.technique, this.tactic)) {
                this.viewModel.unselectTechnique(this.technique, this.tactic);
            }
            // select technique
            else {
                this.viewModel.clearSelectedTechniques();
                this.viewModel.selectTechnique(this.technique, this.tactic);
            }
            this.viewModelsService.selectionChanged(); // emit selection change
        }
    }

    /**
     * Retrieve css classes for this technique
     */
    public getClass(): string {
        let theclass = super.getClass();
        if (!this.isCurrentVersion && !this.isDraggable) {
            theclass += ' nopointer';
        }
        if (this.section == 'additions' || this.section == 'deprecations') {
            theclass += ' setwidth';
        }
        return theclass;
    }
}
