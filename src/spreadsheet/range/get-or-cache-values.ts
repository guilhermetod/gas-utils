export const getOrCacheValues = (range: GoogleAppsScript.Spreadsheet.Range, time = 120): unknown[][] => {
  // @Watch https://github.com/DefinitelyTyped/DefinitelyTyped/pull/50712
  const scriptCache = CacheService.getScriptCache() as GoogleAppsScript.Cache.Cache;

  const cacheKey = `${range.getSheet().getSheetId()}_${range.getA1Notation()}`;
  const cachedValues = scriptCache.get(cacheKey);

  if (cachedValues) {
    return JSON.parse(cachedValues);
  }

  const values = range.getValues();
  scriptCache.put(cacheKey, JSON.stringify(values), time);

  return values;
};
