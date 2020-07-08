# ATT&CK<sup>TM</sup> Navigator Layer File Format Definition
This document describes **Version 3.0** of the MITRE ATT&CK Navigator Layer file format. The ATT&CK Navigator stores layers as JSON, therefore this document defines the JSON properties in a layer file.

## Property Table

| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| version | String | Yes | n/a | Must be "3.0" |
| name | String | Yes | n/a | The name of the layer |
| description | String | No | "" | A free-form text field that describes the contents or intent of the layer |
| domain | String | Yes | n/a | Technology domain that this layer represents. Valid values are: "mitre-enterprise" or "mitre-mobile" |
| filters |Filter object | No | | See Filter object definition below
| sorting | Number | No | 0 | Specifies the ordering of the techniques within each tactic category as follows: <br>**0**: sort ascending alphabetically by technique name <br>**1**: sort descending alphabetically by technique name <br>**2**: sort ascending by technique score <br>**3**: sort descending by technique score |
| layout | Layout object | No | | See definition of Layout object below |
| hideDisabled | Boolean | No | false | Specifies whether techniques that have been disabled are still displayed (greyed-out) or omitted from the view as follows: <br>**true**: omit techniques marked as disabled from the view <br>**false**: include disabled techniques in the view but display as greyed-out |
| techniques | Array of Technique objects | No | | See definition of Technique object below |
| gradient | Gradient object | No | Red to Green, minValue=0, maxValue=100 | See definition of Gradient object below |
| legendItems | Array of LegendItem objects | no | | See definition of LegendItem object below |
| showTacticRowBackground | boolean | no | false | If true, the tactic row background color will be the value of the _tacticRowBackground_ field |
| tacticRowBackground | string | no | "#dddddd" | The tactic row background color |
| selectTechniquesAcrossTactics | boolean | no | true | If true, selecting a technique also selects all instances with the same technique ID. See also selectSubtechniquesWithParent |
| selectSubtechniquesWithParent | boolean | no | true | If true, selecting a technique will also select all subtechniques of the technique. See also selectTechniquesAcrossTactics |
| metadata | Array of Metadata objects | No | | User defined metadata for this layer. See definition of Metadata object below |


## Filter Object Properties

| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| stages | Array of String | No |  ["act"] | Specifies the logical stages of the attack lifecycle to display. Valid choices are: "prepare" and "act". Array must contain at least one of these values |
| platforms | Array of String | No | **domain=mitre-enterprise**: "Windows", "Linux", "macOS" <br> **domain=mitre-mobile**: "Android", "iOS" | Specifies the platforms within the technology domain – only those techniques tagged with these platforms are to be displayed. Valid values are as follows: <br>**domain=mitre-enterprise**: "Windows", "Linux", "macOS", "AWS", "GCP", "Azure", "Azure AD", "Office 365", "SaaS" <br>**domain=mitre-mobile**: "Android", "iOS" |

## Technique Object properties

Technique objects are used to store both techniques and subtechniques. The only difference in representation between a technique and a subtechnique is in the techniqueID field, which for subtechniques is the parent technique ID followed by the subtechnique-id suffix.

| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| techniqueID | String | Yes | n/a | Unique identifier of the ATT&CK technique, e.g. "T####". For subtechniques, the format is "T####.###", where the substring to the left of the decimal is the parent technique ID, and the right-side substring is the subtechnique ID suffix. |
| tactic | String | No | n/a | Unique identifier of the ATT&CK technique's tactic, e.g. "lateral-movement". If the field is not present, the annotations for the technique will appear under every tactic the technique belongs to |
| comment | String | No | "" | Free-text field |
| enabled | Boolean | No | true | Specifies if the technique is considered enabled or disabled in this layer |
| score | Number | No | (unscored) | Optional numeric score assigned to this technique in the layer. If omitted, the technique is considered to be "unscored" meaning that it will not be assigned a color from the gradient by the Navigator |
| color | String | No | "" | Explicit color value assigned to the technique in this layer. Note that explicitly defined color overrides any color implied by the score – the Navigator will display the technique using the explicitly defined color |
| metadata | Array of Metadata objects | No | | User defined metadata for this technique. See definition of Metadata object below |
| showSubtechniques | boolean | false | false | if true, the subtechniques under this technique will be shown by default. This field is only valid under a technique with subtechniques. Note that subtechniques can still be shown/hidden using the UI controls — this field is simply the default state. |

## Gradient Object properties
| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| colors | Array of String | Yes | n/a | Specifies the hexadecimal RGB color values that constitute the color spectrum in use. The array must contain at least two (2) values, corresponding to the minValue and maxValue scores |
| minValue | Number | Yes | n/a | Lower bound score of the gradient |
| maxValue | Number | Yes | n/a | Upper bound score of the gradient. *Note: maxValue must be > minValue* |

## LegendItem Object properties
| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| label | String | Yes | n/a | The name of the legend item |
| color | String | Yes | n/a | The color of the legend item |

## Metadata Object properties
| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| name | String | Yes | n/a | the name of the metadata |
| value | String | Yes | n/a | The value of the metadata |

## Layout Object properties
| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| layout | String | No | "side' | The layout of the matrix. Either "side", "flat" or "mini" |
| showID | Boolean | No | false | if true, show the ATT&CK ID of techniques and tactics in the matrix |
| showName | Boolean | No | true | if true, show the name of techniques and tactics in the matrix |

## Example
The following example illustrates the layer file format:
```json
{
    "name": "example layer",
    "version": "3.0",
    "domain": "mitre-enterprise",
    "description": "hello, world",
    "filters": {
        "stages": [
            "act"
        ],
        "platforms": [
            "Windows",
            "macOS"
        ]
    },
    "sorting": 2,
    "layout": {
        "layout": "side",
        "showName": true,
        "showID": false
    },
    "hideDisabled": false,
    "techniques": [
        {
            "techniqueID": "T1110",
            "color": "#fd8d3c",
            "comment": "This is a comment for technique T1110",
            "showSubtechniques": true
        },
        {
            "techniqueID": "T1110.001",
            "comment": "This is a comment for T1110.001 - the first subtechnique of technique T1110.001"
        },
        {
            "techniqueID": "T1134",
            "tactic": "defense-evasion",
            "score": 75,
            "comment": "this is a comment for T1134 which is only applied on the defense-evasion tactic"
        },
        {
            "techniqueID": "T1078",
            "tactic": "discovery",
            "enabled": false
        },
        {
            "techniqueID": "T1053",
            "tactic": "privilege-escalation",
            "metadata": [
                { 
                    "name": "T1053 metadata1", 
                    "value": "T1053 metadata1 value" 
                },
                { 
                    "name": "T1053 metadata2", 
                    "value": "T1053 metadata2 value" 
                }
            ]
        }
    ],
    "gradient": {
        "colors": [
            "#ff6666",
            "#ffe766",
            "#8ec843"
        ],
        "minValue": 0,
        "maxValue": 100
    },
    "legendItems": [
        {
            "label": "Legend Item Label",
            "color": "#FF00FF"
        }
    ],
    "showTacticRowBackground": true,
    "tacticRowBackground": "#dddddd",
    "selectTechniquesAcrossTactics": false,
    "selectSubtechniquesWithParent": false,
    "metadata": [
        { 
            "name": "layer metadata 1", 
            "value": "layer metadata 1 value" 
        },
        { 
            "name": "layer metadata 2", 
            "value": "layer metadata 2 value" 
        }
    ]
}
```
