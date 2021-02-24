import { name, random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { fillRow } from '@spreadsheet/rows/fill-row';
import { RowValues } from '@spreadsheet/types/row';
import { isBlank } from '@spreadsheet/utils/is-blank';

jest.mock('@spreadsheet/utils/is-blank');

type Person = {
  firstName?: string,
  lastName?: string,
  age?: number,
  salary?: number,
};

describe('fillRow', () => {
  beforeEach(() => {
    mocked(isBlank).mockImplementation((value) => value === undefined);
  });

  it('should fill the blank values in the template row with the first non blank corresponding value of the filling rows', () => {
    const firstRow: RowValues<Person> = {
      firstName: name.firstName(),
      lastName: undefined,
      age: undefined,
      salary: undefined,
    };
    const secondRow = { lastName: name.lastName() };
    const thirdRow = { age: random.number() };

    const result = fillRow(firstRow, secondRow, thirdRow);

    expect(result.firstName).toEqual(firstRow.firstName);
    expect(result.lastName).toEqual(secondRow.lastName);
    expect(result.age).toEqual(thirdRow.age);
    expect(result.salary).toEqual(firstRow.salary);
  });

  it('should not add the filling rows properties to the template row', () => {
    const firstRow: RowValues<Person> = { firstName: name.firstName() };
    const secondRow: RowValues<Person> = { lastName: name.firstName() };

    const result = fillRow(firstRow, secondRow);

    expect(result).toEqual(firstRow);
  });
});
