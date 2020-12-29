import { Component, OnInit, Input } from '@angular/core';
import { ViewModel } from '../viewmodels.service';
import { DataService, Technique } from '../data.service';

@Component({
  selector: 'app-techniques-search',
  templateUrl: './techniques-search.component.html',
  styleUrls: ['./techniques-search.component.scss']
})
export class TechniquesSearchComponent implements OnInit {
    @Input() viewModel: ViewModel;
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
        let self = this;
        this._query = newQuery;
        if (this._query.trim() != "") {
            // search

            //get master list of techniques and sub-techniques
            let allTechniques = this.dataService.getDomain(this.viewModel.domainID).techniques;
            for (let technique of allTechniques) {
                allTechniques = allTechniques.concat(technique.subtechniques);
            }

            let results = allTechniques.filter(function(technique: Technique) {
                for (let field of self.fields) {
                    if (field.enabled) {
                        // query in this field
                        if (technique[field.field].toLowerCase().includes(self._query.trim().toLowerCase())) return true;
                    }
                }
                return false;
            });
            // deconflict IDs for cross-tactic techniques
            let seenIDs = new Set();
            results = results.filter(function(technique: Technique) {
                if (seenIDs.has(technique.id)) return false;
                else {
                    seenIDs.add(technique.id);
                    return true;
                }
            })

            results = results.sort((tA: Technique, tB: Technique) => {
                let c1 = tA.isSubtechnique ? tA.parent.name : tA.name;
                let c2 = tB.isSubtechnique ? tB.parent.name : tB.name;
                return c1.localeCompare(c2)
            });
            // console.log(seenIDs, results)
            this.results = results;
        } else {
            this.results = [];
        }
    }
    public get queryLength(): number {
        return this._query.length;
    }
    public results: Technique[] = [];

    constructor(private dataService: DataService) {

    }

    ngOnInit() {
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
        for (let result of this.results) this.select(result);
    }

    public deselectAll(): void {
        for (let result of this.results) this.deselect(result);
    }

}
