import { getColumnNotation } from '@spreadsheet/range/get-column-notation';

export const getColumnByNumber = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  number: number,
): GoogleAppsScript.Spreadsheet.Range => {
  const columnNotation = getColumnNotation(number);
  return sheet.getRange(`${columnNotation}:${columnNotation}`);
};
