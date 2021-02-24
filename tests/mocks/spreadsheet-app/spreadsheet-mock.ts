import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpreadsheetMock extends jest.Mocked<GoogleAppsScript.Spreadsheet.Spreadsheet> {

}

export class SpreadsheetMock {
  constructor(private sheets: SheetMock[] = []) { }

  getSheets = jest.fn(() => this.sheets);

  getSheetByName = jest.fn((name) => this.sheets.find((sheet) => sheet.getName() === name) ?? null);
}
