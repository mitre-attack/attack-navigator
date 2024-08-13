// Mock Test Data

// mock data configurations
export const configData = {
    enabled: true,
    entries: [
        {
            name: 'ATT&CK v13',
            version: '13',
            domains: [
                {
                    name: 'Enterprise',
                    identifier: 'enterprise-attack',
                    data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json'],
                },
            ],
        },
    ],
};
export const collectionIndexConfig = {
    collection_index_url: 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/index.json',
};
export const versionsConfig = {
    versions: {
        enabled: true,
        entries: [
            {
                name: 'ATT&CK v13',
                version: '13',
                domains: [
                    {
                        name: 'Enterprise',
                        identifier: 'enterprise-attack',
                        data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json'],
                    },
                ],
            },
        ],
    },
};
export const customConfig = {
    ...collectionIndexConfig,
    ...versionsConfig,
};
export const invalidTypeConfig = {
    collection_index_url: false,
};
export const invalidConfig = {
    collection_index_url: '',
    versions: {},
};
export const configDataExtended = {
    enabled: true,
    entries: [
        {
            name: 'ATT&CK v13',
            version: '13',
            domains: [
                {
                    name: 'Enterprise',
                    identifier: 'enterprise-attack',
                    data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json'],
                },
            ],
        },
        {
            name: 'ATT&CK v12',
            version: '12',
            domains: [
                {
                    name: 'Enterprise',
                    identifier: 'enterprise-attack',
                    data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v12.1/enterprise-attack/enterprise-attack.json'],
                },
            ],
        },
    ],
};
export const defaultLayersEnabled = {
    enabled: true,
    urls: ['https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/samples/Bear_APT.json'],
};
export const defaultLayersDisabled = {
    enabled: false,
    urls: ['https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/samples/Bear_APT.json'],
};

export const taxiiData = {
    enabled: true,
    entries: [
        {
            name: 'ATT&CK v13',
            version: '13',
            domains: [
                {
                    name: 'Enterprise',
                    identifier: 'enterprise-attack',
                    taxii_url: 'https://cti-taxii.mitre.org/',
                    taxii_collection: '95ecc380-afe9-11e4-9b6c-751b66dd541e',
                },
            ],
        },
    ],
};

export const workbenchData = {
    enabled: true,
    entries: [
        {
            name: 'ATT&CK v13',
            version: '13',
            domains: [
                {
                    name: 'Enterprise',
                    identifier: 'enterprise-attack',
                    data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json'],
                },
            ],
            authentication: {
                enabled: true,
                serviceName: 'navigator',
                apiKey: 'sample-navigator-apikey',
            },
        },
    ],
};

export const configTechniqueControls = {
    name: 'technique_controls',
    enabled: true,
    description: 'Disable to disable all subfeatures',
    subfeatures: [
        { name: 'disable_techniques', enabled: true, description: 'Disable to remove the ability to disable techniques.' },
        { name: 'manual_color', enabled: true, description: 'Disable to remove the ability to assign manual colors to techniques.' },
        { name: 'background_color', enabled: true, description: 'Disable to remove the background color effect on manually assigned colors.' },
    ],
};
export const configToolbarControls = {
    name: 'toolbar_controls',
    enabled: true,
    description: 'Disable to disable all subfeatures',
    subfeatures: [{ name: 'sticky_toolbar', enabled: true, description: 'Disable to remove the ability to enable/disable the sticky toolbar.' }],
};

// mock collection index
export const collectionIndex = {
    name: 'MITRE ATT&CK',
    collections: [
        {
            name: 'Enterprise ATT&CK',
            id: 'x-mitre-collection--1f5f1533-f617-4ca8-9ab4-6a02367fa019',
            versions: [
                {
                    version: '14.1',
                    url: 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack-14.1.json',
                },
                {
                    version: '14.0',
                    url: 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack-14.0.json',
                },
            ],
        },
        {
            name: 'Mobile ATT&CK',
            id: 'x-mitre-collection--dac0d2d7-8653-445c-9bff-82f934c1e858',
            versions: [
                {
                    version: '14.1',
                    url: 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/mobile-attack/mobile-attack-14.1.json',
                },
                {
                    version: '1.0',
                    url: 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack-1.0.json',
                },
            ],
        },
        {
            name: 'ICS ATT&CK',
            id: 'x-mitre-collection--90c00720-636b-4485-b342-8751d232bf09',
            versions: [
                {
                    version: '14.1',
                    url: 'https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/ics-attack/ics-attack-14.1.json',
                    modified: '2023-11-14T14:00:00.188Z',
                },
            ],
        },
    ],
};

