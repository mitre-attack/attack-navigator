import { Injectable } from '@angular/core';
import { ContextMenuItem } from '../classes/context-menu-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    public versions: any[] = [];
    public contextMenuItems: ContextMenuItem[] = [];
    public defaultLayers: any;
    public commentColor = 'yellow';
    public linkColor = 'blue';
    public metadataColor = 'purple';
    public banner: string;
    public featureList: any[] = [];

    private features = new Map<string, boolean>();
    private featureGroups = new Map<string, string[]>();

    public get subtechniquesEnabled(): boolean {
        return this.features.get('subtechniques');
    }

    constructor(private http: HttpClient) {
        // intentionally left blank
    }

    /**
     * Checks if the feature is enabled
     * @param featureName feature name
     * @returns true if the feature is enabled, false otherwise
     */
    public getFeature(featureName: string): boolean {
        return this.features.get(featureName);
    }

    /**
     * Checks if any/all features in the group are enabled
     * @param  featureGroup feature group name
     * @param  type	'any' or 'all' for logical or/and
     * @returns true iff any/all are enabled, false otherwise
     */
    public getFeatureGroup(featureGroup: string, type?: string): boolean {
        if (!this.featureGroups.has(featureGroup)) return true;

        let subFeatures = this.featureGroups.get(featureGroup);
        let count = this.getFeatureGroupCount(featureGroup);
        return type == 'any' ? count > 0 : count === subFeatures.length;
    }

    /**
     * Get the number of enabled features in the group
     * @param  featureGroup feature group name
     * @returns the number of enabled features in the group, or -1 if
     * the group does not exist
     */
    public getFeatureGroupCount(featureGroup: string): number {
        if (!this.featureGroups.has(featureGroup)) return -1;
        let subFeatures = this.featureGroups.get(featureGroup);
        let enabled = subFeatures.filter((f) => this.getFeature(f));
        return enabled.length;
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
        let self = this;

        if (typeof value == 'boolean') {
            //base case
            if (this.featureGroups.has(featureName)) {
                //feature group, assign to all subfeatures
                this.featureGroups.get(featureName).forEach(function (subFeatureName: string) {
                    self.setFeature(subFeatureName, value);
                });
            } else {
                //single feature
                this.features.set(featureName, value);
            }
            return [featureName];
        }

        if (typeof value == 'object') {
            //keep walking
            let subfeatures = [];
            Object.keys(value).forEach(function (fieldname: string) {
                subfeatures = Array.prototype.concat(subfeatures, self.setFeature(fieldname, value[fieldname]));
            });
            this.featureGroups.set(featureName, subfeatures);
            return subfeatures;
        }
    }

    /**
     * given a set of feature objects, set the enabledness of that object and all subobjects
     *
     * @param  featureObject {name: string, enabled: boolean, subfeatures?: featureObject[] }
     *                       Of enabled is false and it has subfeatures, they will all be forced to be false too
     * @param  override      Set all subfeatures, and their subfeatures, values to
     *                       this value
     */
    public setFeature_object(featureObject: any, override = null): string[] {
        let self = this;

        // base case
        if (!featureObject.hasOwnProperty('subfeatures')) {
            let enabled = override !== null ? override : featureObject.enabled;
            this.features.set(featureObject.name, enabled);
            return [featureObject.name];
        } else {
            //has subfeatures
            override = override ? override : !featureObject.enabled ? false : null;
            let subfeatures = [];
            featureObject.subfeatures.forEach(function (subfeature) {
                subfeatures = Array.prototype.concat(subfeatures, self.setFeature_object(subfeature, override));
            });
            this.featureGroups.set(featureObject.name, subfeatures);
            return subfeatures;
        }
    }

    /**
     * Return if the given string corresponds to a defined feature
     * @param  featureName the name of the feature
     * @return             true if the feature exists, false otherwise
     */
    public isFeature(featureName: string): boolean {
        return this.features.has(featureName);
    }
    /**
     * return if the given string corresponds to a defined feature group
     * @param  featureGroupName the name of the feature group
     * @return                  true if it is a feature group, false otherwise
     */
    public isFeatureGroup(featureGroupName: string): boolean {
        return this.featureGroups.has(featureGroupName);
    }

    /**
     * Get all url fragments
     * @param  url optional, url to parse instead of window location href
     * @return     all fragments as key-value pairs
     */
    public getAllFragments(url?: string): Map<string, string> {
        if (!url) url = window.location.href;
        let fragments = new Map<string, string>();
        let regex = /[#&](\w+)=(\w+)/g;

        let match;
        while ((match = regex.exec(url))) {
            fragments.set(match[1], match[2]);
        }

        return fragments;
    }

    /**
     * Load the configuration file
     * Note: this is done at startup
     */
    public loadConfig() {
        return this.http
            .get('./assets/config.json')
            .toPromise()
            .then((config) => {
                console.debug(`loaded app configuration settings`);

                this.versions = config['versions'];
                config['custom_context_menu_items'].forEach((item) => {
                    this.contextMenuItems.push(new ContextMenuItem(item.label, item.url, item.subtechnique_url));
                });
                this.defaultLayers = config['default_layers'];
                this.commentColor = config['comment_color'];
                this.linkColor = config['link_color'];
                this.metadataColor = config['metadata_color'];
                this.banner = config['banner'];

                // parse feature preferences
                this.featureList = config['features'];
                config['features'].forEach((feature) => {
                    this.setFeature_object(feature);
                });

                // override preferences with preferences from URL fragments
                this.getAllFragments().forEach((value: string, key: string) => {
                    if (this.isFeature(key) || this.isFeatureGroup(key)) {
                        this.setFeature(key, value == 'true');
                    }
                });
            });
    }
}
