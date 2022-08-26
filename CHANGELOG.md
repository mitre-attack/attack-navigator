<!-- 
     Reminder: update the version number in package.json when adding a new version!

     If on the master branch and ready to release, you can use one of the following commands:
         npm version major
         npm version minor
         npm version patch
    This will patch the version number appropriately and create the correct tag on the current commit.
    The creation of the tag can be disabled with the --no-git-tag-version if desired.
-->

# v4.6.6 - 26 August 2022

## Fixes
- Fixed an issue where the sorting selection was not honored for sub-techniques when rendered as an SVG. See issue [#494](https://github.com/mitre-attack/attack-navigator/issues/494).

# v4.6.5 - 7 July 2022

Adds support for ATT&CK v11.3 and Mobile ATT&CK sub-techniques.

## Fixes
- Fixed an issue where matrices that have been deprecated would load into the Navigator. See issue [#473](https://github.com/mitre-attack/attack-navigator/issues/473).

# v4.6.4 - 25 May 2022

Adds support for ATT&CK v11.2.

## Fixes
- Fixed an issue causing disabled techniques with no enabled sub-techniques to appear in the matrix when the hide-disabled control is active. See issue [#466](https://github.com/mitre-attack/attack-navigator/issues/466).

# v4.6.3 - 13 May 2022

## Fixes

- Fixed package import issues causing failure to load techniques with scores or colors, and impacting the ability to render a layer as SVG. See issues [#451](https://github.com/mitre-attack/attack-navigator/issues/451) and [#452](https://github.com/mitre-attack/attack-navigator/issues/452).

# v4.6.2 - 12 May 2022

Adds support for ATT&CK v11.1.

## Improvements
- Added a feature to pin a technique cell when viewed in the matrix, enabling the user to scroll through the details of the technique in the tooltip. See issue [#320](https://github.com/mitre-attack/attack-navigator/issues/320).
- Added a popup alert to notify users if a layer with an empty tactic field is uploaded, and therefore will not be displayed. See issue [#326](https://github.com/mitre-attack/attack-navigator/issues/326).

# v4.6.1 - 26 April 2022

## Fixes

- Fixed a versioning error that occurred when loading a local layer with a previous version of ATT&CK.

# v4.6.0 - 25 April 2022

Adds support for ATT&CK v11.

## Improvements

- Revised the rigid versioning structure in the configuration file which enforced too many constraints on importing custom data. Added new fields `version.version` and `domain.identifier` to improve how Navigator derives domain information. More details are provided in the [integration documentation](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/develop/docs/integrations.md#attck-navigator-integration) on how to integrate the ATT&CK Navigator with the ATT&CK Workbench. See issue [#370](https://github.com/mitre-attack/attack-navigator/issues/370).
- Fixed an issue where a long technique name or metadata value would overflow outside the technique tooltip. See issue [#359](https://github.com/mitre-attack/attack-navigator/issues/359).

# v4.5.5 - 7 January 2022

## Fixes

- Fixed an issue with the Dockerfile which was preventing the docker image from building. See issue [#395](https://github.com/mitre-attack/attack-navigator/pull/395).

## Improvements

- Font sizing in the SVG exports are optimally sized to improve readability and consistency. See issue [#221](https://github.com/mitre-attack/attack-navigator/issues/221).

## New Features

- Added the ability to assign hyperlinks and metadata to selected techniques in the technique controls toolbar. See issue [#321](https://github.com/mitre-attack/attack-navigator/issues/321).
  - Hyperlinks can be accessed via the context menu and metadata can be viewed in the technique tooltip. Both hyperlinks and metadata can also be added directly to Layer Files (see _Layer File Format Changes_ below for more details).
  - Users can disable the link underline effect on techniques by editing `src/assets/config.json` or through the "Create Customized Navigator" interface.
- Added the ability to assign hyperlinks layers. Hyperlinks can be viewed and edited in the layer information panel alongside layer metadata.

## Layer File Format Changes

Updated the Layer File Format to v4.3 which adds a `links` array field to technique objects and to layers. This supports the assignment of hyperlinks to techniques which are accessed in the context menu and to layers which are accessed in the layer information dropdown menu. Link objects must conform to the schema `{"label": string, "url": string}` or `{"divider": boolean}`. A separator is displayed in the technique context menu where the `divider` property occurs in the list of hyperlinks.

# v4.5.4 - 15 November 2021

## Fixes

- Fixed a bug where layers with aggregate scores enabled would be render a black background on techniques which have no aggregate score. See issue [#388](https://github.com/mitre-attack/attack-navigator/issues/388).

# v4.5.3 - 12 November 2021

## Fixes

- Fixed an issue where the user could not manually assign colors or upload layers with manually assigned colors. See issue [#386](https://github.com/mitre-attack/attack-navigator/issues/386).
- Fixed an issue where fields with a value of `false` in the layout configuration of a layer would be ignored. See issue [#381](https://github.com/mitre-attack/attack-navigator/issues/381).

# v4.5.2 - 10 November 2021

## Improvements

- Users will no longer be prompted to upgrade default layers (set in the config file or the "create a customized Navigator" feature) to the current ATT&CK version. This should improve the UX of Navigator instances embedded in iframes or linked to from webpages with a default set of layers loaded.
- Add support for ATT&CK v10.1

## Fixes

- Fixed an issue when loading multiple default layers (specified in the config or a layerURL) which led to only the first layer being loaded. See issue [#361](https://github.com/mitre-attack/attack-navigator/issues/361).
- Fixed inconsistencies within the ATT&CK Navigator dark theme.
  - If the user switches from the dark/light theme to use the system's theme, the browser will remember to continue using the system theme until changed again.
  - The layer upgrade feature now supports dark theme.
  - Fixed scoring gradient preset colors that should make technique cells appear to fade into the background color (if they have a lower score)

# v4.5.1 - 21 October 2021

## Fixes

- Fixes support for ATT&CK versions with more than 1 digit (ex. ATT&CK v10).
  - Uploaded layers without a specified ATT&CK version will no longer try and fail to load ATT&CK v1
  - Uploaded layers uring ATT&CK v10 will no longer try and fail to load ATT&CK v1
  - Downloaded layers using ATT&CK v10 will no longer claim they use ATT&CK v1

# v4.5.0 - 21 October 2021

## New Features

- The ATT&CK Navigator now has a dark theme. See issue [#71](https://github.com/mitre-attack/attack-navigator/issues/71).
- Added support for ATT&CK version 10
  - Added data sources panel to the search and multiselect interface. See issue [#341](https://github.com/mitre-attack/attack-navigator/issues/341).

# v4.4.1 - 16 September 2021

## Fixes

- Fixed a crash that would occur when loading a layer with annotations on a revoked/deprecated technique without explicitly defined tactics. See issue [#354](https://github.com/mitre-attack/attack-navigator/issues/354).

# v4.4 - 15 September 2021

Version 4.4 of the Navigator restores Safari support provided you are using Safari version 14 or above.

## New Features

- Combined the search and multiselect tools into a single UI. This allows groups, software, and mitigations to be filtered alongside techniques and improves usability by moving the interface to a sidebar. See issue [#204](https://github.com/mitre-attack/attack-navigator/issues/204).
- Added a workflow for upgrading layers created in older versions of ATT&CK to the current version. When upgrading a layer, users can view techniques have changed between the two versions and copy annotations to their new layer. See issue [#181](https://github.com/mitre-attack/attack-navigator/issues/181).

## Improvements

- Various improvement to UI aesthetics and usability. See issue [#340](https://github.com/mitre-attack/attack-navigator/issues/340).
  - Reduced unnecessary whitespace to maximize screen real-estate for viewing the matrix.
  - Layer tabs now hide themselves when the user scrolls to maximize screen real-estate for viewing the matrix.
  - Improved favicon for standardization with other ATT&CK tools.
- Techniques are now shown when disabled (and hide-disabled is enabled) as long as any of any of their sub-techniques are enabled. See issue [#298](https://github.com/mitre-attack/attack-navigator/issues/298)
- Users can disable the comment underline effect on techniques by editing `src/assets/config.json` or through the "Create Customized Navigator" interface. See issue [#268](https://github.com/mitre-attack/attack-navigator/issues/268).
- Application now alerts the user when input STIX data contains an object missing an ATT&CK ID instead of failing silently. See issue [#339](https://github.com/mitre-attack/attack-navigator/pull/339).
- The application usage/help page can now be viewed [directly on GitHub](https://github.com/mitre-attack/attack-navigator/blob/master/USAGE.md). See issue [#179](https://github.com/mitre-attack/attack-navigator/issues/179).
- The application changelog can now be viewed within the application. See issue [#178](https://github.com/mitre-attack/attack-navigator/issues/178).

## Fixes

- Fixed some issues where objects could appear in the wrong domain under specific circumstances. See issue [#308](https://github.com/mitre-attack/attack-navigator/issues/308), [attack-website#310](https://github.com/mitre-attack/attack-website/issues/310).
- Fixed issue with sorting when show aggregate score is enabled, where each technique's aggregate score was not correctly calculated into the sorting. See issue [#295](https://github.com/mitre-attack/attack-navigator/issues/295).
- The Navigator should now use the proper fonts when operating without an internet connection. See issue [#278](https://github.com/mitre-attack/attack-navigator/issues/278)
- Fixed an issue when loading multiple default layers where subsequent layers would only appear after the user interacted with the first one. See issue [#288](https://github.com/mitre-attack/attack-navigator/issues/288).
- Updated Safari browser warning to show only for versions 13 and below. See issue [#306](https://github.com/mitre-attack/attack-navigator/issues/306).

# v4.3 - 29 April 2021

## New Features

- Added aggregate scores. Aggregate scores are computed using the score of the technique and all sub-techniques using an "aggregate function" -- min, max, average, or sum. The aggregate score is used to determine the color of the technique in place of the technique's score. Aggregate scores are an optional feature and can be enabled in the "matrix configuration" dropdown. See issue [#269](https://github.com/mitre-attack/attack-navigator/issues/269).
- The user can now suppress the "leave site?" warning dialog in the config file or via the "create a customized navigator" interface. See issue [#267](https://github.com/mitre-attack/attack-navigator/issues/267).
- Added an (optional) configurable banner. The new "banner" field of the config file can be used to customize the banner content with full HTML support. See issue [#205](https://github.com/mitre-attack/attack-navigator/issues/205).
- Added button to toolbar to only expand all sub-techniques that are annotated. See issue [#256](https://github.com/mitre-attack/attack-navigator/issues/256).
- Added support for displaying STIX 2.1 notes in tooltips. Notes attached to techniques in the STIX data are indicated in the same style as a comment. As of version 4.3 the ATT&CK Navigator supports STIX 2.1, but cannot load data from a TAXII 2.1 server.

## Improvements

- Consolidated AWS, GCP, and Azure platforms into IaaS platform to integrate upcoming release of ATT&CK. See issue [#252](https://github.com/mitre-attack/attack-navigator/issues/252).

## Fixes

- Fixed a bug in exporting matrix to Excel sheet, where the style of all sub-techniques with the same name in a column were incorrectly over-ridden by the style of the first sub-technique in its name. See issue [#270](https://github.com/mitre-attack/attack-navigator/issues/270).

## Layer File Format Changes

Layer file format updated to version 4.2. This update is fully backwards compatible with the layer format v4.1 since the added fields are optional. See [layers/LAYERFORMATv4_2.md](layers/LAYERFORMATv4_2.md) for the full specification.

This update adds settings for aggregate scores to the layout object of the layer:

- `showAggregateScores`, which turns on the feature
- `countUnscored` which counts unscored techniques as if their score was `0` when the aggregate function is "average".
- `aggregateFunction`: the desired aggregation function: "average", "min", "max" or "sum".

# v4.2 - 3 February 2021

With version 4.2 of the Navigator we are retiring support for the Safari browser. A bug introduced in the sub-techniques release (version 3.0) causes safari to freeze when changing between layer tabs (see issue [#251](https://github.com/mitre-attack/attack-navigator/issues/251)). We have been unable to determine the cause of the freeze and thus are retiring official support for that browser. Safari users can continue to use the application, but will be warned of possible freezes via a dialog window when they first load the app.

## Improvements

Refactored the implementation of tabs to reduce performance issues when opening multiple layers. See issue [#254](https://github.com/mitre-attack/attack-navigator/issues/254).

- The help page and SVG exporter have been moved to a pop-up window and are no longer displayed in a separate tab.
- The process for displaying layer information and switching between tabs has been refactored. The creation and deletion of new DOM elements for each tab has been removed. Previously, the contents of each tab were contained in their own DOM element causing poor performance.

## Fixes

- Fixed a bug preventing required packages to install when building the Navigator through Docker. See issue [#258](https://github.com/mitre-attack/attack-navigator/issues/258).

# v4.1 - 15 December 2020

## New Features

- Added support for section breaks in the technique metadata format (see _Layer File Format Changes_ below for more details). See issue [#189](https://github.com/mitre-attack/attack-navigator/issues/189).

## Improvements

- Layer domain and version is displayed under "layer information" in layer controls and in a new "domain" section of the SVG exporter. See issue [#239](https://github.com/mitre-attack/attack-navigator/issues/239).
- Layer loading is indicated in the UI when uploading a layer from the _Open Existing Layer_ interface. See issue [#240](https://github.com/mitre-attack/attack-navigator/issues/240).

## Fixes

- Fixed a bug causing platform selection to be overwritten when uploading a layer. See issue [#245](https://github.com/mitre-attack/attack-navigator/issues/245).
- Updated packages to fix vulnerabilities. You may need to `npm install` on your local instance due to new package versions.

## Layer File Format Changes

Layer file format updated to version 4.1. This update is fully backwards compatible with layer format v4.0 since the added field is optional. See [layers/LAYERFORMATv4_1.md](layers/LAYERFORMATv4_1.md) for the full specification.

This update adds an optional `divider` object to the `metadata` format on technique objects. Each object in the metadata array must either be of the schema `{"name": string, "value": string}` or `{"divider": boolean}`. A separator will be displayed in the metadata tooltip where the `divider` property occurs in the list of metadata.

# v4.0 - 27 October 2020

## New Features

### Major

- Added support for mixed domains and versions. Layers can be opened with different ATT&CK versions and now support custom domains. See issues [#180](https://github.com/mitre-attack/attack-navigator/issues/180) and [#182](https://github.com/mitre-attack/attack-navigator/issues/182).
  - Users can specify the ATT&CK version and domain for each layer. A layer with no specified ATT&CK version will default to the current version.
  - Updated "create new layer" interface to provide access to previous versions of ATT&CK.
  - Added ability to upgrade an uploaded layer to the current version of ATT&CK.
  - Updated "create layer from other layers" interface to restrict layer operations to layers of the same domain and version.
  - Updated config file to support dynamic domains and versions. See _Config File Format Changes_ below for more details.
- Removed the pre-ATT&CK domain from the Navigator in support of the next ATT&CK release. See issue [#207](https://github.com/mitre-attack/attack-navigator/issues/207).
  - Removed the "stages" section of the filters and layer format.

### Minor

- Allow legend and gradient to be hidden separately within the legend block in the SVG exporter. See pull request [#223](https://github.com/mitre-attack/attack-navigator/pull/223).
- Added functionality to select or deselect techniques in a tactic. This can be done within the context menu or by clicking on the name of the tactic and follows the user's behavior preference under "selection behavior" in the selection controls.

## Fixes

- Fixed a bug preventing layer downloads with an empty metadata field. See issue [#214](https://github.com/mitre-attack/attack-navigator/issues/214).
- Fixed a bug in "selection controls" where searching for techniques would return results only from the first enabled search property. See issue [#200](https://github.com/mitre-attack/attack-navigator/issues/200).
- Fixed a bug in the "default layers" interface where specifying multiple default layers would open the last specified URL multiple times. See issue [#199](https://github.com/mitre-attack/attack-navigator/issues/199).
- SVG exporter now honors layer sorting configuration. See pull request [#223](https://github.com/mitre-attack/attack-navigator/pull/223).
- Removed text selection in tactic headers. See issue [#222](https://github.com/mitre-attack/attack-navigator/issues/222).
- Long descriptions or names of layers will no longer cause the text exporter to hang. See issue [#224](https://github.com/mitre-attack/attack-navigator/issues/224).

## Layer File Format Changes

Layer file format updated to version 4.0. Older versions can still be loaded in the Navigator, but will no longer display the Pre-ATT&CK domain. See [layers/LAYERFORMATv4.md](layers/LAYERFORMATv4.md) for the full specification.

- ATT&CK version 8.0 removed the pre-ATT&CK domain, which became two tactics tagged with the `PRE` platform in the Enterprise domain. The `stages` section of filters have been removed to reflect this migration.
- Replaced `version` field with `versions` object which specifies the layer format, Navigator, and ATT&CK content versions in support of the mixed domains and versions update.

## Config File Format Changes

### Replaced `enterprise_attack_url` and `mobile_data_url` with `versions`

To support the addition of dynamic versions and domains, paths to ATT&CK STIX bundles have been migrated to `versions`. See issue [#183](https://github.com/mitre-attack/attack-navigator/issues/183).

- The `versions` object defines a list of ATT&CK content versions. Each version must conform the schema `{"name": string, "domains": []}`, where the `domains` property is a list of domain objects.
- Each domain specifies a `name` and a `data` string array, where the `data` array is a list of paths to one or more STIX bundles. Multiple paths can be added to the `data` property to view multiple STIX bundles in a single layer instance.

For example, the paths to the current version of the Enterprise and Mobile domains are now formatted as follows:

```json
"versions": [
    {
        "name": "ATT&CK v8",
        "domains": [
            {
                "name": "Enterprise",
                "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v8.0/enterprise-attack/enterprise-attack.json"]
            },
            {
                "name": "Mobile",
                "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v8.0/mobile-attack/mobile-attack.json"]
            }
        ]
    }
]
```

### Removal of `taxii_server`

The `taxii_server` property has been removed. It was previously used to specify the TAXII server URL and data collections for loading content into the Navigator. This is now done by defining a `taxii_url` and `taxii_collection` property in place of the `data` property for a given domain. For more information on TAXII support see _Loading content from a TAXII server_ in [the readme](README.md).

# v3.1 - 8 July 2020

ATT&CK Navigator v3.0 and v3.1 includes support for sub-techniques as well as improvements to several of the interfaces and a major refactor of the codebase. The format for the config file and layer file have both changed: please see _Layer File Format Changes_ and _Config File Format Changes_ below for more details.

If you want to continue using the non-sub-techniques Navigator, please use the [v2.3.2 release](https://github.com/mitre-attack/attack-navigator/releases/tag/v2.3.2) for local instances or the following live instances of Navigator v2.3.2:

- [Enterprise ATT&CK](https://mitre-attack.github.io/attack-navigator/v2/enterprise/)
- [Mobile ATT&CK](https://mitre-attack.github.io/attack-navigator/v2/mobile/)

## Improvements

### Minor

- Added options to the SVG Export feature for the visibility of sub-techniques. See issue [#142](https://github.com/mitre-attack/attack-navigator/issues/142).
- Added update layers for March 2020 sub-techniques release. See issue [#138](https://github.com/mitre-attack/attack-navigator/issues/138).
- Updated the [sample layers](layers/data/samples/) with sub-techniques support. See issue [#138](https://github.com/mitre-attack/attack-navigator/issues/138). We've also released [some scripts on our attack-scripts repository](https://github.com/mitre-attack/attack-scripts/tree/develop/scripts/layers/samples) corresponding to the sample layers.
- Extended search interface to support searching for techniques based on data sources. See pull request [#158](https://github.com/mitre-attack/attack-navigator/pull/158).
- Added show/hide all sub-techniques controls under "layer controls". See issue [#141](https://github.com/mitre-attack/attack-navigator/issues/141).
- Updated the "select sub-techniques with parent" control under the "selection controls" dropdown. Sub-techniques will be selected independently by default. See issue [#140](https://github.com/mitre-attack/attack-navigator/issues/140).
- Added sub-techniques as a configurable Navigator feature. Sub-technique features can be disabled by editing the `src/assets/config.json` file or using the "create customized Navigator" interface. See issue [#112](https://github.com/mitre-attack/attack-navigator/issues/112).
- Added option to select scoring gradient from an existing layer in the _create layers from other layers_ interface. See issue [#121](https://github.com/mitre-attack/attack-navigator/issues/121).
- Added options to select all techniques and sub-techniques with or without annotations in the context menu. See issue [#163](https://github.com/mitre-attack/attack-navigator/issues/163).
- Added a subscript to the techniques which have sub-techniques. The subscript shows the number of sub-techniques under a given technique and how many of those sub-techniques have annotations while the parent is collapsed. See issue [#162](https://github.com/mitre-attack/attack-navigator/issues/162).
- Updated the layout of the metadata value key. See issue [#189](https://github.com/mitre-attack/attack-navigator/issues/189).

## Fixes

- Added internet explorer support for the sub-techniques features, and improved Edge compatibility. See issue [#135](https://github.com/mitre-attack/attack-navigator/issues/135).
- Fixes a bug causing metadata values to be displayed improperly in tooltips. See issue [#153](https://github.com/mitre-attack/attack-navigator/issues/153).
- Fixes a bug in which the default layer link input field in the "create customized Navigator" interface loses focus between characters. See issue [#136](https://github.com/mitre-attack/attack-navigator/issues/136).
- Fixed a bug in "create layer from other layers" interface where inheriting filters would cause the application to crash. See issue [#168](https://github.com/mitre-attack/attack-navigator/issues/168).
- Fixed a bug where editing the gradient would also change the most recently selected gradient preset. See issue [#167](https://github.com/mitre-attack/attack-navigator/issues/167).
- Removed duplicate threat group entries from the multiselect interface and included sub-techniques in the selection of techniques related to threat groups, software, or mitigations. See issue [#164](https://github.com/mitre-attack/attack-navigator/issues/164).
- Fixed a bug in the sub-technique sidebar that occurs when all sub-techniques of a given technique are disabled and hidden. See issue [#177](https://github.com/mitre-attack/attack-navigator/issues/177).
- Removed the comment underscore from the sub-technique count subscript. See issue [#184](https://github.com/mitre-attack/attack-navigator/issues/184).

# v3.0 - sub-techniques beta

## New Features

### Major

- Added support for sub-techniques. Techniques with sub-techniques will be denoted by a sidebar which can be clicked to show and hide the sub-techniques. Techniques without sub-techniques will not have a sidebar.
- Added "select techniques with subtechniques" control under "selection controls" dropdown, augmenting the existing "select techniques across tactics" control. By default sub-techniques will be selected along with their parents. See issue [#114](https://github.com/mitre-attack/attack-navigator/issues/114).
- Added "matrix layout" controls (replacing "view mode"). See issues [#117](https://github.com/mitre-attack/attack-navigator/issues/117) and [#110](https://github.com/mitre-attack/attack-navigator/issues/110).
  - Supports multiple layouts, and the codebase is designed to allow the addition of new layouts easily. Added the following layouts:
    - the "side" layout (default), where sub-techniques appear in an adjacent sub-column of the tactic.
    - the "flat" layout, where sub-techniques appear nested beneath their parent similar to an indented list.
    - the "mini" layout, where sub-techniques are grouped into boxes with their parent. The "mini" layout is designed to give an overview of the layer without the comparatively complex structure of the "flat" or "side" views.
  - Added the ability to show technique ATT&CK IDs and names simultaneously, individually or not at all. The "mini" layout overrides this selection. See issue [#124](https://github.com/mitre-attack/attack-navigator/issues/124).

### Minor

- Added mitigations to multi-select interface. Improved the extensibility of the multi-select interface to make future additions easier. See issue [#119](https://github.com/mitre-attack/attack-navigator/issues/119).

## Improvements

### Major

- Major redesign of the "render layer to SVG" feature.
  - Added support for sub-techniques. See issue [#116](https://github.com/mitre-attack/attack-navigator/issues/116).
  - Users will no longer need to specify text size manually. Algorithms have been implemented to automatically maximize text size without overflowing the text container. The overall layer rendering process will take slightly longer than previously due to these computations.
  - Header and legend (docked and undocked) should be much more aesthetic.
  - Score gradient legend should now show which scores map to which colors more clearly.
- Context menu and tooltip improvements:
  - Visual style has been improved for both context menu and tooltip.
  - Tooltip is now statically placed instead of following the cursor, which increases the performance of the UI.
  - Context menu should now orient itself better to avoid falling off the edge of the screen.
  - Added "view tactic" button to context menu.
  - Major improvements to the flexibility of the custom context menu items feature. See _Config File Format Changes_ below for more details.
- Major refactor to many components should reduce lag and improve extensibility and maintainability of the application.

### Minor

- Export to excel: added sub-techniques support. See issue [#115](https://github.com/mitre-attack/attack-navigator/issues/115).
- Minor UI improvements to the search feature. Disabled regex in search because it was very buggy. See issue [#113](https://github.com/mitre-attack/attack-navigator/issues/113).

## Layer File Format Changes

Layer file format updated to version 3.0. Older versions can still be loaded in the Navigator, but may have degraded functionality.

- Removed "viewMode" enumeration in favor of "layout" object. viewMode will get parsed into a layout configuration automatically, but the conversion is not perfect since the layouts have changed.
- Added "showSubtechniques" field to technique objects.
- Added "selectSubtechniquesWithParent" field setting the default value of the "select techniques with subtechniques" control.

The sub-techniques update of ATT&CK caused many techniques to be replaced by sub-techniques. Since the replacing sub-techniques have different IDs, many layers created before the sub-technques release will still be using IDs for the replaced techniques and therefore won't work properly in the new version even if the annotation format is correct. A [conversion script](layers/update-layers.py) is provided in the layers folder which both updates layers to the most recent format and also updates technique IDs to their replacers where possible. There are however a few cases which won't be caught:

1. Cases where techniques which have been replaced by multiple sub-techniques are ignored entirely due to limitations in the remapping data.
2. Cases where the `tactic` field was present but the replacing technique is not in that tactic.
Run `python3 update-layers.py -h` for usage instructions.

## Config File Format Changes

### Changes to `custom_context_menu_items`

Custom context menu feature has been significantly improved for flexibility. See _Adding Custom Context Menu Options_ in [the readme](README.md) for more details on the format.

- Updated substitution string to use double curly braces (e.g `{{technique_name}}`) instead of tildes.
- Added ability to specify STIX IDs in addition to ATT&CK IDs.
- Added the option to add a sub-technique specific URL (`subtechnique_url`) which will apply only to sub-techniques. When using the sub-technique URL, extra sub-technique related substitutions are available.

### Changes to `features`

The "features" structure is used to enable/disable specific Navigator features. It also propagates to the "create customized Navigator" interface.

- "toggle_view_mode" has been renamed to "layout_controls" and the description updated accordingly.

# v2.3.2 - 17 January 2020

## Improvements

- Updated trademark to registered trademark and updated copyright date to 2020. See issue [#125](https://github.com/mitre-attack/attack-navigator/pull/125).
- Updated help page to be more legible by increasing page margins.

# v2.3.1 - 29 October 2019

## Fixes

- Fixes a bug where default_layers specified in `config.json` would not load. See pull request [#109](https://github.com/mitre-attack/attack-navigator/pull/109).

# v2.3 - 24 October 2019

## New Features

### Minor

- Technique comments will now be included with excel exports as cell notes. Note: you may have to re-install your node modules for this functionality to be present. See issue [#55](https://github.com/mitre-attack/attack-navigator/issues/55).
- Minor matrix layout improvements. See issue [#106](https://github.com/mitre-attack/attack-navigator/issues/106).
- Added support for cloud platforms. See issue [#101](https://github.com/mitre-attack/attack-navigator/issues/101). Also see *Layer File Format Changes*, below.
- In layer-layer operations, score expressions are now calculated on an element-by-element basis. This allows the use of normal math operators (e.g `a * b`) instead of the elementwise operators (e.g `a .* b`) as were previously required. It also enables the use of ternary operations such as `a > b ? a : 0`. See issue [#81](https://github.com/mitre-attack/attack-navigator/issues/81).
- Added the ability to specify multiple default layers in the layerURL query param. See issue [#75](https://github.com/mitre-attack/attack-navigator/issues/75).

## Fixes

- Multiselect interface should now correctly sort software and groups which start with lowercase letters. See issue [#99](https://github.com/mitre-attack/attack-navigator/issues/99).
- Layer loading should now provide more accurate descriptions when errors are encountered. See issue [#103](https://github.com/mitre-attack/attack-navigator/issues/103).
- Updated packages to fix vulnerabilities.

## Layer File Format Changes

Layer file format updated to version 2.2. Older versions can still be loaded in the Navigator, and this update is fully backwards compatible with Version 2.1. See [layers/LAYERFORMATv2_2md](layers/LAYERFORMATv2_2.md) for the full v2.2 specification.

- Added the following cloud platforms to the set of acceptable enterprise platforms: "AWS", "GCP", "Azure", "Azure AD", "Office 365", "SaaS".
- Updated Enterprise and Mobile platforms to match their format as seen elsewhere in ATT&CK. This change is fully backwards compatible, and if the old format is detected it will automatically be updated to the new format.
  - "android" becomes "Android"
  - "ios" becomes "iOS"
  - "windows" becomes "Windows"
  - "linux" becomes "Linux"
  - "mac" becomes "macOS"

# v2.2.1 - 5 June 2019

## Fixes

- Updated Angular from 7.0.4 to 8.0.0.
- Updated other packages to fix vulnerabilities.
- Removed node-sass rebuild in dockerfile.
- Fixed improperly formatted domains in the April 2019 update layers which were causing issues when exporting those layers to excel.
- Updated readme to better highlight documentation for using the Navigator offline. See issue [#82](https://github.com/mitre-attack/attack-navigator/issues/82).

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
