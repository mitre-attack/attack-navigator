import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixCommon } from './matrix-common';
import { Link, Metadata, TechniqueVM, VersionChangelog, ViewModel } from '../classes';
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
        service.applyControls(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "max";
        service.applyControls(technique_list,tactic1);
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "sum";
        service.applyControls(technique_list,tactic1);
        service.viewModel.sorting = 1;
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "average";
        service.applyControls(technique_list,tactic1);
        service.viewModel.sorting = 2;
        service.sortTechniques(technique_list,tactic1);
        service.viewModel.layout.aggregateFunction = "min";
        service.applyControls(technique_list,tactic1);
        service.viewModel.sorting = 3;
        service.sortTechniques(technique_list,tactic1);
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

    it('should toggle', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
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
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onToggleSubtechniquesVisible(t1,tactic1);
        let tvm = service.viewModel.getTechniqueVM(t1, tactic1);
        expect(tvm.showSubtechniques).toEqual(true);
    }));

    it('should highlight and unhighlight', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
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
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.onTechniqueHighlight(null,t1,tactic1);
        expect(service.viewModel.highlightedTactic.name).toEqual("Reconnaissance");
        service.onTechniqueUnhighlight(null);
        expect(service.viewModel.highlightedTactic).toEqual(null);
    }));

    it('should left click on technique', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
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
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        let e1 = new EventEmitter<any>();
        let event = {"shift":true};
        service.viewModel = vm1;
        let emitSpy = spyOn(service.viewModelsService.onSelectionChange, 'emit');
        service.configService.setFeature("selecting_techniques", true);
        service.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        service.onTechniqueLeftClick(event,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        spyOn(service.viewModel, 'isTechniqueSelected').and.returnValues(false, true, false);
        service.onTechniqueLeftClick(event,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        service.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
        spyOn(service.viewModel, 'getSelectedTechniqueCount').and.returnValue(2);
        vm1.activeTvm = tvm_2;
        service.viewModel = vm1;
        service.onTechniqueLeftClick(e1,t1,tactic1);
        expect(emitSpy).toHaveBeenCalled();
    }));

    it('on tactic click', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
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
		service.viewModel.setTechniqueVM(tvm_1);
        service.viewModel.setTechniqueVM(stvm_1);
        service.viewModel.setTechniqueVM(tvm_2);
        service.viewModel.setTechniqueVM(stvm_2);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        service.configService.setFeature("selecting_techniques", true)
        service.onTacticClick(tactic1);
        expect(service.viewModel.selectedTechniques.size).toEqual(2);
        spyOn(service.viewModel, 'isTacticSelected').and.returnValue(true);
        service.onTacticClick(tactic1);
        expect(service.viewModel.selectedTechniques.size).toEqual(0);
    }));

    it('should change tactic row color', inject([MatrixCommon], (service: MatrixCommon) => {
        service.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        service.viewModel.showTacticRowBackground = true;
        expect(service).toBeTruthy();
    }));

    it('should test techniqueVMs', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        if (!tvm_1.modified()){
            tvm_1.metadata.length = 2;
            tvm_1.modified();
            tvm_1.resetAnnotations();
        }
        tvm_1.score = "3";
        let m1 = new Metadata();
        m1.name = "test1";
        m1.value = "t1";
        tvm_1.metadata.push(m1);
        let m2 = new Metadata();
        m2.divider = true;
        tvm_1.metadata.push(m2);
        let l1 = new Link();
        l1.label = "test1";
        l1.url = "t1";
        tvm_1.links.push(l1);
        tvm_1.serialize();
        vm1.layout.layout = "mini";
        vm1.layout.layout;
        vm1.layout.showName;
        vm1.layout.serialize();
		vm1.setTechniqueVM(tvm_1);
        vm1.updateScoreColor(tvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        vm1.removeGradientColor(0);
        vm1.addGradientColor();
        expect(vm1.gradient.colors.length).toEqual(3);
        vm1.addLegendItem();
        vm1.deleteLegendItem(0);
        vm1.clearLegend();
        expect(tactic_list.length).toEqual(1);
    }));

    it('should test gradient colors', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        tvm_1.score = "3";
        vm1.linksMatch;
        vm1.metadataMatch;
        vm1.sidebarOpened;
		vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        vm1.updateScoreColor(tvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        vm1.removeGradientColor(0);
        vm1.addGradientColor();
        expect(vm1.gradient.colors.length).toEqual(3);
    }));

    it('should test legends', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        tvm_1.score = "3";
        vm1.linksMatch;
        vm1.metadataMatch;
        vm1.sidebarOpened;
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        vm1.addLegendItem();
        expect(vm1.legendItems.length).toEqual(1);
        vm1.deleteLegendItem(0);
        vm1.clearLegend();
        expect(vm1.legendItems.length).toEqual(0);
    }));

    it('should get a list of annotated hidden techniques and visibile techniques', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        tvm_1.score = "3";
        vm1.linksMatch;
        vm1.metadataMatch;
        vm1.sidebarOpened;
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        tvm_1.showSubtechniques = false;
        tvm_1.modified();
        tvm_1.isVisible = false;
        expect(vm1.modifiedHiddenTechniques()).toEqual(1);
        tvm_1.isVisible = true;
        expect(vm1.getVisibleTechniquesList()).toEqual(['T1595^reconnaissance', 'T1592^reconnaissance', 'T1595.002^reconnaissance']);
    }));

    it('should check if subtechnique is enabled', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        tvm_1.score = "3";
        vm1.linksMatch;
        vm1.metadataMatch;
        vm1.sidebarOpened;
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        expect(vm1.isSubtechniqueEnabled(t1,tvm_1,tactic1)).toEqual(true);
        tvm_1.enabled = false;
        vm1.filters.platforms.selection = ['Linux', 'macOS', 'Windows'];
        expect(vm1.isSubtechniqueEnabled(t1,tvm_1,tactic1)).toEqual(true);
        tvm_2.enabled = false;
        expect(vm1.isSubtechniqueEnabled(t2,tvm_2,tactic1)).toEqual(false);
    }));

    it('should select all techniques', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        tvm_1.isVisible = true;
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        vm1.selectAllTechniques();
        expect(vm1.selectedTechniques.size).toEqual(3);
    }));

    it('should select annotated techniques and unannotated techniques', inject([MatrixCommon], (service: MatrixCommon) => {
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let vm1 = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        vm1.selectAnnotated();
        expect(vm1.selectedTechniques.size).toEqual(1);
        vm1.selectAllTechniques();
        vm1.selectAnnotated();
        expect(vm1.selectedTechniques.size).toEqual(1);
        vm1.selectUnannotated();
        expect(vm1.selectedTechniques.size).toEqual(0);
        vm1.selectUnannotated();
        expect(vm1.selectedTechniques.size).toEqual(2);
    }));

    it('should copy annotations from one technique VM to another', inject([MatrixCommon], (service: MatrixCommon) => {
        let versions = [
            {
                "name": "ATT&CK v13",
                "version": "13",
                "domains": [
                    {
                        "name": "Enterprise",
                        "identifier": "enterprise-attack",
                        "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
                    }
                ]
            },
            {
                "name": "ATT&CK v12",
                "version": "12",
                "domains": [
                    {
                        "name": "Enterprise",
                        "identifier": "enterprise-attack",
                        "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v12.1/enterprise-attack/enterprise-attack.json"]
                    }
                ]
            }
        ]
        let technique_list: Technique[] = [];
        let tactic_list: Tactic[] = [];
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let to_vm = service.viewModelsService.newViewModel("test1","enterprise-attack-13");
        to_vm.dataService.setUpURLs(versions);
        service.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,to_vm.dataService);
        to_vm.dataService.domains[0].matrices = [service.matrix];
        let t1 = new Technique(techniqueSDO,[],null);
        technique_list.push(t1);
        let to_tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let to_tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        to_vm.setTechniqueVM(to_tvm_1);
        to_vm.setTechniqueVM(to_tvm_2);
        to_vm.dataService.domains[0].techniques.push(t1);
        to_vm.dataService.domains[0].techniques.push(t2);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        to_vm.versionChangelog = new VersionChangelog('enterprise-attack-12','enterprise-attack-13');
        to_vm.versionChangelog.minor_changes = ['T1595'];
        to_vm.versionChangelog.unchanged = ['T1592'];
        let from_vm = service.viewModelsService.newViewModel("test2","enterprise-attack-12");
        let from_tvm_1 = new TechniqueVM("T1592^reconnaissance");
        from_tvm_1.score = '2';
        from_tvm_1.comment = "hi";
        from_vm.setTechniqueVM(to_tvm_1);
        from_vm.setTechniqueVM(from_tvm_1);
        from_vm.dataService.domains[1].techniques.push(t1);
        from_vm.dataService.domains[1].techniques.push(t2);
        to_vm.compareTo = from_vm;
        to_vm.initCopyAnnotations();
        expect(to_vm.getTechniqueVM(t2, tactic1).score).toEqual('2');
    }));
});
