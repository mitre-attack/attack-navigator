from collections import Counter
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS


@app.route('/api/layers', methods=['GET'])
def list_layers():
  directory_path = os.path.join(app.root_path, '../src/app/layerfiles')  # Pas het pad aan naar jouw bestandslocatie
  try:
    files = [f for f in os.listdir(directory_path) if f.endswith('_layer.json')]
    layer_files = [{'id': file, 'name': file.replace('_layer.json', '')} for file in files]
    return jsonify(layer_files)
  except Exception as e:
    app.logger.error('Fout bij het ophalen van bestanden: %s', str(e))
    app.logger.error(msg=f'')
    return jsonify({'error': 'Unable to scan files!'}), 500


@app.route('/api/layers/<filename>', methods=['GET'])
def get_layer(filename):
  file_path = os.path.join(app.root_path, '../src/app/layerfiles', filename)
  try:
    return send_from_directory(os.path.dirname(file_path), os.path.basename(file_path), as_attachment=True)
  except FileNotFoundError:
    app.logger.error(msg=f'{file_path}')
    return jsonify({'error': 'File not found!'}), 404


def get_tds_data(companyName, sectors, geographies):
  bestandsnaam = os.path.join(app.root_path, '../src/assets/threat-actor-hh.json')
  with open(bestandsnaam, 'r', encoding='utf-8') as file:
    data = json.load(file)

  coverage_path = os.path.join(app.root_path, '../src/assets/coverageDCPerCompany.json')
  with open(coverage_path, 'r', encoding='utf-8') as file:
    coverage_data = json.load(file)

  technologyPath = os.path.join(app.root_path, '../src/assets/TechnologyDCcoverage_with_percentages.json')
  with open(technologyPath, 'r', encoding='utf-8') as file:
    technologyCoverage = json.load(file)

  compTech = os.path.join(app.root_path, '../src/assets/companyTechnology.json')
  with open(compTech, 'r', encoding='utf-8') as file:
    compTechData = json.load(file)

  dsList = []
  for obj in data:
    if any(s in obj["observedSectors"] for s in sectors) and any(
      c in obj["observedCountries"] for c in geographies):
      for dic in obj["attackPatterns"]:
        dataSources = dic['dataSources']
        for ds in dataSources:
          dsList.append(ds)


  value_counts = Counter(dsList)
  sorted_data = {k: v for k, v in sorted(dict(value_counts).items(), key=lambda item: item[1], reverse=True)}
  coverage = coverage_data.get(companyName, {})
  companyTechData = compTechData.get(companyName, {})

  for key, value in sorted_data.items():
    dataSource = key.split(': ')[0]
    dataComp = key.split(': ')[1]
    for c in coverage:
      if dataComp in coverage[c]:
        coveragePerc = coverage[c][dataComp]

    color = 'green' if coveragePerc == 100 else 'orange' if coveragePerc > 0 else 'red'
    # lijst met technologieen die de coverage kunnen verhogen
    techCovers = []
    if coveragePerc < 100:
      for tech, values in technologyCoverage.items():
        for dcDict in values.values():
          if dataComp in dcDict:
            techCovers.append({tech: dcDict[dataComp]})
    else:
      for tech in companyTechData:
        try:
          datasourceDict = technologyCoverage.get(tech, {}).get(dataSource, {})
          if datasourceDict[dataComp] != 0:
            techCovers.append({tech: datasourceDict[dataComp]})

        except:
          continue
    sorted_data[key] = {'count': value, 'color': color, 'technologies': techCovers, 'coveragePerc': coveragePerc}

  return sorted_data


@app.route('/get_tds_data', methods=['POST'])
def handle_request():
  content = request.json
  companyName = content['companyName']
  sectors = content['sectors']
  geographies = content['geographies']
  result = get_tds_data(companyName, sectors, geographies)
  return jsonify(result)


if __name__ == '__main__':
  # list_layers()# Stel de server in om te draaien op port 3001
  #
  app.run(port=3001)
