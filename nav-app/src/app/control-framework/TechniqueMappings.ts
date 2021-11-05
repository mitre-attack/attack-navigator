import { NistItem } from "./control-frameworks/nist-item";
import { CisItem } from "./control-frameworks/cis-item";
import { AsvsOwaspItem } from "./control-frameworks/asvs-owasp-item";
import { Mitigation } from '../data.service';


export class TechniqueMappings {
  public Mitigations: Mitigation[];
  public Nist: NistItem[];
  public Cis: CisItem[];
  public Asvs: AsvsOwaspItem[];

}
