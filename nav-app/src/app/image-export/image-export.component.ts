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
    selector: 'app-image-export',
    templateUrl: './image-export.component.html',
    styleUrls: ['./image-export.component.scss'],
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
export class ImageExportComponent implements OnInit {
    // vm to render
    public viewModel: ViewModel;

    // SVG configuration
    public config: any = {};
    public svgConfigDefaults: any = {
        // Match the standalone generator's base Enterprise matrix canvas and
        // 84 px header at Navigator's 96 px/in. Fit mode adds optional footer space.
        width: 34.875,
        height: 18.2083333333,
        headerHeight: 0.875,
        unit: 'in',
        orientation: 'landscape',
        size: 'matrix',
        fontSize: 18,
        autofitText: false,
        maxTextSize: Infinity,
        theme: 'light',
        showSubtechniques: 'expanded',
        spanAdjacentTechniques: false,
        showSubtechniqueMarker: true,
        font: 'Arial Narrow, Aptos Narrow, Roboto Condensed, Liberation Sans Narrow, sans-serif',
        tableBorderColor: '#6B7279',
        showHeader: true,
        showCopyright: true,
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
    private readonly matrixColumnWidth: number = 220;
    private readonly matrixCellHeight: number = 30;
    private readonly matrixMargin: number = 24;
    private readonly copyrightFooterHeight: number = 56;
    private readonly pdfFontFamily: string = 'Roboto Condensed';
    private readonly pdfFontPath: string = 'assets/fonts/roboto-condensed';
    private pdfBrowserFontsReady: Promise<void> = null;

    public exportInProgress: boolean = false;
    public exportError: string = '';

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
        return this.showLegend || this.showGradient || this.config.showSubtechniqueMarker;
    }
    public get showLegendInHeader(): boolean {
        return this.config.legendDocked;
    }

    constructor(
        private dialogRef: MatDialogRef<ImageExportComponent>, // needed for mat-dialog-close
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
        if (self.config.showSubtechniqueMarker) legendSectionCount++;
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

        // Build the render model before sizing the SVG so "Fit matrix" can
        // preserve the default column and cell dimensions for every domain
        // and sub-technique expansion state.
        let domain = self.dataService.getDomain(self.viewModel.domainVersionID);
        let tacticCount = domain.matrices.reduce((count, matrix) => count + self.viewModel.filterTactics(matrix.tactics, matrix).length, 0);
        const sizingMargin = self.config.size === 'matrix' ? self.matrixMargin : 5;
        const configuredWidth = self.toPx(self.config.width, self.config.unit);
        const configuredContentWidth = Math.max(configuredWidth - 2 * sizingMargin, 10);
        const columnWidth = self.config.size === 'matrix' ? self.matrixColumnWidth : configuredContentWidth / Math.max(tacticCount, 1);
        const measureContext = document.createElement('canvas').getContext('2d');
        const renderConfig = {
            ...self.config,
            columnWidth,
            measureText: function (text: string, fontSize: number): number {
                measureContext.font = `${fontSize}px ${self.config.font}`;
                return measureContext.measureText(text).width;
            },
        };
        let matrices: RenderableMatrix[] = domain.matrices.map((m) => new RenderableMatrix(m, self.viewModel, renderConfig));
        let tactics: RenderableTactic[] = [];
        for (let matrix of matrices) tactics = tactics.concat(matrix.tactics);
        let maxTacticHeight =
            d3.max(tactics, function (tactic: RenderableTactic) {
                return tactic.height;
            }) || 1;
        const copyrightFooterHeight = self.config.showCopyright ? self.copyrightFooterHeight : 0;

        if (self.config.size === 'matrix') {
            const hasHeaderContent =
                self.config.showHeader &&
                (self.showName ||
                    self.showDescription ||
                    self.showDomain ||
                    self.showFilters ||
                    self.showAggregate ||
                    (self.showLegendContainer && self.showLegendInHeader));
            const fittedHeaderHeight = hasHeaderContent ? Math.max(self.toPx(self.config.headerHeight, self.config.unit), 1) : 0;
            const fittedSize = self.matrixCanvasSize(tacticCount, maxTacticHeight, fittedHeaderHeight, copyrightFooterHeight);
            self.config.width = self.fromPx(fittedSize.width, self.config.unit);
            self.config.height = self.fromPx(fittedSize.height, self.config.unit);
        }

        // calculate svg height and width
        let margin = { top: sizingMargin, right: sizingMargin, bottom: sizingMargin, left: sizingMargin };
        let width = Math.max(self.toPx(self.config.width, self.config.unit) - (margin.right + margin.left), 10);
        let svgWidth = width + margin.left + margin.right;
        let height = Math.max(self.toPx(self.config.height, self.config.unit) - (margin.top + margin.bottom), 10);
        let svgHeight = height + margin.top + margin.bottom;
        let headerHeight = Math.max(self.toPx(self.config.headerHeight, self.config.unit), 1);
        const matrixHeight = Math.max(height - copyrightFooterHeight, 1);

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

        if (self.config.showSubtechniqueMarker) {
            legendSection.contents.push({ label: 'subtechniques', data: self.buildSubtechniqueLegend() });
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
        let datatable = svg.append('g').attr('transform', 'translate(0,' + headerHeight + ')');

        // build tactic columns
        let xRange = d3
            .scaleBand()
            .domain(tactics.map((t) => t.tactic.id))
            .range([0, width]);

        let yRange = d3
            .scaleLinear()
            .domain([maxTacticHeight, 0])
            .range([Math.max(matrixHeight - headerHeight, 1), 0]);

        const baseCellHeight = yRange(1);
        const tacticHeaderHeight = yRange(2);
        let subtechniqueIndent = Math.min(2 * baseCellHeight, 15);

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

        tacticGroups
            .append('rect')
            .attr('class', 'tactic-header-background')
            .attr('width', xRange.bandwidth())
            .attr('height', tacticHeaderHeight)
            .attr('fill', function () {
                if (self.viewModel.showTacticRowBackground) return self.viewModel.tacticRowBackground;
                return self.config.theme === 'light' ? '#263746' : '#1d2935';
            })
            .attr('stroke', self.config.tableBorderColor)
            .attr('shape-rendering', 'crispEdges');

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
                return `technique ${technique.technique.attackID} ${technique.spanFollower ? 'span-follower' : 'span-leader'}`;
            })
            .attr('data-attack-id', function (technique: RenderableTechnique) {
                return technique.technique.attackID;
            })
            .attr('data-column-span', function (technique: RenderableTechnique) {
                return technique.columnSpan;
            })
            .attr('transform', function (technique: RenderableTechnique) {
                return `translate(0, ${yRange(technique.yPosition)})`;
            });

