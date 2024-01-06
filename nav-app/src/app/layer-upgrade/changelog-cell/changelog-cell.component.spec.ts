import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangelogCellComponent } from './changelog-cell.component';
import { TechniqueVM, ViewModel } from '../../classes';
import { Tactic, Technique } from '../../classes/stix';

describe('ChangelogCellComponent', () => {
    let component: ChangelogCellComponent;
    let fixture: ComponentFixture<ChangelogCellComponent>;
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
        "external_references": [{"external_id": "TA0043", "url": "https://attack.mitre.org/tactics/TA0043"}]
    }
    let templateSDO = {
        ...stixSDO,
        "type": "attack-pattern",
        "x_mitre_platforms": ['PRE'],
        "kill_chain_phases": [{
            "kill_chain_name": "mitre-attack",
            "phase_name": "reconnaissance"
        }],
    }
    let techniqueSDO = {
        ...templateSDO,
        "id": "attack-pattern-0",
        "external_references": [{
            "external_id": "T1595",
            "url": "https://attack.mitre.org/techniques/T1595"
        }]
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ChangelogCellComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangelogCellComponent);
        component = fixture.debugElement.componentInstance;
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
            }
        ]
        component.dataService.setUpURLs(versions);
        component.viewModel = new ViewModel("layer","33","enterprise-attack-13",null);
        component.viewModel.domainVersionID = "enterprise-attack-13";
        component.technique = new Technique(techniqueSDO,[],null);
        technique_list.push(component.technique);
        let tvm_1 = new TechniqueVM("T1595^reconnaissance");
		component.viewModel.setTechniqueVM(tvm_1);
        component.tactic = new Tactic(tacticSDO,technique_list,null);
        tactic_list.push(component.tactic);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should highlight and unhighlight technique', () => {
        component.highlight();
        expect(component.viewModel.highlightedTechnique).toEqual(component.technique);
        component.unhighlight();
        expect(component.viewModel.highlightedTechnique).toEqual(null);
    });

    it('should select and unselect technique', () => {
        component.onClick();
        let selected_techniques = new Set();
        selected_techniques.add('T1595^reconnaissance');
        expect(component.viewModel.selectedTechniques).toEqual(selected_techniques);
        component.onClick();
        selected_techniques = new Set();
        expect(component.viewModel.selectedTechniques).toEqual(selected_techniques);
    });

    it('should get css for the technique', () => {
        component.isCurrentVersion = false;
        component.isDraggable = false;
        component.section = "deprecations";
        expect(component.getClass()).toEqual('link noselect cell showName side nopointer setwidth');
    });
});
