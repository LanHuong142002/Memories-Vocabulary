import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'svg-jest',
    '.+\\.(css|png|webp|)$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // config to using methods of jest-dom library
  moduleNameMapper: {
    '^@constants$': '<rootDir>/constants/$1',
    '^@components$': '<rootDir>/components/$1',
    '^@helpers$': '<rootDir>/helpers/$1',
    '^@contexts$': '<rootDir>/contexts/$1',
    '^@services$': '<rootDir>/services/$1',
    '^@pages$': '<rootDir>/pages/$1',
    '^@hooks$': '<rootDir>/hooks/$1',
    '^@layouts$': '<rootDir>/layouts/$1',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/*.stories.tsx',
    '!**/*.config.ts',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/constants/**',
    '!**/types/**',
    '!**/styles/**',
  ],
};

export default config;
