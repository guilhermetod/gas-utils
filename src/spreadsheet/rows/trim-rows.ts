import { getArrayOfRowValues } from '@spreadsheet/rows/get-array-of-row-values';
import { RowLike } from '@spreadsheet/types/row';
import { isBlank } from '@spreadsheet/utils/is-blank';

export const trimRows = <T extends RowLike>(rows: T[]): T[] => rows.reduce<T[]>((acc, row, index, self) => (
  isBlank(getArrayOfRowValues(row))
    ? acc
    : self.slice(
      self.indexOf(acc[0] ?? row),
      index + 1,
    )
), []);
