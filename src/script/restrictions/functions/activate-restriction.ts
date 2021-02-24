import { compose_ } from '@helpers/functions/compose';
import { buildActiveRestriction_ } from '@script/restrictions/functions/build-active-restriction';
import { Restriction } from '@script/restrictions/types/restriction';

export const activateRestriction = (restriction: Restriction): void => {
  PropertiesService
    .getScriptProperties()
    .setProperty(
      restriction.id,
      compose_(JSON.stringify, buildActiveRestriction_)(restriction),
    );
};
