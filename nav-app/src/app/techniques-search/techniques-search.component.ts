import { Component, OnInit, Input } from '@angular/core';
import { ViewModel } from '../viewmodels.service';
import { MatDialog } from '@angular/material/dialog';
import {BaseStix, DataService, Group, Mitigation, Software, Technique} from '../data.service';

@Component({
  selector: 'app-techniques-search',
  templateUrl: './techniques-search.component.html',
  styleUrls: ['./techniques-search.component.scss']
})
export class TechniquesSearchComponent implements OnInit {
    @Input() viewModel: ViewModel;
    public stixTypes: any[];

    public fields = [
        {
            "label": "name",
            "field": "name",
            "enabled": true
        },
        {
            "label": "ATT&CK ID",
            "field": "attackID",
            "enabled": true
        },
        // {
        //     "label": "STIX ID",
        //     "field": "id",
        //     "enabled": false
        // },
        {
            "label": "description",
            "field": "description",
            "enabled": true
        },
        {
            "label": "data sources",
            "field": "datasources",
            "enabled": true
        }
    ]

    private _query: string = "";
    public set query(newQuery: string) {
        this._query = newQuery;
        this.getStixResults(this._query);
        this.getTechniqueResults(this._query)
    }
    public get queryLength(): number {
        return this._query.length;
    }
    public techniqueResults: Technique[] = [];

    constructor(private dataService: DataService) {
        this.stixTypes = [];
    }

    ngOnInit() {
        this.getStixData()
    }

    getTechniqueResults(query= "") {
        let self = this;
        if (query.trim() != "") {
            //get master list of techniques and sub-techniques
            let allTechniques = this.dataService.getDomain(this.viewModel.domainID).techniques;
            for (let technique of allTechniques) {
                allTechniques = allTechniques.concat(technique.subtechniques);
            }

            let techniqueResults = allTechniques.filter(function(technique: Technique) {
                for (let field of self.fields) {
                    if (field.enabled) {
                        // query in this field
                        if (technique[field.field]?.toLowerCase().includes(self._query.trim().toLowerCase())) return true;
                    }
                }
                return false;
            });
            // deconflict IDs for cross-tactic techniques
            let seenIDs = new Set();
            techniqueResults = techniqueResults.filter(function(technique: Technique) {
                if (seenIDs.has(technique.id)) return false;
                else {
                    seenIDs.add(technique.id);
                    return true;
                }
            })

            techniqueResults = techniqueResults.sort((tA: Technique, tB: Technique) => {
                let c1 = tA.isSubtechnique ? tA.parent.name : tA.name;
                let c2 = tB.isSubtechnique ? tB.parent.name : tB.name;
                return c1.localeCompare(c2)
            });
            // console.log(seenIDs, techniqueResults)
            this.techniqueResults = techniqueResults;
        } else {
            this.techniqueResults = [];
        }
    }

    getStixData() {
        let domain = this.dataService.getDomain(this.viewModel.domainID);

        this.stixTypes = [{
            "label": "threat groups",
            "objects": this.filterAndSort(domain.groups.filter((group, i, arr) => arr.findIndex(t => t.id === group.id) === i))
        }, {
            "label": "software",
            "objects": this.filterAndSort(domain.software)
        }, {
            "label": "mitigations",
            "objects": this.filterAndSort(domain.mitigations)
        }]
    }

    getStixResults(query= "") {
        if (query.trim() != "") {
            this.stixTypes.forEach(item => item['objects'] = this.filterAndSort(item['objects'], query));
        } else {
            this.getStixData();
        }
    }

    public filterAndSort(items: any[], query= "") {
        let results = items;
        if (query.trim() != "") {
            results = results.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase()))
        }
        return results.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    public toggleFieldEnabled(field: string) {
        for (let thefield of this.fields) {
            if (thefield.field == field) {
                thefield.enabled = !thefield.enabled;
                break;
            }
        }
        this.query = this._query;
    }

    public select(technique: Technique): void {
        this.viewModel.selectTechniqueAcrossTactics(technique);
    }

    public deselect(technique: Technique): void {
        this.viewModel.unselectTechniqueAcrossTactics(technique);
    }

    public selectAll(): void {
        for (let result of this.techniqueResults) this.select(result);
    }

    public deselectAll(): void {
        for (let result of this.techniqueResults) this.deselect(result);
    }

    public getRelated(stixObject: BaseStix): Technique[] {
        // master list of all techniques and sub-techniques
        let techniques = this.dataService.getDomain(this.viewModel.domainID).techniques;
        let allTechniques = techniques.concat(this.dataService.getDomain(this.viewModel.domainID).subtechniques);
        let domainID = this.viewModel.domainID;

        if (stixObject instanceof Group) {
            return allTechniques.filter((technique: Technique) => (stixObject as Group).relatedTechniques(domainID).includes(technique.id));
        } else if (stixObject instanceof Software) {
            return allTechniques.filter((technique: Technique) => (stixObject as Software).relatedTechniques(domainID).includes(technique.id));
        } else if (stixObject instanceof Mitigation) {
            return allTechniques.filter((technique: Technique) => (stixObject as Mitigation).relatedTechniques(domainID).includes(technique.id));
        }
    }

    public deselectStix(stixObject: BaseStix): void {
        for (let technique of this.getRelated(stixObject)) {
            this.viewModel.unselectTechniqueAcrossTactics(technique);
        }
    }

    public selectStix(stixObject: BaseStix): void {
        for (let technique of this.getRelated(stixObject)) {
            this.viewModel.selectTechniqueAcrossTactics(technique);
        }
    }
}
