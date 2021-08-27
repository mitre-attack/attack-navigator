import { ViewModel, ViewModelsService } from '../viewmodels.service';
import { DataService, Technique } from '../data.service';
import * as Excel from 'exceljs/dist/es5/exceljs.browser';
import * as is from 'is_js';
import { ControlFramework } from '../control-framework/control-framework';

export class MappingsExporter {

  constructor(private dataService: DataService, private viewModelsService: ViewModelsService) {

  }

  public getDistinctObjectProps(objects): string[] {
    return [...new Set<string>(objects.map(x => Object.keys(x)).reduce((x, i) => x.concat(i), []))];
  }

  public downloadWorkbook(objects: any[], worksheetName: string, filename: string) {
    let workbook = new Excel.Workbook();

    let worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = this.getDistinctObjectProps(objects).map(header => { return { header: header, key: header }; });

    objects.forEach(x => worksheet.addRow(x))

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: "application/octet-stream" });
      this.saveBlob(blob, filename + '.xlsx');
    });
  }

  public exportToExcel(techniquesToExport: Technique[], viewModel: ViewModel, fileName?: string) {
    let workbook = new Excel.Workbook();
    let controlFramework = new ControlFramework();

    let techniqueWorksheet = workbook.addWorksheet('Technique');
    techniqueWorksheet.columns = ['Technique-Tactic', 'Technique-ID', 'Technique-Name', 'Technique-Description', 'Attack-Mitigations'].map(header => { return { header: header, key: header }; });

    techniquesToExport.forEach((x) => {
      let tech = viewModel.controlFramework.getTechniqueMapping(x, viewModel.domainID);

      let newRow = techniqueWorksheet.addRow({
        'Technique-Tactic': tech.technique.get_all_technique_tactic_ids(),
        'Technique-ID': tech.technique.attackID,
        'Technique-Name': tech.technique.name,
        'Technique-Description': tech.technique.description,
        'Attack-Mitigations': tech.mapping.mitigations ? tech.mapping.mitigations.map(x => x.attackID).join(', ') : ''
      });

      newRow.alignment = { horizontal: 'left', vertical: 'top' };
    });

    let mitigationsByScoreWorksheet = workbook.addWorksheet('Mitigations');
    mitigationsByScoreWorksheet.columns = ['Mitigation-Attack-ID', 'Mitigation-Name', 'Mitigation-Description', 'Mitigation-Score', 'nist'].map(header => { return { header: header, key: header }; });

    const mitigationsWithNistItems = viewModel.scoredMitigations.map(x => ({ scoredMitigation: x, nist: controlFramework.getNistByMitigationId(x.mitigation.attackID) }));

    mitigationsWithNistItems.forEach((x) => {
      let newRow = mitigationsByScoreWorksheet.addRow({
        'Mitigation-Attack-ID': x.scoredMitigation.mitigation.attackID,
        'Mitigation-Name': x.scoredMitigation.mitigation.name,
        'Mitigation-Description': x.scoredMitigation.mitigation.description,
        'Mitigation-Score': x.scoredMitigation.score,
        'nist': x.nist.map(x => x.subcategory.id).join(', ')
      });

      newRow.alignment = { horizontal: 'left', vertical: 'top' };
    });

    var mappingsWorksheet = workbook.addWorksheet('Mappings');

    let distinctNistItems = [...new Set(mitigationsWithNistItems.reduce((x, i) => x.concat(i.nist), []))];
    let nistIds = distinctNistItems.map(x => x.subcategory.id);
    let nistWithMappings = controlFramework.getNistItemsWithMappings().filter(x => nistIds.includes(x.nist.subcategory.id));

    mappingsWorksheet.columns = ['NIST-ID', 'NIST', 'CIS-ID', 'CIS', 'ASVS-ID', 'ASVS', 'L1', 'L2', 'L3', "Security Control Standard Title", "ID", "Description", "securityFunction", "Roles", "Guidance"].map(header => { return { header: header, key: header }; });

    let currentRowTracker = 2;

    nistWithMappings.forEach((x, i) => {
      let maxRows = Math.max(x.cis.length, x.asvs.length, 1);

      for (let index = 0; index < maxRows; index++) {

        let newRow = mappingsWorksheet.addRow({
          'NIST-ID': index === 0 ? x.nist.subcategory.id : '',
          'NIST': index === 0 ? x.nist.subcategory.description : '',
          'CIS-ID': x.cis.length > index ? x.cis[index].cisSubControlId : '',
          'CIS': x.cis.length > index ? x.cis[index].description : '',
          'ASVS-ID': x.asvs.length > index ? x.asvs[index].itemId : '',
          'ASVS': x.asvs.length > index ? x.asvs[index].description : '',
          'L1': x.asvs.length > index ? (x.asvs[index].l1 ? 'x' : '') : '',
          'L2': x.asvs.length > index ? (x.asvs[index].l2 ? 'x' : '') : '',
          'L3': x.asvs.length > index ? (x.asvs[index].l3 ? 'x' : '') : ''
        });

        newRow.alignment = { horizontal: 'left', vertical: 'top' };
      }

      mappingsWorksheet.mergeCells(currentRowTracker, 1, currentRowTracker + maxRows - 1, 1);
      mappingsWorksheet.mergeCells(currentRowTracker, 2, currentRowTracker + maxRows - 1, 2);
      currentRowTracker += maxRows;
    });

    // save file
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: "application/octet-stream" });
      const filename = (fileName || viewModel.name.replace(/ /g, "_")) + ".xlsx";
      this.saveBlob(blob, filename);
    });
  }

  public saveBlob(blob, filename) {
    if (is.ie()) { //internet explorer
      window.navigator.msSaveBlob(blob, filename)
    } else {
      var svgUrl = URL.createObjectURL(blob);
      var downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
}