const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "w2hupd",
  e2e: {
    setupNodeEvents(on, config) {
      // return the updated config object
      return config;
    },
    baseUrl: "http://localhost:8080",
    specPattern: "cypress/integration/**/*.js",
    screenshotOnRunFailure: true,
    video: true,
  },
});
