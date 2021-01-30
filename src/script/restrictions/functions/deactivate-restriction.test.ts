import { deactivateRestriction } from '@script/restrictions/functions/deactivate-restriction';
import { buildRandomRestriction } from '@tests/mocks/internal/build-random-restriction-mock';
import { PropertiesServiceMock } from '@tests/mocks/services/properties-service-mock';

describe('deactivateRestriction', () => {
  beforeEach(() => {
    Object.assign(global, {
      PropertiesService: new PropertiesServiceMock(),
    });
  });

  it('should call the properties service to delete the property with the restriction id', () => {
    const restriction = buildRandomRestriction();

    deactivateRestriction(restriction);

    expect(PropertiesService.getScriptProperties().deleteProperty).toHaveBeenCalledWith(restriction.id);
  });
});
