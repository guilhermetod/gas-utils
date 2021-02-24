import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { getArrayOfRowValues } from '@spreadsheet/rows/get-array-of-row-values';
import { trimRows } from '@spreadsheet/rows/trim-rows';
import { isBlank } from '@spreadsheet/utils/is-blank';

jest.mock('@spreadsheet/rows/get-array-of-row-values');
jest.mock('@spreadsheet/utils/is-blank');

describe('trimRows', () => {
  it('should remove the leading and trailing blank rows', () => {
    const rowFillingRange = { min: 1, max: 15 };
    const nonBlankRow = { value: random.words() };
    const blankRow = { value: null };

    mocked(getArrayOfRowValues).mockImplementation((row) => [row.value]);
    mocked(isBlank).mockImplementation((value) => (value as unknown[])[0] === blankRow.value);

    const middleRows = [
      ...Array(random.number(rowFillingRange)).fill(nonBlankRow),
      ...Array(random.number(rowFillingRange)).fill(blankRow),
      ...Array(random.number(rowFillingRange)).fill(nonBlankRow),
    ];

    const rows = [
      ...Array(random.number(rowFillingRange)).fill(blankRow),
      ...middleRows,
      ...Array(random.number(rowFillingRange)).fill(blankRow),
    ];

    const result = trimRows(rows);

    expect(result).toEqual(middleRows);
  });
});
