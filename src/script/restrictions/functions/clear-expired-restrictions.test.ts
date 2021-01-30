import { date, random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { coerceToArray_ } from '@helpers/functions/coerce-to-array';
import { clearExpiredRestrictions } from '@script/restrictions/functions/clear-expired-restrictions';
import { deactivateRestriction } from '@script/restrictions/functions/deactivate-restriction';
import { getActiveRestrictions } from '@script/restrictions/functions/get-active-restrictions';
import { buildRandomActiveRestriction } from '@tests/mocks/internal/build-active-restriction-mock';

jest.mock('@script/restrictions/functions/deactivate-restriction');
jest.mock('@script/restrictions/functions/get-active-restrictions');

describe('clearExpiredRestrictions', () => {
  it('should call the deactivateRestriction function for the expired restrictions', () => {
    const restrictionsInterval = { min: 3, max: 10 };
    const now = date.recent().getTime();

    const expiredRestrictions = buildArray_(random.number(restrictionsInterval), () => ({
      ...buildRandomActiveRestriction(),
      expirationTime: now - 1,
    }));
    const validRestrictions = buildArray_(random.number(restrictionsInterval), () => ({
      ...buildRandomActiveRestriction(),
      expirationTime: now + 1,
    }));

    mocked(getActiveRestrictions).mockReturnValue([...expiredRestrictions, ...validRestrictions]);
    jest.spyOn(Date, 'now').mockReturnValue(now);

    clearExpiredRestrictions();

    expect(mocked(deactivateRestriction).mock.calls).toEqual(expiredRestrictions.map(coerceToArray_));
  });
});
