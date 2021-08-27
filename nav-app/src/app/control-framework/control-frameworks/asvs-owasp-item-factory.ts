import { FrameworkItemFactory } from "./interfaces/framework-item-factory";
import { AsvsOwaspItem } from "./asvs-owasp-item";
/**
 * Designed to parse the excel found https://github.com/OWASP/ASVS/raw/master/4.0/OWASP%20Application%20Security%20Verification%20Standard%204.0-en.csv
 */

export class OwaspAsvsFactory implements FrameworkItemFactory {
    private levelCheckRegex = new RegExp(/x/i);

    public parseRow(row: any, rowIndex: number, sheet: any) {
        if (rowIndex === 1) {
            //This should be a header row, lets verify that this looks like a NIST standard framework export
            if (row.values.toString() !== ",Section,Name,Item,Description,L1,L2,L3,CWE,NIST") {
                throw new Error("The file does not have the expected headers, please verify that the file is the owasp asvs framework export. (["
                    + row.values.toString() + "] Expected [,Section,Name,Item,Description,L1,L2,L3,CWE,NIST]");
            }
        }
        else {

            try {
                let mappings: any = {};

                mappings['CWE'] = row.getCell(8).value;
                const colNist = row.getCell(9).value;
                mappings['NIST'] = colNist ? colNist.toString().split('/').map(x => x.trim()).filter(x => x !== null) : null;

                return new AsvsOwaspItem(
                    row.getCell(1).value,
                    row.getCell(2).value,
                    row.getCell(3).value,
                    row.getCell(4).value,
                    this.levelCheckRegex.test(row.getCell(5).value),
                    this.levelCheckRegex.test(row.getCell(6).value),
                    this.levelCheckRegex.test(row.getCell(7).value),
                    mappings);
            }
            catch (error) {

                throw new Error("Error processing row: " + row.values + " Error: " + error.toString());
            }
        }
    }
}
