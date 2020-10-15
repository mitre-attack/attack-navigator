# attack_layers_simple.py - the "hello, world" for ATT&CK Navigator layer generation
# Takes a simple CSV file containing ATT&CK technique IDs and counts of groups, software and articles/reports that reference this technique
# and generates an ATT&CK Navigator layer file with techniques scored and color-coded based on an algorithm
# This sample is intended to demonstrate generating layers from external data sources such as CSV files.

import argparse
import csv
import json
import sys

# Static ATT&CK Navigator layer JSON fields
LAYER_VERSION = "2.2"
NAV_VERSION = "2.3.2"
NAME = "example"
DESCRIPTION = "hello, world"
DOMAIN = "enterprise-attack"

# Main
def main():

    # handle arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input", action="store", dest="input_fn", default="attack.csv",
                        required=True, help="input ATT&CK csv file with tactic ID, groups, software, etc... fields")

    args = parser.parse_args()

    # Base ATT&CK Navigator layer
    layer_json = {
        "versions": {
            "layer": VERSION,
            "navigator": NAV_VERSION
        },
        "name": NAME,
        "description": DESCRIPTION,
        "domain": DOMAIN,
        "techniques": []
    }

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


    # add a color gradient (white -> red) to layer
    # ranging from zero (white) to the maximum score in the file (red)
    layer_json["gradient"] = {
        "colors": [
            "#ffffff",
            "#ff6666"
        ],
        "minValue": 0,
        "maxValue": max([technique["score"] for technique in layer_json["techniques"]])
    }

    # output JSON
    json.dump(layer_json, sys.stdout, indent=4)


if __name__ == "__main__":
    main()
