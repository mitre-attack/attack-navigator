import { MappingAware } from './interfaces/mapping-aware';

export class AsvsOwaspItem implements MappingAware {
    constructor(
        public section: string,
        public name: string,
        public itemId: string,
        public description: string,
        public l1: boolean,
        public l2: boolean,
        public l3: boolean,
        public mappings: {CWE: number, NIST: string[]}) { }

    public mappingGroupingId() { return this.itemId; }
}
