import { defineConfig } from 'tsup'

import entries from './tsup.entries.config'

export default defineConfig(
  entries.map(entry => {
    const cssEntries = Object.fromEntries(
      Object.entries(entry.entry || {}).filter(([, value]) => value.includes('.css'))
    )

    return {
      ...entry,
      entry: cssEntries,
      dts: false,
      clean: false,
      target: 'esnext',
      format: ['esm'],
    }
  })
)
