export class Link {
    public label: string;
    public url: string;
    public divider: boolean;

    constructor() {
        // intentionally left blank
    }

    serialize(): object { 
        return this.label && this.url ? {label: this.label, url: this.url} : {divider: this.divider};
    }

    deSerialize(rep: any): void {
        let obj = (typeof(rep) == "string")? JSON.parse(rep) : rep;
        if ("url" in obj) { // label & url object
            if (typeof(obj.url) === "string") this.url = obj.url;
            else console.error("TypeError: Link field 'url' is not a string");

            if ("label" in obj) {
                if (typeof(obj.label) === "string") this.label = obj.label;
                else console.error("TypeError: Link field 'label' is not a string");
            }
            else console.error("Error: Link required field 'label' not present");
        }
        else if ("divider" in obj) { // divider object
            if (typeof(obj.divider) === "boolean") this.divider = obj.divider;
            else  console.error("TypeError: Link field 'divider' is not a boolean");
        }
        else console.error("Error: Link required field 'url' or 'divider' not present");
    }

    valid(): boolean {
        return (this.label && this.label.length > 0 && this.url && this.url.length > 0) || (this.divider !== undefined)
    }
}