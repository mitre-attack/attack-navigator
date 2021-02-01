import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewModel, TechniqueVM } from "../viewmodels.service";
import { ConfigService } from "../config.service";
import { Technique, DataService, Tactic, Matrix } from '../data.service';
import * as is from 'is_js';
declare var d3: any; //d3js
declare var tinycolor: any; //use tinycolor2
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
    selector: 'exporter',
    templateUrl: './exporter.component.html',
    styleUrls: ['./exporter.component.scss']
})
export class ExporterComponent implements OnInit {
    
    public currentDropdown: string = null;
    viewModel: ViewModel;
    public config: any = {}
    
    public isIE() {
        return is.ie();
    }

    private svgDivName = "svgInsert_tmp"
    unitEnum = 0; //counter for unit change ui element
    constructor(private dialogRef: MatDialogRef<ExporterComponent>, 
                private configService: ConfigService, 
                private dataService: DataService,
                @Inject(MAT_DIALOG_DATA) public data) {
        this.config = { 
            "width": 11,
            "height": 8.5,
            "headerHeight": 1,

            "unit": "in",

            "showSubtechniques": "expanded",

            "font": 'sans-serif',
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
        }
    }

    ngOnInit() {
        this.viewModel = this.data.vm;
        this.svgDivName = "svgInsert" + this.viewModel.uid;
        
        let self = this;
        //determine if the layer has any scores
        for (let matrix of this.dataService.getDomain(this.viewModel.domainID).matrices) {
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
        // dynamic legend height according to content;
        let legendSectionCount = 0;
        if (self.hasScores) legendSectionCount++;
        if (self.hasLegendItems()) legendSectionCount++;
        self.config.legendHeight = 0.5 * legendSectionCount; 
        //initial legend position for undocked legend
        this.config.legendX = this.config.width - this.config.legendWidth - 0.1;
        this.config.legendY = this.config.height - this.config.legendHeight - 0.1;
        if (this.config.showHeader) this.config.legendY -= this.config.headerHeight; 

        //put at the end of the function queue so that the page can render before building the svg
        window.setTimeout(function() {self.buildSVG(self)}, 0)
    }

    //visibility of SVG parts
    //assess data in viewModel
    hasName(): boolean {return this.viewModel.name.length > 0}
    hasDomain(): boolean {return this.viewModel.domainID.length > 0}
    hasDescription(): boolean {return this.viewModel.description.length > 0}
    hasScores: boolean; //does the viewmodel have scores? built in ngAfterViewInit
    hasLegendItems(): boolean {return this.viewModel.legendItems.length > 0;}

    //above && user preferences
    showName(): boolean {return this.config.showAbout && this.hasName() && this.config.showHeader}
    showDomain(): boolean {return this.config.showDomain && this.hasDomain() && this.config.showHeader}
    showDescription(): boolean {return this.config.showAbout && this.hasDescription() && this.config.showHeader}
    showLayerInfo(): boolean {return (this.showName() || this.showDescription()) && this.config.showHeader}
    showFilters(): boolean {return this.config.showFilters && this.config.showHeader};
    showGradient(): boolean {return this.config.showGradient && this.hasScores && this.config.showHeader}
    showLegend(): boolean {return this.config.showLegend && this.hasLegendItems()}
    showLegendContainer(): boolean{return this.showLegend() || this.showGradient()}
    showLegendInHeader(): boolean {return this.config.legendDocked}
    // showItemCount(): boolean {return this.config.showTechniqueCount}
    buildSVGDebounce = false;
    buildSVG(self?, bypassDebounce=false): void {
        if (!self) self = this; //in case we were called from somewhere other than ngViewInit

        console.log("settings changed")
        if (self.buildSVGDebounce && !bypassDebounce) {
            // console.log("skipping debounce...")
            return;
        }
        if (!bypassDebounce) {
            // console.log("debouncing...");
            self.buildSVGDebounce = true;
            window.setTimeout(function() {self.buildSVG(self, true)}, 500)
            return;
        }
        self.buildSVGDebounce = false;

        console.log("building SVG");

        //check preconditions, make sure they're in the right range
        let margin = {top: 5, right: 5, bottom: 5, left: 5};

        let width = Math.max(self.convertToPx(self.config.width, self.config.unit)  - (margin.right + margin.left), 10); console.log("width", width);
        let height = Math.max(self.convertToPx(self.config.height, self.config.unit) - (margin.top + margin.bottom), 10); console.log("height", height)
        let headerHeight = Math.max(self.convertToPx(self.config.headerHeight, self.config.unit), 1); console.log("headerHeight", headerHeight);

        let legendX = Math.max(self.convertToPx(self.config.legendX, self.config.unit), 0);
        let legendY = Math.max(self.convertToPx(self.config.legendY, self.config.unit), 0);
        let legendWidth = Math.max(self.convertToPx(self.config.legendWidth, self.config.unit), 10);
        let legendHeight = Math.max(self.convertToPx(self.config.legendHeight, self.config.unit), 10);

        //remove previous graphic
        let element = <HTMLElement>document.getElementById(self.svgDivName);
        element.innerHTML = "";

        let svg = d3.select("#" + self.svgDivName).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "svg" + self.viewModel.uid) //Tag for downloadSVG
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("font-family", self.config.font);
        let stroke_width = 1;

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
            // el.attr("y", y + (totalDistance - spacingDistance) / 2);

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
            // let longestWord = words.sort(function(a,b) {return b.length - a.length})[0]
            let longestWordLength = -Infinity;
            for (let w = 0; w < words.length; w++) {
                let word = words[w];
                longestWordLength = Math.max(longestWordLength, word.length)
            }
            let fitTextWidth = ((cellWidth - (2 * padding)) / longestWordLength) * 1.45;

            //the min fitting text size not larger than MaxFontSize
            let size = Math.min(maxFontSize, fitTextHeight, fitTextWidth);

            // if (size < 5) return "0px"; //enable for min text size
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

        // add properties to the node to set the vertical alignment to center without using
        // dominant-baseline, which isn't widely supported
        function centerValign(node, fontSize=null) {
            if (node.children && node.children.length > 0) {
                for (let child of node.children) centerValign(child, node.getAttribute("font-size"));
            } else {
                // base case
                // transform by half the font size - 1/2px for proper centering
                fontSize = fontSize ? fontSize : node.getAttribute("font-size");
                if (fontSize.endsWith("px")) fontSize = Number(fontSize.split("px")[0])
                let currY = node.hasAttribute("y") ? Number(node.getAttribute("y")) : 0;
                let newY = currY + Math.floor((fontSize * 0.3))
                d3.select(node).attr("y", newY);
            }
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
        if (self.hasScores && self.showGradient()) legend.contents.push({
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
                    
                    // .labelFormat( valuesRange < nCells ? d3.format("0.01f") : d3.format(".2"))
                )
            }
        });
        if (self.showLegend()) legend.contents.push({
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
                .each(function() { centerValign(this); })
                // .attr("dominant-baseline", "middle")
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
            let boxContentHeight = boxHeight;// - 2*boxPadding;
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
                            return optimalFontSize(subsectionContent.data as string, this, boxContentWidth, boxGroupY.bandwidth(), false, 32)
                        })
                        .each(function() { centerValign(this); })
                        // .attr("dominant-baseline", "middle")
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

