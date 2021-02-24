import { iteratorToArray } from '@drive/functions/iterator-to-array';

export const getParentFolders = (
  target: GoogleAppsScript.Drive.Folder | GoogleAppsScript.Drive.File,
): GoogleAppsScript.Drive.Folder[] => iteratorToArray(target.getParents());
