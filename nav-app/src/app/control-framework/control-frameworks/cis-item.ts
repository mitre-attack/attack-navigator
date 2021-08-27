import { MappingAware } from './interfaces/mapping-aware';

export class CisItem implements MappingAware {
    constructor(
        public cisControlId: string,
        public cisSubControlId: string,
        public assetType: string,
        public securityFunction: string,
        public title: string,
        public description: string,
        public mappings: any,
        public subcategoryName: string
    ) { }

    public mappingGroupingId() { return this.cisSubControlId; }
}
