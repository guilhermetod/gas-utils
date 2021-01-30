import { iteratorToArray } from '@drive/functions/iterator-to-array';

export const getFiles = (
  folder: GoogleAppsScript.Drive.Folder,
): GoogleAppsScript.Drive.File[] => iteratorToArray(folder.getFiles());
