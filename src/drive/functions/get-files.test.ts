import { getFiles } from '@drive/functions/get-files';
import { iteratorToArray } from '@drive/functions/iterator-to-array';
import { FolderMock } from '@tests/mocks/drive-app/folder-mock';

jest.mock('@drive/functions/iterator-to-array');

describe('getFiles', () => {
  it('should call the iteratorToArray function with the child files', () => {
    const iterator = {} as GoogleAppsScript.Drive.FileIterator;
    const folder = new FolderMock();

    folder.getFiles.mockReturnValue(iterator);

    getFiles(folder);

    expect(iteratorToArray).toHaveBeenCalledWith(iterator);
  });
});
