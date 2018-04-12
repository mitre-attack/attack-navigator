import { Component, AfterViewInit, Input } from '@angular/core';
import { ViewModel } from "../viewmodels.service";
import { ConfigService } from "../config.service";
import { Technique } from '../data.service';
import * as is from 'is_js';
declare var d3: any; //d3js

@Component({
    selector: 'exporter',
    templateUrl: './exporter.component.html',
    styleUrls: ['./exporter.component.scss']
})
export class ExporterComponent implements AfterViewInit {

    @Input() exportData: ExportData;

    svgDivName = "svgInsert_tmp"
    constructor(private configService: ConfigService) { }

    ngAfterViewInit() {
        this.svgDivName = "svgInsert" + this.exportData.viewModel.uid;
        let self = this;
        console.log(self)
        //put at the end of the function queue so that the page can render before building the svg
        window.setTimeout(function() {self.buildSVG(self)}, 0)
    }

    buildSVG(self?): void {
        console.log("building SVG");
        if (!self) self = this;
        let width = Math.max(self.convertToPx(self.exportData.tableConfig.width, self.exportData.tableConfig.unit), 10)
        let height = Math.max(self.convertToPx(self.exportData.tableConfig.height, self.exportData.tableConfig.unit), 10)
        let tableFontSize = Math.max(self.exportData.tableConfig.tableFontSize, 1);
        let headerFontSize = Math.max(self.exportData.tableConfig.headerFontSize, 1);
        let fontUnits = 'px'

        let margin = {top: 5, right: 5, bottom: 5, left: 5};


        let element = <HTMLElement>document.getElementById(self.svgDivName);
        element.innerHTML = "";

        let svg = d3.select("#" + self.svgDivName).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "svg" + self.exportData.viewModel.uid) //Tag for downloadSVG
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let stroke_width = 1;
        svg.append("rect")
            .attr("width", width - margin.right - stroke_width/2)
            .attr("height", height - margin.bottom - stroke_width/2)
            .style("stroke", "black")
            .style("stroke-width", stroke_width)
            .style("fill", "none")


        //  _  _ ___   _   ___  ___ ___
        // | || | __| /_\ |   \| __| _ \
        // | __ | _| / _ \| |) | _||   /
        // |_||_|___/_/ \_\___/|___|_|_\

        let headerHeight = 133;
        if (self.exportData.tableConfig.showHeader) {
            let header = svg.append("g");
            header.append("rect")
                .attr("width", width)
                .attr("height", headerHeight)
                .style("fill", "rgba(99, 143, 98, 0.5)");
            // header text
            header.append("text")
                .text("header")
                .attr("x", "50%")
                .attr("y", headerHeight/2)
                .attr("font-size", headerFontSize + fontUnits)
                .attr("fill", "black");
        } else { //no header
            headerHeight = 0
        }


        //  _____ _   ___ _    ___   ___  ___  _____   __
        // |_   _/_\ | _ ) |  | __| | _ )/ _ \|   \ \ / /
        //   | |/ _ \| _ \ |__| _|  | _ \ (_) | |) \ V /
        //   |_/_/ \_\___/____|___| |___/\___/|___/ |_|

        let tablebody = svg.append("g")
            .attr("transform", "translate(0," + headerHeight + ")")


        //calculate cell height: the longest column decides the cell height
        let cellHeight = Number.MAX_VALUE;//Number.MAX_VALUE; //(height - margin.bottom - headerHeight)

        Object.keys(self.exportData.tactics).forEach(function(key: string) {
            let numVCells = (self.exportData.tactics[key].length) + 2 //extra two cells for the header
            let selfCellHeight = (height - margin.bottom - headerHeight)/numVCells
            cellHeight = Math.min(cellHeight, selfCellHeight)
        });
        cellHeight = Math.max(cellHeight, 1) //must be positive number

        // columns
        let columnWidth = (width - margin.right)/(Object.keys(self.exportData.tactics).length)
        let columns = tablebody.selectAll("g")
            .data(Object.keys(self.exportData.tactics)).enter()
            .append("g")
            .attr("transform", function(d,i) {
                // console.log(d,i)
                return "translate(" + columnWidth * i + ", 0)"
            });

