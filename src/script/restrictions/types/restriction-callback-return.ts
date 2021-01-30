import { RestrictionPassOptions } from '@script/restrictions/types/restriction-pass-options';

export type RestrictionCallbackReturn<T extends RestrictionPassOptions> = ReturnType<T['onSuccess']> | null;
