type RangeWithExclusiveMethods = Omit<GoogleAppsScript.Spreadsheet.Range, (
  keyof GoogleAppsScript.Spreadsheet.Sheet | keyof GoogleAppsScript.Spreadsheet.Spreadsheet
)>;

export const isRange = (value: unknown): value is GoogleAppsScript.Spreadsheet.Range => (
  typeof (value as RangeWithExclusiveMethods)?.setValues === 'function'
  && `${value}` === 'Range'
);
