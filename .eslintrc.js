module.exports = {
  root: true,
  settings: {
    next: {
      rootDir: ['packages/*/'],
    },
  },
  extends: ['next', 'next/core-web-vitals', 'turbo', 'prettier'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/.next/**',
    '**/out/**',
    '**/dist/**',
    '**/generated/**',
  ],
  rules: {
    // nextjs
    '@next/next/no-img-element': 'warn',
    '@next/next/no-html-link-for-pages': 'warn',
    'jsx-a11y/alt-text': 'error',
    // components
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off',
  },
  plugins: ['import', 'react', 'jsx-a11y'],
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
      env: {
        node: true,
        commonjs: true,
      },
    },
  ],
}
