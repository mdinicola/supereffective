import type { Options } from 'tsup'

// const ignoreWatch = ['**/dist/**', '**/node_modules/**', '*.test.ts', '**/styled-system/**']
const ignoreWatch = ['**/dist/**', '*.test.ts']

const envName = process.env.NODE_ENV ?? 'development'
const envAssetsUrl = process.env.PKM_ASSETS_URL ?? undefined

const commonOptions: Options = {
  outDir: './dist',
  format: ['esm'],
  target: 'es2020',
  ignoreWatch,
  clean: true,
  sourcemap: true,
  splitting: true,
  skipNodeModulesBundle: true,
  external: ['node_modules'],
  define: {
    'process.env.NODE_ENV': `"${envName}"`,
    'process.env.PKM_ASSETS_URL': `${envAssetsUrl ? `"${envAssetsUrl}"` : 'undefined'}`,
  },
}

// const cssOptions: Options = {
//   outDir: './dist',
//   format: [],
//   ignoreWatch,
//   clean: true,
//   sourcemap: true,
//   splitting: false,
//   external: ['node_modules'],
// }

const entries: Options[] = [
  {
    entry: {
      index: './src/index.ts',
    },
    ...commonOptions,
    minify: false,
    dts: true,
  },
  {
    entry: {
      styles: './src/styles.css',
    },
    ...commonOptions,
    minify: false,
    dts: false,
  },
  {
    entry: {
      'index.min': './src/index.ts',
    },
    ...commonOptions,
    minify: true,
    dts: true,
  },
  {
    entry: {
      'styles.min': './src/styles.css',
    },
    ...commonOptions,
    minify: true,
    dts: false,
  },
]

export default entries
