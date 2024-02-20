import { Input, Directive } from '@angular/core';
import { DataService } from '../services/data.service';
import { Technique, Tactic } from '../classes/stix';
import { ViewModel } from '../classes';
import { getCookie, hasCookie } from '../utils/cookies';
import { ConfigService } from '../services/config.service';
import tinycolor from 'tinycolor2';

@Directive()
export abstract class Cell {
    @Input() viewModel: ViewModel;
    @Input() technique: Technique;
    @Input() tactic: Tactic;

    public showContextmenu: boolean = false;
    public isDarkTheme: boolean;

    constructor(
        public dataService: DataService,
        public configService: ConfigService
    ) {
        this.dataService = dataService;
        this.configService = configService;
        if (hasCookie('is_user_theme_dark')) this.isDarkTheme = getCookie('is_user_theme_dark') === 'true';
        else this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    public get isHighlighted(): boolean {
        let isHighlighted = this.showContextmenu;
        let idToMatch = this.technique.id;
        if (this.viewModel.selectSubtechniquesWithParent && this.technique.isSubtechnique) idToMatch = this.technique.parent.id;

        if (this.viewModel.highlightedTechniques.has(idToMatch)) {
            if (!this.viewModel.highlightedTactic) {
                // highlight is called from search component
                return true;
            } else {
                const isTacticMatching = this.viewModel.highlightedTactic.id === this.tactic.id;
                return this.viewModel.selectTechniquesAcrossTactics || isTacticMatching;
            }
        }

        return isHighlighted;
    }

    /**
     * Return css classes for a technique
     * @param  {technique} technique the technique to get the class of
     * @param  {boolean}   mini is it the minitable?
     * @return {string}               the classes the technique should currently have
     */
    public getClass(): string {
        let theclass = 'link noselect cell';
        if (this.tactic && this.viewModel.isTechniqueSelected(this.technique, this.tactic)) theclass += ' editing';
        if (this.isHighlighted) {
            //open context menu always keeps highlight even if the mouse has moved elsewhere
            theclass += ' highlight';
        }

        // classes added by layout config
        if (this.viewModel.layout.showID) {
            theclass += ' showID';
            //change sticky top position of technique count
            let elements = document.querySelectorAll<HTMLElement>('.tactic.count');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.top = '46px';
            }
        }
        if (this.viewModel.layout.showName) theclass += ' showName';
        theclass += ' ' + this.viewModel.layout.layout;

        // classes according to annotations
        if (
            (this.tactic && this.viewModel.getTechniqueVM(this.technique, this.tactic).comment.length > 0) ||
            this.viewModel.getTechniqueVM(this.technique, this.tactic).metadata.length > 0 ||
            this.viewModel.getTechniqueVM(this.technique, this.tactic).links.length > 0 ||
            this.hasNotes()
        )
            theclass += ' underlined';
        if (this.getTechniqueBackground()) theclass += ' colored';
        if (this.tactic && !this.viewModel.getTechniqueVM(this.technique, this.tactic).enabled) theclass += ' disabled';

        return theclass;
    }

    /**
     * Emulate transparency without an alpha channel
     * @param color color with alpha channel
     * @returns color without an alpha channel which has been mixed with the proper background color as if it is transparent
     */
    public emulate_alpha(color: any) {
        /* note: constructing a tinycolor of a tinycolor makes them aliases. E.g:
         *
         *    x = tinycolor("#ffffff")
         *    y = tinycolor(x)
         *    y.getAlpha() -> 1
         *    x.setAlpha(0)
         *    y.getAlpha() -> 0
         *
         * Therefore y must be cloned after it is constructed to avoid transformations of x affecting it.
         * In this context, the color arg must be cloned because
         * in some contexts it is a tinycolor and we change its alpha below,
         * which could affect the copy in the calling function
         */
        if (!color || color.length < 1) return '';
        let cell_color = tinycolor(color).clone();
        let cell_color_alpha = cell_color.getAlpha();
        cell_color.setAlpha(1);
        let result = tinycolor.mix(this.isDarkTheme ? '#2e2e3f' : '#ffffff', cell_color, cell_color_alpha * 100);
        return result;
    }

    /**
     * Get most readable text color for the given technique
     * @param  technique     the technique to get the text color for
     * @param  antihighlight boolean, true if the column is not selected.
     * @return               black, white, or gray, depending on technique and column state
     */
    public getTechniqueTextColor() {
        if (!this.tactic) return this.isDarkTheme ? 'white' : 'black';
        let tvm = this.viewModel.getTechniqueVM(this.technique, this.tactic);
        if (!tvm.enabled) return this.isDarkTheme ? 'rgb(255 255 255 / 25%)' : '#aaaaaa';
        // don't display if disabled or highlighted
        // if (this.viewModel.highlightedTechnique && this.viewModel.highlightedTechnique.technique_tactic_union_id == this.technique.technique_tactic_union_id) return "black"
        if (tvm.color && this.configService.getFeature('background_color'))
            return tinycolor.mostReadable(this.emulate_alpha(tvm.color), ['white', 'black']);
        if (
            this.viewModel.layout.showAggregateScores &&
            tvm.aggregateScoreColor &&
            this.technique.subtechniques.length > 0 &&
            this.configService.getFeature('aggregate_score_color')
        )
            return tinycolor.mostReadable(this.emulate_alpha(tvm.aggregateScoreColor), ['white', 'black']);
        if (tvm.score && !isNaN(Number(tvm.score)) && this.configService.getFeature('non_aggregate_score_color'))
            return tinycolor.mostReadable(this.emulate_alpha(tvm.scoreColor), ['white', 'black']);
        else return this.isDarkTheme ? 'white' : 'black';
    }

    /**
     * Get the underline color for the given technique. The comment/metadata
     * underscore color overrides the link underscore color.
     */
    public getTechniqueUnderlineColor() {
        if (this.tactic) {
            let tvm = this.viewModel.getTechniqueVM(this.technique, this.tactic);
            if (tvm.comment.length > 0 || this.hasNotes()) {
                if (this.configService.getFeature('comment_underline')) return this.configService.commentColor;
            }
            if (tvm.metadata.length > 0) {
                if (this.configService.getFeature('metadata_underline')) return this.configService.metadataColor;
            }
            if (tvm.links.length > 0) {
                if (this.configService.getFeature('link_underline')) return this.configService.linkColor;
            }
        }
        return '';
    }

    /**
     * Check if technique has notes
     * @return      true if technique has notes, false otherwise
     */
    public hasNotes() {
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
        let notes = domain.notes.filter((note) => {
            return note.object_refs.includes(this.technique.id);
        });
        return notes.length > 0;
    }

    /**
     * get the technique background style for ngstyle
     * @param  technique technique
     * @return           background object
     */
    public getTechniqueBackground(): any {
        if (!this.tactic) return null;
        let tvm = this.viewModel.getTechniqueVM(this.technique, this.tactic);
        // don't display if disabled or highlighted
        if (!tvm.enabled || this.isHighlighted) return null;
        if (tvm.color && this.configService.getFeature('background_color')) return { background: this.emulate_alpha(tvm.color) };
        if (
            this.viewModel.layout.showAggregateScores &&
            this.technique.subtechniques.length > 0 &&
            !isNaN(Number(tvm.aggregateScore)) &&
            tvm.aggregateScore.length > 0 &&
            this.configService.getFeature('aggregate_score_color')
        ) {
            return { background: this.emulate_alpha(tvm.aggregateScoreColor) };
        }
        if (tvm.score && this.configService.getFeature('non_aggregate_score_color')) return { background: this.emulate_alpha(tvm.scoreColor) };
    }
}
