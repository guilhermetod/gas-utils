import { iteratorToArray } from '@drive/functions/iterator-to-array';

export const getChildFolders = (
  parent: GoogleAppsScript.Drive.Folder,
): GoogleAppsScript.Drive.Folder[] => iteratorToArray(parent.getFolders());
