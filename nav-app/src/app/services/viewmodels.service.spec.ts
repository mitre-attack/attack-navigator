import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewModelsService } from './viewmodels.service';
import { TechniqueVM, LayoutOptions, Metadata, ViewModel, Link, VersionChangelog } from '../classes';
import { Technique, Tactic, Matrix } from '../classes/stix';
import tinygradient from 'tinygradient';
import * as MockData from '../../tests/utils/mock-data';
import { ConfigService } from './config.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ViewmodelsService', () => {
    let viewModelsService: ViewModelsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [ViewModelsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        });
        // set up config service
        let configService = TestBed.inject(ConfigService);
        configService.versions = MockData.configData;
        viewModelsService = TestBed.inject(ViewModelsService);
    });

    it('should be created', () => {
        expect(viewModelsService).toBeTruthy();
    });

    it('should correctly increment nonce on subsequent calls', () => {
        expect(viewModelsService.getNonce()).toBe(0);
        expect(viewModelsService.getNonce()).toBe(1);
        expect(viewModelsService.getNonce()).toBe(2);
    });

    it('should create viewmodel by inheriting the score from other view models', () => {
        viewModelsService.selectionChanged();
        let vm1 = viewModelsService.newViewModel('layer', 'enterprise-attack-13');
        let vm2 = viewModelsService.newViewModel('layer1', 'enterprise-attack-13');
        let scoreVariables = new Map<string, ViewModel>();
        scoreVariables.set('a', vm1);
        scoreVariables.set('b', vm2);
        let tvm_1 = new TechniqueVM('T1583');
        tvm_1.score = '2';
        tvm_1.comment = 'completed';
        vm1.setTechniqueVM(tvm_1);
        let tvm_2 = new TechniqueVM('T1584');
        tvm_2.score = '1';
        vm2.setTechniqueVM(tvm_2);
        let tvm_3 = new TechniqueVM('T1583');
        tvm_3.score = '1';
        vm2.setTechniqueVM(tvm_3);
        let opSettings: any = {
            domain: 'Enterprise ATT&CK v13',
            gradientVM: vm1,
            coloringVM: vm1,
            commentVM: vm1,
            linkVM: vm1,
            metadataVM: vm1,
            enabledVM: vm1,
            filterVM: vm1,
            scoreExpression: 'a+b',
            legendVM: vm1,
        };
        let vm_new = viewModelsService.layerOperation(scoreVariables, 'test1', opSettings);
        let tvm_new = vm_new.getTechniqueVM_id('T1583');
        expect(vm2.domainVersionID).toBe('enterprise-attack-13');
        expect(tvm_new.score).toBe('3');
        expect(tvm_new.comment).toBe('completed');
    });

    it('viewmodel is created', () => {
        viewModelsService.newViewModel('test', 'test');
        expect(viewModelsService.viewModels.length).toBe(1);
    });

    it('viewmodel is destroyed', () => {
        let vm = viewModelsService.newViewModel('test', 'test');
        viewModelsService.destroyViewModel(vm);
        expect(viewModelsService.viewModels.length).toBe(0);
    });

    it('should select and unselect technique across tactics', () => {
        let technique_list: Technique[] = [];
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let st1 = new Technique(MockData.T0000_002, [], null);
        let t1 = new Technique(MockData.T0000, [st1], null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM('T0000.002^tactic-name');
        let t2 = new Technique(MockData.T0001, [], null);
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        technique_list.push(t2);
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(MockData.TA0000, technique_list, null);
        vm1.selectTechniquesAcrossTactics = false;
        vm1.selectSubtechniquesWithParent = true;
        vm1.selectTechnique(t2, tactic1);
        expect(vm1.selectedTechniques.size).toEqual(1); // T0001
        vm1.selectTechnique(st1, tactic1);
        expect(vm1.selectedTechniques.size).toEqual(3); // T0001, T0000, T0000.002
        vm1.unselectTechnique(t2, tactic1);
        expect(vm1.selectedTechniques.size).toEqual(2); // T0000, T0000.002
        vm1.unselectTechnique(st1, tactic1);
        expect(vm1.selectedTechniques.size).toEqual(0);
        vm1.selectTechniqueAcrossTactics(t2, true, true);
        expect(vm1.highlightedTechniques.size).toEqual(1);
        vm1.selectTechniqueAcrossTactics(st1);
        expect(vm1.selectedTechniques.size).toEqual(2); // T0000, T0000.002
        vm1.selectTechniqueAcrossTactics(st1, true, true);
        vm1.unselectTechniqueAcrossTactics(st1);
        expect(vm1.selectedTechniques.size).toEqual(0);
    });

    it('should edit and reset techniques', () => {
        let technique_list: Technique[] = [];
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let st1 = new Technique(MockData.T0000_002, [], null);
        let t1 = new Technique(MockData.T0000, [st1], null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM('T0000.002^tactic-name');
        stvm_1.score = '3';
        let t2 = new Technique(MockData.T0001, [], null);
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        tvm_2.score = '3';
        tvm_2.comment = 'test1';
        technique_list.push(t2);
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(MockData.TA0000, technique_list, null);
        vm1.selectAllTechniques(); // select all techniques
        vm1.selectSubtechniquesWithParent = true;
        expect(vm1.isTechniqueSelected(t1, tactic1)).toEqual(true);
        expect(vm1.isTechniqueSelected(st1, tactic1)).toEqual(true);
        vm1.selectTechniquesAcrossTactics = false;
        expect(vm1.isTechniqueSelected(t1, tactic1)).toEqual(true);
        expect(vm1.isTechniqueSelected(st1, tactic1)).toEqual(true);
        vm1.selectUnannotated(); // none
        vm1.editSelectedTechniques('score', '3');
        expect(vm1.getTechniqueVM_id('T0001^tactic-name')['score']).toEqual('3');
        vm1.selectAnnotated(); // T0001, T0000, T0000.002
        vm1.resetSelectedTechniques(); // Unannotate the selected techniques
        expect(vm1.getTechniqueVM_id('T0001^tactic-name')['score']).toEqual('');
        vm1.selectAllTechniques(); // T0001, T0000, T0000.002
        let m2 = new Metadata();
        m2.name = 'test1';
        m2.value = 't1';
        vm1.editSelectedTechniqueValues('metadata', [m2]); // change metadata value for all selected techniques
        expect(tvm_1.metadata).toEqual([m2]);
        vm1.editSelectedTechniques('score', '8');
        expect(tvm_1.score).toEqual('8');
    });

    it('should get common value from selected techniques', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let technique_list: Technique[] = [];
        let t1 = new Technique(MockData.T0000, [], null);
        let t2 = new Technique(MockData.T0001, [], null);
        technique_list.push(t1);
        technique_list.push(t2);
        let tactic1 = new Tactic(MockData.TA0000, technique_list, null);
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        tvm_1.score = '3';
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        tvm_2.score = '3';
        tvm_2.comment = 'test1';
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.selectAllTechniques();
        expect(vm1.getEditingCommonValue('score')).toEqual('3'); // common score value of 3
        expect(vm1.getEditingCommonValue('comment')).toEqual(''); // no common value for comment
        vm1.unselectAllTechniquesInTactic(tactic1);
        expect(vm1.getEditingCommonValue('score')).toEqual('');
    });

    it('should select annotated techniques and unannotated techniques', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM('T0000.002^tactic-name');
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        vm1.selectAnnotated();
        expect(vm1.selectedTechniques.size).toEqual(1); // T0000
        vm1.selectAllTechniques();
        vm1.selectAnnotated();
        expect(vm1.selectedTechniques.size).toEqual(1);
        vm1.selectUnannotated();
        expect(vm1.selectedTechniques.size).toEqual(0); // since currently editing, no unannotated techniques are  selected
        vm1.selectUnannotated();
        expect(vm1.selectedTechniques.size).toEqual(2); // T0000.002, T0001
    });

    it('should check if subtechnique is enabled', () => {
        let technique_list: Technique[] = [];
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let st1 = new Technique(MockData.T0000_002, [], null);
        let t1 = new Technique(MockData.T0000, [st1], null);
        technique_list.push(t1);
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        let stvm_1 = new TechniqueVM('T0000.002^tactic-name');
        let t2 = new Technique(MockData.T0001, [], null);
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        technique_list.push(t2);
        tvm_1.score = '3';
        expect(vm1.linksMatch).toEqual(true);
        expect(vm1.metadataMatch).toEqual(true);
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        let tactic1 = new Tactic(MockData.TA0000, technique_list, null);
        expect(vm1.isSubtechniqueEnabled(t1, tvm_1, tactic1)).toEqual(true); // techniqueVM enabled by default so function returns true
        tvm_1.enabled = false;
        vm1.filters.platforms.selection = ['PRE'];
        expect(vm1.isSubtechniqueEnabled(t1, tvm_1, tactic1)).toEqual(true); // subtechniqueVM enabled by default so function returns true
        tvm_2.enabled = false;
        expect(vm1.isSubtechniqueEnabled(t2, tvm_2, tactic1)).toEqual(false); // returns false because enabled property set to false
    });

    it('should get a list of annotated hidden techniques and visibile techniques', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        let stvm_1 = new TechniqueVM('T0000.002^tactic-name');
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        tvm_1.score = '3';
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        vm1.addLegendItem();
        expect(vm1.legendItems.length).toEqual(1);
        vm1.deleteLegendItem(0);
        vm1.clearLegend();
        expect(vm1.legendItems.length).toEqual(0);
        tvm_1.showSubtechniques = false;
        expect(tvm_1.modified()).toEqual(true); // returns true since techniqueVM is annotated
        tvm_1.isVisible = false;
        expect(vm1.modifiedHiddenTechniques()).toEqual(1);
        tvm_1.isVisible = true;
        expect(vm1.getVisibleTechniquesList()).toEqual(['T0000^tactic-name', 'T0001^tactic-name', 'T0000.002^tactic-name']);
    });

    it('should test gradient colors', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM('T0000.002^tactic-name');
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        vm1.updateScoreColor(tvm_1);
        expect(tvm_1.scoreColor).toEqual('#ff6e66');
        vm1.removeGradientColor(0);
        vm1.addGradientColor();
        let colorarray = ['#66b1ff', '#ff66f4', '#ff6666'];
        expect(vm1.gradient.presetToTinyColor('bluered')).toEqual(tinygradient(colorarray).css('linear', 'to right'));
        expect(vm1.gradient.getHexColor('7')).toEqual('#efe361');
        expect(vm1.gradient.getHexColor('200')).toEqual('#8ec843');
        vm1.gradient.gradient = false;
        vm1.gradient.getHexColor('200');
        expect(vm1.gradient.colors.length).toEqual(3);
    });

    const validTechniqueVMRep = '{"comment": "test comment","color": "#ffffff", "score": 1,"enabled": true,"showSubtechniques": false}';
    const techniqueID = 'T0001';
    const tacticName = 'tactic-name';
    const ttid = 'T0001^tactic-name';
    it('should deserialize TechniqueVM correctly with valid input', () => {
        let tvm = new TechniqueVM(ttid);
        let deserializeSpy = spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validTechniqueVMRep, techniqueID, tacticName);
        expect(deserializeSpy).toHaveBeenCalledOnceWith(validTechniqueVMRep, techniqueID, tacticName);
        expect(tvm.techniqueID).toBe(techniqueID);
        expect(tvm.tactic).toBe(tacticName);
        expect(tvm.comment).toBe('test comment');
        expect(tvm.color).toBe('#ffffff');
        expect(tvm.score).toBe('1');
        expect(tvm.enabled).toBe(true);
        expect(tvm.showSubtechniques).toBe(false);
    });

    it('should handle missing techniqueID field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validTechniqueVMRep, undefined, tacticName);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle missing techniqueVM', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let technique_list: Technique[] = [];
        let t1 = new Technique(MockData.T0000, [], null);
        technique_list.push(t1);
        let tactic1 = new Tactic(MockData.TA0000, technique_list, null);
        expect(() => {
            vm1.getTechniqueVM(t1, tactic1);
        }).toThrow(new Error('technique VM not found: T0000, TA0000'));
        expect(() => {
            vm1.getTechniqueVM_id('T0000^tactic-name');
        }).toThrow(new Error('technique VM not found: T0000^tactic-name'));
    });

    it('should handle missing tactic field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(window, 'alert');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validTechniqueVMRep, techniqueID, undefined);
        expect(console.error).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalled();
    });

    it('should handle missing techniqueID and tactic field', () => {
        let tvm = new TechniqueVM(ttid);
        tvm.techniqueID = undefined;
        tvm.tactic = undefined;
        spyOn(window, 'alert');
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        tvm.deserialize(validTechniqueVMRep, undefined, undefined);
        expect(console.error).toHaveBeenCalledTimes(3);
        expect(window.alert).toHaveBeenCalled();
    });

    it('should handle non-string comment field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": 10,"color": "#ffffff", "score": 1,"enabled": true,"showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.comment).toBe('');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-string color field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": 10, "score": 1,"enabled": true,"showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.color).toBe('');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-number score field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": "#ffffff", "score": "1","enabled": true,"showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.score).toBe('');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean enabled field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": "#ffffff", "score": 1,"enabled": "true","showSubtechniques": false}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.enabled).toBe(true);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean showSubtechniques field', () => {
        let tvm = new TechniqueVM(ttid);
        spyOn(console, 'error');
        spyOn(TechniqueVM.prototype, 'deserialize').and.callThrough();
        const invalidRep = '{"comment": "test comment","color": "#ffffff", "score": 1,"enabled": true,"showSubtechniques": "false"}';
        tvm.deserialize(invalidRep, techniqueID, tacticName);
        expect(tvm.showSubtechniques).toBe(false);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle invalid layout option', () => {
        let options = new LayoutOptions();
        spyOn(console, 'warn');
        options.layout = 'invalid';
        expect(console.warn).toHaveBeenCalled();
        expect(options.layout).toBe('side');
    });

    it('should restore showName value when switching from mini layout', () => {
        let options = new LayoutOptions();
        options.layout = 'mini';
        expect(options.showName).toBe(false);
        options.layout = 'side';
        expect(options.showName).toBe(true);
    });

    it('should handle invalid aggregate function option', () => {
        let options = new LayoutOptions();
        spyOn(console, 'warn');
        options.aggregateFunction = 'invalid';
        expect(console.warn).toHaveBeenCalled();
        expect(options.aggregateFunction).toBe('average');
    });

    it('should restore default layout if showID is selected', () => {
        let options = new LayoutOptions();
        options.layout = 'mini';
        expect(options.showID).toBe(false);
        options.showID = true;
        expect(options.showID).toBe(true);
        expect(options.layout).toBe('side');
    });

    it('should restore default layout if showName is selected', () => {
        let options = new LayoutOptions();
        options.layout = 'mini';
        expect(options.showName).toBe(false);
        options.showName = true;
        expect(options.showName).toBe(true);
        expect(options.layout).toBe('side');
    });

    it('should handle invalid expanded subtechnique option', () => {
        let options = new LayoutOptions();
        spyOn(console, 'warn');
        options.expandedSubtechniques = 'invalid';
        expect(console.warn).toHaveBeenCalled();
        expect(options.expandedSubtechniques).toBe('none');
    });

    const validLayoutOptionsRep = {
        showID: true,
        showName: true,
        layout: 'side',
        aggregateFunction: 'min',
        showAggregateScores: true,
        countUnscored: false,
        expandedSubtechniques: 'all',
    };

    it('should deserialize LayoutOptions correctly with valid input', () => {
        let options = new LayoutOptions();
        let deserializeSpy = spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        options.deserialize(validLayoutOptionsRep);
        expect(deserializeSpy).toHaveBeenCalledOnceWith(validLayoutOptionsRep);
        expect(options.showID).toBe(true);
        expect(options.showName).toBe(true);
        expect(options.layout).toBe('side');
        expect(options.aggregateFunction).toBe('min');
        expect(options.showAggregateScores).toBe(true);
        expect(options.countUnscored).toBe(false);
        expect(options.expandedSubtechniques).toBe('all');
    });

    it('should handle non-boolean showID field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: 'true',
            showName: true,
            layout: 'side',
            aggregateFunction: 'min',
            showAggregateScores: true,
            countUnscored: false,
            expandedSubtechniques: 'all',
        };
        options.deserialize(invalidRep);
        expect(options.showID).toBe(false);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean showName field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: true,
            showName: 'true',
            layout: 'side',
            aggregateFunction: 'min',
            showAggregateScores: true,
            countUnscored: false,
            expandedSubtechniques: 'all',
        };
        options.deserialize(invalidRep);
        expect(options.showName).toBe(true);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-string layout field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: true,
            showName: true,
            layout: 10,
            aggregateFunction: 'min',
            showAggregateScores: true,
            countUnscored: false,
            expandedSubtechniques: 'all',
        };
        options.deserialize(invalidRep);
        expect(options.layout).toBe('side');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-string aggregateFunction field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: true,
            showName: true,
            layout: 'side',
            aggregateFunction: 10,
            showAggregateScores: true,
            countUnscored: false,
            expandedSubtechniques: 'all',
        };
        options.deserialize(invalidRep);
        expect(options.aggregateFunction).toBe('average');
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean showAggregateScores field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: true,
            showName: true,
            layout: 'side',
            aggregateFunction: 'min',
            showAggregateScores: 'true',
            countUnscored: false,
            expandedSubtechniques: 'all',
        };
        options.deserialize(invalidRep);
        expect(options.showAggregateScores).toBe(false);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-boolean countUnscored field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: true,
            showName: true,
            layout: 'side',
            aggregateFunction: 'min',
            showAggregateScores: true,
            countUnscored: 'false',
            expandedSubtechniques: 'all',
        };
        options.deserialize(invalidRep);
        expect(options.countUnscored).toBe(false);
        expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-string expandedSubtechniques field', () => {
        let options = new LayoutOptions();
        spyOn(console, 'error');
        spyOn(LayoutOptions.prototype, 'deserialize').and.callThrough();
        const invalidRep = {
            showID: true,
            showName: true,
            layout: 'side',
            aggregateFunction: 'min',
            showAggregateScores: true,
            countUnscored: false,
            expandedSubtechniques: true,
        };
        options.deserialize(invalidRep);
        expect(options.expandedSubtechniques).toBe('none');
        expect(console.error).toHaveBeenCalled();
    });

    it('should throw errors for deserializing domain version', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let viewmodel_error_file1 = {
            versions: {
                attack: 6,
            },
        };
        let consoleSpy = spyOn(console, 'error');
        vm1.deserializeDomainVersionID(JSON.stringify(viewmodel_error_file1));
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('should test versions for layer format 3', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let viewmodel_version_file1 = {
            version: 6,
        };
        expect(vm1.deserializeDomainVersionID(JSON.stringify(viewmodel_version_file1))).toEqual('6');
    });

    it('should test patch for old domain name convention', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let viewmodel_version_file1 = {
            domain: 'mitre-enterprise',
        };
        vm1.deserializeDomainVersionID(JSON.stringify(viewmodel_version_file1));
        expect(vm1.domainVersionID).toEqual('enterprise-attack-13');
    });

    it('should check values', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        let l1 = new Link();
        l1.label = 'test1';
        l1.url = 't1';
        let l2 = new Link();
        tvm_1.links = [l1, l2];
        let m2 = new Metadata();
        m2.name = 'test1';
        m2.value = 't1';
        m2.divider = true;
        tvm_1.metadata = [m2];
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.activeTvm = tvm_2;
        vm1.checkValues(true, 'T0000^tactic-name');
        expect(vm1.linksMatch).toEqual(false); // linkMismatches = ["T0000^tactic-name"]
        vm1.activeTvm = tvm_1;
        vm1.checkValues(false, 'T0000^tactic-name');
        expect(vm1.linksMatch).toEqual(true); // linkMismatches = []
        vm1.activeTvm = tvm_1;
        vm1.selectAllTechniques(); // select all techniques
        vm1.checkValues(false, 'T0000^tactic-name');
        expect(vm1.linksMatch).toEqual(false); // linkMismatches = ["T0000^tactic-name"]
    });

    it('should load vm data with custom url', () => {
        let vm1 = viewModelsService.newViewModel('test1', 'enterprise-attack-13');
        vm1.dataService.domains[0].urls = ['https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json'];
        vm1.dataService.domains[0].isCustom = true;
        expect(vm1.loadVMData()).toBeUndefined();
    });
});
