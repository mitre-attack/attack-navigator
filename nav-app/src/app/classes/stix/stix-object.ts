import { DataService } from '../../services/data.service';

export abstract class StixObject {
    public readonly id: string; // STIX ID
    public readonly attackID: string; // ATT&CK ID
    public readonly name: string; // name of object
    public readonly description: string; // description of object
    public readonly url: string; // URL of object on the ATT&CK website
    public readonly created: string; // date object was created
    public readonly modified: string; // date object was last modified
    public readonly revoked: boolean; // is the object revoked?
    public readonly deprecated: boolean; // is the object deprecated?
    public readonly version: string; // object version
    protected readonly dataService: DataService;

    constructor(stixSDO: any, dataService: DataService, supportsAttackID = true) {
        // Properties
        this.id = stixSDO.id;
        this.name = stixSDO.name;
        this.description = stixSDO?.description ?? "";
        this.created = stixSDO.created;
        this.modified = stixSDO.modified;
        this.revoked = stixSDO.revoked ? stixSDO.revoked : false;
        this.deprecated = stixSDO.x_mitre_deprecated ? stixSDO.x_mitre_deprecated : false;
        this.version = stixSDO.x_mitre_version ? stixSDO.x_mitre_version : '';
        this.dataService = dataService;

        // ATT&CK ID
        if (supportsAttackID) {
            if (stixSDO.external_references && stixSDO.external_references[0] && stixSDO.external_references[0].external_id) {
                this.attackID = stixSDO.external_references[0].external_id;
            } else {
                alert('Error: external_references has invalid format in imported StixObject (ID: ' + stixSDO.id + ')');
                throw new Error(
                    'Error: external_references has invalid format in imported StixObject. Read more here: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_72bcfr3t79jx'
                );
            }
        }

        // URL
        if ('external_references' in stixSDO && stixSDO.external_references.length > 0) {
            this.url = stixSDO.external_references[0].url;
        } else {
            this.url = '';
        }
    }

    /**
     * Compare this object's version number to another object's version number
     * @param that the object to compare to
     * @returns 0 if the objects have the same version,
     *          > 0 if this object's version is greater,
     *          < 0 if that object's version is greater
     */
    public compareVersion(that: StixObject): number {
        if (!this.version || !that.version) return 0; // one or both of the objects have no version

        let thisVersion = this.version.split('.');
        let thatVersion = that.version.split('.');

        for (let i = 0; i < Math.max(thisVersion.length, thatVersion.length); i++) {
            if (thisVersion.length == thatVersion.length && thisVersion.length < i) return 0;
            if (thisVersion.length < i) return -1;
            if (thatVersion.length < i) return 1;
            if (+thisVersion[i] == +thatVersion[i]) continue;
            return +thisVersion[i] - +thatVersion[i];
        }
        return 0;
    }

    /**
     * get the stix object that this object is revoked by
     * @param {string} domainVersionID the ID of the domain & version this object is found in
     * @returns {string} object ID this object is revoked by
     */
    public revoked_by(domainVersionID): string {
        let rels = this.dataService.getDomain(domainVersionID).relationships.revoked_by;
        if (rels.has(this.id)) return rels.get(this.id);
        else return undefined;
    }
}
