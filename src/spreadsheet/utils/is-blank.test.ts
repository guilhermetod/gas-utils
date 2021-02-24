import { random } from 'faker';

import { isBlank } from '@spreadsheet/utils/is-blank';

describe('isBlank', () => {
  const blankItems = [undefined, null, '', ''.padStart(5, ' ')];

  it('should return true if the value is null or undefined', () => {
    expect(isBlank(null)).toEqual(true);
    expect(isBlank(undefined)).toEqual(true);
  });

  it('should return true if the value is a empty string or a string consistent of only white spaces', () => {
    const whiteSpaceFilled = ''.padStart(random.number({ min: 2 }), ' ');

    expect(isBlank('')).toEqual(true);
    expect(isBlank(whiteSpaceFilled)).toEqual(true);
  });

  it('should return false for any boolean', () => {
    expect(isBlank(false)).toEqual(false);
    expect(isBlank(false)).toEqual(false);
  });

  it('should return false for any number', () => {
    expect(isBlank(random.number({ max: -1 }))).toEqual(false);
    expect(isBlank(0)).toEqual(false);
    expect(isBlank(random.number({ min: 1 }))).toEqual(false);
  });

  it('should return false if it finds any non blank object value if the value is an object', () => {
    const firstNonBlankItem = random.word();
    const arrayUntilFirstNonBlankItem = [...blankItems, firstNonBlankItem];
    const blankSurroundedArray = [...arrayUntilFirstNonBlankItem, ...blankItems];
    const objectLiteral = blankSurroundedArray.reduce((acc, value, index) => ({
      ...acc,
      [index]: value,
    }), {});

    const arrayResult = isBlank(blankSurroundedArray);
    const objectLiteralResult = isBlank(objectLiteral);

    expect(arrayResult).toEqual(false);
    expect(objectLiteralResult).toEqual(false);
  });

  it('should return true if every object value is blank when the value is an object', () => {
    const objectLiteral = blankItems.reduce((acc, value, index) => ({
      ...acc,
      [index]: value,
    }), {});

    const arrayResult = isBlank(blankItems);
    const objectLiteralResult = isBlank(objectLiteral);

    expect(arrayResult).toEqual(true);
    expect(objectLiteralResult).toEqual(true);
  });
});
