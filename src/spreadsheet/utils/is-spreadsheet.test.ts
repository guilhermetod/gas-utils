import { isSpreadsheet } from '@spreadsheet/utils/is-spreadsheet';

describe('isSpreadsheet', () => {
  const getSheetsObject = { getSheets: (): void => { } };
  const toStringObject = { toString: (): string => 'Spreadsheet' };

  it('should return true if the value has a getSheets function and converts to "Spreadsheet" as string', () => {
    const result = isSpreadsheet({
      ...getSheetsObject,
      ...toStringObject,
    });

    expect(result).toEqual(true);
  });

  it('should return false if the value is null or undefined', () => {
    const resultWithNull = isSpreadsheet(null);
    const resultWithUndefined = isSpreadsheet(undefined);

    expect(resultWithNull).toEqual(false);
    expect(resultWithUndefined).toEqual(false);
  });

  it('should return false if the value only the getSheets function but doesn\'t convert to "Spreadsheet" as string', () => {
    const result = isSpreadsheet(getSheetsObject);

    expect(result).toEqual(false);
  });

  it('should return false if the value converts to "Spreadsheet" as string but doesn\'t have the getSheets function', () => {
    const resultWithObject = isSpreadsheet(toStringObject);
    const resultWithString = isSpreadsheet('Spreadsheet');

    expect(resultWithObject).toEqual(false);
    expect(resultWithString).toEqual(false);
  });

  it('should return false if the value converts to "Spreadsheet" as string and the getSheets property exists but is not a function', () => {
    const result = isSpreadsheet({
      ...toStringObject,
      getSheets: true,
    });

    expect(result).toEqual(false);
  });
});
