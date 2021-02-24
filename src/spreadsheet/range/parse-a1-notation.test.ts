import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { A1_NOTATION_COORDINATES, VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { parseA1Notation } from '@spreadsheet/range/parse-a1-notation';
import { parseColumnNotation } from '@spreadsheet/range/parse-column-notation';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

jest.mock('@spreadsheet/range/parse-column-notation');

describe('parseA1Notation', () => {
  let firstColumnNotation: string;
  let firstRow: number;
  let lastColumnNotation: string;
  let lastRow: number;

  beforeEach(() => {
    firstColumnNotation = random.alpha();
    firstRow = random.number();
    lastColumnNotation = random.alpha();
    lastRow = random.number();

    mocked(parseColumnNotation).mockImplementation(() => random.number());
    jest.spyOn(VALID_A1_NOTATION, 'test').mockReturnValue(true);
  });

  describe('failing cases', () => {
    it('should throw an error if the A1 Notation is invalid', () => {
      const notation = random.alpha();

      mocked(VALID_A1_NOTATION.test).mockReturnValue(false);

      expect(() => parseA1Notation(notation)).toThrow();

      expect(VALID_A1_NOTATION.test).toHaveBeenCalledWith(notation);
    });

    it('should throw an error if it can not match the coordinates', () => {
      const notation = '';

      jest.spyOn(A1_NOTATION_COORDINATES, 'exec').mockReturnValueOnce(null);

      expect(() => parseA1Notation(notation)).toThrow();

      expect(VALID_A1_NOTATION.test).toHaveBeenCalledWith(notation);
      expect(A1_NOTATION_COORDINATES.exec).toHaveBeenCalledWith(notation);
    });
  });

  describe('basic cases', () => {
    it('should return the same coordinates for start and end when the notations is a single cell', () => {
      const notation = `${firstColumnNotation}${firstRow}`;

      const result = parseA1Notation(notation);

      expect(parseColumnNotation).toHaveBeenCalledTimes(1);
      expect(parseColumnNotation).toHaveBeenCalledWith(firstColumnNotation);
      expect(result.firstColumn).toEqual(mocked(parseColumnNotation).mock.results[0].value);
      expect(result.firstRow).toEqual(firstRow);
      expect(result.lastColumn).toEqual(result.firstColumn);
      expect(result.lastRow).toEqual(result.firstRow);
    });

    it('should return every coordinate from the notation when it is complete', () => {
      const notation = `${firstColumnNotation}${firstRow}:${lastColumnNotation}${lastRow}`;

      const result = parseA1Notation(notation);

      expect(mocked(parseColumnNotation).mock.calls).toEqual([[firstColumnNotation], [lastColumnNotation]]);
      expect(result.firstColumn).toEqual(mocked(parseColumnNotation).mock.results[0].value);
      expect(result.firstRow).toEqual(firstRow);
      expect(result.lastColumn).toEqual(mocked(parseColumnNotation).mock.results[1].value);
      expect(result.lastRow).toEqual(lastRow);
    });
  });

  describe('fallback behaviors', () => {
    describe('when start coordinates are missing', () => {
      it('should return 1 if for the first row', () => {
        const notation = `${firstColumnNotation}:${lastColumnNotation}${lastRow}`;

        const result = parseA1Notation(notation);

        expect(result.firstRow).toEqual(1);
      });

      it('should return 1 for the first column', () => {
        const notation = `${firstRow}:${lastColumnNotation}${lastRow}`;

        const result = parseA1Notation(notation);

        expect(mocked(parseColumnNotation).mock.calls).toEqual([[lastColumnNotation]]);
        expect(result.firstColumn).toEqual(1);
      });
    });

    describe('when last row is missing', () => {
      let notation: string;

      beforeEach(() => {
        notation = `${firstColumnNotation}${firstRow}:${lastColumnNotation}`;
      });

      it('should return undefined no sheet is passed', () => {
        const result = parseA1Notation(notation);

        expect(result.lastRow).toBeUndefined();
      });

      it('should return the last row in sheet if the sheet is passed', () => {
        const sheet = new SheetMock();
        const numOfRows = random.number();

        sheet.getMaxRows.mockReturnValue(numOfRows);

        const result = parseA1Notation(notation, sheet);

        expect(sheet.getMaxRows).toHaveBeenCalledTimes(1);
        expect(result.lastRow).toEqual(numOfRows);
      });
    });

    describe('when last column is missing', () => {
      let notation: string;

      beforeEach(() => {
        notation = `${firstColumnNotation}${firstRow}:${lastRow}`;
      });

      it('should return undefined no sheet is passed', () => {
        const result = parseA1Notation(notation);

        expect(result.lastColumn).toBeUndefined();
      });

      it('should return the last row in sheet if the sheet is passed', () => {
        const sheet = new SheetMock();
        const numOfColumns = random.number();

        sheet.getMaxColumns.mockReturnValue(numOfColumns);

        const result = parseA1Notation(notation, sheet);

        expect(sheet.getMaxColumns).toHaveBeenCalledTimes(1);
        expect(result.lastColumn).toEqual(numOfColumns);
      });
    });
  });
});
