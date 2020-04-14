import argparse
import requests
import json
import stix2

def generate(show_nodetect=False):
    """
        generate and return a layer dict showing techniques used by APT3 and APT29 as well as software used by those groups
        param show_nodetect, if true, causes techniques that have no data-sources to be highlighted as well
    """
    stix = requests.get("https://raw.githubusercontent.com/mitre/cti/subtechniques/enterprise-attack/enterprise-attack.json", verify=False).json()
    ms = stix2.MemoryStore(stix_data=stix["objects"])
    apt3 = ms.get("intrusion-set--0bbdf25b-30ff-4894-a1cd-49260d0dd2d9")
    apt29 = ms.get("intrusion-set--899ce53f-13a0-479b-a0e4-67d46e241542")
    
    techniques_used = {} # attackID => {apt3: boolean, apt29: boolean, software: Set, detection: boolean}

    for apt in [apt3, apt29]:

        def use_technique(technique, software=None):
            """helper function to record a technique as used"""
            techniqueID = technique["external_references"][0]["external_id"]
            # init struct if the technique has not been seen before
            if not techniqueID in techniques_used:
                techniques_used[techniqueID] = {
                    "APT3": False,
                    "APT29": False,
                    "software": set(),
                    "datasources": []
                }
            # record new data
            techniques_used[techniqueID][apt["name"]] = True
            if "x_mitre_data_sources" in technique and len(technique["x_mitre_data_sources"]) > 0: 
                techniques_used[techniqueID]["datasources"] = technique["x_mitre_data_sources"]
            if software:
                techniques_used[techniqueID]["software"].add(software["name"])
        
        # traverse relationships
        for relationship in ms.relationships(apt["id"]):
            target_obj = ms.get(relationship["target_ref"])
            # skip relationships with deprecated objects
            if ("x_mitre_deprecated" in target_obj and target_obj["x_mitre_deprecated"]) or ("revoked" in target_obj and target_obj["revoked"]): continue
            # technique type relationship
            if target_obj["type"] == "attack-pattern": 
                # record technique usage
                use_technique(target_obj)
            # software type relationship, traverse to find software-used techniques
            if target_obj["type"] == "malware" or target_obj["type"] == "tool":
                software = target_obj
                for software_relationship in ms.relationships(software["id"]):
                    software_target_obj = ms.get(software_relationship["target_ref"])
                    # skip relationships with deprecated objects
                    if ("x_mitre_deprecated" in software_target_obj and software_target_obj["x_mitre_deprecated"]) or ("revoked" in software_target_obj and software_target_obj["revoked"]): continue
                    if software_target_obj["type"] == "attack-pattern": 
                        # record technique usage
                        use_technique(software_target_obj, software)

    # format the techniques for the output layer
    techniques_list = []

    def color_lookup(usage): 
        if show_nodetect and not len(usage["datasources"]) > 0:
            return "#fc3b3b"
        if usage["APT3"] and usage["APT29"]: 
            return "#74c476"
        if usage["APT3"]: return "#6baed6"
        if usage["APT29"]: return "#fce93b"

    for techniqueID in techniques_used:
        # determine the number of used techniques for the score
        comment = ""
        if show_nodetect:
            if len(techniques_used[techniqueID]["datasources"]) > 0:
                comment = f"considered detectable by a notional organization because it has data-sources {', '.join(techniques_used[techniqueID]['datasources'])}"
            else:
                comment = "considered undetectable by a notional organization because it has no data-sources"
        else:
            used = []
            if techniques_used[techniqueID]["APT3"]: used.append("APT3") 
            if techniques_used[techniqueID]["APT29"]: used.append("APT29") 
            used += list(techniques_used[techniqueID]["software"])
            comment = f"used by {', '.join(used)}"
        # append technique struct to list of layer-formatted techniques
        techniques_list.append({
            "techniqueID": techniqueID,
            "color": color_lookup(techniques_used[techniqueID]),
            "comment": comment,
        })

    # construct and return the layer as a dict
    # set up layer information according to show_nodetect
    name = "APT3 + APT29 with software"
    description = "This layer shows techniques (including techniques from software used by the groups) used by APT3 only in blue, APT29 only in yellow, and both APT3 and APT29 in green."
    legend = [
        {
            "label": "Used by APT3 or a software APT3 uses",
            "color": color_lookup({"APT3": True, "APT29": False, "datasources": ["placeholder"]})
        },
        {
            "label": "Used by APT29 or a software APT29 uses",
            "color": color_lookup({"APT3": False, "APT29": True, "datasources": ["placeholder"]})
        },
        {
            "label": "Used by both APT3 or a softare APT3 uses and APT29 or a software APT29 uses",
            "color": color_lookup({"APT3": True, "APT29": True, "datasources": ["placeholder"]})
        }
    ]
    # additional formatting when displaying notional detectability
    if show_nodetect: 
        name += " and notional no detection"
        description += " The techniques in red denote techniques considered undetectable by a notional organization because they have no data-sources. Disclaimer: Data-sources in ATT&CK are sources of information that COULD be used to identify adversary actions, however the exactness of that evidence varies greatly. Therefore the presence of a data source for technique should only be considered a potential metric for detectability."
        legend.append({
            "label": "Used by either APT3 or APT29 but considered undetectable by a notional organization because it has no data-sources",
            "color": color_lookup({"APT3": True, "APT29": True, "datasources": []})
        })
        
    # layer struct
    return {
        "name": name,
        "version": "3.0",
        "description": description,
        "domain": "mitre-enterprise",
        "techniques": techniques_list,
        "legendItems": legend
    }
        

if __name__ == '__main__':
    # download data depending on domain
    parser = argparse.ArgumentParser(
        description="Creates a layer file showing techniques used by APT3 and APT29 as well as software used by those groups, and a second layer showing the same but with the added concept of detectability by a notional organization."
    )
    parser.add_argument("--output",
        type=str,
        default="../data/samples/APT3_+_APT29_with_software.json",
        help="output filepath for layer showing APT3 and APT29"
    )
    parser.add_argument("--output-notional",
        type=str,
        dest="notional",
        default="../data/samples/APT3_+_APT29_with_software_and_notional_no_detection.json",
        help="output filepath for layer showing APT3 and APT29 with detectability by a notional organization"
    )
    args = parser.parse_args()
    for arg in ["output", "notional"]:
        # get the layer
        layer = generate(arg == "notional")
        # write the layerfile
        with open(vars(args)[arg], "w") as f:
            print("writing", vars(args)[arg])
            f.write(json.dumps(layer, indent=4))