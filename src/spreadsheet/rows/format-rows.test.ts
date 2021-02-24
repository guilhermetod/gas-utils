import { name, random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { formatRows } from '@spreadsheet/rows/format-rows';
import { getRowValues } from '@spreadsheet/rows/get-row-values';
import { RowValues } from '@spreadsheet/types/row';

jest.mock('@spreadsheet/rows/get-row-values');

mocked(getRowValues).mockImplementation((row) => Object.entries(row).reduce((acc, [key, value]) => (
  key.charAt(0) === '$'
    ? acc
    : { ...acc, [key]: value }
), {}));

describe('formatRows', () => {
  let firstNames: string[];
  let rowValues: RowValues<{ firstName: string }>[];

  beforeEach(() => {
    firstNames = buildArray_(random.number({ min: 3, max: 10 }), () => name.firstName().toLowerCase());
    rowValues = firstNames.map((firstName) => ({ firstName }));
  });

  it('should format the row values with the corresponding callback functions', () => {
    const firstNameCallback = jest.fn((firstName) => firstName.toUpperCase());

    const result = formatRows(rowValues, { firstName: firstNameCallback });

    result.forEach((row, index) => {
      expect(row.firstName).toEqual(firstNames[index].toUpperCase());
      expect(firstNameCallback.mock.calls[index]).toEqual([firstNames[index]]);
    });
  });

  it('should return the value itself if there\'s no callback for the given column title', () => {
    const lastNameCallback = jest.fn((firstName) => firstName.toUpperCase());

    const result = formatRows(rowValues as Record<string, unknown>[], { lastName: lastNameCallback });

    expect(lastNameCallback).not.toHaveBeenCalled();
    result.forEach((row, index) => {
      expect(row.firstName).toEqual(firstNames[index]);
    });
  });

  it('should only format the row values and skip the row info keys', () => {
    const $numberCallback = jest.fn((number) => number * 5);
    const rows = rowValues.map((values) => ({ ...values, $number: random.number() }));

    const result = formatRows(rows as Record<string, unknown>[], { $number: $numberCallback });

    expect($numberCallback).not.toHaveBeenCalled();
    result.forEach((row, index) => {
      expect(row.$number).toEqual(rows[index].$number);
    });
  });
});
