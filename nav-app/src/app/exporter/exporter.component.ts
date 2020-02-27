import { Component, AfterViewInit, Input } from '@angular/core';
import { ViewModel } from "../viewmodels.service";
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
export class ExporterComponent implements AfterViewInit {

    @Input() viewModel: ViewModel;

    private config = {
        "width": 11,
        "height": 8.5,
        "headerHeight": 1,

        "unit": "in",
        "fontUnit": "pt",

        "font": 'sans-serif',
        "tableFontSize": 5,
        "tableTacticFontSize": 6,
        "tableTextDisplay": 1,
        "tableBorderColor": "#6B7279",

        "showHeader": true,
        "headerLayerNameFontSize": 18,
        "headerFontSize": 12,

        "legendDocked": true,
        "legendX": 0,
        "legendY": 0,
        "legendWidth": 2,
        "legendHeight": 2,

        "showLegend": true,
        "showGradient": true,
        "showFilters": true,
        "showDescription": true,
        "showName": true,
        "showTechniqueCount": true
    }

    private svgDivName = "svgInsert_tmp"
    unitEnum = 0; //counter for unit change ui element
    constructor(private configService: ConfigService, private dataService: DataService) { }

    ngAfterViewInit() {
        this.svgDivName = "svgInsert" + this.viewModel.uid;
        let self = this;
        // this.exportData.filteredTechniques.forEach(function(technique: Technique) {
        //     // if (self.viewModel.hasTechniqueVM(technique.technique_tactic_union_id)) {
        //     //     if (self.viewModel.getTechniqueVM(technique.technique_tactic_union_id).score != "") self.hasScores = true;
        //     // }
        // })
        //put at the end of the function queue so that the page can render before building the svg
        window.setTimeout(function() {self.buildSVG(self)}, 0)
    }

    //visibility of SVG parts
    //assess data in viewModel
    hasName(): boolean {return this.viewModel.name.length > 0}
    hasDescription(): boolean {return this.viewModel.description.length > 0}
    hasScores: boolean; //does the viewmodel have scores? built in ngAfterViewInit
    hasLegendItems(): boolean {return this.viewModel.legendItems.length > 0;}

    //above && user preferences
    showName(): boolean {return this.config.showName && this.hasName() && this.config.showHeader}
    showDescription(): boolean {return this.config.showDescription && this.hasDescription() && this.config.showHeader}
    showLayerInfo(): boolean {return (this.showName() || this.showDescription()) && this.config.showHeader}
    showFilters(): boolean {return this.config.showFilters && this.config.showHeader};
    showGradient(): boolean {return this.config.showGradient && this.hasScores  && this.config.showHeader}
    showLegend(): boolean {return this.config.showLegend && this.hasLegendItems()}
    showLegendInHeader(): boolean {return this.config.legendDocked && this.showLegend();}
    showItemCount(): boolean {return this.config.showTechniqueCount}
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

        let tableFontSize = Math.max(self.config.tableFontSize, 1); console.log('tableFontSize', tableFontSize)
        let tableTextYOffset = ((tableFontSize/2) - (1/2));

        let tableTacticFontSize = Math.max(self.config.tableTacticFontSize, 1); console.log("tableTacticFontSize", tableTacticFontSize);
        let tableTacticTextYOffset = ((tableTacticFontSize/2) - (1/2));

        let headerFontSize = Math.max(self.config.headerFontSize, 1); console.log("headerFontSize", headerFontSize)
        let headerTextYOffset = ((headerFontSize/2) - (1/2))

        let headerLayerNameFontSize = Math.max(self.config.headerLayerNameFontSize, 1); console.log("headerLayerNameFontSize", headerLayerNameFontSize);
        let heafderLayerNameTextYOffset = ((headerLayerNameFontSize/2) - (1/2))

        let fontUnits = self.config.fontUnit;

        let headerTextPad = 6;
        let bodyTextPad = 3;


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

        //  _  _ ___   _   ___  ___ ___
        // | || | __| /_\ |   \| __| _ \
        // | __ | _| / _ \| |) | _||   /
        // |_||_|___/_/ \_\___/|___|_|_\

