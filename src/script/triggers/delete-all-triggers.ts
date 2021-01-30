export const deleteAllTriggers = (): void => ScriptApp
  .getProjectTriggers()
  .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
