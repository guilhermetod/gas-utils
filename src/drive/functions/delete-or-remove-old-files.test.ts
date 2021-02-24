import { mocked } from 'ts-jest/utils';

import { deleteOrRemove } from '@drive/functions/delete-or-remove';
import { deleteOrRemoveOldFiles } from '@drive/functions/delete-or-remove-old-files';
import { fileIsOld } from '@drive/functions/file-is-old';
import { getFiles } from '@drive/functions/get-files';
import { buildArray_ } from '@helpers/functions/build-array';
import { coerceToArray_ } from '@helpers/functions/coerce-to-array';
import { FileMock } from '@tests/mocks/drive-app/file-mock';
import { FolderMock } from '@tests/mocks/drive-app/folder-mock';

jest.mock('@drive/functions/delete-or-remove');
jest.mock('@drive/functions/file-is-old');
jest.mock('@drive/functions/get-files');

describe('deleteOrRemoveOldFiles', () => {
  it('should call deleteOrRemove only for old files', () => {
    const oldFiles = buildArray_(5, () => new FileMock());
    const newFiles = buildArray_(5, () => new FileMock());

    mocked(getFiles).mockReturnValue([...oldFiles, ...newFiles]);
    mocked(fileIsOld).mockImplementation((file) => oldFiles.includes(file as jest.Mocked<GoogleAppsScript.Drive.File>));

    deleteOrRemoveOldFiles(new FolderMock(), 3);

    expect(mocked(deleteOrRemove).mock.calls).toEqual(oldFiles.map(coerceToArray_));
  });
});
