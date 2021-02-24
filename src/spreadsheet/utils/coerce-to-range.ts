import { getFullRange } from '@spreadsheet/sheet/get-full-range';
import { DataTarget } from '@spreadsheet/types/data-target';
import { isSheet } from '@spreadsheet/utils/is-sheet';

export const coerceToRange = (target: DataTarget): GoogleAppsScript.Spreadsheet.Range => (
  isSheet(target)
    ? getFullRange(target)
    : target
);