        // ooooo ooooo                             oooo                        
        //  888   888  ooooooooo8  ooooooo    ooooo888  ooooooooo8 oo oooooo   
        //  888ooo888 888oooooo8   ooooo888 888    888 888oooooo8   888    888 
        //  888   888 888        888    888 888    888 888          888        
        // o888o o888o  88oooo888 88ooo88 8o  88ooo888o  88oooo888 o888o       
                                                                            

        if (self.config.showHeader) {
            let headerSections: HeaderSection[] = []

            if (self.showName() || self.showDescription()) {
                let about = {"title": "about", "contents": []};
                if (self.showName()) about.contents.push({"label": "name", "data": this.viewModel.name});
                if (self.showDescription()) about.contents.push({"label": "description", "data": this.viewModel.description});
                headerSections.push(about)
            }

            if (self.showDomain()) {
                let domain = this.dataService.getDomain(this.viewModel.domainID);
                headerSections.push({
                    "title": "domain",
                    "contents": [{
                        "label": "domain", "data": domain.name + " " + domain.version 
                    }]
                });
            }

            if (self.showFilters()) headerSections.push({
                "title": "filters",
                "contents": [{
                    "label": "platforms", "data": this.viewModel.filters.platforms.selection.join(", ") 
                }]
            });

            if (self.showLegendContainer() && self.showLegendInHeader()) headerSections.push(legend);

            let headerGroup = svg.append("g");

            let headerX = d3.scaleBand()
                .paddingInner(0.05)
                // .align(0.5)
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



        // oooo     oooo            o8              o88               
        //  8888o   888   ooooooo o888oo oo oooooo  oooo  oooo   oooo 
        //  88 888o8 88   ooooo888 888    888    888 888    888o888   
        //  88  888  88 888    888 888    888        888    o88 88o   
        // o88o  8  o88o 88ooo88 8o 888o o888o      o888o o88o   o88o 
                                                                   

        let tablebody = svg.append("g")
            .attr("transform", "translate(0," + (headerHeight + 1) + ")")

        // build data model
        let matrices: RenderableMatrix[] = this.dataService.getDomain(this.viewModel.domainID).matrices.map(function(matrix: Matrix) {
            return new RenderableMatrix(matrix, self.viewModel, self.config);
        });

        let tactics: RenderableTactic[] = [];
        //flattened list of tactics
        for (let matrix of matrices) { tactics = tactics.concat(matrix.tactics); }
        

        let x = d3.scaleBand()
            .paddingInner(0.1)
            .align(0.01)
            .domain(tactics.map(function(tactic: RenderableTactic) { return tactic.tactic.id; }))
            .range([0, width])

        let y = d3.scaleLinear()
            .domain([d3.max(tactics, function(tactic: RenderableTactic) { return tactic.height}), 0])
            .range([height - (headerHeight), 0])
            
        // let subtechniqueIndent = (1/3) * x.bandwidth(); //2/3 of full techinque width
        // let subtechniqueIndent = 2 * y(1); //2*the height of a cell, to make room for y(1) width sidebar
        let subtechniqueIndent = Math.min(2 * y(1), 15);     
        
        //add tactic row backgroun
        if (self.viewModel.showTacticRowBackground) {
            tablebody.append("rect")
                .attr("class", "tactic-header-background")
                .attr("width", width)
                .attr("height", y(1))
                .attr("fill", self.viewModel.tacticRowBackground)
                .attr("stroke", self.config.tableBorderColor)
        }

        let tacticGroups = tablebody.append("g").selectAll("g")
            .data(tactics)
            .enter().append("g")
            .attr("class", function(tactic: RenderableTactic) { return "tactic " + tactic.tactic.shortname; })
            .attr("transform", function(tactic: RenderableTactic) {
                return `translate(${x(tactic.tactic.id)}, 0)`;
            })
        // add technique and subtechnique groups
        let techniqueGroups = tacticGroups.append("g")
            .attr("class", "techniques").selectAll("g")
            .data(function(tactic: RenderableTactic) { return tactic.techniques})
            .enter().append("g")
            .attr("class", function(technique: RenderableTechnique) { return "technique " + technique.technique.attackID; })
            .attr("transform", function(technique: RenderableTechnique) {
                return `translate(0, ${y(technique.yPosition)})`
            });
        let subtechniqueGroups = tacticGroups.append("g")
            .attr("class", "subtechniques").selectAll("g")
            .data(function(tactic: RenderableTactic) { return tactic.subtechniques})
            .enter().append("g")
            .attr("class", function(subtechnique: RenderableTechnique) { return "subtechnique " + subtechnique.technique.attackID; })
            .attr("transform", function(subtechnique: RenderableTechnique) {
                return `translate(${subtechniqueIndent}, ${y(subtechnique.yPosition)})`
            });
        // add cells to techniques and subtechniques
        let techniqueRects = techniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", y(1))
            .attr("width", x.bandwidth())
            .attr("fill", function(technique: RenderableTechnique) { return technique.fill })
            .attr("stroke", self.config.tableBorderColor);
        let subtechniqueRects = subtechniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", y(1))
            .attr("width", x.bandwidth() - subtechniqueIndent)
            .attr("fill", function(subtechnique: RenderableTechnique) { return subtechnique.fill })
            .attr("stroke", self.config.tableBorderColor);
        // add sidebar
        // let sidebarWidth = y(1);
        let sidebarWidth = 3;

        let sidebar = subtechniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", y(1))
            .attr("width", sidebarWidth)
            .attr("transform",  `translate(${-sidebarWidth}, 0)`)
            .attr("fill", self.config.tableBorderColor)
            .attr("stroke", self.config.tableBorderColor);
        let sidebarAngle = techniqueGroups.append("polygon")
            .attr("class", "sidebar")
            .attr("transform", `translate(0, ${y(1)})`)
            .attr("points", function(technique: RenderableTechnique) {
                return [
                    "0,0",
                    `${subtechniqueIndent - sidebarWidth},0`,
                    `${subtechniqueIndent - sidebarWidth},${Math.min(subtechniqueIndent - sidebarWidth, y(self.viewModel.filterTechniques(technique.technique.subtechniques, technique.tactic, technique.matrix).length))}`
                ].join(" ");
            })
            .attr("fill", self.config.tableBorderColor)
            .attr("visibility", function(technique: RenderableTechnique) { return technique.technique.subtechniques.length > 0 && technique.showSubtechniques ? "visible" : "hidden"});

        //   oooooooo8             o888  o888       ooooooooooo                          o8   
        // o888     88  ooooooooo8  888   888       88  888  88 ooooooooo8 oooo   oooo o888oo 
        // 888         888oooooo8   888   888           888    888oooooo8    888o888    888   
        // 888o     oo 888          888   888           888    888           o88 88o    888   
        //  888oooo88    88oooo888 o888o o888o         o888o     88oooo888 o88o   o88o   888o 
                                                                                           
        

        techniqueGroups.append("text")
            .text(function(technique: RenderableTechnique) { 
                return technique.text;
            })
            .attr("font-size", function(technique: RenderableTechnique) {
                return optimalFontSize(technique.text, this, x.bandwidth(), y(1), false);
            })
            // .attr("dominant-baseline", "middle")
            .each(function() { centerValign(this); })
            .attr("fill", function(technique: RenderableTechnique) { return technique.textColor; })

        subtechniqueGroups.append("text")
            .text(function(subtechnique: RenderableTechnique) { 
                return subtechnique.text;
            })
            .attr("font-size", function(subtechnique: RenderableTechnique) {
                return optimalFontSize(subtechnique.text, this, x.bandwidth() - subtechniqueIndent, y(1), false);
            })
            // .attr("dominant-baseline", "middle")
            .attr("fill", function(subtechnique: RenderableTechnique) { return subtechnique.textColor; })
            .each(function() { centerValign(this); })
    
        let tacticLabels = tacticGroups.append("g")
            .attr("class", "tactic-label");
        tacticLabels.append("text")
            .text(function(tactic: RenderableTactic) {
                return tactic.tactic.name;
            })
            .attr("font-size", function(tactic: RenderableTactic) {
                return optimalFontSize(tactic.tactic.name, this, x.bandwidth(), y(1), true);
            })
            // .attr("dominant-baseline", "middle")
            .attr("fill", function(tactic: RenderableTactic) {
                if (self.viewModel.showTacticRowBackground) return tinycolor.mostReadable(self.viewModel.tacticRowBackground, ["white", "black"]); 
                else return "black";
            })
            .attr("font-weight", "bold")
            .each(function() { centerValign(this); })

        //ooooo  oooo                  oooo                       oooo                         oooo      ooooo                                                            oooo 
        // 888    88 oo oooooo    ooooo888   ooooooo     ooooooo   888  ooooo ooooooooo8  ooooo888        888         ooooooooo8   oooooooo8 ooooooooo8 oo oooooo    ooooo888  
        // 888    88  888   888 888    888 888     888 888     888 888o888   888oooooo8 888    888        888        888oooooo8  888    88o 888oooooo8   888   888 888    888  
        // 888    88  888   888 888    888 888     888 888         8888 88o  888        888    888        888      o 888          888oo888o 888          888   888 888    888  
        // 888oo88  o888o o888o  88ooo888o  88ooo88     88ooo888 o888o o888o  88oooo888  88ooo888o      o888ooooo88   88oooo888 888     888  88oooo888 o888o o888o  88ooo888o 
        //                                                                                                                         888ooo888                                    


        if (self.showLegendContainer() && !self.showLegendInHeader()) {
            let legendGroup = tablebody.append("g")
                .attr("transform", `translate(${legendX}, ${legendY})`)
            descriptiveBox(legendGroup, legend, legendWidth, legendHeight);
        }
    }