// mock base STIX SDOs
export const stixSDO = {
    name: 'Name',
    description: 'Description',
    created: '2001-01-01T01:01:00.000Z',
    modified: '2001-01-01T01:01:00.000Z',
    version: '1.0',
    x_mitre_domains: ['enterprise-attack'],
    x_mitre_version: '1.0',
};
export const stixSDO_v1_1 = {
    name: 'Name',
    description: 'Description',
    created: '2001-01-01T01:01:00.000Z',
    modified: '2001-01-01T01:01:00.000Z',
    version: '1.0',
    x_mitre_version: '1.1',
};

// mock technique SDOs
export const baseTechniqueSDO = {
    ...stixSDO,
    type: 'attack-pattern',
    x_mitre_platforms: ['PRE'],
    kill_chain_phases: [
        {
            kill_chain_name: 'mitre-attack',
            phase_name: 'tactic-name',
        },
    ],
};
export const T0000 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-0',
    external_references: [{ external_id: 'T0000' }],
};
export const T0000_Duplicate = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-0',
    external_references: [{ external_id: 'T0000' }],
};
export const T0000_000 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-1',
    x_mitre_is_subtechnique: true,
    external_references: [{ external_id: 'T0000.000' }],
};
export const T0000_001 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-2',
    x_mitre_is_subtechnique: true,
    revoked: true,
    external_references: [{ external_id: 'T0000.001' }],
};
export const T0000_002 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-7',
    x_mitre_is_subtechnique: true,
    external_references: [{ external_id: 'T0000.002' }],
};
export const T0001 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-3',
    external_references: [{ external_id: 'T0001' }],
};
export const T0002 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-4',
    x_mitre_data_sources: ['Network Traffic: Network Traffic Content'],
    x_mitre_deprecated: true,
    external_references: [{ external_id: 'T0002' }],
};
export const T0003 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-5',
    external_references: [{ external_id: 'T0003' }],
};
export const T0004 = {
    ...baseTechniqueSDO,
    id: 'attack-pattern-6',
    modified: '2002-01-01T01:01:00.000Z',
    external_references: [{ external_id: 'T0004' }],
};

// mock asset SDOs
export const A0000 = {
    ...stixSDO,
    id: 'asset-0',
    type: 'x-mitre-asset',
    external_references: [{ external_id: 'A0000' }],
};
export const A0001 = {
    ...stixSDO,
    id: 'asset-1',
    type: 'x-mitre-asset',
    external_references: [{ external_id: 'A0001' }],
};
export const invalidAsset = {
    ...stixSDO,
    id: 'asset-0',
    type: 'x-mitre-asset',
    external_references: [],
};

// mock campaign SDOs
export const C0000 = {
    ...stixSDO,
    id: 'campaign-0',
    type: 'campaign',
    external_references: [{ external_id: 'C0000' }],
};
export const C0001 = {
    ...stixSDO,
    id: 'campaign-1',
    type: 'campaign',
    external_references: [{ external_id: 'C0001' }],
};

// mock data component SDOs
export const DC0000 = {
    ...stixSDO,
    id: 'data-component-0',
    type: 'x-mitre-data-component',
    x_mitre_data_source_ref: 'data-source-0',
    external_references: [{ external_id: 'DC0000' }],
};
export const DC0001 = {
    ...stixSDO,
    id: 'data-component-1',
    type: 'x-mitre-data-component',
    x_mitre_data_source_ref: 'data-source-0',
    external_references: [{ external_id: 'DC0001', url: 'test-url.com' }],
};

