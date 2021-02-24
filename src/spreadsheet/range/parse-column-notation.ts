import { NUM_OF_LETTERS_IN_ALPHABET_ } from '@helpers/constants/num-of-letters-in-alphabet';

export const parseColumnNotation = (notation: string): number => {
  const notationMatch = /^(A.*)?([A-z])$/i.exec(notation);

  if (!notationMatch) {
    throw new Error(`Invalid column notation: ${notation}`);
  }

  const numOfLoops = notation.length - 1;
  const { 2: lastLetter } = notationMatch;
  const lastLetterNumber = lastLetter.toUpperCase().charCodeAt(0) - 64;

  return (numOfLoops * NUM_OF_LETTERS_IN_ALPHABET_) + lastLetterNumber;
};
