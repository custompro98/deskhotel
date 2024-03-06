export function assertNever(x: never): never {
  throw new Error(`Unexpected object - ${x}`);
}

export function isPresent<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
