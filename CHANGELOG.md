# v2.1 - [insert date here]
## New Features
### Major
- Added export to MS Excel feature. [sarahyoder add your release notes here]. See issue [#52](https://github.com/mitre/attack-navigator/issues/52).
### Minor
- In the export to SVG interface you can now hide the technique count in the tactic column headers. See issue [#47](https://github.com/mitre/attack-navigator/issues/52).
- Updated the README to explain how to use local files to populate the Navigator. See issue [#51](https://github.com/mitre/attack-navigator/issues/51).

## Fixes
- Fixed constant score expressions (e.g `10`, `5+5`) featuring no variables being ignored in the _create layers from other layers_ interface. Now if a constant score expression is present it assigns uniformly to all techniques. See issue [#49](https://github.com/mitre/attack-navigator/issues/49).
- Fixed a bug when uploading layers with no tactic field on techniques. When said field was absent, techniques with `enabled=false` were not initially hidden when `hideDisabled=true`. See issue [#50](https://github.com/mitre/attack-navigator/issues/50).

# v2.0 - 14 May 2018
## New Features
### Major
- Added TAXII client to pull ATT&CK content from a TAXII server. By default, the Navigator now loads content from the MITRE CTI TAXII server hosted at [https://cti-taxii.mitre.org](https://cti-taxii.mitre.org). See issue [#4](https://github.com/mitre/attack-navigator/issues/4).
- Added a new interface to render layers to a downloadable SVG image. See issue [#2](https://github.com/mitre/attack-navigator/issues/2).
- Added the ability to load a default layer when the Navigator initializes. See issue [#14](https://github.com/mitre/attack-navigator/issues/14), [#26](https://github.com/mitre/attack-navigator/issues/26).
   - A local default layer can be specified in `src/assets/config.json`.
   - The URL to a default layer hosted on the web can be specified in the new _create customized Navigator_ interface, and when the navigator loads it will fetch that layer. See issues [#7](https://github.com/mitre/attack-navigator/issues/7), [#20](https://github.com/mitre/attack-navigator/issues/20).


### Minor
- Added configurable background color to tactics row. See issue [#32](https://github.com/mitre/attack-navigator/issues/32).
- Added customizable legend to describe the meanings of the colors of annotated techniques. See issues [#24](https://github.com/mitre/attack-navigator/issues/24), [#28](https://github.com/mitre/attack-navigator/issues/28), [#31](https://github.com/mitre/attack-navigator/issues/31), [#33](https://github.com/mitre/attack-navigator/issues/33).
- Added the ability to disable navigator features, either by editing the `src/assets/config.json` or using the new _create customized Navigator_ interface. See issues [#21](https://github.com/mitre/attack-navigator/issues/21), [#41](https://github.com/mitre/attack-navigator/issues/41).
- Added the ability to specify new items in the technique context menu by editing `src/assets/config.json`. These new items can be used to hyperlink to a specified URL, with parameters for the technique ID or tactic. See issue [#9](https://github.com/mitre/attack-navigator/issues/9).
- Added a button to remove all annotations on the currently selected techniques. See issue [#12](https://github.com/mitre/attack-navigator/issues/12).
- Added a new "super compact" view option, which removes all technique text in order to fit as much content on the screen as possible. See issue [#11](https://github.com/mitre/attack-navigator/issues/11).

## Improvements
- Depreciated and revoked objects in the STIX content are no longer displayed in the Navigator. See issue [#30](https://github.com/mitre/attack-navigator/issues/30).
- Uploading a layer with of a different version number than expected warns the user that some annotations or configurations may not be restored. See issue [#27](https://github.com/mitre/attack-navigator/issues/27).
- A dockerfile was added to the repo, and documentation on using the Navigator with Docker was added to the readme. See issue [#15](https://github.com/mitre/attack-navigator/issues/15).
- CTRL (windows) and CMD (mac) can now be used to select multiple techniques in addition to shift (both platforms). See issue [#18](https://github.com/mitre/attack-navigator/issues/18).
- Gradient colors are now fully customizable, using a color picker instead of a dropdown menu.

## Fixes
- Tooltips resize to fit long comments. If the comment exceeds a certain length the overflow is cut and denoted by ellipses (...). See issue [#23](https://github.com/mitre/attack-navigator/issues/23).
- Tooltips, dropdown menus and context menus now align themselves automatically to avoid going off the edge of the page.
- Tab performance is now more independent of the number and content of other tabs.
- Uploaded layer files now typecheck their fields to make sure everything is formatted properly. Fields which do not meet the layer format specification are set to their default value.

## Layer File Format Changes
Layer file format updated to version 2.0. Older layer versions can still be loaded by the Navigator, however some fields may no longer be supported. See `layers/LAYERFORMATv2.md` for the full v2.0 specification.
- Replaced the `viewFullTable` field (boolean) with the `viewMode` field (number) in order to support the "super compact" view option. See issue [#11](https://github.com/mitre/attack-navigator/issues/11).
   - If `viewFullTable` is present in a layer file uploaded to the v2.0 Navigator it will be ignored.
   - To upgrade a layer without losing the view mode, see the following mappings:
      - `viewFullTable: true` becomes `viewMode: 0`.
      - `viewFullTable: false` becomes `viewMode: 1`.
- Added `legendItems` field, an array of legendItem objects (also specified in document). This field can be used to specify the contents of the legend. See issue [#24](https://github.com/mitre/attack-navigator/issues/24).
- Added `showTacticRowBackground` field (boolean), which if true sets the layer to display a background color for the tactic row. See issue [#32](https://github.com/mitre/attack-navigator/issues/32).
- Added `tacticRowBackground` field (string), which holds the hex color value to show as the background to the tactic row if `showTacticRowBackground` is true. See issue [#32](https://github.com/mitre/attack-navigator/issues/32).
- Added `selectTechniquesAcrossTactics` field (boolean), which if false allows the user to select instances of techniques which are found in multiple tactics individually. See issue [#8](https://github.com/mitre/attack-navigator/issues/8).
- Added `tactic` field (string) to the Technique object. If this field is present, the annotations will only be applied to the instance of the technique in the specified tactic. If this field is not present, the annotations will be applied to all instances of the technique. See issue [#8](https://github.com/mitre/attack-navigator/issues/8).
