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
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^uuid$': require.resolve('uuid'),
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
};

export default config;
