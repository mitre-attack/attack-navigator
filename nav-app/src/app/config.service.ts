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
     * Return true if any/all features in the group are enabled
     * @param  featureGroup feature group name
     * @param  type         'any' or 'all' for logical or/and
     * @return              true iffany/all are enabled, false otherwise
     */
    public getFeatureGroup(featureGroup: string, type?: string): boolean {
        if (!this.featureGroups.has(featureGroup)) return true;

        let subFeatures = this.featureGroups.get(featureGroup)
        let count = this.getFeatureGroupCount(featureGroup);
        return type == "any" ? count > 0 : count === subFeatures.length;
    }

    /**
     * Return the number of enabled features in the group
     * @param  featureGroup feature group name
     * @return              the number of enabled features in the group, or -1 if
     *                      the group does not exist
     */
    public getFeatureGroupCount(featureGroup: string): number {
        if (!this.featureGroups.has(featureGroup)) return -1;
        let count = 0
        let subFeatures = this.featureGroups.get(featureGroup)
        for (let i = 0; i < subFeatures.length; i++) {
            if (this.getFeature(subFeatures[i])) count += 1
        }
        return count;
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
