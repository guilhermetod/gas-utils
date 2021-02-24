export const coerceToArray_ = <T>(value: T | T[]): T[] => (
  Array.isArray(value)
    ? value
    : [value]
);
