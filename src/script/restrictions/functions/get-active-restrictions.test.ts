import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { buildArray_ } from '@helpers/functions/build-array';
import { RESTRICTION_PREFIX_ } from '@script/restrictions/constants/restriction-prefix';
import { getActiveRestrictions } from '@script/restrictions/functions/get-active-restrictions';
import { buildRandomActiveRestriction } from '@tests/mocks/internal/build-active-restriction-mock';
import { PropertiesServiceMock } from '@tests/mocks/services/properties-service-mock';

describe('getActiveRestrictions', () => {
  beforeEach(() => {
    Object.assign(global, {
      PropertiesService: new PropertiesServiceMock(),
    });
  });

  it('should return an array with the parsed properties which id match the restriction prefix', () => {
    const restrictionProperties = buildArray_(5, () => ({
      ...buildRandomActiveRestriction(),
      id: `${RESTRICTION_PREFIX_}${random.uuid()}`,
    }));
    const notRestrictionProperties = buildArray_(5, () => ({
      id: random.uuid(),
    }));
    const propertiesObject = [...restrictionProperties, ...notRestrictionProperties].reduce((acc, object) => ({
      ...acc,
      [object.id]: JSON.stringify(object),
    }), {});

    mocked(PropertiesService.getScriptProperties().getProperties).mockReturnValue(propertiesObject);

    const result = getActiveRestrictions();

    expect(result).toEqual(restrictionProperties);
  });
});
