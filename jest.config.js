// Simple Jest config without jest-expo preset to avoid HMR issues
module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/client/__tests__/globalSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/client/__tests__/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^react-native$': 'react-native-web',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@tanstack/.*|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-keyboard-controller|react-native-web)',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/.cache/',
    '<rootDir>/node_modules/.cache/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.cache/',
  ],
  collectCoverageFrom: [
    'client/**/*.{ts,tsx}',
    '!client/**/*.d.ts',
    '!client/__tests__/**',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  haste: {
    forceNodeFilesystemAPI: true,
    throwOnModuleCollision: false,
  },
  fakeTimers: {
    enableGlobally: false,
  },
};
