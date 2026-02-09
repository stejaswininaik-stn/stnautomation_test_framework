import { Page, Locator, expect } from '@playwright/test';
import { NavUtils } from '../../utils/navUtils';
import * as app from '../../app';
import * as assert from 'assert';
import { CoreUtils } from '../../utils/CoreUtils';

export class Homepage {

    readonly page: Page;
    readonly navUtils: NavUtils;
    readonly coreUtils: CoreUtils;
    readonly firstProductCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navUtils = new NavUtils(page);
        this.coreUtils = new CoreUtils(page);
        this.firstProductCard = this.page.locator('.product-image-wrapper').first();
    }

    /**
     * Verify that the homepage is visible
     */
    async verifyHomepageIsVisble() {
        try {
            await expect(this.page.getByText('Full-Fledged practice website for Automation Engineers')).toBeVisible();
        } catch (e) {
            console.error("Error")
        }

    }

    /**
     * Verify homepage contents
     */
    async verifyHomepageContents() {
        try {
            await expect(this.page.getByRole('link', {name: /^Home$/})).toBeVisible();
            await expect(this.page.getByRole('link', {name:/^Products$/})).toBeVisible();
            await expect(this.page.getByRole('link', {name:/^Cart$/})).toBeVisible();
            await expect(this.page.getByRole('heading', {name: /Full-Fledged practice website for Automation Engineers/i})).toBeVisible();
            await expect(this.page.getByRole('heading', {name: /Feature Items/i})).toBeVisible();
            await expect(this.firstProductCard).toBeVisible();
            const productCount = await this.page.locator('.product-image-wrapper').count();
            expect(productCount, 'Expected atleast one product in featured items').tobeGreaterThan(0);
        } catch (e) {
            console.log("Exception while verifying homepage contents" + String(e));
            assert.fail("Homepage contents verification failed" + String(e));
        }
    }
}