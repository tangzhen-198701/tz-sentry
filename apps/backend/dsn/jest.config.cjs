/* global module */

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testMatch: ['<rootDir>/test/**/*.spec.ts'],
    transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
    testEnvironment: 'node',
    cacheDirectory: '<rootDir>/.jest-cache',
}
