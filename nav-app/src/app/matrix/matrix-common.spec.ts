import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixCommon } from './matrix-common';
import { TechniqueVM, ViewModel } from '../classes';
import { Matrix, Technique, Tactic } from '../classes/stix';
import { EventEmitter } from '@angular/core';
import * as MockData from '../../tests/utils/mock-data';

describe('MatrixCommon', () => {
    let matrixCommon: MatrixCommon;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MatrixCommon]
        });
        matrixCommon = TestBed.inject(MatrixCommon);
		matrixCommon.viewModel = new ViewModel("layer","1","enterprise-attack-13",null);
    });

    it('should be created', () => {
        expect(matrixCommon).toBeTruthy();
    });

    it('should change tactic row color', () => {
        matrixCommon.viewModel.showTacticRowBackground = true;
        matrixCommon.getTacticBackground();
        matrixCommon.viewModel.showTacticRowBackground = false;
        matrixCommon.getTacticBackground();
        expect(matrixCommon).toBeTruthy();
    });

    it('should filter techniques and tactics', () => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        matrixCommon.viewModel.showTacticRowBackground = true;
        let st1 = new Technique(MockData.T0000_002,[],null);
        let st2 = new Technique(MockData.T0000_000,[],null);
        let t1 = new Technique(MockData.T0000,[st1, st2],null);
        technique_list.push(t1);
        let t2 = new Technique(MockData.T0001,[],null);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T0000^tactic-name");
        let stvm_1 = new TechniqueVM("T0000.002^tactic-name");
        let stvm_2 = new TechniqueVM("T0000.000^tactic-name");
        tvm_1.score = '2';
        let tvm_2 = new TechniqueVM("T0001^tactic-name");
        let stvm_3 = new TechniqueVM("T0001.002^tactic-name");
        stvm_3.score = '3';
		matrixCommon.viewModel.setTechniqueVM(tvm_1);
        matrixCommon.viewModel.setTechniqueVM(tvm_2);
        matrixCommon.viewModel.setTechniqueVM(stvm_1);
        matrixCommon.viewModel.setTechniqueVM(stvm_2);
        matrixCommon.viewModel.setTechniqueVM(stvm_3);
        matrixCommon.viewModel.layout.showAggregateScores = true;
        matrixCommon.viewModel.layout.aggregateFunction = "min";
        matrixCommon.viewModel.filters.platforms.selection = ["PRE"];
        let tactic1 = new Tactic(MockData.TA0000,technique_list,null);
        tactic_list.push(tactic1);
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        expect(matrixCommon.filterTechniques(technique_list, tactic1)).toEqual([t1, t2]);
        matrixCommon.viewModel.loaded = true;
        matrixCommon.filterTactics(tactic_list);
        expect(matrixCommon.filterTactics(tactic_list)).toEqual(tactic_list);
        matrixCommon.viewModel.hideDisabled = false;
        expect(matrixCommon.filterTechniques(technique_list, tactic1)).toEqual([t1, t2]);
        MockData.matrixSDO.name = 'PRE-ATT&CK';
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        matrixCommon.viewModel.hideDisabled = true;
        expect(matrixCommon.filterTechniques(technique_list, tactic1)).toEqual(technique_list);
        spyOn(matrixCommon.viewModel, 'isSubtechniqueEnabled').and.returnValues(false);
        expect(matrixCommon.filterTechniques(technique_list, tactic1)).toEqual([]);
    });

    it('should sort techniques and tactics', () => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        matrixCommon.viewModel.showTacticRowBackground = true;
        let st1 = new Technique(MockData.T0000_002,[],null);
        let st2 = new Technique(MockData.T0000_000,[],null);
        let t1 = new Technique(MockData.T0000,[st1, st2],null);
        technique_list.push(t1);
        let t2 = new Technique(MockData.T0001,[],null);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T0000^tactic-name");
        let stvm_1 = new TechniqueVM("T0000.002^tactic-name");
        let stvm_2 = new TechniqueVM("T0000.000^tactic-name");
        tvm_1.score = '2';
        let tvm_2 = new TechniqueVM("T0001^tactic-name");
        let stvm_3 = new TechniqueVM("T0001.002^tactic-name");
        stvm_3.score = '3';
		matrixCommon.viewModel.setTechniqueVM(tvm_1);
        matrixCommon.viewModel.setTechniqueVM(tvm_2);
        matrixCommon.viewModel.setTechniqueVM(stvm_1);
        matrixCommon.viewModel.setTechniqueVM(stvm_2);
        matrixCommon.viewModel.setTechniqueVM(stvm_3);
        matrixCommon.viewModel.layout.showAggregateScores = true;
        matrixCommon.viewModel.layout.aggregateFunction = "min";
        matrixCommon.viewModel.filters.platforms.selection = ["PRE"];
        let tactic1 = new Tactic(MockData.TA0000,technique_list,null);
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        matrixCommon.applyControls(technique_list,tactic1);
        matrixCommon.sortTechniques(technique_list,tactic1);
        matrixCommon.viewModel.layout.aggregateFunction = "max";
        matrixCommon.applyControls(technique_list,tactic1);
        matrixCommon.sortTechniques(technique_list,tactic1);
        matrixCommon.viewModel.layout.aggregateFunction = "sum";
        matrixCommon.applyControls(technique_list,tactic1);
        matrixCommon.sortTechniques(technique_list,tactic1);
        matrixCommon.viewModel.sorting = 1;
        matrixCommon.viewModel.layout.aggregateFunction = "average";
        matrixCommon.applyControls(technique_list,tactic1);
        matrixCommon.sortTechniques(technique_list,tactic1);
        matrixCommon.viewModel.sorting = 2;
        matrixCommon.viewModel.layout.aggregateFunction = "min";
        matrixCommon.applyControls(technique_list,tactic1);
        matrixCommon.sortTechniques(technique_list,tactic1);
        matrixCommon.viewModel.sorting = 3;
        matrixCommon.sortTechniques(technique_list,tactic1);
        expect(matrixCommon).toBeTruthy();
    });

    it('should toggle', () => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        let st1 = new Technique(MockData.T0000_002,[],null);
        let t1 = new Technique(MockData.T0000,[st1],null);
        let t2 = new Technique(MockData.T0001,[],null);
        technique_list.push(t1);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T0000^tactic-name");
        let stvm_1 = new TechniqueVM("T0000.002^tactic-name");
        let tvm_2 = new TechniqueVM("T0001^tactic-name");
		matrixCommon.viewModel.setTechniqueVM(tvm_1);
        matrixCommon.viewModel.setTechniqueVM(stvm_1);
        matrixCommon.viewModel.setTechniqueVM(tvm_2);
        let tactic1 = new Tactic(MockData.TA0000,technique_list,null);
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        matrixCommon.onToggleSubtechniquesVisible(t1,tactic1);
        let tvm = matrixCommon.viewModel.getTechniqueVM(t1, tactic1);
        expect(tvm.showSubtechniques).toEqual(true);
        matrixCommon.onToggleSubtechniquesVisible(t2,tactic1);
        expect(tvm.showSubtechniques).toEqual(true);
    });

    it('should highlight and unhighlight technique', () => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        let st1 = new Technique(MockData.T0000_002,[],null);
        let t1 = new Technique(MockData.T0000,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T0000^tactic-name");
        let stvm_1 = new TechniqueVM("T0000.002^tactic-name");
		matrixCommon.viewModel.setTechniqueVM(tvm_1);
        matrixCommon.viewModel.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(MockData.TA0000,technique_list,null);
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        matrixCommon.onTechniqueHighlight(null,t1,tactic1);
        expect(matrixCommon.viewModel.highlightedTactic.name).toEqual("Name");
        matrixCommon.onTechniqueUnhighlight(null);
        expect(matrixCommon.viewModel.highlightedTactic).toEqual(null);
    });

    it('should not modify technique selection if selecting_techniques is disabled', () => {
        let technique = new Technique(MockData.T0000, [], null);
        let tactic = new Tactic(MockData.TA0000, [technique], null);

        spyOn(matrixCommon.configService, 'getFeature').and.returnValue(false);
        spyOn(matrixCommon.viewModel, 'isTechniqueSelected');
        spyOn(matrixCommon.viewModel, 'unselectTechnique');
        spyOn(matrixCommon.viewModel, 'selectTechnique');
        spyOn(matrixCommon.viewModel, 'clearSelectedTechniques');
        let emitterSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');

        matrixCommon.onTechniqueLeftClick({}, technique, tactic);

        expect(matrixCommon.viewModel.isTechniqueSelected).not.toHaveBeenCalled();
        expect(matrixCommon.viewModel.unselectTechnique).not.toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectTechnique).not.toHaveBeenCalled();
        expect(matrixCommon.viewModel.clearSelectedTechniques).not.toHaveBeenCalled();
        expect(emitterSpy).not.toHaveBeenCalled();
    });

    it('should remove technique from selection based on event modifiers', () => {
        let technique = new Technique(MockData.T0000, [], null);
        let tactic = new Tactic(MockData.TA0000, [technique], null);

        spyOn(matrixCommon.viewModel, 'isTechniqueSelected').and.returnValue(true); // technique is selected
        spyOn(matrixCommon.configService, 'getFeature').and.returnValue(true);
        let unselectSpy = spyOn(matrixCommon.viewModel, 'unselectTechnique');
        let selectSpy = spyOn(matrixCommon.viewModel, 'selectTechnique');
        let emitterSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');

        // case: shift key
        matrixCommon.onTechniqueLeftClick({shift: true}, technique, tactic);
        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique, tactic);
        expect(unselectSpy).toHaveBeenCalledWith(technique, tactic);
        expect(selectSpy).not.toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalled();

        unselectSpy.calls.reset();
        selectSpy.calls.reset();
        emitterSpy.calls.reset();

        // case: ctrl key
        matrixCommon.onTechniqueLeftClick({ctrl: true}, technique, tactic);
        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique, tactic);
        expect(unselectSpy).toHaveBeenCalledWith(technique, tactic);
        expect(selectSpy).not.toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalled();

        unselectSpy.calls.reset();
        selectSpy.calls.reset();
        emitterSpy.calls.reset();

        // case: meta key
        matrixCommon.onTechniqueLeftClick({meta: true}, technique, tactic);
        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique, tactic);
        expect(unselectSpy).toHaveBeenCalledWith(technique, tactic);
        expect(selectSpy).not.toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalled();
    });

    it('should add technique to selection based on event modifiers', () => {
        let technique = new Technique(MockData.T0000, [], null);
        let tactic = new Tactic(MockData.TA0000, [technique], null);

        spyOn(matrixCommon.viewModel, 'isTechniqueSelected').and.returnValue(false); // technique is not selected
        spyOn(matrixCommon.configService, 'getFeature').and.returnValue(true);
        let unselectSpy = spyOn(matrixCommon.viewModel, 'unselectTechnique');
        let selectSpy = spyOn(matrixCommon.viewModel, 'selectTechnique');
        let emitterSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');

        matrixCommon.onTechniqueLeftClick({shift: true}, technique, tactic);

        expect(matrixCommon.viewModel.isTechniqueSelected).toHaveBeenCalledWith(technique, tactic);
        expect(unselectSpy).not.toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalledWith(technique, tactic);
        expect(emitterSpy).toHaveBeenCalled();
    });

    it('should left click on technique', () => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        let vm1 = matrixCommon.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(MockData.T0000_002,[],null);
        let t1 = new Technique(MockData.T0000,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T0000^tactic-name");
        let stvm_1 = new TechniqueVM("T0000.002^tactic-name");
        let t2 = new Technique(MockData.T0001,[],null);
        technique_list.push(t2);
        let tvm_2 = new TechniqueVM("T0001^tactic-name");
        let stvm_2 = new TechniqueVM("T0001.002^tactic-name");
		vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(stvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_2);
        let tactic1 = new Tactic(MockData.TA0000,technique_list,null);
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        let e1 = new EventEmitter<any>();
        let event = {"shift":true};
        matrixCommon.viewModel = vm1;
        let emitSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');
        matrixCommon.configService.setFeature("selecting_techniques", true);
        matrixCommon.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(1); // T0000
        matrixCommon.onTechniqueLeftClick(event,t1,tactic1); 
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
        matrixCommon.onTechniqueLeftClick(event,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(1); // T0000
        matrixCommon.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
        spyOn(matrixCommon.viewModel, 'isTechniqueSelected').and.returnValues(false);
        spyOn(matrixCommon.viewModel, 'getSelectedTechniqueCount').and.returnValue(2);
        vm1.activeTvm = tvm_2;
        matrixCommon.viewModel = vm1;
        matrixCommon.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
    });

    it('on tactic click', () => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        let t1 = new Technique(MockData.T0000,[],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T0000^tactic-name");
        let t2 = new Technique(MockData.T0001,[],null);
        technique_list.push(t2);
        let tvm_2 = new TechniqueVM("T0001^tactic-name");
		matrixCommon.viewModel.setTechniqueVM(tvm_1);
        matrixCommon.viewModel.setTechniqueVM(tvm_2);
        let tactic1 = new Tactic(MockData.TA0000,technique_list,null);
        matrixCommon.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        matrixCommon.onTacticClick(tactic1);
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(2); // T0000, T0001
        spyOn(matrixCommon.viewModel, 'isTacticSelected').and.returnValue(true);
        matrixCommon.onTacticClick(tactic1);
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
    });
});