        //count columns
        let numSections = 0;
        for (let i = 0; i < 4; i++) {
            let option = [self.showLayerInfo(), self.showFilters(), self.showGradient(), self.showLegendInHeader()][i];
            if (option) numSections++;
        }
        let headerSectionWidth = width/numSections;
        // console.log(numSections, headerSectionWidth)
        let header = null;
        let posX = 0; //row in the header
        let headerSectionTitleSep = (2 * (headerFontSize + headerTextPad))

        if (self.config.showHeader) {
            header = svg.append("g");
            header.append("rect")
                .attr("width", width)
                .attr("height", headerHeight)
                .style("stroke", "black")
                .style("stroke-width", stroke_width)
                .style("fill", "white")

            // layer name
            if (self.showLayerInfo()) {
                let layerAndDescPresent = (self.showName() && self.showDescription())
                let nameDescHeight = layerAndDescPresent ? headerHeight/2 : headerHeight
                let descY = layerAndDescPresent ? headerHeight/2 : 0

                if (self.showName()) { //layer name
                    let titleGroup = header.append("g")
                        .attr("transform", "translate(0,0)");
                    titleGroup.append("rect")
                        .attr("width", headerSectionWidth)
                        .attr("height", nameDescHeight)
                        .style("stroke-width", 1)
                        .style("stroke", "black")
                        .style("fill", "white");
                    titleGroup.append("text")
                        .text(self.viewModel.name)
                        .attr("transform", "translate("+ headerTextPad + ", " + (headerLayerNameFontSize + headerTextPad) +")")
                        .attr("dx", 0)
                        .attr("dy", 0)
                        .attr("font-size", headerLayerNameFontSize + fontUnits)
                        .attr("fill", "black")
                        .style("font-weight", "bold")
                        .call(self.wrap, (headerSectionWidth) - 4, nameDescHeight, self);
                }

                if (self.showDescription()) {//description
                    let descriptionGroup = header.append("g")
                        .attr("transform", "translate(0," + descY + ")");
                    descriptionGroup.append("rect")
                        .attr("width", headerSectionWidth)
                        .attr("height", nameDescHeight)
                        .style("stroke-width", 1)
                        .style("stroke", "black")
                        .style("fill", "white");
                    descriptionGroup.append("text")
                        .text(self.viewModel.description)
                        .attr("transform", "translate("+headerTextPad+", " + (headerTextPad + headerTextYOffset) +")")
                        // .attr("dominant-baseline", "middle")
                        .attr("dx", 0)
                        .attr("dy", 0)
                        .attr("font-size", headerFontSize + fontUnits)
                        .attr("fill", "black")
                        .call(self.wrap, (headerSectionWidth) - 4, nameDescHeight, self)
                        .call(self.recenter, nameDescHeight - (2*headerTextPad), self);

                }
                posX++;
            }

            if (self.showFilters()) {
                //filters
                let filtersGroup = header.append("g")
                    .attr("transform", "translate(" + (headerSectionWidth * posX) + ", 0)");
                filtersGroup.append("rect")
                    .attr("width", headerSectionWidth)
                    .attr("height", headerHeight)
                    .style("stroke-width", 1)
                    .style("stroke", "black")
                    .style("fill", "white");
                filtersGroup.append("text")
                    .text("filters")
                    .attr("transform", "translate("+headerTextPad+", " + (headerFontSize + headerTextPad) +")")
                    .attr("dx", 0)
                    .attr("dy", 0)
                    .attr("font-size", headerFontSize + fontUnits)
                    .attr("fill", "black")
                    .style("font-weight", "bold");

                let filterTextGroup = filtersGroup.append("g")
                    .attr("transform", "translate("+headerTextPad+"," + (headerSectionTitleSep + 6 + headerTextYOffset) + ")");
                filterTextGroup.append("text")
                    .text(function() {
                        let t = "stages: "
                        let selection = self.viewModel.filters.stages.selection;
                        for (let i = 0; i < selection.length; i++) {
                            if (i != 0) t += ", ";
                            t += selection[i]
                        }
                        return t;
                    })
                    .attr("font-size", headerFontSize + fontUnits)
                    // .attr("dominant-baseline", "middle");
                filterTextGroup.append("text")
                    .text(function() {
                        let t = "platforms: "
                        let selection = self.viewModel.filters.platforms.selection;
                        for (let i = 0; i < selection.length; i++) {
                            if (i != 0) t += ", "
                            t += selection[i]
                        }
                        return t;
                    })
                    .attr("font-size", headerFontSize + fontUnits)
                    // .attr("dominant-baseline", "middle")
                    .attr("dy", "1.1em")
                    // .attr("transform", "translate(0, " +(headerFontSize + textPad) + ")");
                posX++
            }

            if (self.showGradient()) {
                //gradient
                let gradientGroup = header.append("g")
                    .attr("transform", "translate(" + (headerSectionWidth * posX) + ",0)");
                gradientGroup.append("rect")
                    .attr("width", headerSectionWidth)
                    .attr("height", headerHeight)
                    .style("stroke-width", 1)
                    .style("stroke", "black")
                    .style("fill", "white");
                gradientGroup.append("text")
                    .text("score gradient")
                    .attr("transform", "translate("+headerTextPad+", " + (headerFontSize + headerTextPad) +")")
                    .attr("dx", 0)
                    .attr("dy", 0)
                    .attr("font-size", headerFontSize + fontUnits)
                    .attr("fill", "black")
                    .style("font-weight", "bold");
                posX++;

                let gradientContentGroup = gradientGroup.append("g")
                    .attr("transform", "translate("+headerTextPad+"," + headerSectionTitleSep + ")");

                let leftText = gradientContentGroup.append("text")
                    .text(self.viewModel.gradient.minValue)
                    .attr("transform", "translate(0, " + (6 + headerTextYOffset) + ")")
                    .attr("font-size", headerFontSize + fontUnits)
                    // .attr("dominant-baseline", "middle")



                //set up gradient to bind
                let svgDefs = svg.append('defs');
                let gradientElement = svgDefs.append("linearGradient")
                    .attr("id", self.viewModel.uid + "gradientElement");
                for (let i = 0; i < self.viewModel.gradient.gradientRGB.length; i++) {
                    let color = self.viewModel.gradient.gradientRGB[i];
                    gradientElement.append('stop')
                        .attr('offset', i/100)
                        .attr("stop-color", color.toHexString())
                    // console.log(color)
                }
                // console.log(gradientElement);
                let gradientDisplayLeft = (leftText.node().getComputedTextLength()) + 2;
                let gradientDisplay = gradientContentGroup.append("rect")
                    .attr("transform", "translate(" + gradientDisplayLeft + ", 0)")
                    .attr("width", 50)
                    .attr("height", 10)
                    .style("stroke-width", 1)
                    .style("stroke", "black")
                    .attr("fill", "url(#" + self.viewModel.uid + "gradientElement)"); //bind gradient

                gradientContentGroup.append("text")
                    .text(self.viewModel.gradient.maxValue)
                    .attr("transform", "translate(" + (gradientDisplayLeft + 50 + 2 ) + ", " + (6 + headerTextYOffset) + ")")
                    .attr("font-size", headerFontSize + fontUnits)
                    // .attr("dominant-baseline", "middle")

            }
            header.append("line")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", headerHeight)
                .attr("y2", headerHeight)
                .style("stroke", "black")
                .style("stroke-width", 3);



        } else { //no header
            headerHeight = 0
        }



