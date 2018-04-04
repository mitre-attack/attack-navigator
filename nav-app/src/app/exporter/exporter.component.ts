import { Component, AfterViewInit, Input } from '@angular/core';
import { ViewModel } from "../viewmodels.service";
import { ConfigService } from "../config.service";
import * as is from 'is_js';
declare var d3: any; //d3js

@Component({
    selector: 'exporter',
    templateUrl: './exporter.component.html',
    styleUrls: ['./exporter.component.scss']
})
export class ExporterComponent implements AfterViewInit {

    @Input() viewModel: ViewModel;

    uid = "foo"
    svgDivName = "svgInsert" + this.uid;
    width: number = 500;
    height: number = 500;
    fontSize: number = 12;
    whUnits: string = 'px'; //can also be 'cm', 'in'
    constructor(private configService: ConfigService) { }

    ngAfterViewInit() {
        console.log(this.viewModel)
        this.buildSVG()
    }

    buildSVG(): void {
        let width = this.width
        let height = this.height;
        let whUnits = this.whUnits;
        let fontSize = this.fontSize;
        let fontUnits = 'pt'
        let self = this;

        console.log("building SVG");
        var margin = {top: 5, right: 5, bottom: 5, left: 5};
        console.log(width, height, whUnits)
        let element = <HTMLElement>document.getElementById(this.svgDivName);
        element.innerHTML = "";

        let svg = d3.select("#" + this.svgDivName).append("svg")
            .attr("width", width + whUnits)
            .attr("height", height + whUnits)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "svg" + this.uid) //Tag for downloadSVG
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        console.log(svg)
        svg.append("rect")
            .attr("width", width + whUnits)
            .attr("height", height + whUnits)
            .attr("fill", "rgb(99, 143, 98)")
        svg.append("text").text("test text").attr("x", 0).attr("y", fontSize).attr("font-size", fontSize + fontUnits).attr("fill", "white")

        //
        // d3.select("#download-button" + this.uid).on("click", function(){
        //     console.log(this)
        //     d3.select("#download" + self.uid)
        //     .attr("href", 'data:application/octet-stream;base64,' + btoa(d3.select("#"+self.svgDivName).html()))
        //     .attr("download", "export.svg")
        // })

    }
    downloadSVG() {
        let svgEl = document.getElementById("svg" + this.uid);
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        let svgData = new XMLSerializer().serializeToString(svgEl);
        // // var svgData = svgEl.outerHTML;
        // console.log(svgData)
        // let svgData2 = new XMLSerializer().serializeToString(svgEl);
        // console.log(svgData2)
        let filename = this.viewModel.name.split(' ').join('_') + ".svg"
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
}
