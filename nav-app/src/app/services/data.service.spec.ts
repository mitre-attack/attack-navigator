import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Version, VersionChangelog } from '../classes';
import { Asset, Campaign, DataComponent, Domain, Group, Matrix, Mitigation, Note, Software, Tactic, Technique } from '../classes/stix';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
    let configVersions: any[] = [{
        "name": "ATT&CK v13",
        "version": "13",
        "domains": [{
            "name": "Enterprise",
            "identifier": "enterprise-attack",
            "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
        }]
    }];

    let taxiiVersions = [{
        "name": "ATT&CK v13",
        "version": "13",
        "domains": [{
            "name": "Enterprise",
            "identifier": "enterprise-attack",
            "taxii_url": "https://cti-taxii.mitre.org/",
            "taxii_collection": "95ecc380-afe9-11e4-9b6c-751b66dd541e"
        }]
    }];

    let workbenchVersions = [{
        "name": "Workbench Data",
        "version": "13",
        "authentication": {
            "enabled": true,
            "serviceName": "navigator",
            "apiKey": "sample-navigator-apikey"
        },
        "domains": [{
            "name": "Enterprise",
            "identifier": "enterprise-attack",
            "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
        }]
    }];

    let stixSDO = {
        "name": "Name",
        "description": "Description",
        "created": "2001-01-01T01:01:00.000Z",
        "modified": "2001-01-01T01:01:00.000Z",
        "version": "1.0",
    }

    let template = {
        ...stixSDO,
        "type": "attack-pattern",
        "x_mitre_platforms": ["platform"],
        "kill_chain_phases": [{
            "kill_chain_name": "mitre-attack",
            "phase_name": "tactic-name"
        }],
    }
    let technique = {
        ...template,
        "id": "attack-pattern-0",
        "external_references": [{
            "external_id": "T0000"
        }],
    }
    let technique2 = {
        ...template,
        "id": "attack-pattern-3",
        "external_references": [{
            "external_id": "T0001"
        }],
    }
    let technique3 = {
        ...template,
        "id": "attack-pattern-4",
        "x_mitre_deprecated": true,
        "external_references": [{
            "external_id": "T0002"
        }],
    }
    let subtechnique = {
        ...template,
        "id": "attack-pattern-1",
        "x_mitre_is_subtechnique": true,
        "external_references": [{
            "external_id": "T0000.000"
        }],
    }
    let subtechnique2 = {
        ...template,
        "id": "attack-pattern-2",
        "x_mitre_is_subtechnique": true,
        "revoked": true,
        "external_references": [{
            "external_id": "T0000.001"
        }],
    }
    let asset = { "id": "asset--0", ...stixSDO, "type": "x-mitre-asset", "external_references": [{"external_id": "A0000"}] }
    let campaign = { "id": "campaign-0", ...stixSDO, "type": "campaign", "external_references": [{"external_id": "C0000"}] }
    let component = { "id": "component-0", ...stixSDO, "type": "x-mitre-data-component", "x_mitre_data_source_ref": "ds-0", "external_references": [{"external_id": "DC0000"}] }
    let source = {"id": "ds-0", "type": "x-mitre-data-source", "external_references": [{"external_id": "DS0000"}] }
    let group = { "id": "intrusion-set-0", ...stixSDO, "type": "intrusion-set", "external_references": [{"external_id": "G0000"}] }
    let matrix = { "id": "matrix-0", ...stixSDO, "type": "x-mitre-matrix", "tactic_refs": ["tactic-0"], "external_references": [{"external_id": "test-matrix"}] }
    let mitigation = { "id": "mitigation-0", ...stixSDO, "type": "course-of-action", "external_references": [{"external_id": "M0000"}] }
    let note = { "id": "note-0", ...stixSDO, "type": "note" }
    let malware = { "id": "malware-0", ...stixSDO, "type": "malware", "x_mitre_platforms": ["platform"], "external_references": [{"external_id": "S0000"}] }
    let tool = { "id": "tool-0", ...stixSDO, "type": "tool", "x_mitre_platforms": ["platform"], "external_references": [{"external_id": "S0001"}] }
    let tactic = { "id": "tactic-0", ...stixSDO, "type": "x-mitre-tactic", "x_mitre_shortname": "tactic-name", "external_references": [{"external_id": "TA0000"}] }
    let groupUsesTechnique = {"id": "rel-1", "type": "relationship", "source_ref": "intrusion-set-0", "relationship_type": "uses", "target_ref": "attack-pattern-0"}
    let softwareUsesTechnique = {"id": "rel-2", "type": "relationship", "source_ref": "malware-0", "relationship_type": "uses", "target_ref": "attack-pattern-0"}
    let campaignUsesTechnique = {"id": "rel-4", "type": "relationship", "source_ref": "campaign-0", "relationship_type": "uses", "target_ref": "attack-pattern-0"}
    let campaignAttr = {"id": "rel-5", "type": "relationship", "source_ref": "campaign-0", "relationship_type": "attributed-to", "target_ref": "intrusion-set-0"}
    let mitigationMitigates = {"id": "rel-6", "type": "relationship", "source_ref": "mitigation-0", "relationship_type": "mitigates", "target_ref": "attack-pattern-0"}
    let subtechniqueOf = {"id": "rel-7", "type": "relationship", "source_ref": "attack-pattern-1", "relationship_type": "subtechnique-of", "target_ref": "attack-pattern-0"}
    let detects = {"id": "rel-8", "type": "relationship", "source_ref": "component-0", "relationship_type": "detects", "target_ref": "attack-pattern-0"}
    let targets = {"id": "rel-9", "type": "relationship", "source_ref": "attack-pattern-0", "relationship_type": "targets", "target_ref": "asset-0"}
    let subtechniqueOf2 = {"id": "rel-10", "type": "relationship", "source_ref": "attack-pattern-2", "relationship_type": "subtechnique-of", "target_ref": "attack-pattern-0"}
    let revokedby = {"id": "rel-11", "type": "relationship", "source_ref": "attack-pattern-2", "relationship_type": "revoked-by", "target_ref": "attack-pattern-1"}

    let bundles: any[] = [{
        "type": "bundle",
        "id": "bundle--0",
        "spec_version": "2.0",
        "objects": [
            technique, technique2, technique3, subtechnique, subtechnique2, asset, campaign, component, source, group, matrix, mitigation, note, group, malware, tool, tactic,
            groupUsesTechnique, softwareUsesTechnique, campaignUsesTechnique, campaignAttr, mitigationMitigates, subtechniqueOf, subtechniqueOf2, detects, targets, revokedby,
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
        let return$ = {versions: configVersions};
        let functionSpy = spyOn(DataService.prototype, 'setUpURLs').and.stub();
        spyOn(DataService.prototype, 'getConfig').and.returnValue(of(return$));
        const mockService = new DataService(http);
        expect(mockService).toBeTruthy();
        expect(functionSpy).toHaveBeenCalledOnceWith(return$.versions)
    }));

    it('should set up data', inject([DataService], (service: DataService) => {
        service.setUpURLs(configVersions);
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
        service.setUpURLs(workbenchVersions);
        let domain = service.domains[0];
        expect(service.versions.length).toEqual(1);
        expect(domain).toBeInstanceOf(Domain);
        expect(domain.authentication).toBeTruthy();
        expect(domain.authentication).toEqual(workbenchVersions[0].authentication);
    }));

    it('should define TAXII connection', inject([DataService], (service: DataService) => {
        service.setUpURLs(taxiiVersions);
        let domain = service.domains[0];
        expect(service.versions.length).toEqual(1);
        expect(domain).toBeInstanceOf(Domain);
        expect(domain.taxii_url).toBeTruthy();
        expect(domain.taxii_url).toEqual(taxiiVersions[0].domains[0].taxii_url);
        expect(domain.taxii_collection).toBeTruthy();
        expect(domain.taxii_collection).toEqual(taxiiVersions[0].domains[0].taxii_collection);
    }));

    it('should get domainVersionID with latest version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]); // set up data
        let domainIdentifier = 'enterprise-attack';
        let result = service.getDomainVersionID(domainIdentifier, '');
        let latestVersion = service.versions[0].number;
        expect(result).toEqual(`${domainIdentifier}-${latestVersion}`);
    }));

    it('should get domainVersionID', inject([DataService], (service: DataService) => {
        service.setUpURLs([]); // set up data
        let domainIdentifier = 'enterprise-attack';
        let version = '13';
        let result = service.getDomainVersionID(domainIdentifier, version);
        expect(result).toEqual(`${domainIdentifier}-${version}`);
    }));

    it('should get current version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]); // set up data
        let result = service.getCurrentVersion();
        expect(result.name).toEqual(service.latestVersion.name);
        expect(result.number).toEqual(service.latestVersion.number);
    }));

    it('should not be supported version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]); // set up data
        let result = service.isSupported('3');
        expect(result).toBeFalse();
    }));

    it('should be a supported version', inject([DataService], (service: DataService) => {
        service.setUpURLs([]); // set up data
        let version = service.latestVersion.number;
        let result = service.isSupported(version);
        expect(result).toBeTrue();
    }));

    it('should fetch domain data via URL', inject([DataService], (service: DataService) => {
        service.setUpURLs(configVersions); // set up data
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should fetch domain data via TAXII', inject([DataService], (service: DataService) => {
        service.setUpURLs(configVersions); // set up data
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should fetch domain data via Workbench', inject([DataService], (service: DataService) => {
        service.setUpURLs(workbenchVersions); // set up data
        let domain = service.domains[0];
        let result$ = service.getDomainData(domain);
        expect(result$).toBeTruthy();
    }));

    it('should resolve with data loaded', inject([DataService], async (service: DataService) => {
        service.setUpURLs(configVersions); // set up data
        let domain = service.domains[0];
        domain.dataLoaded = true;
        await expectAsync(service.loadDomainData(domain.id, false)).toBeResolved();
    }));

    it('should resolve after data loaded', inject([DataService], async (service: DataService) => {
        service.setUpURLs(configVersions); // set up data
        let domain = service.domains[0];
        let functionSpy = spyOn(service, 'getDomainData').and.returnValue(of(bundles));
        await expectAsync(service.loadDomainData(domain.id, false)).toBeResolved();
        expect(functionSpy).toHaveBeenCalledOnceWith(domain, false);
    }));

    it('should reject with invalid domain', inject([DataService], async (service: DataService) => {
        service.setUpURLs(configVersions);
        let functionSpy = spyOn(service, 'getDomain').and.returnValue(undefined);
        let domainId = 'enterprise-attack-4';
        await expectAsync(service.loadDomainData(domainId)).toBeRejected();
        expect(functionSpy).toHaveBeenCalledOnceWith(domainId);
    }));

    it('should not get technique in domain', inject([DataService], (service: DataService) => {
        service.setUpURLs(configVersions);
        let result = service.getTechnique('T0000', service.domains[0].id);
        expect(result).toBeFalsy();
    }));

    it('should get technique in domain', inject([DataService], (service: DataService) => {
        service.setUpURLs(configVersions);
        service.domains[0].techniques = [new Technique(technique, [], service)];
        let result = service.getTechnique('T0000', service.domains[0].id);
        expect(result).toBeTruthy();
        expect(result).toBeInstanceOf(Technique);
        expect(result.attackID).toEqual('T0000');
    }));

    it('should parse stix bundle', inject([DataService], (service: DataService) => {
        let testDomainData = function(testArr, quantity, instance) {
            expect(testArr.length).toEqual(quantity);
            expect(testArr[0]).toBeInstanceOf(instance);
        }
        let testDomainRelationships = function(relType, quantity) {
            expect(domain.relationships[relType].size).toEqual(quantity);
        }
        service.subtechniquesEnabled = true; // enable to parse subs
        service.setUpURLs(configVersions);
        service.domains[0].relationships['group_uses'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['software_uses'].set('malware-0',['attack-pattern-0']);
        service.domains[0].relationships['campaign_uses'].set('campaign-0',['attack-pattern-0']);
        service.domains[0].relationships['mitigates'].set('mitigation-0',['attack-pattern-0']);
        service.domains[0].relationships['component_rel'].set('component-0',['attack-pattern-0']);
        service.domains[0].relationships['campaigns_attributed_to'].set('intrusion-set-0',['attack-pattern-0']);
        service.domains[0].relationships['targeted_assets'].set('asset-0',['attack-pattern-0']);
        let domain = service.domains[0];
        service.parseBundle(domain, bundles);
        expect(domain.platforms).toEqual(technique.x_mitre_platforms);
        testDomainData(domain.techniques, 3, Technique);
        testDomainData(domain.subtechniques, 2, Technique);
        testDomainData(domain.assets, 1, Asset);
        testDomainData(domain.campaigns, 1, Campaign);
        testDomainData(domain.dataComponents, 1, DataComponent);
        testDomainData(domain.groups, 1, Group);
        testDomainData(domain.matrices, 1, Matrix);
        testDomainData(domain.mitigations, 1, Mitigation);
        testDomainData(domain.notes, 1, Note);
        testDomainData(domain.software, 2, Software);
        testDomainData(domain.tactics, 1, Tactic);
        expect(domain.dataLoaded).toBeTrue();
        testDomainRelationships('campaign_uses', 1);
        testDomainRelationships('campaigns_attributed_to', 1);
        testDomainRelationships('component_rel', 1);
        testDomainRelationships('group_uses', 1);
        testDomainRelationships('mitigates', 1);
        testDomainRelationships('revoked_by', 1);
        testDomainRelationships('software_uses', 1);
        testDomainRelationships('subtechniques_of', 1);
        testDomainRelationships('targeted_assets', 1);
    }));

    it('should compare the same version as unchanged', inject([DataService], (service: DataService) => {
        service.setUpURLs([]);
        let domain = service.domains[0];
        service.parseBundle(domain, bundles);
        let result = service.compareVersions(domain.id, domain.id);
        expect(result).toBeInstanceOf(VersionChangelog);
        expect(result.newDomainVersionID).toEqual(domain.id);
        expect(result.oldDomainVersionID).toEqual(domain.id);
        expect(result.unchanged.length).toEqual(3);
    }));

    it('should compare versions', inject([DataService], (service: DataService) => {
        let newVersion = {
            "name": "ATT&CK v14",
            "version": "14",
            "domains": configVersions[0].domains
        };
        let multipleVersions = [configVersions[0], newVersion];
        service.setUpURLs(multipleVersions);
        expect(service.domains.length).toEqual(2);

        let [oldDomain, newDomain] = service.domains;
        service.parseBundle(oldDomain, bundles);
        expect(oldDomain.dataLoaded).toBeTrue();
    
        // deprecation
        let depSubtechnique = {...subtechnique};
        depSubtechnique["x_mitre_deprecated"] = true;
        depSubtechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // new object added
        let newTechnique = {...technique};
        newTechnique["id"] = "attack-pattern-6";
        newTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        newTechnique["external_references"] = [{
            "external_id": "T0004"
        }]
        // minor version change
        let minorTechnique = {...technique};
        minorTechnique["version"] = "1.1";
        minorTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // update deprecated object
        let depTechnique = {...technique3};
        depTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // update revoked object
        let revSubtechnique = {...subtechnique2};
        revSubtechnique["modified"] = "2002-01-01T01:01:00.000Z";
        // revocation
        let revTechnique = {...technique2};
        revTechnique["revoked"] = true;
        revTechnique["modified"] = "2002-01-01T01:01:00.000Z";
        let newBundle = [{
            "type": "bundle",
            "id": "bundle--1",
            "spec_version": "2.0",
            "objects": [
                minorTechnique, revTechnique, depTechnique, newTechnique, depSubtechnique, revSubtechnique, asset, campaign, component, source, group, matrix, mitigation, note, group, malware, tool, tactic,
                groupUsesTechnique, softwareUsesTechnique, campaignUsesTechnique, campaignAttr, mitigationMitigates, subtechniqueOf, subtechniqueOf2, detects, targets, revokedby,
            ]
        }]
        newBundle[0].objects.push(newTechnique);
        service.parseBundle(newDomain, newBundle);

        let result = service.compareVersions(oldDomain.id, newDomain.id);
        expect(result).toBeInstanceOf(VersionChangelog);
        expect(result.newDomainVersionID).toEqual(newDomain.id);
        expect(result.oldDomainVersionID).toEqual(oldDomain.id);
        expect(result.additions.length).toEqual(1);
        expect(result.deprecations.length).toEqual(1);
        expect(result.minor_changes.length).toEqual(1);
        expect(result.revocations.length).toEqual(1);
        expect(result.unchanged.length).toEqual(0);
    }));
});
