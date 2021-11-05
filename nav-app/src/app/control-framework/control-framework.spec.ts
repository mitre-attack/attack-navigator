import { inject, TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { DataService } from "../data.service";
import { ControlFramework } from "./control-framework";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import config from '../../assets/config.json';
import enterpriseAttackBundle from '../../assets/enterprise-bundle.json';

describe("ControlFramework", () => {
  let controlFrameworkClass: ControlFramework;

  beforeEach(() => {
    controlFrameworkClass = new ControlFramework();
  });

  describe('initialization', () => {

    it('should be truthy', () => {
      expect(controlFrameworkClass).toBeTruthy();
    });

    it('should have nist items', () => {
      expect(controlFrameworkClass.nistItems).toBeTruthy();
      expect(controlFrameworkClass.nistItems.length).toEqual(108);
    });


    it('should have cis items', () => {
      expect(controlFrameworkClass.cisItems).toBeTruthy();
      expect(controlFrameworkClass.cisItems.length).toEqual(171);
    });

    it('should have owasp items', () => {
      expect(controlFrameworkClass.owaspAsvs).toBeTruthy();
      expect(controlFrameworkClass.owaspAsvs.length).toEqual(286);
    });

    it('should have techniquesNist', () => {
      expect(controlFrameworkClass.techniquesNist).toBeTruthy();
      expect(controlFrameworkClass.techniquesNist.length).toEqual(346);
    });

    it('should have asvsNist80053Mapping', () => {
      expect(controlFrameworkClass.asvsNist80053Mapping).toBeTruthy();
      expect(controlFrameworkClass.asvsNist80053Mapping.length).toEqual(185);
    });

    it('should have mitigationNist', () => {
      expect(controlFrameworkClass.mitigationNist).toBeTruthy();
      expect(controlFrameworkClass.mitigationNist.length).toEqual(41);
    });

  });

  describe('getNistByMitigationId', () => {
    it('should get 5 Nist Items by Mitigation attack Id M1036', () => {
      let nistItems = controlFrameworkClass.getNistByMitigationId("M1036");
      expect(nistItems).toBeTruthy();
      expect(nistItems.length).toEqual(5);
      // Call twice because there is a caching mechanism
      nistItems = controlFrameworkClass.getNistByMitigationId("M1036");
      expect(nistItems).toBeTruthy();
      expect(nistItems.length).toEqual(5);
    });

    it('should get an empty array of Nist Items by Mitigation attack Id "DOESNOTEXIST"', () => {
      const mitigationID = "DOESNOTEXIST";
      let nistItems = controlFrameworkClass.getNistByMitigationId(mitigationID);
      expect(nistItems).toBeTruthy();
      expect(nistItems.length).toEqual(0);
      // Call twice because there is a caching mechanism
      nistItems = controlFrameworkClass.getNistByMitigationId(mitigationID);
      expect(nistItems).toBeTruthy();
      expect(nistItems.length).toEqual(0);
    });
  });

  describe('getCisItemsByNistSubCatId', () => {
    it('should get 1 CIS Items by nist sub cat is DE.CM-7', () => {
      const nistSubCatID = "DE.CM-7";
      let cisItems = controlFrameworkClass.getCisItemsByNistSubCatId(nistSubCatID);
      expect(cisItems).toBeTruthy();
      expect(cisItems.length).toEqual(18);
      // Call twice because there is a caching mechanism
      cisItems = controlFrameworkClass.getCisItemsByNistSubCatId(nistSubCatID);
      expect(cisItems).toBeTruthy();
      expect(cisItems.length).toEqual(18);
    });

    it('should get an empty array of CIS Items by nist sub cat is "DOESNOTEXIST"', () => {
      const nistSubCatId = "DOESNOTEXIST";
      let cisItems = controlFrameworkClass.getCisItemsByNistSubCatId(nistSubCatId);
      expect(cisItems).toBeTruthy();
      expect(cisItems.length).toEqual(0);
      // Call twice because there is a caching mechanism
      cisItems = controlFrameworkClass.getCisItemsByNistSubCatId(nistSubCatId);
      expect(cisItems).toBeTruthy();
      expect(cisItems.length).toEqual(0);
    });
  });

  describe('getNistItemByNistSubCatId', () => {
    it('should get a CIS Items by nist sub cat is DE.CM-7', () => {
      const nistSubCatID = "DE.CM-7";
      let cisItems = controlFrameworkClass.getNistItemByNistSubCatId(nistSubCatID);
      expect(cisItems).toBeTruthy();
      // Call twice because there is a caching mechanism
      cisItems = controlFrameworkClass.getNistItemByNistSubCatId(nistSubCatID);
      expect(cisItems).toBeTruthy();
    });

    it('should get null for nist sub cat id "DOESNOTEXIST"', () => {
      const nistSubCatId = "DOESNOTEXIST";
      let cisItems = controlFrameworkClass.getNistItemByNistSubCatId(nistSubCatId);
      expect(cisItems).toBeUndefined();
      // Call twice because there is a caching mechanism
      cisItems = controlFrameworkClass.getNistItemByNistSubCatId(nistSubCatId);
      expect(cisItems).toBeUndefined();
    });
  });

  describe('getTechniqueMapping', () => {
    let dataService: DataService;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [DataService]
      });
    });

    beforeEach(inject([DataService], async (service: DataService) => {
      dataService = service
      
      service.setUpURLs(config.versions as []);
      let domain = dataService.getDomain("enterprise-attack-v9")
      service.parseBundle(domain, enterpriseAttackBundle as []);
    }));

    it('should return null when given a null technique', () => {
      let result = controlFrameworkClass.getTechniqueMapping(null, "enterprise-attack-v9")
      expect(result).toBeNull();
    });

    it('should return an enriched technique when given a valid technique', () => {
      const domain = dataService.getDomain('enterprise-attack-v9');
      let technique = domain.techniques.find(x => x.attackID == 'T1548');
      expect(technique).toBeTruthy();
      let result = controlFrameworkClass.getTechniqueMapping(technique, "enterprise-attack-v9")
      expect(result).toBeTruthy();
      expect(result.Mappings).toBeTruthy();
      expect(result.Mappings.Asvs.length).toEqual(87);
      expect(result.Mappings.Cis.length).toEqual(61);
      expect(result.Mappings.Mitigations.length).toEqual(6);
      expect(result.Mappings.Nist.length).toEqual(18);
    });

  });

  describe('getNistItemsWithMappings', () => {

    it('should be truthy', () => {
      let result = controlFrameworkClass.getNistItemsWithMappings();
      expect(result).toBeTruthy();
    });

  });

  describe('getMitigations', () => {
    let dataService: DataService;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [DataService]
      });
    });

    beforeEach(inject([DataService], async (service: DataService) => {
      dataService = service
      
      service.setUpURLs(config.versions as []);
      let domain = dataService.getDomain("enterprise-attack-v9")
      service.parseBundle(domain, enterpriseAttackBundle as []);
    }));

    it('should be truthy', () => {
      let result = controlFrameworkClass.getMitigations(dataService, "enterprise-attack-v9");
      expect(result).toBeTruthy();
    });

  });

});