# ATT&CK<sup>™</sup> Navigator
The ATT&CK Navigator is designed to provide basic navigation and annotation of [ATT&CK](https://attack.mitre.org) matrices, something that people are already doing today in tools like Excel.  We've designed it to be simple and generic - you can use the Navigator to visualize your defensive coverage, your red/blue team planning, the frequency of detected techniques or anything else you want to do.  The Navigator doesn't care - it just allows you to manipulate the cells in the matrix (color coding, adding a comment, assigning a numerical value, etc.).  We thought having a simple tool that everyone could use to visualize the matrix would help make it easy to use ATT&CK.

The principal feature of the Navigator is the ability for users to define layers - custom views of the ATT&CK knowledge base - e.g. showing just those techniques for a particular platform or highlighting techniques a specific adversary has been known to use. Layers can be created interactively within the Navigator or generated programmatically and then visualized via the Navigator.

## Usage
There is an **Install and Run** section below that explains how to get the ATT&CK Navigator up and running. You can also try the Navigator out by pointing your browser [here](https://mitre.github.io/attack-navigator). The default is the [Enterprise ATT&CK](https://attack.mitre.org) domain, but the [Mobile ATT&CK](https://attack.mitre.org/mobile) domain can be utilized [here](https://mitre.github.io/attack-navigator/mobile/). See **Enterprise and Mobile Domains** below for information on how to set up the ATT&CK Navigator on local instances to use the two different domains.

**Important Note:** Layer files uploaded when visiting our Navigator instance hosted on GitHub Pages are **NOT** being stored on the server side, as the Navigator is a client-side only application. However, we still recommend installing and running your own instance of the ATT&CK Navigator if your layer files contain any sensitive content.

Use our [GitHub Issue Tracker](https://github.com/mitre/attack-navigator/issues) to let us know of any bugs or others issues that you encounter. We also encourage pull requests if you've extended the Navigator in a cool way and want to share back to the community!

*See [CONTRIBUTING.md](https://github.com/mitre/attack-navigator/blob/master/CONTRIBUTING.md) for more information on making contributions to the ATT&CK Navigator.*

## Requirements
* [Node.js](https://nodejs.org)
* [AngularCLI](https://cli.angular.io)

## Supported Browsers
* Chrome
* Firefox
* Internet Explorer
* Safari<sup>1</sup>
* Edge
* Opera

<sup>1</sup> There is a recorded issue with using the **ATT&CK Navigator** on Safari. If the user reloads the page but cancels the action when prompted, the refresh icon in the browser window remains in the `cancel reload` state. This is believed to be an issue with Safari and not with the application.

## Install and Run
#### First time
1. Navigate to the **nav-app** directory
2. Run `npm install`

#### Serve application on local machine
1. Run `ng serve` within the **nav-app** directory
2. Navigate to `localhost:4200` in browser

#### Compile for use elsewhere
1. Run `ng build` within the **nav-app** directory
2. Copy files from `nav-app/dist/` directory

## Documentation
When viewing the app in a browser, click on the **?** icon to the right of the **ATT&CK<sup>™</sup> Navigator** title to view its documentation.

## Enterprise and Mobile Domains
By default, the ATT&CK Navigator will generate a matrix view of the tactics and techniques matrix for the [Enterprise ATT&CK](https://attack.mitre.org) technology domain knowledge base. All tactics and techniques in this domain are contained within the *act* stage, which is also pre-selected by default.

To instead generate a matrix view of the [Mobile ATT&CK](https://attack.mitre.org/mobile) technology domain knowledge base, change the `domain` value in `nav-app/src/assets/config.json` to `mitre-mobile`. **Use Device Access** and **Network-Based Effects** tactics and techniques in this domain are contained within the *act* stage, which is pre-selected by default. **Obtain Device Access** tactics and techniques are contained within the *prepare* stage, which can be manually selected.

[PRE-ATT&CK](https://attack.mitre.org/pre-attack) is included in the matrix view for either domain if the *prepare* stage is manually selected within the layer control filters.

#### Tactics
The tactics displayed in the ATT&CK matrices are pulled from the file `nav-app/src/assets/tacticsData.json` where they are organized by domain. We will keep this file up to date as tactics are added and edited in new releases of [ATT&CK](https://attack.mitre.org).

## Layers Folder
The **layers** folder currently contains a Python script that automatically generates layer files. We will continue to add content to this repository as new scripts are implemented. Also, feel free to create pull requests if you want to add new capabilities here!

The **layers** folder's **README** contains more detailed information about how to utilize this set of scripts, and **LAYERFORMATv2.md** describes version 2.0 of the layer file format for the Navigator.

More information on how layers are used and developed can be found in the ATT&CK Navigator documentation that can be viewed by clicking **?** when running the app in a browser.

## Adding Custom Context Menu Options
To create custom options to the **ATT&CK<sup>™</sup> Navigator** context menu using data in the Navigator, objects must be added to the array labeled `custom_context_menu_options` in `nav-app/src/assets/config.json`. Each object must have a property **label**, which is the text displayed in the context menu, and a property **url**, which is where the user is navigated.

To utilize data on right-clicked technique in the url, parameters surrounded by tildes can be added to the string. For example: using `http://www.someurl.com/~Technique_ID~` as the url in the custom option would lead to `http://www.someurl.com/T1098`, if the right-clicked technique's ID was T1098.

Available technique data able to be added to the url:
* **Technique_ID** returns the Technique ID
* **Technique_Name** returns the Technique Name with the first letter of each word capitalized and using underscores between words
* **Tactic_Name** returns the Tactic Name with the first letter of each word capitalized and using underscores between words

Example custom context menu object:
```json
{
    "label": "custom technique url",
    "url": "https://attack.mitre.org/wiki/Technique/~Technique_Name~"
}
```

## Loading content from a TAXII server
*By default, the Navigator loads content from the MITRE CTI TAXII server at https://cti-taxii.mitre.org.*
1. Edit the `config.json` file in the **nav-app/src/assets** directory
2. Set the `enabled` property in `taxii_server` to **true**
3. Set the `url` property in `taxii_server` to your server's URL
4. Set the values of the `collections` dictionary to the collection UUIDs your TAXII server has set

## Loading content from local files
*It's possible to populate the the Navigator using files that consist of bundles of STIX objects, similarly to [this](https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json) file.*
1. Put the files in `src/assets` in the Navigator code. This will tell the server hosting the Navigator to host the data as well.
2. Change `enterprise_attack_url` (and mobile and pre-attack depending on what you're trying to do) in `src/assets/config.json` to the path to the file (probably something like `src/assets/enterprise-attack.json`).
3. Also in that file, change `taxii_server -> enabled` to false.

## Running the Docker File
1. Navigate to the **nav-app** directory
2. Run `docker build -t yourcustomname .`
3. Run `docker run -p 4200:4200 yourcustomname`
4. Navigate to `localhost:4200` in browser

## Loading a Default Layer Upon Initialization
1. Save a layer JSON file to the `nav-app/src/assets/` directory
2. Set the `location` property in `default_layer` in **config.json** to `assets/YOUR_LAYER_HERE.json`
3. Set the `enabled` property in `default_layer` to **true**
4. Load/reload the Navigator

A layer hosted on the web can be set as default using the _create customized Navigator_
feature. Refer to the in-application help page section "Customizing the Navigator" for more details.

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
<iframe src="https://mitre.github.io/attack-navigator/enterprise/" width="1000" height="500"></iframe>
```
If you want to imbed a version of the Navigator with specific features removed (e.g tabs, adding annotations), or with a default layer, we recommend using the _create customized Navigator_ feature. Refer to the in-application help page section "Customizing the Navigator" for more details.

The following is an example iframe which embeds our [*Bear APTs](layers/data/samples/Bear_APT.json) layer with tabs and the ability to add annotations removed:
```HTML
<iframe src="https://mitre.github.io/attack-navigator/enterprise/#layerURL=https%3A%2F%2Fraw.githubusercontent.com%2Fmitre%2Fattack-navigator%2Fmaster%2Flayers%2Fdata%2Fsamples%2FBear_APT.json&tabs=false&selecting_techniques=false" width="1000" height="500"></iframe>
```

## Related MITRE Work
#### CTI
[Cyber Threat Intelligence repository](https://github.com/mitre/cti) of the ATT&CK catalog expressed in STIX 2.0 JSON.

#### ATT&CK
MITRE’s Adversarial Tactics, Techniques, and Common Knowledge (ATT&CK™) is a curated knowledge base and model for cyber adversary behavior, reflecting the various phases of an adversary’s lifecycle and the platforms they are known to target. ATT&CK is useful for understanding security risk against known adversary behavior, for planning security improvements, and verifying defenses work as expected.

https://attack.mitre.org

#### STIX
Structured Threat Information Expression (STIX™) is a language and serialization format used to exchange cyber threat intelligence (CTI).

STIX enables organizations to share CTI with one another in a consistent and machine readable manner, allowing security communities to better understand what computer-based attacks they are most likely to see and to anticipate and/or respond to those attacks faster and more effectively.

STIX is designed to improve many different capabilities, such as collaborative threat analysis, automated threat exchange, automated detection and response, and more.

https://oasis-open.github.io/cti-documentation/

## Notice
Copyright 2018 The MITRE Corporation

Approved for Public Release; Distribution Unlimited. Case Number 18-0128.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This project makes use of ATT&CK<sup>™</sup>

[ATT&CK Terms of Use](https://attack.mitre.org/wiki/enterprise:Terms_of_Use)
