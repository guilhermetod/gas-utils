import { RestrictionBase } from '@script/restrictions/types/restriction';

export const deactivateRestriction = (restriction: RestrictionBase): void => {
  PropertiesService
    .getScriptProperties()
    .deleteProperty(restriction.id);
};
