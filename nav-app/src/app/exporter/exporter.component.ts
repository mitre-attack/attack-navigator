import { Component, AfterViewInit, Input } from '@angular/core';
import { ViewModel } from "../viewmodels.service";
import { ConfigService } from "../config.service";
import { Technique } from '../data.service';
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

    @Input() exportData: ExportData;

    svgDivName = "svgInsert_tmp"
    unitEnum = 0; //counter for unit change ui element
    constructor(private configService: ConfigService) { }

    ngAfterViewInit() {
        this.svgDivName = "svgInsert" + this.exportData.viewModel.uid;
        let self = this;
        this.exportData.filteredTechniques.forEach(function(technique: Technique) {
            if (self.exportData.viewModel.hasTechniqueVM(technique.technique_tactic_union_id)) {
                if (self.exportData.viewModel.getTechniqueVM(technique.technique_tactic_union_id).score != "") self.hasScores = true;
            }
        })
        //put at the end of the function queue so that the page can render before building the svg
        window.setTimeout(function() {self.buildSVG(self)}, 0)
    }

    //visibility of SVG parts
    //assess data in viewModel
    hasName(): boolean {return this.exportData.viewModel.name.length > 0}
    hasDescription(): boolean {return this.exportData.viewModel.description.length > 0}
    hasScores: boolean; //does the viewmodel have scores? built in ngAfterViewInit
    hasLegendItems(): boolean {return this.exportData.viewModel.legendItems.length > 0;}

    //above && user preferences
    showName(): boolean {return this.exportData.tableConfig.showName && this.hasName() && this.exportData.tableConfig.showHeader}
    showDescription(): boolean {return this.exportData.tableConfig.showDescription && this.hasDescription() && this.exportData.tableConfig.showHeader}
    showLayerInfo(): boolean {return (this.showName() || this.showDescription()) && this.exportData.tableConfig.showHeader}
    showFilters(): boolean {return this.exportData.tableConfig.showFilters && this.exportData.tableConfig.showHeader};
    showGradient(): boolean {return this.exportData.tableConfig.showGradient && this.hasScores  && this.exportData.tableConfig.showHeader}
    showLegend(): boolean {return this.exportData.tableConfig.showLegend && this.hasLegendItems()}
    showLegendInHeader(): boolean {return this.exportData.tableConfig.legendDocked && this.showLegend();}
    showItemCount(): boolean {return this.exportData.tableConfig.showTechniqueCount}
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

        let width = Math.max(self.convertToPx(self.exportData.tableConfig.width, self.exportData.tableConfig.unit)  - (margin.right + margin.left), 10); console.log("width", width);
        let height = Math.max(self.convertToPx(self.exportData.tableConfig.height, self.exportData.tableConfig.unit) - (margin.top + margin.bottom), 10); console.log("height", height)
        let headerHeight = Math.max(self.convertToPx(self.exportData.tableConfig.headerHeight, self.exportData.tableConfig.unit), 1); console.log("headerHeight", headerHeight);

        let legendX = Math.max(self.convertToPx(self.exportData.tableConfig.legendX, self.exportData.tableConfig.unit), 0);
        let legendY = Math.max(self.convertToPx(self.exportData.tableConfig.legendY, self.exportData.tableConfig.unit), 0);
        let legendWidth = Math.max(self.convertToPx(self.exportData.tableConfig.legendWidth, self.exportData.tableConfig.unit), 10);
        let legendHeight = Math.max(self.convertToPx(self.exportData.tableConfig.legendHeight, self.exportData.tableConfig.unit), 10);

        let tableFontSize = Math.max(self.exportData.tableConfig.tableFontSize, 1); console.log('tableFontSize', tableFontSize)
        let tableTextYOffset = ((tableFontSize/2) - (1/2));

        let tableTacticFontSize = Math.max(self.exportData.tableConfig.tableTacticFontSize, 1); console.log("tableTacticFontSize", tableTacticFontSize);
        let tableTacticTextYOffset = ((tableTacticFontSize/2) - (1/2));

        let headerFontSize = Math.max(self.exportData.tableConfig.headerFontSize, 1); console.log("headerFontSize", headerFontSize)
        let headerTextYOffset = ((headerFontSize/2) - (1/2))

        let headerLayerNameFontSize = Math.max(self.exportData.tableConfig.headerLayerNameFontSize, 1); console.log("headerLayerNameFontSize", headerLayerNameFontSize);
        let heafderLayerNameTextYOffset = ((headerLayerNameFontSize/2) - (1/2))

        let fontUnits = self.exportData.tableConfig.fontUnit;

        let headerTextPad = 6;
        let bodyTextPad = 3;


        //remove previous graphic
        let element = <HTMLElement>document.getElementById(self.svgDivName);
        element.innerHTML = "";

        let svg = d3.select("#" + self.svgDivName).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "svg" + self.exportData.viewModel.uid) //Tag for downloadSVG
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("font-family", self.exportData.tableConfig.font);
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

        if (self.exportData.tableConfig.showHeader) {
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
                        .text(self.exportData.viewModel.name)
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
                        .text(self.exportData.viewModel.description)
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
                        let selection = self.exportData.viewModel.filters.stages.selection;
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
                        let selection = self.exportData.viewModel.filters.platforms.selection;
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
                    .text(self.exportData.viewModel.gradient.minValue)
                    .attr("transform", "translate(0, " + (6 + headerTextYOffset) + ")")
                    .attr("font-size", headerFontSize + fontUnits)
                    // .attr("dominant-baseline", "middle")



                //set up gradient to bind
                let svgDefs = svg.append('defs');
                let gradientElement = svgDefs.append("linearGradient")
                    .attr("id", self.exportData.viewModel.uid + "gradientElement");
                for (let i = 0; i < self.exportData.viewModel.gradient.gradientRGB.length; i++) {
                    let color = self.exportData.viewModel.gradient.gradientRGB[i];
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
                    .attr("fill", "url(#" + self.exportData.viewModel.uid + "gradientElement)"); //bind gradient

                gradientContentGroup.append("text")
                    .text(self.exportData.viewModel.gradient.maxValue)
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

        //calculate cell height: the longest column decides the cell height
        let cellHeight = Number.MAX_VALUE;//Number.MAX_VALUE; //(height - margin.bottom - headerHeight)
        Object.keys(self.exportData.tactics).forEach(function(key: string) {
            let numVCells = (self.exportData.tactics[key].length) + 2 //extra two cells for the header
            let selfCellHeight = (height - (headerHeight + 1))/numVCells
            cellHeight = Math.min(cellHeight, selfCellHeight)
        });
        cellHeight = Math.max(cellHeight, 1) //must be positive number

        // columns
        let columnWidth = (width)/(self.exportData.orderedTactics.length)
        let columns = tablebody.selectAll("g")
            .data(self.exportData.orderedTactics).enter()
            .append("g")
            .attr("transform", function(d,i) {
                // console.log(d,i)
                return "translate(" + columnWidth * i + ", 0)"
            });

        // split columns into headers and bodies
        
        let colHeaderHeight = this.showItemCount() ? 2 * cellHeight : cellHeight;
        let columnHeaders = columns.append("g")
            .attr("transform", "translate(0,0)");
        columnHeaders.append("rect")
            .attr("width", columnWidth)
            .attr("height", colHeaderHeight)
            .style("stroke", self.exportData.tableConfig.tableBorderColor)
            .style("fill", self.exportData.viewModel.showTacticRowBackground ? self.exportData.viewModel.tacticRowBackground : 'white')
        columnHeaders.append("text")
            .text(function(d) {return self.exportData.tableConfig.tableTextDisplay != 2 ? self.toCamelCase(d.replace(/-/g," ")) : self.exportData.viewModel.acronym(d.replace(/-/g," "))})
            .attr("font-size", tableTacticFontSize + fontUnits)
            .attr("transform", "translate("+bodyTextPad+", " + ((self.getSpacing(colHeaderHeight, this.showItemCount() ? 2 : 1)[0]) + tableTacticTextYOffset) +")")
            .style("fill", self.exportData.viewModel.showTacticRowBackground ? tinycolor.mostReadable(self.exportData.viewModel.tacticRowBackground, ['white', 'black']): 'black')
            .attr("dx", 0)
            .attr("dy", 0)
            .style("font-weight", "bold")
            .call(self.wrap, columnWidth - 2 - bodyTextPad, cellHeight - 2, self)

        if (this.showItemCount()) columnHeaders.append("text")
            .text(function(d) {
                return self.exportData.tableConfig.tableTextDisplay != 2 ? self.exportData.tactics[d].length + " items" : self.exportData.tactics[d].length
            })
            .attr("font-size", tableTacticFontSize + fontUnits)
            .attr("transform", "translate("+bodyTextPad+", " + ((self.getSpacing(colHeaderHeight, 2)[1]) + tableTacticTextYOffset) +")")
            .style("fill", self.exportData.viewModel.showTacticRowBackground ? tinycolor.mostReadable(self.exportData.viewModel.tacticRowBackground, ['white', 'black']): 'black')

            .attr("dx", 0)
            .attr("dy", 0)
            .call(self.wrap, columnWidth - bodyTextPad, cellHeight, self)


        //column body

        let columnBodies = columns.append("g")
            .attr("transform", "translate(0,"+colHeaderHeight+")");

        let techniques = columnBodies.selectAll("g")
            .data(function(d) {
                // console.log(d)
                return self.exportData.tactics[d]
            }).enter().append("g")
                .attr("transform", function(d, i) {
                    return "translate(0," + i * cellHeight + ")"
                });


        techniques.append("rect")
            .attr("width", columnWidth)
            .attr("height", cellHeight)
            .style("stroke", self.exportData.tableConfig.tableBorderColor)
            .style("fill", function(d) {
                if (!self.exportData.viewModel.hasTechniqueVM(d.technique_tactic_union_id)) return "white";
                let tvm = self.exportData.viewModel.getTechniqueVM(d.technique_tactic_union_id);
                if (tvm.color) return tvm.color
                else if (tvm.score) return tvm.scoreColor
                else return "white"
            });
        if (self.exportData.tableConfig.tableTextDisplay != "none") techniques.append("text")
            .text(function(d) {
                return ['', d.name, self.exportData.viewModel.acronym(d.name), d.technique_id][self.exportData.tableConfig.tableTextDisplay];
            })
            .style("fill", function(d) {
                if (!self.exportData.viewModel.hasTechniqueVM(d.technique_tactic_union_id)) return "black";
                let tvm = self.exportData.viewModel.getTechniqueVM(d.technique_tactic_union_id);
                if (tvm.color) return tinycolor.mostReadable(tvm.color, ['white', 'black'])
                if (tvm.score) return tinycolor.mostReadable(tvm.scoreColor, ['white', 'black'])
            })

            .attr("font-size", tableFontSize + fontUnits)
            .attr("transform", "translate("+bodyTextPad+", "+ tableTextYOffset +")")
            .attr("dx", 0)
            .attr("dy", 0)
            .call(self.wrap, columnWidth - (2*bodyTextPad), cellHeight, self) //do this before recenter
            .call(self.recenter, cellHeight, self); //fix the tspan children's y locations. MUST CALL AFTER WRAP


        //  _    ___ ___ ___ _  _ ___
        // | |  | __/ __| __| \| |   \
        // | |__| _| (_ | _|| .` | |) |
        // |____|___\___|___|_|\_|___/

        // console.log(showLegend, showLegendInHeader && self.exportData.tableConfig.legendDocked)
        if (self.showLegend() && !(!self.exportData.tableConfig.showHeader && self.exportData.tableConfig.legendDocked)) {
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
            let legendItemHeight = self.showLegendInHeader() ? ((headerHeight - headerSectionTitleSep)/self.exportData.viewModel.legendItems.length) : ((legendHeight - headerSectionTitleSep)/self.exportData.viewModel.legendItems.length);
            let legendItemsGroup = legendGroup.selectAll("g")
                .data(self.exportData.viewModel.legendItems)
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
        let svgEl = document.getElementById("svg" + this.exportData.viewModel.uid);
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        let svgData = new XMLSerializer().serializeToString(svgEl);
        // // var svgData = svgEl.outerHTML;
        // console.log(svgData)
        // let svgData2 = new XMLSerializer().serializeToString(svgEl);
        // console.log(svgData2)
        let filename = this.exportData.viewModel.name.split(' ').join('_');
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

export class ExportData {
    tableConfig: {
        width: number; //graphic width
        height: number; //graphic height
        unit: string; //units of width/height: px, cm, or in
        fontUnit: string; //units for font size: px or pt

        font: string; //font to use in the table
        tableFontSize: number; //size of font in table, in px
        tableTacticFontSize: number; // size of tactic names font, in px
        tableTextDisplay: string; //0: no text, 1: technique name, 2: acronym of name, 3: technique ID
        tableBorderColor: string; //hex color for the table body border

        showHeader: boolean; //show or hide the header
        headerHeight: number; //height of header in unit
        headerFontSize: number; //size of font in header, in px
        headerLayerNameFontSize: number //size of layer name in header in px

        legendDocked: boolean; //dock the legend to the header
        legendX: number; //if undocked, where to place X
        legendY: number; //if undocked, where to place Y
        legendWidth: number; //if undocked, width of legend
        legendHeight: number; //if undocked, height of legend

        showLegend: boolean; //show or hide the legend
        showGradient: boolean; //show/hide the gradient in the header
        showFilters: true, //show/hide the filters in the header
        showDescription: true, //show/hide the description in the header
        showName: true //show/hide the layer name in the header
        showTechniqueCount: true //show/hide the technique count in tactic columns
    }


    viewModel: ViewModel;
    tactics: object;
    orderedTactics: string[];
    filteredTechniques: Technique[];
    constructor(viewModel, tactics, orderedTactics, filteredTechniques: Technique[]) {
        this.viewModel = viewModel; this.tactics = tactics; this.filteredTechniques = filteredTechniques;
        this.orderedTactics = orderedTactics;

        let tableTextDisplay = "0";
        switch (this.viewModel.viewMode) {
            case 0: {
                tableTextDisplay = "1"
                break;
            }
            case 1: {
                tableTextDisplay = "2"
                break;
            }
            case 2: {
                tableTextDisplay = "0"
                break;
            }
            default: {
                tableTextDisplay = "1"
            }
        }

        this.tableConfig = {
            "width": 11,
            "height": 8.5,
            "headerHeight": 1,

            "unit": "in",
            "fontUnit": "pt",

            "font": 'sans-serif',
            "tableFontSize": 5,
            "tableTacticFontSize": 6,
            "tableTextDisplay": tableTextDisplay,
            "tableBorderColor": "#000000",

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


    }
}
