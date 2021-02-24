import { random } from 'faker';

import { getOrCacheValues } from '@spreadsheet/range/get-or-cache-values';
import { createRandomSheetValues } from '@tests/helpers/create-random-sheet-values';
import { CacheServiceMock } from '@tests/mocks/services/cache-service-mock';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

describe('getOrCacheValues', () => {
  let scriptCache: jest.Mocked<GoogleAppsScript.Cache.Cache>;

  let range: RangeMock;
  let sheet: SheetMock;

  let a1Notation: string;
  let values: string[][];
  let sheetID: number;

  let sheetIDAndRangeNotationMatcher: RegExp;

  beforeEach(() => {
    Object.assign(global, {
      CacheService: new CacheServiceMock(),
    });

    scriptCache = CacheService.getScriptCache() as jest.Mocked<GoogleAppsScript.Cache.Cache>;

    values = createRandomSheetValues();

    range = new RangeMock(values);
    sheet = new SheetMock();

    a1Notation = `${random.alpha()}${random.number({ min: 1 })}`;
    sheetID = random.number({ min: 1000, max: 10000 });

    sheetIDAndRangeNotationMatcher = new RegExp(`${sheetID}.*${a1Notation}|${a1Notation}.*${sheetID}`);

    range.getA1Notation.mockReturnValue(a1Notation);
    range.getSheet.mockReturnValue(sheet);
    sheet.getSheetId.mockReturnValue(sheetID);
  });

  it('should parse and return the cached values if it exists', () => {
    scriptCache.get.mockReturnValue(JSON.stringify(values));

    const result = getOrCacheValues(range);

    expect(scriptCache.get).toHaveBeenCalledWith(expect.stringMatching(sheetIDAndRangeNotationMatcher));
    expect(result).toEqual(values);
  });

  it('should store get the range values and cache them if they have not been cached yet', () => {
    scriptCache.get.mockReturnValue(null);
    const storageTime = random.number({ min: 100, max: 5000 });

    const result = getOrCacheValues(range, storageTime);

    expect(range.getValues).toHaveBeenCalledTimes(1);
    expect(scriptCache.put).toHaveBeenCalledWith(
      expect.stringMatching(sheetIDAndRangeNotationMatcher),
      JSON.stringify(values),
      storageTime,
    );
    expect(result).toEqual(values);
  });

  it('should store the values to 2 minutes by default', () => {
    scriptCache.get.mockReturnValue(null);

    getOrCacheValues(range);

    expect(scriptCache.put).toHaveBeenCalledWith(
      expect.stringMatching(''),
      expect.stringMatching(''),
      120,
    );
  });
});
