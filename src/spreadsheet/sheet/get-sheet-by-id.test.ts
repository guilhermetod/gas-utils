import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { getSheetById } from '@spreadsheet/sheet/get-sheet-by-id';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';
import { SpreadsheetAppMock } from '@tests/mocks/spreadsheet-app/spreadsheet-app-mock';
import { SpreadsheetMock } from '@tests/mocks/spreadsheet-app/spreadsheet-mock';

describe('getSheetById', () => {
  let id: number;
  let sheetWithCorrectID: SheetMock;
  let sheetsWithDifferentIDs: SheetMock[];

  beforeEach(() => {
    Object.assign(global, {
      SpreadsheetApp: new SpreadsheetAppMock(),
    });

    id = random.number({ max: 100 });
    sheetWithCorrectID = new SheetMock();
    sheetsWithDifferentIDs = buildArray_(5, () => new SheetMock());

    sheetWithCorrectID.getSheetId.mockReturnValue(id);
    sheetsWithDifferentIDs.forEach((sheet) => sheet.getSheetId.mockReturnValue(random.number({ min: id + 1 })));
  });

  it('should return the sheet that matches the given ID', () => {
    const spreadsheet = new SpreadsheetMock([sheetWithCorrectID, ...sheetsWithDifferentIDs]);

    const result = getSheetById(id, spreadsheet);

    expect(result).toBe(sheetWithCorrectID);
  });

  it('should return null if there are not sheets with the given ID', () => {
    const spreadsheet = new SpreadsheetMock([...sheetsWithDifferentIDs]);

    const result = getSheetById(id, spreadsheet);

    expect(result).toEqual(null);
  });

  it('should use the active spreadsheet if no spreadsheet is passed as an argument', () => {
    const spreadsheet = new SpreadsheetMock([sheetWithCorrectID, ...sheetsWithDifferentIDs]);
    mocked(SpreadsheetApp.getActiveSpreadsheet).mockReturnValue(spreadsheet);

    const result = getSheetById(id);

    expect(SpreadsheetApp.getActiveSpreadsheet).toHaveBeenCalledTimes(1);
    expect(result).toBe(sheetWithCorrectID);
  });
});
