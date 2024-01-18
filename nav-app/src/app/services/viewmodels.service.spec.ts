import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewModelsService } from './viewmodels.service';
import { TechniqueVM, ViewModel } from '../classes';

describe('ViewmodelsService', () => {
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

    const validRep = '{"comment": "test comment","color": "#ffffff", "score": 1,"enabled": true,"showSubtechniques": false}';
    const techniqueID = 'T0001';
    const tacticName = 'tactic-name';
    const ttid = 'T0001^tactic-name'
    it('should deserialize TechniqueVM correctly with valid input', () => {
        let tvm = new TechniqueVM(ttid);
        let deserializeSpy = spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validRep, techniqueID, tacticName);
        expect(deserializeSpy).toHaveBeenCalledOnceWith(validRep, techniqueID, tacticName);
        expect(tvm.techniqueID).toBe(techniqueID);
        expect(tvm.tactic).toBe(tacticName);
        expect(tvm.comment).toBe("test comment");
        expect(tvm.color).toBe("#ffffff");
        expect(tvm.score).toBe('1');
        expect(tvm.enabled).toBe(true);
        expect(tvm.showSubtechniques).toBe(false);
    });

    it('should handle missing techniqueID field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validRep, undefined, tacticName);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle missing tactic field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(window, 'alert');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validRep, techniqueID, undefined);
        expect(console.error).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalled();
    });

    it('should handle missing techniqueID and tactic field', () => {
        let tvm = new TechniqueVM(ttid);
        tvm.techniqueID = undefined;
        tvm.tactic = undefined;
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validRep, undefined, undefined);
        expect(console.error).toHaveBeenCalledTimes(3);
    });

    it('should handle non-string comment field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": 10,"color": "#ffffff", "score": 1,"enabled": true,"showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.comment).toBe('');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-string color field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": 10, "score": 1,"enabled": true,"showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.color).toBe('');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-number score field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": "#ffffff", "score": "1","enabled": true,"showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.score).toBe('');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean enabled field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": "#ffffff", "score": 1,"enabled": "true","showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.enabled).toBe(true);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean showSubtechniques field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": "#ffffff", "score": 1,"enabled": true,"showSubtechniques": "false"}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.showSubtechniques).toBe(false);
        expect(console.error).toHaveBeenCalled();
    });
});
