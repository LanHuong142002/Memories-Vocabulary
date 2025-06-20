module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  collectCoverage: true,
  coverageDirectory: 'coverage', // Custom folder name contain reports
  moduleNameMapper: {
    '^@mocks(.*)$': '<rootDir>src/mocks/$1',
    '^@constants(.*)$': '<rootDir>src/constants/$1',
    '^@assets(.*)$': '<rootDir>src/assets/$1',
    '^@components(.*)$': '<rootDir>src/components/$1',
    '^@helpers(.*)$': '<rootDir>src/helpers/$1',
    '^@contexts(.*)$': '<rootDir>src/contexts/$1',
    '^@hooks(.*)$': '<rootDir>src/hooks/$1',
    '^@services(.*)$': '<rootDir>src/services/$1',
    '^@pages(.*)$': '<rootDir>src/pages/$1',
    '^@layouts(.*)$': '<rootDir>src/layouts/$1',
    '^@routes(.*)$': '<rootDir>src/routes/$1',
    '^@types(.*)$': '<rootDir>src/types/$1',
    '^@themes(.*)$': '<rootDir>src/themes/$1',
    '^@utils(.*)$': '<rootDir>src/utils/$1',
    '^@mocks(.*)$': '<rootDir>src/mocks/$1',
    '^@stores(.*)$': '<rootDir>src/stores/$1',
    '^@themes(.*)$': '<rootDir>src/themes/$1',
    uuid: require.resolve('uuid'),
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|svg|webp|styl|less|sass|scss|png|jpg|otf|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!src/interfaces/**',
    '!src/themes/**',
    '!src/components/GlobalFonts/**',
    '!src/routes/**',
    '!.storybook/main.ts',
    '!.storybook/preview.tsx',
    '!**/*.stories.tsx',
    '!**/*.config.ts',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/constants/**',
    '!**/types/**',
    '!**/styles/**',
    '!src/main.tsx',
    '!src/assets/index.ts',
  ],
};
