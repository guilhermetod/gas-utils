import { random } from 'faker';
import { mocked } from 'ts-jest/utils';

import { hasActiveRestriction } from '@script/restrictions/functions/has-active-restriction';
import { passRestriction } from '@script/restrictions/functions/pass-restriction';
import { createSpyObject } from '@tests/helpers/create-spy-object';

jest.mock('@script/restrictions/functions/has-active-restriction');

describe('passRestriction', () => {
  let successReturn: string;
  let failureReturn: string;
  let onSuccess: jest.Mock<string>;
  let onFailure: jest.Mock<string>;

  const sleepTime = 10;
  const timeout = 100;
  const maxLoops = timeout / sleepTime;

  beforeEach(() => {
    Object.assign(global, {
      Utilities: createSpyObject(['sleep']),
    });

    successReturn = random.word();
    failureReturn = random.word();
    onSuccess = jest.fn(() => successReturn);
    onFailure = jest.fn(() => failureReturn);
  });

  it('should return the success callback if there are no restrictions', () => {
    mocked(hasActiveRestriction).mockReturnValue(false);

    const result = passRestriction([], { onSuccess, onFailure });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFailure).not.toHaveBeenCalled();
    expect(result).toEqual(successReturn);
  });

  it('should return the fail callback right on start if there\'s an active restriction with cancelling effect', () => {
    mocked(hasActiveRestriction).mockImplementation((_, effects) => effects.includes('cancel'));

    const result = passRestriction([], { onSuccess, onFailure });

    expect(hasActiveRestriction).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result).toEqual(failureReturn);
  });

  it('should fail if the test pass the cancel effect but times out on holding effect', () => {
    mocked(hasActiveRestriction).mockImplementation((_, effects) => effects.includes('hold'));

    const result = passRestriction([], { onSuccess, onFailure, sleepTime, timeout });

    expect(Utilities.sleep).toHaveBeenCalledTimes(maxLoops);
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result).toEqual(failureReturn);
  });

  it('should succeed if the holding restriction is deactivated during the holding', () => {
    mocked(hasActiveRestriction).mockImplementation((_, effects) => (
      effects.includes('hold')
      && mocked(Utilities.sleep).mock.calls.length < maxLoops - 1
    ));

    const result = passRestriction([], { onSuccess, onFailure, sleepTime, timeout });

    expect(Utilities.sleep).toHaveBeenCalledTimes(maxLoops - 1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFailure).not.toHaveBeenCalled();
    expect(result).toEqual(successReturn);
  });

  it('should return null if the test fail and there is no failure callback', () => {
    mocked(hasActiveRestriction).mockReturnValue(true);

    const result = passRestriction([], { onSuccess });

    expect(onFailure).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result).toEqual(null);
  });
});