    downloadSVG() {
        let svgEl = document.getElementById("svg" + this.viewModel.uid);
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        let svgData = new XMLSerializer().serializeToString(svgEl);
        // // var svgData = svgEl.outerHTML;
        // console.log(svgData)
        // let svgData2 = new XMLSerializer().serializeToString(svgEl);
        // console.log(svgData2)
        let filename = this.viewModel.name.split(' ').join('_');
        filename = filename.replace(/\W/g, "")  + ".svg"; // remove all non alphanumeric characters
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        if (is.ie()) { //internet explorer
            window.navigator.msSaveBlob(svgBlob, filename)
        } else {
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = filename
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    /**
     * Convert any length in various units to pixels
     * @param  quantity what length
     * @param  unit     which unit system (in, cm, px?)
     * @return          that length in pixels
     */
    convertToPx(quantity: number, unit: string): number {
        let factor;

        switch(unit) {
            case "in": {
                factor = 96
                break
            }
            case "cm": {
                factor = 3.779375 * 10;
                break;
            }
            case "px": {
                factor = 1;
                break;
            }
            case "em": {
                factor = 16;
                break;
            }
            case "pt": {
                factor = 1.33;
            }
            default: {
                console.error("unknown unit", unit)
                factor = 0;
            }
        }

        return quantity * factor;
    }

    // wrap(text, width, padding) {
    //     var self = d3.select(this),
    //     textLength = self.node().getComputedTextLength(),
    //     text = self.text();
    //     while (textLength > (width - 2 * padding) && text.length > 0) {
    //         text = text.slice(0, -1);
    //         self.text(text + '...');
    //         textLength = self.node().getComputedTextLength();
    //     }
    // }

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
                    // if (self.convertToPx(thisdy, "em") > cellheight) return;
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", thisdy + "em").text(word);
                }
            }
        });
    }

    /**
     * Recenter the selected element's tspan elements
     * @param  height [description]
     * @param  self   [description]
     */
    recenter(text, height, self): void {
        text.each(function() {
            text.selectAll('tspan').each(function(d, i, els) {
                let numTSpan = els.length;
                let location = self.getSpacing(height, numTSpan)[i]

                let tspan = d3.select(this)
                    .attr("y", ( location))
                    .attr("dy", "0")
            })
        })
    }

    // Capitalizes the first letter of each word in a string
    toCamelCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    //following two functions are only used for iterating over tableconfig options: remove when tableconfig options are hardcoded in html
    getKeys(obj) { return Object.keys(obj) }
    type(obj) { return typeof(obj) }

    /**
     * Return whether the given dropdown element would overflow the side of the page if aligned to the right of its anchor
     * @param  dropdown the DOM node of the panel
     * @return          true if it would overflow
     */
    checkalign(dropdown): boolean {
        // console.log(anchor)
        let anchor = dropdown.parentNode;
        return anchor.getBoundingClientRect().left + dropdown.getBoundingClientRect().width > document.body.clientWidth;
    }

    /**
     * Divide distance into divisions equidestant anchor points S.T they all have equal
     * padding from each other and the beginning and end of the distance
     * @param  distance  distance to divide
     * @param  divisions number of divisions
     * @return           number[] where each number corresponds to a division-center offset
     */
    getSpacing(distance: number, divisions: number): number[] {
        distance = distance - 1; //1px padding for border
        let spacing = distance/(divisions*2);
        let res = []
        for (let i = 1; i <= divisions*2; i+=2) {
            res.push(1 + (spacing * i))
        }
        return res
    }
}



