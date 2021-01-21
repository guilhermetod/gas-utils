module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: '<rootDir>/tests/reports/coverage',
  coveragePathIgnorePatterns: [
    'index.ts$',
  ],
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '^@drive/(.*)$': '<rootDir>/src/drive/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@script/(.*)$': '<rootDir>/src/script/$1',
    '^@spreadsheet/(.*)$': '<rootDir>/src/spreadsheet/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  preset: 'ts-jest',
  reporters: [
    'default',
    ['<rootDir>/node_modules/jest-html-reporter', {
      includeConsoleLog: true,
      includeFailureMsg: true,
      includeSuiteFailure: true,
      outputPath: '<rootDir>/tests/reports/test-report.html',
    }],
  ],
  testEnvironment: 'node',
};
