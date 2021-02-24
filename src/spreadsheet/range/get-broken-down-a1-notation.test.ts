import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { A1_NOTATION_COORDINATES, VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { getBrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';
import { getColumnNotation } from '@spreadsheet/range/get-column-notation';
import { createRandomSheetValues } from '@tests/helpers/create-random-sheet-values';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';

jest.mock('@spreadsheet/range/get-column-notation');

describe('getBrokenDownA1Notation', () => {
  let rangeValues: (string | null)[][];
  let range: RangeMock;

  beforeEach(() => {
    rangeValues = createRandomSheetValues();
    range = new RangeMock(rangeValues);

    range.getColumn.mockReturnValue(random.number({ min: 1 }));
    range.getRow.mockReturnValue(random.number({ min: 1 }));
    range.getNumColumns.mockReturnValue(random.number({ min: 1 }));
    range.getNumRows.mockReturnValue(random.number({ min: 1 }));

    mocked(getColumnNotation).mockImplementation(() => random.alpha());
  });

  it('should parse the column numbers to notation', () => {
    const firstColumn = range.getColumn();
    const numOfColumns = range.getNumColumns();
    const lastColumn = firstColumn + numOfColumns - 1;

    const result = getBrokenDownA1Notation(range);

    expect(mocked(getColumnNotation).mock.calls).toEqual([[firstColumn], [lastColumn]]);
    expect(result.firstColumn).toEqual(mocked(getColumnNotation).mock.results[0].value);
    expect(result.lastColumn).toEqual(mocked(getColumnNotation).mock.results[1].value);
  });

  it('should return the first and last rows', () => {
    const firstRow = range.getRow();
    const lastRow = firstRow + range.getNumRows() - 1;

    const result = getBrokenDownA1Notation(range);

    expect(result.firstRow).toEqual(firstRow);
    expect(result.lastRow).toEqual(lastRow);
  });

  it('should return a valid and full notation', () => {
    const result = getBrokenDownA1Notation(range);

    const coordinates = A1_NOTATION_COORDINATES.exec(result.fullNotation)?.slice(0, 5);

    expect(result.fullNotation).toMatch(VALID_A1_NOTATION);
    expect(Array.isArray(coordinates)).toEqual(true);
    (coordinates as string[]).forEach((coordinate) => {
      expect(coordinate).toBeTruthy();
    });
  });
});
