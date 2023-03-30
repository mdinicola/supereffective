module.exports = {
  root: true,
  extends: ['turbo', 'prettier'],
  rules: {},
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
