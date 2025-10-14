import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Domain, Version, VersionChangelog } from '../classes';
import { Asset, Campaign, DataComponent, Group, Matrix, Mitigation, Note, Software, Tactic, Technique } from '../classes/stix';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../utils/taxii2lib';
import * as MockData from '../../tests/utils/mock-data';
import { DataService } from './data.service';
import { ConfigService } from './config.service';

describe('DataService', () => {
    let dataService: DataService;
    let configService: ConfigService;
    let http: HttpClient;
    let mockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService],
        });
        configService = TestBed.inject(ConfigService);
        configService.versions = MockData.configData;
        dataService = TestBed.inject(DataService);
        http = TestBed.inject(HttpClient);
    });

    describe('helper functions', () => {
        it('should be created', () => {
            expect(dataService).toBeTruthy();
        });

        it('should get domainVersionID with latest version', () => {
            let domainIdentifier = 'enterprise-attack';
            let result = dataService.getDomainVersionID(domainIdentifier, '');
            let latestVersion = dataService.versions[0].number;
            expect(result).toEqual(`${domainIdentifier}-${latestVersion}`);
        });

        it('should get domainVersionID', () => {
            let domainIdentifier = 'enterprise-attack';
            let version = '13';
            let result = dataService.getDomainVersionID(domainIdentifier, version);
            expect(result).toEqual(`${domainIdentifier}-${version}`);
        });

        it('should not be supported version', () => {
            let result = dataService.isSupported('3');
            expect(result).toBeFalse();
        });

        it('should be a supported version', () => {
            let version = dataService.latestVersion.number;
            let result = dataService.isSupported(version);
            expect(result).toBeTrue();
        });

        it('should compare the same version as unchanged', () => {
            let domain = dataService.domains[0];
            dataService.parseBundles(domain, MockData.stixBundleSDO);

            let result = dataService.compareVersions(domain.id, domain.id);
            expect(result).toBeInstanceOf(VersionChangelog);
            expect(result.newDomainVersionID).toEqual(domain.id);
            expect(result.oldDomainVersionID).toEqual(domain.id);
            expect(result.unchanged.length).toEqual(3);
        });

        it('should get domain identifier from name', () => {
            const domainName = 'Enterprise ATT&CK';
            expect(dataService.getDomainIdentifier(domainName)).toEqual('enterprise-attack');
        });

        it('should handle empty string', () => {
            expect(dataService.getDomainIdentifier('')).toEqual('');
        });
    });

    describe('set up via collection index', () => {
        beforeEach(() => {
            dataService.versions = [];
        });

        it('should add new version when it does not already exist', () => {
            const versionName = 'Enterprise ATT&CK v14';
            const versionNumber = '14';

            const result = dataService.addVersion(versionName, versionNumber);

            expect(result instanceof Version).toBeTruthy();
            expect(result.name).toBe(versionName);
            expect(result.number).toBe(versionNumber);
            expect(dataService.versions.length).toBe(1);
            expect(dataService.versions[0]).toBe(result);
        });

        it('should return existing version if it already exists', () => {
            const versionName = 'Enterprise ATT&CK v14';
            const versionNumber = '14';

            const existingVersion = new Version(versionName, versionNumber);
            dataService.versions.push(existingVersion);

            const result = dataService.addVersion(versionName, versionNumber);

            expect(result).toBe(existingVersion);
            expect(dataService.versions.length).toBe(1);
        });

        it('should parse collection index correctly', () => {
            spyOn(dataService, 'getDomainIdentifier').and.callThrough();
            spyOn(dataService, 'addVersion').and.callThrough();
            spyOn(console, 'debug');

            dataService.parseCollectionIndex(MockData.collectionIndex);

            expect(dataService.getDomainIdentifier).toHaveBeenCalledTimes(3); // once for each collection
            expect(dataService.addVersion).toHaveBeenCalledTimes(3); // once for each valid defined MAJOR version
            expect(console.debug).toHaveBeenCalledTimes(1); // once for v1.0
            expect(dataService.versions.length).toBe(1); // for each uniquely defined MAJOR version
            expect(dataService.domains.length).toBe(4); // for each supported domain
        });
    });

    describe('setup with Workbench integration', () => {
        beforeEach(() => {
            configService.versions = MockData.workbenchData;
            spyOn(DataService.prototype, 'setUpDomains').and.callThrough();
            mockService = new DataService(http, configService);
        });

        it('should define authentication', () => {
            let domain = mockService.domains[0];
            expect(mockService.versions.length).toEqual(1);
            expect(domain).toBeInstanceOf(Domain);
            expect(domain.authentication).toBeTruthy();
            expect(domain.authentication).toEqual(MockData.workbenchData.entries[0].authentication);
        });

        it('should fetch domain data via Workbench', () => {
            let domain = dataService.domains[0];
            let result$ = dataService.getDomainData(domain);
            expect(result$).toBeTruthy();
        });
    });

    describe('setup with TAXII', () => {
        beforeEach(() => {
            configService.versions = MockData.taxiiData;
            spyOn(DataService.prototype, 'setUpDomains').and.callThrough();
            mockService = new DataService(http, configService);
        });

        it('should define TAXII connection', () => {
            let domain = mockService.domains[0];
            expect(mockService.versions.length).toEqual(1);
            expect(domain).toBeInstanceOf(Domain);
            expect(domain.taxii_url).toBeTruthy();
            expect(domain.taxii_url).toEqual(MockData.taxiiData.entries[0].domains[0].taxii_url);
            expect(domain.taxii_collection).toBeTruthy();
            expect(domain.taxii_collection).toEqual(MockData.taxiiData.entries[0].domains[0].taxii_collection);
        });

        it('should fetch domain data via TAXII', () => {
            let functionSpy = spyOn(Collection.prototype, 'getObjects').and.returnValue(Promise.resolve([]));
            let domain = mockService.domains[0];
            let result$ = mockService.getDomainData(domain);
            expect(result$).toBeTruthy();
            expect(functionSpy).toHaveBeenCalled();
        });
    });

    describe('setup with config data', () => {
        beforeEach(() => {
            configService.versions = MockData.configData;
            spyOn(DataService.prototype, 'setUpDomains').and.callThrough();
            mockService = new DataService(http, configService);
        });

        it('should set up config data in constructor', () => {
            expect(mockService).toBeTruthy();
            expect(mockService.versions).toBeTruthy();
            expect(mockService.versions.length).toEqual(1);
            let version = mockService.versions[0];
            expect(version).toBeInstanceOf(Version);
            expect(version.name).toEqual('ATT&CK v13');
            expect(version.number).toEqual('13');
        });

        it('should fetch domain data via URL', () => {
            let domain = mockService.domains[0];
            let result$ = mockService.getDomainData(domain);
            expect(result$).toBeTruthy();
        });

        it('should resolve with data loaded', async () => {
            let domain = mockService.domains[0];
            domain.dataLoaded = true;
            await expectAsync(mockService.loadDomainData(domain.id, false)).toBeResolved();
        });

        it('should resolve after data loaded', async () => {
            let domain = mockService.domains[0];
            let functionSpy = spyOn(mockService, 'getDomainData').and.returnValue(of(MockData.stixBundleSDO));
            await expectAsync(mockService.loadDomainData(domain.id, false)).toBeResolved();
            expect(functionSpy).toHaveBeenCalledOnceWith(domain, false);
        });

        it('should reject with invalid domain', async () => {
            let functionSpy = spyOn(dataService, 'getDomain').and.returnValue(undefined);
            let domainId = 'enterprise-attack-4';
            await expectAsync(dataService.loadDomainData(domainId)).toBeRejected();
            expect(functionSpy).toHaveBeenCalledOnceWith(domainId);
        });

        it('should parse stix bundle', () => {
            Object.defineProperty(configService, 'subtechniquesEnabled', { get: () => true }); // enable to parse subs
            mockService.domains[0].relationships['group_uses'].set('intrusion-set-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['software_uses'].set('malware-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['campaign_uses'].set('campaign-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['mitigates'].set('mitigation-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['component_rel'].set('component-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['targeted_assets'].set('asset-0', ['attack-pattern-0']);
            let domain = mockService.domains[0];
            mockService.parseBundles(domain, MockData.stixBundleSDO);
            // check data loaded
            expect(domain.dataLoaded).toBeTrue();
            expect(domain.platforms).toEqual(MockData.T0000.x_mitre_platforms);

            // check objects parsed
            let testObjectType = function (testArr, quantity, instance) {
                expect(testArr.length).toEqual(quantity);
                expect(testArr[0]).toBeInstanceOf(instance);
            };
            testObjectType(domain.techniques, 4, Technique);
            testObjectType(domain.subtechniques, 2, Technique);
            testObjectType(domain.assets, 1, Asset);
            testObjectType(domain.campaigns, 2, Campaign);
            testObjectType(domain.dataComponents, 1, DataComponent);
            testObjectType(domain.groups, 1, Group);
            testObjectType(domain.matrices, 1, Matrix);
            testObjectType(domain.mitigations, 2, Mitigation);
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
            expect(relationships['component_rel'].size).toEqual(1);
            expect(relationships['group_uses'].size).toEqual(1);
            expect(relationships['mitigates'].size).toEqual(1);
            expect(relationships['revoked_by'].size).toEqual(1);
            expect(relationships['software_uses'].size).toEqual(1);
            expect(relationships['subtechniques_of'].size).toEqual(1);
            expect(relationships['targeted_assets'].size).toEqual(1);
        });
    });

    describe('setup with version comparison', () => {
        beforeEach(() => {
            let newVersion = {
                name: 'ATT&CK v14',
                version: '14',
                domains: MockData.configData.entries[0].domains,
            };
            configService.versions = {
                enabled: true,
                entries: [MockData.configData.entries[0], newVersion],
            };
            spyOn(DataService.prototype, 'setUpDomains').and.callThrough();
            mockService = new DataService(http, configService);
        });

        it('should compare versions', () => {
            // should have two domains/versions
            expect(mockService.domains.length).toEqual(2);

            // parse stix bundles into old domain
            let [oldDomain, newDomain] = mockService.domains;
            mockService.parseBundles(oldDomain, MockData.stixBundleSDO);
            expect(oldDomain.dataLoaded).toBeTrue();

            // deprecation
            let deprecateSubtechnique = { ...MockData.T0000_000 };
            deprecateSubtechnique['x_mitre_deprecated'] = true;
            deprecateSubtechnique['modified'] = '2002-01-01T01:01:00.000Z';
            // revocation
            let revokeTechnique = { ...MockData.T0001 };
            revokeTechnique['revoked'] = true;
            revokeTechnique['modified'] = '2002-01-01T01:01:00.000Z';
            // minor change
            let minorTechnique = { ...MockData.T0000 };
            minorTechnique['modified'] = '2002-01-01T01:01:00.000Z';
            // major change
            let majorTechnique = { ...MockData.T0003 };
            majorTechnique['x_mitre_version'] = '2.0';
            majorTechnique['modified'] = '2002-01-01T01:01:00.000Z';
            // update deprecated object
            let deprecatedTechnique = { ...MockData.T0002 };
            deprecatedTechnique['modified'] = '2002-01-01T01:01:00.000Z';
            // update revoked object
            let revokedSubtechnique = { ...MockData.T0000_001 };
            revokedSubtechnique['modified'] = '2002-01-01T01:01:00.000Z';
            // parse stix bundle into new domain
            mockService.parseBundles(newDomain, [
                {
                    type: 'bundle',
                    id: 'bundle--1',
                    spec_version: '2.0',
                    objects: [
                        MockData.T0004,
                        minorTechnique,
                        revokeTechnique,
                        deprecatedTechnique,
                        deprecateSubtechnique,
                        revokedSubtechnique,
                        majorTechnique,
                        MockData.A0000,
                        MockData.C0000,
                        MockData.DC0000,
                        MockData.DS0000,
                        MockData.G0000,
                        MockData.matrixSDO,
                        MockData.M0000,
                        MockData.note,
                        MockData.malwareS0000,
                        MockData.toolS0001,
                        MockData.TA0000,
                        MockData.G0001usesT0000,
                        MockData.S0000usesT0000,
                        MockData.C0000usesT0000,
                        MockData.C0000attributedToG0000,
                        MockData.M0000mitigatesT0000,
                        MockData.T0000_000subtechniqueOfT0000,
                        MockData.T0000_001subtechniqueOfT0000,
                        MockData.DC0000detectsT0000,
                        MockData.T0000targetsA0000,
                        MockData.T0000_001revokedByT0000_000,
                        MockData.filteredM0001,
                        MockData.deprecatedMatrixSDO,
                        MockData.G0000usesT0000_000,
                        MockData.S0000usesT0000_000,
                        MockData.C0000usesT0000_000,
                        MockData.M0000mitigatesT0000_000,
                        MockData.DC0000detectsT0000_000,
                        MockData.C0001attributedToG0000,
                        MockData.C0001,
                        MockData.T0001targetsA0000,
                        MockData.T0000_Duplicate,
                    ],
                },
            ]);
            // compare versions
            let result = mockService.compareVersions(oldDomain.id, newDomain.id);
            console.log(result);
            // validate comparison result
            expect(result).toBeInstanceOf(VersionChangelog);
            expect(result.newDomainVersionID).toEqual(newDomain.id);
            expect(result.oldDomainVersionID).toEqual(oldDomain.id);
            // validate parsed changes
            expect(result.additions.length).toEqual(1);
            expect(result.changes.length).toEqual(1);
            expect(result.deprecations.length).toEqual(0);
            expect(result.minor_changes.length).toEqual(1);
            expect(result.revocations.length).toEqual(1);
            expect(result.unchanged.length).toEqual(0);
        });
    });

    describe('StixObject tests', () => {
        beforeEach(() => {
            configService.versions = MockData.configData;
            spyOn(DataService.prototype, 'setUpDomains').and.callThrough();
            mockService = new DataService(http, configService);
        });

        it('should get technique in domain', () => {
            mockService.domains[0].techniques = [new Technique(MockData.T0000, [], mockService)];
            let result = mockService.getTechnique('T0000', mockService.domains[0].id);
            expect(result).toBeTruthy();
            expect(result).toBeInstanceOf(Technique);
            expect(result.attackID).toEqual('T0000');
        });

        it('should test software', () => {
            mockService.domains[0].relationships['software_uses'].set('malware-0', ['attack-pattern-0']);
            let software_test = new Software(MockData.malwareS0000, mockService);
            expect(software_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
            software_test = new Software(MockData.M0000, mockService); // should return empty list because 'malware-0' is not in softwareUsesTechnique
            expect(software_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
        });

        it('should test mitigation', () => {
            mockService.domains[0].relationships['mitigates'].set('mitigation-0', ['attack-pattern-0']);
            let mitigation_test = new Mitigation(MockData.M0000, mockService);
            expect(mitigation_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
            mitigation_test = new Mitigation(MockData.malwareS0000, mockService); // should return empty list because 'mitigation-0' is not in mitigationMitigates
            expect(mitigation_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
        });

        it('should test asset', () => {
            mockService.domains[0].relationships['targeted_assets'].set('asset-0', ['attack-pattern-0']);
            let asset_test = new Asset(MockData.A0000, mockService);
            expect(asset_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
            asset_test = new Asset(MockData.malwareS0000, mockService); // should return empty list because 'mitigation-0' is not in mitigationMitigates
            expect(asset_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
        });

        it('should test campaign', () => {
            mockService.domains[0].relationships['campaign_uses'].set('campaign-0', ['attack-pattern-0']);
            let campaign_test = new Campaign(MockData.C0000, mockService);
            expect(campaign_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
            campaign_test = new Campaign(MockData.malwareS0000, mockService); // should return empty list because 'mitigation-0' is not in mitigationMitigates
            expect(campaign_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
        });

        it('should test group', () => {
            mockService.domains[0].relationships['group_uses'].set('intrusion-set-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['campaign_uses'].set('intrusion-set-0', ['attack-pattern-0']);
            mockService.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0', ['intrusion-set-0']);
            let group_test = new Group(MockData.G0000, mockService);
            expect(group_test.relatedTechniques('enterprise-attack-13')).toEqual(['attack-pattern-0']);
            group_test = new Group(MockData.malwareS0000, mockService); // should return empty list because 'mitigation-0' is not in mitigationMitigates
            expect(group_test.relatedTechniques('enterprise-attack-13')).toEqual([]);
        });

        it('should test stixObject', () => {
            let stixObject_test = new Campaign(MockData.G0000, mockService);
            let group_test = new Group(MockData.G0001, mockService);
            mockService.domains[0].relationships['revoked_by'].set('relationship-9', ['attack-pattern-1']);
            mockService.domains[0].relationships['targeted_assets'].set('asset-0', ['attack-pattern-0']);
            expect(stixObject_test.revoked_by('enterprise-attack-13')).toBeUndefined();
            mockService.domains[0].relationships['revoked_by'].set('intrusion-set-0', ['attack-pattern-1']);
            expect(stixObject_test.revoked_by('enterprise-attack-13')).toEqual(['attack-pattern-1']);
            let campaign_test = new Campaign(MockData.C0000, mockService);
            expect(campaign_test.compareVersion(group_test)).toEqual(-1);
            let asset_test = new Asset(MockData.invalidAsset, mockService, false);
            expect(campaign_test.compareVersion(asset_test)).toEqual(0);
        });

        it('should test technique', () => {
            let technique_test = new Technique(MockData.T0002, [], mockService);
            expect(technique_test.get_all_technique_tactic_ids()).toEqual([]);
        });

        it('should throw error if tactic does not exist', () => {
            let technique_test = new Technique(MockData.T0001, [], mockService);
            expect(() => {
                technique_test.get_technique_tactic_id('impact');
            }).toThrowError();
        });
    });
});
