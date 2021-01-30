import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { appendRows } from '@spreadsheet/utils/append-rows';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';
import { createRandomSheetValues } from '@tests/helpers/create-random-sheet-values';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/utils/get-target-collection');

describe('appendRows', () => {
  let baseRange: RangeMock;
  let sheet: SheetMock;

  let numOfRowsToAdd: number;
  let firstRangeRow: number;
  let returnRange: RangeMock;

  beforeEach(() => {
    baseRange = new RangeMock(createRandomSheetValues());
    sheet = new SheetMock(createRandomSheetValues());

    numOfRowsToAdd = random.number({ min: 1, max: 10 });
    firstRangeRow = random.number({ max: 10 });
    returnRange = new RangeMock();

    sheet.getRange.mockReturnValue(returnRange);
    baseRange.getRow.mockReturnValue(firstRangeRow);
    mocked(getTargetCollection).mockReturnValue({ range: baseRange, sheet });
  });

  it('should insert rows at the end of the range or sheet, fill them with null values and return their corresponding range', () => {
    const nullRows = Array(sheet.getMaxColumns()).fill(null);

    const lastRow = firstRangeRow + baseRange.getNumRows();
    const result = appendRows(baseRange, numOfRowsToAdd);

    expect(sheet.insertRowsAfter).toHaveBeenCalledWith(lastRow, numOfRowsToAdd);
    expect(sheet.getRange).toHaveBeenCalledWith(lastRow + 1, 1, numOfRowsToAdd, sheet.getMaxColumns());
    expect(returnRange.setValues).toHaveBeenCalledWith(Array(numOfRowsToAdd).fill(nullRows));
    expect(result).toEqual(returnRange);
  });
});
