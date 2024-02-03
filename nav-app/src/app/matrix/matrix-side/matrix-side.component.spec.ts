import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixSideComponent } from './matrix-side.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TechniqueVM, ViewModel } from '../../classes';
import { Matrix, Technique } from '../../classes/stix';
import * as MockData from '../../../tests/utils/mock-data';

describe('MatrixSideComponent', () => {
    let component: MatrixSideComponent;
    let fixture: ComponentFixture<MatrixSideComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            declarations: [MatrixSideComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        let technique_list: Technique[] = [];
        fixture = TestBed.createComponent(MatrixSideComponent);
        component = fixture.componentInstance;
        component.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", MockData.TA0000);
        component.viewModel.showTacticRowBackground = true;
        let t1 = new Technique(MockData.T0000, [], null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
		component.viewModel.setTechniqueVM(tvm_1);
        component.matrix = new Matrix(MockData.matrixSDO, idToTacticSDO, technique_list,null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
