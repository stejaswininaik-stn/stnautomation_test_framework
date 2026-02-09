import { Locator, Page} from "@playwright/test";
import * as app from '../..app';
import * as assert from "assert";
import {env} from 'process';
import config from "../../config";
import { CoreUtils } from "../../utils/CoreUtils";

export class LoginPage {
    readonly homePage: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(homePage: Page) {
        this.homePage = homePage;
        this.userName = homePage.locator('//input[@data-qa="login-email"]');
        this.password = homePage.locator('//input[@data-qa="login-password"]');
        this.loginButton = homePage.locator('text="Login"');   
    }

    /**
     * This method will perform the login operation
     */
    async login() {
        try {
            await this.homePage.goto(config.use.baseURL, {
                timeout: app.config.timeouts.pageLoad,
                waitUntil: "load"
            });
        await this.homePage.waitForLoadState('networkidle');
        await this.enterUsernameAndPassword();
        } catch (e) {
            console.log("Exception while logging-in to Automation Exercise application", + String(e));
            assert.fail("Unable to login into the application", + String(e));
        }
    }
    
    /**
     * This method will enter the username and password for login.
     * Throws an error if environment variables are not set
     */
    async enterUsernameAndPassword() {
        try {
            if (!env.WEB_APP_USER) {
                throw new Error("WEB_APP_USER environment variable is not defined");
            }
            await this.userName.type(env.WEB_APP_USER);
            if (!env.WEB_APP_PASS) {
                throw new Error("WEB_APP_PASS environment variable is not defined");
            }
            await this.password.type(env.WEB_APP_PASS);
            await this.loginButton.click();
            await this.homePage.waitForLoadState('domcontentloaded');
        } catch (e) {
            console.log("Exception while entering the username and password" + String(e));
            assert.fail("Unable to enter username and password", + String(e));
        }
    }

    /**
     * This method will wait for the landing page to load
     */
    async waitForLandingPage() {
        try {
            const expectedLandingUrl = 'https://automationexercise.com/';
            let timeout = app.config.tiemouts.pageLoad;
            while(timeout > 0) {
                const currentUrl = await this.homePage.url();
                if(currentUrl.includes(expectedLandingUrl)) {
                    break;
                }
                await this.homePage.waitForTimeout(app.config.sleep.medium);
                timeout = timeout - app.config.sleep.short;
            } 
            if (timeout <= 0) {
                console.log("Application not loaded: Timeout waiting for landing page.");
                assert.fail("Application not loaded within timeout");
            }
        } catch (e) {
            console.log("Exception while waiting for landing page:" + String(e));
            assert.fail("Application not loaded:" + String(e));
        }        
    }

    /**
     * This method will verify the login status
     * @returns a message indicating the login status
     */
    async verifyLoginStatus() {
        try {
            const loggedInStatus = await this.homePage.locator('//*[contains(text(),"Logged in")]');
            if (loggedInStatus.isVisible()){
                console.log("Login was successful, landing page loaded");
                return "Login Successful";
            }
            console.log("Login may have failed");
            return "Login may have failed or did not reach landing page";
        } catch (e) {
            console.log("Exception while verifying login status");
            return "Error:" + String(e);
        }
    }

    /**
     * Navigate to the application URL
     */
    async navigateToApp() {
        try {
            let URL = config.use.baseURL;
            await this.homePage.goto(URL, {timeout: app.config.timeouts.pageLoad});            
        } catch (e) {
            console.log("Exception while navigating to application:" + String(e));
            assert.fail("Unable to navigate to application:" + String(e));
        }
    } 
}