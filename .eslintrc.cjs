module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
    //'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    ecmaVersion: 2020, //2022,
    sourceType: 'module'
    // tsconfigRootDir: __dirname,
    // project: ['./tsconfig.json']
    // extraFileExtensions: ['.svelte']
  },
  env: {
    // es6: true,
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  // settings: {
  //   'svelte3/typescript': require('typescript'),
  //   // ignore style tags in Svelte because of Tailwind CSS
  //   // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
  //   'svelte3/ignore-styles': () => true
  // },
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs']
  //ignorePatterns: ['node_modules']
}
