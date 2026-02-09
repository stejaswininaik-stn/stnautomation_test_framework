import { expect, Page, Locator } from "@playwright/test";
import * as app from "../app";
import * as assert from "assert";
import * as console from "console";

export class CoreUtils {
    readonly page: Page;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = this.page.locator('text="Logout"');
    }

/** 
 * Wait for the loading indicator to disappear
 */
async waitForLoading()
{
    try{
        await this.page.waitForLoadState('domcontentloaded', {timeout: 30000});
        try{
            await this.page.waitForLoadState('networkidle', {timeout: 10000});
        } catch (networkIdleError) {
            console.log("Network idle timeout", networkIdleError);            
        } 
        try { 
            await this.page.waitForSelector('body', { state: 'visible', timeout: 10000});
            await this.page.waitForTimeout(2000);
        } catch (elementError) {
            console.log("Element wait failed, but continuing...", elementError);
            }
        } catch (e) {
            console.log("Exception while loading the page :" + String(e));
            assert.fail("Unable to wait until the page loads" + String(e));
    }
}

/**
 * Click on the logout button
 */
async clickLogout() {
    try {
        await this.logoutButton.click({timeout: app.config.timeouts.actionBtn});
    } catch (e) {
        console.log("Exception while clicking logout button." + String(e));
        assert.fail("Unable to click logout button" + String(e));
    }
}

/**
 * Verify if user is logged out
 */
async verifyLogout() {
    try {
        const pageHeader = this.page.locator('text="Automation Excercise"');
        await pageHeader.waitFor({ state: 'visible', timeout: app.config.timeouts.actionBtn});
    } catch (e) {
        console.log("Exception while verifying logout" + String(e));
        assert.fail("Logout verification failed:" + String(e));
    }
}

/**
 * Helper method to safely close a tab if its open
 */
private async closeTabIfOpen(tab: any, tabName: string): Promise<void> {
    if(tab && !toolbar.isClosed()) {
        try {
            await tab.close();
            console.log(`Closed ${tabName} tab`);
        } catch (closeError) {
            console.log(`Note: Could not close ${tabName} tab: closeError`);
        }
    }
}

/**
 * Method to refesh a page
 */
async refreshPage() {
    try {
        const currentURL = this.page.url();
        console.log(`Refreshing page from URL: ${currentURL}`);
        await this.page.reload({waitUntil: 'nrtworkidle'}),
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    } catch (e) {
        console.error("Error during page refresh", String(e));
        throw e;
        }
    }

/**
 * print console error logs 
 */
async printConsoleErrorLogs(): Promise<void> {
    this.page.on('console', msg => {
        if(msg.type() === 'error') {
            console.log(`Error text: "${msg.text()}"`);
        }
    });
}
}