import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatrixCommon } from './matrix-common';
import { TechniqueVM, ViewModel } from '../classes';
import { Matrix, Technique, Tactic } from '../classes/stix';
import * as MockData from '../../tests/utils/mock-data';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MatrixCommon', () => {
    let matrixCommon: MatrixCommon;
    let techniqueList: Technique[];
    let technique1: Technique;
    let technique2: Technique;
    let idToTacticSDO = new Map<string, any>();
    let tacticList: Tactic[];
    let tactic: Tactic;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [MatrixCommon, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        });
        matrixCommon = TestBed.inject(MatrixCommon);
        matrixCommon.viewModel = new ViewModel('layer', '1', 'enterprise-attack-13', null);
        idToTacticSDO.set('tactic-0', MockData.TA0000);

        // create technique list
        let subtechnique1 = new Technique(MockData.T0000_002, [], null);
        let subtechnique2 = new Technique(MockData.T0000_000, [], null);
        technique1 = new Technique(MockData.T0000, [subtechnique1, subtechnique2], null);
        technique2 = new Technique(MockData.T0001, [], null);
        techniqueList = [technique1, technique2];

        // set up technique VMs
        matrixCommon.viewModel.setTechniqueVM(new TechniqueVM('T0000^tactic-name'));
        matrixCommon.viewModel.setTechniqueVM(new TechniqueVM('T0001^tactic-name'));
        matrixCommon.viewModel.setTechniqueVM(new TechniqueVM('T0000.002^tactic-name'));
        matrixCommon.viewModel.setTechniqueVM(new TechniqueVM('T0000.000^tactic-name'));
        matrixCommon.viewModel.setTechniqueVM(new TechniqueVM('T0001.002^tactic-name'));

        // create tactic/matrix
        tactic = new Tactic(MockData.TA0000, techniqueList, null);
        tacticList = [tactic];
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO, techniqueList, null);

        // view model config
        matrixCommon.viewModel.showTacticRowBackground = true;
        matrixCommon.viewModel.layout.showAggregateScores = true;
        matrixCommon.viewModel.layout.aggregateFunction = 'min';
        matrixCommon.viewModel.filters.platforms.selection = ['PRE'];
    });

    it('should be created', () => {
        expect(matrixCommon).toBeTruthy();
    });

    it('should change tactic row color', () => {
        matrixCommon.getTacticBackground();
        matrixCommon.viewModel.showTacticRowBackground = false;
        matrixCommon.getTacticBackground();
        expect(matrixCommon).toBeTruthy();
    });

    it('should filter techniques and tactics', () => {
        expect(matrixCommon.filterTechniques(techniqueList, tactic)).toEqual([technique1, technique2]);
        matrixCommon.viewModel.loaded = true;
        matrixCommon.filterTactics(tacticList);
        expect(matrixCommon.filterTactics(tacticList)).toEqual(tacticList);
        matrixCommon.viewModel.hideDisabled = false;
        expect(matrixCommon.filterTechniques(techniqueList, tactic)).toEqual([technique1, technique2]);
        MockData.matrixSDO.name = 'PRE-ATT&CK';
        matrixCommon.viewModel.hideDisabled = true;
        expect(matrixCommon.filterTechniques(techniqueList, tactic)).toEqual(techniqueList);
        spyOn(matrixCommon.viewModel, 'isSubtechniqueEnabled').and.returnValues(false);
        expect(matrixCommon.filterTechniques(techniqueList, tactic)).toEqual([]);
    });

    it('should sort techniques and tactics', () => {
        matrixCommon.applyControls(techniqueList, tactic);
        matrixCommon.sortTechniques(techniqueList, tactic);
        matrixCommon.viewModel.layout.aggregateFunction = 'max';
        matrixCommon.applyControls(techniqueList, tactic);
        matrixCommon.sortTechniques(techniqueList, tactic);
        matrixCommon.viewModel.layout.aggregateFunction = 'sum';
        matrixCommon.applyControls(techniqueList, tactic);
        matrixCommon.sortTechniques(techniqueList, tactic);
        matrixCommon.viewModel.sorting = 1;
        matrixCommon.viewModel.layout.aggregateFunction = 'average';
        matrixCommon.applyControls(techniqueList, tactic);
        matrixCommon.sortTechniques(techniqueList, tactic);
        matrixCommon.viewModel.sorting = 2;
        matrixCommon.viewModel.layout.aggregateFunction = 'min';
        matrixCommon.applyControls(techniqueList, tactic);
        matrixCommon.sortTechniques(techniqueList, tactic);
        matrixCommon.viewModel.sorting = 3;
        matrixCommon.sortTechniques(techniqueList, tactic);
        expect(matrixCommon).toBeTruthy();
    });

    it('should toggle', () => {
        matrixCommon.onToggleSubtechniquesVisible(technique1, tactic);
        let tvm = matrixCommon.viewModel.getTechniqueVM(technique1, tactic);
        expect(tvm.showSubtechniques).toEqual(true);
        matrixCommon.onToggleSubtechniquesVisible(technique2, tactic);
        expect(tvm.showSubtechniques).toEqual(true);
    });

    it('should highlight and unhighlight technique', () => {
        matrixCommon.onTechniqueHighlight(null, technique1, tactic);
        expect(matrixCommon.viewModel.highlightedTactic.name).toEqual('Name');
        matrixCommon.onTechniqueUnhighlight(null);
        expect(matrixCommon.viewModel.highlightedTactic).toEqual(null);
    });

    it('should not modify technique selection if selecting_techniques is disabled', () => {
        spyOn(matrixCommon.configService, 'getFeature').and.returnValue(false);
        spyOn(matrixCommon.viewModel, 'isTechniqueSelected');
        spyOn(matrixCommon.viewModel, 'unselectTechnique');
        spyOn(matrixCommon.viewModel, 'selectTechnique');
        spyOn(matrixCommon.viewModel, 'clearSelectedTechniques');
        let emitterSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');

        matrixCommon.onTechniqueLeftClick({}, technique1, tactic);

        expect(matrixCommon.viewModel.isTechniqueSelected).not.toHaveBeenCalled();
        expect(matrixCommon.viewModel.unselectTechnique).not.toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectTechnique).not.toHaveBeenCalled();
        expect(matrixCommon.viewModel.clearSelectedTechniques).not.toHaveBeenCalled();
        expect(emitterSpy).not.toHaveBeenCalled();
    });

    it('should remove technique from selection based on event modifiers', () => {
        spyOn(matrixCommon.viewModel, 'isTechniqueSelected').and.returnValue(true); // technique is selected
        spyOn(matrixCommon.configService, 'getFeature').and.returnValue(true);
        let unselectSpy = spyOn(matrixCommon.viewModel, 'unselectTechnique');
        let selectSpy = spyOn(matrixCommon.viewModel, 'selectTechnique');
        let emitterSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');

        // case: shift key
        matrixCommon.onTechniqueLeftClick({ shift: true }, technique1, tactic);
        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique1, tactic);
        expect(unselectSpy).toHaveBeenCalledWith(technique1, tactic);
        expect(selectSpy).not.toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalled();

        unselectSpy.calls.reset();
        selectSpy.calls.reset();
        emitterSpy.calls.reset();

        // case: ctrl key
        matrixCommon.onTechniqueLeftClick({ ctrl: true }, technique1, tactic);
        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique1, tactic);
        expect(unselectSpy).toHaveBeenCalledWith(technique1, tactic);
        expect(selectSpy).not.toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalled();

        unselectSpy.calls.reset();
        selectSpy.calls.reset();
        emitterSpy.calls.reset();

        // case: meta key
        matrixCommon.onTechniqueLeftClick({ meta: true }, technique1, tactic);
        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique1, tactic);
        expect(unselectSpy).toHaveBeenCalledWith(technique1, tactic);
        expect(selectSpy).not.toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalled();
    });

    it('should add technique to selection based on event modifiers', () => {
        spyOn(matrixCommon.viewModel, 'isTechniqueSelected').and.returnValue(false); // technique is not selected
        spyOn(matrixCommon.configService, 'getFeature').and.returnValue(true);
        let unselectSpy = spyOn(matrixCommon.viewModel, 'unselectTechnique');
        let selectSpy = spyOn(matrixCommon.viewModel, 'selectTechnique');
        let emitterSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');

        matrixCommon.onTechniqueLeftClick({ shift: true }, technique1, tactic);

        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique1, tactic);
        expect(unselectSpy).not.toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalledWith(technique1, tactic);
        expect(emitterSpy).toHaveBeenCalled();
    });

    it('should left click on technique', () => {
        let event = { shift: true };
        let emitSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');
        matrixCommon.configService.setFeature('selecting_techniques', true);
        matrixCommon.onTechniqueLeftClick({}, technique1, tactic);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(1); // T0000
        matrixCommon.onTechniqueLeftClick(event, technique1, tactic);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
        matrixCommon.onTechniqueLeftClick(event, technique1, tactic);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(1); // T0000
        matrixCommon.onTechniqueLeftClick({}, technique1, tactic);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
        spyOn(matrixCommon.viewModel, 'isTechniqueSelected').and.returnValues(false);
        spyOn(matrixCommon.viewModel, 'getSelectedTechniqueCount').and.returnValue(2);
        matrixCommon.viewModel.activeTvm = matrixCommon.viewModel.getTechniqueVM_id('T0001^tactic-name');
        matrixCommon.onTechniqueLeftClick({}, technique1, tactic);
        expect(emitSpy).toHaveBeenCalled();
    });

    it('on tactic click', () => {
        matrixCommon.onTacticClick(tactic);
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(2); // T0000, T0001
        spyOn(matrixCommon.viewModel, 'isTacticSelected').and.returnValue(true);
        matrixCommon.onTacticClick(tactic);
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
    });
});
