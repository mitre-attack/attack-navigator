import { Domain } from './stix/domain';

export class Filter {
    // the data for a specific filter
    private readonly domain: string;
    public platforms: {
        options: string[];
        selection: string[];
    };

    public dataSources : {
        options: string[];
        selection: string[];
    }

    constructor() {
        this.platforms = {
            selection: [],
            options: [],
        };

        this.dataSources = {
            selection: [],
            options: [],
        };
    }

    /**
     * Initialize the platform options according to the data in the domain
     * @param {Domain} domain the domain to parse for platform options
     */
    public initPlatformOptions(domain: Domain): void {
        this.platforms.options = JSON.parse(JSON.stringify(domain.platforms));
        if (!this.platforms.selection.length) {
            // prevent overwriting current selection
            this.platforms.selection = JSON.parse(JSON.stringify(domain.platforms));
        }
    }

    /**
     * Initialize the data source options according to the data in the domain
     * @param {Domain} domain the domain to parse for data source options
     */

    public initDataSourcesOptions(domain: Domain): void {
        // dataSourcesMap is a Map<string, { name: string; external_references: any[] }>
        // We want to store the name field in the options array as well as the selection array

        // Iterate over the entries of the Map
        for (const [key, value] of domain.dataSources.entries()) {
            // Store the name field in the options array
            this.dataSources.options.push(value.name);
            this.dataSources.selection.push(value.name);
        }

    }

    /**
     * toggle the given value in the given filter
     * @param {*} filterName the name of the filter
     * @param {*} value the value to toggle
     */
    public toggleInFilter(filterName: string, value: string): void {
        if (!this[filterName].options.includes(value)) {
            console.error('not a valid option to toggle', value, this[filterName]);
            return;
        }
        if (this[filterName].selection.includes(value)) {
            let index = this[filterName].selection.indexOf(value);
            this[filterName].selection.splice(index, 1);
        } else {
            this[filterName].selection.push(value);
        }
    }

    /**
     * determine if the given value is active in the filter
     * @param {*} filterName the name of the filter
     * @param {*} value the value to determine
     * @returns {boolean} true if value is currently enabled in the filter
     */
    public inFilter(filterName, value): boolean {
        return this[filterName].selection.includes(value);
    }

    /**
     * Return the string representation of this filter
     * @return stringified filter
     */
    public serialize(): string {
        return JSON.stringify({ platforms: this.platforms.selection, dataSources: this.dataSources.selection });
    }

    /**
     * Replace the properties of this object with those of the given serialized filter
     * @param rep filter object
     */
    public deserialize(rep: any): void {
        let isStringArray = function (arr): boolean {
            for (let item of arr) {
                if (typeof item !== 'string') {
                    console.error('TypeError:', item, '(', typeof item, ')', 'is not a string');
                    return false;
                }
            }
            return true;
        };

        let isDataSourcesMap = function (obj: any): boolean {
            // Check if obj is an instance of Map
            if (!(obj instanceof Map)) {
                return false;
            }

            // Iterate over the entries of the Map
            for (const [key, value] of obj.entries()) {
                // Check if key is a string and value is an object with 'name' and 'external_references' properties
                if (typeof key !== 'string' || typeof value !== 'object' || value === null || !('name' in value) || !('external_references' in value)) {
                    return false;
                }
            }

            return true;
        }


        // Deserialize platforms
        if (rep.platforms) {
            if (isStringArray(rep.platforms)) {
                let backwards_compatibility_mappings = {
                    //backwards compatibility with older layers
                    android: 'Android',
                    ios: 'iOS',

                    windows: 'Windows',
                    linux: 'Linux',
                    mac: 'macOS',

                    AWS: 'IaaS',
                    GCP: 'IaaS',
                    Azure: 'IaaS',
                };
                const selection = new Set<string>();
                rep.platforms.forEach(function (platform) {
                    if (platform in backwards_compatibility_mappings) selection.add(backwards_compatibility_mappings[platform]);
                    else selection.add(platform);
                });
                this.platforms.selection = Array.from(selection);
            } else console.error('TypeError: filter platforms field is not a string[]');
        }

        // Deserialize data sources

        if(rep.dataSources) {
            if (isDataSourcesMap(rep.dataSources)) {
                this.dataSources.selection = Array.from(rep.dataSources.keys());
                // show debug message
                console.log('Data Sources:', this.dataSources.selection);
                // assert that selections is an array
                if (!Array.isArray(this.dataSources.selection)) {
                    console.error('TypeError: filter dataSources selection field is not a string[]');
                }
            } else console.error('TypeError: filter dataSources field is not a Map<string, { name: string; external_references: any[] }>');
        }
    }
}
