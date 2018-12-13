# v2.2 - 11 December 2018
## New Features
### Major
- Added the ability to associate user defined metadata to layers and techniques inside of a layer. Metadata can be useful for supporting other applications that use the layer format, or for attaching additional descriptive fields to the layer. The UI supports editing metadata on the layer itself, but not on techniques. Metadata on techniques is shown in tooltips. See *Layer File Format Changes*, below, for more detail on the metadata format. Also see issue [#52](https://github.com/mitre-attack/attack-navigator/issues/22).
- Removed `assets/tacticsData.json`. The Navigator now populates its tactics data from `x-mitre-matrix` and `x-mitre-tactic` objects in the bundled data. The field `tactics_url` was removed from `assets/config.json` -- see *Changes to config.json Format*, below. See issue [#63](https://github.com/mitre-attack/attack-navigator/issues/63).
### Minor
- Multiple layers can now be loaded on initialization. A change to the `config.json` file format allows the user to specify a list of default layers. Default layers can be loaded from the assets directory or from the web. see *Changes to config.json Format*, below. Also see issue [#67](https://github.com/mitre-attack/attack-navigator/issues/67). 
- The color of the underline denoting comments can now be configured in the `config.json` file. Setting the color to `"transparent"` will remove comment underlines altogether. See *Changes to config.json Format`, below. Also see issue [#53](https://github.com/mitre-attack/attack-navigator/issues/53).
## Fixes
- Updated links in the documentation to match the new ATT&CK website. See issue [#62](https://github.com/mitre-attack/attack-navigator/issues/62).
- Updated Angular to version 7.0.6. This fixes some installation issues with OSX. We also updated several other packages. Please note that our new version of Angular requires a newer nodejs version, so try updating your node installation if errors occur after updating the Navigator. See issues [#61](https://github.com/mitre-attack/attack-navigator/issues/61), [#70](https://github.com/mitre-attack/attack-navigator/issues/70).
- Merged a [pull request](https://github.com/mitre-attack/attack-navigator/pull/58) which fixed a bug where default layers would have placeholder layer titles. See [#54](https://github.com/mitre-attack/attack-navigator/issues/64).
- Negative scores can now be entered in the UI. See [#72](https://github.com/mitre-attack/attack-navigator/issues/72).


## Changes to `config.json` Format
### Default Layer
`default_layer` has been renamed to `default_layers`. The string property `location` has been replaced with the string[] property `urls`. The strings in `urls` should be the paths to the default layers you wish to load -- now multiple default layers can be loaded. You can also now load default layers from the assets folder and from the web simultaneously, although the order of the tabs is not guaranteed (since layer loading over HTTP is asynchronous). 

To update previous default layers configuration to the new format, see the following example:
```json
"default_layer": {
    "enabled": true,
    "location": "assets/example.json"
}
```
Becomes:
```json
"default_layers": {
    "enabled": true,
    "urls": [
        "assets/example.json"
    ]
}
```
### Comment Color
The `comment_color` field has been added, which specifies the color for comment underlines. 
### Removal of `assets/tacticsData.json` and `tactics_url`
`assets/tacticsData.json` was removed, and the `config.json` field `tactics_url` along with it. `tacticsData.json` was previously used to specify the _pre-attack_, _mitre-enterprise_ and _mitre-mobile_ tactics.

This is now done using the `x-mitre-matrix` and `x-mitre-tactic` objects in the bundled data retrieved from the taxii server or from our static cti github. `x-mitre-matrix` specifies the order of tactics and `x-mitre-tactic` specifies the actual tactic data. 

If you are using your own dataset with the Navigator an update to your source data will be required. The ATT&CK Navigator uses bundled data, where objects with types `attack-pattern`, `intrusion-set`, `malware`, `tool`, `relationship`, `x-mitre-tactic`, and `x-mitre-matrix` are all stored in a single array. This array is now required to contain `x-mitre-tactic` and `x-mitre-matrix` objects, which were not previously used. 

The data retrieved from `enterprise_attack_url`, `pre_attack_url`, and `mobile_data_url` follow the proper bundle format. Please use them as a guide for how to format your own datasets.

Also, please note that multiple matrices are only supported for `mitre-mobile`, which expects matrices with the names `Device Access` and `Network-Based Effects` so that we can order the tactics in the UI properly.


## Layer File Format Changes
Layer file format updated to version 2.1. This update is fully backwards compatible with layer format v2.0 since all the added fields are optional. See [layers/LAYERFORMATv2_1.md](layers/LAYERFORMATv2_1.md) for the full v2.1 specification.

This update constitutes the addition of `metadata` fields to the layer and technique objects. Metadata can be used to support other applications using the layer format, or to add additional descriptive fields to layers or techniques. Metadata is formatted as an array, and each piece of metadata in the array must conform to the schema `{"name": string, "value": string}`.  



# v2.1 - 31 July 2018
## New Features
### Major
- Added export to MS Excel feature. Saves the current layer to MS excel (_xlsx_) format. See issue [#52](https://github.com/mitre-attack/attack-navigator/issues/52).
### Minor
- In the export to SVG interface you can now hide the technique count in the tactic column headers. See issue [#47](https://github.com/mitre-attack/attack-navigator/issues/47).
- Updated the README to explain how to use local files to populate the Navigator. See issue [#51](https://github.com/mitre-attack/attack-navigator/issues/51).

## Fixes
- Fixed constant score expressions (e.g `10`, `5+5`) featuring no variables being ignored in the _create layers from other layers_ interface. Now if a constant score expression is present it assigns uniformly to all techniques. See issue [#49](https://github.com/mitre-attack/attack-navigator/issues/49).
- Fixed a bug when uploading layers with no tactic field on techniques. When said field was absent, techniques with `enabled=false` were not initially hidden when `hideDisabled=true`. See issue [#50](https://github.com/mitre-attack/attack-navigator/issues/50).

# v2.0 - 14 May 2018
## New Features
### Major
- Added TAXII client to pull ATT&CK content from a TAXII server. By default, the Navigator now loads content from the MITRE CTI TAXII server hosted at [https://cti-taxii.mitre.org](https://cti-taxii.mitre.org). See issue [#4](https://github.com/mitre-attack/attack-navigator/issues/4).
- Added a new interface to render layers to a downloadable SVG image. See issue [#2](https://github.com/mitre-attack/attack-navigator/issues/2).
- Added the ability to load a default layer when the Navigator initializes. See issues [#14](https://github.com/mitre-attack/attack-navigator/issues/14), [#26](https://github.com/mitre-attack/attack-navigator/issues/26).
   - A local default layer can be specified in `src/assets/config.json`.
   - The URL to a default layer hosted on the web can be specified in the new _create customized Navigator_ interface, and when the navigator loads it will fetch that layer. See issues [#7](https://github.com/mitre-attack/attack-navigator/issues/7), [#20](https://github.com/mitre-attack/attack-navigator/issues/20).


### Minor
- Added configurable background color to tactics row. See issue [#32](https://github.com/mitre-attack/attack-navigator/issues/32).
- Added customizable legend to describe the meanings of the colors of annotated techniques. See issues [#24](https://github.com/mitre-attack/attack-navigator/issues/24), [#28](https://github.com/mitre-attack/attack-navigator/issues/28), [#31](https://github.com/mitre-attack/attack-navigator/issues/31), [#33](https://github.com/mitre-attack/attack-navigator/issues/33).
- Added the ability to disable navigator features, either by editing the `src/assets/config.json` or using the new _create customized Navigator_ interface. See issues [#21](https://github.com/mitre-attack/attack-navigator/issues/21), [#41](https://github.com/mitre-attack/attack-navigator/issues/41).
- Added the ability to specify new items in the technique context menu by editing `src/assets/config.json`. These new items can be used to hyperlink to a specified URL, with parameters for the technique ID or tactic. See issue [#9](https://github.com/mitre-attack/attack-navigator/issues/9).
- Added a button to remove all annotations on the currently selected techniques. See issue [#12](https://github.com/mitre-attack/attack-navigator/issues/12).
- Added a new "super compact" view option, which removes all technique text in order to fit as much content on the screen as possible. See issue [#11](https://github.com/mitre-attack/attack-navigator/issues/11).

## Improvements
- Depreciated and revoked objects in the STIX content are no longer displayed in the Navigator. See issue [#30](https://github.com/mitre-attack/attack-navigator/issues/30).
- Uploading a layer with of a different version number than expected warns the user that some annotations or configurations may not be restored. See issue [#27](https://github.com/mitre-attack/attack-navigator/issues/27).
- A dockerfile was added to the repo, and documentation on using the Navigator with Docker was added to the readme. See issue [#15](https://github.com/mitre-attack/attack-navigator/issues/15).
- CTRL (windows) and CMD (mac) can now be used to select multiple techniques in addition to shift (both platforms). See issue [#18](https://github.com/mitre-attack/attack-navigator/issues/18).
- Gradient colors are now fully customizable, using a color picker instead of a dropdown menu.

## Fixes
- Tooltips resize to fit long comments. If the comment exceeds a certain length the overflow is cut and denoted by ellipses (...). See issue [#23](https://github.com/mitre-attack/attack-navigator/issues/23).
- Tooltips, dropdown menus and context menus now align themselves automatically to avoid going off the edge of the page.
- Tab performance is now more independent of the number and content of other tabs.
- Uploaded layer files now typecheck their fields to make sure everything is formatted properly. Fields which do not meet the layer format specification are set to their default value.

## Layer File Format Changes
Layer file format updated to version 2.0. Older layer versions can still be loaded by the Navigator, however some fields may no longer be supported. See [layers/LAYERFORMATv2.md](layers/LAYERFORMATv2.md) for the full v2.0 specification.
- Replaced the `viewFullTable` field (boolean) with the `viewMode` field (number) in order to support the "super compact" view option. See issue [#11](https://github.com/mitre-attack/attack-navigator/issues/11).
   - If `viewFullTable` is present in a layer file uploaded to the v2.0 Navigator it will be ignored.
   - To upgrade a layer without losing the view mode, see the following mappings:
      - `viewFullTable: true` becomes `viewMode: 0`.
      - `viewFullTable: false` becomes `viewMode: 1`.
- Added `legendItems` field, an array of legendItem objects (also specified in document). This field can be used to specify the contents of the legend. See issue [#24](https://github.com/mitre-attack/attack-navigator/issues/24).
- Added `showTacticRowBackground` field (boolean), which if true sets the layer to display a background color for the tactic row. See issue [#32](https://github.com/mitre-attack/attack-navigator/issues/32).
- Added `tacticRowBackground` field (string), which holds the hex color value to show as the background to the tactic row if `showTacticRowBackground` is true. See issue [#32](https://github.com/mitre-attack/attack-navigator/issues/32).
- Added `selectTechniquesAcrossTactics` field (boolean), which if false allows the user to select instances of techniques which are found in multiple tactics individually. See issue [#8](https://github.com/mitre-attack/attack-navigator/issues/8).
- Added `tactic` field (string) to the Technique object. If this field is present, the annotations will only be applied to the instance of the technique in the specified tactic. If this field is not present, the annotations will be applied to all instances of the technique. See issue [#8](https://github.com/mitre-attack/attack-navigator/issues/8).
