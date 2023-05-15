import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'svg-jest',
    '.+\\.(css|png|webp|)$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // config to using methods of jest-dom library
  collectCoverage: true,
  coverageDirectory: 'coverage', // Custom folder name contain reports
  moduleNameMapper: {
    '^@constants(.*)$': '<rootDir>src/constants/$1',
    '^@assets(.*)$': '<rootDir>src/assets/$1',
    '^@components(.*)$': '<rootDir>src/components/$1',
    '^@helpers(.*)$': '<rootDir>src/helpers/$1',
    '^@contexts(.*)$': '<rootDir>src/contexts/$1',
    '^@services(.*)$': '<rootDir>src/services/$1',
    '^@pages(.*)$': '<rootDir>src/pages/$1',
    '^@interfaces(.*)$': '<rootDir>src/interfaces/$1',
    '^@hooks(.*)$': '<rootDir>src/hooks/$1',
    '^@layouts(.*)$': '<rootDir>src/layouts/$1',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>src/__mocks__/image.ts',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.stories.tsx',
    '!**/*.config.ts',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/constants/**',
    '!**/types/**',
    '!**/styles/**',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};

export default config;
