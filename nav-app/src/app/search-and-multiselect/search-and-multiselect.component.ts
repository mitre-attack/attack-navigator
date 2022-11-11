import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ViewModel, ViewModelsService } from '../viewmodels.service';
import { BaseStix, DataService, Group, Mitigation, Software, Technique, Campaign } from '../data.service';

@Component({
  selector: 'app-search-and-multiselect',
  templateUrl: './search-and-multiselect.component.html',
  styleUrls: ['./search-and-multiselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearchAndMultiselectComponent implements OnInit {
    @Input() viewModel: ViewModel;
    public stixTypes: any[];
    // Data Components is a map mainly because it is a collection of labels that map to
    // an array of techniques, where we want to filter/sort by label name
    public stixDataComponents = new Map<string, any>();
    public stixDataComponentLabels: string[];
    userClickedExpand = false;
    expandedPanels = {
        0: true, // techniques panel
        1: false, // groups panel
        2: false, // software panel
        3: false, // campaign panel
        4: false, // mitigations panel
        5: false // data components panel
    };

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

    private debounceFunction;
    private previousQuery: string = "";
    private _query: string = "";
    public set query(newQuery: string) {
        this._query = newQuery;
        if (!this.debounceFunction) {
            this.debounceFunction = setTimeout(() => {
                this.getResults(this._query);
                this.debounceFunction = null;
                this.previousQuery = this._query;
                }, 300);
        }
    }

    public get queryLength(): number {
        return this._query.length;
    }

    public get stixDataComponentsResults(): Technique[] {
      let results = [];
      this.stixDataComponentLabels.forEach((label) => {
        results = results.concat(this.stixDataComponents.get(label).objects);
      });
      return results;
    }

    public techniqueResults: Technique[] = [];

    constructor(private dataService: DataService, private viewModelsService: ViewModelsService) {
        this.stixTypes = [];
        this.stixDataComponentLabels = [];
    }

    ngOnInit() {
        this.getResults();
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
        let results = items.filter(t => !t.deprecated && !t.revoked);
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

    filterAndSortLabels(labels, query) {
      let results = labels;
      if (query.trim() === "") {
        return results.sort();
      } else {
        return results.filter((r) => r.toLowerCase().includes(query.trim().toLowerCase()));
      }
    }


    /**
     * getResults() checks if this._query is:
     *       1) valid, and
     *       2) part of last query, otherwise call getTechniques() and getStixData() to search all objects again
    **/

    getResults(query = "", fieldToggled = false) {
        if (query.trim() != "" && query.includes(this.previousQuery) && !fieldToggled) {
            this.techniqueResults = this.filterAndSort(this.techniqueResults, query, true);
            this.stixTypes.forEach(item => item['objects'] = this.filterAndSort(item['objects'], query));
        } else {
            this.getTechniques();
            this.getStixData();
        }
        this.stixDataComponentLabels = this.filterAndSortLabels(this.stixDataComponentLabels, query);
        this.expandPanels();
    }

    expandPanels() {
        if (!this.userClickedExpand) {
            this.expandedPanels[0] = this.techniqueResults.length > 0;
            let isPrevExpanded = this.expandedPanels[0];
            if (!isPrevExpanded) {
                this.stixTypes.forEach((s, i) => {
                  this.expandedPanels[i+1] = !isPrevExpanded && s.objects.length > 0;
                  isPrevExpanded = s.isExpanded;
                });
            }
            this.expandedPanels[4] = (!isPrevExpanded && this.stixDataComponentLabels.length > 0);
        } else {
            let isAllCollapsed = false;
            for (const isPanelExpanded in this.expandedPanels) {
                if (isPanelExpanded) {
                  isAllCollapsed = true;
                  break;
                }
            }
            this.userClickedExpand = isAllCollapsed;
        }
    }

    getTechniques() {
        //get master list of techniques and sub-techniques
        let allTechniques = this.dataService.getDomain(this.viewModel.domainVersionID).techniques;
        for (let technique of allTechniques) {
            allTechniques = allTechniques.concat(technique.subtechniques);
        }
        this.techniqueResults = this.filterAndSort(allTechniques, this._query, true);
    }

    getStixData() {
        let domain = this.dataService.getDomain(this.viewModel.domainVersionID);

        this.stixTypes = [{
            "label": "threat groups",
            "objects": this.filterAndSort(domain.groups, this._query)
        }, {
            "label": "software",
            "objects": this.filterAndSort(domain.software, this._query)
        }, {
            "label": "mitigations",
            "objects": this.filterAndSort(domain.mitigations, this._query)
        }, {
            "label": "campaigns",
            "objects": this.filterAndSort(domain.campaigns, this._query)
        }];

        domain.dataComponents.forEach((c) => {
          const source = c.source(this.viewModel.domainVersionID);
          const label = `${source.name}: ${c.name}`;
          const obj = {
            "objects": c.techniques(this.viewModel.domainVersionID),
            "url": source.url
          }
          this.stixDataComponents.set(label, obj);
        });
        this.stixDataComponentLabels = this.filterAndSortLabels(Array.from(this.stixDataComponents.keys()), this._query);
    }

    public toggleFieldEnabled(field: string) {
        for (let thefield of this.fields) {
            if (thefield.field == field) {
                thefield.enabled = !thefield.enabled;
                // set query to empty string to trigger getResults() in the case that:
                // 1) a field was toggled, and
                // 2) the query did not change
                this.getResults("", true);
                break;
            }
        }
    }

    public mouseEnterAll(techniques: Technique[]) {
      techniques.forEach((t) => this.mouseEnter(t));
    }

    public mouseEnter(technique: Technique, isTechnique = true): void {
        if (!isTechnique) {
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
        this.viewModelsService.onSelectionChange.emit(); // emit selection change
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
        this.viewModelsService.onSelectionChange.emit(); // emit selection change
    }

    public selectAll(items: any[], isTechniqueArray = true): void {
        if (isTechniqueArray) {
            for (let result of items) this.select(result, isTechniqueArray);
        }
        else if (!isTechniqueArray) {
            for (let stixObject of items) this.select(stixObject, isTechniqueArray);
        }
        this.viewModelsService.onSelectionChange.emit(); // emit selection change
    }

    public deselectAll(items: any[], isTechniqueArray = true): void {
        if (isTechniqueArray) {
            for (let result of items) this.deselect(result, isTechniqueArray);
        }
        else if (!isTechniqueArray) {
            for (let stixObject of items) this.deselect(stixObject, isTechniqueArray);
        }
        this.viewModelsService.onSelectionChange.emit(); // emit selection change
    }

    public getRelated(stixObject: BaseStix): Technique[] {
        // master list of all techniques and sub-techniques
        let techniques = this.dataService.getDomain(this.viewModel.domainVersionID).techniques;
        let allTechniques = techniques.concat(this.dataService.getDomain(this.viewModel.domainVersionID).subtechniques);
        let domainVersionID = this.viewModel.domainVersionID;

        if (stixObject instanceof Group) {
            return allTechniques.filter((technique: Technique) => (stixObject as Group).relatedTechniques(domainVersionID).includes(technique.id));
        } else if (stixObject instanceof Software) {
            return allTechniques.filter((technique: Technique) => (stixObject as Software).relatedTechniques(domainVersionID).includes(technique.id));
        } else if (stixObject instanceof Mitigation) {
            return allTechniques.filter((technique: Technique) => (stixObject as Mitigation).relatedTechniques(domainVersionID).includes(technique.id));
        } else if (stixObject instanceof Campaign) {
            return allTechniques.filter((technique: Technique) => (stixObject as Campaign).relatedTechniques(domainVersionID).includes(technique.id));
        }
    }
}
