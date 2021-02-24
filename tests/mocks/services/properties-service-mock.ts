import { createSpyObject } from '@tests/helpers/create-spy-object';

const buildPropertiesMock = (): jest.Mocked<GoogleAppsScript.Properties.Properties> => createSpyObject([
  'deleteAllProperties',
  'deleteProperty',
  'getKeys',
  'getProperties',
  'getProperty',
  'setProperties',
  'setProperty',
]);

export class PropertiesServiceMock {
  getDocumentProperties = jest.fn().mockReturnValue(buildPropertiesMock());

  getScriptProperties = jest.fn().mockReturnValue(buildPropertiesMock());

  getUserProperties = jest.fn().mockReturnValue(buildPropertiesMock());
}
