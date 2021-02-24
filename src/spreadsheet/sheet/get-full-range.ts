export const getFullRange = (sheet: GoogleAppsScript.Spreadsheet.Sheet): GoogleAppsScript.Spreadsheet.Range => (
  sheet.getRange(
    1,
    1,
    sheet.getMaxRows(),
    sheet.getMaxColumns(),
  )
);
