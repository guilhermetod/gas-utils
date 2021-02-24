import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { getColumnByNumber } from '@spreadsheet/range/get-column-by-number';
import { getColumnNotation } from '@spreadsheet/range/get-column-notation';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/range/get-column-notation');

describe('getColumnByNumber', () => {
  let range: RangeMock;
  let sheet: SheetMock;

  let number: number;
  let notation: string;

  beforeEach(() => {
    range = new RangeMock();
    sheet = new SheetMock();
    number = random.number({ min: 1 });
    notation = random.alpha();

    sheet.getRange.mockReturnValue(range);
    mocked(getColumnNotation).mockReturnValue(notation);
  });

  it('should call the sheet to return a range composed of only the column notation', () => {
    const result = getColumnByNumber(sheet, number);

    expect(getColumnNotation).toHaveBeenCalledWith(number);
    expect(sheet.getRange).toHaveBeenCalledWith(`${notation}:${notation}`);
    expect(sheet.getRange).toHaveBeenCalledWith(expect.stringMatching(VALID_A1_NOTATION));
    expect(sheet.getRange).not.toHaveBeenCalledWith(expect.stringMatching(/[^A-z:]/));
    expect(result).toBe(range);
  });
});
