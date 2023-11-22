import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TechniqueVM, ViewModel } from '../../classes';
import { Tactic, Technique } from '../../classes/stix';
import { TacticCellComponent } from './tactic-cell.component';

describe('TacticCellComponent', () => {
    let component: TacticCellComponent;
    let fixture: ComponentFixture<TacticCellComponent>;
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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TacticCellComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TacticCellComponent);
        component = fixture.componentInstance;
        component.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        component.viewModel.domainVersionID = "enterprise-attack-13";
        let t1 = new Technique(techniqueSDO,[],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
		component.viewModel.setTechniqueVM(tvm_1);
        component.tactic = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(component.tactic);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
