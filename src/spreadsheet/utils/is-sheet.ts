type SheetWithExclusiveMethods = Omit<GoogleAppsScript.Spreadsheet.Sheet, (
  keyof GoogleAppsScript.Spreadsheet.Range | keyof GoogleAppsScript.Spreadsheet.Spreadsheet
)>;

export const isSheet = (value: unknown): value is GoogleAppsScript.Spreadsheet.Sheet => (
  typeof (value as SheetWithExclusiveMethods)?.setTabColor === 'function'
  && `${value}` === 'Sheet'
);
