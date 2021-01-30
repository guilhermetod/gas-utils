import { getRowByNumber } from '@spreadsheet/range/get-row-by-number';
import { getRows } from '@spreadsheet/rows/get-rows';
import { searchRows } from '@spreadsheet/rows/search-rows';
import { DataTarget } from '@spreadsheet/types/data-target';
import { Row } from '@spreadsheet/types/row';
import { appendRows } from '@spreadsheet/utils/append-rows';
import { isBlank } from '@spreadsheet/utils/is-blank';

export function getFirstEmptyRow(target: Row[] | DataTarget, force?: true): GoogleAppsScript.Spreadsheet.Range;
export function getFirstEmptyRow(target: Row[] | DataTarget, force?: false): GoogleAppsScript.Spreadsheet.Range | null;
export function getFirstEmptyRow(target: Row[] | DataTarget, force = true): GoogleAppsScript.Spreadsheet.Range | null {
  const rows = Array.isArray(target) ? target : getRows(target);
  const [firstBlankRow] = searchRows(rows, { '*': isBlank });

  if (firstBlankRow) {
    return getRowByNumber(firstBlankRow.$sheet, firstBlankRow.$number);
  }

  if (!force) {
    return null;
  }

  const lastRow = rows.slice(-1)[0];
  const lastRowRange = getRowByNumber(lastRow.$sheet, lastRow.$number);
  return appendRows(lastRowRange, 1);
}
