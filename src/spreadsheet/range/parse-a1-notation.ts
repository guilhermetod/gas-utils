import { Optional } from '@helpers/types/optional';
import { A1_NOTATION_COORDINATES, VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { parseColumnNotation } from '@spreadsheet/range/parse-column-notation';
import { RangeCoordinates } from '@spreadsheet/types/coordinates';

export function parseA1Notation(a1Notation: string, sheet: GoogleAppsScript.Spreadsheet.Sheet): RangeCoordinates;
export function parseA1Notation(a1Notation: string, sheet?: GoogleAppsScript.Spreadsheet.Sheet): Optional<RangeCoordinates, 'lastColumn' | 'lastRow'>;
export function parseA1Notation(a1Notation: string, sheet?: GoogleAppsScript.Spreadsheet.Sheet): Optional<RangeCoordinates, 'lastColumn' | 'lastRow'> {
  const isValidA1Notation = VALID_A1_NOTATION.test(a1Notation);
  const directions = A1_NOTATION_COORDINATES.exec(a1Notation);

  if (!isValidA1Notation || !directions) {
    throw new Error(`Invalid A1 notation: ${a1Notation}`);
  }

  const isSingleCell = !a1Notation.includes(':');

  const firstColumn = directions[1] ? parseColumnNotation(directions[1]) : 1;
  const firstRow = directions[2] ? parseInt(directions[2], 10) : 1;

  return isSingleCell
    ? {
      firstColumn,
      firstRow,
      lastColumn: firstColumn,
      lastRow: firstRow,
    }
    : {
      firstColumn,
      firstRow,
      lastColumn: directions[3] ? parseColumnNotation(directions[3]) : sheet?.getMaxColumns(),
      lastRow: directions[4] ? parseInt(directions[4], 10) : sheet?.getMaxRows(),
    };
}
