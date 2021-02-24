import { random } from 'faker';

import { arrayUniques_ } from '@helpers/functions/array-uniques';
import { buildArray_ } from '@helpers/functions/build-array';

describe('arrayUniques', () => {
  it('should remove duplicate items from the array', () => {
    const uniqueNumbers = buildArray_(10, (_, index) => index);
    const duplicateNumbers = uniqueNumbers.reduce<number[]>((acc, number) => ([
      ...acc,
      ...buildArray_(random.number({ min: 3, max: 10 }), number),
    ]), []);

    const result = arrayUniques_(duplicateNumbers);

    expect(result).toEqual(uniqueNumbers);
  });
});
