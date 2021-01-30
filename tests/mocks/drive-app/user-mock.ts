import { internet } from 'faker';

import { createSpyObject } from '@tests/helpers/create-spy-object';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserMock extends jest.Mocked<GoogleAppsScript.Drive.User> { }

export class UserMock {
  constructor(private email = internet.exampleEmail()) {
    Object.assign(this, createSpyObject<GoogleAppsScript.Drive.User>([
      'getDomain',
      'getName',
      'getPhotoUrl',
      'getUserLoginId',
    ]));
  }

  getEmail = jest.fn(() => this.email);
}
