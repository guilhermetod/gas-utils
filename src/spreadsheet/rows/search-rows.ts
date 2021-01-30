import { RowLike, RowSearch } from '@spreadsheet/types/row';

const passCriteria_ = (criteria: unknown, value: unknown): boolean => (
  typeof criteria === 'function'
    ? criteria(value)
    : value === criteria
);

export const searchRows = <T extends RowLike>(rows: T[], search: RowSearch<T>): T[] => {
  const criteriaKeys = Object.keys(search);
  const matchAllCriteriaExits = criteriaKeys.includes('*');
  const fallbackCriteriaExists = criteriaKeys.includes('~');

  return rows.filter((row) => (
    Object.entries(row).every(([rowTitle, rowValue]) => {
      if (matchAllCriteriaExits && !passCriteria_(search['*'], rowValue)) {
        return false;
      }

      if (criteriaKeys.includes(rowTitle)) {
        return passCriteria_(search[rowTitle], rowValue);
      }

      return !matchAllCriteriaExits && fallbackCriteriaExists
        ? passCriteria_(search['~'], rowValue)
        : true;
    })
  ));
};
