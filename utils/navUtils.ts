import { Page } from "@playwright/test";
import * as assert from "assert";

export class NavUtils {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

/**
 * This method will navigate to specified URL
 */
async navigateTo(header: string) {
    try {
        const headerLocator = this.page.locator(`//button[text()="'+ header +'"]`);
        if(await headerLocator.isVisible().catch(() => false)) {
            await headerLocator.click();
        } 
        await headerLocator.waitFor({state: 'visible', timeout: 15000});
        await headerLocator.scrollIntoViewIfNeeded();
        const overlay = this.page.locator('[data-testid="overlay"], .modal, .spinner, [role="dialog"]');
        if(await overlay.isVisible().catch(() => false)){
            await overlay.waitFor({state: 'hidden', timeout: 10000}).catch(() => {});
        }
        await headerLocator.click({force: true});
    } catch (e) {
        console.log("Exception while navigating to Header:" +String(e));
        assert.fail("Unable to navigate to Header:" +String(e));
        }
    }
}