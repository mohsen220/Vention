const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // return the updated config object
      return config
    },
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/integration/**/*.js'
  },
})
