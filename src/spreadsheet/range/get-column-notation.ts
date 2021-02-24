import { NUM_OF_LETTERS_IN_ALPHABET_ } from '@helpers/constants/num-of-letters-in-alphabet';

export const getColumnNotation = (columnNumber: number): string => {
  if (columnNumber <= 0) {
    throw new Error('Column number must be equal or greater than 1');
  }

  const columnIndex = columnNumber - 1;
  const numOfOverlaps = Math.floor(columnIndex / NUM_OF_LETTERS_IN_ALPHABET_);
  const lastLetterIndex = columnIndex % NUM_OF_LETTERS_IN_ALPHABET_;

  return `${'A'.repeat(numOfOverlaps)}${String.fromCharCode(lastLetterIndex + 65)}`;
};
