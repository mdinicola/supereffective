import { expect } from 'vitest'

const catchError = callback => {
  try {
    callback()
  } catch (error) {
    return error
  }
}

const customMatchers = {
  toThrowWithCause(received, cause) {
    const err = catchError(received)
    const passes = err instanceof Error && err.cause === cause
    const actualCause = String(err ? `got: ${err.cause}` : 'no error was thrown')
    console.log('Error Cause', actualCause)

    if (err && err.cause === undefined) {
      console.error('Error was thrown, but cause was undefined. Error:', err)
    }

    return passes
      ? {
          pass: true, // not.toBeEmptyArray
          message: () => `Expected callback not to throw an Error with cause '${cause}'`,
        }
      : {
          pass: false, // .toBeEmptyArray
          message: () =>
            `Expected callback to throw an Error with cause '${cause}', but ${actualCause}`,
        }
  },

  toHaveCount(received, count) {
    const passes = Array.isArray(received) && received.length === count

    return passes
      ? {
          pass: true, // not.toBeEmptyArray
          message: () => `Expected value not to be an array with ${count} items`,
        }
      : {
          pass: false, // .toBeEmptyArray
          message: () => `Expected value to be an empty array with ${count} items`,
        }
  },

  toBeEmptyArray(received) {
    const passes = Array.isArray(received) && received.length === 0

    return passes
      ? {
          pass: true, // not.toBeEmptyArray
          message: () => `Expected value not to be an empty array`,
        }
      : {
          pass: false, // .toBeEmptyArray
          message: () => `Expected value to be an empty array`,
        }
  },
}

expect.extend(customMatchers)
