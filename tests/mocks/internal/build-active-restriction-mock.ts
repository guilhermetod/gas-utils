import { compose_ } from '@helpers/functions/compose';
import { buildActiveRestriction_ } from '@script/restrictions/functions/build-active-restriction';
import { ActiveRestriction } from '@script/restrictions/types/restriction';
import { buildRandomRestriction } from '@tests/mocks/internal/build-random-restriction-mock';

export const buildRandomActiveRestriction = (): ActiveRestriction => compose_(
  buildActiveRestriction_,
  buildRandomRestriction,
)();
