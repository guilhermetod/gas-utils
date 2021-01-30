import { getBrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';
import { RangeDimension } from '@spreadsheet/types/range-dimension';

export const getAbsoluteA1Notation = (range: GoogleAppsScript.Spreadsheet.Range, dimension: RangeDimension): string => {
  const { firstColumn, firstRow, lastColumn, lastRow } = getBrokenDownA1Notation(range);

  switch (dimension) {
    case 'column':
      return `$${firstColumn}${firstRow}:$${lastColumn}${lastRow}`;
    case 'row':
      return `${firstColumn}$${firstRow}:${lastColumn}$${lastRow}`;
    default:
      return `$${firstColumn}$${firstRow}:$${lastColumn}$${lastRow}`;
  }
};
