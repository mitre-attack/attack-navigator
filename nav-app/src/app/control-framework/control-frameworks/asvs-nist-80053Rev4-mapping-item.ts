import { MappingAware } from './interfaces/mapping-aware';

export class AsvsNist80053Rev4MappingItem implements MappingAware {
    constructor(
        public itemId: string,
        public mappings: { NIST: string[] }) { }

    public mappingGroupingId() { return this.itemId; }
}
