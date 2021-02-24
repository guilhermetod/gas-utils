export interface RestrictionPassOptions<S = unknown, R = unknown> {
  readonly onSuccess: () => S,
  readonly onFailure?: () => R,
  readonly sleepTime?: number,
  readonly timeout?: number,
}
