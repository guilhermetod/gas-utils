import { Fn } from '@helpers/types/function';

export const createSpyObject = <T>(methodNames: (keyof T)[], implementation?: Fn): jest.Mocked<T> => methodNames
  .reduce((acc, methodName) => ({
    ...acc,
    [methodName]: jest.fn(implementation),
  }), {} as jest.Mocked<T>);
