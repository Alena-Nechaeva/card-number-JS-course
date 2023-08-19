module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
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
    // 'arrow-body-style': 'off',
    // 'prefer-arrow-callback': 'off',
  },
};
