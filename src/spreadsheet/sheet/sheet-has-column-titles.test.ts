import { random } from 'faker';

import { sheetHasColumnTitles } from '@spreadsheet/sheet/sheet-has-column-titles';
import { SheetMock } from '@tests/mocks/spreadsheet-app/sheet-mock';

describe('sheetHasColumnTitles', () => {
  it('should return if the sheet one or more frozen rows', () => {
    const sheet = new SheetMock();

    sheet.getFrozenRows.mockReturnValue(random.number({ max: -1 }));
    expect(sheetHasColumnTitles(sheet)).toEqual(false);

    sheet.getFrozenRows.mockReturnValue(0);
    expect(sheetHasColumnTitles(sheet)).toEqual(false);

    sheet.getFrozenRows.mockReturnValue(1);
    expect(sheetHasColumnTitles(sheet)).toEqual(true);

    sheet.getFrozenRows.mockReturnValue(random.number({ min: 2 }));
    expect(sheetHasColumnTitles(sheet)).toEqual(true);
  });
});
