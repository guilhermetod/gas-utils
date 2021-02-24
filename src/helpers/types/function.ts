export type Fn = (...args: unknown[]) => unknown;

export type NotFunction<T> = T extends Fn ? never : T;
