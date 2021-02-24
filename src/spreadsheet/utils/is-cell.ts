export const isCell = (range: GoogleAppsScript.Spreadsheet.Range): boolean => (
  range.getNumRows() === 1
  && range.getNumColumns() === 1
);
