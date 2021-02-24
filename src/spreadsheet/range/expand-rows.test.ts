import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { expandRows } from '@spreadsheet/range/expand-rows';
import { getBrokenDownA1Notation, BrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/range/get-broken-down-a1-notation');

describe('expandRows', () => {
  let firstColumn: string;
  let lastColumn: string;

  let originalRange: RangeMock;
  let returnRange: RangeMock;
  let sheet: SheetMock;

  beforeEach(() => {
    firstColumn = random.alpha();
    lastColumn = random.alpha();

    originalRange = new RangeMock();
    returnRange = new RangeMock();
    sheet = new SheetMock();

    originalRange.getSheet.mockReturnValue(sheet);
    sheet.getRange.mockReturnValue(returnRange);
    mocked(getBrokenDownA1Notation).mockReturnValue({ firstColumn, lastColumn } as BrokenDownA1Notation);
  });

  it('should call the sheet to get a new range with only the columns from the original range', () => {
    const result = expandRows(originalRange);

    expect(sheet.getRange).toHaveBeenCalledWith(`${firstColumn}:${lastColumn}`);
    expect(sheet.getRange).toHaveBeenCalledWith(expect.stringMatching(VALID_A1_NOTATION));
    expect(sheet.getRange).not.toHaveBeenCalledWith(expect.stringMatching(/[^A-z:]/));
    expect(result).toBe(returnRange);
  });
});
