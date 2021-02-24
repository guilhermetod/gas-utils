import { buildArray_ } from '@helpers/functions/build-array';
import { hasActiveRestriction } from '@script/restrictions/functions/has-active-restriction';
import { Restriction } from '@script/restrictions/types/restriction';
import { RestrictionCallbackReturn } from '@script/restrictions/types/restriction-callback-return';
import { RestrictionPassOptions } from '@script/restrictions/types/restriction-pass-options';

export const passRestriction = <T extends RestrictionPassOptions>(
  restrictions: Restriction[],
  options: T,
): RestrictionCallbackReturn<T> | null => {
  const fail = (): RestrictionCallbackReturn<T> | null => options.onFailure?.() as RestrictionCallbackReturn<T> ?? null;
  const succeed = (): RestrictionCallbackReturn<T> => options.onSuccess() as RestrictionCallbackReturn<T>;

  if (hasActiveRestriction(restrictions, ['cancel'])) {
    return fail();
  }

  const sleepTime = options.sleepTime ?? 1000;
  const timeout = options.timeout ?? 60000;
  const maxSleepLoops = timeout / sleepTime;

  const timedOut = buildArray_(maxSleepLoops).every(() => {
    if (hasActiveRestriction(restrictions, ['hold'])) {
      Utilities.sleep(sleepTime);
      return hasActiveRestriction(restrictions, ['hold']);
    }

    return false;
  });

  return timedOut
    ? fail()
    : succeed();
};
