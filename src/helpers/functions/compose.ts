type Func<T extends ReadonlyArray<unknown>, R> = (...a: T) => R;

export function compose_<A, T extends ReadonlyArray<unknown>, R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>;

export function compose_<A, B, T extends ReadonlyArray<unknown>, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>;

export function compose_<A, B, C, T extends ReadonlyArray<unknown>, R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>;

export default function compose_<R>(
  f1: (a: unknown) => R,
  ...funcs: ((...args: unknown[]) => unknown)[]
): (...args: unknown[]) => R;

export function compose_<R>(...functions: ((...args: unknown[]) => R)[]): (...args: unknown[]) => R {
  return functions.reduce((a, b) => (...args: unknown[]): R => a(b(...args)));
}
