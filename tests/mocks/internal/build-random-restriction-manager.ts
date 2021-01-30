import { buildArray_ } from '@helpers/functions/build-array';
import { RestrictionManager } from '@script/restrictions/types/restriction-manager';
import { buildRandomRestriction } from '@tests/mocks/internal/build-random-restriction-mock';

export const buildRandomRestrictionManager = (numOfRestrictions = 3): Required<RestrictionManager> => [
  'add',
  'pass',
  'both',
  'persistent',
].reduce((acc, key) => ({
  ...acc,
  [key]: buildArray_(numOfRestrictions, buildRandomRestriction),
}), {} as Required<RestrictionManager>);
