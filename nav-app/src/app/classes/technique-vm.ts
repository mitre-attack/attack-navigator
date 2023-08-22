import { Link } from "./link";
import { Metadata } from "./metadata";
import tinycolor from "tinycolor2";

// the viewmodel for a specific technique
export class TechniqueVM {
    techniqueID: string;
    technique_tactic_union_id: string;
    tactic: string;

    score: string = "";
    scoreColor: string; // hex color for score gradient

    color: string = ""; //manually assigned color-class name
    enabled: boolean = true;
    comment: string = ""
    metadata: Metadata[] = [];
    public get metadataStr(): string { return JSON.stringify(this.metadata); }
    links: Link[] = [];
    public get linkStr(): string { return JSON.stringify(this.links); }

    showSubtechniques = false;
    aggregateScore: any; // number rather than string as this is not based on an input from user
    aggregateScoreColor: string; // hex color for aggregate score

    isVisible: boolean = true; // is technique currently displayed on matrix

    //print this object to the console
    print(): void {
        console.log(this.serialize())
        console.log(this)
    }

    /**
     * Has this TechniqueVM been modified from its initialized state?
     * @return true if it has been modified, false otherwise
     */
    modified(): boolean {
        return (this.annotated() || this.showSubtechniques);
    }

    /**
     * Check if this TechniqueVM has been annotated
     * @return true if it has annotations, false otherwise
     */
    annotated(): boolean {
        return (this.score != "" || this.color != "" || !this.enabled || this.comment != "" || this.links.length !== 0 || this.metadata.length !== 0);
    }

    /**
     * Reset this TechniqueVM's annotations to their default values
     */
    resetAnnotations(): void {
        this.score = "";
        this.comment = "";
        this.color = "";
        this.enabled = true;
        this.aggregateScore = "";
        this.aggregateScoreColor = "";
        this.links = [];
        this.metadata = [];
    }

    /**
     * Set isVisible based on filters
     */
    setIsVisible(visible: boolean): void {
        this.isVisible = visible;
    }

    /**
     * Convert to string representation
     * @return string representation
     */
    serialize(): string {
        let rep: { [k: string]: any } = {};
        rep.techniqueID = this.techniqueID;
        rep.tactic = this.tactic;
        if (this.score !== "" && !(isNaN(Number(this.score)))) rep.score = Number(this.score);
        rep.color = this.color;
        rep.comment = this.comment;
        rep.enabled = this.enabled;
        rep.metadata = this.metadata.filter(m => m.valid()).map(m => m.serialize());
        rep.links = this.links.filter(l => l.valid()).map(l => l.serialize());
        rep.showSubtechniques = this.showSubtechniques;
        return JSON.stringify(rep, null, "\t")
    }

    /**
     * Restore this technique from serialized technique
     * @param rep serialized technique string
     */
    deSerialize(rep: string, techniqueID: string, tactic: string): void {
        let obj = JSON.parse(rep);
        if (techniqueID !== undefined) this.techniqueID = techniqueID;
        else console.error("ERROR: TechniqueID field not present in technique")

        if (tactic !== undefined && tactic !== "") this.tactic = tactic;
        else {
            console.error("WARNING: tactic field not present in technique");
            alert(`WARNING: The tactic field on the technique ID ${techniqueID} is not defined. Annotations for this technique may not be restored.`);
        }
        if ("comment" in obj) {
            if (typeof (obj.comment) === "string") this.comment = obj.comment;
            else console.error("TypeError: technique comment field is not a number:", obj.comment, "(", typeof (obj.comment), ")")
        }
        if ("color" in obj && obj.color !== "") {
            if (typeof (obj.color) === "string" && tinycolor(obj.color).isValid()) this.color = obj.color;
            else console.error("TypeError: technique color field is not a color-string:", obj.color, "(", typeof (obj.color), ")")
        }
        if ("score" in obj) {
            if (typeof (obj.score) === "number") this.score = String(obj.score);
            else console.error("TypeError: technique score field is not a number:", obj.score, "(", typeof (obj.score), ")")
        }
        if ("enabled" in obj) {
            if (typeof (obj.enabled) === "boolean") this.enabled = obj.enabled;
            else console.error("TypeError: technique enabled field is not a boolean:", obj.enabled, "(", typeof (obj.enabled), ")");
        }
        if ("showSubtechniques" in obj) {
            if (typeof (obj.showSubtechniques) === "boolean") this.showSubtechniques = obj.showSubtechniques;
            else console.error("TypeError: technique showSubtechnique field is not a boolean:", obj.showSubtechniques, "(", typeof (obj.showSubtechniques), ")");
        }
        if (this.tactic !== undefined && this.techniqueID !== undefined) {
            this.technique_tactic_union_id = this.techniqueID + "^" + this.tactic;
        } else {
            console.error("ERROR: Tactic and TechniqueID field needed.")
        }

        if ("metadata" in obj) {
            for (let metadataObj of obj.metadata) {
                let m = new Metadata();
                m.deSerialize(metadataObj);
                if (m.valid()) this.metadata.push(m)
            }
        }
        if ("links" in obj) {
            for (let linkObj of obj.links) {
                let link = new Link();
                link.deSerialize(linkObj);
                if (link.valid()) this.links.push(link);
            }
        }
    }

    constructor(technique_tactic_union_id: string) {
        this.technique_tactic_union_id = technique_tactic_union_id;
        let idSplit = technique_tactic_union_id.split("^");
        this.techniqueID = idSplit[0];
        this.tactic = idSplit[1];
    }
}
