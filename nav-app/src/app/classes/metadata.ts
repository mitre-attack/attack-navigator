export class Metadata {
    public name: string;
    public value: string;
    public divider: boolean;

    constructor() {
        // intentionally left blank
    }

    serialize(): object {
        return this.name && this.value ? {name: this.name, value: this.value} : {divider: this.divider};
    }

    deSerialize(rep: any): void {
        let obj = (typeof(rep) == "string")? JSON.parse(rep) : rep;
        if ("name" in obj) { // name & value object
            if (typeof(obj.name) === "string") this.name = obj.name;
            else console.error("TypeError: Metadata field 'name' is not a string");

            if ("value" in obj) {
                if (typeof(obj.value) === "string") this.value = obj.value;
                else console.error("TypeError: Metadata field 'value' is not a string")
            }
            else console.error("Error: Metadata required field 'value' not present");
        }
        else if ("divider" in obj) { // divider object
            if (typeof(obj.divider) === "boolean") this.divider = obj.divider;
            else  console.error("TypeError: Metadata field 'divider' is not a boolean");
        }
        else console.error("Error: Metadata required field 'name' or 'divider' not present");
    }

    valid(): boolean {
        return (this.name && this.name.length > 0 && this.value && this.value.length > 0) || (this.divider !== undefined)
    }
}
