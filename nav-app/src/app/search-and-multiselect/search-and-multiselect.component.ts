import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ViewModel } from '../viewmodels.service';
import {BaseStix, DataService, Group, Mitigation, Software, Technique} from '../data.service';

@Component({
  selector: 'app-search-and-multiselect',
  templateUrl: './search-and-multiselect.component.html',
  styleUrls: ['./search-and-multiselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearchAndMultiselectComponent implements OnInit {
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

    private previousQuery: string = "";
    private _query: string = "";
    public set query(newQuery: string) {
        this.previousQuery = this._query;
        this._query = newQuery;
        this.getStixResults(this._query);
        this.getTechniqueResults(this._query);
    }

    public get queryLength(): number {
        return this._query.length;
    }

    public techniqueResults: Technique[] = [];

    constructor(private dataService: DataService) {
        this.stixTypes = [];
    }

    ngOnInit() {
        this.getStixData();
        this.getTechniques();
    }

    /**
     * filterAndSort() takes an array of items and does the following:
     *       1) if the query is empty, then it sorts the array
     *       2) if the query is not empty, then it filters the already sorted array until nothing is left, or until
     *          the query is cleared out and empty again
     * @param items BaseStix[] or Technique[] objects to be filtered and sorted
     * @param query user-input query in search bar
     * @param sortTechniquesAndSubtechniques will be true if called from getTechniqueResults(),
     *                                       to sort techniques and all its subtechniques,
     *                                       otherwise just sort BaseStix items by name
     */
    filterAndSort(items: BaseStix[], query = "", sortTechniquesAndSubtechniques = false): any[] {
        let self = this;
        let results = items;
        if (query.trim() === "") {
            if (sortTechniquesAndSubtechniques) {
                results.sort((tA: Technique, tB: Technique) => {
                    let c1 = tA.isSubtechnique ? tA.parent.name : tA.name;
                    let c2 = tB.isSubtechnique ? tB.parent.name : tB.name;
                    return c1.localeCompare(c2)
                });
            } else {
                results.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            }
        } else {
            // deconflict IDs for cross-tactic techniques
            let seenIDs = new Set();
            results = results.filter(function (technique: Technique) {
                if (seenIDs.has(technique.id)) return false;
                for (let field of self.fields) {
                    if (field.enabled) {
                        // query in this field
                        if (technique[field.field]?.toLowerCase().includes(query.trim().toLowerCase())) {
                            seenIDs.add(technique.id);
                            return true;
                        }
                    }
                }
                return false;
            });
        }
        return results;
    }

    getTechniques() {
        //get master list of techniques and sub-techniques
        let allTechniques = this.dataService.getDomain(this.viewModel.domainID).techniques;
        for (let technique of allTechniques) {
            allTechniques = allTechniques.concat(technique.subtechniques);
        }
        this.techniqueResults = this.filterAndSort(allTechniques, "", true);
    }

    getTechniqueResults(query = "") {
        if (query.trim() != "" && query.includes(this.previousQuery)) {
            this.techniqueResults = this.filterAndSort(this.techniqueResults, query, true);
        } else {
            this.getTechniques();
        }
    }

    getStixData() {
        let domain = this.dataService.getDomain(this.viewModel.domainID);

        this.stixTypes = [{
            "label": "threat groups",
            "objects": this.filterAndSort(domain.groups)
        }, {
            "label": "software",
            "objects": this.filterAndSort(domain.software)
        }, {
            "label": "mitigations",
            "objects": this.filterAndSort(domain.mitigations)
        }]
    }

    // getStixResults() checks if query is:
    // 1) valid, and
    // 2) part of last query, otherwise call getStixData() to search all objects again
    getStixResults(query = "") {
        if (query.trim() != "" && query.includes(this.previousQuery)) {
            this.stixTypes.forEach(item => item['objects'] = this.filterAndSort(item['objects'], query));
        } else {
            this.getStixData();
        }
    }

    public toggleFieldEnabled(field: string) {
        let temp = this._query;
        for (let thefield of this.fields) {
            if (thefield.field == field) {
                thefield.enabled = !thefield.enabled;
                // this is to trigger getTechniques() and getStixData() in the case that:
                // a field was toggled, and
                // the query did not change
                this.query = "";
                break;
            }
        }
        this._query = temp;
        this.query = this._query;
    }

    public mouseEnter(technique: Technique, isStix?: boolean): void {
        if (isStix) {
            for (let t of this.getRelated(technique)) {
                this.viewModel.selectTechniqueAcrossTactics(t, true, true);
            }
        } else {
            this.viewModel.highlightTechnique(technique);
        }
    }
    public mouseLeave(): void {
        this.viewModel.clearHighlight();
    }

    public select(stixObject: any, isTechnique= true): void {
        if (isTechnique) {
            this.viewModel.selectTechniqueAcrossTactics(stixObject);
        }
        else if (!isTechnique) {
            for (let technique of this.getRelated(stixObject)) {
                this.viewModel.selectTechniqueAcrossTactics(technique);
            }
        }
    }

    public deselect(stixObject: any, isTechnique = true): void {
        if (isTechnique) {
            this.viewModel.unselectTechniqueAcrossTactics(stixObject);
        }
        else if (!isTechnique) {
            for (let technique of this.getRelated(stixObject)) {
                this.viewModel.unselectTechniqueAcrossTactics(technique);
            }
        }
    }

    public selectAll(items: any[], isTechniqueArray = true): void {
        if (isTechniqueArray) {
            for (let result of items) this.select(result, isTechniqueArray);
        }
        else if (!isTechniqueArray) {
            for (let stixObject of items) this.select(stixObject, isTechniqueArray);
        }
    }

    public deselectAll(items: any[], isTechniqueArray = true): void {
        if (isTechniqueArray) {
            for (let result of items) this.deselect(result, isTechniqueArray);
        }
        else if (!isTechniqueArray) {
            for (let stixObject of items) this.deselect(stixObject, isTechniqueArray);
        }
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
}
