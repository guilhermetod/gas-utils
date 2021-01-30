import { random } from 'faker';

import { VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { getRowByNumber } from '@spreadsheet/range/get-row-by-number';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

describe('getRowByNumber', () => {
  let range: RangeMock;
  let sheet: SheetMock;

  let number: number;

  beforeEach(() => {
    range = new RangeMock();
    sheet = new SheetMock();
    number = random.number({ min: 1 });

    sheet.getRange.mockReturnValue(range);
  });

  it('should call the sheet to return a range composed of only the column notation', () => {
    const result = getRowByNumber(sheet, number);

    expect(sheet.getRange).toHaveBeenCalledWith(`${number}:${number}`);
    expect(sheet.getRange).toHaveBeenCalledWith(expect.stringMatching(VALID_A1_NOTATION));
    expect(sheet.getRange).not.toHaveBeenCalledWith(expect.stringMatching(/[^0-9:]/));
    expect(result).toBe(range);
  });
});
