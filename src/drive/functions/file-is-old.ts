export const fileIsOld = (file: GoogleAppsScript.Drive.File, monthsOld: number): boolean => {
  const timeConsideredOld = new Date().setMonth(-Math.abs(monthsOld));
  const timeCreated = file.getDateCreated().getTime();

  return timeCreated <= timeConsideredOld;
};
