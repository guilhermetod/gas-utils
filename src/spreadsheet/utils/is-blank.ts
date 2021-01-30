export type Blank = null | undefined | never[] | Record<string, never>;

export const isBlank = (value: unknown): value is Blank => {
  switch (typeof value) {
    case 'object':
      return value === null || Object.values(value).every((objectValue) => isBlank(objectValue));
    case 'number':
      return false;
    case 'boolean':
      return false;
    case 'string':
      return /^\s*$/.test(value);
    default:
      return !value;
  }
};
