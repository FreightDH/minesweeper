module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint'],
  root: true,
  rules: {
    'import/no-mutable-exports': 'off',
    'no-mutable-exports': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    'max-lines-per-function': ['error', 40],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
  },
};
