export const getSheetById = (
  id: number,
  spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
): GoogleAppsScript.Spreadsheet.Sheet | null => spreadsheet
  .getSheets()
  .find((sheet) => sheet.getSheetId() === id)
  ?? null;
