import { isRange } from '@spreadsheet/utils/is-range';

describe('isRange', () => {
  const setValuesObject = { setValues: (): void => { } };
  const toStringObject = { toString: (): string => 'Range' };

  it('should return true if the value has a setValues function and converts to "Range" as string', () => {
    const result = isRange({
      ...setValuesObject,
      ...toStringObject,
    });

    expect(result).toEqual(true);
  });

  it('should return false if the value is null or undefined', () => {
    const resultWithNull = isRange(null);
    const resultWithUndefined = isRange(undefined);

    expect(resultWithNull).toEqual(false);
    expect(resultWithUndefined).toEqual(false);
  });

  it('should return false if the value only the setValues function but doesn\'t convert to "Range" as string', () => {
    const result = isRange(setValuesObject);

    expect(result).toEqual(false);
  });

  it('should return false if the value converts to "Range" as string but doesn\'t have the setValues function', () => {
    const resultWithObject = isRange(toStringObject);
    const resultWithString = isRange('Range');

    expect(resultWithObject).toEqual(false);
    expect(resultWithString).toEqual(false);
  });

  it('should return false if the value converts to "Range" as string and the setValues property exists but is not a function', () => {
    const result = isRange({
      ...toStringObject,
      setValues: true,
    });

    expect(result).toEqual(false);
  });
});
