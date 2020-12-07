import { Component, OnInit, Input } from '@angular/core';
import { ViewModel } from '../viewmodels.service';
import { DataService, BaseStix, Group, Technique, Mitigation, Software } from '../data.service';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
    @Input() viewModel: ViewModel;

    public openedPanel: string = "";
    
    public stixTypes: any[];

    constructor(private dataService: DataService) {
        this.stixTypes = [];
    }

    ngOnInit() {
        let domain = this.dataService.getDomain(this.viewModel.domainID)

        this.stixTypes = [{
            "label": "threat groups",
            "objects": domain.groups.filter((group, i, arr) => arr.findIndex(t => t.id === group.id) === i)
                       .sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        }, {
            "label": "software",
            "objects": domain.software.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        }, {
            "label": "mitigations",
            "objects": domain.mitigations.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        }]
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

    public deselect(stixObject: BaseStix): void {
       for (let technique of this.getRelated(stixObject)) {
            this.viewModel.unselectTechniqueAcrossTactics(technique);
       }
    }

    public select(stixObject: BaseStix): void {
        for (let technique of this.getRelated(stixObject)) {
            this.viewModel.selectTechniqueAcrossTactics(technique);
        }
    }


}
