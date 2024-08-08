import pandas as pd
import json
import yaml
import mitreattack.attackToExcel.attackToExcel as attackToExcel
import mitreattack.attackToExcel.stixToDf as stixToDf
from collections import defaultdict


def technologyDCgetter(excelFile):
    tab_name = 'Data comp Percentages (main)'
    df = pd.read_excel(excelFile, sheet_name=tab_name)
    results = {}

    for column in df.columns[4:]:  # Adjust start column
        tech_data = defaultdict(dict)
        for index, row in df.iterrows():
            if row['Sector'] != 'Enterprise':
                continue
            else:
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
        output_json_path = 'nav-app/src/assets/TechnologyDCcoverage_with_percentages.json'
        with open(output_json_path, 'w') as json_file:
            json_file.write(json_data)

    return results




def bedrijfTotechnology(excelFile):
    tab_name = 'Companies & Technologies'
    df = pd.read_excel(excelFile, sheet_name=tab_name)
    results = {}
    for company in df.columns[1:]:
        if company == 'Total':
            continue
        technologies = [tech.strip() for tech in
                         (df[df[company] == 'X']['Technology'].tolist() or df[df[company] == 'x']['Technology'].tolist())]
        results[company] = technologies
    json_data = json.dumps(results, indent=4)

    output_json_path = 'nav-app/src/assets/companyTechnology.json'
    with open(output_json_path, 'w') as json_file:
        json_file.write(json_data)
    return results


def calculate_coverage(tech_coverage, tech_list):
    # Verzamel alle data components en hun dekking door technologieën
    coverage_dict = {}
    component_coverage_dict = {}
    for tech in tech_list:
        for key, value in tech_coverage.items():
            if key.startswith(tech) or tech in key:
                for data_category, components in value.items():
                    if data_category not in component_coverage_dict:
                        component_coverage_dict[data_category] = {}

                    for component, percent in components.items():
                        if component not in component_coverage_dict[data_category]:
                            component_coverage_dict[data_category][component] = []
                        component_coverage_dict[data_category][component].append(percent)

                        if component not in coverage_dict:
                            coverage_dict[component] = []
                        coverage_dict[component].append(percent)

    optimal_coverage = {}
    flat_optimal_coverage = {}
    for category, components in component_coverage_dict.items():
        if category not in optimal_coverage:
            optimal_coverage[category] = {}
        for component, percentages in components.items():
            summed_percentage = min(100.0, sum(percentages))
            optimal_coverage[category][component] = summed_percentage
            # Bereken ook de platte dekking
            flat_summed_percentage = min(100.0, sum(coverage_dict[component]))
            flat_optimal_coverage[component] = flat_summed_percentage

    return flat_optimal_coverage, optimal_coverage


def is_techniek_gedekt(data_sources, coverage):
    total = 0
    covered = 0
    for source in data_sources.split(", "):
        ds_name = source.split(":")[1].strip()
        if ds_name in coverage:
            covered += coverage[ds_name]
            total += 1
    if total > 0:
        return covered / total  # Return the average coverage percentage
    return 0


def read_json(fileName):
    with open(fileName, 'r') as file:
        jsonData = json.load(file)
    return jsonData


def read_yaml(file_path):
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
    company_info = {}
    for entry in data:
        key, value = next(iter(entry.items()))
        company_info[key] = value
    return company_info


def normalize_name(name):
    return name.replace(" ", '').lower()


def main():

    bestandsnaam = 'nav-app/src/assets/DATASOURCECOVERAGE.xlsx'
    company_tech = bedrijfTotechnology(bestandsnaam)
    technologie_coverage = technologyDCgetter(bestandsnaam)

    attackdata = attackToExcel.get_stix_data("enterprise-attack")
    techniques_data = stixToDf.techniquesToDf(attackdata, "enterprise-attack")
    techniques_df = techniques_data["techniques"][['ID', 'tactics', 'data sources']]

    customer_yaml_data = read_yaml("nav-app/src/assets/customers.yaml")

    layer_template = read_json('nav-app/src/assets/layer.json')





    bedrijven_data = {}
    bedrijven_data_per_ds = {}
    for company, technologies in company_tech.items():
        coverage, coverage_per_ds = calculate_coverage(technologie_coverage, technologies)
        bedrijven_data_per_ds[company] = coverage_per_ds
        bedrijven_data[company] = coverage

        with open(f"nav-app/src/assets/coverageDCPerCompany.json", 'w') as f:
            json.dump(bedrijven_data_per_ds, f, indent=4)

    for bedrijf, coverage in bedrijven_data.items():
        layer = layer_template.copy()
        for comp in customer_yaml_data:
            if normalize_name(customer_yaml_data[comp]['name']) == normalize_name(bedrijf):
                layer['name'] = comp
                layer['companyDict'] = {'companyName': bedrijf,
                                        'sectors': customer_yaml_data[comp]['sectors'],
                                        'geographies': customer_yaml_data[comp]['geographies']}

        layer['techniques'] = [
            {
                "techniqueID": row["ID"],
                "tactic": tactic.strip().lower().replace(" ", "-"),
                "score": int(is_techniek_gedekt(row["data sources"], coverage)) if not pd.isna(
                    row['data sources']) else None,
                "color": "" if not pd.isna(row['data sources']) else "#3182bd",  # No color code
                "comment": "",
                "enabled": True,
                "metadata": [],
                "links": [],
                "showSubtechniques": False
            }
            for _, row in techniques_df.iterrows()
            for tactic in row["tactics"].split(",")
        ]
        with open(f"../attack-navigator/nav-app/src/app/layerfiles/{layer['name']}_layer.json", 'w') as f:
            json.dump(layer, f, indent=4)



if __name__ == "__main__":
    main()
