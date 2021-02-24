import { Restriction } from '@script/restrictions/types/restriction';

export type RestrictionManager = {
  readonly add?: Restriction[];
  readonly both?: Restriction[];
  readonly pass?: Restriction[];
  readonly persistent?: Restriction[];
};
