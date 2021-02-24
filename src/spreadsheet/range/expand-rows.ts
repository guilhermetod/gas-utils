import { getBrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';

export const expandRows = (range: GoogleAppsScript.Spreadsheet.Range): GoogleAppsScript.Spreadsheet.Range => {
  const { firstColumn, lastColumn } = getBrokenDownA1Notation(range);

  return range.getSheet().getRange(`${firstColumn}:${lastColumn}`);
};
