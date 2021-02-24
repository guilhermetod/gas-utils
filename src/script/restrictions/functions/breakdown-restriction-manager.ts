import { Restriction } from '@script/restrictions/types/restriction';
import { RestrictionManager } from '@script/restrictions/types/restriction-manager';

export interface BrokenDownRestrictionManager {
  readonly restrictionsToAdd: Restriction[],
  readonly restrictionsToPass: Restriction[],
  readonly restrictionsToRemoveAtTheEnd: Restriction[],
}

export const breakdownRestrictionManager_ = (restrictionManager: RestrictionManager): BrokenDownRestrictionManager => {
  const restrictionsToAdd = [
    ...(restrictionManager.both ?? []),
    ...(restrictionManager.add ?? []),
  ];

  const restrictionsToPass = [
    ...(restrictionManager.both ?? []),
    ...(restrictionManager.pass ?? []),
  ];

  const restrictionsToRemoveAtTheEnd = restrictionManager.persistent
    ? restrictionsToAdd.filter((restriction) => !(restrictionManager.persistent as Restriction[]).includes(restriction))
    : restrictionsToAdd;

  return {
    restrictionsToAdd,
    restrictionsToPass,
    restrictionsToRemoveAtTheEnd,
  };
};
