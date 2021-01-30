import { getColumnNotation } from '@spreadsheet/range/get-column-notation';

export interface BrokenDownA1Notation {
  readonly fullNotation: string,
  readonly firstColumn: string,
  readonly firstRow: number,
  readonly lastColumn: string,
  readonly lastRow: number,
}

export const getBrokenDownA1Notation = (range: GoogleAppsScript.Spreadsheet.Range): BrokenDownA1Notation => {
  const numOfFirstColumn = range.getColumn();

  const firstColumn = getColumnNotation(numOfFirstColumn);
  const firstRow = range.getRow();
  const lastColumn = getColumnNotation(numOfFirstColumn + range.getNumColumns() - 1);
  const lastRow = firstRow + range.getNumRows() - 1;

  return {
    fullNotation: `${firstColumn}${firstRow}:${lastColumn}${lastRow}`,
    firstColumn,
    firstRow,
    lastColumn,
    lastRow,
  };
};
