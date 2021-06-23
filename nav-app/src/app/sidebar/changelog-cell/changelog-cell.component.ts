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

    public get showTooltip(): boolean {
        if (this.viewModel.highlightedTechniques.size === 0 || !this.tactic) return false;
        let tvm = this.viewModel.getTechniqueVM(this.technique, this.tactic);
        if (!tvm.score && !tvm.aggregateScore && !tvm.comment) return false;
        return (this.viewModel.highlightedTechniques.has(this.technique.id) && this.viewModel.highlightedTactic && this.viewModel.highlightedTactic.id == this.tactic.id);
    }

    constructor(public configService: ConfigService, public dataService: DataService) {
        super(dataService);
    }

    ngOnInit(): void { }

    public highlight(): void {
        if (this.tactic) this.viewModel.highlightTechnique(this.technique, this.tactic);
    }

    public unhighlight(): void {
        if (this.tactic) this.viewModel.clearHighlight();
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
}
