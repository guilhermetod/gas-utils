import { random } from 'faker';

import { buildArray_ } from '@helpers/functions/build-array';

describe('buildArray', () => {
  let length: number;

  beforeEach(() => {
    length = random.number({ min: 1, max: 100 });
  });

  it('should fill the array with the filler if the filler is not a function', () => {
    const filler = random.number();
    const result = buildArray_(length, filler);

    expect(result.length).toEqual(length);
    result.forEach((item) => expect(item).toEqual(filler));
  });

  it('should fill the array with the callback return if the filler is a function', () => {
    const filler = jest.fn(() => random.word());
    const result = buildArray_(length, filler);

    expect(filler).toHaveBeenCalledTimes(length);
    expect(result.length).toEqual(length);
    expect(result).toEqual(filler.mock.results.map((item) => item.value));
  });

  it('should fill all items with undefined by default', () => {
    const result = buildArray_(length);

    expect(result.length).toEqual(length);
    result.forEach((item) => expect(item).toEqual(undefined));
  });
});
