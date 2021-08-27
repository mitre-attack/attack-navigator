import { RichText } from "./rich-text";
import { FrameworkItemFactory } from "./interfaces/framework-item-factory";
import { CisItem } from "./cis-item";
/**
 * Designed to parse the excel CIS-Controls-and-Subcontrols-Mapping-to-NIST
 */

export class CisToNistItemFactory implements FrameworkItemFactory {

    private richTextToPlainString(richTextItem: { richText: Array<RichText>; }) {
        return richTextItem.richText.reduce((a: RichText, b: RichText) => { return { ...a, text: a.text + ' ' + b.text }; }).text;
    }

    private currentCisControl = {};

    public parseRow(row: any, rowIndex: number, sheet: any) {
        if (sheet.name === 'All CIS Controls & Sub-Controls') {
            if (rowIndex === 1) {
                //This should be a header row, lets verify that this looks like a NIST standard framework export
                if (row.values.toString() !== ",,CIS Control,CIS Sub-Control,Asset Type,Security Function,Title,Description,NIST CSF ,Subcategory Name") {
                    throw new Error("The file does not have the expected headers, please verify that the file is the CIS-Controls-and-Subcontrols-Mapping-to-NIST xlsx export. (["
                        + row.values.toString() + "] Expected [,,CIS Control,CIS Sub-Control,Asset Type,Security Function,Title,Description,NIST CSF ,Subcategory Name]");
                }
            }
            else {
                let cisSubControl: string = row.getCell(3).value;

                if (cisSubControl) {
                    let mappings: any = {};

                    mappings['NIST SP 800-53 Rev. 4'] = row.getCell(8).value;

                    return new CisItem(row.getCell(2).value, cisSubControl, row.getCell(4).value, row.getCell(5).value, row.getCell(6).value, row.getCell(7).value, mappings, row.getCell(9).value);
                }
                else {
                    return null;
                }
            }
        }
    }
}
