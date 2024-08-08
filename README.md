# ATT&CK® Navigator

The ATT&CK Navigator is designed to provide basic navigation and annotation of ATT&CK matrices. This project is designed to be simple and generic, allowing you to visualize your defensive coverage, red/blue team planning, the frequency of detected techniques, or anything else. The Navigator enables you to manipulate the cells in the matrix (color coding, adding comments, assigning numerical values, etc.).

The principal feature of the Navigator is the ability for users to define layers - custom views of the ATT&CK knowledge base - e.g., showing just those techniques for a particular platform or highlighting techniques a specific adversary has been known to use. Layers can be created interactively within the Navigator or generated programmatically and then visualized via the Navigator.

## Requirements

* [Node.js v16](https://nodejs.org)
* [AngularCLI](https://cli.angular.io)
* [Python 3.X](https://www.python.org/)

## Supported Browsers

* Chrome
* Firefox
* Internet Explorer 11
* Edge
* Opera
* Safari<sup>[2]</sup>

**[1]** There is a recorded issue with the SVG export feature on Internet Explorer. Because of a [missing functionality on SVGElements](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children) in that browser, text will not be properly vertically centered in SVGs exported in that browser. We recommend switching to a more modern browser for optimal results.

**[2]** ATT&CK Navigator only supports Safari versions 14 and above because older versions of the browser can exhibit an unfixable freeze when selecting a layer tab. Users on unsupported versions of the browser will be warned of this possibility when opening the application.

## Install and Run

### First time

1. Navigate to the **nav-app** directory
2. Run `npm install`

### start application on local machine

1. Run `npm run start-all` within the **nav-app** directory (this will start the python server on port 3001 and the application on port 4200)
2. Navigate to `localhost:4200` in browser

### Compile for use elsewhere

1. Run `ng build` within the **nav-app** directory
2. Copy files from `nav-app/dist/` directory

_Note: `ng build --configuration production` does not currently work for ATT&CK Navigator without additional flags. To build the production environment instead use `ng build --configuration production --aot=false --build-optimizer=false`._

## Process Description
### Preparation and Input

    Excel File: Start with an Excel file containing two sheets:
        Technologies per Customer: A list of technologies used by each customer.
        Covered Data Components per Technology: Specifications of which data components are covered by each technology.

### Data Processing

    Running main.py:
        The script reads data from the Excel sheets.
        This data is processed and converted into a layer file.
        The generated layer file is saved in nav-app/src/app/layerfiles.

### Starting the Application

    Start the Application:
        Run npm run start-all in the nav-app directory.
        This starts the Python server on port 3001 (necessary for back-end and front-end communication) and the application on localhost:4200.

### Using the Application

    Loading the Layer File:
        Navigate to localhost:4200 in your browser.
        Choose a method to load a layer file:
            Creating a new layer directly.
            Via a local file.
            Through the Python server.


## Methods for Loading a Layer File

### Loading from Python server

1. Run main.py first to generate the necessary layer files in nav-app/src/app/layerfiles.
2. Start the application if you haven't already or reload the webpage.
3. Once the webpage is loaded/reloaded, you can select the color code for the layer file.

### Loading from local files

1. Click Open Existing Layer and Upload from local.
2. Ensure you have the layer file saved locally.

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

   would load `example.json` from the local assets directory, and `Bear_APT.json` from MITRE ATT&CK repo's sample layer folder on Github.
3. Load/reload the Navigator

Default layers from the web can also be set using a query string in the Navigator URL. 
Refer to the in-application help page section "Customizing the Navigator" for more details.
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


## Related MITRE Work

### CTI

[Cyber Threat Intelligence repository](https://github.com/mitre/cti) of the ATT&CK catalog expressed in STIX 2.0 JSON.

### ATT&CK STIX Data

[ATT&CK STIX Data repository](https://github.com/mitre-attack/attack-stix-data) of the ATT&CK catalog expressed in STIX 2.1 JSON.

### ATT&CK

ATT&CK® is a curated knowledge base and model for cyber adversary behavior, reflecting the various phases of an adversary’s lifecycle and the platforms they are known to target. ATT&CK is useful for understanding security risk against known adversary behavior, for planning security improvements, and verifying defenses work as expected.

<https://attack.mitre.org>

### STIX

Structured Threat Information Expression (STIX™) is a language and serialization format used to exchange cyber threat intelligence (CTI).

STIX enables organizations to share CTI with one another in a consistent and machine readable manner, allowing security communities to better understand what computer-based attacks they are most likely to see and to anticipate and/or respond to those attacks faster and more effectively.

STIX is designed to improve many different capabilities, such as collaborative threat analysis, automated threat exchange, automated detection and response, and more.

<https://oasis-open.github.io/cti-documentation/>

## Notice

Copyright 2024 The MITRE Corporation

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
