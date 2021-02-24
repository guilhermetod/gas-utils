import { DataTarget } from '@spreadsheet/types/data-target';
import { coerceToRange } from '@spreadsheet/utils/coerce-to-range';
import { getColumnTitles } from '@spreadsheet/utils/get-column-titles';

export const getColumnNumber = (target: DataTarget, searchTitle: string): number | null => {
  const range = coerceToRange(target);
  const columnIndex = getColumnTitles(range)?.findIndex((columnTitle) => columnTitle === searchTitle) ?? -1;

  return columnIndex > -1
    ? columnIndex + range.getColumn()
    : null;
};
