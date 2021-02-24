import { random } from 'faker';

import { isCell } from '@spreadsheet/utils/is-cell';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';

describe('isCell', () => {
  let range: RangeMock;

  beforeEach(() => {
    range = new RangeMock();
  });

  it('should return true if the number of columns and the number of rows are both equal to 1', () => {
    range.getNumRows.mockReturnValue(1);
    range.getNumColumns.mockReturnValue(1);

    const result = isCell(range);

    expect(result).toEqual(true);
  });

  it('should return false if the number of columns is different than one', () => {
    range.getNumRows.mockReturnValue(1);
    range.getNumColumns.mockReturnValue(random.number({ min: 2 }));

    const result = isCell(range);

    expect(result).toEqual(false);
  });

  it('should return false if the number of rows is different than one', () => {
    range.getNumRows.mockReturnValue(random.number({ min: 2 }));
    range.getNumColumns.mockReturnValue(1);

    const result = isCell(range);

    expect(result).toEqual(false);
  });
});
