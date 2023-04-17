import { defineConfig } from 'vitest/config'

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
  test: {
    setupFiles: __dirname + '/vitest.setup.js',
    // speed up since tests don't rely on css
    // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts#L14-L16
    // css: false,
  },
})
