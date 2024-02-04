let baseLayer = {
    name: 'layer',
    versions: {
        attack: '13',
        navigator: '4.9.0',
        layer: '4.5',
    },
    description: '',
    filters: {
        platforms: [
            'None',
            'mac',
            'Windows',
            'Human-Machine Interface',
            'Control Server',
            'Data Historian',
            'Field Controller/RTU/PLC/IED',
            'Input/Output Server',
            'Safety Instrumented System/Protection Relay',
            'Engineering Workstation',
        ],
    },
    sorting: 0,
    hideDisabled: false,
    gradient: {
        colors: ['#ff6666ff', '#ffe766ff', '#8ec843ff'],
        minValue: 0,
        maxValue: 100,
    },
    legendItems: [
        {
            color: '#FF00FF',
            label: 'Legend Item Label',
        },
    ],
    showTacticRowBackground: false,
    tacticRowBackground: '#dddddd',
    selectTechniquesAcrossTactics: true,
    selectSubtechniquesWithParent: false,
    selectVisibleTechniques: false,
};

let defaultLayout = {
    layout: {
        layout: 'side',
        aggregateFunction: 'average',
        showID: false,
        showName: true,
        showAggregateScores: false,
        countUnscored: false,
        expandedSubtechniques: 'none',
    },
};

let mockMetadata = {
    metadata: [
        {
            name: 'test1',
            value: 't1',
        },
        {
            divider: true,
        },
    ],
};

let mockLinks = {
    links: [
        {
            label: 'test1',
            url: 't1',
        },
        {
            divider: true,
        },
    ],
};

let techniqueConfig = {
    color: '#e60d0d',
    comment: '',
    score: 3,
    enabled: true,
    showSubtechniques: false,
};

export const layerFile1 = {
    ...baseLayer,
    domain: 'enterprise-attack',
    ...defaultLayout,
    ...mockMetadata,
    ...mockLinks,
    techniques: [
        {
            techniqueID: 'T0889',
            tactic: 'persistence',
            ...techniqueConfig,
            ...mockMetadata,
            ...mockLinks,
        },
        {
            techniqueID: 'T1595',
            ...techniqueConfig,
            ...mockMetadata,
            ...mockLinks,
        },
        {
            techniqueID: 'T1595.002',
            ...techniqueConfig,
            metadata: [],
            links: [],
        },
    ],
};

export const layerFile2 = {
    ...baseLayer,
    domain: 'enterprise-attack',
    viewMode: 1,
    ...mockMetadata,
    ...mockLinks,
    customDataURL: 'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json',
    techniques: [
        {
            techniqueID: 'T0889',
            tactic: 'persistence',
            color: '#e60d0d',
            comment: '',
            enabled: true,
            metadata: [],
            links: [],
            showSubtechniques: false,
        },
    ],
    legendItems: [],
};

export const layerFile3 = {
    ...baseLayer,
    domain: 'mobile-attack',
    ...defaultLayout,
    ...mockMetadata,
    ...mockLinks,
    techniques: [
        {
            techniqueID: 'T0889',
            tactic: 'persistence',
            ...techniqueConfig,
            ...mockMetadata,
            ...mockLinks,
        },
        {
            techniqueID: 'T1595',
            ...techniqueConfig,
            ...mockMetadata,
            ...mockLinks,
        },
        {
            techniqueID: 'T1595.002',
            ...techniqueConfig,
            metadata: [],
            links: [],
        },
    ],
};

export const invalidLayerFile1 = {
    description: 3,
    sorting: '3',
    hideDisabled: 'true',
    showTacticRowBackground: 'false',
    selectTechniquesAcrossTactics: 'true',
    selectSubtechniquesWithParent: 'true',
    selectVisibleTechniques: 'false',
    viewMode: '4',
    legendItems: [
        {
            label: true,
        },
        {
            color: true,
        },
        {
            label: true,
            color: '#FF00FF',
        },
        {
            label: 'Legend Item Label',
            color: true,
        },
    ],
    tacticRowBackground: false,
    techniques: [
        {
            techniqueID: 'T0002',
            color: '#e60d0d',
            comment: '',
            score: 3,
            enabled: true,
            metadata: [
                {
                    name: 'test1',
                    value: 't1',
                },
                {
                    divider: true,
                },
            ],
            links: [
                {
                    label: 'test1',
                    url: 't1',
                },
                {
                    divider: true,
                },
            ],
            showSubtechniques: false,
        },
        {
            techniqueID: 'T1592.001',
            color: '#e60d0d',
            comment: '',
            score: 3,
            enabled: true,
            metadata: [],
            links: [],
            showSubtechniques: false,
        },
    ],
};
