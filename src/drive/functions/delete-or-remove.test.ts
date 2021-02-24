import { internet } from 'faker';
import { mocked } from 'ts-jest/utils';

import { deleteOrRemove } from '@drive/functions/delete-or-remove';
import { getParentFolders } from '@drive/functions/get-parent-folders';
import { buildArray_ } from '@helpers/functions/build-array';
import { createSpyObject } from '@tests/helpers/create-spy-object';
import { FileMock } from '@tests/mocks/drive-app/file-mock';
import { FolderMock } from '@tests/mocks/drive-app/folder-mock';
import { UserMock } from '@tests/mocks/drive-app/user-mock';

jest.mock('@drive/functions/get-parent-folders');

describe('deleteOrRemove', () => {
  let file: FileMock;
  let fileOwner: UserMock;

  beforeEach(() => {
    Object.assign(global, {
      Session: createSpyObject<GoogleAppsScript.Base.Session>(['getEffectiveUser']),
    });

    file = new FileMock();
    fileOwner = new UserMock(internet.email('John'));

    file.getOwner.mockReturnValue(fileOwner);
  });

  it('should delete the file if the user running the script is its owner', () => {
    mocked(Session.getEffectiveUser).mockReturnValue(fileOwner);

    deleteOrRemove(file);

    expect(file.setTrashed).toHaveBeenCalledWith(true);
  });

  it('should remove the file from every parent if the user running the script is not its owner', () => {
    const parentFolders = buildArray_(5, () => new FolderMock());

    mocked(Session.getEffectiveUser).mockReturnValue(new UserMock(internet.email('Doe')));
    mocked(getParentFolders).mockReturnValue(parentFolders);

    deleteOrRemove(file);

    expect(file.setTrashed).not.toHaveBeenCalled();
    parentFolders.forEach((parentFolder) => {
      expect(parentFolder.removeFile).toHaveBeenLastCalledWith(file);
    });
  });
});
