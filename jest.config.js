export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {},
  collectCoverageFrom: [
    'public/js/*.js',
    '!public/js/mock_data.js',
    '!public/js/**/*.test.js'
  ],
  coverageThreshold: {
    global: {
      lines: 50,
      functions: 50,
      branches: 40
    }
  }
};
