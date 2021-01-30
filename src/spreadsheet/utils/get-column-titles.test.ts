import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { sheetHasColumnTitles } from '@spreadsheet/sheet/sheet-has-column-titles';
import { getColumnTitles } from '@spreadsheet/utils/get-column-titles';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/sheet/sheet-has-column-titles');
jest.mock('@spreadsheet/utils/get-target-collection');

describe('getColumnTitles', () => {
  let range: RangeMock;
  let sheet: SheetMock;

  let numOfColumnsInRange: number;
  let numOfFrozenRows: number;
  let lastFrozenRowValues: string[];

  let frozenRowsValues: unknown[][];

  beforeEach(() => {
    numOfColumnsInRange = random.number({ min: 5, max: 10 });
    numOfFrozenRows = random.number({ min: 1, max: 5 });
    lastFrozenRowValues = buildArray_(numOfColumnsInRange, () => random.word());

    const emptyRow = buildArray_(numOfColumnsInRange);
    frozenRowsValues = [
      ...Array(numOfFrozenRows - 1).fill(emptyRow),
      lastFrozenRowValues,
    ];
    const values = [
      ...frozenRowsValues,
      ...Array(random.number({ max: 20 })).fill(emptyRow),
    ];

    range = new RangeMock(values);
    sheet = new SheetMock(values);

    range.getColumn.mockReturnValue(random.number());
    sheet.getFrozenRows.mockReturnValue(numOfFrozenRows);
    mocked(getTargetCollection).mockReturnValue({ range, sheet });
  });

  it('should return the display values of the last frozen row', () => {
    mocked(sheetHasColumnTitles).mockReturnValue(true);
    sheet.getRange.mockReturnValue(new RangeMock(frozenRowsValues));

    const result = getColumnTitles(sheet);

    expect(sheet.getRange).toHaveBeenCalledWith(1, range.getColumn(), numOfFrozenRows, numOfColumnsInRange);
    expect(result).toEqual(lastFrozenRowValues);
  });

  it('should return null if the sheet has no titles', () => {
    mocked(sheetHasColumnTitles).mockReturnValue(false);

    const result = getColumnTitles(sheet);

    expect(result).toEqual(null);
  });
});
