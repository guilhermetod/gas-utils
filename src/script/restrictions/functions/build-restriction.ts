import { RESTRICTION_PREFIX_ } from '@script/restrictions/constants/restriction-prefix';
import { Restriction } from '@script/restrictions/types/restriction';
import { RestrictionEffect } from '@script/restrictions/types/restriction-effect';

export const buildRestriction = (
  action: string,
  effect: RestrictionEffect,
  duration = 300000,
): Restriction => ({
  action,
  effect,
  duration,
  id: `${RESTRICTION_PREFIX_}${Math.random()}`,
});
