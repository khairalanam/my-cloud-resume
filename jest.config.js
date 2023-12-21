module.exports = {
  testEnvironment: "jsdom",
  globals: { TextEncoder: TextEncoder, TextDecoder: TextDecoder },
  coverageThreshold: {
    global: {
      functions: 50,
      statements: 20,
    },
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.js"],
};
