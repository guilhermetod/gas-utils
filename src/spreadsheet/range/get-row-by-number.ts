export const getRowByNumber = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  number: number,
): GoogleAppsScript.Spreadsheet.Range => (
  sheet.getRange(`${number}:${number}`)
);
