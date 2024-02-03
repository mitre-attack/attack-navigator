import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { Subscription, of } from 'rxjs';
import * as MockData from '../../tests/utils/mock-data';

describe('ConfigService', () => {
    let config = {
        "banner":"",
        "comment_color":"yellow",
        "custom_context_menu_items": [
            {
                "label": "view technique on ATT&CK website",
                "url": "https://attack.mitre.org/techniques/{{technique_attackID}}",
                "subtechnique_url": "https://attack.mitre.org/techniques/{{parent_technique_attackID}}/{{subtechnique_attackID_suffix}}"
            }
        ],
        "features": [
            {"name": "leave_site_dialog", "enabled": true, "description": "Disable to remove the dialog prompt when leaving site."},
            {"name": "comments", "enabled": true, "description": "Disable to remove the ability to add comments to techniques."},
        ],
        "link_color": "blue",
        "metadata_color":"purple",
        "versions": [{"name": 'ATT&CK v13', "version": '13', "domains": ["Enterprise"]}]
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService],
        });
    });

    it('should be created', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));

    it('should set up data in constructor', inject([ConfigService], (service: ConfigService) => {
        service.dataService.setUpURLs(MockData.configDataExtended);
        spyOn(DataService.prototype, 'getConfig').and.returnValue(of(config));
        let fragments = new Map<string, string>();
        fragments.set("comments", "false"); //'https://mitre-attack.github.io/attack-navigator/#comments=false'
        spyOn(ConfigService.prototype, "getAllFragments").and.returnValue(fragments);
        ConfigService.prototype.subscription = new Subscription;
        const unsubscribeSpy = spyOn(ConfigService.prototype.subscription, 'unsubscribe');
        let cs = new ConfigService(service.dataService);
		expect(cs).toBeTruthy();
        expect(unsubscribeSpy).toHaveBeenCalled();
    }));

    it('should set feature object', inject([ConfigService], (service: ConfigService) => {
        expect(service.setFeature_object(MockData.configTechniqueControls)).toEqual([ 'disable_techniques', 'manual_color', 'background_color' ]);
    }));

    it('should set single feature to given value', inject([ConfigService], (service: ConfigService) => {
        expect(service.setFeature("sticky_toolbar", true)).toEqual(["sticky_toolbar"]);
    }));

    it('should get feature', inject([ConfigService], (service: ConfigService) => {
        service.setFeature("sticky_toolbar", true);
        expect(service.getFeature("sticky_toolbar")).toBeTruthy();
    }));

    it('should get feature group', inject([ConfigService], (service: ConfigService) => {
        expect(service.getFeatureGroup("technique_controls")).toBeTruthy();
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.getFeatureGroup("technique_controls")).toBeTruthy();
    }));

    it('should get feature group count', inject([ConfigService], (service: ConfigService) => {
        expect(service.getFeatureGroupCount("technique_controls")).toEqual(-1);
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.getFeatureGroupCount("technique_controls")).toEqual(3);
    }));

    it('should get all features', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls);
        service.setFeature_object(MockData.configToolbarControls);
        expect(service.getFeatures()).toEqual([ 'disable_techniques', 'manual_color', 'background_color', 'sticky_toolbar' ] );
    }));

    it('should get all feature groups', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls);
        service.setFeature_object(MockData.configToolbarControls);
        expect(service.getFeatureGroups()).toEqual(["technique_controls", "toolbar_controls"] );
    }));

    it('should check if feature exists', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls)
        expect(service.isFeature('disable_techniques')).toBeTruthy();
    }));

    it('should check if feature group exists', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls)
        expect(service.isFeatureGroup("technique_controls")).toBeTruthy();
    }));

    it('should get feature list', inject([ConfigService], (service: ConfigService) => {
        expect(service.getFeatureList()).toEqual([]);
        service.featureStructure = [{"name": "sticky_toolbar", "enabled": true}]
        expect(service.getFeatureList()).toEqual([{"name": "sticky_toolbar", "enabled": true}]);
    }));

    it('should set features of the given group to provided value', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.setFeature("technique_controls", true)).toEqual(["technique_controls"]);
    }));

    it('should set features of the given group to the value object', inject([ConfigService], (service: ConfigService) => {
        let value_object = {"scoring": true,"comments": false}
        expect(service.setFeature("technique_controls",value_object)).toEqual(['scoring', 'comments'])
    }));

    it('should get all url fragments', inject([ConfigService], (service: ConfigService) => {
        let fragments = new Map<string, string>();
        expect(service.getAllFragments()).toEqual(fragments);
        fragments.set("comments","false")
        expect(service.getAllFragments('https://mitre-attack.github.io/attack-navigator/#comments=false')).toEqual(fragments);
    }));

    it('should set up data in constructor', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));
});
