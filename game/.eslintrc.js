module.exports = {
  root: true,
  env: {
    browser: true,
    'cypress/globals': true,
  },
  plugins: ['prettier', 'cypress'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
  },
};
