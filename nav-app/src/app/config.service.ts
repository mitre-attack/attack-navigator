import { Injectable } from '@angular/core';
import { DataService, Technique } from './data.service'; //import the DataService component so we can use it

@Injectable()
export class ConfigService {

    private features = new Map<string, boolean>();
    private featureGroups = new Map<string, string[]>();

    constructor(private dataService: DataService) {
        let self = this;
        dataService.retreiveConfig().subscribe(function(config: any) {
            Object.keys(config["features"]).forEach(function(featureName: string) {
                self.setFeature(featureName, config["features"][featureName]);
            })
            console.log(self.features)
            console.log(self.featureGroups)
        })
    }

    public getFeature(featureName: string): boolean {
        return this.features.get(featureName);
    }
    /**
     * the logical AND of getFeature
     * @param  featureNames string[] of features to check enabledness of
     * @return              true if all enabled, false otherwise
     */
    public getFeatures(featureNames: string[]): boolean {
        for (let i = 0; i < featureNames.length; i++) {
            if (!this.getFeature(featureNames[i])) return false;
        }
        return true;
    }

    /**
     * Recursively search an object for boolean properties, set these as features
     * Take a key:value pair of an object. If the value is a boolean, set the
     * feature[key] to value. Otherwise recursively walk value to find boolean
     * options.
     *
     * Additionally, if the given feature grouping (where value is an obj)
     * has been previously defined, boolean properties assigned to the grouping
     * name will apply to all subfeatures of the grouping.
     *
     * @param  featureName string, the fieldname the value was found in
     * @param  value       boolean:object the value of the field. If a boolean,
     *                     sets feature[featureName] = value, otherwise walks recursively
     */
    public setFeature(featureName: string, value: any): string[] {
        let self = this
        console.log(featureName, value);

        if (typeof(value) == "boolean") { //base case
            if (this.featureGroups.has(featureName)) { //feature group, assign to all subfeatures
                this.featureGroups.get(featureName).forEach(function(subFeatureName: string) {
                    self.setFeature(subFeatureName, value);
                })
            } else { //single feature
                this.features.set(featureName, value);
            }
            return [featureName];
        }

        if (typeof(value) == "object") { //keep walking
            let subfeatures = [];
            Object.keys(value).forEach(function(fieldname: string) {
                subfeatures = Array.prototype.concat(subfeatures, self.setFeature(fieldname, value[fieldname]));
            })
            this.featureGroups.set(featureName, subfeatures);
            return subfeatures;
        }
    }

}
