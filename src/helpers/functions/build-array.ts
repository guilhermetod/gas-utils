import { NotFunction } from '@helpers/types/function';

type Callback<T> = (value: undefined, index: number, array: undefined[]) => T;

export const buildArray_ = <T>(length: number, filler?: Callback<T> | NotFunction<T>): T[] => (
  [...Array(length)].map(
    typeof filler === 'function'
      ? filler as Callback<T>
      : (): T => filler as T,
  )
);
