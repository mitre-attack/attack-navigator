import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechniqueCellComponent } from './technique-cell.component';
import { ViewModelsService } from '../../services/viewmodels.service';
import { TechniqueVM, ViewModel } from '../../classes';
import { Matrix, Tactic, Technique } from '../../classes/stix';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';

describe('TechniqueCellComponent', () => {
    let component: TechniqueCellComponent;
    let fixture: ComponentFixture<TechniqueCellComponent>;
    let stixSDO = {
        "name": "Name",
        "description": "Description",
        "created": "2001-01-01T01:01:00.000Z",
        "modified": "2001-01-01T01:01:00.000Z",
        "x_mitre_version": "1.0",
    }
    let techniqueSDO = {
        ...stixSDO,
        "type": "attack-pattern",
        "x_mitre_platforms": ["platform"],
        "kill_chain_phases": [{
            "kill_chain_name": "mitre-attack",
            "phase_name": "tactic-name"
        }],
    }
    let t0000 = {
        ...techniqueSDO,
        "id": "attack-pattern-0",
        "external_references": [{"external_id": "T0000"}],
    }
    let t0000_000 = {
        ...techniqueSDO,
        "id": "attack-pattern-1",
        "x_mitre_is_subtechnique": true,
        "external_references": [{"external_id": "T0000.000"}],
    }
    let t0000_001 = {
        ...techniqueSDO,
        "id": "attack-pattern-2",
        "x_mitre_is_subtechnique": true,
        "revoked": true,
        "external_references": [{"external_id": "T0000.001"}],
    }
    let tacticSDO = {
        ...stixSDO,
        "id": "tactic-0",
        "type": "x-mitre-tactic",
        "x_mitre_shortname": "tactic-name",
        "external_references": [{"external_id": "TA0000"}]
    }
    let matrixSDO = {
        ...stixSDO,
        "id": "matrix-0",
        "type": "x-mitre-matrix",
        "tactic_refs": ["tactic-0"],
        "external_references": [{"external_id": "enterprise-matrix"}]
    }
    let techniqueTacticUnionId = "T0000^tactic-name";

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ViewModelsService],
            declarations: [TechniqueCellComponent],
        });
        fixture = TestBed.createComponent(TechniqueCellComponent);
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
        let sub1 = new Technique(t0000_000, [], null);
        let sub2 = new Technique(t0000_001, [], null);
        component.technique = new Technique(t0000, [sub1, sub2], null);
        component.tactic = new Tactic(tacticSDO, [component.technique], null);
        let map = new Map();
        map.set(component.tactic.id, tacticSDO);
        component.matrix = new Matrix(matrixSDO, map, [component.technique, sub1, sub2], null);
        component.viewModel = component.viewModelsService.newViewModel("vm", "enterprise-attack-13");
        component.viewModel.setTechniqueVM(new TechniqueVM(techniqueTacticUnionId));
        component.viewModel.setTechniqueVM(new TechniqueVM("T0000.000^tactic-name"));
        component.viewModel.setTechniqueVM(new TechniqueVM("T0000.001^tactic-name"));
        fixture.detectChanges();
    });

    beforeEach(() => {
        component.viewModelsService.pinnedCell = "";
        component.showContextmenu = false;
        component.viewModel.techniqueVMs.forEach(tvm => tvm.score = '');
    });

    it('should create an instance of TechniqueCellComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should not be pinned cell', () => {
        expect(component.isCellPinned).toBeFalse();
    });

    it('should be pinned cell', () => {
        component.viewModelsService.pinnedCell = techniqueTacticUnionId;
        expect(component.isCellPinned).toBeTrue();
    });

    it('should show the tooltip', () => {
        component.viewModelsService.pinnedCell = techniqueTacticUnionId;
        expect(component.showTooltip).toBeTrue();

        component.viewModel.highlightTechnique(component.technique, component.tactic);
        expect(component.showTooltip).toBeTrue();
        component.viewModel.clearHighlight();
    });

    it('should not show the tooltip with context menu', () => {
        component.onRightClick(null);
        expect(component.showTooltip).toBeFalse();
    });

    it('should unpin other cells on click', () => {
        component.viewModelsService.pinnedCell = "T0001^tactic-name";
        expect(component.isCellPinned).toBeFalse();
        component.onRightClick(null);
        expect(component.viewModelsService.pinnedCell).toEqual('');

        component.viewModelsService.pinnedCell = "T0001^tactic-name";
        expect(component.isCellPinned).toBeFalse();
        component.onLeftClick(null);
        expect(component.viewModelsService.pinnedCell).toEqual('');
    });

    // it('should emit event on left click + select', () => {
    //     component.configService.setFeature('selecting_techniques', true);
    //     console.log(component.configService.getFeature('selecting_techniques'));
    //     let clickSpy = spyOn(component.leftclick, 'emit');
    //     component.onLeftClick({shiftKey: 'ENTER', ctrlKey: 'CTRL', metaKey: 'META', pageX: 0, pageY: 0});
    //     expect(clickSpy).toHaveBeenCalled();
    //     component.configService.setFeature('selecting_techniques', false);
    // });

    it('should highlight on mouse enter', () => {
        let highlightSpy = spyOn(component.highlight, 'emit');
        component.onMouseEnter();
        expect(highlightSpy).toHaveBeenCalled();
    });

    it('should unhighlight on mouse leave', () => {
        let unhighlightSpy = spyOn(component.unhighlight, 'emit');
        component.onMouseLeave();
        expect(unhighlightSpy).toHaveBeenCalled();
    });

    it('should count annotated subtechniques', () => {
        expect(component.annotatedSubtechniques()).toEqual(0);
    });
});
