import { ServiceAuth } from '../services/data.service';
import { Version } from './version';
import { Asset, Campaign, DataComponent, DetectionStrategy, Group, Matrix, Mitigation, Note, Software, Tactic, Technique } from './stix';

export class Domain {
    public readonly id: string; // domain ID
    public readonly domain_identifier: string; //domain ID without the version suffix
    public readonly name: string; // domain display name
    public readonly version: Version; // ATT&CK version

    public urls: string[] = [];
    public taxii_url: string = '';
    public taxii_collection: string = '';
    public authentication: ServiceAuth;
    public dataLoaded: boolean = false;
    public dataLoadedCallbacks: any[] = [];

    // this should only be enabled if the user loads custom data via URL
    public isCustom: boolean = false;

    public matrices: Matrix[] = [];
    public get tactics(): Tactic[] {
        let tactics = [];
        for (let matrix of this.matrices) {
            tactics = tactics.concat(matrix.tactics);
        }
        return tactics;
    }
    public techniques: Technique[] = [];
    public platforms: string[] = []; // platforms defined on techniques and software of the domain
    public subtechniques: Technique[] = [];
    public software: Software[] = [];
    public campaigns: Campaign[] = [];
    public assets: Asset[] = [];
    public dataComponents: DataComponent[] = [];
    public dataSources = new Map<string, { name: string; external_references: any[] }>(); // Map data source ID to name and urls to be used by data components
    public dataComponentsToTechniques = new Map<string, Technique[]>(); // Map data component ID to list of related Techniques
    public groups: Group[] = [];
    public mitigations: Mitigation[] = [];
    public detectionStrategies: DetectionStrategy[] = [];
    public notes: Note[] = [];
    public relationships: any = {
        // subtechnique subtechnique-of technique
        // ID of technique to [] of subtechnique IDs
        subtechniques_of: new Map<string, string[]>(),
        // data component related to technique
        // ID of data component to [] of technique IDs
        component_rel: new Map<string, string[]>(),
        // detection strategy related to technique
        // ID of detection strategy to [] of technique IDs
        detection_strategies_detect: new Map<string, string[]>(),
        // group uses technique
        // ID of group to [] of technique IDs
        group_uses: new Map<string, string[]>(),
        // software uses technique
        // ID of software to [] of technique IDs
        software_uses: new Map<string, string[]>(),
        // campaign uses technique
        // ID of campaign to [] of technique IDs
        campaign_uses: new Map<string, string[]>(),
        // campaigns attributed to group
        // ID of group to [] of campaign IDs
        campaigns_attributed_to: new Map<string, string[]>(),
        // mitigation mitigates technique
        // ID of mitigation to [] of technique IDs
        mitigates: new Map<string, string[]>(),
        // object is revoked-by object
        // ID of object to ID of revoking object
        revoked_by: new Map<string, string>(),
        // technique targets asset
        // ID of asset to [] of technique IDs
        targeted_assets: new Map<string, string[]>(),
    };

    public get supportsLegacyDataSources(): boolean {
        return !!this.dataSources.size && !!this.relationships.component_rel.size;
    }

    constructor(domain_identifier: string, name: string, version: Version, urls?: string[]) {
        this.id = `${domain_identifier}-${version.number}`;
        this.domain_identifier = domain_identifier;
        this.name = name;
        this.version = version;
        if (urls) this.urls = urls;
    }

    /**
     * Get the version number for this domain
     */
    public getVersion(): string {
        return this.version.number;
    }

    public executeCallbacks(): void {
        for (let callback of this.dataLoadedCallbacks) {
            callback();
        }
    }

    public getTechniqueById(stixId: string): Technique {
        return this.techniques.find(t => t.id === stixId) ?? null;
    }
}