// mock data source SDOs
export const DS0000 = {
    ...stixSDO,
    id: 'data-source-0',
    type: 'x-mitre-data-source',
    external_references: [{ external_id: 'DS0000' }],
};

// mock group SDOs
export const G0000 = {
    ...stixSDO,
    id: 'intrusion-set-0',
    type: 'intrusion-set',
    external_references: [{ external_id: 'G0000' }],
};
export const G0001 = {
    ...stixSDO_v1_1,
    id: 'intrusion-set-1',
    type: 'intrusion-set',
    external_references: [{ external_id: 'G0001' }],
};

// mock matrix SDOs
export const matrixSDO = {
    ...stixSDO,
    id: 'matrix-0',
    type: 'x-mitre-matrix',
    tactic_refs: ['tactic-0'],
    external_references: [{ external_id: 'enterprise-attack' }],
};
export const deprecatedMatrixSDO = {
    ...stixSDO,
    id: 'matrix-1',
    type: 'x-mitre-matrix',
    tactic_refs: ['tactic-0'],
    x_mitre_deprecated: true,
    external_references: [{ external_id: 'mobile-matrix' }],
};

// mock mitigation SDOs
export const M0000 = {
    ...stixSDO,
    id: 'mitigation-0',
    type: 'course-of-action',
    external_references: [{ external_id: 'M0000' }],
};
export const filteredM0001 = {
    ...stixSDO,
    id: 'mitigation-1',
    type: 'course-of-action',
    x_mitre_domains: ['not-enterprise-matrix'],
    external_references: [{ external_id: 'M0001' }],
};

// mock note SDOs
export const note = {
    ...stixSDO,
    id: 'note-0',
    type: 'note',
};

// mock software SDOs
export const malwareS0000 = {
    ...stixSDO,
    id: 'malware-0',
    type: 'malware',
    x_mitre_platforms: ['platform'],
    external_references: [{ external_id: 'S0000' }],
};
export const toolS0001 = {
    ...stixSDO,
    id: 'tool-0',
    type: 'tool',
    x_mitre_platforms: ['platform'],
    external_references: [{ external_id: 'S0001' }],
};

// mock tactic SDOs
export const TA0000 = {
    ...stixSDO,
    id: 'tactic-0',
    type: 'x-mitre-tactic',
    x_mitre_shortname: 'tactic-name',
    external_references: [{ external_id: 'TA0000' }],
};
export const TA0001 = {
    ...stixSDO,
    id: 'tactic-1',
    type: 'x-mitre-tactic',
    x_mitre_shortname: 'tactic-name-2',
    external_references: [{ external_id: 'TA0001' }],
};

