import { RowLike } from '@spreadsheet/types/row';
import { isBlank } from '@spreadsheet/utils/is-blank';

export const fillRow = <T extends RowLike>(templateRow: T, ...fillingRows: [Partial<T>, ...Partial<T>[]]): T => (
  Object.entries(templateRow).reduce((acc, [key, templateValue]) => ({
    ...acc,
    [key]: isBlank(templateValue)
      ? fillingRows.find((row) => !isBlank(row[key]))?.[key] ?? templateValue
      : templateValue,
  }), {} as T)
);
