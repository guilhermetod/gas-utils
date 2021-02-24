import { random } from 'faker';

import { RESTRICTION_PREFIX_ } from '@script/restrictions/constants/restriction-prefix';
import { Restriction } from '@script/restrictions/types/restriction';

export const buildRandomRestriction = (): Restriction => ({
  action: random.word(),
  effect: random.arrayElement(['cancel', 'hold']),
  duration: random.number(),
  id: `${RESTRICTION_PREFIX_}${random.uuid()}`,
});
