import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ViewModel } from '../classes';
import { ConfigService } from '../services/config.service';
import { DataService } from '../services/data.service';
import { RenderableMatrix, RenderableTactic, RenderableTechnique } from './renderable-objects';
import tinycolor from 'tinycolor2';
import { isIE } from '../utils/utils';
import { NgIf, NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel, MatSelect, MatOption, MatSuffix } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ColorPickerDirective } from 'ngx-color-picker';
import { MatButton } from '@angular/material/button';
declare var d3: any; //d3js

@Component({
    selector: 'app-svg-export',
    templateUrl: './svg-export.component.html',
    styleUrls: ['./svg-export.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgIf,
        MatTooltip,
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        MatOption,
        MatInput,
        MatSuffix,
        NgClass,
        ColorPickerDirective,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class SvgExportComponent implements OnInit {
    // vm to render
    public viewModel: ViewModel;

    // SVG configuration
    public config: any = {};
    public svgConfigDefaults: any = {
        width: 11,
        height: 8.5,
        headerHeight: 1,
        unit: 'in',
        orientation: 'landscape',
        size: 'letter',
        fontSize: 4,
        autofitText: true,
        maxTextSize: Infinity,
        theme: 'light',
        showSubtechniques: 'expanded',
        font: 'sans-serif',
        tableBorderColor: '#6B7279',
        showHeader: true,
        legendDocked: true,
        legendX: 0,
        legendY: 0,
        legendWidth: 2,
        legendHeight: 1,
        showLegend: true,
        showGradient: true,
        showFilters: true,
        showAbout: true,
        showDomain: true,
        showAggregate: false,
    };

    // SVG settings
    public currentDropdown: string = null;
    public hasScores: boolean;
    private svgElementID: string = 'svgInsert_tmp';
    private buildSVGDebounce: boolean = false;

    // counter for unit change ui element
    public unitEnum: number = 0;

    // counter for theme change ui element
    public themeEnum: number = 0;

    // browser compatibility
    public get isIE(): boolean {
        return isIE();
    }

    // getters for visibility of SVG header sections
    public get hasName(): boolean {
        return this.viewModel.name.length > 0;
    }
    public get hasDomain(): boolean {
        return this.viewModel.domainVersionID.length > 0;
    }
    public get hasDescription(): boolean {
        return this.viewModel.description.length > 0;
    }
    public get hasLegendItems(): boolean {
        return this.viewModel.legendItems.length > 0;
    }

    // getters for user preferences
    public get showName(): boolean {
        return this.config.showAbout && this.hasName && this.config.showHeader;
    }
    public get showDomain(): boolean {
        return this.config.showDomain && this.hasDomain && this.config.showHeader;
    }
    public get showAggregate(): boolean {
        return this.viewModel.layout.showAggregateScores && this.config.showHeader;
    }
    public get showDescription(): boolean {
        return this.config.showAbout && this.hasDescription && this.config.showHeader;
    }
    public get showFilters(): boolean {
        return this.config.showFilters && this.config.showHeader;
    }
    public get showGradient(): boolean {
        return this.config.showGradient && this.hasScores && this.config.showHeader;
    }
    public get showLegend(): boolean {
        return this.config.showLegend && this.hasLegendItems;
    }
    public get showLegendContainer(): boolean {
        return this.showLegend || this.showGradient;
    }
    public get showLegendInHeader(): boolean {
        return this.config.legendDocked;
    }

    constructor(
        private dialogRef: MatDialogRef<SvgExportComponent>, // needed for mat-dialog-close
        private configService: ConfigService,
        private dataService: DataService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.config = this.svgConfigDefaults;
    }

    ngOnInit(): void {
        this.viewModel = this.data.vm;
        this.svgElementID = 'svgInsert' + this.viewModel.uid;

        let self = this;
        //determine if the layer has any scores
        let visibleTechniques = self.viewModel.getVisibleTechniquesList();
        for (let unionID of visibleTechniques) {
            let techniqueVM = self.viewModel.getTechniqueVM_id(unionID);
            if (techniqueVM.score != '') {
                self.hasScores = true;
                break; // at least one score found
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

        //initial table border color
        if (this.config.theme === 'light') {
            this.config.tableBorderColor = '#6B7279';
        } else if (this.config.theme === 'dark') {
            this.config.tableBorderColor = '#4c4c68';
        }

        // build SVG at end of fn queue so page can render before build
        window.setTimeout(function () {
            self.buildSVG(self);
        }, 0);
    }

    /** build the SVG */
    public buildSVG(self?: any, bypassDebounce: boolean = false): void {
        if (!self) self = this; // called from somewhere other than ngOnInit

        // debounce
        if (self.buildSVGDebounce && !bypassDebounce) return;
        if (!bypassDebounce) {
            self.buildSVGDebounce = true;
            window.setTimeout(function () {
                self.buildSVG(self, true);
            }, 500);
            return;
        }
        self.buildSVGDebounce = false;

        // set svg size
        this.setSize(self, self.config.size, self.config.orientation);

        // calculate svg height and width
        let margin = { top: 5, right: 5, bottom: 5, left: 5 };
        let width = Math.max(self.toPx(self.config.width, self.config.unit) - (margin.right + margin.left), 10);
        let svgWidth = width + margin.left + margin.right;
        let height = Math.max(self.toPx(self.config.height, self.config.unit) - (margin.top + margin.bottom), 10);
        let svgHeight = height + margin.top + margin.bottom;
        let headerHeight = Math.max(self.toPx(self.config.headerHeight, self.config.unit), 1);

        // remove previous graphic
        let svgElement: HTMLElement = document.getElementById(self.svgElementID);
        svgElement.innerHTML = '';

        // create new SVG
        let svg = d3
            .select('#' + self.svgElementID)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('id', 'svg' + self.viewModel.uid) // SVG download tag
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .style('font-family', self.config.font);

        // -----------------------------------------------------------------------------
        // LEGEND
        // -----------------------------------------------------------------------------

        let legendSection = { title: 'legend', contents: [] };

        // scores and gradient
        if (self.hasScores && self.showGradient) {
            legendSection.contents.push({ label: 'gradient', data: self.buildGradient() });
        }

        // legend items
        if (self.showLegend) {
            legendSection.contents.push({ label: 'legend', data: self.buildLegend() });
        }

        // -----------------------------------------------------------------------------
        // HEADER
        // -----------------------------------------------------------------------------

        if (self.config.showHeader) {
            let headerSections: HeaderSection[] = [];

            // about section
            if (self.showName || self.showDescription) {
                let aboutSection = { title: 'about', contents: [] };
                if (self.showName) aboutSection.contents.push({ label: 'name', data: this.viewModel.name });
                if (self.showDescription) aboutSection.contents.push({ label: 'description', data: this.viewModel.description });
                headerSections.push(aboutSection);
            }

            // domain section
            let domainSection = { title: 'domain', contents: [] };
            if (self.showDomain) {
                let domain = this.dataService.getDomain(this.viewModel.domainVersionID);
                domainSection.contents.push({ label: 'domain', data: `${domain.name} v${domain.version.number}` });
            }

            // platform section
            let platformSection = { title: 'platforms', contents: [] };
            if (self.showFilters) {
                let filterData = { label: 'platforms', data: this.viewModel.filters.platforms.selection.join(', ') };

                // domain + platforms
                if (self.showAggregate) {
                    domainSection.title = 'domain & platforms';
                    domainSection.contents.push(filterData);
                } else {
                    platformSection.contents.push(filterData);
                }
            }

            // add relevant sections to header
            if (domainSection.contents.length > 0) headerSections.push(domainSection);
            if (platformSection.contents.length > 0) headerSections.push(platformSection);

            // aggregate scores
            if (self.showAggregate) {
                let aggregateSection = { title: 'aggregate', contents: [] };
                aggregateSection.contents.push({
                    label: 'function',
                    data: 'showing aggregate scores using the ' + this.viewModel.layout.aggregateFunction + ' aggregate function',
                });
                if (this.viewModel.layout.countUnscored) {
                    aggregateSection.contents.push({ label: 'unscored', data: 'includes unscored techniques as having a score of 0' });
                }
                headerSections.push(aggregateSection);
            }

            // legend section
            if (self.showLegendContainer && self.showLegendInHeader) headerSections.push(legendSection);

            // build header
            let headerGroup = svg.append('g');
            let headerX = d3
                .scaleBand()
                .paddingInner(0.05)
                .domain(headerSections.map((section) => section.title))
                .range([0, width]);

            // build header sections
            for (let section of headerSections) {
                let sectionGroup = headerGroup.append('g');
                if (headerSections.length > 1) {
                    sectionGroup.attr('transform', `translate(${headerX(section.title)}, 0)`);
                }
                let headerWidth = headerSections.length == 1 ? width : headerX.bandwidth();
                self.buildHeaderSection(this, sectionGroup, section, headerWidth, headerHeight);
            }

            if (headerSections.length == 0) headerHeight = 0; // no header sections
        } else {
            //no header
            headerHeight = 0;
        }

        // -----------------------------------------------------------------------------
        // MATRIX
        // -----------------------------------------------------------------------------

        // build data model
        let datatable = svg.append('g').attr('transform', 'translate(0,' + (headerHeight + 1) + ')');
        let domain = self.dataService.getDomain(self.viewModel.domainVersionID);
        let matrices: RenderableMatrix[] = domain.matrices.map((m) => new RenderableMatrix(m, self.viewModel, self.config));

        // get flattened list of tactics
        let tactics: RenderableTactic[] = [];
        for (let matrix of matrices) {
            tactics = tactics.concat(matrix.tactics);
        }

        // build tactic columns
        let xRange = d3
            .scaleBand()
            .domain(tactics.map((t) => t.tactic.id))
            .range([0, width]);

        let yRange = d3
            .scaleLinear()
            .domain([
                d3.max(tactics, function (tactic: RenderableTactic) {
                    return tactic.height;
                }),
                0,
            ])
            .range([height - headerHeight, 0]);

        // tactic row background
        let subtechniqueIndent = Math.min(2 * yRange(1), 15);
        if (self.viewModel.showTacticRowBackground) {
            datatable
                .append('rect')
                .attr('class', 'tactic-header-background')
                .attr('width', width)
                .attr('height', yRange(1))
                .attr('fill', self.viewModel.tacticRowBackground)
                .attr('stroke', self.config.tableBorderColor);
        }

        // tactic names
        let tacticGroups = datatable
            .append('g')
            .selectAll('g')
            .data(tactics)
            .enter()
            .append('g')
            .attr('class', function (tactic: RenderableTactic) {
                return 'tactic ' + tactic.tactic.shortname;
            })
            .attr('transform', function (tactic: RenderableTactic) {
                return `translate(${xRange(tactic.tactic.id)}, 0)`;
            });

        // add technique groups to tactic column
        let techniqueGroups = tacticGroups
            .append('g')
            .attr('class', 'techniques')
            .selectAll('g')
            .data(function (tactic: RenderableTactic) {
                return tactic.techniques;
            })
            .enter()
            .append('g')
            .attr('class', function (technique: RenderableTechnique) {
                return 'technique ' + technique.technique.attackID;
            })
            .attr('transform', function (technique: RenderableTechnique) {
                return `translate(0, ${yRange(technique.yPosition)})`;
            });

        // add sub-technique groups to tactic column
        let subtechniqueGroups = tacticGroups
            .append('g')
            .attr('class', 'subtechniques')
            .selectAll('g')
            .data(function (tactic: RenderableTactic) {
                return tactic.subtechniques;
            })
            .enter()
            .append('g')
            .attr('class', function (subtechnique: RenderableTechnique) {
                return 'subtechnique ' + subtechnique.technique.attackID;
            })
            .attr('transform', function (subtechnique: RenderableTechnique) {
                return `translate(${subtechniqueIndent}, ${yRange(subtechnique.yPosition)})`;
            });

        // add cell style to techniques
        techniqueGroups
            .append('rect')
            .attr('class', 'cell')
            .attr('height', yRange(1))
            .attr('width', xRange.bandwidth())
            .attr('fill', function (technique: RenderableTechnique) {
                if (technique.fill !== null) {
                    return technique.fill;
                } else {
                    if (self.config.theme === 'light') {
                        return '#ffffff';
                    } else {
                        return '#2e2e3f';
                    }
                }
            })
            .attr('stroke', self.config.tableBorderColor);

        // add cell style to sub-techniques
        subtechniqueGroups
            .append('rect')
            .attr('class', 'cell')
            .attr('height', yRange(1))
            .attr('width', xRange.bandwidth() - subtechniqueIndent)
            .attr('fill', function (subtechnique: RenderableTechnique) {
                if (subtechnique.fill !== null) {
                    return subtechnique.fill;
                } else {
                    if (self.config.theme === 'light') {
                        return '#ffffff';
                    } else {
                        return '#2e2e3f';
                    }
                }
            })
            .attr('stroke', self.config.tableBorderColor);

        // add styling for sub-technique sidebar
        let sidebarWidth: number = 3;
        subtechniqueGroups
            .append('rect')
            .attr('class', 'cell')
            .attr('height', yRange(1))
            .attr('width', sidebarWidth)
            .attr('transform', `translate(${-sidebarWidth}, 0)`)
            .attr('fill', self.config.tableBorderColor)
            .attr('stroke', self.config.tableBorderColor);
        techniqueGroups
            .append('polygon')
            .attr('class', 'sidebar')
            .attr('transform', `translate(0, ${yRange(1)})`)
            .attr('points', function (technique: RenderableTechnique) {
                return [
                    '0,0',
                    `${subtechniqueIndent - sidebarWidth},0`,
                    `${subtechniqueIndent - sidebarWidth},${Math.min(
                        subtechniqueIndent - sidebarWidth,
                        yRange(self.viewModel.filterTechniques(technique.technique.subtechniques, technique.tactic, technique.matrix).length)
                    )}`,
                ].join(' ');
            })
            .attr('fill', self.config.tableBorderColor)
            .attr('visibility', function (technique: RenderableTechnique) {
                return technique.technique.subtechniques.length > 0 && technique.showSubtechniques ? 'visible' : 'hidden';
            });

        // -----------------------------------------------------------------------------
        // CELL TEXT
        // -----------------------------------------------------------------------------

        // track smallest optimal font size
        let minFontSize = Infinity;

        // set technique font size
        techniqueGroups
            .append('text')
            .text(function (technique: RenderableTechnique) {
                return technique.text;
            })
            .attr('font-size', function (technique: RenderableTechnique) {
                const fontSize = self.optimalFontSize(this, technique.text, xRange.bandwidth(), yRange(1), false);
                if (fontSize < minFontSize) minFontSize = fontSize;
                return fontSize;
            })
            .attr('fill', function (technique: RenderableTechnique) {
                if (technique.textColor !== null) {
                    return technique.textColor;
                } else {
                    if (self.config.theme === 'light') {
                        return '#000000';
                    } else {
                        return '#ffffff';
                    }
                }
            })
            .each(function () {
                self.verticalAlignCenter(this);
            });

        // set sub-technique font size
        subtechniqueGroups
            .append('text')
            .text(function (subtechnique: RenderableTechnique) {
                return subtechnique.text;
            })
            .attr('font-size', function (subtechnique: RenderableTechnique) {
                const fontSize = self.optimalFontSize(this, subtechnique.text, xRange.bandwidth() - subtechniqueIndent, yRange(1), false);
                if (fontSize < minFontSize) minFontSize = fontSize;
                return fontSize;
            })
            .attr('fill', function (subtechnique: RenderableTechnique) {
                if (subtechnique.textColor !== null) {
                    return subtechnique.textColor;
                } else {
                    if (self.config.theme === 'light') {
                        return '#000000';
                    } else {
                        return '#ffffff';
                    }
                }
            })
            .each(function () {
                self.verticalAlignCenter(this);
            });

        // set technique and sub-technique groups to the same font size
        this.config.maxTextSize = minFontSize;
        if (this.config.autofitText) {
            this.config.fontSize = minFontSize.toFixed(2);
        }
        if (this.config.autofitText) {
            techniqueGroups.select('text').attr('font-size', minFontSize);
            subtechniqueGroups.select('text').attr('font-size', minFontSize);
        } else {
            techniqueGroups.select('text').attr('font-size', this.config.fontSize);
            subtechniqueGroups.select('text').attr('font-size', this.config.fontSize);
        }

        // track the smallest optimal font size for tactics
        let minTacticFontSize = Infinity;

        // set tactic font size
        let tacticLabels = tacticGroups.append('g').attr('class', 'tactic-label');
        tacticLabels
            .append('text')
            .text(function (tactic: RenderableTactic) {
                return tactic.tactic.name;
            })
            .attr('font-size', function (tactic: RenderableTactic) {
                const fontSize = self.optimalFontSize(this, tactic.tactic.name, xRange.bandwidth(), yRange(1), true);
                if (fontSize < minTacticFontSize) minTacticFontSize = fontSize;
                return fontSize;
            })
            .attr('fill', function (tactic: RenderableTactic) {
                if (self.viewModel.showTacticRowBackground) return tinycolor.mostReadable(self.viewModel.tacticRowBackground, ['white', 'black']);
                else return self.config.theme === 'light' ? 'black' : 'white';
            })
            .attr('font-weight', 'bold')
            .each(function () {
                self.verticalAlignCenter(this);
            });

        // set tactic labels to same font size
        tacticLabels.select('text').attr('font-size', minTacticFontSize);

        // -----------------------------------------------------------------------------
        // UNDOCKED LEGEND
        // -----------------------------------------------------------------------------

        if (self.showLegendContainer && !self.showLegendInHeader) {
            // calculate legend height and width
            let legendX = Math.max(self.toPx(self.config.legendX, self.config.unit), 0);
            let legendY = Math.max(self.toPx(self.config.legendY, self.config.unit), 0);
            let legendWidth = Math.max(self.toPx(self.config.legendWidth, self.config.unit), 10);
            let legendHeight = Math.max(self.toPx(self.config.legendHeight, self.config.unit), 10);

            let legendGroup = datatable.append('g').attr('transform', `translate(${legendX}, ${legendY})`);
            self.buildHeaderSection(this, legendGroup, legendSection, legendWidth, legendHeight);
        }
    }

    /**
     * Build the box for the given header section
     * @param self      this DOM node
     * @param group     outer group element
     * @param section   header section
     * @param width     width of the cell
     * @param height    height of the cell
     */
    private buildHeaderSection(self: any, group: any, section: HeaderSection, width: number, height: number): void {
        let padding = 5;
        height -= 2 * padding; // adjust height for padding

        // header section group
        let boxGroup = group.append('g').attr('transform', `translate(0,${padding})`);

        // create outer box
        boxGroup
            .append('rect')
            .attr('class', 'header-box')
            .attr('width', width)
            .attr('height', height)
            .attr('stroke', self.config.theme === 'light' ? 'black' : '#4c4c68')
            .attr('fill', self.config.theme === 'light' ? 'white' : '#1a1a23')
            .attr('rx', padding); // rounded corner

        // box title
        let boxTitle = boxGroup
            .append('text')
            .attr('class', 'header-box-label')
            .text(section.title)
            .attr('x', 2 * padding)
            .attr('font-size', 12)
            .attr('fill', self.config.theme === 'light' ? 'black' : 'white')
            .each(function () {
                self.verticalAlignCenter(this);
            });

        // add cover mask so that the box lines crop around the text
        let bbox = boxTitle.node().getBBox();
        let coverPadding = 2;
        boxGroup
            .append('rect')
            .attr('class', 'label-cover')
            .attr('x', bbox.x - coverPadding)
            .attr('y', bbox.y - coverPadding)
            .attr('width', bbox.width + 2 * coverPadding)
            .attr('height', bbox.height + 2 * coverPadding)
            .attr('fill', self.config.theme === 'light' ? 'white' : '#1a1a23')
            .attr('rx', padding); // rounded corner
        boxTitle.raise(); // push title to front

        // add content to box
        let boxContentGroup = boxGroup
            .append('g')
            .attr('class', 'header-box-content')
            .attr('fill', self.config.theme === 'light' ? 'black' : 'white')
            .attr('transform', `translate(${padding}, 0)`);

        let yRange = d3
            .scaleBand()
            .padding(0.05)
            .align(0.5)
            .domain(
                section.contents.map(function (content) {
                    return content.label;
                })
            )
            .range([0, height]);

        // add each subsection to box
        let contentWidth = width - 2 * padding;
        for (let i = 0; i < section.contents.length; i++) {
            let subsection = section.contents[i];
            let contentGroup = boxContentGroup.append('g').attr('transform', `translate(0, ${yRange(subsection.label)})`);

            if (typeof subsection.data == 'string') {
                // add text to contentGroup
                contentGroup
                    .append('text')
                    .text(subsection)
                    .attr('font-size', function () {
                        return self.optimalFontSize(this, subsection.data as string, contentWidth, yRange.bandwidth(), false, 12);
                    })
                    .each(function () {
                        self.verticalAlignCenter(this);
                    });
            } else {
                // call callback to add complex data to contentGroup
                subsection.data(self, contentGroup, contentWidth);
            }
            if (i != section.contents.length - 1) {
                // add dividing line
                contentGroup
                    .append('line')
                    .attr('x1', 0)
                    .attr('x2', contentWidth)
                    .attr('y1', yRange.bandwidth())
                    .attr('y2', yRange.bandwidth())
                    .attr('stroke', '#dddddd');
            }
        }
    }

    /** Callback function to build the legend section */
    private buildLegend(): Function {
        return function (self, group, width) {
            // legend colors
            let colorScale = d3
                .scaleOrdinal()
                .domain(
                    self.viewModel.legendItems.map(function (item) {
                        return item.label;
                    })
                )
                .range(
                    self.viewModel.legendItems.map(function (item) {
                        return item.color;
                    })
                );

            // legend svg group
            group
                .append('g')
                .attr('transform', 'translate(0, 5)')
                .call(
                    d3
                        .legendColor()
                        .shapeWidth(width / self.viewModel.legendItems.length)
                        .shapePadding(0)
                        .shape('rect')
                        .orient('horizontal')
                        .scale(colorScale)
                        .labelOffset(2)
                );
        };
    }

    /** Callback function to build the gradient section */
    private buildGradient(): Function {
        return function (self, group, width) {
            // build gradient
            let gradient = [];
            for (let i = 0; i < self.viewModel.gradient.colors.length; i++) {
                let percent = i / (self.viewModel.gradient.colors.length - 1);
                gradient.push(d3.interpolateNumber(self.viewModel.gradient.minValue, self.viewModel.gradient.maxValue)(percent));
            }

            // build color scale
            let colorScale = d3
                .scaleLinear()
                .domain(gradient)
                .range(self.viewModel.gradient.colors.map((color) => color.color));

            // gradient svg group
            let nCells = gradient.length * 2;
            group
                .append('g')
                .attr('transform', 'translate(0, 5)')
                .call(
                    d3
                        .legendColor()
                        .shapeWidth(width / nCells)
                        .shapePadding(0)
                        .cells(nCells)
                        .shape('rect')
                        .orient('horizontal')
                        .scale(colorScale)
                        .labelOffset(2)
                        .labelFormat(d3.format('0.02r'))
                );
        };
    }

    /**
     * Set width and height based on selected size and orientaiton
     * @param {any}    self this DOM node
     * @param {string} size dimensions
     * @param {string} orientation  portrait or landscape
     */
    private setSize(self: any, size: string, orientation: string) {
        const ratioMap = {
            letter: { portrait: [8.5, 11], landscape: [11, 8.5] },
            legal: { portrait: [8.5, 14], landscape: [14, 8.5] },
            small: { portrait: [11, 17], landscape: [17, 11] },
            medium: { portrait: [18, 24], landscape: [24, 18] },
            large: { portrait: [24, 36], landscape: [36, 24] },
        };

        if (size !== 'custom') {
            const [w, h] = ratioMap[size][orientation];
            self.config.width = w;
            self.config.height = h;
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
                this.verticalAlignCenter(child, self.getAttribute('font-size'));
            }
        } else {
            // transform by half the font size - 1/2px for proper centering
            fontSize = fontSize ? fontSize : self.getAttribute('font-size');
            if (fontSize.endsWith('px')) fontSize = Number(fontSize.split('px')[0]);
            let yPosition = self.hasAttribute('y') ? Number(self.getAttribute('y')) : 0;
            let newYPosition = yPosition + Math.floor(fontSize * 0.3);
            d3.select(self).attr('y', newYPosition);
        }
    }

    /**
     * Divide distance into divisions equidistant anchor points S.T they all have equal
     * padding from each other and the beginning and end of the distance
     * @param  distance  distance to divide
     * @param  divisions number of divisions
     * @return number[] where each number corresponds to a division-center offset
     */
    private getSpacing(distance: number, divisions: number): number[] {
        let res = [];
        let spacing = (distance - 1) / (divisions * 2);
        for (let i = 1; i <= divisions * 2; i += 2) {
            res.push(1 + spacing * i);
        }
        return res;
    }

    /**
     * Insert line breaks
     * @param self      this DOM node
     * @param words     array of words to space
     * @param padding   element padding
     * @param spacing   distance to space text inside element
     * @param center    center the text?
     * @param width     width of the cell
     * @param height    height of the cell
     */
    private insertLineBreaks(self: any, words: string[], padding: number, spacing: number, center: boolean, width: number, height: number) {
        let element = d3.select(self);

        // clear previous content
        element.text('');
        while (self.firstChild) self.removeChild(self.firstChild);

        let division = this.getSpacing(spacing, words.length);
        for (let i = 0; i < words.length; i++) {
            let tspan = element.append('tspan').text(words[i]);
            if (center) tspan.attr('text-anchor', 'middle');
            tspan.attr('x', center ? width / 2 : padding).attr('y', (height - spacing) / 2 + division[i]);
        }
    }

    /**
     * Find the font size for the given array of words to be broken onto
     * 1 line each
     * @param self          this DOM node
     * @param text          text to render
     * @param width         width of the cell
     * @param height        height of the cell
     * @param center        center the text?
     * @param maxFontSize   maximum font size, default 12
     * @returns the largest possible font size
     */
    private findSize(self: any, words: string[], width: number, height: number, center: boolean, maxFontSize: number = 12): number {
        let padding = 4;
        if (!this.config.autofitText) {
            padding = 1;
        }

        // break into multiple lines
        let distance = Math.min(height, (maxFontSize + 3) * words.length);
        this.insertLineBreaks(self, words, padding, distance, center, width, height);

        // find text size to fit height of cell
        let textHeight = Math.min(distance / words.length, height) * 0.8;

        // find text size to fit width of cell
        let longestWordLength = -Infinity;
        for (let word of words) {
            longestWordLength = Math.max(longestWordLength, word.length);
        }
        let textWidth = ((width - 2 * padding) / longestWordLength) * 1.45;

        return Math.min(maxFontSize, textHeight, textWidth);
    }

    /**
     * Calculate the optimal font size for the given text in the given
     * sizing parameters
     * @param self          this DOM node
     * @param text          text to render
     * @param width         width of the cell
     * @param height        height of the cell
     * @param center        center the text?
     * @param maxFontSize   maximum font size, default 12
     * @returns the size in pixels
     */
    private optimalFontSize(self: any, text: string, width: number, height: number, center: boolean, maxFontSize: number = 12): number {
        let words = text.split(' ');
        let optimalSize = -Infinity;
        let wordArrangement = [];

        // too many combinations causes page lagging
        let num_breaks = 1;
        if (words.length < 20) num_breaks = 3;
        else if (words.length < 50) num_breaks = 2;

        let breaks = Array.from(this.findBreaks(words.length, num_breaks));
        for (let b of breaks) {
            // find the best option for proposed placements generated
            // b is the binary representation of newline locations (e.g. 001011)
            // where 1 is a newline and 0 is a space
            let wordList = [];

            for (let i = 0; i < b.length; i++) {
                if (b[i] === '0') {
                    // join with space
                    if (wordList.length == 0) wordList.push(words[i]);
                    else wordList[wordList.length - 1] = wordList[wordList.length - 1] + ' ' + words[i];
                } else {
                    // join with newline
                    wordList.push(words[i]);
                }
            }

            let size = this.findSize(self, wordList, width, height, center, maxFontSize);
            if (size > optimalSize) {
                optimalSize = size;
                wordArrangement = wordList;
            }
            if (size == maxFontSize) break; // max font size found, stop search
        }

        this.findSize(self, wordArrangement, width, height, center, maxFontSize);
        return optimalSize;
    }

    /**
     * Determine placement of line breaks
     * @param spaces number of spaces in the words
     * @param breaks number of breaks to insert
     * @returns the placement of line breaks represented as [01]+ where 1=break and 0=space
     */
    private findBreaks(spaces: number, breaks: number): Set<string> {
        let placement = new Set<string>();
        let initial_breaks = [];
        while (initial_breaks.length < spaces) initial_breaks.push(0);
        placement.add(initial_breaks.join(''));

        function recurse(currPlacement, depth, breaks) {
            for (let i = 0; i < currPlacement.length; i++) {
                let p = JSON.parse(JSON.stringify(currPlacement));
                p[i] = 1;
                placement.add(p.join(''));
                if (depth < breaks - 1) recurse(p, depth + 1, breaks);
            }
        }
        recurse(initial_breaks, 0, breaks);
        return placement;
    }

    /**
     * Convert any length in various units to pixels
     * @param  quantity what length
     * @param  unit     which unit system (in, cm, px, em, pt)
     * @return          that length in pixels
     */
    private toPx(quantity: number, unit: string): number {
        let factor: any;
        if (unit == 'in') factor = 96;
        else if (unit == 'cm') factor = 3.779375 * 10;
        else if (unit == 'px') factor = 1;
        else if (unit == 'em') factor = 16;
        else if (unit == 'pt') factor = 1.33;
        else {
            console.error('unknown unit', unit);
            factor = 0;
        }
        return quantity * factor;
    }

    /** Download the SVG */
    public downloadSVG(): void {
        // get SVG element
        let svgElement = document.getElementById('svg' + this.viewModel.uid);
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        // generate filename
        let filename = this.viewModel.name.split(' ').join('_');
        // remove all non alphanumeric characters
        filename = filename.replace(/\W/g, '') + '.svg';

        // build SVG blob
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([preface, svgData], { type: 'image/svg+xml;charset=utf-8' });

        // download
        if (this.isIE) {
            const nav = window.navigator as any;
            nav.msSaveOrOpenBlob(svgBlob, filename);
        } else {
            const downloadLink = document.createElement('a');
            downloadLink.download = filename;
            downloadLink.href = URL.createObjectURL(svgBlob);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
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
