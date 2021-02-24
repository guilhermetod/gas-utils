import { random } from 'faker';

import { VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { getColumnNotation } from '@spreadsheet/range/get-column-notation';

describe('VALID_A1_NOTATION', () => {
  let firstColumn: string;
  let firstRow: number;
  let lastColumn: string;
  let lastRow: number;

  beforeEach(() => {
    firstColumn = getColumnNotation(random.number({ min: 1 }));
    firstRow = random.number({ min: 1 });
    lastColumn = getColumnNotation(random.number({ min: 1 }));
    lastRow = random.number({ min: 1 });
  });

  it('should match complete notations', () => {
    const completeNotation = `${firstColumn}${firstRow}:${lastColumn}${lastRow}`;

    expect(completeNotation).toMatch(VALID_A1_NOTATION);
  });

  it('should match A1 notations with any missing coordinates', () => {
    const notationMissingFirstColumn = `${firstRow}:${lastColumn}${lastRow}`;
    const notationMissingFirstRow = `${firstColumn}:${lastColumn}${lastRow}`;
    const notationMissingLastColumn = `${firstColumn}${firstRow}:${lastRow}`;
    const notationMissingLastRow = `${firstColumn}${firstRow}:${lastColumn}`;

    expect(notationMissingFirstColumn).toMatch(VALID_A1_NOTATION);
    expect(notationMissingFirstRow).toMatch(VALID_A1_NOTATION);
    expect(notationMissingLastColumn).toMatch(VALID_A1_NOTATION);
    expect(notationMissingLastRow).toMatch(VALID_A1_NOTATION);
  });

  it('should match unidimensional notations', () => {
    const rowsOnlyNotation = `${firstRow}:${lastRow}`;
    const columnsOnlyNotation = `${firstColumn}:${lastColumn}`;

    expect(rowsOnlyNotation).toMatch(VALID_A1_NOTATION);
    expect(columnsOnlyNotation).toMatch(VALID_A1_NOTATION);
  });

  it('should match single cell notations', () => {
    const singleCell = `${firstColumn}${firstRow}`;

    expect(singleCell).toMatch(VALID_A1_NOTATION);
  });

  it('should match absolute notations', () => {
    const notationWithAbsoluteFirstColumn = `$${firstColumn}${firstRow}:${lastColumn}${lastRow}`;
    const notationWithAbsoluteFirstRow = `${firstColumn}$${firstRow}:${lastColumn}${lastRow}`;
    const notationWithAbsoluteLastColumn = `${firstColumn}${firstRow}:${lastColumn}${lastRow}`;
    const notationWithAbsoluteLastRow = `${firstColumn}${firstRow}:$${lastColumn}$${lastRow}`;
    const fullyAbsoluteNotation = `$${firstColumn}$${firstRow}:$${lastColumn}$${lastRow}`;

    expect(notationWithAbsoluteFirstColumn).toMatch(VALID_A1_NOTATION);
    expect(notationWithAbsoluteFirstRow).toMatch(VALID_A1_NOTATION);
    expect(notationWithAbsoluteLastColumn).toMatch(VALID_A1_NOTATION);
    expect(notationWithAbsoluteLastRow).toMatch(VALID_A1_NOTATION);
    expect(fullyAbsoluteNotation).toMatch(VALID_A1_NOTATION);
  });

  it('should not match if any of the rows is 0', () => {
    const notationWithFirstRowZero = `${firstColumn}${0}:${lastColumn}${lastRow}`;
    const notationWithLastRowZero = `${firstColumn}${firstRow}:${lastColumn}${0}`;
    const notationWithBothRowsZero = `${firstColumn}${0}:${lastColumn}${0}`;
    const notationWithUnidimensionalZero = `${0}:${0}`;

    expect(notationWithFirstRowZero).not.toMatch(VALID_A1_NOTATION);
    expect(notationWithLastRowZero).not.toMatch(VALID_A1_NOTATION);
    expect(notationWithBothRowsZero).not.toMatch(VALID_A1_NOTATION);
    expect(notationWithUnidimensionalZero).not.toMatch(VALID_A1_NOTATION);
  });

  it('should not match a notation with start and end coordinates if there\'s no colon', () => {
    const notationWithoutColon = `${firstColumn}${firstRow}${lastColumn}${lastRow}`;

    expect(notationWithoutColon).not.toMatch(VALID_A1_NOTATION);
  });

  it('should not match a notation that has only one coordinate', () => {
    const onlyOneRowNotation = `${firstRow}`;
    const onlyOneColumnNotation = `${firstColumn}`;

    expect(onlyOneRowNotation).not.toMatch(VALID_A1_NOTATION);
    expect(onlyOneColumnNotation).not.toMatch(VALID_A1_NOTATION);
  });

  it('should not match an empty string', () => {
    expect('').not.toMatch(VALID_A1_NOTATION);
  });

  it('should not match incompatible unidimensional coordinates', () => {
    const notationWithStartRowAndEndColumn = `${firstRow}:${lastColumn}`;
    const notationWithColumnRowAndEndRow = `${firstColumn}:${lastRow}`;

    expect(notationWithStartRowAndEndColumn).not.toMatch(VALID_A1_NOTATION);
    expect(notationWithColumnRowAndEndRow).not.toMatch(VALID_A1_NOTATION);
  });

  it('should not match notations with wrongfully placed absolute modifiers', () => {
    const notationWithTrailingModifierOnStartCoordinates = `${firstColumn}${firstRow}$:${lastColumn}${lastRow}`;
    const notationWithTrailingModifierOnEndCoordinates = `${firstColumn}${firstRow}$:${lastColumn}${lastRow}`;

    expect(notationWithTrailingModifierOnStartCoordinates).not.toMatch(VALID_A1_NOTATION);
    expect(notationWithTrailingModifierOnEndCoordinates).not.toMatch(VALID_A1_NOTATION);
  });
});
