import { date, internet, random, system } from 'faker';

import { Shared } from '@helpers/types/shared';
import { createSpyObject } from '@tests/helpers/create-spy-object';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DriveEntity extends jest.Mocked<Shared<GoogleAppsScript.Drive.File, GoogleAppsScript.Drive.Folder>> {

}

export class DriveEntity {
  private downloadURL = internet.url();

  private id = random.uuid();

  private dateCreated = date.recent();

  constructor(private name = system.fileName()) {
    Object.assign(this, createSpyObject<DriveEntity>([
      'getEditors',
      'getOwner',
      'getParents',
      'setName',
      'setTrashed',
    ]));
  }

  getDateCreated = jest.fn(() => this.dateCreated);

  getDownloadUrl = jest.fn(() => this.downloadURL);

  getId = jest.fn(() => this.id);

  getName = jest.fn(() => this.name);
}
