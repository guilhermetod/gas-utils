import { DataTarget } from '@spreadsheet/types/data-target';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';

export const appendRows = (target: DataTarget, numOfRowsToAdd: number): GoogleAppsScript.Spreadsheet.Range => {
  const { range, sheet } = getTargetCollection(target);

  const lastRow = range.getRow() + range.getNumRows();
  const numOfColumnsInSheet = sheet.getMaxColumns();
  const emptyColumns = Array(numOfColumnsInSheet).fill(null);
  const emptyRows = Array(numOfRowsToAdd).fill(emptyColumns);

  return sheet
    .insertRowsAfter(lastRow, numOfRowsToAdd)
    .getRange(lastRow + 1, 1, numOfRowsToAdd, numOfColumnsInSheet)
    .setValues(emptyRows);
};
