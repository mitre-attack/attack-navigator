import { Tactic } from "./stix/tactic";
import { Technique } from "./stix/technique";

export class ContextMenuItem {
    public readonly label: string;
    private readonly url: string;
    private readonly subtechnique_url: string;

    constructor(label, url, subtechnique_url=null) {
        this.label = label;
        this.url = url;
        this.subtechnique_url = subtechnique_url;
    }

    public getReplacedURL(technique: Technique, tactic: Tactic): string {
        if (this.subtechnique_url && technique.isSubtechnique) {
            return this.subtechnique_url.replace(/{{parent_technique_attackID}}/g, technique.parent.attackID)
                                        .replace(/{{parent_technique_stixID}}/g, technique.parent.id)
                                        .replace(/{{parent_technique_name}}/g, technique.parent.name.replace(/ /g, "-").toLowerCase())

                                        .replace(/{{subtechnique_attackID}}/g, technique.attackID)
                                        .replace(/{{subtechnique_attackID_suffix}}/g, technique.attackID.split(".")[1])
                                        .replace(/{{subtechnique_stixID}}/g, technique.id)
                                        .replace(/{{subtechnique_name}}/g, technique.name.replace(/ /g, "-").toLowerCase())

                                        .replace(/{{tactic_attackID}}/g, tactic.attackID)
                                        .replace(/{{tactic_stixID}}/g, tactic.id)
                                        .replace(/{{tactic_name}}/g, tactic.shortname);
        } else {
            return this.url.replace(/{{technique_attackID}}/g, technique.attackID)
                           .replace(/{{technique_stixID}}/g, technique.id)
                           .replace(/{{technique_name}}/g, technique.name.replace(/ /g, "-").toLowerCase())

                           .replace(/{{tactic_attackID}}/g, tactic.attackID)
                           .replace(/{{tactic_stixID}}/g, tactic.id)
                           .replace(/{{tactic_name}}/g, tactic.shortname);
        }
    }
}