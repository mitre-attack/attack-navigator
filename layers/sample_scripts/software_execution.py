import argparse
import requests
import json
import stix2
from itertools import chain

def generate(softwaretype="software"):
    """ generate and return a layer dict showing techniques used by software
        If softwaretype is specified as "malware" or "tool", only shows software of that type. If softwaretype is specified as "software" output layer shows both malware and tools
    """
    # import the STIX data from MITRE/CTI
    stix = requests.get("https://raw.githubusercontent.com/mitre/cti/subtechniques/enterprise-attack/enterprise-attack.json", verify=False).json()
    ms = stix2.MemoryStore(stix_data=stix["objects"])
    # software includes malware and tool types so perform two queries and merge the results
    software_filters = []
    if softwaretype == "malware" or softwaretype == "software":
        software_filters.append( [ stix2.Filter('type', '=', 'malware') ] )
    if softwaretype == "tool" or softwaretype == "software":
        software_filters.append( [ stix2.Filter('type', '=', 'tool') ] )
        
    software = list(chain.from_iterable(
        ms.query(f) for f in software_filters
    ))

    # build a list of techniques used by software
    techniques_used = {} #attackID => using software names
    for thesoftware in software:
        # filter out revoked and deprecated software
        if ("x_mitre_deprecated" in thesoftware and thesoftware["x_mitre_deprecated"]) or ("revoked" in thesoftware and thesoftware["revoked"]): continue
        for relationship in ms.relationships(thesoftware["id"]):
            # skip all non-technique relationships
            if "attack-pattern" not in relationship["target_ref"]: continue
            technique = ms.get(relationship["target_ref"])
            # filter out deprecated and revoked techniques
            if ("x_mitre_deprecated" in technique and technique["x_mitre_deprecated"]) or ("revoked" in technique and technique["revoked"]): continue
            techniqueID = technique["external_references"][0]["external_id"]
            # store usage in techniques_used struct
            if techniqueID in techniques_used:
                techniques_used[techniqueID].append(thesoftware["name"])
            else:
                techniques_used[techniqueID] = [thesoftware["name"]]

    # format the techniques for the output layer
    techniques_list = []
    highest_usage = 0
    lowest_usage = 1
    for techniqueID in techniques_used:
        # determine the number of used techniques for the score
        count = len(techniques_used[techniqueID])
        highest_usage = max(highest_usage, count)
        lowest_usage = min(lowest_usage, count)
        # append technique struct to list of layer-formatted techniques
        techniques_list.append({
            "techniqueID": techniqueID,
            "comment": "executed by " + ", ".join(techniques_used[techniqueID]),
            "score": count,
        })
    # set up layer name and desc according to softwaretype
    if softwaretype != "software": 
        plural = "tools" if softwaretype == "tool" else "malware"
        layername = f"Software ({softwaretype}) Execution"
        layerdescription = f"All techniques that can be executed by software of subtype {softwaretype}, where the score is the count of {plural} using the technique"
    else: 
        layername = "Software Execution"
        layerdescription = f"All techniques that can be executed by software, where the score is the count of software using the technique"

    # construct and return the layer as a dict
    return {
        "name": layername,
        "description": layerdescription,
        "version": "3.0",
        "domain": "mitre-enterprise",
        "techniques": techniques_list,
        "sorting": 3, # order in descending order of score (count)
        "gradient": {
            "colors": [
                "#fff7b3", # low counts are yellow
                "#ff6666", # high counts are red
            ],
            "minValue": lowest_usage,
            "maxValue": highest_usage
        },
    }

if __name__ == '__main__':
    # download data depending on domain
    parser = argparse.ArgumentParser(
        description="Generates layers showing all techniques that can be executed by software"
    )
    parser.add_argument("--output-software",
        type=str,
        dest="software",
        default="../data/samples/software_execution.json",
        help="output filepath for layer showing software (malware and tool) execution"
    )
    parser.add_argument("--output-malware",
        type=str,
        dest="malware",
        default="../data/samples/software_malware_execution.json",
        help="output filepath for layer showing software (malware) execution"
    )
    parser.add_argument("--output-tools",
        type=str,
        dest="tool",
        default="../data/samples/software_tool_execution.json",
        help="output filepath for layer showing software (tool) execution"
    )
    args = parser.parse_args()
    for arg in ["software", "malware", "tool"]:
        # get the layer dict
        layer = generate(softwaretype=arg)
        # write the layerfile
        with open(vars(args)[arg], "w") as f:
            print("writing", vars(args)[arg])
            f.write(json.dumps(layer, indent=4))