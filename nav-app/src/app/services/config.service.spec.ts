import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import * as MockData from '../../tests/utils/mock-data';

describe('ConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService],
        });
    });

    it('should be created', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));

    it('should set feature object', inject([ConfigService], (service: ConfigService) => {
        expect(service.setFeature_object(MockData.configTechniqueControls)).toEqual(['disable_techniques', 'manual_color', 'background_color']);
    }));

    it('should set single feature to given value', inject([ConfigService], (service: ConfigService) => {
        expect(service.setFeature('sticky_toolbar', true)).toEqual(['sticky_toolbar']);
    }));

    it('should get feature', inject([ConfigService], (service: ConfigService) => {
        service.setFeature('sticky_toolbar', true);
        expect(service.getFeature('sticky_toolbar')).toBeTruthy();
    }));

    it('should get feature group', inject([ConfigService], (service: ConfigService) => {
        expect(service.getFeatureGroup('technique_controls')).toBeTruthy();
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.getFeatureGroup('technique_controls')).toBeTruthy();
    }));

    it('should get feature group count', inject([ConfigService], (service: ConfigService) => {
        expect(service.getFeatureGroupCount('technique_controls')).toEqual(-1);
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.getFeatureGroupCount('technique_controls')).toEqual(3);
    }));

    it('should check if feature exists', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.isFeature('disable_techniques')).toBeTruthy();
    }));

    it('should check if feature group exists', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.isFeatureGroup('technique_controls')).toBeTruthy();
    }));

    it('should set features of the given group to provided value', inject([ConfigService], (service: ConfigService) => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.setFeature('technique_controls', true)).toEqual(['technique_controls']);
    }));

    it('should set features of the given group to the value object', inject([ConfigService], (service: ConfigService) => {
        let value_object = { scoring: true, comments: false };
        expect(service.setFeature('technique_controls', value_object)).toEqual(['scoring', 'comments']);
    }));

    it('should get all url fragments', inject([ConfigService], (service: ConfigService) => {
        let fragments = new Map<string, string>();
        fragments.set('comments', 'false');
		Object.defineProperty(window.location, 'href', {
			get: () => 'https://mitre-attack.github.io/attack-navigator/#comments=false'
		});
        expect(service.getAllFragments()).toEqual(fragments);
    }));

    it('should set up data in constructor', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));
});
