import { breakdownRestrictionManager_ } from '@script/restrictions/functions/breakdown-restriction-manager';
import { Restriction } from '@script/restrictions/types/restriction';
import { buildRandomRestrictionManager } from '@tests/mocks/internal/build-random-restriction-manager';

describe('breakdownRestrictionManager', () => {
  let add: Restriction[];
  let pass: Restriction[];
  let both: Restriction[];

  beforeEach(() => {
    ({ add, pass, both } = buildRandomRestrictionManager());
  });

  describe('restrictionsToAdd', () => {
    it('should mix the restrictions to add and restrictions to do both when both are present', () => {
      const { restrictionsToAdd } = breakdownRestrictionManager_({ add, both });

      expect(restrictionsToAdd).toEqual([...both, ...add]);
    });

    it('should return only the restrictions to add or restrictions do both if one of them is missing', () => {
      const resultWithOnlyAdd = breakdownRestrictionManager_({ add }).restrictionsToAdd;
      const resultWithOnlyBoth = breakdownRestrictionManager_({ both }).restrictionsToAdd;

      expect(resultWithOnlyAdd).toEqual(add);
      expect(resultWithOnlyBoth).toEqual(both);
    });
  });

  describe('restrictionsToPass', () => {
    it('should mix the restriction to pass and restriction to do both when both are present', () => {
      const { restrictionsToPass } = breakdownRestrictionManager_({ pass, both });

      expect(restrictionsToPass).toEqual([...both, ...pass]);
    });

    it('should return only the restrictions to pass or restrictions do both if one of them is missing', () => {
      const resultWithOnlyPass = breakdownRestrictionManager_({ pass }).restrictionsToPass;
      const resultWithOnlyBoth = breakdownRestrictionManager_({ both }).restrictionsToPass;

      expect(resultWithOnlyPass).toEqual(pass);
      expect(resultWithOnlyBoth).toEqual(both);
    });
  });

  describe('restrictionsToRemoveAtTheEnd', () => {
    it('should return the restrictions to add if there is no persistent restrictions', () => {
      const {
        restrictionsToAdd,
        restrictionsToRemoveAtTheEnd,
      } = breakdownRestrictionManager_({ add, both });

      expect(restrictionsToRemoveAtTheEnd).toEqual(restrictionsToAdd);
    });

    it('should return the restrictions to add that are not included in the persistent restrictions array', () => {
      const persistent = add;
      const {
        restrictionsToAdd,
        restrictionsToRemoveAtTheEnd,
      } = breakdownRestrictionManager_({ add, both, persistent });

      expect(restrictionsToAdd).toEqual([...both, ...add]);
      expect(restrictionsToRemoveAtTheEnd).toEqual(both);
    });
  });
});
