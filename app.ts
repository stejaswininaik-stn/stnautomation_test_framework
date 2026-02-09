import {chromium} from "@playwright/test";

export const config = {
    app: "automation-exercise",
    appName: "Automation Excercise Portal for Automation Testing",
    assessmentAccess: false,
    bowserName: chromium,
    headless: process.env.CI ? true : false,
    channel: 'chrome',
    sleep: {
        short: 1000,
        medium: 3000,
        long: 5000,
        extralong: 10000
    },
    timeouts: {
        actionBtn: 3000,
        screenShot: 5000,
        pageLoad: 120000,
        download: 300000
    },
};