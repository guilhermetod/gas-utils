import { deleteOrRemove } from '@drive/functions/delete-or-remove';
import { fileIsOld } from '@drive/functions/file-is-old';
import { getFiles } from '@drive/functions/get-files';

export const deleteOrRemoveOldFiles = (folder: GoogleAppsScript.Drive.Folder, monthsOld: number): void => {
  getFiles(folder).forEach((file) => {
    if (fileIsOld(file, monthsOld)) {
      deleteOrRemove(file);
    }
  });
};
