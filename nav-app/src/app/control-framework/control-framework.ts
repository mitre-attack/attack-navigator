import { NistItem } from "./control-frameworks/nist-item";
import { CisItem } from "./control-frameworks/cis-item";
import { AsvsOwaspItem } from "./control-frameworks/asvs-owasp-item";
import { nist } from './control-frameworks/mappings/NIST';
import { cisNist } from './control-frameworks/mappings/CIS-Nist';
import { owaspAsvs } from './control-frameworks/mappings/OWASP-ASVS';
import { techniquesNist } from './control-frameworks/mappings/techniqueIdsToNist';
import { asvsNistMapping } from './control-frameworks/mappings/ASVS-map'
import { DataService, Mitigation, Technique } from '../data.service';
import { AsvsNist80053Rev4MappingItem } from './control-frameworks/asvs-nist-80053Rev4-mapping-item';
import { mitigationNist } from './control-frameworks/mappings/mitigations-nist'

export class ControlFramework {
  constructor() {
    this.nistItems = nist.map(x => new NistItem(x.secFunction, x.category, x.subcategory, x.mappings));
    this.cisItems = cisNist.map(x => new CisItem(x.cisControlId.toString(), x.cisSubControlId.toString(), x.assetType, x.securityFunction, x.title, x.description, x.mappings, x.subcategoryName));
    this.owaspAsvs = owaspAsvs.map(x => new AsvsOwaspItem(x.section, x.name, x.itemId, x.description, x.l1, x.l2, x.l3, x.mappings));
    this.techniquesNist = techniquesNist;
    this.asvsNist80053Mapping = asvsNistMapping.map(x => new AsvsNist80053Rev4MappingItem(x.id, x.mappings));
    this.mitigationNist = mitigationNist;
  }

  nistItems: NistItem[];
  cisItems: CisItem[];
  owaspAsvs: AsvsOwaspItem[];
  asvsNist80053Mapping: AsvsNist80053Rev4MappingItem[];
  techniquesNist: { techniqueID: string, nist: string[] }[];
  mitigationNist: { mitigation: { attackId: string, description: string, url: string }, nist: Array<string> }[]

  private techniquesByAttackIdCache = new Map<string, { techniqueID: string, nist: string[] }>();
  private nistItemByNistSubCatIdCache = new Map<string, NistItem>();
  private cisItemsByNistSubCatId = new Map<string, CisItem[]>();
  private nistByMitigationAttackId = new Map<string, NistItem[]>();
  private allNistItemsWithMappingsCache: { nist: NistItem, asvs: AsvsOwaspItem[], cis: CisItem[] }[];

  removeMapping(nistSubCatId: any, mitigationAttackId: any) {
    if (this.nistByMitigationAttackId.has(mitigationAttackId)) {
      this.nistByMitigationAttackId.delete(mitigationAttackId);
    }

    let index = mitigationNist.findIndex(x => x.mitigation.attackId === mitigationAttackId);
    mitigationNist[index].nist = mitigationNist[index].nist.filter(x => x !== nistSubCatId);

    this.techniquesByAttackIdCache.clear();
    this.allNistItemsWithMappingsCache = null;
  }

  addMapping(nistSubCatId: any, mitigationAttackId: any) {
    if (this.nistByMitigationAttackId.has(mitigationAttackId)) {
      this.nistByMitigationAttackId.delete(mitigationAttackId);
    }

    let index = mitigationNist.findIndex(x => x.mitigation.attackId === mitigationAttackId);
    mitigationNist[index].nist.push(nistSubCatId);

    this.techniquesByAttackIdCache.clear();
    this.allNistItemsWithMappingsCache = null;
  }


  public getNistByMitigationId(mitigationAttackId) {
    if (!this.nistByMitigationAttackId.has(mitigationAttackId)) {
      this.nistByMitigationAttackId.set(mitigationAttackId, this.mitigationNist.find(x => x.mitigation.attackId === mitigationAttackId)?.nist.map(x => this.getNistItemByNistSubCatId(x)));
    }

    return this.nistByMitigationAttackId.get(mitigationAttackId);
  }

  public getNistItemByNistSubCatId(nistSubCatId: string): NistItem {
    if (!this.nistItemByNistSubCatIdCache.has(nistSubCatId)) {
      this.nistItemByNistSubCatIdCache.set(nistSubCatId, this.nistItems.find(x => x.subcategory.id === nistSubCatId));
    }

    return this.nistItemByNistSubCatIdCache.get(nistSubCatId);
  }

