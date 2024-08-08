import json
import pandas as pd

from collections import defaultdict

# Het pad naar je .xlsx bestand
bestandsnaam = 'MOCKDATASET.xlsx'


def technologyDCgetter(excelFile):
    tab_name = 'MOCKDATASETwithNumbers'

    # Het specifieke tabblad lezen
    df = pd.read_excel(excelFile, sheet_name=tab_name)

    results = {}

    for column in df.columns[4:]:  # Adjust start column
        tech_data = defaultdict(dict)
        for index, row in df.iterrows():
            if row['Sector'] == 'Enterprise':
                cell_value = row[column]
                # Controleer of de cel een getal bevat en niet leeg is
                if pd.notnull(cell_value) and isinstance(cell_value, (int, float)):
                    data_source = str(row['Mitre data source']).strip()
                    data_component = row['Mitre data component'].strip()
                    tech_data[data_source][data_component] = int(cell_value)
                elif pd.isna(cell_value):
                    data_source = str(row['Mitre data source']).strip()
                    data_component = row['Mitre data component'].strip()
                    tech_data[data_source][data_component] = 0
        results[column] = {k: v for k, v in tech_data.items()}

    # Convert results to JSON
    json_data = json.dumps(results, indent=4)
    output_json_path = '../pythonProject/TechnologyDCcoverage_with_percentages.json'
    with open(output_json_path, 'w') as json_file:
        json_file.write(json_data)


def bedrijfTotechnology(excelFile):
    tab_name = 'DSpC'

    df = pd.read_excel(excelFile, sheet_name=tab_name)

    results = {}
    for company in df.columns[1:]:
        if company == 'Total':
            continue

        technologies = [tech.strip() for tech in
                         (df[df[company] == 'X']['Tech'].tolist() or df[df[company] == 'x']['Tech'].tolist())]
        results[company] = technologies

    json_data = json.dumps(results, indent=4)

    output_json_path = '../pythonProject/companyTechnology.json'
    with open(output_json_path, 'w') as json_file:
        json_file.write(json_data)


technologyDCgetter(bestandsnaam)
bedrijfTotechnology(bestandsnaam)