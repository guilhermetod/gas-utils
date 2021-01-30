import { RESTRICTION_PREFIX_ } from '@script/restrictions/constants/restriction-prefix';
import { ActiveRestriction } from '@script/restrictions/types/restriction';

export const getActiveRestrictions = (): ActiveRestriction[] => Object.entries(
  PropertiesService
    .getScriptProperties()
    .getProperties(),
).reduce<ActiveRestriction[]>((acc, [key, value]) => (
  key.indexOf(RESTRICTION_PREFIX_) === 0
    ? [...acc, JSON.parse(value)]
    : acc
), []);
