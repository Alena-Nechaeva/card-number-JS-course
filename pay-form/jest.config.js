module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
    '^.+\\.scss$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
};
