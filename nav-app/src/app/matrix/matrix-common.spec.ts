import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixCommon } from './matrix-common';
import { TechniqueVM, ViewModel } from '../classes';
import { Matrix, Technique, Tactic } from '../classes/stix';
import { EventEmitter } from '@angular/core';

describe('MatrixCommon', () => {
    let service: MatrixCommon;
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
        service = TestBed.inject(MatrixCommon);
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

    it('should left click on technique', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
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
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        let e1 = new EventEmitter<any>();
        let event = {"shift":true};
        service.viewModel = vm1;
        let emitSpy = spyOn(service.viewModelsService.onSelectionChange, 'emit');
        service.configService.setFeature("selecting_techniques", true);
        service.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(service.viewModel.selectedTechniques.size).toEqual(1); // T1595
        service.onTechniqueLeftClick(event,t1,tactic1); 
        expect(emitSpy).toHaveBeenCalled();
        expect(service.viewModel.selectedTechniques.size).toEqual(0);
        service.onTechniqueLeftClick(event,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(service.viewModel.selectedTechniques.size).toEqual(1); // T1595
        service.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        expect(service.viewModel.selectedTechniques.size).toEqual(0);
        spyOn(service.viewModel, 'isTechniqueSelected').and.returnValues(false);
        spyOn(service.viewModel, 'getSelectedTechniqueCount').and.returnValue(2);
        vm1.activeTvm = tvm_2;
        service.viewModel = vm1;
        service.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
    }));

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
