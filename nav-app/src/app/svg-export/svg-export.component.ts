import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewModel } from "../services/viewmodels.service";
import { ConfigService } from "../services/config.service";
import { DataService } from '../services/data.service';
import { Matrix } from '../classes/stix';
import { RenderableTechnique } from './renderable-objects/renderable-technique';
import { RenderableTactic } from './renderable-objects/renderable-tactic';
import { RenderableMatrix } from './renderable-objects/renderable-matrix';

import * as is from 'is_js';
import * as tinycolor from 'tinycolor2';
declare var d3: any; //d3js

@Component({
    selector: 'app-svg-export',
    templateUrl: './svg-export.component.html',
    styleUrls: ['./svg-export.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SvgExportComponent implements OnInit {
    // vm to render
    public viewModel: ViewModel;

    // SVG configuration
    public config: any = {};
    public svgConfigDefaults: any = { 
        "width": 11,
        "height": 8.5,
        "headerHeight": 1,
        "unit": "in",
        "orientation": "landscape",
        "size": "letter",
        "showSubtechniques": "expanded",
        "font": "sans-serif",
        "tableBorderColor": "#6B7279",
        "showHeader": true,
        "legendDocked": true,
        "legendX": 0,
        "legendY": 0,
        "legendWidth": 2,
        "legendHeight": 1,
        "showLegend": true,
        "showGradient": true,
        "showFilters": true,
        "showAbout": true,
        "showDomain": true,
        "showAggregate": false,
    }

    // SVG settings
    public currentDropdown: string = null;
    public hasScores: boolean;
    private svgElementID: string = "svgInsert_tmp";
    private buildSVGDebounce: boolean = false;

    // counter for unit change ui element
    public unitEnum: number = 0;
    
    // browser compatibility
    public get isIE(): boolean { return is.ie(); }

    // getters for visibility of SVG header sections
    public get hasName(): boolean { return this.viewModel.name.length > 0; }
    public get hasDomain(): boolean { return this.viewModel.domainVersionID.length > 0; }
    public get hasDescription(): boolean { return this.viewModel.description.length > 0; }
    public get hasLegendItems(): boolean { return this.viewModel.legendItems.length > 0; }

    // getters for user preferences
    public get showName(): boolean { return this.config.showAbout && this.hasName && this.config.showHeader; }
    public get showDomain(): boolean { return this.config.showDomain && this.hasDomain && this.config.showHeader; }
    public get showAggregate(): boolean { return this.viewModel.layout.showAggregateScores && this.config.showHeader; }
    public get showDescription(): boolean { return this.config.showAbout && this.hasDescription && this.config.showHeader; }
    public get showFilters(): boolean { return this.config.showFilters && this.config.showHeader; }
    public get showGradient(): boolean { return this.config.showGradient && this.hasScores && this.config.showHeader; }
    public get showLegend(): boolean { return this.config.showLegend && this.hasLegendItems; }
    public get showLegendContainer(): boolean { return this.showLegend || this.showGradient; }
    public get showLegendInHeader(): boolean { return this.config.legendDocked; }

    constructor(private dialogRef: MatDialogRef<SvgExportComponent>, 
                private configService: ConfigService, 
                private dataService: DataService,
                @Inject(MAT_DIALOG_DATA) public data) {
        this.config = this.svgConfigDefaults;
    }

    ngOnInit(): void {
        this.viewModel = this.data.vm;
        this.svgElementID = "svgInsert" + this.viewModel.uid;
        
        let self = this;
        //determine if the layer has any scores
        for (let matrix of this.dataService.getDomain(this.viewModel.domainVersionID).matrices) {
            for (let tactic of this.viewModel.filterTactics(matrix.tactics, matrix)) {
                for (let technique of this.viewModel.filterTechniques(tactic.techniques, tactic, matrix)) {
                    if (technique.subtechniques.length > 0) {
                        for (let subtechnique of this.viewModel.filterTechniques(technique.subtechniques, tactic, matrix)) {
                            if (self.viewModel.hasTechniqueVM(subtechnique, tactic)) {
                                if (self.viewModel.getTechniqueVM(subtechnique, tactic).score != "") self.hasScores = true;
                            }
                        }
                    }
                    if (self.viewModel.hasTechniqueVM(technique, tactic)) {
                        if (self.viewModel.getTechniqueVM(technique, tactic).score != "") self.hasScores = true;
                    }
                }
            }
        }

        // dynamic legend height according to content
        let legendSectionCount = 0;
        if (self.hasScores) legendSectionCount++;
        if (self.hasLegendItems) legendSectionCount++;
        self.config.legendHeight = 0.5 * legendSectionCount;

        //initial legend position for undocked legend
        this.config.legendX = this.config.width - this.config.legendWidth - 0.1;
        this.config.legendY = this.config.height - this.config.legendHeight - 0.1;
        if (this.config.showHeader) this.config.legendY -= this.config.headerHeight; 

        // build SVG at end of fn queue so page can render before build
        window.setTimeout(function() {
            self.buildSVG(self)
        }, 0);
    }

    /** build the SVG */
    public buildSVG(self?: any, bypassDebounce: boolean = false): void {
        if (!self) self = this; // called from somewhere other than ngOnInit

        // debounce
        if (self.buildSVGDebounce && !bypassDebounce) return;
        if (!bypassDebounce) {
            self.buildSVGDebounce = true;
            window.setTimeout(function() {
                self.buildSVG(self, true)
            }, 500);
            return;
        }
        self.buildSVGDebounce = false;

        setSize(self.config.size, self.config.orientation)

        // calculate svg height and width
        let margin = {top: 5, right: 5, bottom: 5, left: 5};
        let width = Math.max(self.toPx(self.config.width, self.config.unit)  - (margin.right + margin.left), 10);
        let svgWidth = width + margin.left + margin.right;
        let height = Math.max(self.toPx(self.config.height, self.config.unit) - (margin.top + margin.bottom), 10);
        let svgHeight = height + margin.top + margin.bottom;
        let headerHeight = Math.max(self.toPx(self.config.headerHeight, self.config.unit), 1);

        // calculate legend height and width
        let legendX = Math.max(self.toPx(self.config.legendX, self.config.unit), 0);
        let legendY = Math.max(self.toPx(self.config.legendY, self.config.unit), 0);
        let legendWidth = Math.max(self.toPx(self.config.legendWidth, self.config.unit), 10);
        let legendHeight = Math.max(self.toPx(self.config.legendHeight, self.config.unit), 10);

        // remove previous graphic
        let svgElement: HTMLElement = document.getElementById(self.svgElementID);
        svgElement.innerHTML = "";

        // create new SVG
        let svg = d3.select("#" + self.svgElementID).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "svg" + self.viewModel.uid) // SVG download tag
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("font-family", self.config.font);

        // ooooo ooooo            o888                                                 
        //  888   888  ooooooooo8  888 ooooooooo    ooooooooo8 oo oooooo    oooooooo8  
        //  888ooo888 888oooooo8   888  888    888 888oooooo8   888    888 888ooooooo  
        //  888   888 888          888  888    888 888          888                888 
        // o888o o888o  88oooo888 o888o 888ooo88     88oooo888 o888o       88oooooo88  
        //                             o888                                            

        // Essentially, the following functions brute force the optimal text arrangement for each cell 
        // in the matrix to maximize text size. The algorithm tries different combinations of line breaks
        // in the cell text.

        /**
         * Divide distance into divisions equidistant anchor points S.T they all have equal
         * padding from each other and the beginning and end of the distance
         * @param  distance  distance to divide
         * @param  divisions number of divisions
         * @return           number[] where each number corresponds to a division-center offset
         */
        function getSpacing(distance, divisions) {
            distance = distance - 1; //1px padding for border
            let spacing = distance/(divisions*2);
            let res = []
            for (let i = 1; i <= divisions*2; i+=2) {
                res.push(1 + (spacing * i))
            }
            return res
        };

        /**
         * Magic function to insert line breaks. 
        * @param  {string[]} words         array of words to space
        * @param  {dom node} self          the dom element with the text
        * @param  {number} xpos            x pos to place multiline text at
        * @param  {number} ypos            same but with y
        * @param  {number} totalDistance   total distance to contain broken text.
        *                                  amt in excess of spacingDistance
        *                                  becomes v padding.
        * @param  {number} spacingDistance total distance to space text inside,
        *                                  should be < totalDistance
        * @param {boolean} center          if true, center the text in the node, else left-align
        * @param {number} cellWidth        total width of the cell to put the text in
        */
        function insertLineBreaks(words, node, padding, xpos, ypos, totalDistance, spacingDistance, center, cellWidth) {
            let el = d3.select(node)

            //clear previous content
            el.text('');
            while(node.firstChild) node.removeChild(node.firstChild);

            let spacing = getSpacing(spacingDistance, words.length)
            for (var i = 0; i < words.length; i++) {
                var tspan = el.append('tspan').text(words[i]);
                if (center) tspan.attr("text-anchor","middle");
                // if (i > 0)
                let offsetY = ((totalDistance - spacingDistance) / 2) + ypos + spacing[i]
                tspan
                    .attr('x', center? xpos + (cellWidth/2) : xpos + padding)
                    .attr('y', offsetY);
            }
        };

        /**
         * Given an array of words, find the optimal font size for the array of words to be
         * broken onto 1 line each.
         * @param  {string[]} words     to be broken onto each line
         * @param  {dom node} node      the dom node of the cell
         * @param  {cellWidth} number   the width of the cell
         * @param  {cellHeight} number  the height of the cell
         * @param {boolean} center      center the text?
         * @param {number} maxFontSize  max font size, default is 12
         * @return {number}             the largest possible font size
         *                              not larger than 12
         */
        function findSpace(words: string[], node, cellWidth: number, cellHeight: number, center: boolean, maxFontSize=12) {
            let padding = 4; //the amount of padding on the left and right
            //break into multiple lines
            let breakDistance = Math.min(cellHeight, (maxFontSize + 3) * words.length)
            insertLineBreaks(words, node, padding, 0, 0, cellHeight, breakDistance, center, cellWidth)

            //find right size to fit the height of the cell
            let breakTextHeight = breakDistance / words.length;
            let fitTextHeight = Math.min(breakTextHeight, cellHeight) * 0.8; //0.8

            //find right size to fit the width of the cell
            let longestWordLength = -Infinity;
            for (let w = 0; w < words.length; w++) {
                let word = words[w];
                longestWordLength = Math.max(longestWordLength, word.length)
            }
            let fitTextWidth = ((cellWidth - (2 * padding)) / longestWordLength) * 1.45;

            //the min fitting text size not larger than MaxFontSize
            let size = Math.min(maxFontSize, fitTextHeight, fitTextWidth);

            return size;
        }

        /**
         * Given text, a dom node, and sizing parameters, 
         * try all combinations of word breaks to maximize font size inside of the given space
         * returns font size in pixels
         * @param {string} text                   the text to render in the cell
         * @param {dom node} node                 the node for the cell
         * @param {number} cellWidth              width of the cell to get the font size for
         * @param {number} cellHeight             height of the cell to get the font size for
         * @param {boolean} center                center the text?
         * @param {number} maxFontSize            max font size, default is 12
         * @return {string}                       the size in pixels
         */
        function optimalFontSize(text: string, node, cellWidth: number, cellHeight: number, center: boolean, maxFontSize=12): number {
            let words = text.split(" ");
            let bestSize = -Infinity; //beat this size
            let bestWordArrangement = [];

            /**
             * determine placement of line breaks to try. Shorter lists of words can try more positions
             * @param {number} num_spaces the number of spaces in the words, aka words.length - 1
             * @param {number} [num_breaks=3]  the number of breaks to insert
             * @returns str[] where each index is a combination of breaks represented as [01]+ where 1 is a break and 0 is a space
             */
            function find_breaks(num_spaces:number, num_breaks=3) {
                let breaks = new Set<string>();
                function recurse(breakset_inherit, depth, num_breaks) {
                    for (let i = 0; i < breakset_inherit.length; i++) {
                        let breakset = JSON.parse(JSON.stringify(breakset_inherit)); //deep copy
                        breakset[i] = 1; // insert break at this location
                        breaks.add(breakset.join("")); //save this combination
                        if (depth < num_breaks - 1) recurse(breakset, depth + 1, num_breaks);
                    }
                }
                let initial_breaks = []
                while (initial_breaks.length < num_spaces) initial_breaks.push(0); //fill with 0s
                breaks.add(initial_breaks.join("")); //save this combination
                recurse(initial_breaks, 0, num_breaks)
                return breaks
            }

            let num_spaces = words.length;
            // longer strings can't try as many combinations without the page lagging
            let num_breaks = 1;
            if (num_spaces < 20) num_breaks = 3;
            else if (num_spaces < 50) num_breaks = 2;
            else num_breaks = 1;
            let breaks = Array.from(find_breaks(num_spaces, num_breaks))
            for (let binaryString of breaks) { // find the best option of the proposed placements generated by find_breaks
                //binaryString: binary representation of newline locations, e.g 001011
                //where 1 is newline and 0 is no newline
                let wordSet = []; //build this array
                
                for (let k = 0; k < binaryString.length; k++) {
                    if (binaryString[k] === "0") {//join with space
                        if (wordSet.length == 0) wordSet.push(words[k]);
                        else wordSet[wordSet.length - 1] = wordSet[wordSet.length - 1] + " " + words[k]; //append to previous word in array
                    } else { //linebreak
                        wordSet.push(words[k]) //new word in array
                    }
                }

                let size = findSpace(wordSet, node, cellWidth, cellHeight, center, maxFontSize);
                if (size > bestSize) { //found new optimum
                    bestSize = size;
                    bestWordArrangement = wordSet;
                }
                if (size == maxFontSize) break; //if largest text found, no need to search more
            }

            findSpace(bestWordArrangement, node, cellWidth, cellHeight, center, maxFontSize);
            return bestSize;
        }

        class HeaderSectionContent {
            label: string;
            // either string to display in box, or a callback to create complex content in the box
            // callback function option takes params node, width, height, and appends data to node
            data: string | Function;
        }
        class HeaderSection {
            title: string;
            contents: HeaderSectionContent[];
        }

        let legend = {"title": "legend", "contents": []};
        if (self.hasScores && self.showGradient) legend.contents.push({
            "label": "gradient", "data": function(group, sectionWidth, sectionHeight) {
                let domain = [];
                for (let i = 0; i < self.viewModel.gradient.colors.length; i++) {
                    let percent = i / (self.viewModel.gradient.colors.length - 1);
                    domain.push(d3.interpolateNumber(self.viewModel.gradient.minValue, self.viewModel.gradient.maxValue)(percent))
                }
                let colorScale = d3.scaleLinear()
                    .domain(domain)
                    .range(self.viewModel.gradient.colors.map(function (color) { return color.color; }))
                let nCells = domain.length * 2;
                let valuesRange = self.viewModel.gradient.maxValue - self.viewModel.gradient.minValue;
                group.append("g")
                    .attr("transform", "translate(0, 5)")
                    .call(d3.legendColor()
                    .shapeWidth((sectionWidth / nCells))
                    .shapePadding(0)
                    .cells(nCells)
                    .shape("rect")
                    .orient("horizontal")
                    .scale(colorScale)
                    .labelOffset(2)
                    .labelFormat(d3.format("0.02r"))
                )
            }
        });
        if (self.showLegend) legend.contents.push({
            "label": "legend", "data": function(group, sectionWidth, sectionHeight) {
                let colorScale = d3.scaleOrdinal()
                    .domain(self.viewModel.legendItems.map(function(item) { return item.label; }))
                    .range(self.viewModel.legendItems.map(function(item) { return item.color; }))
                group.append("g")
                    .attr("transform", "translate(0, 5)")
                    .call(d3.legendColor()
                    .shapeWidth((sectionWidth / self.viewModel.legendItems.length))
                    .shapePadding(0)
                    .shape("rect")
                    .orient("horizontal")
                    .scale(colorScale)
                    .labelOffset(2)
                )
            }
        })

        function descriptiveBox(group, sectionData: HeaderSection, boxWidth: number, boxHeight: number) {
            let boxPadding = 5;
            let boxGroup = group.append("g")
                .attr("transform", `translate(0,${boxPadding})`);
            // adjust height for padding
            boxHeight -= 2 * boxPadding;
            let outerbox = boxGroup.append("rect")
                .attr("class", "header-box")
                .attr("width", boxWidth)
                .attr("height", boxHeight)
                .attr("stroke", "black")
                .attr("fill", "white")
                .attr("rx", boxPadding); //rounded corner
            let titleEl = boxGroup.append("text")
                .attr("class", "header-box-label")
                .text(sectionData.title)
                .attr("x", 2 * boxPadding)
                .attr("font-size", 12)
                .each(function() { self.verticalAlignCenter(this); })
            // add cover mask so that the box lines crop around the text
            let bbox = titleEl.node().getBBox();
            let coverPadding = 2;
            let cover = boxGroup.append("rect")
                .attr("class", "label-cover")
                .attr("x", bbox.x - coverPadding)
                .attr("y", bbox.y - coverPadding)
                .attr("width", bbox.width + 2*coverPadding)
                .attr("height", bbox.height + 2*coverPadding)
                .attr("fill", "white")
                .attr("rx", boxPadding); //rounded corner just in case it's being shown on a transparent background
            titleEl.raise(); //push title to front;

            // add content to box
            let boxContentGroup = boxGroup.append("g")
                .attr("class", "header-box-content")
                .attr("transform", `translate(${boxPadding}, 0)`)
            let boxContentHeight = boxHeight;
            let boxContentWidth = boxWidth - 2*boxPadding;

            let boxGroupY = d3.scaleBand()
                .padding(0.05)
                .align(0.5)
                .domain(sectionData.contents.map(function(content) { return content.label }))
                .range([0, boxContentHeight]);
            for (let i = 0; i < sectionData.contents.length; i++) {
                let subsectionContent = sectionData.contents[i];
                let contentGroup = boxContentGroup.append("g")
                    .attr("transform", `translate(0, ${boxGroupY( subsectionContent.label )})`);
                if (typeof(subsectionContent.data) == "string") {
                    // add text to contentGroup
                    contentGroup.append("text")
                        .text(subsectionContent)
                        .attr("font-size", function() {
                            return optimalFontSize(subsectionContent.data as string, this, boxContentWidth, boxGroupY.bandwidth(), false, 12)
                        })
                        .each(function() { self.verticalAlignCenter(this); })
                } else {
                    //call callback to add complex data to contentGroup
                    (subsectionContent.data as Function)(contentGroup, boxContentWidth, boxGroupY.bandwidth());
                }
                if (i != sectionData.contents.length - 1) contentGroup.append("line") //dividing line
                    .attr("x1", 0)
                    .attr("x2", boxContentWidth)
                    .attr("y1", boxGroupY.bandwidth())
                    .attr("y2", boxGroupY.bandwidth())
                    .attr("stroke", "#dddddd");
            }
        }

        /**
         * Function to set width and height based on selected size and orientaiton
         * @param {string} size dimensions
         * @param {string} orientation  portrait or landscape
         */
        function setSize(size, orientation) {
            const ratioMap = {
                letter: {portrait: [8.5, 11], landscape: [11, 8.5]},
                legal: {portrait: [8.5, 14], landscape: [14, 8.5]},
                small: {portrait: [11, 17], landscape: [17, 11]},
                medium: {portrait: [18, 24], landscape: [24, 18]},
                large: {portrait: [24, 36], landscape: [36, 24]},
            };

            if (size !== "custom") {
                const [w, h] = ratioMap[size][orientation];
                self.config.width = w;
                self.config.height = h;
            }
        }

        // ooooo ooooo                             oooo                        
        //  888   888  ooooooooo8  ooooooo    ooooo888  ooooooooo8 oo oooooo   
        //  888ooo888 888oooooo8   ooooo888 888    888 888oooooo8   888    888 
        //  888   888 888        888    888 888    888 888          888        
        // o888o o888o  88oooo888 88ooo88 8o  88ooo888o  88oooo888 o888o       
                                                                            

        if (self.config.showHeader) {
            let headerSections: HeaderSection[] = []

            if (self.showName || self.showDescription) {
                let about = {"title": "about", "contents": []};
                if (self.showName) about.contents.push({"label": "name", "data": this.viewModel.name});
                if (self.showDescription) about.contents.push({"label": "description", "data": this.viewModel.description});
                headerSections.push(about)
            }

            const config = {"title": "domain", "contents": []};
            let filterConfig = {"title": "platforms", "contents": []};
            if (self.showDomain) {
                let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
                config.contents.push({"label": "domain", "data": domain.name + " " + domain.version.name});
            }
            if (self.showFilters) {
              const filterData = {"label": "platforms", "data": this.viewModel.filters.platforms.selection.join(", ")};
              if (self.showAggregate) {
                config.title = "domain & platforms";
                config.contents.push(filterData);
              } else filterConfig.contents.push(filterData);
            }
            if (config.contents.length > 0) headerSections.push(config);
            if (filterConfig.contents.length > 0) headerSections.push(filterConfig);

            if (self.showAggregate) {
              const aggregateConfig = { "title": "aggregate", "contents": []};
              aggregateConfig.contents.push({"label": "function", "data": "showing aggregate scores using the " + this.viewModel.layout.aggregateFunction + " aggregate function"});
              if (this.viewModel.layout.countUnscored) aggregateConfig.contents.push({"label": "unscored", "data": "includes unscored techniques as having a score of 0"});
              headerSections.push(aggregateConfig);
            }

            if (self.showLegendContainer && self.showLegendInHeader) headerSections.push(legend);

            let headerGroup = svg.append("g");

            let headerX = d3.scaleBand()
                .paddingInner(0.05)
                .domain(headerSections.map(function(section: HeaderSection) { return section.title }))
                .range([0, width]);
            
            for (let section of headerSections) {
                let sectionGroup = headerGroup.append("g");
                if (headerSections.length > 1) sectionGroup.attr("transform", `translate(${headerX(section.title)}, 0)`);
                descriptiveBox(sectionGroup, section, headerSections.length == 1? width : headerX.bandwidth(), headerHeight);
            }

            if (headerSections.length == 0) headerHeight = 0; //no header sections to show
        } else { //no header
            headerHeight = 0
        }

        // -----------------------------------------------------------------------------
        // MATRIX
        // -----------------------------------------------------------------------------

        // build data model
        let datatable = svg.append("g").attr("transform", "translate(0," + (headerHeight + 1) + ")")
        let domain = self.dataService.getDomain(self.viewModel.domainVersionID);
        let matrices: RenderableMatrix[] = domain.matrices.map(m => new RenderableMatrix(m, self.viewModel, self.config));

        // get flattened list of tactics
        let tactics: RenderableTactic[] = [];
        for (let matrix of matrices) {
            tactics = tactics.concat(matrix.tactics);
        }

        // build tactic columns
        let xRange = d3.scaleBand()
            .domain(tactics.map(t => t.tactic.id))
            .range([0, width]);

        let yRange = d3.scaleLinear()
            .domain([d3.max(tactics, function(tactic: RenderableTactic) { return tactic.height }), 0])
            .range([height - (headerHeight), 0]);

        // tactic row background
        let subtechniqueIndent = Math.min(2 * yRange(1), 15);     
        if (self.viewModel.showTacticRowBackground) {
            datatable.append("rect")
                .attr("class", "tactic-header-background")
                .attr("width", width)
                .attr("height", yRange(1))
                .attr("fill", self.viewModel.tacticRowBackground)
                .attr("stroke", self.config.tableBorderColor)
        }

        // tactic names
        let tacticGroups = datatable.append("g").selectAll("g")
            .data(tactics)
            .enter().append("g")
            .attr("class", function(tactic: RenderableTactic) { return "tactic " + tactic.tactic.shortname; })
            .attr("transform", function(tactic: RenderableTactic) { return `translate(${xRange(tactic.tactic.id)}, 0)`; })

        // add technique groups to tactic column
        let techniqueGroups = tacticGroups.append("g")
            .attr("class", "techniques").selectAll("g")
            .data(function(tactic: RenderableTactic) { return tactic.techniques })
            .enter().append("g")
            .attr("class", function(technique: RenderableTechnique) { return "technique " + technique.technique.attackID; })
            .attr("transform", function(technique: RenderableTechnique) { return `translate(0, ${yRange(technique.yPosition)})` });

        // add sub-technique groups to tactic column
        let subtechniqueGroups = tacticGroups.append("g")
            .attr("class", "subtechniques").selectAll("g")
            .data(function(tactic: RenderableTactic) { return tactic.subtechniques })
            .enter().append("g")
            .attr("class", function(subtechnique: RenderableTechnique) { return "subtechnique " + subtechnique.technique.attackID; })
            .attr("transform", function(subtechnique: RenderableTechnique) { return `translate(${subtechniqueIndent}, ${yRange(subtechnique.yPosition)})` });

        // add cell style to techniques
        techniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", yRange(1))
            .attr("width", xRange.bandwidth())
            .attr("fill", function(technique: RenderableTechnique) { return technique.fill })
            .attr("stroke", self.config.tableBorderColor);

        // add cell style to sub-techniques
        subtechniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", yRange(1))
            .attr("width", xRange.bandwidth() - subtechniqueIndent)
            .attr("fill", function(subtechnique: RenderableTechnique) { return subtechnique.fill })
            .attr("stroke", self.config.tableBorderColor);

        // add styling for sub-technique sidebar
        let sidebarWidth: number = 3;
        subtechniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", yRange(1))
            .attr("width", sidebarWidth)
            .attr("transform",  `translate(${-sidebarWidth}, 0)`)
            .attr("fill", self.config.tableBorderColor)
            .attr("stroke", self.config.tableBorderColor);
        techniqueGroups.append("polygon")
            .attr("class", "sidebar")
            .attr("transform", `translate(0, ${yRange(1)})`)
            .attr("points", function(technique: RenderableTechnique) {
                return [
                    "0,0",
                    `${subtechniqueIndent - sidebarWidth},0`,
                    `${subtechniqueIndent - sidebarWidth},${Math.min(subtechniqueIndent - sidebarWidth, yRange(self.viewModel.filterTechniques(technique.technique.subtechniques, technique.tactic, technique.matrix).length))}`
                ].join(" ");
            })
            .attr("fill", self.config.tableBorderColor)
            .attr("visibility", function(technique: RenderableTechnique) { return technique.technique.subtechniques.length > 0 && technique.showSubtechniques ? "visible" : "hidden" });

        // -----------------------------------------------------------------------------
        // CELL TEXT
        // -----------------------------------------------------------------------------
                                                                                           
        // track smallest optimal font size
        let minFontSize = Infinity;

        // set technique font size
        techniqueGroups.append("text")
            .text(function(technique: RenderableTechnique) { return technique.text; })
            .attr("font-size", function(technique: RenderableTechnique) {
                const fontSize = optimalFontSize(technique.text, this, xRange.bandwidth(), yRange(1), false);
                if (fontSize < minFontSize) minFontSize = fontSize;
                return fontSize;
            })
            .attr("fill", function(technique: RenderableTechnique) { return technique.textColor; })
            .each(function() { self.verticalAlignCenter(this); })

        // set sub-technique font size
        subtechniqueGroups.append("text")
            .text(function(subtechnique: RenderableTechnique) { return subtechnique.text; })
            .attr("font-size", function(subtechnique: RenderableTechnique) {
                const fontSize = optimalFontSize(subtechnique.text, this, xRange.bandwidth() - subtechniqueIndent, yRange(1), false);
                if (fontSize < minFontSize) minFontSize = fontSize;
                return fontSize;
            })
            .attr("fill", function(subtechnique: RenderableTechnique) { return subtechnique.textColor; })
            .each(function() { self.verticalAlignCenter(this); })
    
        // set technique and sub-technique groups to the same font size
        techniqueGroups.select("text").attr("font-size", minFontSize);
        subtechniqueGroups.select("text").attr("font-size", minFontSize);

        // track the smallest optimal font size for tactics
        let minTacticFontSize = Infinity;

        // set tactic font size
        let tacticLabels = tacticGroups.append("g").attr("class", "tactic-label");
        tacticLabels.append("text")
            .text(function(tactic: RenderableTactic) { return tactic.tactic.name; })
            .attr("font-size", function(tactic: RenderableTactic) {
                const fontSize = optimalFontSize(tactic.tactic.name, this, xRange.bandwidth(), yRange(1), true);
                if (fontSize < minTacticFontSize) minTacticFontSize = fontSize;
                return fontSize;
            })
            .attr("fill", function(tactic: RenderableTactic) {
                if (self.viewModel.showTacticRowBackground) return tinycolor.mostReadable(self.viewModel.tacticRowBackground, ["white", "black"]); 
                else return "black";
            })
            .attr("font-weight", "bold")
            .each(function() { self.verticalAlignCenter(this); })

        // set tactic labels to same font size
        tacticLabels.select("text").attr("font-size", minTacticFontSize);

        //ooooo  oooo                  oooo                       oooo                         oooo      ooooo                                                            oooo 
        // 888    88 oo oooooo    ooooo888   ooooooo     ooooooo   888  ooooo ooooooooo8  ooooo888        888         ooooooooo8   oooooooo8 ooooooooo8 oo oooooo    ooooo888  
        // 888    88  888   888 888    888 888     888 888     888 888o888   888oooooo8 888    888        888        888oooooo8  888    88o 888oooooo8   888   888 888    888  
        // 888    88  888   888 888    888 888     888 888         8888 88o  888        888    888        888      o 888          888oo888o 888          888   888 888    888  
        // 888oo88  o888o o888o  88ooo888o  88ooo88     88ooo888 o888o o888o  88oooo888  88ooo888o      o888ooooo88   88oooo888 888     888  88oooo888 o888o o888o  88ooo888o 
        //                                                                                                                         888ooo888                                    


        if (self.showLegendContainer && !self.showLegendInHeader) {
            let legendGroup = datatable.append("g")
                .attr("transform", `translate(${legendX}, ${legendY})`)
            descriptiveBox(legendGroup, legend, legendWidth, legendHeight);
        }
    }

    /**
     * Set the vertical alignment of the given node to center
     * @param self this DOM node
     * @param fontSize the font size of the node
     */
    private verticalAlignCenter(self: any, fontSize: any = null) {
        if (self.children && self.children.length > 0) {
            for (let child of self.children) {
                this.verticalAlignCenter(child, self.getAttribute("font-size"));
            }
        } else {
            // transform by half the font size - 1/2px for proper centering
            fontSize = fontSize ? fontSize : self.getAttribute("font-size");
            if (fontSize.endsWith("px")) fontSize = Number(fontSize.split("px")[0]);
            let yPosition = self.hasAttribute("y") ? Number(self.getAttribute("y")) : 0;
            let newYPosition = yPosition + Math.floor((fontSize * 0.3));
            d3.select(self).attr("y", newYPosition);
        }
    }

    /**
     * Convert any length in various units to pixels
     * @param  quantity what length
     * @param  unit     which unit system (in, cm, px, em, pt)
     * @return          that length in pixels
     */
    private toPx(quantity: number, unit: string): number {
        let factor: any;
        if      (unit == "in") factor = 96;
        else if (unit == "cm") factor = 3.779375 * 10;
        else if (unit == "px") factor = 1;
        else if (unit == "em") factor = 16;
        else if (unit == "pt") factor = 1.33;
        else {
            console.error("unknown unit", unit);
            factor = 0;
        }
        return quantity * factor;
    }

    /** Download the SVG */
    public downloadSVG(): void {
        // get SVG element
        let svgElement = document.getElementById("svg" + this.viewModel.uid);
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        // generate filename
        let filename = this.viewModel.name.split(' ').join('_');
        // remove all non alphanumeric characters
        filename = filename.replace(/\W/g, "")  + ".svg";

        // build SVG blob
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});

        // download
        if (this.isIE) {
            window.navigator.msSaveOrOpenBlob(svgBlob, filename)
        } else {
            const downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = URL.createObjectURL(svgBlob);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    /**
     * wrap the given text svg element
     * @param  text       element to wrap
     * @param  width      width to wrap to
     * @param  cellheight stop appending wraps after this height
     * @param  self       reference to self this component because of call context
     */
    wrap(text, width, cellheight, self): void {
        text.each(function() {
            var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    let thisdy = lineHeight + dy
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", thisdy + "em").text(word);
                }
            }
        });
    }
}
