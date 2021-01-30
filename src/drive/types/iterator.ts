export type Iterator = GoogleAppsScript.Drive.FileIterator | GoogleAppsScript.Drive.FolderIterator;
export type IteratorType<T extends Iterator> = T extends GoogleAppsScript.Drive.FileIterator
  ? GoogleAppsScript.Drive.File
  : GoogleAppsScript.Drive.Folder;
