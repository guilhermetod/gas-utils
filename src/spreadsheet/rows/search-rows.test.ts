import { name, random } from 'faker';

import { buildArray_ } from '@helpers/functions/build-array';
import { searchRows } from '@spreadsheet/rows/search-rows';

type Person = {
  name: string,
  age: number,
};

describe('searchRows', () => {
  let person: Person;

  beforeEach(() => {
    person = {
      name: name.findName(),
      age: random.number({ min: 18, max: 40 }),
    };
  });

  it('should return the rows where the values are equal to the criteria when the criteria is not a function', () => {
    const rowsThatPassCriteria = buildArray_(5, person);
    const rowsThatDoNotPassCriteria = buildArray_(5, () => ({
      name: name.findName().toUpperCase(),
      age: random.number({ min: person.age + 1 }),
    }));
    const allRows = [...rowsThatPassCriteria, ...rowsThatDoNotPassCriteria];

    const result = searchRows(allRows, person);

    expect(result).toEqual(rowsThatPassCriteria);
  });

  it('should use the criteria as a callback that return a boolean when the criteria is a function', () => {
    const rowsThatPassCriteria = buildArray_(5, () => ({ age: random.number({ min: person.age }) }));
    const rowsThatDoNotPassCriteria = buildArray_(5, () => ({ age: random.number({ max: person.age - 1 }) }));
    const allRows = [...rowsThatPassCriteria, ...rowsThatDoNotPassCriteria];

    const ageCriteria = jest.fn((age) => age >= person.age);

    const result = searchRows(allRows, { age: ageCriteria });

    expect(ageCriteria.mock.calls).toEqual(allRows.map((row) => [row.age]));
    expect(result).toEqual(rowsThatPassCriteria);
  });

  it('should not return rows where only one criteria matches', () => {
    const rowsThatPassEveryCriteria = buildArray_(5, () => ({
      ...person,
      age: random.number({ min: person.age }),
    }));
    const rowsThatOnlyPassNameCriteria = buildArray_(5, () => ({
      age: random.number({ min: person.age }),
      name: person.name.toUpperCase(),
    }));
    const allRows = [...rowsThatPassEveryCriteria, ...rowsThatOnlyPassNameCriteria];

    const ageCriteria = jest.fn((age) => age >= person.age);

    const result = searchRows(allRows, { age: ageCriteria, name: person.name });

    expect(ageCriteria.mock.calls).toEqual(allRows.map((row) => [row.age]));
    expect(ageCriteria.mock.results).toEqual(allRows.map(() => ({ type: 'return', value: true })));
    expect(result).toEqual(rowsThatPassEveryCriteria);
  });

  it('should require that every row passes the match all criteria for every row', () => {
    const maxAge = random.number({ min: person.age + 10 });

    const rowsThatPassEveryCriteria = buildArray_(5, () => ({
      age: random.number({ min: person.age, max: maxAge }),
    }));
    const rowsThatOnlyPassMatchAllCriteria = buildArray_(5, () => ({
      age: random.number({ max: person.age - 1 }),
    }));
    const rowsThatOnlyPassSpecificCriteria = buildArray_(5, () => ({
      age: random.number({ min: maxAge + 1 }),
    }));
    const rowsThatPassMatchAllCriteria = [...rowsThatOnlyPassMatchAllCriteria, ...rowsThatPassEveryCriteria];
    const allRows = [...rowsThatPassMatchAllCriteria, ...rowsThatOnlyPassSpecificCriteria];

    const ageCriteria = jest.fn((age) => age >= person.age);
    const matchAllCriteria = jest.fn((value) => value <= maxAge);

    const result = searchRows(allRows, { '*': matchAllCriteria, age: ageCriteria });

    expect(matchAllCriteria.mock.calls).toEqual(allRows.map((row) => [row.age]));
    expect(ageCriteria.mock.calls).toEqual(rowsThatPassMatchAllCriteria.map((row) => [row.age]));
    expect(result).toEqual(rowsThatPassEveryCriteria);
  });

  it('should use the fallback if there is no match all or specific criteria', () => {
    const rowsThatPassCriteria = buildArray_(5, person);
    const rowsThatDoNotPassCriteria = buildArray_(5, { ...person, age: null });

    const allRows = [...rowsThatPassCriteria, ...rowsThatDoNotPassCriteria];
    const nameCriteria = jest.fn((value) => value === person.name);
    const fallbackCriteria = jest.fn((value) => value !== null);

    const result = searchRows(allRows, { '~': fallbackCriteria, name: nameCriteria });

    expect(nameCriteria.mock.calls).toEqual(allRows.map((row) => [row.name]));
    expect(fallbackCriteria.mock.calls).toEqual(allRows.map((row) => [row.age]));
    expect(result).toEqual(rowsThatPassCriteria);
  });

  it('should succeed if there\'s no match all, specific or fallback criteria', () => {
    const rows = buildArray_(5, { age: person.age }) as Person[];

    const nameCriteria = jest.fn((value) => value !== null);

    const result = searchRows(rows, { name: nameCriteria });

    expect(nameCriteria).not.toHaveBeenCalled();
    expect(result).toEqual(rows);
  });
});
