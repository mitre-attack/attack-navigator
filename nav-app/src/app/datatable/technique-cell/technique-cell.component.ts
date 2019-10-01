import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Technique } from '../../data.service';
import { ViewModel } from '../../viewmodels.service';
import {ConfigService} from '../../config.service';

declare var tinycolor: any; //use tinycolor2

@Component({
    selector: 'technique-cell',
    templateUrl: './technique-cell.component.html',
    styleUrls: ['./technique-cell.component.scss']
})
export class TechniqueCellComponent implements OnInit {
    @Input() technique: Technique;
    @Input() viewModel: ViewModel;
    @Output() highlight = new EventEmitter<Technique>(); // emit with the highlighted technique, or null to unhighlight
    @Output() leftclick = new EventEmitter<any>(); // emit with the selected technique and the modifier keys
    @Output() rightclick = new EventEmitter<any>(); //emit with the technique which was right-clicked

    constructor(private configService: ConfigService) { }

    ngOnInit() {
    }

    // events to pass to parent component
    private onHighlight() {
        this.highlight.emit(this.technique)
    }
    private onUnhighlight() {
        this.highlight.emit(null);
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
    private getClass() {
        let theclass = 'link noselect cell'
        if (!this.viewModel.getTechniqueVM(this.technique.technique_tactic_union_id).enabled)
            theclass += " disabled"
        // else theclass += " " + this.viewModel.getTechniqueVM(technique.technique_tactic_union_id).color
        if (this.viewModel.isTechniqueSelected(this.technique))
            theclass += " editing"
        if (this.viewModel.highlightedTechnique && this.viewModel.highlightedTechnique.technique_id == this.technique.technique_id){
            if(this.viewModel.selectTechniquesAcrossTactics){
                theclass += " highlight"
            } else if (this.viewModel.hoverTactic == this.technique.tactic) {
                theclass += " highlight"
            }
            //console.log(this.viewModel.hoverTactic);
        }

        theclass += [" full", " compact", " mini"][this.viewModel.viewMode]
        if (this.viewModel.getTechniqueVM(this.technique.technique_tactic_union_id).comment.length > 0)
            theclass += " has-comment"
        if (this.getTechniqueBackground())
            theclass += " has-background"
        return theclass
    }

    /**
     * get the technique background style for ngstyle
     * @param  technique technique
     * @return           background object
     */
    private getTechniqueBackground() {
        let tvm = this.viewModel.getTechniqueVM(this.technique.technique_tactic_union_id)
        // don't display if disabled or highlighted
        var highlight = false;
        if(this.viewModel.highlightedTechnique){
            if(this.viewModel.selectTechniquesAcrossTactics && this.viewModel.highlightedTechnique.technique_id === this.technique.technique_id){
                highlight = true;
            } else if (!this.viewModel.selectTechniquesAcrossTactics && this.viewModel.highlightedTechnique.technique_tactic_union_id === this.technique.technique_tactic_union_id) {
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
        let tvm = this.viewModel.getTechniqueVM(this.technique.technique_tactic_union_id)
        if (!tvm.enabled) return "#aaaaaa";
        // don't display if disabled or highlighted
        if (this.viewModel.highlightedTechnique && this.viewModel.highlightedTechnique.technique_tactic_union_id == this.technique.technique_tactic_union_id) return "black"
        if (tvm.color) return tinycolor.mostReadable(tvm.color, ["white", "black"]);
        if (tvm.score && !isNaN(Number(tvm.score))) return tinycolor.mostReadable(tvm.scoreColor, ["white", "black"]);
        if (this.viewModel.highlightedTactic && this.technique.tactic != this.viewModel.highlightedTactic) return "#aaaaaa";
        else return "black"
    }

}
