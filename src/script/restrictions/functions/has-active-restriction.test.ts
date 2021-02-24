import { date } from 'faker';
import { mocked } from 'ts-jest/utils';

import { getActiveRestrictions } from '@script/restrictions/functions/get-active-restrictions';
import { hasActiveRestriction } from '@script/restrictions/functions/has-active-restriction';
import { Restriction } from '@script/restrictions/types/restriction';
import { buildRandomRestriction } from '@tests/mocks/internal/build-random-restriction-mock';

jest.mock('@script/restrictions/functions/get-active-restrictions');

describe('hasActiveRestriction', () => {
  let now: number;
  let restriction: Restriction;

  beforeEach(() => {
    now = date.recent().getTime();
    restriction = buildRandomRestriction();
    jest.spyOn(Date, 'now').mockReturnValue(now);
  });

  it('should return true if there\'s at least one active restriction with one the given effects', () => {
    mocked(getActiveRestrictions).mockReturnValue([{
      ...restriction,
      expirationTime: now + 1,
    }]);

    const result = hasActiveRestriction([restriction], [restriction.effect]);

    expect(result).toEqual(true);
  });

  it('should return false if the valid restrictions have a different effect', () => {
    mocked(getActiveRestrictions).mockReturnValue([{
      ...restriction,
      expirationTime: now + 1,
      effect: restriction.effect === 'cancel' ? 'hold' : 'cancel',
    }]);

    const result = hasActiveRestriction([restriction], [restriction.effect]);

    expect(result).toEqual(false);
  });

  it('should return false if there the restrictions with the same effect are expired', () => {
    mocked(getActiveRestrictions).mockReturnValue([{
      ...restriction,
      expirationTime: now - 1,
    }]);

    const result = hasActiveRestriction([restriction], [restriction.effect]);

    expect(result).toEqual(false);
  });
});
