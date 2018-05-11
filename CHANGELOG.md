# v2.0 - 14 May 2018
## New Features
### Major
- Added TAXII client to pull ATT&CK content from a TAXII server. By default, the Navigator now loads content from the MITRE CTI TAXII server hosted at [https://cti-taxii.mitre.org](https://cti-taxii.mitre.org). Issue #4.
- Added a new interface to render layers to a downloadable SVG image. Issue #2.
- Added the ability to load a default layer when the Navigator initializes. Issue #14, #26.
   - A local default layer can be specified in `src/assets/config.json`.
   - The URL to a default layer hosted on the web can be specified in the new _create customized Navigator_ interface, and when the navigator loads it will fetch that layer. Issues #7, #20.


### Minor
- Added configurable background color to tactics row. Issue #32.
- Added customizable legend to describe the meanings of the colors of annotated techniques. Issues #24, #28, #31, #33.
- Added the ability to disable navigator features, either by editing the `src/assets/config.json` or using the new _create customized Navigator_ interface. Issue #21.
- Added the ability to specify new items in the technique context menu by editing `src/assets/config.json`. These new items can be used to hyperlink to a specified URL, with parameters for the technique ID or tactic. Issue #9.
- Added a button to remove all annotations on the currently selected techniques. Issue #12.
- Added a new "super compact" view option, which removes all technique text in order to fit as much content on the screen as possible. Issue #11.

## Improvements
- Depreciated and revoked objects in the STIX content are no longer displayed in the Navigator. Issue #30.
- Uploading a layer with of a different version number than expected warns the user that some annotations or configurations may not be restored. Issue #27.
- A dockerfile was added to the repo, and documentation on using the Navigator with Docker was added to the readme. Issue #15.
- CTRL (windows) and CMD (mac) can now be used to select multiple techniques in addition to shift (both platforms). Issue #18.
- Gradient colors are now fully customizable, using a color picker instead of a dropdown menu.

## Fixes
- Tooltips resize to fit long comments. If the comment exceeds a certain length the overflow is cut and denoted by ellipses (...). Issue #23.
- Tooltips, dropdown menus and context menus now align themselves automatically to avoid going off the edge of the page.
- Tab performance is now more independent of the number and content of other tabs.
- Uploaded layer files now typecheck their fields to make sure everything is formatted properly. Fields which do not meet the layer format specification are set to their default value.

## Layer File Format Changes
Layer file format updated to version 2.0. Older layer versions can still be loaded by the Navigator, however some fields may no longer be supported. See `layers/LAYERFORMATv2.md` for the version to specification.
- Replaced the `viewFullTable` field (boolean) with the `viewMode` field (number) in order to support the "super compact" view option. See issue #11.
   - If `viewFullTable` is present in a layer file uploaded to the v2.0 Navigator it will be ignored.
   - To upgrade a layer without losing the view mode, see the following mappings:
      - `viewFullTable: true` becomes `viewMode: 0`.
      - `viewFullTable: false` becomes `viewMode: 1`.
- Added `legendItems` field, an array of legendItem objects (also specified in document). This field can be used to specify the contents of the legend. See issue #24.
- Added `showTacticRowBackground` field (boolean), which if true sets the layer to display a background color for the tactic row. See issue #32.
- Added `tacticRowBackground` field (string), which holds the hex color value to show as the background to the tactic row if `showTacticRowBackground` is true. See issue #32.
- Added `selectTechniquesAcrossTactics` field (boolean), which if false allows the user to select instances of techniques which are found in multiple tactics individually. See issue #8.
- Added `tactic` field (string) to the Technique object. If this field is present, the annotations will only be applied to the instance of the technique in the specified tactic. If this field is not present, the annotations will be applied to all instances of the technique. See issue #8.
