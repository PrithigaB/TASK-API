// jest.config.js
module.exports = {
  testEnvironment: 'node',
  // Run this before every test file, in the same process (so beforeAll/afterAll hooks apply)
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 20000, // in-memory Mongo can take a moment to boot on first run
};
