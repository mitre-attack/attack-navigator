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
    private fields = [
        {
            "label": "name",
            "field": "name",
            "enabled": true
        },
        {
            "label": "attack ID",
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
    ]

    private _query: string = "";
    private set query(newQuery: string) {
        let self = this;
        this._query = newQuery;
        if (this._query.trim() != "") {
            // search
            let re = new RegExp(this._query.trim(), "gi");
            let results = this.dataService.techniques.filter(function(technique: Technique) {
                for (let field of self.fields) {
                    if (field.enabled) {
                        // query in this field
                        let match = technique[field.field].search(re) != -1;
                        // console.log("querying", field.label, "in", technique.name, ":", match)
                        if (match) return true;
                    }
                }
                return false;
            });
            // decoflict IDs for cross-tactic techniques
            let seenIDs = new Set();
            results = results.filter(function(technique: Technique) {
                if (seenIDs.has(technique.id)) return false;
                else {
                    seenIDs.add(technique.id);
                    return true;
                }
            })
            //remove out of stage results
            results = results.filter((technique: Technique) => this.viewModel.filters.stages.selection.includes(technique.stage));
            // console.log(seenIDs, results)
            this.results = results;
        } else {
            this.results = [];
        }
    }
    private get queryLength(): number {
        return this._query.length;
    }
    private results: Technique[] = [];

    constructor(private dataService: DataService) {

    }

    ngOnInit() {
    }

    private toggleFieldEnabled(field: string) {
        for (let thefield of this.fields) {
            if (thefield.field == field) {
                thefield.enabled = !thefield.enabled;
                break;
            }
        }
        this.query = this._query;
    }

    private select(technique: Technique): void {
        this.viewModel.selectTechniqueAcrossTactics(technique);
    }

    private deselect(technique: Technique): void {
        this.viewModel.unselectTechniqueAcrossTactics(technique);
    }

    private selectAll(): void {
        for (let result of this.results) this.select(result);
    }

    private deselectAll(): void {
        for (let result of this.results) this.deselect(result);
    }

}
