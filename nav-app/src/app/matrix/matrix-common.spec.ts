import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixCommon } from './matrix-common';
import { TechniqueVM, ViewModel } from '../classes';
import { Matrix, Technique, Tactic } from '../classes/stix';
import { EventEmitter } from '@angular/core';

describe('MatrixCommon', () => {
    let matrixCommon: MatrixCommon;
    let stixSDO = {
        "name": "Name",
        "description": "Description",
        "created": "2001-01-01T01:01:00.000Z",
        "modified": "2001-01-01T01:01:00.000Z",
        "x_mitre_version": "1.0",
    }
    let tacticSDO = {
        "id": "tactic-0",
        ...stixSDO,
        "name": "Reconnaissance",
        "type": "x-mitre-tactic",
        "x_mitre_shortname": "reconnaissance",
        "external_references": [
            {
                "external_id": "TA0043",
                "url": "https://attack.mitre.org/tactics/TA0043"
            }
        ]
    }
    let matrixSDO = {
        "external_references": [
            {
                "external_id": "enterprise-attack",
                "source_name": "mitre-attack",
                "url": "https://attack.mitre.org/matrices/enterprise"
            }
        ],
        "id": "x-mitre-matrix--eafc1b4c-5e56-4965-bd4e-66a6a89c88cc",
        "name":"Enterprise ATT&CK",
        "tactic_refs": ["tactic-0"]
    }
    let templateSDO = {
        ...stixSDO,
        "type": "attack-pattern",
        "x_mitre_platforms": ['PRE'],
        "kill_chain_phases": [
            {
                "kill_chain_name": "mitre-attack",
                "phase_name": "reconnaissance"
            }
        ],
    }
    let subtechniqueSDO1 = {
        ...templateSDO,
        "id": "attack-pattern-0-1",
        "x_mitre_platforms": ['Linux', 'macOS', 'Windows'],
        "external_references": [
            {
                "external_id": "T1595.002",
                "url": "https://attack.mitre.org/techniques/T1595/002"
            }
        ],
    }
    let subtechniqueSDO2 = {
        ...templateSDO,
        "id": "attack-pattern-0-2",
        "external_references": [
            {
                "external_id": "T1592.002",
                "url": "https://attack.mitre.org/techniques/T1592/002"
            }
        ],
    }
    let subtechniqueSDO3 = {
        ...templateSDO,
        "id": "attack-pattern-0-3",
        "external_references": [
            {
                "external_id": "T1595.001",
                "url": "https://attack.mitre.org/techniques/T1595/001"
            }
        ],
    }
    let techniqueSDO = {
        ...templateSDO,
        "id": "attack-pattern-0",
        "x_mitre_platforms": ['Linux', 'macOS', 'Windows'],
        "external_references": [
            {
                "external_id": "T1595",
                "url": "https://attack.mitre.org/techniques/T1595"
            }
        ]
    }
    let techniqueSDO2 = {
        ...templateSDO,
        "id": "attack-pattern-1",
        "external_references": [
            {
                "external_id": "T1592",
                "url": "https://attack.mitre.org/techniques/T1592"
            }
        ]
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MatrixCommon]
        });
        matrixCommon = TestBed.inject(MatrixCommon);
    });

    it('should be created', inject([MatrixCommon], (service: MatrixCommon) => {
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        expect(service).toBeTruthy();
    }));

    it('should change tactic row color', inject([MatrixCommon], (service: MatrixCommon) => {
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        service.viewModel.showTacticRowBackground = true;
        service.getTacticBackground();
        service.viewModel.showTacticRowBackground = false;
        service.getTacticBackground();
        expect(service).toBeTruthy();
    }));

    it('should filter techniques and tactics', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        service.viewModel.showTacticRowBackground = true;
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let st2 = new Technique(subtechniqueSDO3,[],null);
        let t1 = new Technique(techniqueSDO,[st1, st2],null);
        technique_list.push(t1);
        let st3 = new Technique(subtechniqueSDO2,[],null);
        let t2 = new Technique(techniqueSDO2,[st3],null);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let stvm_2 = new TechniqueVM("T1595.001^reconnaissance");
        tvm_1.score = '2';
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        let stvm_3 = new TechniqueVM("T1592.002^reconnaissance");
        stvm_3.score = '3';
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(tvm_2);
        service.viewModel.setTechniqueVM(stvm_1);
        service.viewModel.setTechniqueVM(stvm_2);
        service.viewModel.setTechniqueVM(stvm_3);
        service.viewModel.layout.showAggregateScores = true;
        service.viewModel.layout.aggregateFunction = "min";
        service.viewModel.filters.platforms.selection = ["PRE"];
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        expect(service.filterTechniques(technique_list, tactic1)).toEqual([t2]);
        service.viewModel.loaded = true;
        service.filterTactics(tactic_list);
        expect(service.filterTactics(tactic_list)).toEqual(tactic_list);
        service.viewModel.hideDisabled = false;
        expect(service.filterTechniques(technique_list, tactic1)).toEqual([t2]);
        matrixSDO.name = 'PRE-ATT&CK';
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.viewModel.hideDisabled = true;
        expect(service.filterTechniques(technique_list, tactic1)).toEqual(technique_list);
        spyOn(service.viewModel, 'isSubtechniqueEnabled').and.returnValues(false);
        expect(service.filterTechniques(technique_list, tactic1)).toEqual([]);
    }));

    it('should sort techniques and tactics', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        service.viewModel.showTacticRowBackground = true;
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let st2 = new Technique(subtechniqueSDO3,[],null);
        let t1 = new Technique(techniqueSDO,[st1, st2],null);
        technique_list.push(t1);
        let st3 = new Technique(subtechniqueSDO2,[],null);
        let t2 = new Technique(techniqueSDO2,[st3],null);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let stvm_2 = new TechniqueVM("T1595.001^reconnaissance");
        tvm_1.score = '2';
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        let stvm_3 = new TechniqueVM("T1592.002^reconnaissance");
        stvm_3.score = '3';
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(tvm_2);
        service.viewModel.setTechniqueVM(stvm_1);
        service.viewModel.setTechniqueVM(stvm_2);
        service.viewModel.setTechniqueVM(stvm_3);
        service.viewModel.layout.showAggregateScores = true;
        service.viewModel.layout.aggregateFunction = "min";
        service.viewModel.filters.platforms.selection = ["PRE"];
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.applyControls(technique_list,tactic1);
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "max";
        service.applyControls(technique_list,tactic1);
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "sum";
        service.applyControls(technique_list,tactic1);
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.sorting = 1;
        service.viewModel.layout.aggregateFunction = "average";
        service.applyControls(technique_list,tactic1);
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.sorting = 2;
        service.viewModel.layout.aggregateFunction = "min";
        service.applyControls(technique_list,tactic1);
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.sorting = 3;
        service.sortTechniques(technique_list,tactic1);
        expect(service).toBeTruthy();
    }));

    it('should toggle', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        let t2 = new Technique(techniqueSDO2,[],null);
        technique_list.push(t1);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(stvm_1);
        service.viewModel.setTechniqueVM(tvm_2);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onToggleSubtechniquesVisible(t1,tactic1);
        let tvm = service.viewModel.getTechniqueVM(t1, tactic1);
        expect(tvm.showSubtechniques).toEqual(true);
        service.onToggleSubtechniquesVisible(t2,tactic1);
        expect(tvm.showSubtechniques).toEqual(true);
    }));

    it('should highlight and unhighlight technique', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onTechniqueHighlight(null,t1,tactic1);
        expect(service.viewModel.highlightedTactic.name).toEqual("Reconnaissance");
        service.onTechniqueUnhighlight(null);
        expect(service.viewModel.highlightedTactic).toEqual(null);
    }));


    // onTechniqueLeftClick tests
    // ------------------------------------------------------------

    it('should not modify technique selection if selecting_techniques is disabled', () => {
        let technique = new Technique(techniqueSDO, [], null);
        let tactic = new Tactic(tacticSDO, [technique], null);
        matrixCommon.viewModel = new ViewModel("vm", "1", "enterprise-attack-13", null);

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
        let technique = new Technique(techniqueSDO, [], null);
        let tactic = new Tactic(tacticSDO, [technique], null);
        matrixCommon.viewModel = new ViewModel("vm", "1", "enterprise-attack-13", null);

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
        let technique = new Technique(techniqueSDO, [], null);
        let tactic = new Tactic(tacticSDO, [technique], null);
        matrixCommon.viewModel = new ViewModel("vm", "1", "enterprise-attack-13", null);

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

    // ------------------------------------------------------------

    it('should left click on technique', () => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let vm1 = matrixCommon.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let st2 = new Technique(subtechniqueSDO2,[],null);
        let t2 = new Technique(techniqueSDO2,[st2],null);
        technique_list.push(t2);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        let stvm_2 = new TechniqueVM("T1592.002^reconnaissance");
		vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(stvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_2);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        matrixCommon.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        let e1 = new EventEmitter<any>();
        let event = {"shift":true};
        matrixCommon.viewModel = vm1;
        let emitSpy = spyOn(matrixCommon.viewModelsService.onSelectionChange, 'emit');
        matrixCommon.configService.setFeature("selecting_techniques", true);
        matrixCommon.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(1); // T1595
        matrixCommon.onTechniqueLeftClick(event,t1,tactic1); 
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(0);
        matrixCommon.onTechniqueLeftClick(event,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(matrixCommon.viewModel.selectedTechniques.size).toEqual(1); // T1595
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

    it('on tactic click', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let t1 = new Technique(techniqueSDO,[],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        technique_list.push(t2);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(tvm_2);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onTacticClick(tactic1);
        expect(service.viewModel.selectedTechniques.size).toEqual(2); // T1595, T1592
        spyOn(service.viewModel, 'isTacticSelected').and.returnValue(true);
        service.onTacticClick(tactic1);
        expect(service.viewModel.selectedTechniques.size).toEqual(0);
    }));
});
