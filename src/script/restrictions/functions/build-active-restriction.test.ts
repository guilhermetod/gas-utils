import { date } from 'faker';

import { buildActiveRestriction_ } from '@script/restrictions/functions/build-active-restriction';
import { buildRandomRestriction } from '@tests/mocks/internal/build-random-restriction-mock';

describe('buildActiveRestriction', () => {
  it('should remove the duration property and calculate the expiration time', () => {
    const now = date.recent().getTime();
    const restriction = buildRandomRestriction();

    jest.spyOn(Date, 'now').mockReturnValue(now);

    const result = buildActiveRestriction_(restriction);

    expect(result).not.toHaveProperty('duration');
    expect(result.expirationTime).toEqual(now + restriction.duration);
  });
});
