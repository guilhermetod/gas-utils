import { RestrictionEffect } from '@script/restrictions/types/restriction-effect';

export interface RestrictionBase {
  readonly action: string,
  readonly effect: RestrictionEffect,
  readonly id: string,
}

export interface Restriction extends RestrictionBase {
  readonly duration: number
}

export interface ActiveRestriction extends RestrictionBase {
  readonly expirationTime: number
}
