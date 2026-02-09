import {FullConfig} from '@playwright/test';
import {InitializeBrowser} from "./services/InitializeBrowser";
import {LoginPage} from "./pageObjects/Common/loginPage";
import * as assert from "assert";
import {CoreUtils} from "./utils/CoreUtils";

async function globalSetup(config: FullConfig) {
    const maxTries = 3;
    for (let i = 0; i <= maxTries; i++){
        try{
            const page = await InitializeBrowser.getPage();
            const loginPage = new LoginPage(page);
            await loginPage.login();
            const coreUtils = new CoreUtils(page);
            await page.waitForTimeout(2000);
            await loginPage.waitForLandingPage();
            await loginPage.verifyLoginStatus();
            await page.context().storageState({path: 'storageStage.json'});
            await page.close();
            break;
        } catch (e){
            console.log("Exception in global setup. Retrying attempt:" + i + " " + String(e));
            if (i == maxTries) {
                console.log("Max atttempt reached for re-trying the login through global setup. Therefore, terminating the job");
                assert.fail("Unable to login through global-setup" + String(e));
            }
        }
    }
}
export default globalSetup;