// mock relationship SDOs
export const G0001usesT0000 = {
    id: 'relationship-0',
    type: 'relationship',
    source_ref: 'intrusion-set-0',
    relationship_type: 'uses',
    target_ref: 'attack-pattern-0',
};
export const S0000usesT0000 = {
    id: 'relationship-1',
    type: 'relationship',
    source_ref: 'malware-0',
    relationship_type: 'uses',
    target_ref: 'attack-pattern-0',
};
export const C0000usesT0000 = {
    id: 'relationship-2',
    type: 'relationship',
    source_ref: 'campaign-0',
    relationship_type: 'uses',
    target_ref: 'attack-pattern-0',
};
export const C0000attributedToG0000 = {
    id: 'relationship-3',
    type: 'relationship',
    source_ref: 'campaign-0',
    relationship_type: 'attributed-to',
    target_ref: 'intrusion-set-0',
};
export const M0000mitigatesT0000 = {
    id: 'relationship-4',
    type: 'relationship',
    source_ref: 'mitigation-0',
    relationship_type: 'mitigates',
    target_ref: 'attack-pattern-0',
};
export const T0000_000subtechniqueOfT0000 = {
    id: 'relationship-5',
    type: 'relationship',
    source_ref: 'attack-pattern-1',
    relationship_type: 'subtechnique-of',
    target_ref: 'attack-pattern-0',
};
export const T0000_001subtechniqueOfT0000 = {
    id: 'relationship-8',
    type: 'relationship',
    source_ref: 'attack-pattern-2',
    relationship_type: 'subtechnique-of',
    target_ref: 'attack-pattern-0',
};
export const DC0000detectsT0000 = {
    id: 'relationship-6',
    type: 'relationship',
    source_ref: 'data-component-0',
    relationship_type: 'detects',
    target_ref: 'attack-pattern-0',
};
export const T0000targetsA0000 = {
    id: 'relationship-7',
    type: 'relationship',
    source_ref: 'attack-pattern-0',
    relationship_type: 'targets',
    target_ref: 'asset-0',
};
export const T0000_001revokedByT0000_000 = {
    id: 'relationship-9',
    type: 'relationship',
    source_ref: 'attack-pattern-2',
    relationship_type: 'revoked-by',
    target_ref: 'attack-pattern-1',
};
export const G0000usesT0000_000 = {
    id: 'relationship-10',
    type: 'relationship',
    source_ref: 'intrusion-set-0',
    relationship_type: 'uses',
    target_ref: 'attack-pattern-1',
};
export const S0000usesT0000_000 = {
    id: 'relationship-11',
    type: 'relationship',
    source_ref: 'malware-0',
    relationship_type: 'uses',
    target_ref: 'attack-pattern-1',
};
export const C0000usesT0000_000 = {
    id: 'relationship-12',
    type: 'relationship',
    source_ref: 'campaign-0',
    relationship_type: 'uses',
    target_ref: 'attack-pattern-1',
};
export const M0000mitigatesT0000_000 = {
    id: 'relationship-13',
    type: 'relationship',
    source_ref: 'mitigation-0',
    relationship_type: 'mitigates',
    target_ref: 'attack-pattern-1',
};
export const DC0000detectsT0000_000 = {
    id: 'relationship-14',
    type: 'relationship',
    source_ref: 'data-component-0',
    relationship_type: 'detects',
    target_ref: 'attack-pattern-1',
};
export const C0001attributedToG0000 = {
    id: 'relationship-15',
    type: 'relationship',
    source_ref: 'campaign-1',
    relationship_type: 'attributed-to',
    target_ref: 'intrusion-set-0',
};
export const T0001targetsA0000 = {
    id: 'relationship-16',
    type: 'relationship',
    source_ref: 'attack-pattern-3',
    relationship_type: 'targets',
    target_ref: 'asset-0',
};

// mock stix bundle SDOs
export const stixBundleSDO = [
    {
        type: 'bundle',
        id: 'bundle-0',
        spec_version: '2.0',
        objects: [
            T0000,
            T0001,
            T0002,
            T0000_000,
            T0000_001,
            T0003,
            A0000,
            C0000,
            DC0000,
            DS0000,
            G0000,
            matrixSDO,
            M0000,
            note,
            malwareS0000,
            toolS0001,
            TA0000,
            G0001usesT0000,
            S0000usesT0000,
            C0000usesT0000,
            C0000attributedToG0000,
            M0000mitigatesT0000,
            T0000_000subtechniqueOfT0000,
            T0000_001subtechniqueOfT0000,
            DC0000detectsT0000,
            T0000targetsA0000,
            T0000_001revokedByT0000_000,
            filteredM0001,
            deprecatedMatrixSDO,
            G0000usesT0000_000,
            S0000usesT0000_000,
            C0000usesT0000_000,
            M0000mitigatesT0000_000,
            DC0000detectsT0000_000,
            C0001attributedToG0000,
            C0001,
            T0001targetsA0000,
            T0000_Duplicate,
        ],
    },
];

// mock invalid link and metadata values
export const invalidDivider = {
    divider: 'invalid',
};
export const invalidValue = {
    value: 'invalid',
};
export const invalidName = {
    name: 3,
};
export const invalidUrl = {
    url: 3,
};
export const invalidLink = {
    url: 3,
    label: 4,
};
export const invalidMetadata = {
    name: 3,
    value: 4,
};
