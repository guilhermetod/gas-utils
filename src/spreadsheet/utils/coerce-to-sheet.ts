import { DataTarget } from '@spreadsheet/types/data-target';
import { isSheet } from '@spreadsheet/utils/is-sheet';

export const coerceToSheet = (target: DataTarget): GoogleAppsScript.Spreadsheet.Sheet => (
  isSheet(target)
    ? target
    : target.getSheet()
);
