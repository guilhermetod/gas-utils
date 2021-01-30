import { mocked } from 'ts-jest/utils';

import { getFullRange } from '@spreadsheet/sheet/get-full-range';
import { coerceToRange } from '@spreadsheet/utils/coerce-to-range';
import { isSheet } from '@spreadsheet/utils/is-sheet';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/sheet/get-full-range');
jest.mock('@spreadsheet/utils/is-sheet');

describe('coerceToRange', () => {
  let range: RangeMock;
  let sheet: SheetMock;

  beforeEach(() => {
    range = new RangeMock();
    sheet = new SheetMock();

    mocked(isSheet).mockImplementation((target) => target === sheet);
  });

  it('should return the target itself if it is already a range', () => {
    expect(coerceToRange(range)).toBe(range);
  });

  it('should return the full sheet range if the target is a sheet', () => {
    mocked(getFullRange).mockReturnValue(range);

    const result = coerceToRange(sheet);

    expect(getFullRange).toHaveBeenCalledWith(sheet);
    expect(result).toBe(range);
  });
});
