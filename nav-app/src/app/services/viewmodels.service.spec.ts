import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewModelsService } from './viewmodels.service';
import { TechniqueVM, Metadata, ViewModel, Link, VersionChangelog } from '../classes';
import { Technique, Tactic, Matrix } from '../classes/stix';
import tinygradient from 'tinygradient';

describe('ViewmodelsService', () => {
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
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [ViewModelsService],
        });
    });

	it('should be created', inject([ViewModelsService], (service: ViewModelsService) => {
		expect(service).toBeTruthy();
	}));

	it('should create viewmodel by inheriting the score from other view models', inject([ViewModelsService], (service: ViewModelsService) => {
		service.selectionChanged();
		let vm1 = service.newViewModel("layer","enterprise-attack-13");
		let vm2 = service.newViewModel("layer1","enterprise-attack-13");
		let scoreVariables = new Map<string, ViewModel>();
        scoreVariables.set("a",vm1);
		scoreVariables.set("b",vm2);
		let tvm_1 = new TechniqueVM("T1583");
		tvm_1.score = "2";
		vm1.setTechniqueVM(tvm_1);
		let tvm_2 = new TechniqueVM("T1584");
		tvm_2.score = "1";
		vm2.setTechniqueVM(tvm_2);
		let tvm_3 = new TechniqueVM("T1583");
		tvm_3.score = "1";
		vm2.setTechniqueVM(tvm_3);
		let opSettings: any = {
			domain: "Enterprise ATT&CK v13",
			gradientVM: vm1,
			coloringVM: vm1,
			commentVM: vm1,
			linkVM: vm1,
			metadataVM: vm1,
			enabledVM: vm1,
			filterVM: vm1,
			scoreExpression: "a+b",
			legendVM: vm1
		}
		let vm_new = service.layerOperation(scoreVariables, "test1", opSettings);
		let tvm_new = vm_new.getTechniqueVM_id("T1583");
		expect(tvm_new.score).toBe("3");
	}));

	it('should create viewmodel by inheriting the comments from other view models', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm1 = service.newViewModel("layer","enterprise-attack-13");
		let vm2 = service.newViewModel("layer1","enterprise-attack-13");
		let scoreVariables = new Map<string, ViewModel>();
        scoreVariables.set("a",vm1);
		scoreVariables.set("b",vm2);
		let tvm_1 = new TechniqueVM("T1583");
		tvm_1.comment = "completed";
		vm1.setTechniqueVM(tvm_1);
		let opSettings: any = {
			domain: "Enterprise ATT&CK v13",
			gradientVM: vm1,
			coloringVM: vm1,
			commentVM: vm1,
			linkVM: vm1,
			metadataVM: vm1,
			enabledVM: vm1,
			filterVM: vm1,
			scoreExpression: "1+3",
			legendVM: vm1
		}
		let vm_new = service.layerOperation(scoreVariables, "test1", opSettings);
		let tvm_new = vm_new.getTechniqueVM_id("T1583");
		expect(tvm_new.comment).toBe("completed");
	}));

	it('viewmodel by inheriting opsettings and setting the score to 1 for all', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm1 = service.newViewModel("layer","enterprise-attack-13");
		let scoreVariables = new Map<string, ViewModel>();
        scoreVariables.set("a",vm1);
		let tvm = new TechniqueVM("T1583");
		tvm.score = "2";
		vm1.setTechniqueVM(tvm);
		let opSettings: any = {
			domain: "Enterprise ATT&CK v13",
			gradientVM: vm1,
			coloringVM: vm1,
			commentVM: vm1,
			linkVM: vm1,
			metadataVM: vm1,
			enabledVM: vm1,
			filterVM: vm1,
			scoreExpression: "true",
			legendVM: vm1
		}
		let vm = service.layerOperation(scoreVariables, "test1", opSettings);
		expect(vm.domainVersionID).toBe("Enterprise ATT&CK v13");
	}));

	it('should create viewmodel when score expression is a+b', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm1 = service.newViewModel("layer","enterprise-attack-13");
		let vm2 = service.newViewModel("layer1","enterprise-attack-13");
		let scoreVariables = new Map<string, ViewModel>();
        scoreVariables.set("a",vm1);
		scoreVariables.set("b",vm2);
		let tvm_1 = new TechniqueVM("T1583");
		tvm_1.comment = "completed";
		vm1.setTechniqueVM(tvm_1);
		let opSettings: any = {
			domain: "Enterprise ATT&CK v13",
			gradientVM: vm1,
			coloringVM: vm1,
			commentVM: vm1,
			linkVM: vm1,
			metadataVM: vm1,
			enabledVM: vm1,
			filterVM: vm1,
			scoreExpression: "a+b",
			legendVM: vm1
		}
		let vm_new = service.layerOperation(scoreVariables, "test1", opSettings);
		let tvm_new = vm_new.getTechniqueVM_id("T1583");
		expect(tvm_new.comment).toBe("completed");
	}));

	it('viewmodel is created', inject([ViewModelsService], (service: ViewModelsService) => {
		service.newViewModel("test","test");
		expect(service.viewModels.length).toBe(1);
	}));

	it('viewmodel is destroyed', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm = service.newViewModel("test","test");
		service.destroyViewModel(vm);
		expect(service.viewModels.length).toBe(0);
	}));

	it('should select and unselect technique across tactics', inject([ViewModelsService], (service: ViewModelsService) => {
        let technique_list: Technique[] = [];
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
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
        vm1.selectTechniquesAcrossTactics = false;
        vm1.selectSubtechniquesWithParent = true;
        vm1.selectTechnique(t2,tactic1);
        expect(vm1.selectedTechniques.size).toEqual(1); // T1592
        vm1.selectTechnique(st1,tactic1);
        expect(vm1.selectedTechniques.size).toEqual(3); // T1592, T1595, T1595.002
        vm1.unselectTechnique(t2,tactic1);
        expect(vm1.selectedTechniques.size).toEqual(2); // T1595, T1595.002
        vm1.unselectTechnique(st1,tactic1);
        expect(vm1.selectedTechniques.size).toEqual(0);
        vm1.selectTechniqueAcrossTactics(t2, true, true);
        expect(vm1.highlightedTechniques.size).toEqual(1);
        vm1.selectTechniqueAcrossTactics(st1);
        expect(vm1.selectedTechniques.size).toEqual(2); // T1595, T1595.002
        vm1.selectTechniqueAcrossTactics(st1, true, true);
        vm1.unselectTechniqueAcrossTactics(st1);
        expect(vm1.selectedTechniques.size).toEqual(0);
    }));

	it('should edit and reset techniques', inject([ViewModelsService], (service: ViewModelsService) => {
        let technique_list: Technique[] = [];
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
		stvm_1.score = '3';
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        tvm_2.score = '3';
        tvm_2.comment = 'test1';
        technique_list.push(t2);
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        vm1.selectAllTechniques(); // select all techniques
        vm1.selectSubtechniquesWithParent = true;
        expect(vm1.isTechniqueSelected(t1, tactic1)).toEqual(true);
        expect(vm1.isTechniqueSelected(st1, tactic1)).toEqual(true);
        vm1.selectTechniquesAcrossTactics = false;
        expect(vm1.isTechniqueSelected(t1, tactic1)).toEqual(true);
        expect(vm1.isTechniqueSelected(st1, tactic1)).toEqual(true);
        vm1.selectUnannotated(); // none
        vm1.editSelectedTechniques('score', '3');
        expect(vm1.getTechniqueVM_id('T1592^reconnaissance')['score']).toEqual('3');
        vm1.selectAnnotated(); // T1592, T1595, T1595.002
        vm1.resetSelectedTechniques(); // Unannotate the selected techniques
        expect(vm1.getTechniqueVM_id('T1592^reconnaissance')['score']).toEqual('');
        vm1.selectAllTechniques(); // T1592, T1595, T1595.002
        let m2 = new Metadata();
        m2.name = "test1";
        m2.value = "t1";
        vm1.editSelectedTechniqueValues("metadata",[m2]); // change metadata value for all selected techniques
        expect(tvm_1.metadata).toEqual([m2]);
        vm1.editSelectedTechniques("score", '8');
        expect(tvm_1.score).toEqual('8');
    }));

	it('should get common value from selected techniques', inject([ViewModelsService], (service: ViewModelsService) => {
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        tvm_1.score = '3';
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        tvm_2.score = '3';
        tvm_2.comment = 'test1';
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.selectAllTechniques();
        expect(vm1.getEditingCommonValue("score")).toEqual('3'); // common score value of 3
        expect(vm1.getEditingCommonValue("comment")).toEqual(''); // no common value for comment
    }));

	it('should select annotated techniques and unannotated techniques', inject([ViewModelsService], (service: ViewModelsService) => {
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        vm1.selectAnnotated();
        expect(vm1.selectedTechniques.size).toEqual(1); // T1595
        vm1.selectAllTechniques();
        vm1.selectAnnotated();
        expect(vm1.selectedTechniques.size).toEqual(1);
        vm1.selectUnannotated();
        expect(vm1.selectedTechniques.size).toEqual(0); // since currently editing, no unannotated techniques are  selected
        vm1.selectUnannotated();
        expect(vm1.selectedTechniques.size).toEqual(2); // T1595.002, T1592
    }));

	it('should check if subtechnique is enabled', inject([ViewModelsService], (service: ViewModelsService) => {
        let technique_list: Technique[] = [];
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
        let st1 = new Technique(subtechniqueSDO1,[],null);
        let t1 = new Technique(techniqueSDO,[st1],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let t2 = new Technique(techniqueSDO2,[],null);
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        technique_list.push(t2);
        tvm_1.score = "3";
        expect(vm1.linksMatch).toEqual(true);
        expect(vm1.metadataMatch).toEqual(true);;
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        expect(vm1.isSubtechniqueEnabled(t1,tvm_1,tactic1)).toEqual(true); // techniqueVM enabled by default so function returns true
        tvm_1.enabled = false;
        vm1.filters.platforms.selection = ['Linux', 'macOS', 'Windows'];
        expect(vm1.isSubtechniqueEnabled(t1,tvm_1,tactic1)).toEqual(true); // subtechniqueVM enabled by default so function returns true
        tvm_2.enabled = false;
        expect(vm1.isSubtechniqueEnabled(t2,tvm_2,tactic1)).toEqual(false); // returns false because enabled property set to false
    }));

	it('should get a list of annotated hidden techniques and visibile techniques', inject([ViewModelsService], (service: ViewModelsService) => {
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        tvm_1.score = "3";
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        tvm_1.showSubtechniques = false;
        expect(tvm_1.modified()).toEqual(true); // returns true since techniqueVM is annotated
        tvm_1.isVisible = false;
        expect(vm1.modifiedHiddenTechniques()).toEqual(1);
        tvm_1.isVisible = true;
        expect(vm1.getVisibleTechniquesList()).toEqual(['T1595^reconnaissance', 'T1592^reconnaissance', 'T1595.002^reconnaissance']);
    }));

	it('should test legends', inject([ViewModelsService], (service: ViewModelsService) => {
        let vm1 = service.newViewModel("test1","enterprise-attack-13");
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
        let tvm_2 = new TechniqueVM("T1592^reconnaissance");
        tvm_1.score = "3";
        vm1.sidebarOpened;
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        vm1.addLegendItem();
        expect(vm1.legendItems.length).toEqual(1);
        vm1.deleteLegendItem(0);
        vm1.clearLegend();
        expect(vm1.legendItems.length).toEqual(0);
    }));

	it('should test gradient colors', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm1 = service.newViewModel("test1","enterprise-attack-13");
		let tvm_1 = new TechniqueVM("T1595^reconnaissance");
		tvm_1.score = "3";
		let stvm_1 = new TechniqueVM("T1595.002^reconnaissance");
		let tvm_2 = new TechniqueVM("T1592^reconnaissance");
		vm1.setTechniqueVM(tvm_1);
		vm1.setTechniqueVM(tvm_2);
		vm1.setTechniqueVM(stvm_1);
		vm1.updateScoreColor(tvm_1);
		expect(tvm_1.scoreColor).toEqual('#ff6e66');
		vm1.removeGradientColor(0);
		vm1.addGradientColor();
		let colorarray = ['#66b1ff', '#ff66f4', '#ff6666'];
        expect(vm1.gradient.presetToTinyColor("bluered")).toEqual(tinygradient(colorarray).css('linear', 'to right'));
        expect(vm1.gradient.getHexColor("7")).toEqual("#efe361");
        expect(vm1.gradient.getHexColor("200")).toEqual("#8ec843");
        vm1.gradient.gradient = false;
        vm1.gradient.getHexColor("200");
		expect(vm1.gradient.colors.length).toEqual(3);
	}));

	it('should serialize techniqueVMs', inject([ViewModelsService], (service: ViewModelsService) => {
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
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
        let l2 = new Link();
        l2.divider = true;
        tvm_1.links.push(l2);
        tvm_1.serialize();
		expect(service).toBeTruthy();
    }));

    it('should copy annotations from one technique VM to another', inject([ViewModelsService], (service: ViewModelsService) => {
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
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        let to_vm = service.newViewModel("test1","enterprise-attack-13");
        to_vm.dataService.setUpURLs(versions);
        let matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,to_vm.dataService);
        to_vm.dataService.domains[0].matrices = [matrix];
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
        to_vm.versionChangelog = new VersionChangelog('enterprise-attack-12','enterprise-attack-13');
        expect(to_vm.versionChangelog.length()).toEqual(0);
        to_vm.versionChangelog.minor_changes = ['T1595'];
        to_vm.versionChangelog.unchanged = ['T1592'];
        let from_vm = service.newViewModel("test2","enterprise-attack-12");
        let from_tvm_1 = new TechniqueVM("T1592^reconnaissance");
        from_tvm_1.score = '2';
        from_tvm_1.comment = "test";
        from_vm.setTechniqueVM(to_tvm_1);
        from_vm.setTechniqueVM(from_tvm_1);
        from_vm.dataService.domains[1].techniques.push(t1);
        from_vm.dataService.domains[1].techniques.push(t2);
        to_vm.compareTo = from_vm;
        to_vm.initCopyAnnotations();
        expect(to_vm.getTechniqueVM(t2, tactic1).score).toEqual('2');
        to_vm.revertCopy(t1,t2,tactic1);
        expect(to_vm.getTechniqueVM(t2, tactic1).score).toEqual('');
    }));
});
