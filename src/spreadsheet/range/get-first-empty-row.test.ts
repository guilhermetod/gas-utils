import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { getFirstEmptyRow } from '@spreadsheet/range/get-first-empty-row';
import { getRowByNumber } from '@spreadsheet/range/get-row-by-number';
import { getRows } from '@spreadsheet/rows/get-rows';
import { searchRows } from '@spreadsheet/rows/search-rows';
import { Row } from '@spreadsheet/types/row';
import { appendRows } from '@spreadsheet/utils/append-rows';
import { isBlank } from '@spreadsheet/utils/is-blank';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/range/get-row-by-number');
jest.mock('@spreadsheet/rows/get-rows');
jest.mock('@spreadsheet/rows/search-rows');
jest.mock('@spreadsheet/utils/append-rows');

const buildRowsArray = (): Row[] => {
  const $sheet = new SheetMock();

  return buildArray_(5, () => ({ $number: random.number(), $sheet }));
};

describe('getFirstEmptyRow', () => {
  let rows: Row[];

  let getRowByNumberReturn: RangeMock;
  let appendRowsReturn: RangeMock;
  let getRowsReturn: Row[];
  let searchRowsReturn: Row[];

  beforeEach(() => {
    rows = buildRowsArray();

    getRowsReturn = buildRowsArray();
    searchRowsReturn = buildRowsArray();
    getRowByNumberReturn = new RangeMock();
    appendRowsReturn = new RangeMock();

    mocked(getRows).mockReturnValue(getRowsReturn);
    mocked(searchRows).mockReturnValue(searchRowsReturn);
    mocked(getRowByNumber).mockReturnValue(getRowByNumberReturn);
    mocked(appendRows).mockReturnValue(appendRowsReturn);
  });

  it('should get the rows from the target if it is not an array of rows already', () => {
    const range = new RangeMock();

    const result = getFirstEmptyRow(range);

    expect(getRows).toHaveBeenCalledWith(range);
    expect(searchRows).toHaveBeenCalledWith(getRowsReturn, { '*': isBlank });
    expect(getRowByNumber).toHaveBeenCalledWith(searchRowsReturn[0].$sheet, searchRowsReturn[0].$number);
    expect(result).toEqual(getRowByNumberReturn);
  });

  it('should entire row range from the first empty row', () => {
    const result = getFirstEmptyRow(rows);

    expect(getRows).not.toHaveBeenCalled();
    expect(searchRows).toHaveBeenCalledWith(rows, { '*': isBlank });
    expect(getRowByNumber).toHaveBeenCalledWith(searchRowsReturn[0].$sheet, searchRowsReturn[0].$number);
    expect(result).toEqual(getRowByNumberReturn);
  });

  it('should return null if there is no blank row and no force option', () => {
    mocked(searchRows).mockReturnValue([]);

    const result = getFirstEmptyRow(rows, false);

    expect(searchRows).toHaveBeenCalledWith(rows, { '*': isBlank });
    expect(getRowByNumber).not.toHaveBeenCalled();
    expect(result).toEqual(null);
  });

  it('should append one row and return it if there is no blank row but force option', () => {
    mocked(searchRows).mockReturnValue([]);
    const lastRow = rows.slice(-1)[0];

    const result = getFirstEmptyRow(rows, true);

    expect(searchRows).toHaveBeenCalledWith(rows, { '*': isBlank });
    expect(getRowByNumber).toHaveBeenCalledWith(lastRow.$sheet, lastRow.$number);
    expect(result).toEqual(appendRowsReturn);
  });
});
