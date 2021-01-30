import { random } from 'faker';

import { iteratorToArray } from '@drive/functions/iterator-to-array';
import { FileMock } from '@tests/mocks/drive-app/file-mock';

describe('iteratorToArray', () => {
  it('should call itself when iterator has next with the current array plus the next file', () => {
    const maxCalls = random.number({ min: 3, max: 10 });
    const file = new FileMock();
    const next = jest.fn(() => file);
    const hasNext = jest.fn(() => next.mock.calls.length < maxCalls);

    const iterator: jest.Mocked<GoogleAppsScript.Drive.FileIterator> = {
      getContinuationToken: jest.fn(),
      hasNext,
      next,
    };

    const result = iteratorToArray(iterator);

    expect(next).toHaveBeenCalledTimes(maxCalls);
    expect(result).toEqual(Array(maxCalls).fill(file));
  });
});
