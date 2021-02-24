import { activateRestriction } from '@script/restrictions/functions/activate-restriction';
import { breakdownRestrictionManager_ } from '@script/restrictions/functions/breakdown-restriction-manager';
import { deactivateRestriction } from '@script/restrictions/functions/deactivate-restriction';
import { passRestriction } from '@script/restrictions/functions/pass-restriction';
import { RestrictionCallbackReturn } from '@script/restrictions/types/restriction-callback-return';
import { RestrictionManager } from '@script/restrictions/types/restriction-manager';
import { RestrictionPassOptions } from '@script/restrictions/types/restriction-pass-options';

export const runOnRestrictionZone = <T extends RestrictionPassOptions>(
  restrictionManager: RestrictionManager,
  options: T,
): RestrictionCallbackReturn<T> | null => {
  const {
    restrictionsToAdd,
    restrictionsToPass,
    restrictionsToRemoveAtTheEnd,
  } = breakdownRestrictionManager_(restrictionManager);

  try {
    restrictionsToAdd.forEach((restriction) => activateRestriction(restriction));
    return passRestriction(restrictionsToPass, options);
  } finally {
    restrictionsToRemoveAtTheEnd.forEach((restriction) => deactivateRestriction(restriction));
  }
};
