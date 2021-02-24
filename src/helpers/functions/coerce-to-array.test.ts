import { random } from 'faker';

import { coerceToArray_ } from '@helpers/functions/coerce-to-array';

describe('coerceToArray', () => {
  const values = [random.word(), random.number(), random.boolean(), {}];

  it('should return an array containing the input value if it\'s not already an array', () => {
    values.forEach((value) => {
      const result = coerceToArray_(value);

      expect(result).toEqual([value]);
    });
  });

  it('should return the value itself is it\'s already an array', () => {
    const result = coerceToArray_(values);

    expect(result).toBe(values);
  });
});
