import { createSpyObject } from '@tests/helpers/create-spy-object';

// @Watch https://github.com/microsoft/TypeScript/issues/26792
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpreadsheetAppMock extends jest.Mocked<GoogleAppsScript.Spreadsheet.SpreadsheetApp> {

}

export class SpreadsheetAppMock {
  constructor() {
    Object.assign(this, createSpyObject<GoogleAppsScript.Spreadsheet.SpreadsheetApp>([
      'flush',
      'getActive',
      'getActiveRange',
      'getActiveRangeList',
      'getActiveSheet',
      'getActiveSpreadsheet',
      'getUi',
    ]));
  }
}
