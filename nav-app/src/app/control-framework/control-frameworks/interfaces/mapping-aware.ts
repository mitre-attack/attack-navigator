export interface MappingAware {
    mappings: any;
    mappingGroupingId(): string;
}
