import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangelogCellComponent } from './changelog-cell.component';
import { Link, Metadata, TechniqueVM, ViewModel } from '../../classes';
import { Note, Tactic, Technique } from '../../classes/stix';
import tinycolor from 'tinycolor2';
import { deleteCookie, hasCookie } from '../../utils/cookies';
import { ConfigService } from '../../services/config.service';
import * as MockData from '../../../tests/utils/mock-data';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ChangelogCellComponent', () => {
    let component: ChangelogCellComponent;
    let fixture: ComponentFixture<ChangelogCellComponent>;
    let configService: ConfigService;
    let technique_list: Technique[] = [];
    let stixSDO = {
        name: 'Name',
        description: 'Description',
        created: '2001-01-01T01:01:00.000Z',
        modified: '2001-01-01T01:01:00.000Z',
        object_refs: 'attack-pattern-0',
        x_mitre_version: '1.0',
        abstract: 'test',
    };
    let tacticSDO = {
        id: 'tactic-0',
        ...stixSDO,
        name: 'Reconnaissance',
        type: 'x-mitre-tactic',
        x_mitre_shortname: 'reconnaissance',
        external_references: [{ external_id: 'TA0043', url: 'https://attack.mitre.org/tactics/TA0043' }],
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
    let subtechniqueSDO1 = {
        ...templateSDO,
        id: 'attack-pattern-0-1',
        x_mitre_platforms: ['Linux', 'macOS', 'Windows'],
        external_references: [
            {
                external_id: 'T1595.002',
                url: 'https://attack.mitre.org/techniques/T1595/002',
            },
        ],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChangelogCellComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();

        // set up config service
        configService = TestBed.inject(ConfigService);
        configService.versions = MockData.configData;

        fixture = TestBed.createComponent(ChangelogCellComponent);
        component = fixture.debugElement.componentInstance;

        configService.setFeature('aggregate_score_color', true);
        configService.setFeature('non_aggregate_score_color', true);
        component.viewModel = new ViewModel('layer', '33', 'enterprise-attack-13', null);
        component.viewModel.domainVersionID = 'enterprise-attack-13';
        let st1 = new Technique(subtechniqueSDO1, [], null);
        component.technique = new Technique(techniqueSDO, [st1], null);
        technique_list.push(component.technique);
        let tvm_1 = new TechniqueVM('T1595^reconnaissance');
        component.dataService.domains[0].notes = [new Note(stixSDO)];
        let m1 = new Metadata();
        m1.name = 'test1';
        m1.value = 't1';
        tvm_1.metadata = [m1];
        let l1 = new Link();
        l1.label = 'test1';
        l1.url = 't1';
        tvm_1.links = [l1];
        tvm_1.color = 'black';
        tvm_1.score = '3';
        tvm_1.scoreColor = 'black';
        tvm_1.aggregateScore = '3';
        tvm_1.aggregateScoreColor = 'black';
        component.viewModel.setTechniqueVM(tvm_1);
        component.tactic = new Tactic(tacticSDO, technique_list, null);
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
        component.section = 'deprecations';
        component.viewModel.highlightedTechniques.add('attack-pattern-0');
        expect(component.getClass()).toEqual('link noselect cell highlight showName side underlined nopointer setwidth');
        component.viewModel.selectTechnique(component.technique, component.tactic);
        component.viewModel.layout.showID = true;
        component.showContextmenu = true;
        component.viewModel.selectSubtechniquesWithParent = true;
        let st1 = new Technique(subtechniqueSDO1, [], null);
        let stvm_1 = new TechniqueVM('T1595.002^reconnaissance');
        component.viewModel.setTechniqueVM(stvm_1);
        st1.parent = component.technique;
        component.technique = st1;
        component.viewModel.highlightedTactic = component.tactic;
        component.viewModel.selectTechniquesAcrossTactics = false;
        component.viewModel.getTechniqueVM(component.technique, component.tactic).enabled = false;
        expect(component.getClass()).toEqual('link noselect cell editing highlight showID showName side disabled nopointer setwidth');
    });

    it('should get technique background style', () => {
        component.showContextmenu = false;
        component.isDarkTheme = true;
        expect(component.getTechniqueBackground()).toEqual({ background: component.emulate_alpha('black') });
        component.viewModel.layout._showAggregateScores = true;
        expect(component.getTechniqueBackground()).toEqual({ background: component.emulate_alpha('black') });
        component.viewModel.getTechniqueVM(component.technique, component.tactic).enabled = true;
        configService.setFeature('background_color', true);
        expect(component.getTechniqueBackground()).toEqual({ background: component.emulate_alpha('black') });
        component.viewModel.highlightedTechniques.add('attack-pattern-0');
        component.viewModel.selectTechnique(component.technique, component.tactic);
        expect(component.getTechniqueBackground()).toEqual(null);
        let tactic = component.tactic;
        component.tactic = null;
        expect(component.getTechniqueBackground()).toEqual(null);
        component.tactic = tactic;
    });

    it('should get the underline color for the given technique', () => {
        configService.setFeature('link_underline', true);
        configService.linkColor = 'purple';
        expect(component.getTechniqueUnderlineColor()).toEqual('purple');
        configService.setFeature('metadata_underline', true);
        configService.metadataColor = 'blue';
        expect(component.getTechniqueUnderlineColor()).toEqual('blue');
        configService.setFeature('comment_underline', true);
        configService.commentColor = 'yellow';
        expect(component.getTechniqueUnderlineColor()).toEqual('yellow');
    });

    it('should get most readable text color for the given technique', () => {
        component.isDarkTheme = false;
        component.viewModel.getTechniqueVM(component.technique, component.tactic).score = '';
        expect(component.getTechniqueTextColor()).toEqual('black');
        component.isDarkTheme = true;
        expect(component.getTechniqueTextColor()).toEqual('white');
        component.isDarkTheme = false;
        component.viewModel.layout._showAggregateScores = true;
        expect(component.getTechniqueTextColor()).toEqual(tinycolor.mostReadable(component.emulate_alpha('black'), ['white', 'black']));
        configService.setFeature('background_color', true);
        expect(component.getTechniqueTextColor()).toEqual(tinycolor.mostReadable(component.emulate_alpha('black'), ['white', 'black']));
        component.viewModel.getTechniqueVM(component.technique, component.tactic).enabled = false;
        expect(component.getTechniqueTextColor()).toEqual('#aaaaaa');
        component.isDarkTheme = true;
        expect(component.getTechniqueTextColor()).toEqual('rgb(255 255 255 / 25%)');
        let tactic = component.tactic;
        component.tactic = null;
        expect(component.getTechniqueTextColor()).toEqual('white');
        component.isDarkTheme = false;
        expect(component.getTechniqueTextColor()).toEqual('black');
        component.tactic = tactic;
    });

    it('should delete cookie', () => {
        deleteCookie('is_user_theme_dark');
        expect(hasCookie('is_user_theme_dark')).toBeFalse();
    });
});
