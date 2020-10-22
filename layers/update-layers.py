import argparse
import requests
import json

revoked_by = {} #attackID => {replacing attackID, tactics[] of new technique}
domains = {
    "enterprise-attack": {"url": "https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json", "downloaded": False },
    "mobile-attack": {"url": "https://raw.githubusercontent.com/mitre/cti/master/mobile-attack/mobile-attack.json", "downloaded": False }
}

# backwards compatability for domain format
domain_backwards_compatability = {
    "enterprise-attack": "enterprise-attack", # no change
    "mitre-enterprise": "enterprise-attack",
    "mobile-attack": "mobile-attack", # no change
    "mitre-mobile": "mobile-attack",
    "ics-attack": "ics-attack" # no change
    # ICS had no old format domain
}

def download_domain(domain):
    # download the data for the domain
    print("\t-", "downloading data for", domain)
    stix_data = requests.get(domains[domain]["url"], verify=False).json()["objects"]
    print("\t-", "parsing data for", domain)
    # get stixID to attackID mapping for techniques
    stixID_to_attackID = {}
    techniques = filter(lambda sdo: sdo["type"] == "attack-pattern", stix_data)
    for technique in techniques:
        tactics = list(map(lambda kcp: kcp["phase_name"], technique["kill_chain_phases"])) if "kill_chain_phases" in technique else []
        stixID_to_attackID[technique["id"]] = {
            "attackID": technique["external_references"][0]["external_id"],
            "tactics": tactics
        }

    # build revocations of techniques
    revocations = filter(lambda sdo: sdo["type"] == "relationship" and sdo["relationship_type"] == "revoked-by", stix_data)
    for revocation in revocations:
        if revocation["source_ref"] in stixID_to_attackID and revocation["target_ref"] in stixID_to_attackID:
            revoked_by[stixID_to_attackID[revocation["source_ref"]]["attackID"]] = stixID_to_attackID[revocation["target_ref"]]
    # record that it's already downloaded so we don't download twice
    domains[domain]["downloaded"] = True

def update_layer(layerfile, replace=False):
    print("processing", layerfile)
    with open(layerfile, "r") as f:
        layer = json.load(f)

    layer["domain"] = domain_backwards_compatability[layer["domain"]] # patch old domain setup

    # download data for appropriate domains
    if not domains[layer["domain"]]["downloaded"]:
        download_domain(layer["domain"])
    else:
        print("data already downloaded for", layer["domain"])

    # update viewMode to layout
    if "viewMode" in layer:
        print("\t-", "updating viewMode to layout")
        if layer["viewMode"] == 0:
            layer["layout"] = {
                "layout": "side",
                "showName": True,
                "showID": False
            }
        elif layer["viewMode"] == 1:
            layer["layout"] = {
                "layout": "side",
                "showName": False,
                "showID": True
            }
        elif layer["viewMode"] == 2:
            layer["layout"] = {
                "layout": "mini",
                "showName": False,
                "showID": False
            }
        del layer["viewMode"]

    # update with new platform formats
    if "filters" in layer and "platforms" in layer["filters"]:
        platforms = []
        for platform in layer["filters"]["platforms"]:
            platform_mappings = {
                "android": "Android",
                "ios": "iOS",
                "windows": "Windows",
                "linux": "Linux",
                "mac": "macOS"
            }
            if platform in platform_mappings:
                newPlatform = platform_mappings[platform]
                print("\t-", "updating platform", platform, "to", newPlatform)
                platforms.append(newPlatform)
            else:
                platforms.append(platform)
        layer["filters"]["platforms"] = platforms

    # remove stages filter
    if "filters" in layer and "stages" in layer["filters"]:
        layer["filters"].pop("stages")

    # update techniques by revocations
    for technique in layer["techniques"]:
        if technique["techniqueID"] in revoked_by:
            newID = revoked_by[technique["techniqueID"]]["attackID"]
            if "tactic" in technique:
                print("\t-", "updating technique", technique["techniqueID"], "(" + technique["tactic"] + ")", "to", newID)
            else: 
                print("\t-", "updating technique", technique["techniqueID"], "to", newID)
            # make sure tactic hasn't changed
            if "tactic" in technique and not technique["tactic"] in revoked_by[technique["techniqueID"]]["tactics"]:
                print("\t   -", "WARNING: replacing technique is no longer in the", technique["tactic"], "tactic, annotations will be skipped")
                continue
            technique["techniqueID"] = newID
    
    # set the version to current
    layer["versions"] = {
        "navigator": "4.0",
        "layer": "4.0",
        "attack": "8"
    }

    # output layer
    outfile = layerfile if replace else layerfile.split(".")[0] + "-updated.json"
    with open(outfile, "w") as f:
        print("\t-", "writing", outfile)
        f.write(json.dumps(layer, indent=2))
        

if __name__ == '__main__':
    # download data depending on domain
    parser = argparse.ArgumentParser(
        description="Updates outdated layer files. Follows revoked-by relationships in the STIX data to update layers with revoked techniques to use the replacing techniques, and updates layers to the latest version of the layer file format."
    )
    parser.add_argument("layers",
        type=str,
        nargs="+",
        help="paths to the layers to update"
    )
    parser.add_argument("--replace",
        action="store_true",
        help="replace the layer files with the updated version. If flag not specified, appends '-updated' to the end of the file name."
    )
    args = parser.parse_args()

    # update the layers
    for layer in args.layers:
        update_layer(layer, args.replace)