  public getCisItemByNistSubCatId(nistSubCatId: string): CisItem[] {
    if (!this.cisItemsByNistSubCatId.has(nistSubCatId)) {
      let cisItemsWithNistSubCatIdMapping = this.cisItems.filter(x => {
        let cis80053Mappings = x.mappings["NIST SP 800-53 Rev. 4"];
        return cis80053Mappings === nistSubCatId;
      })

      this.cisItemsByNistSubCatId.set(nistSubCatId, cisItemsWithNistSubCatIdMapping);
    }

    return this.cisItemsByNistSubCatId.get(nistSubCatId);
  }

  public getTechniqueMapping(technique: Technique, domainID: string): { technique: Technique, mapping: { mitigations: Mitigation[], nist: NistItem[], cis: CisItem[], asvs: AsvsOwaspItem[] } } {
    if (this.techniquesByAttackIdCache[technique.attackID] === undefined) {

      let mitigations = technique.getAllMitigations(domainID);
      let nistItems = [...new Set(mitigations?.map(x => this.getNistByMitigationId(x.attackID)).reduce((x, i) => x.concat(i), []))];

      let filteredOwaspAsvs = this.getAsvsIdsFromNist(nistItems);

      let cisItems = nistItems.length > 0 ? nistItems.map(x => x != undefined ? this.getCisItemByNistSubCatId(x.mappingGroupingId()) : [])
        .reduce((x, i) => x ? x.concat(i) : i)
        .filter((v, i, a) => a.indexOf(v) === i) : [];

      let asvsItems = filteredOwaspAsvs && filteredOwaspAsvs !== null ? filteredOwaspAsvs : [];

      let mapping = {
        mitigations: mitigations,
        nist: nistItems,
        cis: cisItems,
        asvs: asvsItems
      }
      this.techniquesByAttackIdCache[technique.attackID] = { technique: technique, mapping: mapping };
    }

    return this.techniquesByAttackIdCache[technique.attackID];
  }

  private getAsvsIdsFromNist(nistItems: NistItem[]) {
    let nist80053Ids = this.getNist80053Ids(nistItems);

    let asvsIds = this.asvsNist80053Mapping.filter(x => x.mappings.NIST.filter(n => nist80053Ids.has(n)).length > 0).map(x => x.itemId);
    let filteredOwaspAsvs = this.owaspAsvs.filter(x => asvsIds.includes(x.itemId));
    return filteredOwaspAsvs;
  }

  public getNistItemsWithMappings() {
    if (!this.allNistItemsWithMappingsCache) {
      this.allNistItemsWithMappingsCache = this.nistItems.map(x => {
        let mappings: { nist: NistItem, asvs: AsvsOwaspItem[], cis: CisItem[] } = { nist: x, asvs: [], cis: [] };
        mappings.asvs = this.getAsvsIdsFromNist([x]);
        mappings.cis = this.getCisItemByNistSubCatId(x.subcategory.id);
        return mappings;
      }).sort((a, b) => a.nist.mappingGroupingId < b.nist.mappingGroupingId ? -1 : 1);
    }

    return this.allNistItemsWithMappingsCache;
  }

  private getNist80053Ids(nistItems: NistItem[]) {
    let nist80053Ids = new Set<string>();
    nistItems.forEach(x => { x?.mappings["NIST SP 800-53 Rev. 4"]?.forEach(r => nist80053Ids.add(r)); });
    return nist80053Ids;
  }

  /** 
   * A function to derive the nist mappings for the mitigations when all we have are mapping from technique to mitigation. 
   * This is just a helping function to start the mapping off. The idea being to refine the list. 
   */
  public getMitigations(dataService: DataService, domainID: string) {
    var domain =  dataService.getDomain(domainID);

    return domain.mitigations.map(x => ({
      mitigation: { attackId: x.attackID, description: x.description, url: x.url }, nist: [...new Set(x.mitigated(domainID).map(i => {
        let technique = domain.techniques.find(j => j.id === i);
        if (technique) {
          return this.getTechniqueMapping(technique, domainID).mapping.nist.map(n => n.subcategory.id);
        } else { return []; }
      }).reduce((i, j) => i.concat(j)).filter(a => a.length > 0))]
    }));
  }
}