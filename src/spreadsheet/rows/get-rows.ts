import { getColumnNotation } from '@spreadsheet/range/get-column-notation';
import { DataTarget } from '@spreadsheet/types/data-target';
import { Row, RowInfo, RowValues } from '@spreadsheet/types/row';
import { getColumnTitles } from '@spreadsheet/utils/get-column-titles';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';

export const getRows = <T extends RowValues>(target: DataTarget): Row<T>[] => {
  const { range, sheet } = getTargetCollection(target);
  const columnTitles = getColumnTitles(range);
  const numOfFirstRow = range.getRow();
  const numOfFirstColumn = range.getColumn();

  return range
    .getValues()
    .map((row, rowIndex) => row.reduce((acc, cellValue, columnIndex) => {
      const title = columnTitles
        ?.[columnIndex]
        ?? getColumnNotation(numOfFirstColumn + columnIndex);

      return { ...acc, [title]: cellValue };
    }, {
      $sheet: sheet,
      $number: numOfFirstRow + rowIndex,
    } as RowInfo));
};
