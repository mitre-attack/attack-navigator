import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';
import { DataService } from '../../data.service';
import { Cell } from '../../matrix/cell';

@Component({
    selector: 'changelog-cell',
    templateUrl: './changelog-cell.component.html',
    styleUrls: ['./changelog-cell.component.scss']
})
export class ChangelogCellComponent extends Cell implements OnInit {
    @Input() isCurrentVersion?: boolean = true;
    @Input() isDraggable?: boolean = false;
    @Input() section: string;

    constructor(public configService: ConfigService, public dataService: DataService) {
        super(dataService);
    }

    ngOnInit(): void { }

    public highlight(): void {
        if (this.isCurrentVersion && this.tactic) this.viewModel.highlightTechnique(this.technique, this.tactic);
    }

    public unhighlight(): void {
        if (this.isCurrentVersion && this.tactic) this.viewModel.clearHighlight();
    }

    public onClick(): void {
        if (this.isCurrentVersion && this.tactic) {
            // unselect technique
            if (this.viewModel.isTechniqueSelected(this.technique, this.tactic)) {
                this.viewModel.unselectTechnique(this.technique, this.tactic);
            }
            // select technique
            else {
                this.viewModel.selectTechnique(this.technique, this.tactic);
            }
        }
    }

    public getClass(): string {
        let theclass = super.getClass();
        if (!this.isCurrentVersion && !this.isDraggable) {
            theclass += " nopointer";
        }
        if (this.section == 'additions' || this.section == 'deprecations') {
            theclass += " setwidth";
        }
        return theclass;
    }
}
