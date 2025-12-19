import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TechniqueVM, ViewModel } from '../../classes';
import { Tactic, Technique } from '../../classes/stix';
import { TacticCellComponent } from './tactic-cell.component';
import * as MockData from '../../../tests/utils/mock-data';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('TacticCellComponent', () => {
    let component: TacticCellComponent;
    let fixture: ComponentFixture<TacticCellComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatTooltipModule, TacticCellComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        let technique_list: Technique[] = [];
        fixture = TestBed.createComponent(TacticCellComponent);
        component = fixture.componentInstance;
        component.viewModel = new ViewModel('layer', '33', 'enterprise-attack-13', null);
        component.viewModel.domainVersionID = 'enterprise-attack-13';
        let t1 = new Technique(MockData.T0000, [], null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM('T1595^reconnaissance');
        component.viewModel.setTechniqueVM(tvm_1);
        component.tactic = new Tactic(MockData.TA0000, technique_list, null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
