import { createSpyObject } from '@tests/helpers/create-spy-object';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RangeMock extends jest.Mocked<GoogleAppsScript.Spreadsheet.Range> {

}

export class RangeMock {
  constructor(private values: unknown[][] = [['']]) {
    Object.assign(this, createSpyObject<RangeMock>([
      'getA1Notation',
      'getColumn',
      'getRow',
      'getSheet',
      'offset',
    ]));
  }

  public getNumRows = jest.fn(() => this.values.length);

  public getNumColumns = jest.fn(() => this.values[0].length);

  public getDisplayValues = jest.fn(() => this.values.map((row) => row.map((cell) => `${cell}`)));

  public getValues = jest.fn(() => this.values);

  public setValues = jest.fn((values: unknown[][]) => {
    this.values = values;
    return this;
  });
}
