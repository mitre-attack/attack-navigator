# ATT&CK<sup>TM</sup> Navigator Layer File Format Definition
This document describes **Version 1.2** of the MITRE ATT&CK Navigator Layer file format. The ATT&CK Navigator stores layers as JSON, therefore this document defines the JSON properties in a layer file.

## Property Table

| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| version | String | Yes | n/a | Must be "1.2" |
| name | String | Yes | n/a | The name of the layer |
| description | String | No | "" | A free-form text field that describes the contents or intent of the layer |
| domain | String | Yes | n/a | Technology domain that this layer represents. Valid values are: "mitre-enterprise" or "mitre-mobile" |
| filters |Filter object | No | | See Filter object definition below
| sorting | Number | No | 0 | Specifies the ordering of the techniques within each tactic category as follows: <br>**0**: sort ascending alphabetically by technique name <br>**1**: sort descending alphabetically by technique name <br>**2**: sort ascending by technique score <br>**3**: sort descending by technique score |
| viewMode | Number | No | 0 | Specifies the view mode for the layer as follows: <br>**0**: display the full table with tactic and technique names <br>**1**: display compact table with abbreviated tactic and technique names <br>**2**: display mini table with no text with the exception of tooltips |
| hideDisabled | Boolean | No | false | Specifies whether techniques that have been disabled are still displayed (greyed-out) or omitted from the view as follows: <br>**true**: omit techniques marked as disabled from the view <br>**false**: include disabled techniques in the view but display as greyed-out |
| techniques | Array of Technique objects | No | | See definition of Technique object below |
| gradient | Gradient object | No | Red to Green, minValue=0, maxValue=100 | See definition of Gradient object below |
| legendItems | Array of LegendItem objects | no | | See definition of LegendItem object below |

## Filter Object Properties

| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| stages | Array of String | No |  ["act"] | Specifies the logical stages of the attack lifecycle to display. Valid choices are: "prepare" and "act". Array must contain at least one of these values |
| platforms | Array of String | No | All platforms defined within domain | Specifies the platforms within the technology domain – only those techniques tagged with these platforms are to be displayed. Valid values are as follows: <br>**domain=mitre-enterprise**: "windows", "linux", "mac" <br>**domain=mitre-mobile**: "android", "ios" |

## Technique Object properties

| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| techniqueID | String | Yes | n/a | Unique identifier of the ATT&CK technique, e.g. "T####" |
| comment | String | No | "" | Free-text field |
| enabled | Boolean | No | true | Specifies if the technique is considered enabled or disabled in this layer |
| score | Number | No | (unscored) | Optional numeric score assigned to this technique in the layer. If omitted, the technique is considered to be "unscored" meaning that it will not be assigned a color from the gradient by the Navigator |
| color | String | No | "" | Explicit color value assigned to the technique in this layer. Note that explicitly defined color overrides any color implied by the score – the Navigator will display the technique using the explicitly defined color |

## Gradient Object properties
| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| colors | Array of String | Yes | n/a | Specifies the hexadecimal RGB color values that constitute the color spectrum in use. The array must contain at least two (2) values, corresponding to the minValue and maxValue scores. |
| minValue | Number | Yes | n/a | Lower bound score of the gradient |
| maxValue | Number | Yes | n/a | Upper bound score of the gradient. *Note: maxValue must be > minValue* |

## LegendItem Object properties
| Name     | Type     | Required? | Default Value (if not present) | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| label | String | Yes | n/a | The name of the legend item |
| color | String | Yes | n/a | The color of the legend item |


## Example
The following example illustrates the layer file format:
```json
{
    "version": "1.2",
    "name": "example",
    "description": "hello, world",
    "domain": "mitre-enterprise",
    "filters": {
        "stages": ["act"],
        "platforms": ["windows"],
    },
    "sorting": 2,
    "techniques": [
        {
            "techniqueID": "T1156",
            "enabled": false,
            "comment": "disabled technique with a comment"
        },
        {
            "techniqueID": "T1103",
            "score": 50
        },
        {
            "color": "#FF00FF",
            "techniqueID": "T1015",
        },
    ],
    "legendItems": [
        {
            "label": "Legend Item Label",
            "color": "#FF00FF"
        }
    ]
}
```
