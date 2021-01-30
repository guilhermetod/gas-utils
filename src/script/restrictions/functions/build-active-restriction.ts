import { ActiveRestriction, Restriction } from '@script/restrictions/types/restriction';

export const buildActiveRestriction_ = (restriction: Restriction): ActiveRestriction => {
  const { duration, ...activeRestrictionBase } = restriction;

  return {
    ...activeRestrictionBase,
    expirationTime: Date.now() + duration,
  };
};
