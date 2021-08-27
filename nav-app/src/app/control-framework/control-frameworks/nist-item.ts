import { MappingAware } from './interfaces/mapping-aware';

export class NistItem implements MappingAware {
    constructor(
        public secFunction: string,
        public category: { id: string; description: string; },
        public subcategory: { id: string; description: string; },
        public mappings: any) { }
    
        public mappingGroupingId() { return this.subcategory?.id; }
}