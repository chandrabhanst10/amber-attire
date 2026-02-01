/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    setupFilesAfterEnv: [],
    collectCoverageFrom: [
        "src/**/*.{js,ts}",
        "!src/**/*.d.ts",
        "!src/index.ts",
        "!src/db/**/*"
    ]
};
