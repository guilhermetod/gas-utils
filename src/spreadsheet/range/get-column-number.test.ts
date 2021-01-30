import { database, random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { arrayUniques_ } from '@helpers/functions/array-uniques';
import { buildArray_ } from '@helpers/functions/build-array';
import { getColumnNumber } from '@spreadsheet/range/get-column-number';
import { coerceToRange } from '@spreadsheet/utils/coerce-to-range';
import { getColumnTitles } from '@spreadsheet/utils/get-column-titles';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';

jest.mock('@spreadsheet/utils/coerce-to-range');
jest.mock('@spreadsheet/utils/get-column-titles');

describe('getColumnNumber', () => {
  let range: RangeMock;
  let rangeColumn: number;

  beforeEach(() => {
    range = new RangeMock();
    rangeColumn = random.number({ min: 1, max: 10 });

    range.getColumn.mockReturnValue(rangeColumn);
    mocked(coerceToRange).mockReturnValue(range);
  });

  it('should return the number of the column with the wanted', () => {
    const columnTitles = arrayUniques_(buildArray_(10, () => database.column()));

    mocked(getColumnTitles).mockReturnValue(columnTitles);

    columnTitles.forEach((columnTitle, index) => {
      const result = getColumnNumber(range, columnTitle);
      expect(result).toEqual(rangeColumn + index);
    });
  });

  it('should return null if there are no columns at all', () => {
    const columnTitle = database.column();

    mocked(getColumnTitles).mockReturnValue(null);

    const result = getColumnNumber(range, columnTitle);

    expect(result).toEqual(null);
  });

  it('should return null if there are columns but none of them have the wanted title', () => {
    const columnTitle = database.column();

    mocked(getColumnTitles).mockReturnValue([columnTitle.toUpperCase()]);

    const result = getColumnNumber(range, columnTitle.toLowerCase());

    expect(result).toEqual(null);
  });
});
