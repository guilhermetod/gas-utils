import { random } from 'faker';

import { getFullRange } from '@spreadsheet/sheet/get-full-range';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

describe('getFullRange', () => {
  let sheet: SheetMock;
  let range: RangeMock;

  let numOfRows: number;
  let numOfColumns: number;

  beforeEach(() => {
    sheet = new SheetMock();
    range = new RangeMock();

    numOfRows = random.number({ min: 1 });
    numOfColumns = random.number({ min: 1 });

    sheet.getRange.mockReturnValue(range);
    sheet.getMaxRows.mockReturnValue(numOfRows);
    sheet.getMaxColumns.mockReturnValue(numOfColumns);
  });

  it('should return a range that cover the entire sheet', () => {
    const result = getFullRange(sheet);

    expect(sheet.getRange).toHaveBeenCalledWith(
      1,
      1,
      numOfRows,
      numOfColumns,
    );
    expect(result).toBe(range);
  });
});
