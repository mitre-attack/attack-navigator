import { RichText } from "./rich-text";
import { FrameworkItemFactory } from "./interfaces/framework-item-factory";
import { NistItem } from "./nist-item";
// string.match(new RegExp("([A-Z]){2}.([A-Z]){2}-([0-9]){1,3}",'g'))
// Extract all NIST IDs from a string
/**
 * Designed to parse the excel found https://www.nist.gov/cyberframework/framework
 */
export class NistItemFactory implements FrameworkItemFactory {
    // Selects all characters from the start of the string to the first non-whitespace character. Created to 
    // handle "·       CIS CSC" in the Nist informative references column
    private startOfLineToStandardChar: RegExp = new RegExp(/^(\S\s*)(?![\S])./, "gm");
    // gets sets of more than 1 whitespace to help tidy up the strings to single space separation
    private whitespaceBlocks: RegExp = new RegExp(/(\s){2,20}/, "gm");

    private matchMappedFramework = new RegExp('(CIS CSC)|(COBIT 5)|(ISA 62443-2-1:2009)|(ISA 62443-3-3:2013)|(ISO/IEC 27001:2013)|(NIST SP 800-53 Rev. 4)', 'g');

    private richTextToPlainString(richTextItem: { richText: Array<RichText>; }) {
        return richTextItem.richText.reduce((a: RichText, b: RichText) => { return { ...a, text: a.text + ' ' + b.text }; }).text;
    }

    public parseRow(row: any, rowIndex: number, sheet: any) {
        if (rowIndex === 1) {
            //This should be a header row, lets verify that this looks like a NIST standard framework export
            if (row.values.toString() !== ",Function,Category,Subcategory,Informative References") {
                throw new Error("The file does not have the expected headers, please verify that the file is the NIST framework core xlsx export. (["
                    + row.values.toString() + "] Expected [,Function,Category,Subcategory,Informative References]");
            }
        }
        else {
            let categoryRawSplit = this.richTextToPlainString(row.getCell(2).value).split(':');
            let subcategoryRawSplit = this.richTextToPlainString(row.getCell(3).value).split(':');
            let mappingRawValue = this.richTextToPlainString(row.getCell(4).value);
            //search for the mapped frameworks
            let cleanMappingValue = mappingRawValue.replace(this.startOfLineToStandardChar, '').replace(this.whitespaceBlocks, ' ');
            let nValueOfFrameworkName: RegExpMatchArray = cleanMappingValue.match(this.matchMappedFramework);
            let mappingKey = nValueOfFrameworkName.length > 0 ? nValueOfFrameworkName[0] : 'Unknown';
            let mappingValues = mappingKey !== 'Unknown' ? cleanMappingValue.slice(cleanMappingValue.lastIndexOf(mappingKey) + mappingKey.length, cleanMappingValue.length).split(',').map(x => x.trim()) : '';

            let category: { id: string; description: string; } = { id: categoryRawSplit[0].trim(), description: categoryRawSplit[1].trim() };
            let subcategory: { id: string; description: string; } = { id: subcategoryRawSplit[0].trim(), description: subcategoryRawSplit[1].trim() };
            let mappings: any = {};

            mappings[nValueOfFrameworkName[0]] = mappingValues;

            return new NistItem(row.getCell(1).value, category, subcategory, mappings);
        }
    }
}
