import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { VALID_A1_NOTATION } from '@spreadsheet/range/a1-notation-reg-exps';
import { getAbsoluteA1Notation } from '@spreadsheet/range/get-absolute-a1-notation';
import { getBrokenDownA1Notation, BrokenDownA1Notation } from '@spreadsheet/range/get-broken-down-a1-notation';
import { RangeMock } from '@tests/mocks/spreadsheet-app/range-mock';

jest.mock('@spreadsheet/range/get-broken-down-a1-notation');

describe('getAbsoluteA1Notation', () => {
  let range: RangeMock;
  let brokenDownA1Notation: BrokenDownA1Notation;

  beforeEach(() => {
    range = new RangeMock();

    brokenDownA1Notation = {
      firstColumn: random.alpha(),
      firstRow: random.number({ min: 1 }),
      lastColumn: random.alpha(),
      lastRow: random.number({ min: 1 }),
    } as BrokenDownA1Notation;

    mocked(getBrokenDownA1Notation).mockReturnValue(brokenDownA1Notation);
  });

  it('should always return a valid A1 notation', () => {
    const resultWithColumns = getAbsoluteA1Notation(range, 'column');
    const resultWithRows = getAbsoluteA1Notation(range, 'row');
    const resultWithBoth = getAbsoluteA1Notation(range, 'both');

    expect(resultWithColumns).toMatch(VALID_A1_NOTATION);
    expect(resultWithRows).toMatch(VALID_A1_NOTATION);
    expect(resultWithBoth).toMatch(VALID_A1_NOTATION);
  });

  it('should add a absolute modifier to the corresponding dimension', () => {
    const resultWithColumns = getAbsoluteA1Notation(range, 'column');
    const resultWithRows = getAbsoluteA1Notation(range, 'row');
    const resultWithBoth = getAbsoluteA1Notation(range, 'both');

    expect(resultWithColumns).toMatch(`$${brokenDownA1Notation.firstColumn}`);
    expect(resultWithColumns).toMatch(`$${brokenDownA1Notation.lastColumn}`);
    expect(resultWithRows).toMatch(`$${brokenDownA1Notation.firstRow}`);
    expect(resultWithRows).toMatch(`$${brokenDownA1Notation.lastRow}`);
    expect(resultWithBoth).toMatch(`$${brokenDownA1Notation.firstColumn}`);
    expect(resultWithBoth).toMatch(`$${brokenDownA1Notation.lastColumn}`);
    expect(resultWithBoth).toMatch(`$${brokenDownA1Notation.firstRow}`);
    expect(resultWithBoth).toMatch(`$${brokenDownA1Notation.lastRow}`);
  });
});
