import { getActiveRestrictions } from '@script/restrictions/functions/get-active-restrictions';
import { Restriction } from '@script/restrictions/types/restriction';
import { RestrictionEffect } from '@script/restrictions/types/restriction-effect';

export const hasActiveRestriction = (restrictions: Restriction[], effects: RestrictionEffect[]): boolean => {
  const now = Date.now();

  const restrictedActions = getActiveRestrictions().reduce<string[]>((acc, restriction) => (
    restriction.expirationTime > now && effects.includes(restriction.effect)
      ? [...acc, restriction.action]
      : acc
  ), []);

  return restrictions.some((restriction) => restrictedActions.includes(restriction.action));
};