class RenderableMatrix {
    public readonly matrix: Matrix;
    public readonly tactics: RenderableTactic[] = [];
    public get height() {
        let heights = this.tactics.map(function(tactic: RenderableTactic) { return tactic.height; })
        return Math.max(...heights);
    }
    constructor(matrix: Matrix, viewModel: ViewModel, renderConfig: any) {
        this.matrix = matrix;
        let filteredTactics = viewModel.filterTactics(matrix.tactics, matrix);
        for (let tactic of filteredTactics) {
            this.tactics.push(new RenderableTactic(tactic, matrix, viewModel, renderConfig));
        }
    }
}

class RenderableTactic {
    public readonly tactic: Tactic;
    public readonly techniques: RenderableTechnique[] = [];
    public readonly subtechniques: RenderableTechnique[] = [];
    public readonly height: number;
    constructor(tactic: Tactic, matrix: Matrix, viewModel: ViewModel, renderConfig: any) {
        this.tactic = tactic;
        let filteredTechniques = viewModel.sortTechniques(viewModel.filterTechniques(tactic.techniques, tactic, matrix), tactic);
        let yPosition = 1; //start at 1 to make space for tactic label
        for (let technique of filteredTechniques) {
            let techniqueVM = viewModel.getTechniqueVM(technique, tactic);
            let filteredSubtechniques = viewModel.filterTechniques(technique.subtechniques, tactic, matrix);
            
            let showSubtechniques = renderConfig.showSubtechniques == "all" || (renderConfig.showSubtechniques == "expanded" && techniqueVM.showSubtechniques)

            this.techniques.push(new RenderableTechnique(yPosition++, technique, tactic, matrix, viewModel, showSubtechniques));

            
            if (filteredSubtechniques.length > 0 && showSubtechniques) {
                for (let subtechnique of filteredSubtechniques) {
                    this.subtechniques.push(new RenderableTechnique(yPosition++, subtechnique, tactic, matrix, viewModel, renderConfig));
                }
            }
        }
        this.height = yPosition;
    }
}

