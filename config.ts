// This is playwright config file (playwright.config.ts). However, have renamed this file as just config.ts file.
import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./global-setup'),
    timeout: 7200000,
    globalTimeout: 7200000,
    snapshotDir: 'snapshots',
    workers: 2,
    retires: 0,
    reporter: [['allure-playwright'], ['html', {open: 'never'}], ['line']],
    use: {
        baseURL: 'https://automationexercise.com/',
        storageState: require('path').resolve('storageState.json'),
        actionTimeout: 180000,
        navigationTimeout: 180000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'only-on-failure',
        channel: 'chrome',
        trace: 'retain-on-failure',
        launchOptions: {
            slowMo: 100,
        }
    },
    projects: [
        {
            name: 'sanity-tests',
            testDir: 'tests/sanity/',
            testMatch: /.*\.spec\.ts$/,
            fullyParallel: true,
            use: {
                headless: false,
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"]
                },
            },
        },
        {
            name: 'regression-tests',
            testDir: 'tests/regression/',
            testMatch: /.*\.spec\.ts$/,
            fullyParallel: true,
            use: {
                headless: false,
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"]
                },
            },
        },
        {
            name: 'sanity-pipeline',
            testDir: 'tests/sanity/',
            testMatch: /.*\.spec\.ts$/,
            fullyParallel: true,
            use: {
                headless: true,
                viewport: {width: 1920, height: 1080}
            },
        },
        {
            name: 'regression-pipeline',
            testDir: 'tests/regression/',
            testMatch: /.*\.spec\.ts$/,
            fullyParallel: true,
            use: {
                headless: true,
                viewport: {width: 1920, height: 1080}
            },
        },        
    ]        
}
export default config;
