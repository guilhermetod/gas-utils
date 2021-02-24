import { mocked } from 'ts-jest/utils';

import { coerceToRange } from '@spreadsheet/utils/coerce-to-range';
import { coerceToSheet } from '@spreadsheet/utils/coerce-to-sheet';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/utils/coerce-to-range');
jest.mock('@spreadsheet/utils/coerce-to-sheet');

describe('getTargetCollection', () => {
  let range: RangeMock;
  let sheet: SheetMock;

  beforeEach(() => {
    range = new RangeMock();
    sheet = new SheetMock();

    mocked(coerceToRange).mockReturnValue(range);
    mocked(coerceToSheet).mockReturnValue(sheet);
  });

  it('should coerce the target to sheet and to range and return and object with both results', () => {
    const resultWithRange = getTargetCollection(range);
    const resultWithSheet = getTargetCollection(sheet);

    expect(mocked(coerceToRange).mock.calls).toEqual([[range], [sheet]]);
    expect(mocked(coerceToSheet).mock.calls).toEqual([[range], [sheet]]);

    expect(resultWithRange.range).toBe(range);
    expect(resultWithSheet.range).toBe(range);
    expect(resultWithRange.sheet).toBe(sheet);
    expect(resultWithSheet.sheet).toBe(sheet);
  });
});
