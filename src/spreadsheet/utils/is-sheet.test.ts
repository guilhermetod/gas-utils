import { isSheet } from '@spreadsheet/utils/is-sheet';

describe('isSheet', () => {
  const setTabColorObject = { setTabColor: (): void => { } };
  const toStringObject = { toString: (): string => 'Sheet' };

  it('should return true if the value has a setTabColor function and converts to "Sheet" as string', () => {
    const result = isSheet({
      ...setTabColorObject,
      ...toStringObject,
    });

    expect(result).toEqual(true);
  });

  it('should return false if the value is null or undefined', () => {
    const resultWithNull = isSheet(null);
    const resultWithUndefined = isSheet(undefined);

    expect(resultWithNull).toEqual(false);
    expect(resultWithUndefined).toEqual(false);
  });

  it('should return false if the value only the setTabColor function but doesn\'t convert to "Sheet" as string', () => {
    const result = isSheet(setTabColorObject);

    expect(result).toEqual(false);
  });

  it('should return false if the value converts to "Sheet" as string but doesn\'t have the setTabColor function', () => {
    const resultWithObject = isSheet(toStringObject);
    const resultWithString = isSheet('Sheet');

    expect(resultWithObject).toEqual(false);
    expect(resultWithString).toEqual(false);
  });

  it('should return false if the value converts to "Sheet" as string and the setTabColor property exists but is not a function', () => {
    const result = isSheet({
      ...toStringObject,
      setTabColor: true,
    });

    expect(result).toEqual(false);
  });
});
