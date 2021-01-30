import { getParentFolders } from '@drive/functions/get-parent-folders';
import { iteratorToArray } from '@drive/functions/iterator-to-array';
import { FolderMock } from '@tests/mocks/drive-app/folder-mock';

jest.mock('@drive/functions/iterator-to-array');

describe('getParentFolders', () => {
  it('should call the iteratorToArray function with the parent files', () => {
    const iterator = {} as GoogleAppsScript.Drive.FolderIterator;
    const folder = new FolderMock();

    folder.getParents.mockReturnValue(iterator);

    getParentFolders(folder);

    expect(iteratorToArray).toHaveBeenCalledWith(iterator);
  });
});
