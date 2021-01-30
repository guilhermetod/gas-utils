import { system } from 'faker';

import { createSpyObject } from '@tests/helpers/create-spy-object';
import { DriveEntity } from '@tests/mocks/drive-app/entity-mock';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FolderMock extends jest.Mocked<GoogleAppsScript.Drive.Folder> { }

export class FolderMock {
  constructor(name = system.fileName()) {
    Object.assign(this, {
      ...new DriveEntity(name),
      ...createSpyObject<GoogleAppsScript.Drive.Folder>([
        'addFile',
        'addFolder',
        'createFile',
        'createFolder',
        'getFiles',
        'getFolders',
        'removeFile',
        'removeFolder',
      ]),
    });
  }
}