        // A joined cell is owned by its leftmost tactic. Followers retain a
        // group only so expanded sub-technique sidebars can still be drawn in
        // their own columns.
        const visibleTechniqueGroups = techniqueGroups.filter(function (technique: RenderableTechnique) {
            return !technique.spanFollower;
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
            .attr('data-attack-id', function (subtechnique: RenderableTechnique) {
                return subtechnique.technique.attackID;
            })
            .attr('transform', function (subtechnique: RenderableTechnique) {
                return `translate(${subtechniqueIndent}, ${yRange(subtechnique.yPosition)})`;
            });

        visibleTechniqueGroups.append('title').text(function (technique: RenderableTechnique) {
            return `${technique.technique.attackID}: ${technique.technique.name}`;
        });
        subtechniqueGroups.append('title').text(function (subtechnique: RenderableTechnique) {
            return `${subtechnique.technique.attackID}: ${subtechnique.technique.name}`;
        });

        // add cell style to techniques
        visibleTechniqueGroups
            .append('rect')
            .attr('class', 'cell')
            .attr('height', function (technique: RenderableTechnique) {
                return yRange(technique.height);
            })
            .attr('width', function (technique: RenderableTechnique) {
                return xRange.bandwidth() * technique.columnSpan;
            })
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
            .attr('stroke', self.config.tableBorderColor)
            .attr('shape-rendering', 'crispEdges');

        // add cell style to sub-techniques
        subtechniqueGroups
            .append('rect')
            .attr('class', 'cell')
            .attr('height', function (subtechnique: RenderableTechnique) {
                return yRange(subtechnique.height);
            })
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
            .attr('stroke', self.config.tableBorderColor)
            .attr('shape-rendering', 'crispEdges');

        // add styling for sub-technique sidebar
        let sidebarWidth: number = 3;
        subtechniqueGroups
            .append('rect')
            .attr('class', 'cell')
            .attr('height', function (subtechnique: RenderableTechnique) {
                return yRange(subtechnique.height);
            })
            .attr('width', sidebarWidth)
            .attr('transform', `translate(${-sidebarWidth}, 0)`)
            .attr('fill', self.config.tableBorderColor)
            .attr('stroke', self.config.tableBorderColor);
        techniqueGroups
            .append('polygon')
            .attr('class', 'sidebar')
            .attr('transform', function (technique: RenderableTechnique) {
                return `translate(0, ${yRange(technique.height)})`;
            })
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

        // Mark collapsed parents without expanding their sub-techniques. Three
        // short lines remain legible at small export sizes and do not imply an
        // interactive control in the static SVG.
        visibleTechniqueGroups
            .filter(function (technique: RenderableTechnique) {
                return self.shouldRenderSubtechniqueMarker(technique);
            })
            .append('path')
            .attr('class', 'subtechnique-marker')
            .attr('data-subtechnique-marker', 'true')
            .attr('d', function (technique: RenderableTechnique) {
                const horizontalMargin = Math.max(1, Math.min(6, baseCellHeight * 0.25));
                const markerWidth = Math.max(3, Math.min(12, baseCellHeight * 0.6));
                const lineGap = Math.max(0.8, Math.min(4, baseCellHeight * 0.2));
                const right = xRange.bandwidth() * technique.columnSpan - horizontalMargin;
                const left = Math.max(right - markerWidth, horizontalMargin);
                const center = yRange(technique.height) / 2;
                return [`M${left},${center - lineGap}H${right}`, `M${left},${center}H${right}`, `M${left},${center + lineGap}H${right}`].join(' ');
            })
            .attr('fill', 'none')
            .attr('stroke', function (technique: RenderableTechnique) {
                return technique.highlighted ? '#ffffff' : '#66c7ec';
            })
            .attr('stroke-width', Math.max(0.6, Math.min(2.4, baseCellHeight * 0.12)))
            .attr('stroke-linecap', 'round')
            .attr('pointer-events', 'none');

        // -----------------------------------------------------------------------------
        // CELL TEXT
        // -----------------------------------------------------------------------------

        // Determine one shared technique font size without relying on SVG text
        // wrapping. The stored line arrays are the complete text layout.
        let minFontSize = Infinity;
        const configuredFontSize = Number(self.config.fontSize) || 10;
        const measureCellText = function (text: string, fontSize: number): number {
            measureContext.font = `${fontSize}px ${self.config.font}`;
            return measureContext.measureText(text).width;
        };

        visibleTechniqueGroups.each(function (technique: RenderableTechnique) {
            const textWidth = xRange.bandwidth() * technique.columnSpan - (self.shouldRenderSubtechniqueMarker(technique) ? 20 : 0);
            minFontSize = Math.min(
                minFontSize,
                self.cellFontSize(technique.lines, textWidth, yRange(technique.height), configuredFontSize, measureCellText)
            );
        });
        subtechniqueGroups.each(function (subtechnique: RenderableTechnique) {
            minFontSize = Math.min(
                minFontSize,
                self.cellFontSize(
                    subtechnique.lines,
                    xRange.bandwidth() - subtechniqueIndent,
                    yRange(subtechnique.height),
                    configuredFontSize,
                    measureCellText
                )
            );
        });

        if (!Number.isFinite(minFontSize)) minFontSize = configuredFontSize;
        this.config.maxTextSize = minFontSize;
        const renderedFontSize = this.config.autofitText ? minFontSize : configuredFontSize;

        const appendExplicitCellText = function (
            groups: any,
            widthFor: (technique: RenderableTechnique) => number,
            reserveSubtechniqueMarker: boolean = false
        ): void {
            groups
                .append('svg')
                .attr('class', 'cell-text-viewport')
                .attr('width', widthFor)
                .attr('height', function (technique: RenderableTechnique) {
                    return yRange(technique.height);
                })
                .attr('overflow', 'hidden')
                .style('overflow', 'hidden')
                .attr('pointer-events', 'none')
                .each(function (technique: RenderableTechnique) {
                    const viewport = d3.select(this);
                    const viewportWidth = widthFor(technique);
                    const markerWidth = reserveSubtechniqueMarker && self.shouldRenderSubtechniqueMarker(technique) ? 20 : 0;
                    const availableWidth = Math.max(viewportWidth - 8 - markerWidth, 1);
                    const linePositions = self.cellTextLinePositions(yRange(technique.height), technique.lines.length, renderedFontSize);
                    const textColor = technique.textColor !== null ? technique.textColor : self.config.theme === 'light' ? '#000000' : '#ffffff';

                    viewport
                        .selectAll('text')
                        .data(technique.lines.map((line, index) => ({ line, index })))
                        .enter()
                        .append('text')
                        .attr('class', 'cell-text-line')
                        .attr('data-line-index', function (line) {
                            return line.index;
                        })
                        .attr('x', technique.columnSpan > 1 ? viewportWidth / 2 : 4)
                        .attr('y', function (line) {
                            return linePositions[line.index];
                        })
                        .attr('font-size', renderedFontSize)
                        .attr('fill', textColor)
                        .attr('dominant-baseline', 'middle')
                        .attr('text-anchor', technique.columnSpan > 1 ? 'middle' : 'start')
                        .attr('lengthAdjust', 'spacingAndGlyphs')
                        .attr('textLength', function (line) {
                            const measuredWidth = measureCellText(line.line, renderedFontSize);
                            return measuredWidth > 0 ? Math.min(measuredWidth, availableWidth) : null;
                        })
                        .text(function (line) {
                            return line.line;
                        });
                });
        };

        appendExplicitCellText(
            visibleTechniqueGroups,
            function (technique: RenderableTechnique) {
                return xRange.bandwidth() * technique.columnSpan;
            },
            true
        );
        appendExplicitCellText(subtechniqueGroups, function () {
            return xRange.bandwidth() - subtechniqueIndent;
        });

        // Render every tactic name on one line at the generator's default
        // height. Arial Narrow is used first, then compressed horizontally
        // only as much as needed to fit inside the header margins.
        const tacticNameFontSize = (Number(self.config.fontSize) || 18) + 1;
        const tacticHeaderLayout = self.tacticHeaderTextLayout(tacticHeaderHeight, tacticNameFontSize, 1);
        let tacticLabels = tacticGroups.append('g').attr('class', 'tactic-label');
        tacticLabels
            .append('text')
            .attr('class', 'tactic-name')
            .attr('font-family', self.config.font)
            .attr('font-stretch', 'condensed')
            .text(function (tactic: RenderableTactic) {
                return tactic.tactic.name.toUpperCase();
            })
            .attr('x', xRange.bandwidth() / 2)
            .attr('y', tacticHeaderLayout.firstNameY)
            .attr('font-size', tacticNameFontSize)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', function () {
                const background = self.viewModel.showTacticRowBackground
                    ? self.viewModel.tacticRowBackground
                    : self.config.theme === 'light'
                      ? '#263746'
                      : '#1d2935';
                return tinycolor.mostReadable(background, ['white', 'black']).toString();
            })
            .attr('font-weight', 'bold')
            .attr('transform', function (tactic: RenderableTactic) {
                measureContext.font = `700 ${tacticNameFontSize}px ${self.config.font}`;
                const horizontalScale = self.tacticNameHorizontalScale(
                    measureContext.measureText(tactic.tactic.name.toUpperCase()).width,
                    xRange.bandwidth() - 20
                );
                const center = xRange.bandwidth() / 2;
                d3.select(this).attr('data-horizontal-scale', horizontalScale);
                return `translate(${center} 0) scale(${horizontalScale} 1) translate(${-center} 0)`;
            });

