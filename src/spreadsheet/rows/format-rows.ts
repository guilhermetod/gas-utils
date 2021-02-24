import { Fn } from '@helpers/types/function';
import { RowFormatter, RowLike } from '@spreadsheet/types/row';

export const formatRows = <T extends RowLike>(rows: T[], formatter: RowFormatter<T>): T[] => (
  rows.map((row) => (
    Object.entries(row).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: key.charAt(0) !== '$' && formatter[key]
        ? (formatter[key] as Fn)(value)
        : value,
    }), {} as T)))
);
