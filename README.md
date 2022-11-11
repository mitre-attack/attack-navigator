
# Note from jonwrobson

I have created this fork to add a view on mitigations for selected techniques. There is a new section of controls at the top of any Enterprise tab. Behind the mitigations is a set of mapped NIST CSF v1.1 high level requirements as well as CIS and OWASP ASVS controls and standards. The intention is to be able to issue security requirements to mitigate an attack chain.

[![build status](https://github.com/mitre-attack/attack-navigator/workflows/Build/badge.svg)](https://github.com/mitre-attack/attack-navigator/actions)

# ATT&CK® Navigator

The ATT&CK Navigator is designed to provide basic navigation and annotation of [ATT&CK](https://attack.mitre.org) matrices, something that people are already doing today in tools like Excel.  We've designed it to be simple and generic - you can use the Navigator to visualize your defensive coverage, your red/blue team planning, the frequency of detected techniques or anything else you want to do.  The Navigator doesn't care - it just allows you to manipulate the cells in the matrix (color coding, adding a comment, assigning a numerical value, etc.).  We thought having a simple tool that everyone could use to visualize the matrix would help make it easy to use ATT&CK.

The principal feature of the Navigator is the ability for users to define layers - custom views of the ATT&CK knowledge base - e.g. showing just those techniques for a particular platform or highlighting techniques a specific adversary has been known to use. Layers can be created interactively within the Navigator or generated programmatically and then visualized via the Navigator.

## Usage

The ATT&CK Navigator is hosted live via GitHub Pages. [You can find a live instance of the current version of the Navigator here](https://mitre-attack.github.io/attack-navigator). You can read more about how to use the application itself in the [USAGE](/USAGE.md) document (which is mirrored in the in-app help page).

Version 4.0 of the ATT&CK Navigator supports all ATT&CK domains in a single instance of the application instead of requiring a different instance for each domain. It also sees the introduction of support for the ICS domain. See [the changelog](CHANGELOG.md) for more information.

Additionally, older versions of ATT&CK can now be loaded in the application. The ATT&CK Navigator supports ATT&CK versions 8, 7, 6, 5, and 4. Older versions do not work in the application since their data model is too outdated.

Previous versions of the Navigator application are also hosted via GitHub Pages for users who want a more classic experience:
| ATT&CK Version | Navigator Version | Domains | |
|:---------------|:------------------|:--------|-|
| [ATT&CK v7.2](https://attack.mitre.org/resources/versions/) | [Navigator v3.1](https://github.com/mitre-attack/attack-navigator/releases/tag/v3.1) | [Enterprise](https://mitre-attack.github.io/attack-navigator/v3/enterprise/) | [Mobile](https://mitre-attack.github.io/attack-navigator/v3/mobile/) |
| [ATT&CK v6.3](https://attack.mitre.org/resources/versions/) | [Navigator v2.3.2](https://github.com/mitre-attack/attack-navigator/releases/tag/v2.3.2) | [Enterprise](https://mitre-attack.github.io/attack-navigator/v2/enterprise/) | [Mobile](https://mitre-attack.github.io/attack-navigator/v2/mobile/) |

Please see [Install and Run](#Install-and-Run) for information on how to get the ATT&CK Navigator set up locally.

**Important Note:** Layer files uploaded when visiting our Navigator instance hosted on GitHub Pages are **NOT** being stored on the server side, as the Navigator is a client-side only application. However, we still recommend installing and running your own instance of the ATT&CK Navigator if your layer files contain any sensitive content.

Use our [GitHub Issue Tracker](https://github.com/mitre-attack/attack-navigator/issues) to let us know of any bugs or others issues that you encounter. We also encourage pull requests if you've extended the Navigator in a cool way and want to share back to the community!

*See [CONTRIBUTING.md](https://github.com/mitre-attack/attack-navigator/blob/master/CONTRIBUTING.md) for more information on making contributions to the ATT&CK Navigator.*

## Requirements

* [Node.js](https://nodejs.org) version 8 or greater
* [AngularCLI](https://cli.angular.io)

## Supported Browsers

* Chrome
* Firefox
* Internet Explorer 11<sup>[1]</sup>
* Edge
* Opera
* Safari<sup>[2]</sup>

**[1]** There is a recorded issue with the SVG export feature on Internet Explorer. Because of a [missing functionality on SVGElements](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children) in that browser, text will not be properly vertically centered in SVGs exported in that browser. We recommend switching to a more modern browser for optimal results.

**[2]** ATT&CK Navigator only supports Safari versions 14 and above because older versions of the browser can exhibit an unfixable freeze when selecting a layer tab. Users on unsupported versions of the browser will be warned of this possibility when opening the application.

## Install and Run

### First time

1. Navigate to the **nav-app** directory
2. Run `npm install`

### Serve application on local machine

1. Run `ng serve` within the **nav-app** directory
2. Navigate to `localhost:4200` in browser

### Compile for use elsewhere

1. Run `ng build` within the **nav-app** directory
2. Copy files from `nav-app/dist/` directory

_Note: `ng build --prod` does not currently work for ATT&CK Navigator without additional flags. To build the production environment instead use `ng build --prod --aot=false --build-optimizer=false`._

### Running the Navigator offline

1. Install the Navigator as per instructions above.
2. Follow instructions under [loading content from local files](#Loading-content-from-local-files) to configure the Navigator to populate the matrix without an internet connection. For enterprise-attack, use [this file](https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json). For mobile-attack, use [this file](https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json). For pre-attack, use [this file](https://raw.githubusercontent.com/mitre/cti/master/pre-attack/pre-attack.json).

### Common issues

1. If serving or compiling the application gives the warning `Module not found: can't resolve 'fs'`, run the command `npm run postinstall`. The postinstall step usually runs automatically after `npm install` to patch the `fs` issue, but in some environments it must be run manually.

## Documentation

When viewing the app in a browser, click on the **?** icon to the right of the **ATT&CK® Navigator** title to view its documentation.

## Layers Folder

The **layers** folder contains specifications for the layer format as well as example layers and a script demonstrating programatic layer generation. We will continue to add content to this repository as new scripts are implemented. Also, feel free to create pull requests if you want to add new capabilities here!

More information on how layers are used and developed can be found in the ATT&CK Navigator documentation that can be viewed by clicking **?** when running the app in a browser, and in the README in the **layers** folder.

## Adding Custom Context Menu Options

To create custom options to the **ATT&CK® Navigator** context menu using data in the Navigator, objects must be added to the array labeled `custom_context_menu_options` in `nav-app/src/assets/config.json`. Each object must have a property **label**, which is the text displayed in the context menu, and a property **url**, which is where the user is navigated.

To utilize data on right-clicked technique in the url, parameters surrounded by double curly brackets can be added to the string. For example: using `http://www.someurl.com/{{technique_attackID}}}` as the url in the custom option would lead to `http://www.someurl.com/T1098`, if the right-clicked technique's attackID was T1098.

The following data substitutions will be parsed:

* `{{technique_attackID}}` will be substituted with the ATT&CK ID of the technique, e.g `T1234`
* `{{technique_stixID}}` will be substituted with the STIX ID of the technique, e.g `attack-pattern--12345678-1234-1234-1234-123456789123`
* `{{technique_name}}` will be substituted with the technique name in lower case and with spaces replaced with hyphens, e.g `example-technique-name`
* `{{tactic_attackID}}` will be substituted with the ATT&CK ID of the tactic, e.g `TA1234`
* `{{tactic_stixID}}` will be substituted with the STIX ID of the tactic, e.g `x-mitre-tactic--12345678-1234-1234-1234-123456789123`
* `{{tactic_name}}` will be substituted with the tactic name in lower case and with spaces replaced with hyphens, e.g `example-tactic`. This is also equivalent to the x_mitre_shortname property of the tactic.

Optionally, a `subtechnique_url` field may be added to a custom option. This field will be parsed when the option is used on a sub-technique instead of the normal URL, which will be used for techniques. If `subtechnique_url` is not used, the `technique_` substitutions defined above will refer to the sub-technique object itself.

The following substitutions will be parsed for sub-techniques:

* `{{parent_technique_attackID}}` will be substituted with the ATT&CK ID of the sub-technique's parent, e.g `T1234`
* `{{parent_technique_stixID}}` will be substituted with the STIX ID of the sub-technique's parent, e.g `attack-pattern--12345678-1234-1234-1234-123456789123`
* `{{parent_technique_name}}` will be substituted with the name of the sub-technique's parent in lower case and with spaces replaced with hyphens, e.g `example-technique-name`
* `{{subtechnique_attackID}}` will be substituted with the ATT&CK ID of the sub-technique, e.g `T1234.001`
* `{{subtechnique_attackID_suffix}}` will be substituted with the portion of the ATT&CK ID of the sub-technique after the delimiting period, e.g `001`
* `{{subtechnique_stixID}}` will be substituted with the STIX ID of the sub-technique, e.g `attack-pattern--98765432-9876-9876-9876-987654321987`
* `{{subtechnique_name}}` will be substituted with the sub-technique name in lower case and with spaces replaced with hyphens, e.g `example-subtechnique-name`
* `{{tactic_attackID}}` will be substituted with the ATT&CK ID of the tactic, e.g `TA1234`
* `{{tactic_stixID}}` will be substituted with the STIX ID of the tactic, e.g `x-mitre-tactic--12345678-1234-1234-1234-123456789123`
* `{{tactic_name}}` will be substituted with the tactic name in lower case and with spaces replaced with hyphens, e.g `example-tactic`. This is also equivalent to the x_mitre_shortname property of the tactic.

Example custom context menu objects:

```json
{
    "label": "view technique on ATT&CK website",
    "url": "https://attack.mitre.org/techniques/{{technique_attackID}}",
    "subtechnique_url": "https://attack.mitre.org/techniques/{{parent_technique_attackID}}/{{subtechnique_attackID_suffix}}"
}
```

```json
{
    "label": "view tactic on ATT&CK website",
    "url": "https://attack.mitre.org/tactics/{{tactic_attackID}}"
}
```

## Loading content from a TAXII server

*By default, the Navigator loads content from ATT&CK STIX data hosted on the [MITRE/CTI repository](#related-mitre-work). Note: TAXII 2.1/STIX 2.1 bundles are **not** supported when loading content from a TAXII server.*

1. Edit the `config.json` file in the **nav-app/src/assets** directory.
2. Define the `taxii_url` property in place of the `data` property and set the value to your server's URL.
3. Define the `taxii_collection` property and set the value to the collection UUIDs your TAXII server has set.

Example loading content from a TAXII server:

```json
"domains": [
    {
        "name": "Enterprise",
        "taxii_url": "https://cti-taxii.mitre.org/",
        "taxii_collection": "95ecc380-afe9-11e4-9b6c-751b66dd541e"
    }
]
```

## Loading content from local files

*It's possible to populate the the Navigator using files that consist of bundles of STIX objects, similarly to [this](https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json) file. STIX 2.0 and STIX 2.1 bundles are supported.*

1. Put the stix bundles in `src/assets`. This will tell the server hosting the Navigator to host the data as well.
2. Edit the `config.json` file in the **nav-app/src/assets** directory.
3. Change the URL specified in the `data` array to the path to the STIX bundle (e.g `assets/enterprise-attack.json`). Multiple paths may be added to the `data` array to display multiple STIX bundles in a single instance.

Example loading content from local files:

```json
"domains": [
    {
        "name": "Enterprise",
        "data": ["assets/enterprise-attack.json"]
    }
]
```

## Running the Docker File

1. Navigate to the directory where you checked out the git repository
2. Run `docker build -t yourcustomname .`
3. Run `docker run -p 4200:4200 yourcustomname`
4. Navigate to `localhost:4200` in browser

## Loading Default Layers Upon Initialization

The Navigator can be configured so as to load a set of layers upon initialization. These layers can be from the web and/or from local files.
Local files to load should be placed in the `nav-app/src/assets/` directory.

1. Set the `enabled` property in `default_layers` in `src/assets/config.json` to `true`
2. Add the paths to your desired default layers to the `urls` array in `default_layers`. For example,

   ```JSON
   "default_layers": {
        "enabled": true,
        "urls": [
            "assets/example.json", 
            "https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json"
        ]
    }
   ```

   would load `example.json` from the local assets directory, and `Bear_APT.json` from this repo's sample layer folder on Github.
3. Load/reload the Navigator

Default layers from the web can also be set using a query string in the Navigator URL. Refer to the in-application help page section "Customizing the Navigator" for more details.

Users will not be prompted to upgrade default layers to the current version of ATT&CK if they are outdated.

## Enabling Banner in Navigator

The `banner` setting in `nav-app/src/assets/config.json` by default is an empty string `"""` (and not visible), and can be set to whatever content you wish to display inside a banner at the top of the Navigator webpage. The banner supports HTML and hyperlinks in the content.

## Disabling Navigator Features

The `features` array in `nav-app/src/assets/config.json` lists Navigator features you may want to disable. Setting the `enabled` field on a feature in the configuration file will hide all control
elements related to that feature.

However, if a layer is uploaded with an annotation or configuration
relating to that feature it will not be hidden. For example, if `comments` are disabled the
ability to add a new comment annotation will be removed, however if a layer is uploaded with
comments present they will still be displayed in tooltips and and marked with an underline.

Features can also be disabled using the _create customized Navigator_ feature. Refer to the in-application help page section "Customizing the Navigator" for more details.

## Embedding the Navigator in a Webpage

If you want to embed the Navigator in a webpage, use an iframe:

```HTML
<iframe src="https://mitre-attack.github.io/attack-navigator/enterprise/" width="1000" height="500"></iframe>
```

If you want to embed a version of the Navigator with specific features removed (e.g tabs, adding annotations), or with a default layer, we recommend using the _create customized Navigator_ feature. We highly recommend disabling the "leave site dialog" via this means when embedding the Navigator since otherwise you will be warned whenever you try to leave the embedding page. Refer to the in-application help page section "Customizing the Navigator" for more details.

The following is an example iframe which embeds our [*Bear APTs](layers/data/samples/Bear_APT.json) layer with tabs and the ability to add annotations removed:

```HTML
<iframe src="https://mitre-attack.github.io/attack-navigator/enterprise/#layerURL=https%3A%2F%2Fraw.githubusercontent.com%2Fmitre%2Fattack-navigator%2Fmaster%2Flayers%2Fdata%2Fsamples%2FBear_APT.json&tabs=false&selecting_techniques=false" width="1000" height="500"></iframe>
```

## Related MITRE Work

### CTI

[Cyber Threat Intelligence repository](https://github.com/mitre/cti) of the ATT&CK catalog expressed in STIX 2.0 JSON.

### ATT&CK

ATT&CK® is a curated knowledge base and model for cyber adversary behavior, reflecting the various phases of an adversary’s lifecycle and the platforms they are known to target. ATT&CK is useful for understanding security risk against known adversary behavior, for planning security improvements, and verifying defenses work as expected.

<https://attack.mitre.org>

### STIX

Structured Threat Information Expression (STIX™) is a language and serialization format used to exchange cyber threat intelligence (CTI).

STIX enables organizations to share CTI with one another in a consistent and machine readable manner, allowing security communities to better understand what computer-based attacks they are most likely to see and to anticipate and/or respond to those attacks faster and more effectively.

STIX is designed to improve many different capabilities, such as collaborative threat analysis, automated threat exchange, automated detection and response, and more.

<https://oasis-open.github.io/cti-documentation/>

## Notice

Copyright 2020 The MITRE Corporation

Approved for Public Release; Distribution Unlimited. Case Number 18-0128.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This project makes use of ATT&CK®

[ATT&CK® Terms of Use](https://attack.mitre.org/resources/terms-of-use/)
