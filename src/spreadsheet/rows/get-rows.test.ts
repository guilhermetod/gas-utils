import { random, database } from 'faker';
import { mocked } from 'ts-jest/utils';

import { arrayUniques_ } from '@helpers/functions/array-uniques';
import { buildArray_ } from '@helpers/functions/build-array';
import { getColumnNotation } from '@spreadsheet/range/get-column-notation';
import { getRows } from '@spreadsheet/rows/get-rows';
import { RowInfo } from '@spreadsheet/types/row';
import { getColumnTitles } from '@spreadsheet/utils/get-column-titles';
import { getTargetCollection } from '@spreadsheet/utils/get-target-collection';
import { createRandomSheetValues } from '@tests/helpers/create-random-sheet-values';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/range/get-column-notation');
jest.mock('@spreadsheet/utils/get-column-titles');
jest.mock('@spreadsheet/utils/get-target-collection');

describe('getRows', () => {
  let values: (string | null)[][];
  let range: RangeMock;
  let sheet: SheetMock;
  let columnTitles: string[];

  const infoKeys: (keyof RowInfo)[] = ['$number', '$sheet'];

  beforeEach(() => {
    values = createRandomSheetValues();
    range = new RangeMock(values);
    sheet = new SheetMock();
    columnTitles = buildArray_(range.getNumColumns(), () => database.column());

    range.getRow.mockReturnValue(random.number({ min: 1, max: 10 }));
    range.getColumn.mockReturnValue(random.number({ min: 1, max: 10 }));

    mocked(getColumnTitles).mockReturnValue(columnTitles);
    mocked(getTargetCollection).mockReturnValue({ range, sheet });
  });

  it('should return a row for every sub array in the range values', () => {
    const result = getRows(range);

    expect(result.length).toEqual(values.length);
  });

  it('should add the sheet and number to each row', () => {
    const result = getRows(range);
    const firstRow = range.getRow();

    result.forEach((row, index) => {
      expect(row.$sheet).toBe(sheet);
      expect(row.$number).toEqual(firstRow + index);
    });
  });

  it('should assign the corresponding value to a key with its column title', () => {
    const result = getRows(range);

    result.forEach((row, rowIndex) => {
      columnTitles.forEach((columnTitle, columnIndex) => {
        expect(row[columnTitle]).toEqual(values[rowIndex][columnIndex]);
      });
    });
  });

  it('should add the column titles and row info as keys for every row', () => {
    const result = getRows(range);
    const resultKeys = result.flatMap(Object.keys);
    const expectedKeys = [...columnTitles, ...infoKeys];

    expect(arrayUniques_(resultKeys).sort()).toEqual(arrayUniques_(expectedKeys).sort());
  });

  it('should use the column notation if there\'s no column titles', () => {
    mocked(getColumnNotation).mockImplementation(() => database.column());
    mocked(getColumnTitles).mockReturnValue(null);

    const result = getRows(range);
    const columnNotationResults = mocked(getColumnNotation).mock.results.map((notationResult) => notationResult.value);
    const resultKeys = result.flatMap(Object.keys);
    const expectedKeys = [...columnNotationResults, ...infoKeys];

    expect(arrayUniques_(resultKeys).sort()).toEqual(arrayUniques_(expectedKeys).sort());
  });
});
