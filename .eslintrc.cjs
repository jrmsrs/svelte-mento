module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020, //2022,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs']
}
