import { random } from 'faker';

import { NUM_OF_LETTERS_IN_ALPHABET_ } from '@helpers/constants/num-of-letters-in-alphabet';
import { parseColumnNotation } from '@spreadsheet/range/parse-column-notation';
import { EXPECTED_COLUMN_LETTERS_TO_NUMBER } from '@tests/helpers/expected-column-letters-to-numbers';

describe('parseColumnNotation', () => {
  it('should return a number that is corresponding to the column letter on a sheet', () => {
    Object.entries(EXPECTED_COLUMN_LETTERS_TO_NUMBER).forEach(([letter, number]) => {
      expect(parseColumnNotation(letter)).toEqual(number);
    });
  });

  it('should correctly increase the number for every alphabet loop', () => {
    const numOfLoops = random.number({ min: 1, max: 5 });

    Object.entries(EXPECTED_COLUMN_LETTERS_TO_NUMBER).forEach(([letter, number]) => {
      const notation = letter.padStart(numOfLoops + 1, 'A');
      const columnNumber = (numOfLoops * NUM_OF_LETTERS_IN_ALPHABET_) + number;

      expect(parseColumnNotation(notation)).toEqual(columnNumber);
    });
  });

  it('should throw an error if an invalid notation is passed', () => {
    expect(() => parseColumnNotation('5')).toThrowError();
  });
});