        //  _____ _   ___ _    ___   ___  ___  _____   __
        // |_   _/_\ | _ ) |  | __| | _ )/ _ \|   \ \ / /
        //   | |/ _ \| _ \ |__| _|  | _ \ (_) | |) \ V /
        //   |_/_/ \_\___/____|___| |___/\___/|___/ |_|

        let tablebody = svg.append("g")
            .attr("transform", "translate(0," + (headerHeight + 1) + ")")

        // build data model
        let matrices: RenderableMatrix[] = this.viewModel.filters.filterMatrices(this.dataService.matrices).map(function(matrix: Matrix) {
            return new RenderableMatrix(matrix, self.viewModel);
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

        let yAxis = d3.axisLeft(y);
        let xAxis = d3.axisTop(x)
            .tickFormat(function(tactic: RenderableTactic) { return tactic.tactic.name; })
        

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
            .attr("fill", "#84d1e0")
            .attr("stroke", self.config.tableBorderColor);
        let subtechniqueRects = subtechniqueGroups.append("rect")
            .attr("class", "cell")
            .attr("height", y(1))
            .attr("width", x.bandwidth() - subtechniqueIndent)
            .attr("fill", "#e08484")
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
            .attr("visibility", function(technique: RenderableTechnique) { return technique.technique.subtechniques.length > 0 ? "visible" : "hidden"});

        // let sidebar = tacticGroups.append("g")
            // .attr("class", "sidebars").selectAll("polygon")
            // .data(function(tactic: RenderableTactic) { return tactic.techniques})
            // .enter().append("polygon")
            // .attr("class", "sidebar")
            // .attr("transform", function(technique: RenderableTechnique) {
            //     return `translate(0, ${y(technique.yPosition) + y(1)})`
            // })
            // .attr("points", function(technique: RenderableTechnique) {
            //     let points = [];
            //     points.push("0,0")
            //     points.push(`${subtechniqueIndent}, 0`)
            //     points.push(`${subtechniqueIndent}, ${y(technique.technique.subtechniques.length)}`)
            //     points.push(`${subtechniqueIndent - 3}, ${y(technique.technique.subtechniques.length)}`)
            //     points.push(`${subtechniqueIndent - 3}, ${3}`)
            //     return points.join(" ");
            // })
            // .attr("stroke", "red")
            // .attr("fill", "red")
            // .attr("opacity", "0.5");
        
        // let techniqueGroups = tacticGroups.selectAll("g")
        //     .data(function(tactic) { return tactic.techniques })
        //     .enter().append("g")
        //     .attr("class", "technique")
        //     .attr("transform", function(technique: RenderableTechnique) {
        //         let tactic: Tactic = d3.select(this.parentNode).data()[0];
        //         let translate = `translate(${x(tactic.id)}, ${y(technique.yPosition)})`
        //         // console.log(translate);
        //         return translate;
        //     });
        
        


        // // techniqueGroups.append("g")
        // //     .attr("class", "technique")
            
        // // add technique to techniqueGroups
        // techniqueGroups.append("rect")
        //     .attr("class", "supertechnique")
        //     .attr("height", y(1))
        //     .attr("width", x.bandwidth()/2)
        //     .attr("fill", "#84d1e0")
        //     .attr("stroke", "black");
        // // add subtechniques to techniqueGroups

        // techniqueGroups.selectAll("rect")
        //     .data(function(technique: RenderableTechnique) { return technique.subtechniques })
        //     .enter().append("rect")
        //     .attr("class", "subtechnique")
        //     .attr("x", x.bandwidth()/2)
        //     .attr("width",x.bandwidth()/2)
        //     .attr("height", y(1))
        //     .attr("y", function(subtechnique: RenderableTechnique, index) {
        //         return y(index)
        //     })
        //     .attr("fill", "#e08484")
        //     .attr("stroke", "black");
            // .attr("x", function(technique: Technique) { 
            //     return 
            // })
            // .attr("y", function(technique: RenderableTechnique, index) {
            //     console.log(technique);
            //     let result = y(technique.yPosition);
            //     console.log(result);
            //     return result;
            // })
            // .attr("height", function(technique: Technique) {
            //     return y(1);
            // })
            // .attr("width", x.bandwidth())
            // .attr("fill", "none")

        // techniqueGroups.append("group")
        //     .attr("class", "technique-cell")
        //     .attr("x", function(technique: Technique) { 
        //         let tactic: Tactic = getTactic(this);
        //         return x(tactic.id);
        //     })
        //     .attr("y", function(technique: RenderableTechnique, index) {
        //         console.log(technique);
        //         let result = y(technique.yPosition);
        //         console.log(result);
        //         return result;
        //     })
        //     .attr("height", function(technique: Technique) {
        //         return y(1);
        //     })
        //     .attr("width", x.bandwidth())
        //     .attr("fill", "none")
        //     .attr("stroke", "black")

        //  _    ___ ___ ___ _  _ ___
        // | |  | __/ __| __| \| |   \
        // | |__| _| (_ | _|| .` | |) |
        // |____|___\___|___|_|\_|___/

        // console.log(showLegend, showLegendInHeader && self.config.legendDocked)
        if (self.showLegend() && !(!self.config.showHeader && self.config.legendDocked)) {
            console.log("building legend")
            //legend
            let legendGroup = self.showLegendInHeader() ? header.append("g")
                .attr("transform", "translate(" + (headerSectionWidth * posX) + ",0)")
                                             : svg.append("g")
                .attr("transform", "translate("+legendX+","+legendY+")");
            legendGroup.append("rect")
                .attr("width", self.showLegendInHeader() ? headerSectionWidth : legendWidth)
                .attr("height", self.showLegendInHeader() ? headerHeight : legendHeight)
                .style("stroke-width", 1)
                .style("stroke", "black")
                .style("fill", "white");
            legendGroup.append("text")
                .text("legend")
                .attr("transform", "translate("+headerTextPad+", " + (headerFontSize + headerTextPad) +")")
                .attr("dx", 0)
                .attr("dy", 0)
                .attr("font-size", headerFontSize + fontUnits)
                .attr("fill", "black")
                .style("font-weight", "bold");;
            let legendItemHeight = self.showLegendInHeader() ? ((headerHeight - headerSectionTitleSep)/self.viewModel.legendItems.length) : ((legendHeight - headerSectionTitleSep)/self.viewModel.legendItems.length);
            let legendItemsGroup = legendGroup.selectAll("g")
                .data(self.viewModel.legendItems)
                .enter().append("g")
                .attr("transform", function(d,i) {
                    return "translate("+headerTextPad+"," + (headerSectionTitleSep + (legendItemHeight * i)) +")"
                });
            legendItemsGroup.append("text")
                .text(function(d) {return d.label})
                .attr("transform", "translate("+ (headerTextPad + 10) + "," + (6 + headerTextYOffset) + ")")
                // .attr("dominant-baseline", "middle")
                .attr("font-size", headerFontSize + fontUnits)
                .attr("fill", "black")
                .attr("dx", 0)
                .attr("dy", 0)
                .call(self.wrap, (self.showLegendInHeader() ? headerSectionWidth : legendWidth - 14), 0, self);
            legendItemsGroup.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .style("stroke-width", 1)
                .style("stroke", "black")
                .style("fill", function(d) { return d.color });
            // posX++
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
            // console.log(text)
            // text.selectAll("tspan").each(function(d, i, j) {
            //     // console.log(this, i, j.length)
            //     console.log(self.getSpacing(cellheight, j.length)[i])
            //     d3.select(this)
            //         .attr("dy", self.getSpacing(cellheight, j.length)[i])
            //         .attr("dominant-baseline", "middle")
            //
            // })
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
    constructor(matrix: Matrix, viewModel: ViewModel) {
        this.matrix = matrix;
        let filteredTactics = viewModel.filterTactics(matrix.tactics, matrix);
        for (let tactic of filteredTactics) {
            this.tactics.push(new RenderableTactic(tactic, matrix, viewModel));
        }
    }
}

class RenderableTactic {
    public readonly tactic: Tactic;
    public readonly techniques: RenderableTechnique[] = [];
    public readonly subtechniques: RenderableTechnique[] = [];
    public readonly height: number;
    constructor(tactic: Tactic, matrix: Matrix, viewModel: ViewModel) {
        this.tactic = tactic;
        let filteredTechniques = viewModel.filterTechniques(tactic.techniques, tactic, matrix);
        let yPosition = 0;
        for (let technique of filteredTechniques) {
            let filteredSubtechniques = viewModel.filterTechniques(technique.subtechniques, tactic, matrix)
            this.techniques.push(new RenderableTechnique(yPosition++, technique, tactic, matrix, viewModel));
            if (filteredSubtechniques.length > 0) {
                for (let subtechnique of filteredSubtechniques) {
                    this.subtechniques.push(new RenderableTechnique(yPosition++, subtechnique, tactic, matrix, viewModel));
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
    public readonly matrix: Matrix
    constructor(yPosition, technique: Technique, tactic: Tactic, matrix: Matrix, viewModel: ViewModel) {
        this.yPosition = yPosition;
        this.technique = technique;
        this.tactic = tactic;
        this.matrix = matrix;
    }
}

