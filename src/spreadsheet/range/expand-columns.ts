import { getBrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';

export const expandColumns = (range: GoogleAppsScript.Spreadsheet.Range): GoogleAppsScript.Spreadsheet.Range => {
  const { firstRow, lastRow } = getBrokenDownA1Notation(range);

  return range.getSheet().getRange(`${firstRow}:${lastRow}`);
};
