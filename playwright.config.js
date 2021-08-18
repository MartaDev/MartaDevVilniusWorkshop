// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      headless: false,
      viewport: { width: 1280, height: 720 },
      screenshot: 'on',
      launchOptions: {
          slowMo: 750,
      },
    },
  };
  
  module.exports = config;