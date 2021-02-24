import { createSpyObject } from '@tests/helpers/create-spy-object';

export class CacheServiceMock implements GoogleAppsScript.Cache.CacheService {
  private documentCache = CacheServiceMock.buildCacheMock();

  private scriptCache = CacheServiceMock.buildCacheMock();

  private userCache = CacheServiceMock.buildCacheMock();

  private static buildCacheMock(): jest.Mocked<GoogleAppsScript.Cache.Cache> {
    return createSpyObject([
      'get',
      'getAll',
      'put',
      'putAll',
      'remove',
      'removeAll',
    ]);
  }

  getDocumentCache(): jest.Mocked<GoogleAppsScript.Cache.Cache> {
    return this.documentCache;
  }

  getScriptCache(): jest.Mocked<GoogleAppsScript.Cache.Cache> {
    return this.scriptCache;
  }

  getUserCache(): jest.Mocked<GoogleAppsScript.Cache.Cache> {
    return this.userCache;
  }
}