        // split columns into headers and bodies
        let colHeaderHeight = 2 * cellHeight;
        let columnHeaders = columns.append("g")
            .attr("transform", "translate(0,0)");
        columnHeaders.append("rect")
            .attr("width", columnWidth)
            .attr("height", 2 * cellHeight)
            .style("stroke", "black")
            .style("fill", "none")
        //split headers into name and count cells
        let headerTacticNames = columnHeaders.append("g")
        .attr("transform", "translate(0,0)")
        let headerTechniqueCounts = columnHeaders.append("g")
            .attr("transform", "translate(0,"+cellHeight+")")
        headerTacticNames.append("text")
            .text(function(d) {return self.toCamelCase(d.replace(/-/g," "))})
            .attr("font-size", tableFontSize + fontUnits)
            .attr("transform", "translate(2, " + (tableFontSize + 1) +")")
            .attr("dx", 0)
            .attr("dy", 0)
            .style("font-weight", "bold")
            .call(self.wrap, columnWidth - 2, cellHeight - 2, self)
        headerTechniqueCounts.append("text")
            .text(function(d) {
                return self.exportData.tactics[d].length + " items"
            })
            .attr("font-size", tableFontSize + fontUnits)
            .attr("transform", "translate(1, " + (tableFontSize + 1) +")")
            .attr("dx", 0)
            .attr("dy", 0)
            .call(self.wrap, columnWidth, cellHeight, self)

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
            .style("stroke", "black")
            .style("fill", function(d) {
                if (!self.exportData.viewModel.hasTechniqueVM(d.technique_id)) return "white";
                let tvm = self.exportData.viewModel.getTechniqueVM(d.technique_id);
                if (tvm.color) return tvm.color
                if (tvm.score) return tvm.scoreColor
                return "none"
            });
        if (self.exportData.tableConfig.tableTextDisplay != "none") techniques.append("text")
            .text(function(d) {return self.exportData.tableConfig.tableTextDisplay == "name" ? d.name : d.technique_id})
            .attr("font-size", tableFontSize + fontUnits)
            .attr("transform", "translate(1, " + (tableFontSize + 1) +")")
            .attr("dx", 0)
            .attr("dy", 0)
            .call(self.wrap, columnWidth, cellHeight, self)

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
            lineNumber = 0,
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
                    let thisdy = ++lineNumber * lineHeight + dy
                    // if (self.convertToPx(thisdy, "em") > cellheight) return;
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", thisdy + "em").text(word);
                }
            }
        });
    }

    // Capitalizes the first letter of each word in a string
    toCamelCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    //following two functions are only used for iterating over tableconfig options: remove when tableconfig options are hardcoded in html
    getKeys(obj) { return Object.keys(obj) }
    type(obj) { return typeof(obj) }


}

export class ExportData {
    tableConfig: {
        width: number; //graphic width
        height: number; //graphic height
        unit: string; //units of width/height: px, cm, or in
        tableFontSize: number; //size of font in table, in pt
        tableTextDisplay: string; //"name", "id" or "none"
        showHeader: boolean; //show or hide the header
        headerFontSize: number; //size of font in header, in pt?

        showLegend: boolean; //show or hide the legend
        legendDocked: boolean; //dock the legend to the header
        legendX: number; //if undocked, where to place X
        legendY: number; //if undocked, where to place Y
    }


    viewModel: ViewModel;
    tactics: object;
    filteredTechniques: Technique[];
    constructor(viewModel, tactics, filteredTechniques: Technique[]) {
        this.viewModel = viewModel; this.tactics = tactics; this.filteredTechniques = filteredTechniques;
        this.tableConfig = {
            "width": 11,
            "height": 8.5,
            "unit": "in",
            "tableFontSize": 10,
            "tableTextDisplay": "name",
            "showHeader": true,
            "headerFontSize": 12,
            "showLegend": true,
            "legendDocked": true,
            "legendX": 0,
            "legendY": 0,
        }

    }
}
