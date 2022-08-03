import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Technique, Tactic, Matrix, DataService } from '../../data.service';
import { ConfigService } from '../../config.service';
import { Cell } from '../cell';
import { ViewModelsService } from '../../viewmodels.service';

@Component({
    selector: 'technique-cell',
    templateUrl: './technique-cell.component.html',
    styleUrls: ['./technique-cell.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TechniqueCellComponent extends Cell implements OnInit {
    @Input() matrix: Matrix;
    @Output() highlight = new EventEmitter<any>(); // emit with the highlighted technique, or null to unhighlight
    @Output() unhighlight = new EventEmitter<any>();
    @Output() leftclick = new EventEmitter<any>(); // emit with the selected technique and the modifier keys

    public get isCellPinned(): boolean {
        return this.viewModelsService.pinnedCell === this.viewModel.getTechniqueVM(this.technique, this.tactic).technique_tactic_union_id
    }

    public get showTooltip(): boolean {
        if (this.isCellPinned) return true;
        if (this.showContextmenu) return false;
        if (this.viewModel.highlightedTechniques.size === 0) return false;

        return (this.viewModel.highlightedTechnique === this.technique && this.viewModel.highlightedTactic && this.viewModel.highlightedTactic.id === this.tactic.id);
    }

    constructor(public dataService: DataService, public configService: ConfigService, public viewModelsService: ViewModelsService) {
        super(dataService, configService);
    }

    ngOnInit() {}

    // count number of annotated sub-techniques on this technique
    public annotatedSubtechniques() {
        let annotatedSubs: Technique[] = []
        for (let s of this.technique.subtechniques) {
            let subVM = this.viewModel.getTechniqueVM(s, this.tactic);
            if (subVM.annotated()) annotatedSubs.push(s);
        }
        return this.applyControls(annotatedSubs, this.tactic).length;
    }

    // sort and filter techniques
    public applyControls(techniques: Technique[], tactic: Tactic): Technique[] {
        return this.viewModel.applyControls(techniques, tactic, this.matrix)
    }

    // events to pass to parent component
    public onMouseEnter() {
        this.highlight.emit();
    }
    public onMouseLeave() {
        this.unhighlight.emit();
    }
    public onLeftClick(event) {
        if (!this.isCellPinned) this.viewModelsService.pinnedCell = "";
        if (this.configService.getFeature("selecting_techniques")) this.leftclick.emit({
                "technique": this.technique,
                // modifier keys
                "shift": event.shiftKey,
                "ctrl": event.ctrlKey,
                "meta": event.metaKey,
                // position of event on page
                "x": event.pageX,
                "y": event.pageY
            });
        else this.onRightClick(event);
    }
    public onRightClick(event) {
        if (!this.isCellPinned) this.viewModelsService.pinnedCell = "";
        this.showContextmenu = true;
    }

    // return css classes for a technique
    public getClass(): string {
        let theclass = super.getClass();

        // classes by annotated sub-techniques
        if (!this.annotatedSubtechniques())
            theclass += " unannotated"

        if (this.isCellPinned) theclass += " editing";

        return theclass;
    }
}

export class TechniqueEvent {
    public readonly event: Event;
    public readonly technique: Technique;
    constructor(event, technique) {
        this.technique = technique;
        this.event = event;
    }
}
