import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ImageExportComponent } from './image-export.component';
import { TechniqueVM, ViewModel } from '../classes';
import { RenderableMatrix, RenderableTactic, RenderableTechnique } from './renderable-objects';
import { Matrix, Tactic, Technique } from '../classes/stix';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
declare var d3: any;

describe('ImageExportComponent', () => {
    let component: ImageExportComponent;
    let fixture: ComponentFixture<ImageExportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, ImageExportComponent],
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
                ImageExportComponent,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageExportComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should default to dimensions matching the ATT&CK matrix generator', () => {
        expect(component.config.size).toBe('matrix');
        expect(component['toPx'](component.config.width, component.config.unit)).toBeCloseTo(3348);
        expect(component['toPx'](component.config.height, component.config.unit)).toBeCloseTo(1748);
        expect(component['toPx'](component.config.headerHeight, component.config.unit)).toBeCloseTo(84);
        expect(component.config.fontSize).toBe(18);
        expect(component.config.autofitText).toBeFalse();
        expect(component.config.spanAdjacentTechniques).toBeFalse();
        expect(component.config.showSubtechniqueMarker).toBeTrue();
        expect(component.config.showCopyright).toBeTrue();
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
        let t0001 = { ...techniqueSDO, id: 'attack-pattern-2', name: 'Second Technique', external_references: [{ external_id: 'T0001' }] };

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
            expect(renderableTactic.height).toBe(2);
            expect(renderableTactic.headerHeight).toBe(2);
            expect(renderableTactic.techniqueCount).toBe(0);
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
            expect(renderableTactic.techniques[0].yPosition).toBe(2);
            expect(renderableTactic.techniques[0].hasSubtechniques).toBeTrue();
            expect(renderableTactic.techniques[0].showSubtechniqueMarker).toBeFalse();
            expect(viewModel.getTechniqueVM).toHaveBeenCalledTimes(1);
            expect(viewModel.sortTechniques).toHaveBeenCalledWith([technique], tactic);
            expect(renderableTactic.techniques.every((t) => t instanceof RenderableTechnique)).toBeTrue();
            expect(renderableTactic.subtechniques.every((t) => t instanceof RenderableTechnique)).toBeTrue();
        });

        it('should preserve the ordering supplied by the view model', () => {
            const secondTechnique = new Technique(t0001, [], null);
            matrix = new Matrix(matrixSDO, idToTacticSDO, [technique, secondTechnique], null);

            spyOn(viewModel, 'filterTechniques').and.callFake((techniques) => techniques);
            spyOn(viewModel, 'sortTechniques').and.returnValue([secondTechnique, technique]);
            spyOn(viewModel, 'getTechniqueVM').and.returnValue(techniqueVM);

            renderableTactic = new RenderableTactic(tactic, matrix, viewModel, { showSubtechniques: 'none' });

            expect(renderableTactic.techniques.map((renderable) => renderable.technique.attackID)).toEqual(['T0001', 'T0000']);
        });

        it('should move matching adjacent-tactic techniques to the top and join only identical states', () => {
            const secondTacticSDO = {
                ...tacticSDO,
                id: 'tactic-1',
                name: 'Second Tactic',
                x_mitre_shortname: 'second-tactic',
                external_references: [{ external_id: 'TA0002' }],
            };
            const spanningMatrixSDO = { ...matrixSDO, tactic_refs: ['tactic-0', 'tactic-1'] };
            const sharedTechnique = new Technique(
                {
                    ...techniqueSDO,
                    id: 'attack-pattern-shared',
                    name: 'Shared Technique',
                    external_references: [{ external_id: 'T1000' }],
                    kill_chain_phases: [
                        { kill_chain_name: 'mitre-attack', phase_name: 'tactic-name' },
                        { kill_chain_name: 'mitre-attack', phase_name: 'second-tactic' },
                    ],
                },
                [],
                null
            );
            const leftTechnique = new Technique(
                {
                    ...techniqueSDO,
                    id: 'attack-pattern-left',
                    name: 'Left Technique',
                    external_references: [{ external_id: 'T1001' }],
                },
                [],
                null
            );
            const rightTechnique = new Technique(
                {
                    ...techniqueSDO,
                    id: 'attack-pattern-right',
                    name: 'Right Technique',
                    external_references: [{ external_id: 'T1002' }],
                    kill_chain_phases: [{ kill_chain_name: 'mitre-attack', phase_name: 'second-tactic' }],
                },
                [],
                null
            );
            const tacticMap = new Map<string, any>([
                ['tactic-0', tacticSDO],
                ['tactic-1', secondTacticSDO],
            ]);
            const spanningMatrix = new Matrix(spanningMatrixSDO, tacticMap, [leftTechnique, sharedTechnique, rightTechnique], null);
            const spanningViewModel = new ViewModel('layer', '2', 'enterprise-attack-13', null);
            for (let unionID of ['T1001^tactic-name', 'T1000^tactic-name', 'T1000^second-tactic', 'T1002^second-tactic']) {
                spanningViewModel.setTechniqueVM(new TechniqueVM(unionID));
            }
            spyOn(spanningViewModel, 'filterTactics').and.returnValue(spanningMatrix.tactics);
            spyOn(spanningViewModel, 'filterTechniques').and.callFake((techniques) => techniques);
            spyOn(spanningViewModel, 'sortTechniques').and.callFake((techniques) => techniques);

            let result = new RenderableMatrix(spanningMatrix, spanningViewModel, {
                showSubtechniques: 'none',
                spanAdjacentTechniques: true,
                columnWidth: 220,
                fontSize: 18,
            });
            let leftShared = result.tactics[0].techniques.find((entry) => entry.technique === sharedTechnique)!;
            let rightShared = result.tactics[1].techniques.find((entry) => entry.technique === sharedTechnique)!;

            expect(result.tactics[0].techniques[0]).toBe(leftShared);
            expect(result.tactics[1].techniques[0]).toBe(rightShared);
            expect(leftShared.yPosition).toBe(2);
            expect(rightShared.yPosition).toBe(2);
            expect(leftShared.columnSpan).toBe(2);
            expect(leftShared.spanFollower).toBeFalse();
            expect(rightShared.columnSpan).toBe(2);
            expect(rightShared.spanFollower).toBeTrue();
            expect(result.tactics[0].techniques[1].yPosition).toBe(3);
            expect(result.tactics[1].techniques[1].yPosition).toBe(3);

            spanningViewModel.getTechniqueVM(sharedTechnique, spanningMatrix.tactics[0]).color = '#ffff66';
            spanningViewModel.getTechniqueVM(sharedTechnique, spanningMatrix.tactics[1]).color = '#ffff66';
            result = new RenderableMatrix(spanningMatrix, spanningViewModel, {
                showSubtechniques: 'none',
                spanAdjacentTechniques: true,
                columnWidth: 220,
                fontSize: 18,
            });
            leftShared = result.tactics[0].techniques.find((entry) => entry.technique === sharedTechnique)!;
            rightShared = result.tactics[1].techniques.find((entry) => entry.technique === sharedTechnique)!;

            expect(leftShared.columnSpan).toBe(2);
            expect(rightShared.spanFollower).toBeTrue();

            spanningViewModel.getTechniqueVM(sharedTechnique, spanningMatrix.tactics[1]).color = '#ffcc00';
            result = new RenderableMatrix(spanningMatrix, spanningViewModel, {
                showSubtechniques: 'none',
                spanAdjacentTechniques: true,
                columnWidth: 220,
                fontSize: 18,
            });
            leftShared = result.tactics[0].techniques.find((entry) => entry.technique === sharedTechnique)!;
            rightShared = result.tactics[1].techniques.find((entry) => entry.technique === sharedTechnique)!;

            expect(leftShared.columnSpan).toBe(1);
            expect(leftShared.spanFollower).toBeFalse();
            expect(rightShared.columnSpan).toBe(1);
            expect(rightShared.spanFollower).toBeFalse();
        });

        it('should mark a parent when its visible sub-techniques are collapsed', () => {
            matrix = new Matrix(matrixSDO, idToTacticSDO, [technique, subtechnique], null);

            spyOn(viewModel, 'filterTechniques')
                .withArgs(tactic.techniques, tactic, matrix)
                .and.returnValue([technique])
                .withArgs(technique.subtechniques, tactic, matrix)
                .and.returnValue([subtechnique]);
            spyOn(viewModel, 'sortTechniques').and.returnValue([technique]);
            spyOn(viewModel, 'getTechniqueVM').and.returnValue(techniqueVM);

            renderableTactic = new RenderableTactic(tactic, matrix, viewModel, { showSubtechniques: 'none' });

            expect(renderableTactic.techniques[0].showSubtechniqueMarker).toBeTrue();
            expect(renderableTactic.subtechniques).toEqual([]);
        });

        it('should increase cell height when a technique label wraps', () => {
            const longTechnique = new Technique(
                {
                    ...t0000,
                    name: 'A deliberately long technique name which requires several wrapped lines',
                },
                [],
                null
            );
            matrix = new Matrix(matrixSDO, idToTacticSDO, [longTechnique], null);

            spyOn(viewModel, 'filterTechniques').and.callFake((techniques) => techniques);
            spyOn(viewModel, 'sortTechniques').and.returnValue([longTechnique]);
            spyOn(viewModel, 'getTechniqueVM').and.returnValue(techniqueVM);

            renderableTactic = new RenderableTactic(tactic, matrix, viewModel, {
                showSubtechniques: 'none',
                columnWidth: 50,
                fontSize: 10,
            });

            expect(renderableTactic.techniques[0].height).toBeGreaterThan(1);
            expect(renderableTactic.techniques[0].height).toBe(renderableTactic.techniques[0].lines.length);
            expect(renderableTactic.height).toBe(renderableTactic.headerHeight + renderableTactic.techniques[0].height);
        });

        it('should greedily fill each line before wrapping', () => {
            const wrappingTechnique = new Technique(
                {
                    ...t0000,
                    name: 'one two three four',
                },
                [],
                null
            );
            matrix = new Matrix(matrixSDO, idToTacticSDO, [wrappingTechnique], null);

            spyOn(viewModel, 'filterTechniques').and.callFake((techniques) => techniques);
            spyOn(viewModel, 'sortTechniques').and.returnValue([wrappingTechnique]);
            spyOn(viewModel, 'getTechniqueVM').and.returnValue(techniqueVM);

            renderableTactic = new RenderableTactic(tactic, matrix, viewModel, {
                showSubtechniques: 'none',
                columnWidth: 21,
                fontSize: 10,
                measureText: (text: string) => text.length,
            });

            expect(renderableTactic.techniques[0].lines).toEqual(['one two three', 'four']);
            expect(renderableTactic.techniques[0].height).toBe(2);
        });

        it('should initialize RenderableTechnique correctly with defaults', () => {
            expect(renderableTechnique.yPosition).toBe(1);
            expect(renderableTechnique.technique).toBe(technique);
            expect(renderableTechnique.tactic).toBe(tactic);
            expect(renderableTechnique.matrix).toBe(matrix);
            expect(renderableTechnique.viewModel).toBe(viewModel);
            expect(renderableTechnique.showSubtechniques).toBeFalse();
            expect(renderableTechnique.height).toBe(1);
            expect(renderableTechnique.hasSubtechniques).toBeFalse();
            expect(renderableTechnique.showSubtechniqueMarker).toBeFalse();
            expect(renderableTechnique.lines).toEqual(['Example Name']);
        });

        it('should initialize RenderableTechnique correctly with given params', () => {
            renderableTechnique = new RenderableTechnique(1, technique, tactic, matrix, viewModel, true, 2, true);

            expect(renderableTechnique.yPosition).toBe(1);
            expect(renderableTechnique.technique).toBe(technique);
            expect(renderableTechnique.tactic).toBe(tactic);
            expect(renderableTechnique.matrix).toBe(matrix);
            expect(renderableTechnique.viewModel).toBe(viewModel);
            expect(renderableTechnique.showSubtechniques).toBeTrue();
            expect(renderableTechnique.height).toBe(2);
            expect(renderableTechnique.hasSubtechniques).toBeTrue();
            expect(renderableTechnique.showSubtechniqueMarker).toBeFalse();
            expect(renderableTechnique.lines).toEqual(['Example Name']);
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

        it('should identify an enabled technique with a cell color as highlighted', () => {
            techniqueVM.enabled = true;
            techniqueVM.color = '#ffff66';

            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);

            expect(renderableTechnique.highlighted).toBeTrue();
        });

        it('should not identify an uncolored or disabled technique as highlighted', () => {
            spyOn(viewModel, 'hasTechniqueVM').withArgs(technique, tactic).and.returnValue(true);
            spyOn(viewModel, 'getTechniqueVM').withArgs(technique, tactic).and.returnValue(techniqueVM);

            techniqueVM.enabled = true;
            techniqueVM.color = '';
            expect(renderableTechnique.highlighted).toBeFalse();

            techniqueVM.enabled = false;
            techniqueVM.color = '#ffff66';
            expect(renderableTechnique.highlighted).toBeFalse();
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

        it('should leave dimensions to the render model for fit matrix sizing', () => {
            const originalWidth = component.config.width;
            const originalHeight = component.config.height;

            component['setSize'](component, 'matrix', 'landscape');

            expect(component.config.width).toBe(originalWidth);
            expect(component.config.height).toBe(originalHeight);
        });
    });

    describe('matrixCanvasSize', () => {
        it('should preserve generator-style column width and cell height', () => {
            const smaller = component['matrixCanvasSize'](12, 30, 84);
            const larger = component['matrixCanvasSize'](15, 60, 84);

            expect((larger.width - smaller.width) / 3).toBe(220);
            expect((larger.height - smaller.height) / 30).toBe(30);
        });

        it('should keep the Enterprise baseline close to the current default', () => {
            const size = component['matrixCanvasSize'](15, 54, 84);

            expect(size.width).toBe(3348);
            expect(size.height).toBe(1752);
        });

        it('should reserve generator-style footer space without changing matrix cell dimensions', () => {
            const withoutCopyright = component['matrixCanvasSize'](15, 54, 84, 0);
            const withCopyright = component['matrixCanvasSize'](15, 54, 84, component['copyrightFooterHeight']);

            expect(withCopyright.width).toBe(withoutCopyright.width);
            expect(withCopyright.height - withoutCopyright.height).toBe(56);
        });
    });

    describe('copyrightLine', () => {
        it('should use the Navigator version and supplied year', () => {
            const line = component['copyrightLine']('19.2', new Date(2026, 7, 18));

            expect(line).toBe('© 2026 MITRE - MITRE ATT&CK Framework version v19.2');
        });

        it('should avoid duplicating a version prefix', () => {
            expect(component['copyrightLine']('v19', new Date(2026, 7, 18))).toContain('Framework version v19');
        });
    });

    describe('tacticHeaderTextLayout', () => {
        it('should match the generator header spacing at the default size', () => {
            const layout = component['tacticHeaderTextLayout'](84, 19, 1);

            expect(layout.lineHeight).toBe(23);
            expect(layout.firstNameY).toBe(34);
            expect(layout.countY).toBe(59);
            expect(layout.countFontSize).toBe(17);
        });
    });

    describe('tacticNameHorizontalScale', () => {
        it('should use the generator scale when a tactic name already fits', () => {
            expect(component['tacticNameHorizontalScale'](180, 200)).toBe(0.94);
        });

        it('should compress a long tactic name enough to keep it on one line', () => {
            const scale = component['tacticNameHorizontalScale'](250, 200);

            expect(scale).toBe(0.8);
            expect(250 * scale).toBeLessThanOrEqual(200);
        });
    });

    describe('sub-technique marker display', () => {
        const collapsedParent = { showSubtechniqueMarker: true } as RenderableTechnique;

        it('should render collapsed-parent markers by default and allow them to be hidden', () => {
            expect(component['shouldRenderSubtechniqueMarker'](collapsedParent)).toBeTrue();

            component.config.showSubtechniqueMarker = false;

            expect(component['shouldRenderSubtechniqueMarker'](collapsedParent)).toBeFalse();
        });

        it('should add the marker meaning to the legend', () => {
            const svg = d3.select(document.body).append('svg');
            const group = svg.append('g');

            component['buildSubtechniqueLegend']()(component, group, 200);

            const legend = group.select('.subtechnique-marker-legend').node();
            expect(legend.querySelector('path').getAttribute('stroke')).toBe('#66c7ec');
            expect(legend.querySelector('text').textContent).toBe('has sub-techniques');
            svg.remove();
        });
    });

    describe('explicit cell text layout', () => {
        it('should assign a separate vertical position to every stored line', () => {
            expect(component['cellTextLinePositions'](60, 2, 18)).toEqual([19, 41]);
        });

        it('should reduce auto-fit text when an explicit line is wider than its viewport', () => {
            component.config.autofitText = true;
            const fontSize = component['cellFontSize'](['short', 'a much longer line'], 100, 60, 18, (text, size) => text.length * size);

            expect(fontSize).toBeLessThan(18);
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
        let component: ImageExportComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageExportComponent);
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
        let component: ImageExportComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageExportComponent);
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
        it('should convert inches to pixels', inject([ImageExportComponent], (component: ImageExportComponent) => {
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

    describe('image export', () => {
        function createSvg(width: number = 320, height: number = 180): SVGSVGElement {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', String(width));
            svg.setAttribute('height', String(height));
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('font-family', 'Arial Narrow, sans-serif');
            text.setAttribute('font-size', '14');
            text.setAttribute('x', '10');
            text.setAttribute('y', '20');
            text.textContent = 'Example';
            svg.appendChild(text);
            return svg;
        }

        it('should generate a safe filename for every supported format', () => {
            component.viewModel.name = 'Example: Layer / One';

            expect(component['exportFilename']('svg')).toBe('Example_Layer__One.svg');
            expect(component['exportFilename']('png')).toBe('Example_Layer__One.png');
            expect(component['exportFilename']('pdf')).toBe('Example_Layer__One.pdf');
        });

        it('should preserve SVG dimensions and add a viewBox when serializing', () => {
            const serialized = component['serializeSvg'](createSvg(), true);

            expect(serialized).toContain('<?xml version="1.0"');
            expect(serialized).toContain('width="320"');
            expect(serialized).toContain('height="180"');
            expect(serialized).toContain('viewBox="0 0 320 180"');
        });

        it('should use the bundled font for all PDF text without changing the source SVG', () => {
            const source = createSvg();
            const clone = component['svgWithPdfFont'](source);

            expect(clone.querySelector('text').getAttribute('font-family')).toBe('Roboto Condensed');
            expect(source.querySelector('text').getAttribute('font-family')).toBe('Arial Narrow, sans-serif');
        });

        it('should translate SVG middle baselines for PDF rendering', () => {
            const source = createSvg();
            const sourceText = source.querySelector('text');
            sourceText.setAttribute('dominant-baseline', 'middle');

            const clone = component['svgWithPdfFont'](source);

            expect(clone.querySelector('text').getAttribute('alignment-baseline')).toBe('middle');
            expect(sourceText.hasAttribute('alignment-baseline')).toBeFalse();
        });

        it('should flatten tactic-name compression around the cell center for PDF rendering', () => {
            const source = createSvg();
            const sourceText = source.querySelector('text');
            sourceText.classList.add('tactic-name');
            sourceText.setAttribute('x', '110');
            sourceText.setAttribute('data-horizontal-scale', '0.8');
            sourceText.setAttribute('transform', 'translate(110 0) scale(0.8 1) translate(-110 0)');

            const clone = component['svgWithPdfFont'](source);
            const clonedText = clone.querySelector('text');

            expect(clonedText.getAttribute('x')).toBe('137.5');
            expect(clonedText.getAttribute('transform')).toBe('scale(0.8 1)');
            expect(sourceText.getAttribute('x')).toBe('110');
            expect(sourceText.getAttribute('transform')).toBe('translate(110 0) scale(0.8 1) translate(-110 0)');
        });

        it('should register bundled regular and bold fonts in the PDF', async () => {
            const fontData = new Uint8Array([65]).buffer;
            spyOn(window, 'fetch').and.resolveTo({
                ok: true,
                arrayBuffer: async () => fontData,
            } as Response);
            const browserFontSpy = spyOn(component as any, 'registerPdfBrowserFonts').and.resolveTo();
            const pdf = {
                addFileToVFS: jasmine.createSpy('addFileToVFS'),
                addFont: jasmine.createSpy('addFont'),
            };

            await component['registerPdfFonts'](pdf);

            expect(window.fetch).toHaveBeenCalledTimes(2);
            expect(pdf.addFileToVFS).toHaveBeenCalledWith('RobotoCondensed-Regular.ttf', 'QQ==');
            expect(pdf.addFileToVFS).toHaveBeenCalledWith('RobotoCondensed-Bold.ttf', 'QQ==');
            expect(pdf.addFont).toHaveBeenCalledWith('RobotoCondensed-Regular.ttf', 'Roboto Condensed', 'normal', 400);
            expect(pdf.addFont).toHaveBeenCalledWith('RobotoCondensed-Bold.ttf', 'Roboto Condensed', 'normal', 700);
            expect(browserFontSpy).toHaveBeenCalledWith(fontData, fontData);
        });
    });
});
