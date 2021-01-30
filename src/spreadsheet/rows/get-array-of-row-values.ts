import { compose_ } from '@helpers/functions/compose';
import { ObjectValues } from '@helpers/types/object-values';
import { getRowValues } from '@spreadsheet/rows/get-row-values';
import { RowLike, RowValues } from '@spreadsheet/types/row';

export const getArrayOfRowValues = <T extends RowValues>(row: RowLike<T>): ObjectValues<T>[] => compose_(
  Object.values,
  getRowValues,
)(row);
