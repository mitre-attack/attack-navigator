import argparse
import requests
import json
import stix2
import random

def generate():
    """parse the STIX on MITRE/CTI and return a layer dict with techniques with randomized scores"""
    # import the STIX data from MITRE/CTI
    stix = requests.get("https://raw.githubusercontent.com/mitre/cti/subtechniques/enterprise-attack/enterprise-attack.json", verify=False).json()
    ms = stix2.MemoryStore(stix_data=stix["objects"])
    # get all techniques in STIX
    techniques = ms.query([
        stix2.Filter("type", "=", "attack-pattern")
    ])
    # parse techniques into layer format
    techniques_list = []
    for technique in techniques:
        # skip deprecated and revoked
        if ("x_mitre_deprecated" in technique and technique["x_mitre_deprecated"]) or ("revoked" in technique and technique["revoked"]): continue
        techniqueID = technique["external_references"][0]["external_id"] # get the attackID
        techniques_list.append({
            "techniqueID": techniqueID,
            "score": random.randint(1,100) # random score
        })
    # return the techniques in a layer dict
    return {
        "name": "heatmap example",
        "version": "3.0",
        "sorting": 3, # descending order of score
        "description": "An example layer where all techniques have a randomized score",
        "domain": "mitre-enterprise",
        "techniques": techniques_list,
    }


if __name__ == '__main__':
    # download data depending on domain
    parser = argparse.ArgumentParser(
        description="Generates a layer wherein all techniques have randomized scores from 1-100."
    )
    parser.add_argument("--output",
        type=str,
        default="../data/samples/heatmap_layer.json",
        help="output filepath"
    )
    args = parser.parse_args()
    # get the layer
    layer = generate()
    # write the layerfile
    with open(args.output, "w") as f:
        print("writing", args.output)
        f.write(json.dumps(layer, indent=4))