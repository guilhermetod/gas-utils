import { sheetHasColumnTitles } from '@spreadsheet/sheet/sheet-has-column-titles';
import { DataTarget } from '@spreadsheet/types/data-target';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';

export const getColumnTitles = (target: DataTarget): string[] | null => {
  const { range, sheet } = getTargetCollection(target);

  return sheetHasColumnTitles(sheet)
    ? sheet.getRange(1, range.getColumn(), sheet.getFrozenRows(), range.getNumColumns())
      .getDisplayValues()
      .slice(-1)
      .flat()
    : null;
};
