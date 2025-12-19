import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechniqueCellComponent } from './technique-cell.component';
import { ViewModelsService } from '../../services/viewmodels.service';
import { TechniqueVM } from '../../classes';
import { Matrix, Tactic, Technique } from '../../classes/stix';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Cell } from '../cell';
import * as MockData from '../../../tests/utils/mock-data';
import { ConfigService } from '../../services/config.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TechniqueCellComponent', () => {
    let component: TechniqueCellComponent;
    let fixture: ComponentFixture<TechniqueCellComponent>;
    let techniqueTacticUnionId = 'T0000^tactic-name';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TechniqueCellComponent],
            providers: [ViewModelsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        });
        let configService = TestBed.inject(ConfigService);
        configService.versions = MockData.configData;
        fixture = TestBed.createComponent(TechniqueCellComponent);
        component = fixture.debugElement.componentInstance;
        let sub1 = new Technique(MockData.T0000_000, [], null);
        let sub2 = new Technique(MockData.T0000_001, [], null);
        component.technique = new Technique(MockData.T0000, [sub1, sub2], null);
        component.tactic = new Tactic(MockData.TA0000, [component.technique], null);
        let map = new Map();
        map.set(component.tactic.id, MockData.TA0000);
        component.matrix = new Matrix(MockData.matrixSDO, map, [component.technique, sub1, sub2], null);
        component.viewModel = component.viewModelsService.newViewModel('vm', 'enterprise-attack-13');
        component.viewModel.setTechniqueVM(new TechniqueVM(techniqueTacticUnionId));
        component.viewModel.setTechniqueVM(new TechniqueVM('T0000.000^tactic-name'));
        component.viewModel.setTechniqueVM(new TechniqueVM('T0000.001^tactic-name'));
        component.viewModelsService.pinnedCell = '';
        component.showContextmenu = false;
        component.viewModel.techniqueVMs.forEach((tvm) => (tvm.score = ''));
        fixture.detectChanges();
    });

    it('should create an instance of TechniqueCellComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should not be pinned cell', () => {
        expect(component.isCellPinned).toBeFalse();
    });

    it('should be pinned cell', () => {
        component.viewModelsService.pinnedCell = techniqueTacticUnionId;
        expect(component.isCellPinned).toBeTrue();
    });

    it('showTooltip should show the tooltip if isCellPinned is true', () => {
        Object.defineProperty(component, 'isCellPinned', { get: () => true });
        expect(component.showTooltip).toBe(true);

        component.viewModel.highlightTechnique(component.technique, component.tactic);
        expect(component.showTooltip).toBeTrue();
        component.viewModel.clearHighlight();
    });

    it('showTooltip should return false if showMenu is true', () => {
        component.showContextmenu = true;
        expect(component.showTooltip).toBe(false);
    });

    it('showTooltip should return false if highlightedTechniques size is 0', () => {
        component.viewModel.highlightedTechniques = new Set();
        expect(component.showTooltip).toBe(false);
    });

    it('showTooltip should return true when all conditions are met', () => {
        const ttid = component.technique.get_technique_tactic_id(component.tactic);
        component.viewModel.highlightedTechniques = new Set([ttid]);
        component.viewModel.highlightedTechnique = component.technique;
        component.viewModel.highlightedTactic = component.tactic;
        expect(component.showTooltip).toBe(true);
    });

    it('showTooltip should return false when highlightedTechnique is different', () => {
        const subttid = component.technique.subtechniques[0].get_technique_tactic_id(component.tactic);
        component.viewModel.highlightedTechniques = new Set([subttid]);
        component.viewModel.highlightedTechnique = component.technique.subtechniques[0];
        expect(component.showTooltip).toBe(false);
    });

    it('showTooltip should return false when highlightedTactic is different', () => {
        const ttid = component.technique.get_technique_tactic_id(component.tactic);
        component.viewModel.highlightedTechniques = new Set([ttid]);
        component.viewModel.highlightedTechnique = component.technique;
        component.viewModel.highlightedTactic = new Tactic(MockData.TA0001, [component.technique], null);
        expect(component.showTooltip).toBe(false);
    });

    it('should not show the tooltip with context menu', () => {
        component.onRightClick(null);
        expect(component.showTooltip).toBeFalse();
    });

    it('should unpin other cells on click', () => {
        component.viewModelsService.pinnedCell = 'T0001^tactic-name';
        expect(component.isCellPinned).toBeFalse();
        component.onRightClick(null);
        expect(component.viewModelsService.pinnedCell).toEqual('');

        component.viewModelsService.pinnedCell = 'T0001^tactic-name';
        expect(component.isCellPinned).toBeFalse();
        component.onLeftClick(null);
        expect(component.viewModelsService.pinnedCell).toEqual('');
    });

    it('should call onRightClick when selecting_techniques is false', () => {
        spyOn(component, 'onRightClick');
        spyOn(component.configService, 'getFeature').and.returnValue(false);
        const event = { shiftKey: false, ctrlKey: false, metaKey: false, pageX: 0, pageY: 0 };
        component.onLeftClick(event);
        expect(component.onRightClick).toHaveBeenCalledWith(event);
    });

    it('should emit leftclick event when selecting_techniques is true', () => {
        spyOn(component, 'onRightClick');
        spyOn(component.configService, 'getFeature').and.returnValue(true);
        const emitSpy = spyOn(component.leftclick, 'emit');
        const event = { shiftKey: true, ctrlKey: true, metaKey: true, pageX: 0, pageY: 0 };
        component.onLeftClick(event);
        expect(component.viewModelsService.pinnedCell).toEqual('');
        expect(emitSpy).toHaveBeenCalledOnceWith({
            technique: component.technique,
            shift: event.shiftKey,
            ctrl: event.ctrlKey,
            meta: event.metaKey,
            x: event.pageX,
            y: event.pageY,
        });
        expect(component.onRightClick).not.toHaveBeenCalled();
    });

    it('should highlight on mouse enter', () => {
        let highlightSpy = spyOn(component.highlight, 'emit');
        component.onMouseEnter();
        expect(highlightSpy).toHaveBeenCalled();
    });

    it('should unhighlight on mouse leave', () => {
        let unhighlightSpy = spyOn(component.unhighlight, 'emit');
        component.onMouseLeave();
        expect(unhighlightSpy).toHaveBeenCalled();
    });

    it('should return the correct class when not annotated and not editing', () => {
        spyOn(Cell.prototype, 'getClass').and.returnValue('base-class');
        spyOn(component, 'annotatedSubtechniques').and.returnValue(0);
        Object.defineProperty(component, 'isCellPinned', { get: () => false });

        const result = component.getClass();
        expect(Cell.prototype.getClass).toHaveBeenCalled();
        expect(result).toBe('base-class unannotated');
    });

    it('should return the correct class when annotated and not editing', () => {
        spyOn(Cell.prototype, 'getClass').and.returnValue('base-class');
        spyOn(component, 'annotatedSubtechniques').and.returnValue(1);
        Object.defineProperty(component, 'isCellPinned', { get: () => false });

        const result = component.getClass();
        expect(Cell.prototype.getClass).toHaveBeenCalled();
        expect(result).toBe('base-class');
    });

    it('should return the correct class when not annotated and editing', () => {
        spyOn(Cell.prototype, 'getClass').and.returnValue('base-class');
        spyOn(component, 'annotatedSubtechniques').and.returnValue(0);
        Object.defineProperty(component, 'isCellPinned', { get: () => true });

        const result = component.getClass();
        expect(Cell.prototype.getClass).toHaveBeenCalled();
        expect(result).toBe('base-class unannotated editing');
    });

    it('should return the correct class when annotated and editing', () => {
        spyOn(Cell.prototype, 'getClass').and.returnValue('base-class');
        spyOn(component, 'annotatedSubtechniques').and.returnValue(1);
        Object.defineProperty(component, 'isCellPinned', { get: () => true });

        const result = component.getClass();
        expect(Cell.prototype.getClass).toHaveBeenCalled();
        expect(result).toBe('base-class editing');
    });

    it('should return empty value if color is not defined', () => {
        const color = undefined;
        const result = component.emulate_alpha(color);
        expect(result).toBe('');
    });
});
