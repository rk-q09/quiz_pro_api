/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  moduleNameMapper: {
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@errors/(.*)": "<rootDir>/src/errors/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@routes": "<rootDir>/src/routes"
  }
};
