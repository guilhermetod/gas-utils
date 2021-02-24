import { random } from 'faker';

import { fileIsOld } from '@drive/functions/file-is-old';
import { FileMock } from '@tests/mocks/drive-app/file-mock';

describe('fileIsOld', () => {
  let file: FileMock;

  let currentDate: Date;
  let monthsOld: number;
  let oldDateTime: number;

  beforeEach(() => {
    file = new FileMock();

    currentDate = new Date();
    monthsOld = random.number({ min: 1, max: 12 });
    oldDateTime = new Date(currentDate).setMonth(-monthsOld);

    jest.useFakeTimers('modern');
    jest.setSystemTime(currentDate);
  });

  it('should return false if file was created after the current date reduced of the months old value', () => {
    file.getDateCreated.mockReturnValue(new Date(oldDateTime + 1));

    const result = fileIsOld(file, monthsOld);

    expect(result).toEqual(false);
  });

  it('should return true if file was created at the same time of the current date reduced of the months old value', () => {
    file.getDateCreated.mockReturnValue(new Date(oldDateTime));

    const result = fileIsOld(file, monthsOld);

    expect(result).toEqual(true);
  });

  it('should return true if file was created before the current date reduced of the months old value', () => {
    file.getDateCreated.mockReturnValue(new Date(oldDateTime - 1));

    const result = fileIsOld(file, monthsOld);

    expect(result).toEqual(true);
  });

  it('should always reduce the months passed as argument from the current date', () => {
    file.getDateCreated.mockReturnValue(new Date());
    jest.spyOn(Date.prototype, 'setMonth');

    const positiveNumber = random.number({ min: 1, max: 12 });
    const negativeNumber = -positiveNumber;

    fileIsOld(file, positiveNumber);

    expect(Date.prototype.setMonth).toHaveBeenCalledTimes(1);
    expect(Date.prototype.setMonth).toHaveBeenLastCalledWith(negativeNumber);

    fileIsOld(file, negativeNumber);

    expect(Date.prototype.setMonth).toHaveBeenCalledTimes(2);
    expect(Date.prototype.setMonth).toHaveBeenLastCalledWith(negativeNumber);
  });
});
