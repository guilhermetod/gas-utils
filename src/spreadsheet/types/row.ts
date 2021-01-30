import { ObjectValues } from '@helpers/types/object-values';

export type RowInfo = {
  readonly $number: number
  readonly $sheet: GoogleAppsScript.Spreadsheet.Sheet
};

type RowInfoKey = `$${string}`;

export type GenericRowValues = Record<string, unknown>;

export type RowValues<T extends GenericRowValues = GenericRowValues> = Omit<T, RowInfoKey>;

export type Row<T extends GenericRowValues = GenericRowValues> = T & RowInfo;

export type RowLike<T extends GenericRowValues = GenericRowValues> = RowValues<T> | Row<T>;

export type RowFormatter<T extends RowLike> = {
  [K in keyof RowValues<T>]?: (value: T[K]) => T[K]
};

type WildcardCriteria<T> = ObjectValues<T> | ((rowValue: ObjectValues<T>) => boolean);

type WildcardSearch<T> = {
  ['*']?: WildcardCriteria<T>
  ['~']?: never
} | {
  ['*']?: never
  ['~']?: WildcardCriteria<T>
};

export type RowSearch<T extends RowLike> = {
  [K in keyof T]?: T[K] | ((rowValue: T[K]) => boolean)
} & WildcardSearch<T>;
