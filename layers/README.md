# ATT&CK Navigator Layers

This folder contains a basic script that demonstrates how layer files can be generated for use in the ATT&CK Navigator. Sample layer files are found in the **data/samples** sub-folder.

The **data/update_layers** folder currently contains a layer file that is based on the April 2018 ATT&CK content update.

If you want to learn more about the format of layer files, **LAYERFORMATv2_1.md** describes version 2.1 of the MITRE ATT&CK Navigator Layer file format.

*Also, feel free to come up with your own ideas for layer file generation, and contribute them to the community by making a pull request to the ATT&CK Navigator!*

## Simple Example

The script **attack_layers_simple.py** generates layer files based on the contents of a CSV file. CSV files with pre-calculated data can be ingested and used to apply evaluation criteria - in this case an arbitrary formula - to every ATT&CK technique.

It's important to emphasize that the scores generated here are **arbitrary**! This formula is used just for the purpose of this script, to provide an example of how to add scores to techniques. We also chose to supply **software**, **groups**, and **references** via CSV file for the purposes of this script to create the scores, but any data or metadata related to ATT&CK techniques may be supplied or used to add scores and other fields to the layer files.

The code excerpt below shows how **attack_layers_simple.py** adds scores to techniques:

```python
# parse csv file, calculating a score for each technique and adding that to the layer
with open(args.input_fn, "rb") as csvfile:
    reader = csv.DictReader(csvfile, delimiter=",")
    for row in reader:
        # score each technique based on a simple formula
        technique = {
            "techniqueID": row["TechID"],
            "score": (int(row["Software"]) + int(row["Groups"]))*2 + int(row["References"])
        }

        layer_json["techniques"].append(technique)

```

**attack_layers_simple.py** adds all of the required layer fields as outlined in **LAYERFORMATv2_1.md**. Additionally, a *gradient* field is added that specifies a color range that will be applied to the techniques based on their scores. In **attack_layers_simple.py**, we specify min/max values that match the min/max of the set of technique scores that were calculated.


```python
# add a color gradient (white -> red) to layer, ranging  
# from zero (white) to the maximum score in the file (red)
layer_json["gradient"] = {
    "colors": [
        "#ffffff",   # White
        "#ff6666"    # Red
    ],
    "minValue": 0,
    "maxValue": max([technique["score"] for technique in layer_json["techniques"]])
}
```
See **data/csv** for an example csv file that can be ingested by **attack_layers_simple.py** (simple_input.csv) and **data/samples** to view a layer file output by this code (heatmap_layer.json).

## Sample Layer Files
We included a few sample layer files in **data/samples**. Each has a unique description that explains the coverage of that particular layer. You can upload these files to the Navigator to see the correlation between the layer files and the Navigator application.
