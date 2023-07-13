/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  plugins: ['@typescript-eslint', 'react-refresh', 'eslint-plugin-prettier'],
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['packages/client/**/*.ts?(x)'],
      parserOptions: {
        project: 'packages/client/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
