import json

from collections import Counter

# Pad naar je JSON-bestand
bestandsnaam = 'Data/threat-actor-hh.json'


# Lees de JSON-data
def get_tds_data(companyName, sectors, geographies):
  bestandsnaam = 'nav-app/src/assets/threat-actor-hh.json'
  with open(bestandsnaam, 'r', encoding='utf-8') as file:
    data = json.load(file)

  coverage_path = 'nav-app/src/assets/coverageDCPerCompany.json'
  with open(coverage_path, 'r', encoding='utf-8') as file:
    coverage_data = json.load(file)

  technologyPath = 'nav-app/src/assets/TechnologyDCcoverage_with_percentages.json'
  with open(technologyPath, 'r', encoding='utf-8') as file:
    technologyCoverage = json.load(file)

  dsList = []
  for obj in data:
    if any(s in obj["observedSectors"] for s in sectors) and any(
      c in obj["observedCountries"] for c in geographies):
      for dic in obj["attackPatterns"]:
        dataSources = (dic['dataSources'])
        for ds in dataSources:
          dsList.append(ds.split(': ')[1])
  value_counts = Counter(dsList)

  sorted_data = {k: v for k, v in sorted(dict(value_counts).items(), key=lambda item: item[1], reverse=True)}

  coverage = coverage_data.get(companyName, {})

  for key, value in sorted_data.items():
    for c in coverage:
      if key in coverage[c]:
        coveragePerc = coverage[c][key]

    color = 'green' if coveragePerc == 100 else 'orange' if coveragePerc > 0 else 'red'
    #lijst met technologieen die de coverage kunnen verhogen
    techCovers = []
    if coveragePerc < 100:
      for tech, values in technologyCoverage.items():
        for dcDict in values.values():
          if key in dcDict:
            techCovers.append(tech)

    sorted_data[key] = {'count': value, 'color': color, 'technologies': techCovers}

  return sorted_data