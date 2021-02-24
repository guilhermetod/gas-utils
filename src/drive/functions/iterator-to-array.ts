import { Iterator, IteratorType } from '@drive/types/iterator';

export const iteratorToArray = <T extends Iterator>(iterator: T, array: IteratorType<T>[] = []): IteratorType<T>[] => (
  iterator.hasNext()
    ? iteratorToArray(iterator, [...array, iterator.next() as IteratorType<T>])
    : array
);
