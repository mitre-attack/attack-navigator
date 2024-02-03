import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContextmenuComponent } from './contextmenu.component';
import { ContextMenuItem, Link, TechniqueVM, ViewModel } from '../../../classes';
import { Tactic, Technique } from '../../../classes/stix';
import { DataService } from '../../../services/data.service';

describe('ContextmenuComponent', () => {
    let contextMenu: ContextmenuComponent;
    let fixture: ComponentFixture<ContextmenuComponent>;

    let stixSDO = {
        name: 'Name',
        description: 'Description',
        created: '2001-01-01T01:01:00.000Z',
        modified: '2001-01-01T01:01:00.000Z',
        x_mitre_version: '1.0',
    };
    let tacticSDO = {
        id: 'tactic-0',
        ...stixSDO,
        type: 'x-mitre-tactic',
        x_mitre_shortname: 'tactic-name',
        external_references: [{ external_id: 'TA0000', url: 'https://attack.mitre.org/tactic/TA0000' }],
    };
    let templateSDO = {
        ...stixSDO,
        type: 'attack-pattern',
        x_mitre_platforms: ['platform'],
        kill_chain_phases: [
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'tactic-name',
            },
        ],
    };
    let techniqueSDO = {
        ...templateSDO,
        id: 'attack-pattern-0',
        external_references: [
            {
                external_id: 'T0000',
                url: 'https://attack.mitre.org/technique/T0000',
            },
        ],
    };
    let subtechniqueSDO = {
        ...templateSDO,
        id: 'attack-pattern-0-1',
        x_mitre_platforms: ['Linux', 'macOS', 'Windows'],
        external_references: [
            {
                external_id: 'T0000.001',
                url: 'https://attack.mitre.org/technique/T0000/001',
            },
        ],
    };
    let techniqueSDO2 = {
        ...templateSDO,
        id: 'attack-pattern-1',
        external_references: [
            {
                external_id: 'T0001',
                url: 'https://attack.mitre.org/technique/T0001',
            },
        ],
    };

    let buildContextMenuViewModel = function (cm: ContextmenuComponent, ds: DataService) {
        // create view model and set in contextmenu
        let viewModel = cm.viewModelsService.newViewModel('name', 'enterprise-attack-13');
        cm.viewModel = viewModel;
        // create context menu tactic & technique
        contextMenu.tactic = new Tactic(tacticSDO, [], ds);
        contextMenu.technique = new Technique(techniqueSDO, [], ds);
        // create a techniqueVM with technique T0000
        let tvm = new TechniqueVM('');
        let attackID = techniqueSDO.external_references[0].external_id;
        tvm.deserialize(JSON.stringify(techniqueSDO), attackID, contextMenu.tactic.shortname);
        // add a link to the techniqueVM
        let testLink = new Link();
        testLink.label = 'test link';
        testLink.url = 'https://www.google.com';
        tvm.links.push(testLink);
        // set techniqueVM in viewModel
        contextMenu.viewModel.setTechniqueVM(tvm);
        // create a second techniqueVM with technique T0001
        let tvm2 = new TechniqueVM('');
        let attackID2 = techniqueSDO2.external_references[0].external_id;
        tvm2.deserialize(JSON.stringify(techniqueSDO2), attackID2, contextMenu.tactic.shortname);
        // set second techniqueVM in viewModel
        contextMenu.viewModel.setTechniqueVM(tvm2);
        return [tvm.technique_tactic_union_id, tvm2.technique_tactic_union_id];
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ContextmenuComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(ContextmenuComponent);
        contextMenu = fixture.componentInstance;
    }));

    it('should create the component', () => {
        expect(contextMenu).toBeTruthy();
    });

    it('should set placement position', () => {
        let pos = 'right bottom';
        let functionSpy = spyOn<any>(contextMenu, 'getPosition').and.returnValue(pos);
        contextMenu.ngOnInit();
        expect(functionSpy).toHaveBeenCalled();
        expect(contextMenu.placement).toEqual(pos);
    });

    it('should emit on close', () => {
        let functionSpy = spyOn(contextMenu.close, 'emit');
        contextMenu.closeContextmenu(); // trigger close event
        expect(functionSpy).toHaveBeenCalled();
    });

    it('should open tactic url and close', inject([DataService], (service: DataService) => {
        let windowSpy = spyOn(window, 'open');
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');

        let tactic = new Tactic(tacticSDO, [], service);
        contextMenu.tactic = tactic;
        contextMenu.viewTactic();

        expect(windowSpy).toHaveBeenCalledOnceWith(tactic.url, '_blank');
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should open technique url and close', inject([DataService], (service: DataService) => {
        let windowSpy = spyOn(window, 'open');
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');

        let technique = new Technique(techniqueSDO, [], service);
        contextMenu.technique = technique;
        contextMenu.viewTechnique();

        expect(windowSpy).toHaveBeenCalledOnceWith(technique.url, '_blank');
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should open custom url and close', inject([DataService], (service: DataService) => {
        let windowSpy = spyOn(window, 'open');
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let technique_list: Technique[] = [];
        let st1 = new Technique(subtechniqueSDO, [], null);
        let t1 = new Technique(techniqueSDO, [st1], null);
        technique_list.push(t1);
        technique_list.push(st1);
        let tactic = new Tactic(tacticSDO, technique_list, service);
        let url = 'https://attack.mitre.org/{{tactic_attackID}}/{{technique_attackID}}';
        let subtechnique_url = 'https://attack.mitre.org/{{tactic_attackID}}/{{technique_attackID}}/{{subtechnique_attackID}}';
        let replacedUrl = 'https://attack.mitre.org/TA0000/T0000';
        buildContextMenuViewModel(contextMenu, service);
        let customItem = new ContextMenuItem('label', url, subtechnique_url);
        customItem.getReplacedURL(st1, tactic);
        customItem = new ContextMenuItem('label', url);
        contextMenu.openCustomContextMenuItem(customItem);

        expect(windowSpy).toHaveBeenCalledOnceWith(replacedUrl, '_blank');
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should build view model and technique view model', inject([DataService], (service: DataService) => {
        let [ttid, ttid2] = buildContextMenuViewModel(contextMenu, service);
        expect(ttid).toBeTruthy();
        expect(contextMenu.viewModel).toBeTruthy();
        expect(contextMenu.viewModel).toBeInstanceOf(ViewModel);
        expect(contextMenu.viewModel.getTechniqueVM_id(ttid)).toBeTruthy();
        expect(contextMenu.viewModel.getTechniqueVM_id(ttid)).toBeInstanceOf(TechniqueVM);
        expect(contextMenu.viewModel.getTechniqueVM_id(ttid2)).toBeTruthy();
        expect(contextMenu.viewModel.getTechniqueVM_id(ttid2)).toBeInstanceOf(TechniqueVM);
    }));

    it('should get technique vm', inject([DataService], (service: DataService) => {
        let ttids = buildContextMenuViewModel(contextMenu, service);
        let tvm = contextMenu.techniqueVM;
        expect(tvm).toBeTruthy();
        expect(tvm).toBeInstanceOf(TechniqueVM);
        expect(tvm.technique_tactic_union_id).toEqual(ttids[0]);
    }));

    it('should get links', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let links = contextMenu.links;
        expect(links).toBeTruthy();
        expect(links.length).toEqual(1);
        expect(links[0]).toBeInstanceOf(Link);
    }));

    it('should open link and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let windowSpy = spyOn(window, 'open');
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let link = contextMenu.links[0];
        contextMenu.openLink(link);
        expect(windowSpy).toHaveBeenCalledOnceWith(link.url);
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should select technique and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        contextMenu.select();
        expect(contextMenu.viewModel.activeTvm).toBe(contextMenu.techniqueVM);
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(1);
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should add technique selection and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        contextMenu.addSelection();
        expect(contextMenu.viewModel.activeTvm).toBe(contextMenu.techniqueVM);
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(1);
        contextMenu.viewModel.selectSubtechniquesWithParent = true;
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(1);
        contextMenu.viewModel.selectTechniquesAcrossTactics = false;
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(1);
        contextMenu.viewModel.selectSubtechniquesWithParent = false;
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(1);
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should remove technique selection and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        contextMenu.select();
        expect(contextMenu.viewModel.activeTvm).toBe(contextMenu.techniqueVM);
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(1);
        contextMenu.removeSelection();
        expect(contextMenu.viewModel.activeTvm).toBe(undefined);
        expect(contextMenu.viewModel.getSelectedTechniqueCount()).toEqual(0);
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should call selectAllTechniques and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'selectAllTechniques');
        contextMenu.selectAll();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalled();
    }));

    it('should call clearSelectedTechniques and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'clearSelectedTechniques');
        contextMenu.deselectAll();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalled();
    }));

    it('should call invertSelection and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'invertSelection');
        contextMenu.invertSelection();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalled();
    }));

    it('should call selectAnnotated and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'selectAnnotated');
        contextMenu.selectAnnotated();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalled();
    }));

    it('should call selectUnannotated and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'selectUnannotated');
        contextMenu.selectUnannotated();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalled();
    }));

    it('should call selectAllTechniquesInTactic and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'selectAllTechniquesInTactic');
        contextMenu.selectAllInTactic();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalledOnceWith(contextMenu.tactic);
    }));

    it('should call unselectAllTechniquesInTactic and close', inject([DataService], (service: DataService) => {
        buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        let viewModelSpy = spyOn(contextMenu.viewModel, 'unselectAllTechniquesInTactic');
        contextMenu.deselectAllInTactic();
        expect(functionSpy).toHaveBeenCalled();
        expect(viewModelSpy).toHaveBeenCalledOnceWith(contextMenu.tactic);
    }));

    it('should pin cell and close', inject([DataService], (service: DataService) => {
        let ttids = buildContextMenuViewModel(contextMenu, service);
        let functionSpy = spyOn(contextMenu, 'closeContextmenu');
        contextMenu.pinCell();
        expect(contextMenu.viewModelsService.pinnedCell).toBe(ttids[0]);
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should unpin cell', inject([DataService], (service: DataService) => {
        let ttids = buildContextMenuViewModel(contextMenu, service);
        contextMenu.pinCell();
        expect(contextMenu.viewModelsService.pinnedCell).toBe(ttids[0]);
        contextMenu.pinCell();
        expect(contextMenu.viewModelsService.pinnedCell).toBe('');
    }));
});
