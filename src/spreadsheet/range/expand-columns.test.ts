import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { expandColumns } from '@spreadsheet/range/expand-columns';
import { getBrokenDownA1Notation, BrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/range/get-broken-down-a1-notation');

describe('expandColumns', () => {
  let firstRow: number;
  let lastRow: number;

  let originalRange: RangeMock;
  let returnRange: RangeMock;
  let sheet: SheetMock;

  beforeEach(() => {
    firstRow = random.number({ min: 1 });
    lastRow = random.number({ min: 1 });

    originalRange = new RangeMock();
    returnRange = new RangeMock();
    sheet = new SheetMock();

    originalRange.getSheet.mockReturnValue(sheet);
    sheet.getRange.mockReturnValue(returnRange);
    mocked(getBrokenDownA1Notation).mockReturnValue({ firstRow, lastRow } as BrokenDownA1Notation);
  });

  it('should call the sheet to get a new range with only the rows from the original range', () => {
    const result = expandColumns(originalRange);

    expect(sheet.getRange).toHaveBeenCalledWith(`${firstRow}:${lastRow}`);
    expect(sheet.getRange).toHaveBeenCalledWith(expect.stringMatching(VALID_A1_NOTATION));
    expect(sheet.getRange).not.toHaveBeenCalledWith(expect.stringMatching(/[^0-9:]/));
    expect(result).toBe(returnRange);
  });
});
