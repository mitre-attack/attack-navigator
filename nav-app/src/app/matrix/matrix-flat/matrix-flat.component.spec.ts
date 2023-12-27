import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatrixFlatComponent } from './matrix-flat.component';
import { Matrix, Tactic, Technique } from '../../classes/stix';
import { TechniqueVM, ViewModel } from '../../classes';

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
    "tactic_refs": ["tactic-0"],
    "tactics": [
        {
            "id": "tactic-0",
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
        fixture = TestBed.createComponent(MatrixFlatComponent);
        component = fixture.componentInstance;
        component.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        let idToTacticSDO = new Map<string, any>();
        idToTacticSDO.set("tactic-0", tacticSDO);
        component.viewModel.showTacticRowBackground = true;
        let t1 = new Technique(techniqueSDO,[],null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
        component.viewModel.setTechniqueVM(tvm_1);
        let tactic1 = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(tactic1);
        component.matrix = new Matrix(matrixSDO, idToTacticSDO,technique_list,null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
