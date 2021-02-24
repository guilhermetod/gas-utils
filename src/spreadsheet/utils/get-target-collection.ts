import { DataTarget } from '@spreadsheet/types/data-target';
import { coerceToRange } from '@spreadsheet/utils/coerce-to-range';
import { coerceToSheet } from '@spreadsheet/utils/coerce-to-sheet';

export interface TargetCollection {
  readonly range: GoogleAppsScript.Spreadsheet.Range,
  readonly sheet: GoogleAppsScript.Spreadsheet.Sheet,
}

export const getTargetCollection = (target: DataTarget): TargetCollection => ({
  range: coerceToRange(target),
  sheet: coerceToSheet(target),
});
