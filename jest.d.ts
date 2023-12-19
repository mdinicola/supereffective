import '@jest/types'

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * @deprecated Assert with error.name instead
       */
      toThrowWithCause(expected: any): R
    }
  }
}
