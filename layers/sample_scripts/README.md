# Sample Scripts

The scripts in this folder are used to generate the example layers in `../data/samples/`. Run the scripts with the -h flag for usage instructions.

## Requirements
- python3

## Installation
- Create a new virtual environment: python3 -m venv env
- Activate the environment: source env/bin/activate
- Install requirements into the virtual environment: pip3 install -r requirements.txt

# Scripts

| script | sample layers | description |
|:-------|:------------|:--------|
| [heatmap.py](heatmap.py) | [../data/samples/heatmap_layer.json](../data/samples/heatmap_layer.json) | Generates a layer wherein all techniques have randomized scores from 1-100. |
| [bear_APT.py](bear_APT.py) | [../data/samples/bear_APT.json](../data/samples/bear_APT.json) | Parses STIX data to create a layer showing all techniques used by an APT group with phrase 'bear' in the group aliases. |
| [apt3_apt29_software.py](apt3_apt29_software.py) | [../data/samples/APT3_+_APT29_with_software.json](../data/samples/APT3_+_APT29_with_software.json), [../data/samples/APT3_+_APT29_with_software_and_notional_no_detection.json](../data/samples/APT3_+_APT29_with_software_and_notional_no_detection.json) | Creates a layer file showing techniques used by APT3 and APT29 as well as software used by those groups, and a second layer showing the same but with the added concept of detectability by a notional organization. |
| [software_execution.py](software_execution.py) | [../data/samples/software_execution.json](../data/samples/software_execution.json), [../data/samples/software_malware_execution.json](../data/samples/software_malware_execution.json), [../data/samples/software_tool_execution.json](../data/samples/software_tool_execution.json) | Generates layers showing all techniques that can be executed by software. |