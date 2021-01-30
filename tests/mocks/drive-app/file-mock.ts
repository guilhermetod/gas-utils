import { system } from 'faker';

import { DriveEntity } from '@tests/mocks/drive-app/entity-mock';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FileMock extends jest.Mocked<GoogleAppsScript.Drive.File> { }

export class FileMock {
  constructor(name = system.fileName()) {
    Object.assign(this, new DriveEntity(name));
  }
}