class RenderableTechnique {
    public readonly yPosition: number;
    public readonly technique: Technique;
    public readonly tactic: Tactic;
    public readonly matrix: Matrix;
    public readonly showSubtechniques;
    private readonly viewModel: ViewModel;
    constructor(yPosition, technique: Technique, tactic: Tactic, matrix: Matrix, viewModel: ViewModel, showSubtechniques=false) {
        this.yPosition = yPosition;
        this.technique = technique;
        this.tactic = tactic;
        this.matrix = matrix;
        this.viewModel = viewModel;
        this.showSubtechniques = showSubtechniques;
    }

    public get fill() {
        if (this.viewModel.hasTechniqueVM(this.technique, this.tactic)) {
            let techniqueVM: TechniqueVM = this.viewModel.getTechniqueVM(this.technique, this.tactic);
            if (!techniqueVM.enabled) return "white";
            if (techniqueVM.color) return techniqueVM.color;
            if (techniqueVM.score) return techniqueVM.scoreColor;
        } 
        return "white"; //default
    }

    public get textColor() {
        if (this.viewModel.hasTechniqueVM(this.technique, this.tactic)) {
            let techniqueVM: TechniqueVM = this.viewModel.getTechniqueVM(this.technique, this.tactic);
            if (!techniqueVM.enabled) return "#aaaaaa";
        }
        return tinycolor.mostReadable(this.fill, ["white", "black"]); //default;
    }

    public get text() {
        let text = [];
        if (this.viewModel.layout.showID) text.push(this.technique.attackID);
        if (this.viewModel.layout.showName) text.push(this.technique.name);
        return text.join(": ")
    }
}

