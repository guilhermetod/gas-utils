type SpreadsheetSheetWithExclusiveMethods = Omit<GoogleAppsScript.Spreadsheet.Spreadsheet, (
  keyof GoogleAppsScript.Spreadsheet.Range | keyof GoogleAppsScript.Spreadsheet.Sheet
)>;

export const isSpreadsheet = (value: unknown): value is GoogleAppsScript.Spreadsheet.Spreadsheet => (
  typeof (value as SpreadsheetSheetWithExclusiveMethods)?.getSheets === 'function'
  && `${value}` === 'Spreadsheet'
);
