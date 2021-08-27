
export interface FrameworkItemFactory {
    /**
    * Converts a row into a framework item related to the specific instance of factory
    * Note: this function is responsible for handling rows from different sources
    * @param row: any - this will be a 1 based array (I know but exceljs does everything as 1 based) of columns
    * @param rowIndex : number - 1 based row index
    * @param sheet: this is the exceljs sheet that the row lives within allowing the factory to understand where in the workbook the row is.
    */
    parseRow(row: any, rowIndex: number, sheet: any): any;
}
