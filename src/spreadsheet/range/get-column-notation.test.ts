import { random } from 'faker';

import { NUM_OF_LETTERS_IN_ALPHABET_ } from '@helpers/constants/num-of-letters-in-alphabet';
import { getColumnNotation } from '@spreadsheet/range/get-column-notation';
import { EXPECTED_COLUMN_LETTERS_TO_NUMBER } from '@tests/helpers/expected-column-letters-to-numbers';

describe('getColumnNotation', () => {
  it('should return a notation that is corresponding to the column number on a sheet', () => {
    Object.entries(EXPECTED_COLUMN_LETTERS_TO_NUMBER).forEach(([letter, number]) => {
      expect(getColumnNotation(number)).toEqual(letter);
    });
  });

  it('should add an A on the beginning of the notation for every alphabet loop', () => {
    const numOfLoops = random.number({ min: 1, max: 5 });

    Object.entries(EXPECTED_COLUMN_LETTERS_TO_NUMBER).forEach(([letter, number]) => {
      const columnNumber = (numOfLoops * NUM_OF_LETTERS_IN_ALPHABET_) + number;
      const expectedNotation = letter.padStart(numOfLoops + 1, 'A');

      expect(getColumnNotation(columnNumber)).toEqual(expectedNotation);
    });
  });

  it('should throw an error if the column number is less than 1', () => {
    expect(() => getColumnNotation(0)).toThrowError();
    expect(() => getColumnNotation(random.number({ max: -1 }))).toThrowError();
  });
});
