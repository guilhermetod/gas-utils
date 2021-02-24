import { DataTarget } from '@spreadsheet/types/data-target';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';

export const getDataArea = (target: DataTarget): GoogleAppsScript.Spreadsheet.Range | null => {
  const { range, sheet } = getTargetCollection(target);

  const lastFrozenRow = sheet.getFrozenRows();
  const firstRowInRange = range.getRow();

  if (firstRowInRange > lastFrozenRow) {
    return range;
  }

  const firstDataRow = lastFrozenRow + 1;
  const lastRowInRange = firstRowInRange + range.getNumRows();

  return lastRowInRange >= firstDataRow
    ? range.offset(firstDataRow - firstRowInRange, 0)
    : null;
};
