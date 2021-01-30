import { random } from 'faker';

import { RESTRICTION_PREFIX_ } from '@script/restrictions/constants/restriction-prefix';
import { buildRestriction } from '@script/restrictions/functions/build-restriction';
import { RestrictionEffect } from '@script/restrictions/types/restriction-effect';

describe('buildRestriction', () => {
  let action: string;
  let effect: RestrictionEffect;
  let duration: number;

  beforeEach(() => {
    action = random.word();
    effect = random.arrayElement(['cancel', 'hold']);
    duration = random.number();
  });

  it('should have as action, effect and duration the same values passed as arguments', () => {
    const restriction = buildRestriction(action, effect, duration);

    expect(restriction.action).toEqual(action);
    expect(restriction.effect).toEqual(effect);
    expect(restriction.duration).toEqual(duration);
  });

  it('should default the duration to 5 minutes', () => {
    const restriction = buildRestriction(action, effect);
    const fiveMinutes = 1000 * 60 * 5;

    expect(restriction.duration).toEqual(fiveMinutes);
  });

  it('should create a random id with the restriction prefix', () => {
    const restriction = buildRestriction(action, effect, duration);

    expect(restriction.id).toMatch(new RegExp(`^${RESTRICTION_PREFIX_}`));
  });
});
