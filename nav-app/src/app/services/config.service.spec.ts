import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import * as MockData from '../../tests/utils/mock-data';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ConfigService', () => {
    let service: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ConfigService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        });
        service = TestBed.inject(ConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set feature object', () => {
        expect(service.setFeature_object(MockData.configTechniqueControls)).toEqual(['disable_techniques', 'manual_color', 'background_color']);
    });

    it('should set single feature to given value', () => {
        expect(service.setFeature('sticky_toolbar', true)).toEqual(['sticky_toolbar']);
    });

    it('should get feature', () => {
        service.setFeature('sticky_toolbar', true);
        expect(service.getFeature('sticky_toolbar')).toBeTruthy();
    });

    it('should get feature group', () => {
        expect(service.getFeatureGroup('technique_controls')).toBeTruthy();
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.getFeatureGroup('technique_controls')).toBeTruthy();
    });

    it('should get feature group count', () => {
        expect(service.getFeatureGroupCount('technique_controls')).toEqual(-1);
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.getFeatureGroupCount('technique_controls')).toEqual(3);
    });

    it('should check if feature exists', () => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.isFeature('disable_techniques')).toBeTruthy();
    });

    it('should check if feature group exists', () => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.isFeatureGroup('technique_controls')).toBeTruthy();
    });

    it('should set features of the given group to provided value', () => {
        service.setFeature_object(MockData.configTechniqueControls);
        expect(service.setFeature('technique_controls', true)).toEqual(['technique_controls']);
    });

    it('should set features of the given group to the value object', () => {
        let value_object = { scoring: true, comments: false };
        expect(service.setFeature('technique_controls', value_object)).toEqual(['scoring', 'comments']);
    });

    it('should get all url fragments', () => {
        let fragments = new Map<string, string>();
        expect(service.getAllFragments()).toEqual(fragments);
        fragments.set('comments', 'false');
        expect(service.getAllFragments('https://mitre-attack.github.io/attack-navigator/#comments=false')).toEqual(fragments);
    });

    it('should set up data in constructor', () => {
        expect(service).toBeTruthy();
    });

    it('should pass validation if only versions is configured', () => {
        expect(() => service.validateConfig(MockData.versionsConfig)).not.toThrow();
    });

    it('should pass validation if only collection index is configured', () => {
        expect(() => service.validateConfig(MockData.collectionIndexConfig)).not.toThrow();
    });

    it('should fail validation if collection_index_url is not a string', () => {
        expect(() => service.validateConfig(MockData.invalidTypeConfig)).toThrowError();
    });

    it('should fail validation if neither versions or collection index are configured', () => {
        expect(() => service.validateConfig(MockData.invalidConfig)).toThrowError();
    });

    it('should return config if validation passes', () => {
        expect(() => service.validateConfig(MockData.customConfig)).not.toThrow();
        expect(service.validateConfig(MockData.customConfig)).toEqual(MockData.customConfig);
    });
});
