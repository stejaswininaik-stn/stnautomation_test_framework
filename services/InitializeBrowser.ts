import { Browser, BrowserContext, Page } from "@playwright/test";
import { config } from "../app";
import * as assert from "assert";

export class InitializeBrowser {

    private static instances = new Map<string, InitializeBrowser>();
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private instanceId: string;

    private constructor(instanceId: string){
        this.instanceId = instanceId;
    }
    
    /**
     * Get or create a browser instance for the current test suite
     */
    static async getPage(): Promise<void> {
        const instanceId = this.getInstanceId();
        let instance = this.instances.get(instanceId);
        if(!instance) {
            instance = new InitializeBrowser(instanceId);
            this.instances.set(instanceId, instance);
        }
        return await instance.initializePage();
    }

    /**
     * Closed browser for the current test suite
     */
    static async closeBrowserIfOpen(): Promise<void>{
        const instanceId = this.getInstanceId();
        const instance = this.instances.get(instanceId)
        if(instance) {
            await instance.cleanUp();
            this.instances.delete(instanceId);
        }
    }

    /**
     * Generate unique instance id based on test file
     */
    private static getInstanceId(): string {
        const stack = new Error().stack || '';
        const testFileMatch = stack.match(/([\w-]+\.spec\.[jt]s)/);
        return testFileMatch ? testFileMatch[1] : `instance-${Date.now()}-$(Math.random()}`;
    }

    /**
     * Initialize page for this instance
     */
    private async initializePage(): Promise<void> {
        try {
            if(this.page && !this.page.isClosed()) {
                return this.page;
            }
            await this.cleanUp();
            this.browser = await config.browserName.launch({headless: config.headless});
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
            return this.page;
        }
    }

    /**
     * Clean this instance's browser resources
     */
    private async cleanUp(): Promise<void> {
        try {
            if(this.page && !this.page.isClosed()) {
                await this.page.close().catch(() => {});
                this.page = null;
            }
            if(this.context) {
                await this.context.close().catch(() => {});
                this.context = null;
            }
            if(this.browser && this.browser.isConnected()) {
                await this.browser.close().catch( () => {});
                this.browser = null;
            }
        } catch (e) {
            console.log(`Execution in closing browser for ${this.instanceId}: ${String(e)}`);
            console.log("Continuing despte browser cleanup error ...");
        }
    }
}