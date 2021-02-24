import { random } from 'faker';

import { buildArray_ } from '@helpers/functions/build-array';

interface CreateValuesOptions<T = string> {
  numOfRows?: number,
  numOfColumns?: number,
  valueCreationCallback?: (...args: unknown[]) => T,
  randomEmpties?: boolean,
}

interface CreateNonNullValuesOptions<T> extends CreateValuesOptions<T> {
  randomEmpties: false,
}

const defaultDimensions = { min: 10, max: 100 };

export function createRandomSheetValues<T = string>(options?: CreateNonNullValuesOptions<T>): T[][];
export function createRandomSheetValues<T = string>(options?: CreateValuesOptions<T>): (T | null)[][];
export function createRandomSheetValues<T = string>(options: CreateValuesOptions<T> = {}): (T | null)[][] {
  const numOfRows = options.numOfRows ?? random.number(defaultDimensions);
  const numOfColumns = options.numOfColumns ?? random.number(defaultDimensions);

  return buildArray_(
    numOfRows,
    () => buildArray_(
      numOfColumns,
      () => (
        options.randomEmpties && random.boolean()
          ? options.valueCreationCallback?.() ?? random.word() as unknown as T
          : null
      ),
    ),
  );
}
