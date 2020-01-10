import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Technique, Tactic } from '../../data.service';
import { ViewModel } from '../../viewmodels.service';
import {ConfigService} from '../../config.service';

declare var tinycolor: any; //use tinycolor2

@Component({
    selector: 'technique-cell',
    templateUrl: './technique-cell.component.html',
    styleUrls: ['./technique-cell.component.scss']
})
export class TechniqueCellComponent implements OnInit {
    @Input() tactic: Tactic;
    @Input() technique: Technique;
    @Input() viewModel: ViewModel;
    @Output() highlight = new EventEmitter<any>(); // emit with the highlighted technique, or null to unhighlight
    @Output() unhighlight = new EventEmitter<any>();
    @Output() leftclick = new EventEmitter<any>(); // emit with the selected technique and the modifier keys
    @Output() rightclick = new EventEmitter<any>(); //emit with the technique which was right-clicked

    private get showTooltip() {
        if (!this.viewModel.highlightedTechnique) return false;
        
        if (!this.technique) console.log(this);
        if (!this.tactic) console.log(this);
        if (!this.viewModel.highlightedTactic) console.log('tac', this.technique.name);
        if (!this.viewModel.highlightedTechnique) console.log('tec', this.technique.name);

        return (this.viewModel.highlightedTechnique.id == this.technique.id && this.viewModel.highlightedTactic.id == this.tactic.id);
    }

    constructor(private configService: ConfigService) { }

    ngOnInit() {
    }

    // events to pass to parent component
    private onHighlight() {
        this.highlight.emit();
    }
    private onUnhighlight() {
        this.unhighlight.emit();
    }
    private onLeftClick(event) {
        this.leftclick.emit({
            "technique": this.technique,
            // modifier keys
            "shift": event.shiftKey,
            "ctrl": event.ctrlKey,
            "meta": event.metaKey,
            // position of event on page
            "x": event.pageX,
            "y": event.pageY
        })
    }
    private onRightClick(event) {
        this.rightclick.emit({
            "technique": this.technique,
            // modifier keys
            "shift": event.shiftKey,
            "ctrl": event.ctrlKey,
            "meta": event.metaKey,
            // position of event on page
            "x": event.pageX,
            "y": event.pageY
        });
    }

    /**
     * Return css classes for a technique
     * @param  {technique} technique the technique to get the class of
     * @param  {boolean}   mini is it the minitable?
     * @return {string}               the classes the technique should currently have
     */
    private getClass(): string {
        let theclass = 'link noselect cell'
        if (!this.viewModel.getTechniqueVM(this.technique, this.tactic).enabled)
            theclass += " disabled"
        if (this.viewModel.isTechniqueSelected(this.technique, this.tactic))
            theclass += " editing"
        if (this.viewModel.highlightedTechnique && this.viewModel.highlightedTechnique.id == this.technique.id){
            if (this.viewModel.selectTechniquesAcrossTactics) {
                theclass += " highlight"
            } else if (this.viewModel.highlightedTactic.id == this.tactic.id) {
                theclass += " highlight"
            }
        }

        if (this.viewModel.getTechniqueVM(this.technique, this.tactic).comment.length > 0)
            theclass += " commented"
        if (this.getTechniqueBackground())
            theclass += " colored"
        return theclass
    }

    /**
     * get the technique background style for ngstyle
     * @param  technique technique
     * @return           background object
     */
    private getTechniqueBackground(): any {
        let tvm = this.viewModel.getTechniqueVM(this.technique, this.tactic)
        // don't display if disabled or highlighted
        var highlight = false;
        if(this.viewModel.highlightedTechnique){
            if(this.viewModel.selectTechniquesAcrossTactics && this.viewModel.highlightedTechnique.attackID === this.technique.attackID){
                highlight = true;
            } else if (!this.viewModel.selectTechniquesAcrossTactics && this.viewModel.highlightedTechnique.get_technique_tactic_id(this.viewModel.highlightedTactic) === this.technique.get_technique_tactic_id(this.tactic)) {
                highlight = true;
            }
        }
        if (!tvm.enabled || highlight) return {}
        if (tvm.color) return {"background": tvm.color }
        if (tvm.score) return {"background": tvm.scoreColor }
        // return tvm.enabled && tvm.score && !tvm.color && !(this.viewModel.highlightedTechnique && this.viewModel.highlightedTechnique.technique_id == technique.technique_id)
    }

     /**
     * Get most readable text color for the given technique
     * @param  technique     the technique to get the text color for
     * @param  antihighlight boolean, true if the column is not selected.
     * @return               black, white, or gray, depending on technique and column state
     */
    private getTechniqueTextColor() {
        let tvm = this.viewModel.getTechniqueVM(this.technique, this.tactic)
        if (!tvm.enabled) return "#aaaaaa";
        // don't display if disabled or highlighted
        // if (this.viewModel.highlightedTechnique && this.viewModel.highlightedTechnique.technique_tactic_union_id == this.technique.technique_tactic_union_id) return "black"
        if (tvm.color) return tinycolor.mostReadable(tvm.color, ["white", "black"]);
        if (tvm.score && !isNaN(Number(tvm.score))) return tinycolor.mostReadable(tvm.scoreColor, ["white", "black"]);
        // if (this.viewModel.highlightedTactic && this.technique.tactic != this.viewModel.highlightedTactic) return "#aaaaaa";
        else return "black"
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
