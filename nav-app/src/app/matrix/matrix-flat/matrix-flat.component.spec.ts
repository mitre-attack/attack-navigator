import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixFlatComponent } from './matrix-flat.component';
import { Matrix, Technique } from '../../classes/stix';
import { TechniqueVM, ViewModel } from '../../classes';
import * as MockData from '../../../tests/utils/mock-data';

describe('MatrixFlatComponent', () => {
    let component: MatrixFlatComponent;
    let fixture: ComponentFixture<MatrixFlatComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MatrixFlatComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        let technique_list: Technique[] = [];
        fixture = TestBed.createComponent(MatrixFlatComponent);
        component = fixture.componentInstance;
        component.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        component.viewModel.showTacticRowBackground = true;
        let t1 = new Technique(MockData.T0000,[],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        component.viewModel.setTechniqueVM(tvm_1);
        component.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO,technique_list,null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
