import { RowLike, RowValues } from '@spreadsheet/types/row';

export const getRowValues = <T extends RowValues>(row: RowLike<T>): T => (
  Object.entries(row).reduce((acc, [key, value]) => (
    key.charAt(0) === '$'
      ? acc
      : { ...acc, [key]: value }
  ), {} as T)
);
