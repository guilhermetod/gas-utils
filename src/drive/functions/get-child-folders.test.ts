import { getChildFolders } from '@drive/functions/get-child-folders';
import { iteratorToArray } from '@drive/functions/iterator-to-array';
import { FolderMock } from '@tests/mocks/drive-app/folder-mock';

jest.mock('@drive/functions/iterator-to-array');

describe('getChildFolders', () => {
  it('should call the iteratorToArray function with the child folders', () => {
    const iterator = {} as GoogleAppsScript.Drive.FolderIterator;
    const folder = new FolderMock();

    folder.getFolders.mockReturnValue(iterator);

    getChildFolders(folder);

    expect(iteratorToArray).toHaveBeenCalledWith(iterator);
  });
});
