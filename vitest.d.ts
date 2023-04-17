interface CustomMatchers<R = unknown> {
  toThrowWithCause(cause: string | Error): R

  toHaveCount(count: number): R

  toBeEmptyArray(): R
}

declare namespace Vi {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}

  // Note: augmenting jest.Matchers interface will also work.
}
