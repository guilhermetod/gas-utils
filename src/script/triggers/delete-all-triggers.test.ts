import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { coerceToArray_ } from '@helpers/functions/coerce-to-array';
import { deleteAllTriggers } from '@script/triggers/delete-all-triggers';
import { createSpyObject } from '@tests/helpers/create-spy-object';

describe('deleteAllTriggers', () => {
  beforeEach(() => {
    Object.assign(global, {
      ScriptApp: createSpyObject<typeof ScriptApp>([
        'deleteTrigger',
        'getProjectTriggers',
      ]),
    });
  });

  it('should delete every trigger in the project', () => {
    const numOfTriggers = random.number({ min: 3, max: 10 });

    const triggers = Array(numOfTriggers).fill({} as GoogleAppsScript.Script.Trigger);

    mocked(ScriptApp.getProjectTriggers).mockReturnValue(triggers);

    deleteAllTriggers();

    expect(mocked(ScriptApp.deleteTrigger).mock.calls).toEqual(triggers.map(coerceToArray_));
  });
});
