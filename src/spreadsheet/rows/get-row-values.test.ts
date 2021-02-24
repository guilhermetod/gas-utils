import { random } from 'faker';

import { arrayUniques_ } from '@helpers/functions/array-uniques';
import { buildArray_ } from '@helpers/functions/build-array';
import { getRowValues } from '@spreadsheet/rows/get-row-values';

describe('getRowValues', () => {
  it('should remove all the properties that start with "$" from the row object', () => {
    const infoKeys = buildArray_(random.number({ min: 1, max: 5 }), () => `$${random.word()}`);
    const valueKeys = buildArray_(random.number({ min: 1, max: 5 }), () => random.word());

    const row = [...infoKeys, ...valueKeys].reduce((acc, key) => ({
      ...acc,
      [key]: random.word(),
    }), {});

    const result = getRowValues(row);

    expect(Object.keys(result).sort()).toEqual(arrayUniques_(valueKeys).sort());
  });
});
