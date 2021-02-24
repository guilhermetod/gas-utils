import { getParentFolders } from '@drive/functions/get-parent-folders';

export const deleteOrRemove = (file: GoogleAppsScript.Drive.File): void => {
  if (Session.getEffectiveUser().getEmail() === file.getOwner().getEmail()) {
    file.setTrashed(true);
  } else {
    getParentFolders(file).forEach((parentFolder) => parentFolder.removeFile(file));
  }
};
