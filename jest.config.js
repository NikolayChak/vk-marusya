/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      '\\.(jpeg|jpg|png|svg|woff2)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
      "^.+\.tsx?$": ["ts-jest",{}],
    },
  };
  