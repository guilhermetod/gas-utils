import { random } from 'faker';

import { coerceToArray_ } from '@helpers/functions/coerce-to-array';
import { compose_ } from '@helpers/functions/compose';

describe('compose', () => {
  it('should build a function that call each one of its arguments', () => {
    const sum = jest.fn((x: number, y: number): number => x + y);
    const double = jest.fn((n: number): number => n * 2);
    const elevateToTen = jest.fn((n: number): number => n ** 10);

    const args: [number, number] = [random.number(), random.number()];
    const composed = compose_(elevateToTen, double, sum);
    const manuallyComposed = (x: number, y: number): number => elevateToTen(double(sum(x, y)));

    const result = composed(...args);

    [sum, double, elevateToTen].reduce((returnValue, fn) => {
      expect(fn).toHaveBeenCalledWith(...coerceToArray_(returnValue));

      return fn.mock.results[0].value;
    }, args);

    expect(result).toEqual(manuallyComposed(...args));
  });
});
