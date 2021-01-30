import { deactivateRestriction } from '@script/restrictions/functions/deactivate-restriction';
import { getActiveRestrictions } from '@script/restrictions/functions/get-active-restrictions';

export const clearExpiredRestrictions = (): void => {
  const now = Date.now();

  getActiveRestrictions().forEach((restriction) => {
    if (now >= restriction.expirationTime) {
      deactivateRestriction(restriction);
    }
  });
};
