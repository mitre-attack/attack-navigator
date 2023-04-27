import { Domain } from "./stix/domain";

export class Filter {
    // the data for a specific filter
    private readonly domain: string;
    platforms: {
        options: string[],
        selection: string[]
    }
    
    constructor() {
        this.platforms = {
            selection: [],
            options: []
        }
    }

    /**
     * Initialize the platform options according to the data in the domain
     * @param {Domain} domain the domain to parse for platform options
     */
    public initPlatformOptions(domain: Domain): void {
        this.platforms.options = JSON.parse(JSON.stringify(domain.platforms));
        if (!this.platforms.selection.length) { // prevent overwriting current selection
            this.platforms.selection = JSON.parse(JSON.stringify(domain.platforms));
        }
    }

    /**
     * toggle the given value in the given filter
     * @param {*} filterName the name of the filter
     * @param {*} value the value to toggle
     */
    toggleInFilter(filterName: string, value: string): void {
        if (!this[filterName].options.includes(value)) { console.log("not a valid option to toggle", value, this[filterName]); return }
        if (this[filterName].selection.includes(value)) {
            let index = this[filterName].selection.indexOf(value)
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
    inFilter(filterName, value): boolean {
        return this[filterName].selection.includes(value)
    }

    /**
     * Return the string representation of this filter
     * @return stringified filter
     */
    serialize(): string {
        return JSON.stringify({"platforms": this.platforms.selection})
    }

    /**
     * Replace the properties of this object with those of the given serialized filter
     * @param rep filter object
     */
    deSerialize(rep: any): void {
        let isStringArray = function(arr): boolean {
            for (let item of arr) {
                if (typeof(item) !== "string") {
                    console.error("TypeError:", item, "(",typeof(item),")", "is not a string")
                    return false;
                }

            }
            return true;
        }

        if (rep.platforms) {
            if (isStringArray(rep.platforms)) {
                let backwards_compatibility_mappings = { //backwards compatibility with older layers
                    "android": "Android",
                    "ios": "iOS",

                    "windows": "Windows",
                    "linux": "Linux",
                    "mac": "macOS",

                    "AWS": "IaaS",
                    "GCP": "IaaS",
                    "Azure": "IaaS"
                }
                const selection = new Set<string>();
                rep.platforms.forEach(function (platform) {
                    if (platform in backwards_compatibility_mappings) selection.add(backwards_compatibility_mappings[platform]);
                    else selection.add(platform);
                });
                this.platforms.selection = Array.from(selection);
            } else console.error("TypeError: filter platforms field is not a string[]");
        }
    }
}