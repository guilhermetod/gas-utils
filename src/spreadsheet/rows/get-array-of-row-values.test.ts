import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { getArrayOfRowValues } from '@spreadsheet/rows/get-array-of-row-values';
import { getRowValues } from '@spreadsheet/rows/get-row-values';
import { RowValues } from '@spreadsheet/types/row';

jest.mock('@spreadsheet/rows/get-row-values');

describe('getArrayOfRowValues', () => {
  it('should build and array from the row values', () => {
    const rowValues = buildArray_(random.number({ max: 10 })).reduce<RowValues>((acc) => ({
      ...acc,
      [random.word()]: random.word(),
    }), {});

    const row = { ...rowValues, $number: random.number({ min: 1 }) };

    mocked(getRowValues).mockReturnValue(rowValues);

    const result = getArrayOfRowValues(row);

    expect(getRowValues).toHaveBeenCalledWith(row);
    expect(result).toEqual(Object.values(rowValues));
  });
});
