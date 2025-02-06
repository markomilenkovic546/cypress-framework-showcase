import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function resetDbState() {
    try {
        return null;
    } catch (error) {
        console.error('Error resetting database state:', error);
        throw error;
    }
}

export default defineConfig({
    e2e: {
        chromeWebSecurity: false,
        specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
        reporter: 'cypress-mochawesome-reporter',
        testIsolation: true,
        video: true,
        videoCompression: 25,
        videosFolder: 'cypress/videos',
        screenshotOnRunFailure: true,
        screenshotsFolder: 'cypress/screenshots',
        setupNodeEvents(on, config) {
            // Implement Node event listeners
            on('task', {});

            // Attach plugins
            require('cypress-mochawesome-reporter/plugin')(on); // Mochawesome reporter
            config = require('@cypress/grep/src/plugin')(config); // Cypress grep plugin modifies `config`

            return config;
        },
        baseUrl: process.env.BASE_URL,
        env: {
            apiBaseUrl: process.env.API_BASE_URL
        }
    }
});
