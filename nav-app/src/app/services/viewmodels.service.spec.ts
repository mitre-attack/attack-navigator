import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewModelsService } from './viewmodels.service';

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

	it('selectionChanged should be defined', inject([ViewModelsService], (service: ViewModelsService) => {
		expect(service.selectionChanged).toBeDefined();
	}));

	it('viewmodel by inheriting opsettings created', inject([ViewModelsService], (service: ViewModelsService) => {
		let opSettings: any = {
			domain: "Enterprise v13",
			gradientVM: null,
			coloringVM: null,
			commentVM: null,
			linkVM: null,
			metadataVM: null,
			enabledVM: null,
			filterVM: null,
			scoreExpression: "",
			legendVM: null
		}
		let vm = service.layerOperation(null, "test1", opSettings);
		expect(vm.domainVersionID).toBe("Enterprise v13");
	}));

	it('viewmodel is created', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm = service.newViewModel("test","test");
		expect(service.viewModels.length).toBe(1);
	}));

	it('viewmodel is destroyed', inject([ViewModelsService], (service: ViewModelsService) => {
		let vm = service.newViewModel("test","test");
		service.destroyViewModel(vm);
		expect(service.viewModels.length).toBe(0);
	}));
});