        tacticLabels
            .append('text')
            .attr('class', 'tactic-technique-count')
            .text(function (tactic: RenderableTactic) {
                return `${tactic.techniqueCount} techniques`;
            })
            .attr('x', xRange.bandwidth() / 2)
            .attr('y', tacticHeaderLayout.countY)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', tacticHeaderLayout.countFontSize)
            .attr('fill', function () {
                const background = self.viewModel.showTacticRowBackground
                    ? self.viewModel.tacticRowBackground
                    : self.config.theme === 'light'
                      ? '#263746'
                      : '#1d2935';
                return tinycolor.mostReadable(background, ['white', 'black']).toString();
            });

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

        if (self.config.showCopyright) {
            svg.append('text')
                .attr('class', 'copyright-line')
                .attr('data-copyright', 'true')
                .attr('x', width / 2)
                .attr('y', matrixHeight + copyrightFooterHeight)
                .attr('fill', self.config.theme === 'light' ? '#4b5863' : '#ffffff')
                .attr('font-size', Math.max((Number(self.config.fontSize) || 10) - 1, 8))
                .attr('font-weight', 400)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .text(self.copyrightLine(domain.version.number));
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

    /** Add the collapsed-parent marker and its meaning to the export legend. */
    private buildSubtechniqueLegend(): Function {
        return function (_self, group) {
            const legendGroup = group.append('g').attr('class', 'subtechnique-marker-legend').attr('transform', 'translate(2, 5)');

            legendGroup
                .append('path')
                .attr('d', 'M0,2H12 M0,6H12 M0,10H12')
                .attr('fill', 'none')
                .attr('stroke', '#66c7ec')
                .attr('stroke-width', 2)
                .attr('stroke-linecap', 'round');

            legendGroup
                .append('text')
                .text('has sub-techniques')
                .attr('x', 18)
                .attr('y', 6)
                .attr('font-size', 12)
                .attr('dominant-baseline', 'middle');
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

        if (size !== 'custom' && size !== 'matrix') {
            const [w, h] = ratioMap[size][orientation];
            self.config.width = w;
            self.config.height = h;
        }
    }

    /** Size a matrix so every tactic is 220 px wide and every line unit is 30 px high. */
    private matrixCanvasSize(tacticCount: number, maxTacticHeight: number, headerHeight: number, footerHeight: number = 0) {
        return {
            width: 2 * this.matrixMargin + Math.max(tacticCount, 1) * this.matrixColumnWidth,
            height: 2 * this.matrixMargin + headerHeight + Math.max(maxTacticHeight, 1) * this.matrixCellHeight + Math.max(footerHeight, 0),
        };
    }

    /** Match the matrix generator's copyright wording using Navigator's active ATT&CK version. */
    private copyrightLine(attackVersion: string, currentDate: Date = new Date()): string {
        const year = currentDate.getFullYear();
        const versionLabel = String(attackVersion).replace(/^v/i, '');
        return `© ${year} MITRE - MITRE ATT&CK Framework version v${versionLabel}`;
    }

    /** Convert pixels back into the measurement unit selected by the user. */
    private fromPx(quantity: number, unit: string): number {
        return quantity / this.toPx(1, unit);
    }

    /** Match the standalone generator's tactic-name and count baselines. */
    private tacticHeaderTextLayout(headerHeight: number, nameFontSize: number, lineCount: number) {
        const lineHeight = nameFontSize + 4;
        const blockHeight = lineCount * lineHeight + 16;
        const firstNameY = (headerHeight - blockHeight) / 2 + lineHeight / 2;
        return {
            lineHeight,
            firstNameY,
            countY: firstNameY + lineCount * lineHeight + 2,
            countFontSize: Math.max(nameFontSize - 2, 3),
        };
    }

    /** Keep tactic names on one line without changing their font height. */
    private tacticNameHorizontalScale(textWidth: number, availableWidth: number): number {
        if (textWidth <= 0) return 0.94;
        return Math.min(0.94, Math.max(availableWidth, 1) / textWidth);
    }

    /** Whether a collapsed parent should reserve space for and render its marker. */
    private shouldRenderSubtechniqueMarker(technique: RenderableTechnique): boolean {
        return this.config.showSubtechniqueMarker && technique.showSubtechniqueMarker;
    }

    /** Calculate a font size for an explicit set of cell-text lines. */
    private cellFontSize(
        lines: string[],
        width: number,
        height: number,
        maxFontSize: number,
        measureText: (text: string, fontSize: number) => number
    ): number {
        const padding = this.config.autofitText ? 4 : 1;
        const availableWidth = Math.max(width - 2 * padding, 1);
        const lineCount = Math.max(lines.length, 1);
        let fontSize = Math.min(maxFontSize, Math.max(height / lineCount - 8, 1));

        for (let line of lines) {
            const measuredWidth = measureText(line, maxFontSize);
            if (measuredWidth > availableWidth) fontSize = Math.min(fontSize, (maxFontSize * availableWidth) / measuredWidth);
        }
        return fontSize;
    }

    /** Return explicit vertical centers for independently rendered text lines. */
    private cellTextLinePositions(height: number, lineCount: number, fontSize: number): number[] {
        const count = Math.max(lineCount, 1);
        const lineHeight = Math.min(fontSize + 4, height / count);
        const firstLineY = (height - count * lineHeight) / 2 + lineHeight / 2;
        return Array.from({ length: count }, (_, index) => firstLineY + index * lineHeight);
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

    /** Download the SVG. */
    public downloadSVG(): void {
        const svgElement = this.getSvgElement();
        const svgBlob = new Blob([this.serializeSvg(svgElement, true)], { type: 'image/svg+xml;charset=utf-8' });
        this.downloadBlob(svgBlob, this.exportFilename('svg'));
        this.currentDropdown = null;
    }

    /** Rasterize the current SVG in the browser and download it as a PNG. */
    public async downloadPNG(scale: number = 1): Promise<void> {
        await this.runExport(async () => {
            const svgElement = this.getSvgElement();
            const { width, height } = this.getSvgDimensions(svgElement);
            const outputScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
            const canvas = document.createElement('canvas');
            canvas.width = Math.ceil(width * outputScale);
            canvas.height = Math.ceil(height * outputScale);

            const context = canvas.getContext('2d');
            if (!context) throw new Error('This browser does not support canvas image export.');

            const svgBlob = new Blob([this.serializeSvg(svgElement)], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            try {
                const image = await this.loadImage(svgUrl);
                context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
                context.drawImage(image, 0, 0, width, height);
                const pngBlob = await this.canvasToBlob(canvas, 'image/png');
                this.downloadBlob(pngBlob, this.exportFilename('png'));
            } finally {
                URL.revokeObjectURL(svgUrl);
            }
        });
    }

    /** Convert the current SVG directly to a vector PDF in the browser. */
    public async downloadPDF(): Promise<void> {
        await this.runExport(async () => {
            // Keep the PDF dependencies out of Navigator's initial bundle.
            const { jsPDF } = await import('jspdf');
            await import('svg2pdf.js');

            const svgElement = this.getSvgElement();
            const { width, height } = this.getSvgDimensions(svgElement);
            const pdf = new jsPDF({
                orientation: width >= height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [width, height],
                hotfixes: ['px_scaling'],
                putOnlyUsedFonts: true,
                compress: true,
            });

            await this.registerPdfFonts(pdf);
            const pdfSvg = this.svgWithPdfFont(svgElement);
            await pdf.svg(pdfSvg, { x: 0, y: 0, width, height });
            this.downloadBlob(pdf.output('blob'), this.exportFilename('pdf'));
        });
    }

    private getSvgElement(): SVGSVGElement {
        const svgElement = document.getElementById('svg' + this.viewModel.uid);
        if (!(svgElement instanceof SVGSVGElement)) throw new Error('The rendered matrix SVG is not available.');
        return svgElement;
    }

    private getSvgDimensions(svgElement: SVGSVGElement): { width: number; height: number } {
        const viewBox = svgElement.viewBox.baseVal;
        const width = viewBox && viewBox.width > 0 ? viewBox.width : svgElement.width.baseVal.value || Number(svgElement.getAttribute('width'));
        const height = viewBox && viewBox.height > 0 ? viewBox.height : svgElement.height.baseVal.value || Number(svgElement.getAttribute('height'));
        if (!(width > 0 && height > 0)) throw new Error('The rendered matrix has invalid dimensions.');
        return { width, height };
    }

    private serializeSvg(svgElement: SVGSVGElement, includeXmlDeclaration: boolean = false): string {
        const clone = svgElement.cloneNode(true) as SVGSVGElement;
        const { width, height } = this.getSvgDimensions(svgElement);
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        clone.setAttribute('width', String(width));
        clone.setAttribute('height', String(height));
        if (!clone.hasAttribute('viewBox')) clone.setAttribute('viewBox', `0 0 ${width} ${height}`);
        const serialized = new XMLSerializer().serializeToString(clone);
        return includeXmlDeclaration ? `<?xml version="1.0" standalone="no"?>\r\n${serialized}` : serialized;
    }

    private svgWithPdfFont(svgElement: SVGSVGElement): SVGSVGElement {
        const clone = svgElement.cloneNode(true) as SVGSVGElement;
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clone.querySelectorAll<SVGTextElement>('text, tspan').forEach((textElement) => {
            textElement.setAttribute('font-family', this.pdfFontFamily);
            textElement.style.fontFamily = this.pdfFontFamily;

            // svg2pdf.js reads alignment-baseline but not dominant-baseline.
            // Copy the value so text that is centered in an SVG cell remains
            // vertically centered in the vector PDF.
            const dominantBaseline = textElement.getAttribute('dominant-baseline');
            if (dominantBaseline && !textElement.hasAttribute('alignment-baseline')) {
                textElement.setAttribute('alignment-baseline', dominantBaseline);
            }
        });

        // svg2pdf.js composes a compound transform differently from browsers,
        // which shifts horizontally compressed tactic names off center. Use a
        // single scale and compensate the x coordinate so the transformed text
        // anchor remains at the cell center. This preserves true glyph scaling
        // and is applied only to the PDF clone, leaving SVG and PNG unchanged.
        clone.querySelectorAll<SVGTextElement>('text.tactic-name').forEach((textElement) => {
            const center = Number(textElement.getAttribute('x'));
            const horizontalScale = Number(textElement.getAttribute('data-horizontal-scale'));
            if (!Number.isFinite(center) || !Number.isFinite(horizontalScale) || horizontalScale <= 0) return;

            textElement.setAttribute('x', String(center / horizontalScale));
            textElement.setAttribute('transform', `scale(${horizontalScale} 1)`);
        });
        return clone;
    }

    private async registerPdfFonts(pdf: any): Promise<void> {
        const regularFilename = 'RobotoCondensed-Regular.ttf';
        const boldFilename = 'RobotoCondensed-Bold.ttf';
        const baseUrl = new URL(`${this.pdfFontPath}/`, document.baseURI);
        const [regular, bold] = await Promise.all([
            this.fetchFont(new URL(regularFilename, baseUrl)),
            this.fetchFont(new URL(boldFilename, baseUrl)),
        ]);

        pdf.addFileToVFS(regularFilename, this.arrayBufferToBase64(regular));
        pdf.addFont(regularFilename, this.pdfFontFamily, 'normal', 400);
        pdf.addFileToVFS(boldFilename, this.arrayBufferToBase64(bold));
        pdf.addFont(boldFilename, this.pdfFontFamily, 'normal', 700);
        await this.registerPdfBrowserFonts(regular, bold);
    }

    /** Use the embedded PDF fonts for svg2pdf's browser-side text measurement. */
    private async registerPdfBrowserFonts(regular: ArrayBuffer, bold: ArrayBuffer): Promise<void> {
        if (!this.pdfBrowserFontsReady) {
            const fontFaces = [
                new FontFace(this.pdfFontFamily, regular.slice(0), { weight: '400' }),
                new FontFace(this.pdfFontFamily, bold.slice(0), { weight: '700' }),
            ];
            this.pdfBrowserFontsReady = Promise.all(fontFaces.map((fontFace) => fontFace.load())).then((loadedFonts) => {
                loadedFonts.forEach((fontFace) => (document.fonts as any).add(fontFace));
            });
        }
        await this.pdfBrowserFontsReady;
    }

    private async fetchFont(url: URL): Promise<ArrayBuffer> {
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`Unable to load the bundled PDF font (${response.status}).`);
        return response.arrayBuffer();
    }

    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;
        let binary = '';
        for (let offset = 0; offset < bytes.length; offset += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)));
        }
        return btoa(binary);
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('The browser could not rasterize the rendered matrix.'));
            image.src = url;
        });
    }

    private canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('The browser could not encode the image.'))), type);
        });
    }

    private exportFilename(extension: 'svg' | 'png' | 'pdf'): string {
        const basename = this.viewModel.name.split(' ').join('_').replace(/\W/g, '') || 'attack_navigator_layer';
        return `${basename}.${extension}`;
    }

    private downloadBlob(blob: Blob, filename: string): void {
        if (this.isIE) {
            const nav = window.navigator as any;
            nav.msSaveOrOpenBlob(blob, filename);
            return;
        }

        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.href = url;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.setTimeout(() => URL.revokeObjectURL(url), 0);
    }

    private async runExport(operation: () => Promise<void>): Promise<void> {
        if (this.exportInProgress) return;
        this.exportInProgress = true;
        this.exportError = '';
        try {
            await operation();
            this.currentDropdown = null;
        } catch (error) {
            console.error('Image export failed', error);
            this.exportError = error instanceof Error ? error.message : 'Image export failed.';
        } finally {
            this.exportInProgress = false;
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
