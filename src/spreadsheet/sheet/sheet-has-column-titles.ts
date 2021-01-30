/*
To determine if a sheet has column titles (e.g most data-driven sheets)
it's required that it contains at least one frozen row.

This avoids collisions for other types of sheets (e.g reports and graphical sheets),
where the first row might be empty or contain values that don't represent the content of the following rows.
*/

export const sheetHasColumnTitles = (sheet: GoogleAppsScript.Spreadsheet.Sheet): boolean => sheet.getFrozenRows() > 0;
