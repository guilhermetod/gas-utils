import { mocked } from 'ts-jest/utils';

import { activateRestriction } from '@script/restrictions/functions/activate-restriction';
import { buildActiveRestriction_ } from '@script/restrictions/functions/build-active-restriction';
import { buildRandomRestriction } from '@tests/mocks/internal/build-random-restriction-mock';
import { PropertiesServiceMock } from '@tests/mocks/services/properties-service-mock';

jest.mock('@script/restrictions/functions/build-active-restriction');

describe('activateRestriction', () => {
  beforeEach(() => {
    Object.assign(global, {
      PropertiesService: new PropertiesServiceMock(),
    });
  });

  it('should store the restriction stringified active restriction with its id as key', () => {
    const restriction = buildRandomRestriction();
    const activeRestriction = buildActiveRestriction_(restriction);

    mocked(buildActiveRestriction_).mockReturnValue(activeRestriction);

    activateRestriction(restriction);

    expect(PropertiesService.getScriptProperties().setProperty).toHaveBeenCalledWith(
      restriction.id,
      JSON.stringify(activeRestriction),
    );
  });
});
