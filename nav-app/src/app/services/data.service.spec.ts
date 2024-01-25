import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Version, VersionChangelog } from '../classes';
import { Asset, Campaign, DataComponent, Domain, Group, Matrix, Mitigation, Note, Software, Tactic, Technique } from '../classes/stix';
import { Observable, Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../utils/taxii2lib';

describe('DataService', () => {
    let configData: any[] = [{
        "name": "ATT&CK v13",
        "version": "13",
        "domains": [{
            "name": "Enterprise",
            "identifier": "enterprise-attack",
            "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
        }]
    }];

    let taxiiData = [{
        "name": "ATT&CK v13",
        "version": "13",
        "domains": [{
            "name": "Enterprise",
            "identifier": "enterprise-attack",
            "taxii_url": "https://cti-taxii.mitre.org/",
            "taxii_collection": "95ecc380-afe9-11e4-9b6c-751b66dd541e"
        }]
    }];

    let workbenchData = [{
        ...configData[0],
        "authentication": {
            "enabled": true,
            "serviceName": "navigator",
            "apiKey": "sample-navigator-apikey"
        },
    }];

    let stixSDO = {
        "name": "Name",
        "description": "Description",
        "created": "2001-01-01T01:01:00.000Z",
        "modified": "2001-01-01T01:01:00.000Z",
        "version": "1.0",
        "x_mitre_version": "1.0"
    }

    let stixSDO1 = {
        "name": "Name",
        "description": "Description",
        "created": "2001-01-01T01:01:00.000Z",
        "modified": "2001-01-01T01:01:00.000Z",
        "version": "1.0",
        "x_mitre_version": "1.1"
    }

    let stixSDO2 = {
        "name": "Name",
        "description": "Description",
        "created": "2001-01-01T01:01:00.000Z",
        "modified": "2001-01-01T01:01:00.000Z",
        "version": "1.0"
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

    // ATT&CK objects
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
    let t0001 = {
        ...techniqueSDO,
        "id": "attack-pattern-3",
        "external_references": [{"external_id": "T0001"}],
    }
    let t0002 = {
        ...techniqueSDO,
        "id": "attack-pattern-4",
        "x_mitre_data_sources": [
            "Network Traffic: Network Traffic Content"
        ],
        "x_mitre_deprecated": true,
        "external_references": [{"external_id": "T0002"}],
    }
    let t0003 = {
        ...techniqueSDO,
        "id": "attack-pattern-5",
        "external_references": [{"external_id": "T0003"}],
    }
    let t0001Duplicate = {
        ...techniqueSDO,
        "id": "attack-pattern-0",
        "external_references": [{"external_id": "T0000"}],
    }
    let asset = {
        ...stixSDO,
        "id": "asset-0",
        "type": "x-mitre-asset",
        "external_references": [{"external_id": "A0000"}]
    }
    let asset2 = {
        ...stixSDO2,
        "id": "asset-0",
        "type": "x-mitre-asset",
        "external_references": []
    }
    let c0000 = {
        ...stixSDO,
        "id": "campaign-0",
        "type": "campaign",
        "external_references": [{"external_id": "C0000"}]
    }
    let c0001 = {
        ...stixSDO,
        "id": "campaign-1",
        "type": "campaign",
        "external_references": [{"external_id": "C0001"}]
    }
    let dataComponent = {
        ...stixSDO,
        "id": "data-component-0",
        "type": "x-mitre-data-component",
        "x_mitre_data_source_ref": "data-source-0",
        "external_references": [{"external_id": "DC0000"}]
    }
    let dataComponent1 = {
        ...stixSDO,
        "id": "data-component-0",
        "type": "x-mitre-data-component",
        "x_mitre_data_source_ref": "data-source-0",
        "external_references": [{"external_id": "DC0000", "url": "test1.com"}]
    }
    let dataSource = {
        ...stixSDO,
        "id": "data-source-0",
        "type": "x-mitre-data-source",
        "external_references": [{"external_id": "DS0000"}]
    }
    let group = {
        ...stixSDO,
        "id": "intrusion-set-0",
        "type": "intrusion-set",
        "external_references": [{"external_id": "G0000"}]
    }
    let group2 = {
        ...stixSDO1,
        "id": "intrusion-set-0",
        "type": "intrusion-set",
        "external_references": [{"external_id": "G0000"}]
    }
    let matrix = {
        ...stixSDO,
        "id": "matrix-0",
        "type": "x-mitre-matrix",
        "tactic_refs": ["tactic-0"],
        "external_references": [{"external_id": "enterprise-matrix"}]
    }
    let deprecatedMatrix = {
        ...stixSDO,
        "id": "matrix-1",
        "type": "x-mitre-matrix",
        "tactic_refs": ["tactic-0"],
        "x_mitre_deprecated": true,
        "external_references": [{"external_id": "mobile-matrix"}]
    }
    let mitigation = {
        ...stixSDO,
        "id": "mitigation-0",
        "type": "course-of-action",
        "external_references": [{"external_id": "M0000"}]
    }
    let note = {
        ...stixSDO,
        "id": "note-0",
        "type": "note"
    }
    let malware = {
        ...stixSDO,
        "id": "malware-0",
        "type": "malware",
        "x_mitre_platforms": ["platform"],
        "external_references": [{"external_id": "S0000"}]
    }
    let tool = {
        ...stixSDO,
        "id": "tool-0",
        "type": "tool",
        "x_mitre_platforms": ["platform"],
        "external_references": [{"external_id": "S0001"}]
    }
    let tactic = {
        ...stixSDO,
        "id": "tactic-0",
        "type": "x-mitre-tactic",
        "x_mitre_shortname": "tactic-name",
        "external_references": [{"external_id": "TA0000"}]
    }
    let filteredMitigation = {
        ...stixSDO,
        "id": "mitigation-1",
        "type": "course-of-action",
        "x_mitre_domains": ["not-enterprise-matrix"],
        "external_references": [{"external_id": "M0001"}]
    }
    // Relationships
    let groupUsesT0000 = {
        "id": "relationship-0",
        "type": "relationship",
        "source_ref": "intrusion-set-0",
        "relationship_type": "uses",
        "target_ref": "attack-pattern-0"
    }
    let softwareUsesT0000 = {
        "id": "relationship-1",
        "type": "relationship",
        "source_ref": "malware-0",
        "relationship_type": "uses",
        "target_ref": "attack-pattern-0"
    }
    let campaignUsesT0000 = {
        "id": "relationship-2",
        "type": "relationship",
        "source_ref": "campaign-0",
        "relationship_type": "uses",
        "target_ref": "attack-pattern-0"
    }
    let c0000AttributedToGroup = {
        "id": "relationship-3",
        "type": "relationship",
        "source_ref": "campaign-0",
        "relationship_type": "attributed-to",
        "target_ref": "intrusion-set-0"
    }
    let mitigationMitigatesT000 = {
        "id": "relationship-4",
        "type": "relationship",
        "source_ref": "mitigation-0",
        "relationship_type": "mitigates",
        "target_ref": "attack-pattern-0"
    }
    let subtechniqueOf_000 = {
        "id": "relationship-5",
        "type": "relationship",
        "source_ref": "attack-pattern-1",
        "relationship_type": "subtechnique-of",
        "target_ref": "attack-pattern-0"
    }
    let componentDetectsT0000 = {
        "id": "relationship-6",
        "type": "relationship",
        "source_ref": "data-component-0",
        "relationship_type": "detects",
        "target_ref": "attack-pattern-0"
    }
    let t0000TargetsAsset = {
        "id": "relationship-7",
        "type": "relationship",
        "source_ref": "attack-pattern-0",
        "relationship_type": "targets",
        "target_ref": "asset-0"
    }
    let subtechniqueOf_001 = {
        "id": "relationship-8",
        "type": "relationship",
        "source_ref": "attack-pattern-2",
        "relationship_type": "subtechnique-of",
        "target_ref": "attack-pattern-0"
    }
    let techniqueRevokedBy = {
        "id": "relationship-9",
        "type": "relationship",
        "source_ref": "attack-pattern-2",
        "relationship_type": "revoked-by",
        "target_ref": "attack-pattern-1"
    }
    let groupUsesT000_000 = {
        "id": "relationship-10",
        "type": "relationship",
        "source_ref": "intrusion-set-0",
        "relationship_type": "uses",
        "target_ref": "attack-pattern-1"
    }
    let softwareUsesT0000_000 = {
        "id": "relationship-11",
        "type": "relationship",
        "source_ref": "malware-0",
        "relationship_type": "uses",
        "target_ref": "attack-pattern-1"
    }
    let campaignUsesT0000_000 = {
        "id": "relationship-12",
        "type": "relationship",
        "source_ref": "campaign-0",
        "relationship_type": "uses",
        "target_ref": "attack-pattern-1"
    }
    let mitigationMitigatesT000_000 = {
        "id": "relationship-13",
        "type": "relationship",
        "source_ref": "mitigation-0",
        "relationship_type": "mitigates",
        "target_ref": "attack-pattern-1"
    }
    let componentDetectsT0000_000 = {
        "id": "relationship-14",
        "type": "relationship",
        "source_ref": "data-component-0",
        "relationship_type": "detects",
        "target_ref": "attack-pattern-1"
    }
    let c0001AttributedToGroup = {
        "id": "relationship-15",
        "type": "relationship",
        "source_ref": "campaign-1",
        "relationship_type": "attributed-to",
        "target_ref": "intrusion-set-0"
    }
    let t0001TargetsAsset = {
        "id": "relationship-16",
        "type": "relationship",
        "source_ref": "attack-pattern-3",
        "relationship_type": "targets",
        "target_ref": "asset-0"
    }
    // stix bundles
    let stixBundles: any[] = [{
        "type": "bundle",
        "id": "bundle-0",
        "spec_version": "2.0",
        "objects": [
            t0000, t0001, t0002, t0000_000, t0000_001, t0003,
            asset, c0000, dataComponent, dataSource, group, matrix,
            mitigation, note, malware, tool, tactic,
            groupUsesT0000, softwareUsesT0000, campaignUsesT0000,
            c0000AttributedToGroup, mitigationMitigatesT000, subtechniqueOf_000,
            subtechniqueOf_001, componentDetectsT0000, t0000TargetsAsset,
            techniqueRevokedBy, filteredMitigation, deprecatedMatrix,
            groupUsesT000_000, softwareUsesT0000_000, campaignUsesT0000_000,
            mitigationMitigatesT000_000, componentDetectsT0000_000,
            c0001AttributedToGroup, c0001, t0001TargetsAsset, t0001Duplicate,
        ]
    }]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService],
        });
    });

    it('should be created', inject([DataService], (service: DataService) => {
        expect(service).toBeTruthy();
    }));

    it('should set up data in constructor', inject([HttpClient], (http: HttpClient) => {
        let return$ = {versions: configData};
        let functionSpy = spyOn(DataService.prototype, 'setUpURLs').and.stub();
        spyOn(DataService.prototype, 'getConfig').and.returnValue(of(return$));
        DataService.prototype.subscription = new Subscription;
        const unsubscribeSpy = spyOn(DataService.prototype.subscription, 'unsubscribe');
        const mockService = new DataService(http);
        expect(mockService).toBeTruthy();
        expect(functionSpy).toHaveBeenCalledOnceWith(return$.versions)
        expect(unsubscribeSpy).toHaveBeenCalled();
    }));

    it('should set up data', inject([DataService], (service: DataService) => {
        service.setUpURLs(configData);
        expect(service.versions).toBeTruthy();
        expect(service.versions.length).toEqual(1);
        let version = service.versions[0];
        expect(version).toBeInstanceOf(Version);
        expect(version.name).toEqual('ATT&CK v13');
        expect(version.number).toEqual('13');
    }));

    it('should set up data on failure to load config', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        expect(service.versions.length).toEqual(1);
        expect(service.versions[0]).toEqual(service.latestVersion);
        expect(service.domains.length).toEqual(3);
        let last = service.domains[service.domains.length - 1];
        expect(last).toBeInstanceOf(Domain);
    }));

    it('should define Workbench authentication', inject([DataService], (service: DataService) => {
        service.setUpURLs(workbenchData);
        let domain = service.domains[0];
        expect(service.versions.length).toEqual(1);
        expect(domain).toBeInstanceOf(Domain);
        expect(domain.authentication).toBeTruthy();
        expect(domain.authentication).toEqual(workbenchData[0].authentication);
    }));

    it('should define TAXII connection', inject([DataService], (service: DataService) => {
        service.setUpURLs(taxiiData);
        let domain = service.domains[0];
        expect(service.versions.length).toEqual(1);
        expect(domain).toBeInstanceOf(Domain);
        expect(domain.taxii_url).toBeTruthy();
        expect(domain.taxii_url).toEqual(taxiiData[0].domains[0].taxii_url);
        expect(domain.taxii_collection).toBeTruthy();
        expect(domain.taxii_collection).toEqual(taxiiData[0].domains[0].taxii_collection);
    }));

    it('should get domainVersionID with latest version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let domainIdentifier = 'enterprise-attack';
        let result = service.getDomainVersionID(domainIdentifier, '');
        let latestVersion = service.versions[0].number;
        expect(result).toEqual(`${domainIdentifier}-${latestVersion}`);
    }));

    it('should get domainVersionID', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let domainIdentifier = 'enterprise-attack';
        let version = '13';
        let result = service.getDomainVersionID(domainIdentifier, version);
        expect(result).toEqual(`${domainIdentifier}-${version}`);
    }));

    it('should get current version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let result = service.getCurrentVersion();
        expect(result.name).toEqual(service.latestVersion.name);
        expect(result.number).toEqual(service.latestVersion.number);
    }));

    it('should not be supported version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let result = service.isSupported('3');
        expect(result).toBeFalse();
    }));

    it('should be a supported version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let version = service.latestVersion.number;
        let result = service.isSupported(version);
        expect(result).toBeTrue();
    }));

    it('should fetch domain data via URL', inject([DataService], (service: DataService) => {
        service.setUpURLs(configData);
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should fetch domain data via TAXII', inject([DataService], (service: DataService) => {
        let functionSpy = spyOn(Collection.prototype, 'getObjects').and.returnValue(Promise.resolve([]))
        service.setUpURLs(taxiiData);
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should fetch domain data via Workbench', inject([DataService], (service: DataService) => {
        service.setUpURLs(workbenchData);
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should resolve with data loaded', inject([DataService], async (service: DataService) => {
        service.setUpURLs(configData);
        let domain = service.domains[0];
        domain.dataLoaded = true;
        await expectAsync(service.loadDomainData(domain.id, false)).toBeResolved();
    }));

    it('should resolve after data loaded', inject([DataService], async (service: DataService) => {
        service.setUpURLs(configData);
        let domain = service.domains[0];
        let functionSpy = spyOn(service, 'getDomainData').and.returnValue(of(stixBundles));
        DataService.prototype.subscription = new Subscription;
        spyOn(DataService.prototype.subscription, 'unsubscribe');
        await expectAsync(service.loadDomainData(domain.id, false)).toBeResolved();
        expect(functionSpy).toHaveBeenCalledOnceWith(domain, false);
    }));

    it('should reject with invalid domain', inject([DataService], async (service: DataService) => {
        let functionSpy = spyOn(service, 'getDomain').and.returnValue(undefined);
        service.setUpURLs(configData);
        let domainId = 'enterprise-attack-4';
        await expectAsync(service.loadDomainData(domainId)).toBeRejected();
        expect(functionSpy).toHaveBeenCalledOnceWith(domainId);
    }));

    it('should not get technique in domain', inject([DataService], (service: DataService) => {
        service.setUpURLs(configData);
        let result = service.getTechnique('T0000', service.domains[0].id);
        expect(result).toBeFalsy();
    }));

    it('should get technique in domain', inject([DataService], (service: DataService) => {
        service.setUpURLs(configData);
        service.domains[0].techniques = [new Technique(t0000, [], service)];
        let result = service.getTechnique('T0000', service.domains[0].id);
        expect(result).toBeTruthy();
        expect(result).toBeInstanceOf(Technique);
        expect(result.attackID).toEqual('T0000');
    }));

    it('should test software', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        service.domains[0].relationships['software_uses'].set('malware-0',['attack-pattern-0']);
        let software_test = new Software(malware, service);
        expect(software_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        software_test = new Software(mitigation, service); // should return empty list because 'malware-0' is not in softwareUsesTechnique
        expect(software_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test mitigation', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        service.domains[0].relationships['mitigates'].set('mitigation-0',['attack-pattern-0']);
        let mitigation_test = new Mitigation(mitigation, service);
        expect(mitigation_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        mitigation_test = new Mitigation(malware, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(mitigation_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test asset', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        let asset_test = new Asset(asset, service);
        expect(asset_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        asset_test = new Asset(malware, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(asset_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test campaign', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        service.domains[0].relationships['campaign_uses'].set('campaign-0',['attack-pattern-0']);
        let campaign_test = new Campaign(c0000, service);
        expect(campaign_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        campaign_test = new Campaign(malware, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(campaign_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test data components', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        let t1 = new Technique(t0000, [], service);
        service.domains[0].techniques = [t1];
        let data_component_test = new DataComponent(dataComponent, service);
        service.domains[0].dataSources.set(dataComponent.id, { name: stixSDO.name, external_references: dataComponent.external_references });
        expect(data_component_test.source('enterprise-attack-13')).toEqual({name: '', url: ''});
        service.domains[0].dataSources.set(dataSource.id, { name: stixSDO.name, external_references: dataComponent1.external_references });
        expect(data_component_test.source('enterprise-attack-13')).toEqual({name: 'Name', url: 'test1.com'});
        service.domains[0].relationships['component_rel'].set('data-component-0',['attack-pattern-0']);
        expect(data_component_test.techniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
    }));

    it('should test group', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        service.domains[0].relationships['group_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['campaign_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0',['intrusion-set-0']);
        let group_test = new Group(group, service);
        expect(group_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        group_test = new Group(malware, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(group_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test stixObject', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        let stixObject_test = new Campaign(group, service);
        let group_test = new Group(group2, service);
        service.domains[0].relationships['revoked_by'].set('relationship-9',['attack-pattern-1']);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        expect(stixObject_test.revoked_by('enterprise-attack-13')).toBeUndefined();
        service.domains[0].relationships['revoked_by'].set('intrusion-set-0',['attack-pattern-1']);
        expect(stixObject_test.revoked_by('enterprise-attack-13')).toEqual(['attack-pattern-1']);
        let campaign_test = new Campaign(c0000, service);
        expect(campaign_test.compareVersion(group_test)).toEqual(-1);
        let asset_test = new Asset(asset2, service, false);
        expect(campaign_test.compareVersion(asset_test)).toEqual(0);
        let alertSpy = spyOn(window, "alert");
        expect(() => {
            new Asset(asset2, service)
        }).toThrow(new Error('Error: external_references has invalid format in imported StixObject. Read more here: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_72bcfr3t79jx'));
    }));

    it('should test technique', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        let technique_test = new Technique(t0002,[],service);
        expect(technique_test.get_all_technique_tactic_ids()).toEqual([]);
    }));

    it('should throw error if tactic does not exist', inject([DataService], (service: DataService) => {
        let technique_test = new Technique(t0001,[],service);
        expect(() => {
            technique_test.get_technique_tactic_id("impact")
        }).toThrow(new Error('impact is not a tactic of T0001'));
    }));

    it('should parse stix bundle', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configData);
        service.domains[0].relationships['group_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['software_uses'].set('malware-0',['attack-pattern-0']);
        service.domains[0].relationships['campaign_uses'].set('campaign-0',['attack-pattern-0']);
        service.domains[0].relationships['mitigates'].set('mitigation-0',['attack-pattern-0']);
        service.domains[0].relationships['component_rel'].set('component-0',['attack-pattern-0']);
        service.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        let domain = service.domains[0];
        service.parseBundle(domain, stixBundles);
        console.log('domain', domain)
        // check data loaded
        expect(domain.dataLoaded).toBeTrue();
        expect(domain.platforms).toEqual(t0000.x_mitre_platforms);

        // check objects parsed
        let testObjectType = function(testArr, quantity, instance) {
            expect(testArr.length).toEqual(quantity);
            expect(testArr[0]).toBeInstanceOf(instance);
        }
        testObjectType(domain.techniques, 4, Technique);
        testObjectType(domain.subtechniques, 2, Technique);
        testObjectType(domain.assets, 1, Asset);
        testObjectType(domain.campaigns, 2, Campaign);
        testObjectType(domain.dataComponents, 1, DataComponent);
        testObjectType(domain.groups, 1, Group);
        testObjectType(domain.matrices, 1, Matrix);
        testObjectType(domain.mitigations, 1, Mitigation);
        testObjectType(domain.notes, 1, Note);
        testObjectType(domain.software, 2, Software);
        testObjectType(domain.tactics, 1, Tactic);
        // check filteredMitigation has been skipped
        expect(domain.mitigations[0].id).not.toBe(filteredMitigation.id);
        // check deprecated matrix has been skipped
        expect(domain.matrices[0].id).not.toBe(deprecatedMatrix.id);
        // check relationships parsed
        let relationships = domain.relationships;
        expect(relationships['campaign_uses'].size).toEqual(1);
        expect(relationships['campaigns_attributed_to'].size).toEqual(1);
        expect(relationships['component_rel'].size).toEqual(2);
        expect(relationships['group_uses'].size).toEqual(1);
        expect(relationships['mitigates'].size).toEqual(1);
        expect(relationships['revoked_by'].size).toEqual(1);
        expect(relationships['software_uses'].size).toEqual(1);
        expect(relationships['subtechniques_of'].size).toEqual(1);
        expect(relationships['targeted_assets'].size).toEqual(1);
    }));

    it('should update domain watchers', inject([DataService], (service: DataService) => {
        let functionSpy = spyOn(service, 'getCurrentVersion');
        service.setUpURLs(configData);
        let domain = service.domains[0];
        domain.dataLoadedCallbacks = [service.getCurrentVersion];
        service.parseBundle(domain, stixBundles);
        expect(functionSpy).toHaveBeenCalled();
    }));    

    it('should compare the same version as unchanged', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let domain = service.domains[0];
        service.parseBundle(domain, stixBundles);

        let result = service.compareVersions(domain.id, domain.id);
        expect(result).toBeInstanceOf(VersionChangelog);
        expect(result.newDomainVersionID).toEqual(domain.id);
        expect(result.oldDomainVersionID).toEqual(domain.id);
        expect(result.unchanged.length).toEqual(4);
    }));

    it('should compare versions', inject([DataService], (service: DataService) => {
        let newVersion = {
            "name": "ATT&CK v14",
            "version": "14",
            "domains": configData[0].domains
        };
        service.setUpURLs([configData[0], newVersion]);

        // should have two domains/versions
        expect(service.domains.length).toEqual(2);

        // parse stix bundles into old domain
        let [oldDomain, newDomain] = service.domains;
        service.parseBundle(oldDomain, stixBundles);
        expect(oldDomain.dataLoaded).toBeTrue();
    
        // deprecation
        let deprecateSubtechnique = { ...t0000_000 };
        deprecateSubtechnique["x_mitre_deprecated"] = true;
        deprecateSubtechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // revocation
        let revokeTechnique = { ...t0001 };
        revokeTechnique["revoked"] = true;
        revokeTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // new object added
        let t0004 = {
            ...techniqueSDO,
            "id": "attack-pattern-6",
            "modified": "2002-01-01T01:01:00.000Z",
            "external_references": [{"external_id": "T0004"}],
        }
        // minor change
        let minorTechnique = { ...t0000 };
        minorTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // major change
        let majorTechnique = { ...t0003 };
        majorTechnique["x_mitre_version"] = "2.0";
        majorTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // update deprecated object
        let deprecatedTechnique = { ...t0002 };
        deprecatedTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // update revoked object
        let revokedSubtechnique = { ...t0000_001 };
        revokedSubtechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // parse stix bundle into new domain
        service.parseBundle(newDomain, [{
            "type": "bundle",
            "id": "bundle--1",
            "spec_version": "2.0",
            "objects": [
                t0004, minorTechnique, revokeTechnique, deprecatedTechnique,
                deprecateSubtechnique,revokedSubtechnique, majorTechnique,
                asset, c0000, dataComponent, dataSource, group, matrix,
                mitigation, note, malware, tool, tactic,
                groupUsesT0000, softwareUsesT0000, campaignUsesT0000,
                c0000AttributedToGroup, mitigationMitigatesT000, subtechniqueOf_000,
                subtechniqueOf_001, componentDetectsT0000, t0000TargetsAsset,
                techniqueRevokedBy, filteredMitigation, deprecatedMatrix,
                groupUsesT000_000, softwareUsesT0000_000, campaignUsesT0000_000,
                mitigationMitigatesT000_000, componentDetectsT0000_000,
                c0001AttributedToGroup, c0001, t0001TargetsAsset, t0001Duplicate,
            ]
        }]);
        // compare versions
        let result = service.compareVersions(oldDomain.id, newDomain.id);
        console.log(result)
        // validate comparison result
        expect(result).toBeInstanceOf(VersionChangelog);
        expect(result.newDomainVersionID).toEqual(newDomain.id);
        expect(result.oldDomainVersionID).toEqual(oldDomain.id);
        // validate parsed changes
        expect(result.additions.length).toEqual(1);
        expect(result.changes.length).toEqual(1);
        expect(result.deprecations.length).toEqual(1);
        expect(result.minor_changes.length).toEqual(1);
        expect(result.revocations.length).toEqual(1);
        expect(result.unchanged.length).toEqual(0);
    }));
});
