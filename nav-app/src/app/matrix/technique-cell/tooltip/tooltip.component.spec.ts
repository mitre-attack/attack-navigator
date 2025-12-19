import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TooltipComponent } from './tooltip.component';
import { TechniqueVM, ViewModel } from '../../../classes';
import { Note, Tactic, Technique } from '../../../classes/stix';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TooltipComponent', () => {
    let component: TooltipComponent;
    let fixture: ComponentFixture<TooltipComponent>;
    let technique_list: Technique[] = [];

    let stixSDO = {
        name: 'Name',
        description: 'Description',
        created: '2001-01-01T01:01:00.000Z',
        modified: '2001-01-01T01:01:00.000Z',
        object_refs: 'attack-pattern-0',
        x_mitre_version: '1.0',
    };
    let tacticSDO = {
        id: 'tactic-0',
        ...stixSDO,
        name: 'Reconnaissance',
        type: 'x-mitre-tactic',
        x_mitre_shortname: 'reconnaissance',
        external_references: [
            {
                external_id: 'TA0043',
                url: 'https://attack.mitre.org/tactics/TA0043',
            },
        ],
    };
    let templateSDO = {
        ...stixSDO,
        type: 'attack-pattern',
        x_mitre_platforms: ['PRE'],
        kill_chain_phases: [
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'reconnaissance',
            },
        ],
    };
    let techniqueSDO = {
        ...templateSDO,
        id: 'attack-pattern-0',
        external_references: [
            {
                external_id: 'T1595',
                url: 'https://attack.mitre.org/techniques/T1595',
            },
        ],
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TooltipComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TooltipComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();
        fixture = TestBed.createComponent(TooltipComponent);
        component = fixture.debugElement.componentInstance;
        let versions = [
            {
                name: 'ATT&CK v13',
                version: '13',
                domains: [
                    {
                        name: 'Enterprise',
                        identifier: 'enterprise-attack',
                        data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json'],
                    },
                ],
            },
        ];
        Object.defineProperties(window, {
            innerWidth: { get: () => 100 },
            innerHeight: { get: () => 100 },
        });
        component.dataService.setUpDomains(versions);
        component.dataService.domains[0].notes = [new Note(stixSDO)];
        component.viewModel = new ViewModel('layer', '33', 'enterprise-attack-13', null);
        component.viewModel.domainVersionID = 'enterprise-attack-13';
        component.technique = new Technique(techniqueSDO, [], null);
        technique_list.push(component.technique);
        let tvm_1 = new TechniqueVM('T1595^reconnaissance');
        component.viewModel.setTechniqueVM(tvm_1);
        component.tactic = new Tactic(tacticSDO, technique_list, null);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should unpin cell', () => {
        component.unpin();
        expect(component.viewModelsService.pinnedCell).toEqual('');
    });

    it('should return correct placement when element is on the right and bottom', () => {
        spyOn(component.element.nativeElement, 'getBoundingClientRect').and.returnValue({
            right: 0,
            bottom: 100,
        });
        const result = component.getPlacement();
        expect(result).toBe('right top');
    });

    it('should return correct placement when element is on the right and top', () => {
        spyOn(component.element.nativeElement, 'getBoundingClientRect').and.returnValue({
            right: 0,
            bottom: 0,
        });
        const result = component.getPlacement();
        expect(result).toBe('right bottom');
    });

    it('should return correct placement when element is on the left and bottom', () => {
        spyOn(component.element.nativeElement, 'getBoundingClientRect').and.returnValue({
            right: 100,
            bottom: 100,
        });
        const result = component.getPlacement();
        expect(result).toBe('left top');
    });

    it('should return correct placement when element is on the left and top', () => {
        spyOn(component.element.nativeElement, 'getBoundingClientRect').and.returnValue({
            right: 100,
            bottom: 0,
        });
        const result = component.getPlacement();
        expect(result).toBe('left bottom');
    });
});
