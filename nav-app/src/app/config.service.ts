import { Injectable } from '@angular/core';
import { DataService, Technique } from './data.service'; //import the DataService component so we can use it

@Injectable()
export class ConfigService {

    private features = new Map<string, boolean>();
    constructor(private dataService: DataService) {
        let self = this;
        dataService.retreiveConfig().subscribe(function(config: any) {
            Object.keys(config["features"]).forEach(function(featureName: string) {
                self.setFeature(featureName, config["features"][featureName]);
            })
            console.log(self.features)
        })
    }

    public getFeature(featureName: string): boolean {
        return this.features.get(featureName);
    }

    public setFeature(featureName: string, enabled: boolean) {
        this.features.set(featureName, enabled);
    }

}
