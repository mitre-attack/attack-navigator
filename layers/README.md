# ATT&CK Navigator Layers

A layer constitutes a set of annotations on the ATT&CK matrix for a specific technology domain. Layers can also store a default configuration of the view such as sorting, visible platforms, and more. The ATT&CK Navigator includes functionalities for exporting annotations into layer files, as well as the ability to import layer files for viewing.

See the [layer format specification](LAYERFORMATv3.md) for more information about Layer files.

This folder also contains sample layers (in the [data/samples](data/samples) folder), layers showing changes to the ATT&CK knowledge base (in the [data/update_layers](data/update_layers) folder), and a script demonstrating the programmatic generation of layers from csv (in the [attack_layers](attack_layers) folder).

*Also, feel free to come up with your own ideas for layer file generation, and contribute them to the community by making a pull request to the ATT&CK Navigator!*

## update-layers.py

The sub-techniques update of ATT&CK caused many techniques to be replaced by sub-techniques. Since the replacing sub-techniques have different IDs, many layers created before the sub-technques release will still be using IDs for the replaced techniques and therefore won't work properly in the new version even if the annotation format is correct. [update-layers.py](update-layers.py) is a conversion script which both updates layers to the most recent format and also updates technique IDs that of their replacers where possible. There are however a few cases which won't be caught:
1. Cases where techniques which have been replaced by multiple sub-techniques are ignored entirely due to limitations in the remapping data.
2. Cases where the `tactic` field was present but the replacing technique is not in that tactic.
Run `python3 update-layers.py -h` for usage instructions.