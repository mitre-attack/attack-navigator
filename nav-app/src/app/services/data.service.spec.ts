import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Version, VersionChangelog } from '../classes';
import { Asset, Campaign, DataComponent, Domain, Group, Matrix, Mitigation, Note, Software, Tactic, Technique } from '../classes/stix';
import { Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../utils/taxii2lib';
import * as MockData from '../../tests/utils/mock-data';

describe('DataService', () => {
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
        let return$ = {versions: MockData.configData};
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
        service.setUpURLs(MockData.configData);
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
        service.setUpURLs(MockData.workbenchData);
        let domain = service.domains[0];
        expect(service.versions.length).toEqual(1);
        expect(domain).toBeInstanceOf(Domain);
        expect(domain.authentication).toBeTruthy();
        expect(domain.authentication).toEqual(MockData.workbenchData[0].authentication);
    }));

    it('should define TAXII connection', inject([DataService], (service: DataService) => {
        service.setUpURLs(MockData.taxiiData);
        let domain = service.domains[0];
        expect(service.versions.length).toEqual(1);
        expect(domain).toBeInstanceOf(Domain);
        expect(domain.taxii_url).toBeTruthy();
        expect(domain.taxii_url).toEqual(MockData.taxiiData[0].domains[0].taxii_url);
        expect(domain.taxii_collection).toBeTruthy();
        expect(domain.taxii_collection).toEqual(MockData.taxiiData[0].domains[0].taxii_collection);
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
        service.setUpURLs(MockData.configData);
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should fetch domain data via TAXII', inject([DataService], (service: DataService) => {
        let functionSpy = spyOn(Collection.prototype, 'getObjects').and.returnValue(Promise.resolve([]))
        service.setUpURLs(MockData.taxiiData);
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
        expect(functionSpy).toHaveBeenCalled();
    }));

    it('should fetch domain data via Workbench', inject([DataService], (service: DataService) => {
        service.setUpURLs(MockData.workbenchData);
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should resolve with data loaded', inject([DataService], async (service: DataService) => {
        service.setUpURLs(MockData.configData);
        let domain = service.domains[0];
        domain.dataLoaded = true;
        await expectAsync(service.loadDomainData(domain.id, false)).toBeResolved();
    }));

    it('should resolve after data loaded', inject([DataService], async (service: DataService) => {
        service.setUpURLs(MockData.configData);
        let domain = service.domains[0];
        let functionSpy = spyOn(service, 'getDomainData').and.returnValue(of(MockData.stixBundleSDO));
        DataService.prototype.subscription = new Subscription;
        spyOn(DataService.prototype.subscription, 'unsubscribe');
        await expectAsync(service.loadDomainData(domain.id, false)).toBeResolved();
        expect(functionSpy).toHaveBeenCalledOnceWith(domain, false);
    }));

    it('should reject with invalid domain', inject([DataService], async (service: DataService) => {
        let functionSpy = spyOn(service, 'getDomain').and.returnValue(undefined);
        service.setUpURLs(MockData.configData);
        let domainId = 'enterprise-attack-4';
        await expectAsync(service.loadDomainData(domainId)).toBeRejected();
        expect(functionSpy).toHaveBeenCalledOnceWith(domainId);
    }));

    it('should not get technique in domain', inject([DataService], (service: DataService) => {
        service.setUpURLs(MockData.configData);
        let result = service.getTechnique('T0000', service.domains[0].id);
        expect(result).toBeFalsy();
    }));

    it('should get technique in domain', inject([DataService], (service: DataService) => {
        service.setUpURLs(MockData.configData);
        service.domains[0].techniques = [new Technique(MockData.T0000, [], service)];
        let result = service.getTechnique('T0000', service.domains[0].id);
        expect(result).toBeTruthy();
        expect(result).toBeInstanceOf(Technique);
        expect(result.attackID).toEqual('T0000');
    }));

    it('should test software', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        service.domains[0].relationships['software_uses'].set('malware-0',['attack-pattern-0']);
        let software_test = new Software(MockData.malwareS0000, service);
        expect(software_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        software_test = new Software(MockData.M0000, service); // should return empty list because 'malware-0' is not in softwareUsesTechnique
        expect(software_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test mitigation', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        service.domains[0].relationships['mitigates'].set('mitigation-0',['attack-pattern-0']);
        let mitigation_test = new Mitigation(MockData.M0000, service);
        expect(mitigation_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        mitigation_test = new Mitigation(MockData.malwareS0000, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(mitigation_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test asset', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        let asset_test = new Asset(MockData.A0000, service);
        expect(asset_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        asset_test = new Asset(MockData.malwareS0000, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(asset_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test campaign', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        service.domains[0].relationships['campaign_uses'].set('campaign-0',['attack-pattern-0']);
        let campaign_test = new Campaign(MockData.C0000, service);
        expect(campaign_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        campaign_test = new Campaign(MockData.malwareS0000, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(campaign_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test data components', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        let t1 = new Technique(MockData.T0000, [], service);
        service.domains[0].techniques = [t1];
        let data_component_test = new DataComponent(MockData.DC0000, service);
        service.domains[0].dataSources.set(MockData.DC0000.id, { name: MockData.stixSDO.name, external_references: MockData.DC0000.external_references });
        expect(data_component_test.source('enterprise-attack-13')).toEqual({name: '', url: ''});
        service.domains[0].dataSources.set(MockData.DS0000.id, { name: MockData.stixSDO.name, external_references: MockData.DC0001.external_references });
        expect(data_component_test.source('enterprise-attack-13')).toEqual({name: 'Name', url: 'test-url.com'});
        service.domains[0].relationships['component_rel'].set('data-component-0',['attack-pattern-0']);
        expect(data_component_test.techniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
    }));

    it('should test group', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        service.domains[0].relationships['group_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['campaign_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0',['intrusion-set-0']);
        let group_test = new Group(MockData.G0000, service);
        expect(group_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
        group_test = new Group(MockData.malwareS0000, service); // should return empty list because 'mitigation-0' is not in mitigationMitigates
        expect(group_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
    }));

    it('should test stixObject', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        let stixObject_test = new Campaign(MockData.G0000, service);
        let group_test = new Group(MockData.G0001, service);
        service.domains[0].relationships['revoked_by'].set('relationship-9',['attack-pattern-1']);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        expect(stixObject_test.revoked_by('enterprise-attack-13')).toBeUndefined();
        service.domains[0].relationships['revoked_by'].set('intrusion-set-0',['attack-pattern-1']);
        expect(stixObject_test.revoked_by('enterprise-attack-13')).toEqual(['attack-pattern-1']);
        let campaign_test = new Campaign(MockData.C0000, service);
        expect(campaign_test.compareVersion(group_test)).toEqual(-1);
        let asset_test = new Asset(MockData.invalidAsset, service, false);
        expect(campaign_test.compareVersion(asset_test)).toEqual(0);
        expect(() => {
            new Asset(MockData.invalidAsset, service)
        }).toThrow(new Error('Error: external_references has invalid format in imported StixObject. Read more here: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_72bcfr3t79jx'));
    }));

    it('should test technique', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        let technique_test = new Technique(MockData.T0002,[],service);
        expect(technique_test.get_all_technique_tactic_ids()).toEqual([]);
    }));

    it('should throw error if tactic does not exist', inject([DataService], (service: DataService) => {
        let technique_test = new Technique(MockData.T0001,[],service);
        expect(() => {
            technique_test.get_technique_tactic_id("impact")
        }).toThrow(new Error('impact is not a tactic of T0001'));
    }));

    it('should parse stix bundle', inject([DataService], (service: DataService) => {
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(MockData.configData);
        service.domains[0].relationships['group_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['software_uses'].set('malware-0',['attack-pattern-0']);
        service.domains[0].relationships['campaign_uses'].set('campaign-0',['attack-pattern-0']);
        service.domains[0].relationships['mitigates'].set('mitigation-0',['attack-pattern-0']);
        service.domains[0].relationships['component_rel'].set('component-0',['attack-pattern-0']);
        service.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        let domain = service.domains[0];
        service.parseBundle(domain, MockData.stixBundleSDO);
        // check data loaded
        expect(domain.dataLoaded).toBeTrue();
        expect(domain.platforms).toEqual(MockData.T0000.x_mitre_platforms);

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
        expect(domain.mitigations[0].id).not.toBe(MockData.filteredM0001.id);
        // check deprecated matrix has been skipped
        expect(domain.matrices[0].id).not.toBe(MockData.deprecatedMatrixSDO.id);
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
        service.setUpURLs(MockData.configData);
        let domain = service.domains[0];
        domain.dataLoadedCallbacks = [service.getCurrentVersion];
        service.parseBundle(domain, MockData.stixBundleSDO);
        expect(functionSpy).toHaveBeenCalled();
    }));    

    it('should compare the same version as unchanged', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let domain = service.domains[0];
        service.parseBundle(domain, MockData.stixBundleSDO);

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
            "domains": MockData.configData[0].domains
        };
        service.setUpURLs([MockData.configData[0], newVersion]);

        // should have two domains/versions
        expect(service.domains.length).toEqual(2);

        // parse stix bundles into old domain
        let [oldDomain, newDomain] = service.domains;
        service.parseBundle(oldDomain, MockData.stixBundleSDO);
        expect(oldDomain.dataLoaded).toBeTrue();
    
        // deprecation
        let deprecateSubtechnique = { ...MockData.T0000_000 };
        deprecateSubtechnique["x_mitre_deprecated"] = true;
        deprecateSubtechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // revocation
        let revokeTechnique = { ...MockData.T0001 };
        revokeTechnique["revoked"] = true;
        revokeTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // minor change
        let minorTechnique = { ...MockData.T0000 };
        minorTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // major change
        let majorTechnique = { ...MockData.T0003 };
        majorTechnique["x_mitre_version"] = "2.0";
        majorTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // update deprecated object
        let deprecatedTechnique = { ...MockData.T0002 };
        deprecatedTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // update revoked object
        let revokedSubtechnique = { ...MockData.T0000_001 };
        revokedSubtechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // parse stix bundle into new domain
        service.parseBundle(newDomain, [{
            "type": "bundle",
            "id": "bundle--1",
            "spec_version": "2.0",
            "objects": [
                MockData.T0004, minorTechnique, revokeTechnique, deprecatedTechnique,
                deprecateSubtechnique,revokedSubtechnique, majorTechnique,
                MockData.A0000, MockData.C0000, MockData.DC0000, MockData.DS0000, MockData.G0000, MockData.matrixSDO,
                MockData.M0000, MockData.note, MockData.malwareS0000, MockData.toolS0001, MockData.TA0000,
                MockData.G0001usesT0000, MockData.S0000usesT0000, MockData.C0000usesT0000,
                MockData.C0000attributedToG0000, MockData.M0000mitigatesT0000, MockData.T0000_000subtechniqueOfT0000,
                MockData.T0000_001subtechniqueOfT0000, MockData.DC0000detectsT0000, MockData.T0000targetsA0000,
                MockData.T0000_001revokedByT0000_000, MockData.filteredM0001, MockData.deprecatedMatrixSDO,
                MockData.G0000usesT0000_000, MockData.S0000usesT0000_000, MockData.C0000usesT0000_000,
                MockData.M0000mitigatesT0000_000, MockData.DC0000detectsT0000_000,
                MockData.C0001attributedToG0000, MockData.C0001, MockData.T0001targetsA0000, MockData.T0001_Duplicate,
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
