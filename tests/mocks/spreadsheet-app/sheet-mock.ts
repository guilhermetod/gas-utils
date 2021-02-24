import { createSpyObject } from '@tests/helpers/create-spy-object';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SheetMock extends jest.Mocked<GoogleAppsScript.Spreadsheet.Sheet> {

}

export class SheetMock {
  constructor(private values: unknown[][] = [['']]) {
    Object.assign(this, createSpyObject<SheetMock>([
      'getFrozenRows',
      'getRange',
      'getSheetId',
    ]));

    Object.assign(this, createSpyObject<SheetMock>([
      'insertRowAfter',
      'insertRowBefore',
      'insertRows',
      'insertRowsAfter',
      'insertRowsBefore',
    ], () => this));
  }

  getMaxColumns = jest.fn(() => this.values[0].length);

  getMaxRows = jest.fn(() => this.values.length);
}
