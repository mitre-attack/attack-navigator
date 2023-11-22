import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixCommon } from './matrix-common';
import { TechniqueVM, ViewModel } from '../classes';
import { Matrix, Technique, Tactic } from '../classes/stix';
import { EventEmitter } from '@angular/core';

describe('MatrixCommon', () => {
    let service: MatrixCommon;
    let technique_list: Technique[] = [];
    let tactic_list: Tactic[] = [];
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
    let techniqueSDO = {
        ...templateSDO,
        "id": "attack-pattern-0",
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
    // let stixSDO1 = {
    //     "name": "Boo",
    //     "description": "Description",
    //     "created": "2001-01-01T01:01:00.000Z",
    //     "modified": "2001-01-01T01:01:00.000Z",
    //     "x_mitre_version": "1.0",
    // }
    // let templateSDO1 = {
    //     ...stixSDO1,
    //     "type": "attack-pattern",
    //     "x_mitre_platforms": ['PRE'],
    //     "kill_chain_phases": [{
    //         "kill_chain_name": "mitre-attack",
    //         "phase_name": "persistence"
    //     }],
    // }
    // let tacticSDO1 = {
    //     "id": "tactic-1",
    //     ...stixSDO1,
    //     "name": "Persistence",
    //     "type": "x-mitre-tactic",
    //     "x_mitre_shortname": "persistence",
    //     "external_references": [{"external_id": "TA0003", "url": "https://attack.mitre.org/tactics/TA0003"}]
    // }
    // let matrixSDO1 = {
    //     "external_references": [{
    //         "external_id": "enterprise-attack",
    //         "source_name": "mitre-attack",
    //         "url": "https://attack.mitre.org/matrices/enterprise"
    //     }],
    //     "id": "x-mitre-matrix--eafc1b4c-5e56-4965-bd4e-66a6a89c88cc",
    //     "name":"Enterprise ATT&CK",
    //     "tactic_refs": ["tactic-1"]
    // }
    // let subtechniqueSDO3 = {
    //     ...templateSDO1,
    //     "id": "attack-pattern-0-3",
    //     "external_references": [{
    //         "external_id": "T1098.001",
    //         "url": "https://attack.mitre.org/techniques/T1098/001"
    //     }],
    // }
    // let subtechniqueSDO4 = {
    //     ...templateSDO,
    //     "id": "attack-pattern-0-4",
    //     "external_references": [{
    //         "external_id": "T1547.002",
    //         "url": "https://attack.mitre.org/techniques/T1547/002"
    //     }],
    // }
    // let techniqueSDO3 = {
    //     ...templateSDO1,
    //     "id": "attack-pattern-0",
    //     "external_references": [{
    //         "external_id": "T1098",
    //         "url": "https://attack.mitre.org/techniques/T1098"
    //     }]
    // }
    // let techniqueSDO4 = {
    //     ...templateSDO1,
    //     "id": "attack-pattern-1",
    //     "external_references": [{
    //         "external_id": "T1547",
    //         "url": "https://attack.mitre.org/techniques/T1547"
    //     }]
    // }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MatrixCommon]
        });
        service = TestBed.inject(MatrixCommon);
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
    });

    it('should be created', inject([MatrixCommon], (service: MatrixCommon) => {
        expect(service).toBeTruthy();
    }));

    it('should change tactic row color', inject([MatrixCommon], (service: MatrixCommon) => {
        service.viewModel.showTacticRowBackground = true;
        service.tacticRowStyle;
        var mockedDocElement = document.createElement('input');
        mockedDocElement.id = '.tactic.name';
        //document.querySelectorAll = jasmine.createSpy('.tactic.name').and.returnValue([mockedDocElement])
        //service.viewModel.showTacticRowBackground = true;
        //service.tacticRowStyle;
        expect(service).toBeTruthy();
    }));

    // it('should filter tactics', inject([MatrixCommon], (service: MatrixCommon) => {
    //     let idToTacticSDO = new Map<string, any>();
    //     idToTacticSDO.set("tactic-1", tacticSDO1);
    //     service.viewModel.showTacticRowBackground = true;
    //     service.tacticRowStyle;
    //     //let st1 = new Technique(subtechniqueSDO1,[],null);
    //     let t1 = new Technique(techniqueSDO3,[],null);
    //     tech.push(t1);
    //     //let st2 = new Technique(subtechniqueSDO2,[],null);
    //     let t2 = new Technique(techniqueSDO4,[],null);
    //     tech.push(t2);
    //     let tvm_1 = new TechniqueVM("T1098^persistence");
    //     //let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
    //     tvm_1.score = '2';
	// 	service.viewModel.setTechniqueVM(tvm_1);
    //     let tvm_2 = new TechniqueVM("T1547^persistence");
    //     //let stvm_2 = new TechniqueVM("T1592.002^reconnaissance");
    //     //stvm_2.score = '3';
	// 	service.viewModel.setTechniqueVM(tvm_1);
    //     service.viewModel.setTechniqueVM(tvm_2);
    //     //service.viewModel.setTechniqueVM(stvm_1);
    //     //service.viewModel.setTechniqueVM(stvm_2);
    //     service.viewModel.layout.showAggregateScores = true;
    //     //service.viewModel.layout.aggregateFunction = "min";
    //     service.viewModel.filters.platforms.selection = ["PRE"];
    //     let tactic1 = new Tactic(tacticSDO1,tech,null);
    //     tac.push(tactic1);
    //     service.matrix = new Matrix(matrixSDO1, idToTacticSDO,tech,null);
    //     service.filterTactics(tac);
    //     service.sortTechniques(tech,tactic1);
    //     service.applyControls(tech,tactic1);
    //     service.viewModel.calculateAggregateScore(t1,tactic1);
    //     expect(service.filterTechniques(tech, tactic1)).toEqual(tech);
    // }));

    it('should aggregate function', inject([MatrixCommon], (service: MatrixCommon) => {
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        service.viewModel.showTacticRowBackground = true;
        service.tacticRowStyle;
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let st2 = new Technique(subtechniqueSDO2,[],null);
        let t2 = new Technique(techniqueSDO2,[st2],null);
        technique_list.push(t2);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        tvm_1.score = '2';
		service.viewModel.setTechniqueVM(tvm_1);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        let stvm_2 = new TechniqueVM("T1592.002^reconnaissance");
        stvm_2.score = '3';
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(tvm_2);
        service.viewModel.setTechniqueVM(stvm_1);
        service.viewModel.setTechniqueVM(stvm_2);
        service.viewModel.layout.showAggregateScores = true;
        service.viewModel.layout.aggregateFunction = "min";
        service.viewModel.filters.platforms.selection = ["PRE"];
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.applyControls(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "max";
        service.applyControls(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "sum";
        service.applyControls(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "average";
        service.applyControls(technique_list,tactic1);
        service.filterTactics(tactic_list);
        service.sortTechniques(technique_list,tactic1);
        expect(service.filterTechniques(technique_list, tactic1)).toEqual(technique_list);
    }));

    it('should toggle', inject([MatrixCommon], (service: MatrixCommon) => {
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
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onToggleSubtechniquesVisible(t1,tactic1);
        let tvm = service.viewModel.getTechniqueVM(t1, tactic1);
        expect(tvm.showSubtechniques).toEqual(true);
    }));

    it('should highlight and unhighlight', inject([MatrixCommon], (service: MatrixCommon) => {
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
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onTechniqueHighlight(null,t1,tactic1);
        expect(service.viewModel.highlightedTactic.name).toEqual("Reconnaissance");
        service.onTechniqueUnhighlight(null);
        expect(service.viewModel.highlightedTactic).toEqual(null);
    }));

    // it('should tactic click', inject([MatrixCommon], (service: MatrixCommon) => {
    //     let idToTacticSDO = new Map<string, any>();
    //     idToTacticSDO.set("tactic-0", tacticSDO);
    //     let t1 = new Technique(techniqueSDO,[],null);
    //     tech.push(t1);
    //     let tvm_1 = new TechniqueVM("T1595^reconnaissance");
	// 	service.viewModel.setTechniqueVM(tvm_1);
    //     let tactic1 = new Tactic(tacticSDO,tech,null);
    //     tac.push(tactic1);
    //     service.matrix = new Matrix(matrixSDO, idToTacticSDO,tech,null);
    //     service.onTacticClick(tactic1);
    //     service.onTechniqueHighlight(null,t1,tactic1);
    //     expect(service.viewModel.highlightedTactic.name).toEqual("Reconnaissance");
    //     // service.onTechniqueUnhighlight(null);
    //     // expect(service.viewModel.highlightedTactic).toEqual(null);
    // }));

    it('should left click on technique', inject([MatrixCommon], (service: MatrixCommon) => {
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
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        let e1 = new EventEmitter<any>();
        let ff = {"shift":true};
        service.configService.setFeature("selecting_techniques", true)
        service.onTechniqueLeftClick(e1,t1,tactic1);
        service.onTechniqueLeftClick(ff,t1,tactic1);
        expect(service).toBeTruthy();
    }));

    // it('should left click on technique', inject([MatrixCommon], (service: MatrixCommon) => {
    //     let idToTacticSDO = new Map<string, any>();
    //     idToTacticSDO.set("tactic-0", tacticSDO);
    //     let st1 = new Technique(subtechniqueSDO1,[],null);
    //     let t1 = new Technique(techniqueSDO,[st1],null);
    //     technique_list.push(t1);
    //     let tvm_1 = new TechniqueVM("T1595^reconnaissance");
    //     let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
    //     let tt: Link[] = [];
    //     tvm_1.links = tt;
    //     tvm_1.linkStr;
	// 	service.viewModel.setTechniqueVM(tvm_1);
    //     service.viewModel.setTechniqueVM(stvm_1);
    //     service.viewModel.activeTvm = service.viewModel.getTechniqueVM_id("T1595^reconnaissance")
    //     let tactic1 = new Tactic(tacticSDO,technique_list,null);
    //     tactic_list.push(tactic1);
    //     service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
    //     let e1 = new EventEmitter<any>();
    //     let ff = {"shift":true};
    //     service.configService.setFeature("selecting_techniques", true)
    //     service.onTechniqueLeftClick(e1,t1,tactic1);
    //     service.onTechniqueLeftClick(ff,t1,tactic1);
    //     spyOn(service.viewModel, 'isTechniqueSelected').and.returnValue(false);
    //     service.onTechniqueLeftClick(ff,t1,tactic1);
    //     expect(service).toBeTruthy();
    // }));

    it('should change tactic row color', inject([MatrixCommon], (service: MatrixCommon) => {
        service.viewModel.showTacticRowBackground = true;
        service.tacticRowStyle;
        expect(service).toBeTruthy();
    }));
});


// it('should left click technique', inject([MatrixCommon], (service: MatrixCommon) => {
//     let idToTacticSDO = new Map<string, any>();
//     idToTacticSDO.set("tactic-0", tacticSDO);
//     let st1 = new Technique(subtechniqueSDO1,[],null);
//     let t1 = new Technique(techniqueSDO,[st1],null);
//     tech.push(t1);
//     let tvm_1 = new TechniqueVM("T1595^reconnaissance");
//     let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
//     let tt: Link[] = [];
//     tvm_1.links = tt;
//     tvm_1.linkStr;
//     service.viewModel.setTechniqueVM(tvm_1);
//     service.viewModel.setTechniqueVM(stvm_1);
//     service.viewModel.activeTvm = service.viewModel.getTechniqueVM_id("T1595^reconnaissance")
//     let tactic1 = new Tactic(tacticSDO,tech,null);
//     tac.push(tactic1);
//     service.matrix = new Matrix(matrixSDO, idToTacticSDO,tech,null);
//     let e1 = new EventEmitter<any>();
//     let ff = {"shift":true};
//     spyOn(service.viewModel, 'getSelectedTechniqueCount').and.returnValue(2);
//     service.onTechniqueLeftClick(e1,t1,tactic1);
//     expect(service).toBeTruthy();
// }));