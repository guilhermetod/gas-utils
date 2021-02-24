import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { coerceToArray_ } from '@helpers/functions/coerce-to-array';
import { activateRestriction } from '@script/restrictions/functions/activate-restriction';
import { breakdownRestrictionManager_ } from '@script/restrictions/functions/breakdown-restriction-manager';
import { deactivateRestriction } from '@script/restrictions/functions/deactivate-restriction';
import { passRestriction } from '@script/restrictions/functions/pass-restriction';
import { runOnRestrictionZone } from '@script/restrictions/functions/run-on-restriction-zone';
import { Restriction } from '@script/restrictions/types/restriction';
import { RestrictionManager } from '@script/restrictions/types/restriction-manager';
import { RestrictionPassOptions } from '@script/restrictions/types/restriction-pass-options';
import { getCallOrders } from '@tests/helpers/get-call-orders';
import { buildRandomRestrictionManager } from '@tests/mocks/internal/build-random-restriction-manager';

jest.mock('@script/restrictions/functions/activate-restriction');
jest.mock('@script/restrictions/functions/deactivate-restriction');
jest.mock('@script/restrictions/functions/pass-restriction');

describe('runOnRestrictionZone', () => {
  let restrictionManager: Required<RestrictionManager>;
  let restrictionsToAdd: Restriction[];
  let restrictionsToPass: Restriction[];
  let restrictionsToRemoveAtTheEnd: Restriction[];
  let options: RestrictionPassOptions;

  beforeEach(() => {
    restrictionManager = buildRandomRestrictionManager();
    ({
      restrictionsToAdd,
      restrictionsToPass,
      restrictionsToRemoveAtTheEnd,
    } = breakdownRestrictionManager_(restrictionManager));

    options = { onSuccess: jest.fn() };
  });

  it('should activate the restrictions to add, delegate the return to passRestriction and then deactivate the restriction to remove, in the end in that order', () => {
    const returnValue = random.word();

    mocked(passRestriction).mockReturnValue(returnValue);

    const result = runOnRestrictionZone(restrictionManager, options);

    const activateRestrictionCalls = getCallOrders(mocked(activateRestriction));
    const passRestrictionCalls = getCallOrders(mocked(passRestriction));
    const deactivateRestrictionCall = getCallOrders(mocked(deactivateRestriction));

    expect(mocked(activateRestriction).mock.calls).toEqual(restrictionsToAdd.map(coerceToArray_));
    expect(passRestriction).toHaveBeenCalledWith(restrictionsToPass, options);
    expect(mocked(deactivateRestriction).mock.calls).toEqual(restrictionsToRemoveAtTheEnd.map(coerceToArray_));
    expect(activateRestrictionCalls.last).toBeLessThan(passRestrictionCalls.first);
    expect(passRestrictionCalls.last).toBeLessThan(deactivateRestrictionCall.first);
    expect(result).toEqual(returnValue);
  });

  it('should remove the restrictions in the end even if an error is thrown', () => {
    mocked(passRestriction).mockImplementation(() => { throw new Error(); });

    expect(() => runOnRestrictionZone(restrictionManager, options)).toThrowError();

    const passRestrictionCalls = getCallOrders(mocked(passRestriction));
    const deactivateRestrictionCall = getCallOrders(mocked(deactivateRestriction));

    expect(mocked(deactivateRestriction).mock.calls).toEqual(restrictionsToRemoveAtTheEnd.map(coerceToArray_));
    expect(passRestrictionCalls.last).toBeLessThan(deactivateRestrictionCall.first);
  });
});
