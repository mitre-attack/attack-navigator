import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SvgExportComponent } from './svg-export.component';
import { TechniqueVM, ViewModel } from '../classes';
import { RenderableMatrix, RenderableTactic, RenderableTechnique } from './renderable-objects';
import { Matrix, Tactic, Technique } from '../classes/stix';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SvgExportComponent', () => {
    let component: SvgExportComponent;
    let fixture: ComponentFixture<SvgExportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, SvgExportComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        vm: new ViewModel('layer', '33', 'enterprise-attack-13', null),
                    },
                },
                SvgExportComponent,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SvgExportComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Renderable Objects', () => {
        // mock data
        let stixSDO = {
            name: 'Example Name',
            description: 'Description',
            created: '2001-01-01T01:01:00.000Z',
            modified: '2001-01-01T01:01:00.000Z',
            version: '1.0',
            x_mitre_version: '1.0',
        };
        let matrixSDO = {
            id: 'matrix-0',
            ...stixSDO,
            type: 'x-mitre-matrix',
            tactic_refs: ['tactic-0'],
            external_references: [{ external_id: 'enterprise-matrix' }],
        };
        let tacticSDO = {
            id: 'tactic-0',
            ...stixSDO,
            name: 'Reconnaissance',
            type: 'x-mitre-tactic',
            x_mitre_shortname: 'tactic-name',
            external_references: [{ external_id: 'TA0043' }],
        };
        let techniqueSDO = {
            ...stixSDO,
            type: 'attack-pattern',
            x_mitre_platforms: ['platform'],
            kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'tactic-name' }],
        };
        let t0000 = { ...techniqueSDO, id: 'attack-pattern-0', external_references: [{ external_id: 'T0000' }] };
        let t0000_000 = {
            ...techniqueSDO,
            id: 'attack-pattern-1',
            x_mitre_is_subtechnique: true,
            external_references: [{ external_id: 'T0000.000' }],
        };

        // mock objects
        let renderableMatrix: RenderableMatrix;
        let renderableTactic: RenderableTactic;
        let renderableTechnique: RenderableTechnique;
        let matrix: Matrix;
        let tactic: Tactic;
        let technique: Technique;
        let subtechnique: Technique;
        let techniqueVM: TechniqueVM;
        let viewModel: ViewModel;
        let idToTacticSDO = new Map<string, any>();

        beforeEach(() => {
            idToTacticSDO.set('tactic-0', tacticSDO);
            matrix = new Matrix(matrixSDO, idToTacticSDO, [], null);
            tactic = matrix.tactics[0];
            subtechnique = new Technique(t0000_000, [], null);
            technique = new Technique(t0000, [subtechnique], null);
            viewModel = new ViewModel('layer', '1', 'enterprise-attack-13', null);
            techniqueVM = new TechniqueVM('T0000^tactic-name');
            viewModel.setTechniqueVM(techniqueVM);

            spyOn(viewModel, 'filterTactics').and.returnValue(matrix.tactics);

            renderableMatrix = new RenderableMatrix(matrix, viewModel, {});
            renderableMatrix.tactics.forEach((tactic) => {
                tactic.height = 20;
            });
            renderableTactic = new RenderableTactic(tactic, matrix, viewModel, {});
            renderableTechnique = new RenderableTechnique(1, technique, tactic, matrix, viewModel);
        });

        it('should initialize RenderableMatrix object correctly', () => {
            expect(renderableMatrix.matrix).toBe(matrix);
            expect(viewModel.filterTactics).toHaveBeenCalledWith(matrix.tactics, matrix);
            expect(renderableMatrix.tactics.length).toBe(matrix.tactics.length);
            expect(renderableMatrix.tactics.every((tactic) => tactic instanceof RenderableTactic)).toBeTrue();
        });

        it('should calculate RenderableMatrix height correctly when tactics are set', () => {
            expect(renderableMatrix.height).toBe(20);
        });

        it('should initialize RenderableTactic object correctly', () => {
            expect(renderableTactic.tactic).toBe(tactic);
            expect(renderableTactic.techniques).toEqual([]);
            expect(renderableTactic.subtechniques).toEqual([]);
            expect(renderableTactic.height).toBe(1);
        });

        it('should create RenderableTechniques when techniques are set', () => {
            matrix = new Matrix(matrixSDO, idToTacticSDO, [technique, subtechnique], null);
            techniqueVM.showSubtechniques = true;

            spyOn(viewModel, 'filterTechniques')
                .withArgs(tactic.techniques, tactic, matrix)
                .and.returnValue([technique])
                .withArgs(technique.subtechniques, tactic, matrix)
                .and.returnValue([subtechnique]);
            spyOn(viewModel, 'sortTechniques').and.returnValue([technique]);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);

            renderableTactic = new RenderableTactic(tactic, matrix, viewModel, { showSubtechniques: 'all' });

            expect(renderableTactic.techniques.length).toBe(1);
            expect(renderableTactic.subtechniques.length).toBe(1);
            expect(viewModel.getTechniqueVM).toHaveBeenCalledTimes(1);
            expect(renderableTactic.techniques.every((t) => t instanceof RenderableTechnique)).toBeTrue();
            expect(renderableTactic.subtechniques.every((t) => t instanceof RenderableTechnique)).toBeTrue();
        });

        it('should initialize RenderableTechnique correctly with defaults', () => {
            expect(renderableTechnique.yPosition).toBe(1);
            expect(renderableTechnique.technique).toBe(technique);
            expect(renderableTechnique.tactic).toBe(tactic);
            expect(renderableTechnique.matrix).toBe(matrix);
            expect(renderableTechnique.viewModel).toBe(viewModel);
            expect(renderableTechnique.showSubtechniques).toBeFalse();
        });

        it('should initialize RenderableTechnique correctly with given params', () => {
            renderableTechnique = new RenderableTechnique(1, technique, tactic, matrix, viewModel, true);

            expect(renderableTechnique.yPosition).toBe(1);
            expect(renderableTechnique.technique).toBe(technique);
            expect(renderableTechnique.tactic).toBe(tactic);
            expect(renderableTechnique.matrix).toBe(matrix);
            expect(renderableTechnique.viewModel).toBe(viewModel);
            expect(renderableTechnique.showSubtechniques).toBeTrue();
        });

        it('should return "null" fill color if no technique VM is found', () => {
            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(false);
            expect(renderableTechnique.fill).toBeNull();
        });

        it('should return "white" fill color when the technique VM is disabled', () => {
            techniqueVM.enabled = false;

            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);
            expect(renderableTechnique.fill).toBe('white');
        });

        it('should return color from technique VM when enabled', () => {
            techniqueVM.enabled = true;
            techniqueVM.color = '#ffffff';

            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);
            expect(renderableTechnique.fill).toBe('#ffffff');
        });

        it('should return aggregateScoreColor if aggregate scores are enabled and color is not set', () => {
            techniqueVM.enabled = true;
            techniqueVM.aggregateScoreColor = '#dddddd';
            viewModel.layout.showAggregateScores = true;

            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);
            expect(renderableTechnique.fill).toBe('#dddddd');
        });

        it('should return scoreColor if technique VM has a score', () => {
            techniqueVM.enabled = true;
            techniqueVM.score = '10';
            techniqueVM.scoreColor = '#aaaaaa';

            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);
            expect(renderableTechnique.fill).toBe('#aaaaaa');
        });

        it('should return "null" text color if no technique VM is found and a fill color is not', () => {
            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(false);
            expect(renderableTechnique.textColor).toBeNull();
        });

        it('should return "black" text color if fill color is "white"', () => {
            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(false);
            Object.defineProperty(renderableTechnique, 'fill', { get: () => 'white' });
            expect(renderableTechnique.textColor.toString()).toBe('black');
        });

        it('should return "white" text color if fill color is "black"', () => {
            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(false);
            Object.defineProperty(renderableTechnique, 'fill', { get: () => 'black' });
            expect(renderableTechnique.textColor.toString()).toBe('white');
        });

        it('should return gray color if technique VM is disabled', () => {
            techniqueVM.enabled = false;
            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);
            expect(renderableTechnique.textColor).toBe('#aaaaaa');
        });

        it('should return the correct text to display', () => {
            // case: showID & showName are enabled
            viewModel.layout.showID = true;
            viewModel.layout.showName = true;
            expect(renderableTechnique.text).toBe('T0000: Example Name');
            // case: showID is disabled, showName is enabled
            viewModel.layout.showID = false;
            expect(renderableTechnique.text).toBe('Example Name');
            // case: showID is enabled, showName is disabled
            viewModel.layout.showID = true;
            viewModel.layout.showName = false;
            expect(renderableTechnique.text).toBe('T0000');
            // case: show ID & showName are disabled
            viewModel.layout.showID = false;
            expect(renderableTechnique.text).toBe('');
        });
    });

    describe('getters', () => {
        it('should return true if getName is true', () => {
            expect(component.hasName).toBeTrue();
        });
        it('should return true if hasDomain is true', () => {
            expect(component.hasDomain).toBeTrue();
        });
        it('should return false if hasDescription is false', () => {
            expect(component.hasDescription).toBeFalse();
        });
        it('should return false if showAggregate is false', () => {
            expect(component.showAggregate).toBeFalse();
        });
        it('should return true if showFilters is true', () => {
            expect(component.showFilters).toBeTrue();
        });
        it('should return true if showLegendInHeader is true', () => {
            expect(component.showLegendInHeader).toBeTrue();
        });
    });

    describe('setSize', () => {
        it('should set correct dimensions for standard sizes in portrait orientation', () => {
            const sizes = ['letter', 'legal', 'small', 'medium', 'large'];
            sizes.forEach((size) => {
                component['setSize'](component, size, 'portrait');
                expect(component.config.width).toBeGreaterThan(0);
                expect(component.config.height).toBeGreaterThan(0);
            });
        });

        it('should set correct dimensions for standard sizes in landscape orientation', () => {
            const sizes = ['letter', 'legal', 'small', 'medium', 'large'];
            sizes.forEach((size) => {
                component['setSize'](component, size, 'landscape');
                expect(component.config.width).toBeGreaterThan(0);
                expect(component.config.height).toBeGreaterThan(0);
            });
        });

        it('should not modify size for custom dimensions', () => {
            const originalWidth = component.config.width;
            const originalHeight = component.config.height;
            component['setSize'](component, 'custom', 'portrait');
            expect(component.config.width).toBe(originalWidth);
            expect(component.config.height).toBe(originalHeight);
        });
    });

    describe('verticalAlignCenter', () => {
        it('should adjust y position of a single node', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('y', '10');
            node.setAttribute('font-size', '20px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.getAttribute('y')).toBeGreaterThan(10);
        });

        it('should correctly adjust child nodes', () => {
            let parentNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            parentNode.setAttribute('font-size', '20px');

            let childNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            childNode.setAttribute('y', '10');
            parentNode.appendChild(childNode);
            fixture.nativeElement.appendChild(parentNode);

            component['verticalAlignCenter'](parentNode);
            expect(childNode.getAttribute('y')).toBeGreaterThan(10);
        });

        it('should handle different font sizes', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('y', '10');
            node.setAttribute('font-size', '30px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.getAttribute('y')).toBeGreaterThan(10);
        });

        it('should handle nodes without initial y attribute', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('font-size', '20px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.hasAttribute('y')).toBeTrue();
        });

        it('should handle nodes without children', () => {
            let node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            node.setAttribute('y', '10');
            node.setAttribute('font-size', '20px');
            fixture.nativeElement.appendChild(node);

            component['verticalAlignCenter'](node);
            expect(node.getAttribute('y')).toBeGreaterThan(10);
        });
    });

    describe('optimalFontSize', () => {
        it('should return a number and not exceed maxFontSize', () => {
            let result = component['optimalFontSize'](fixture.nativeElement, 'Sample text', 100, 100, false, 12);
            expect(result).toBeLessThanOrEqual(12);
            expect(typeof result).toBe('number');
        });
        it('should handle short text correctly', () => {
            let result = component['optimalFontSize'](fixture.nativeElement, 'Short text', 100, 50, false, 12);
            expect(result).toBeGreaterThan(0);
        });

        it('should handle medium text correctly', () => {
            let result = component['optimalFontSize'](fixture.nativeElement, 'This is a medium length text', 100, 50, false, 12);
            expect(result).toBeGreaterThan(0);
        });

        it('should handle long text correctly', () => {
            let longText =
                'This is a very long text string that is intended to test how the optimalFontSize function behaves when dealing with a large amount of text within a constrained space';
            let result = component['optimalFontSize'](fixture.nativeElement, longText, 100, 50, false, 12);
            expect(result).toBeLessThan(12);
        });

        it('should adjust size based on cell width', () => {
            let text = 'Sample text';
            let smallWidthResult = component['optimalFontSize'](fixture.nativeElement, text, 50, 50, false, 12);
            let largeWidthResult = component['optimalFontSize'](fixture.nativeElement, text, 200, 50, false, 12);
            expect(largeWidthResult).toBeGreaterThanOrEqual(smallWidthResult);
        });

        it('should adjust size based on cell height', () => {
            let text = 'Sample text';
            let smallHeightResult = component['optimalFontSize'](fixture.nativeElement, text, 100, 25, false, 12);
            let largeHeightResult = component['optimalFontSize'](fixture.nativeElement, text, 100, 100, false, 12);
            expect(largeHeightResult).toBeGreaterThanOrEqual(smallHeightResult);
        });

        it('should respect center alignment', () => {
            let text = 'Centered text';
            let result = component['optimalFontSize'](fixture.nativeElement, text, 100, 50, true, 12);
            expect(result).toBeGreaterThan(0);
        });

        it('should handle different max font sizes', () => {
            let text = 'Sample text';
            let resultSmallMax = component['optimalFontSize'](fixture.nativeElement, text, 100, 50, false, 8);
            let resultLargeMax = component['optimalFontSize'](fixture.nativeElement, text, 100, 50, false, 16);
            expect(resultLargeMax).toBeGreaterThanOrEqual(resultSmallMax);
        });
    });

    describe('getSpacing', () => {
        let component: SvgExportComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(SvgExportComponent);
            component = fixture.debugElement.componentInstance;
        });

        it('should return correct number of divisions', () => {
            const distance = 100;
            const divisions = 4;
            const spacing = component['getSpacing'](distance, divisions);
            expect(spacing.length).toEqual(divisions);
        });

        it('should handle zero divisions', () => {
            const spacing = component['getSpacing'](100, 0);
            expect(spacing.length).toEqual(0);
        });

        it('should return equidistant points', () => {
            const distance = 100;
            const divisions = 4;
            const spacing = component['getSpacing'](distance, divisions);
            let equalDistance = true;
            for (let i = 1; i < spacing.length; i++) {
                if (spacing[i] - spacing[i - 1] !== spacing[1] - spacing[0]) {
                    equalDistance = false;
                    break;
                }
            }
            expect(equalDistance).toBeTrue();
        });

        it('should handle negative values gracefully', () => {
            const spacing = component['getSpacing'](-100, -4);
            expect(spacing.length).toEqual(0);
        });
    });
    describe('findBreaks', () => {
        let component: SvgExportComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(SvgExportComponent);
            component = fixture.debugElement.componentInstance;
        });

        it('should handle zero spaces correctly', () => {
            const result = component['findBreaks'](0, 0);
            expect(result.size).toBe(1);
            expect(result.has('')).toBeTrue();
        });

        it('should return the correct total number of spaces and breaks', () => {
            const spaces = 4;
            const breaks = 2;
            const result = component['findBreaks'](spaces, breaks);
            result.forEach((breakPattern) => {
                expect(breakPattern.length).toBe(spaces);
            });
        });

        it('should return a Set of strings', () => {
            const result = component['findBreaks'](3, 1);
            expect(result instanceof Set).toBeTrue();
            result.forEach((breakPattern) => {
                expect(typeof breakPattern).toBe('string');
            });
        });
    });

    describe('toPx', () => {
        it('should convert inches to pixels', inject([SvgExportComponent], (component: SvgExportComponent) => {
            expect(component['toPx'](1, 'in')).toEqual(96);
        }));
        it('should convert centimeters to pixels', () => {
            expect(component['toPx'](1, 'cm')).toEqual(37.79375);
        });

        it('should handle pixels as pixels', () => {
            expect(component['toPx'](1, 'px')).toEqual(1);
        });

        it('should convert ems to pixels', () => {
            expect(component['toPx'](1, 'em')).toEqual(16);
        });

        it('should convert points to pixels', () => {
            expect(component['toPx'](1, 'pt')).toEqual(1.33);
        });

        it('should handle unknown units by logging an error and returning 0', () => {
            const consoleSpy = spyOn(console, 'error');
            expect(component['toPx'](1, 'unknown')).toEqual(0);
            expect(consoleSpy).toHaveBeenCalledWith('unknown unit', 'unknown');
        });
    });
});
