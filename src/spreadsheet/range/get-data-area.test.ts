import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { getDataArea } from '@spreadsheet/range/get-data-area';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/utils/get-target-collection');

describe('getDataArea', () => {
  let sheet: SheetMock;
  let sheetRange: RangeMock;
  let offsetRange: RangeMock;

  beforeEach(() => {
    sheet = new SheetMock();
    sheetRange = new RangeMock();
    offsetRange = new RangeMock();

    sheetRange.getColumn.mockReturnValue(random.number());
    sheetRange.getNumColumns.mockReturnValue(random.number());
    sheetRange.offset.mockReturnValue(offsetRange);
    mocked(getTargetCollection).mockReturnValue({ range: sheetRange, sheet });
  });

  it('should return the range itself if its first row is higher than the last frozen row', () => {
    const lastFrozenRow = random.number({ min: 1 });
    const firstRowInRange = random.number({ min: lastFrozenRow + 1 });

    sheet.getFrozenRows.mockReturnValue(lastFrozenRow);
    sheetRange.getRow.mockReturnValue(firstRowInRange);

    const result = getDataArea(sheet);

    expect(sheetRange.offset).not.toHaveBeenCalled();
    expect(result).toBe(sheetRange);
  });

  it('should offset the range to the first unfrozen row', () => {
    const lastFrozenRow = random.number({ min: 1 });
    const firstRowInRange = random.number({ max: lastFrozenRow });
    const numOfRowsInRange = random.number({ min: lastFrozenRow });

    sheet.getFrozenRows.mockReturnValue(lastFrozenRow);
    sheetRange.getRow.mockReturnValue(firstRowInRange);
    sheetRange.getNumRows.mockReturnValue(numOfRowsInRange);

    const result = getDataArea(sheet);

    expect(sheetRange.offset).toHaveBeenCalledWith(lastFrozenRow - firstRowInRange + 1, 0);
    expect(result).toBe(offsetRange);
  });

  it('should return null if the range is constrained in the frozen range', () => {
    const lastFrozenRow = random.number({ min: 1 });
    const firstRowInRange = random.number({ max: lastFrozenRow - 1 });
    const numOfRowsInRange = random.number({ max: lastFrozenRow - firstRowInRange });

    sheet.getFrozenRows.mockReturnValue(lastFrozenRow);
    sheetRange.getRow.mockReturnValue(firstRowInRange);
    sheetRange.getNumRows.mockReturnValue(numOfRowsInRange);

    const result = getDataArea(sheet);

    expect(result).toEqual(null);
  });
});
