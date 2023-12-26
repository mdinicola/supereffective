if (process.env.CI === 'true') {
  /**
   * @type {Array<keyof typeof console>}
   */
  const consoleFunctionNames = ['debug', 'info', 'log', 'warn', 'error']
  const originalWarn = console.warn

  for (const funcName of consoleFunctionNames) {
    const originalFn = console[funcName]
    console[funcName] = (...data) => {
      originalFn.apply(console, data)
      originalWarn.apply(console, [
        `[eslint.rules.no-console] console.${funcName} has been triggered!`,
      ])
    }
  }
}

// ENV variables for tests:
process.env.DEBUG_MODE = '0'
process.env.LOCALE_LANGUAGE = 'en'
