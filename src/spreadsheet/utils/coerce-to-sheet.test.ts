import { mocked } from 'ts-jest/utils';

import { coerceToSheet } from '@spreadsheet/utils/coerce-to-sheet';
import { isSheet } from '@spreadsheet/utils/is-sheet';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/utils/is-sheet');

describe('coerceToSheet', () => {
  let range: RangeMock;
  let sheet: SheetMock;

  beforeEach(() => {
    range = new RangeMock();
    sheet = new SheetMock();

    mocked(isSheet).mockImplementation((target) => target === sheet);
  });

  it('should return the target itself if it is already a sheet', () => {
    expect(coerceToSheet(sheet)).toBe(sheet);
  });

  it('should return the range\'s sheet if the target is a range', () => {
    range.getSheet.mockReturnValue(sheet);

    const result = coerceToSheet(range);

    expect(range.getSheet).toHaveBeenCalledTimes(1);
    expect(result).toBe(sheet);
  });
});
