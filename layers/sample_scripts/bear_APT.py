import argparse
import requests
import json
import stix2
import re

def generate():
    """parse the STIX on MITRE/CTI and return a layer dict showing all techniques used by an APT group with phrase 'bear' in the group aliases."""
    # import the STIX data from MITRE/CTI
    stix = requests.get("https://raw.githubusercontent.com/mitre/cti/subtechniques/enterprise-attack/enterprise-attack.json", verify=False).json()
    ms = stix2.MemoryStore(stix_data=stix["objects"])

    groups = ms.query([ stix2.Filter("type", "=", "intrusion-set") ])

    # find bear groups
    bear_groups = [] #list of groups with bear in name
    for group in groups:
        # filter out deprecated and revoked groups
        if ("x_mitre_deprecated" in group and group["x_mitre_deprecated"]) or ("revoked" in group and group["revoked"]): continue
        # check all aliases for bear
        for alias in group["aliases"]:
            if re.match(".*bear.*", alias, re.IGNORECASE) is not None:
                bear_groups.append(group)
                break # don't match the same group multiple times

    # find techniques used by bear groups
    techniques_used = {} #attackID => using bear groups
    for bear in bear_groups:
        # construct the "bear" name for the comment
        # if bear occurs in multiple aliases, list them all
        bearnames = []
        for alias in bear["aliases"]:
            if re.match(".*bear.*", alias, re.IGNORECASE) is not None:
                bearnames.append(alias)
        bearname = bearnames[0]
        if len(bearnames) > 1: 
            bearname += " (AKA " + ",".join(bearnames[1:]) + ")"

        # get techniques used by this group
        relationships = ms.relationships(bear["id"])
        for relationship in relationships:
            # skip all non-technique relationships
            if "attack-pattern" not in relationship["target_ref"]: continue
            technique = ms.get(relationship["target_ref"])
            # filter out deprecated and revoked techniques
            if ("x_mitre_deprecated" in technique and technique["x_mitre_deprecated"]) or ("revoked" in technique and technique["revoked"]): continue
            techniqueID = technique["external_references"][0]["external_id"]
            # store usage in techniques_used struct
            if techniqueID in techniques_used:
                techniques_used[techniqueID].append(bearname)
            else:
                techniques_used[techniqueID] = [bearname]

    # format the techniques for the output layer
    techniques_list = []
    for techniqueID in techniques_used:
        techniques_list.append({
            "techniqueID": techniqueID,
            "comment": "used by " + ", ".join(techniques_used[techniqueID]),
            "color": "#ff6666"
        })
    # construct and return the layer as a dict
    return {
        "name": "*Bear APTs",
        "version": "3.0",
        "description": "All techniques used by an APT group with phrase 'bear' in the group aliases",
        "domain": "mitre-enterprise",
        "techniques": techniques_list,
        "legendItems": [{
            "label": "Used by a group the phrase 'bear' in the group aliases",
            "color": "#ff6666"
        }]
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Parses STIX data to create a layer showing all techniques used by an APT group with phrase 'bear' in the group aliases."
    )
    parser.add_argument("--output",
        type=str,
        default="../data/samples/Bear_APT.json",
        help="output filepath"
    )
    args = parser.parse_args()
    # get the layer
    layer = generate()
    # write the layerfile
    with open(args.output, "w") as f:
        print("writing", args.output)
        f.write(json.dumps(layer, indent=4))