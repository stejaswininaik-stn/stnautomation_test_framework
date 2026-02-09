import { Page, test } from '@playwright/test';
import { InitializeBrowser } from '../../services/InitializeBrowser';
import { NavUtils } from '../../utils/navUtils';
import { Homepage } from '../../pageObjects/Homepage/homepage';
import { CoreUtils } from '../../utils/CoreUtils';
import { LoginPage } from '../../pageObjects/Common/loginPage';

test.describe('Homepage Test', ()=>{
    let page: Page;
    let navUtils: NavUtils;
    let coreUtils: CoreUtils;
    let loginPage: LoginPage;
    let homePage: Homepage;

    test.beforeAll(async() => {
        page = await InitializeBrowser.getPage();
        loginPage = new LoginPage(page);
        await loginPage.navigateToApp();
        navUtils = new NavUtils(page);
        homePage = new Homepage(page);
        coreUtils = new CoreUtils(page);
    })

    test.beforEach(async() => {
        await page.waitForTimeout(1000);
        await coreUtils.printConsoleErrorLogs();
    })

    test.afterAll(async() =>{
        try{
            if(page) {
                try {
                    await page.keyboard.press('Escape');
                    await page.waitForTimeout(1000);
                } catch (e){
                    console.log("Error while cleaning dialog:", e);
                }
            }
            await InitializeBrowser.closeBrowserIfOpen();
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("Error in afterall hook:", error);
            console.log("Continuing despite cleanup error...");
        }
    });

    test.afterEach(async({page}, testInfo) => {
        try {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);        
        await page.waitForLoadState('networkidle');
        await navUtils.navigateTo("Home");
        await coreUtils.waitForLoading();
        if (testInfo.status !== testInfo.expectedStatus && page && !page.isclosed()) {
            const screenshot = await page.screenshot();
            await testInfo.attach('Screenshot', {body: screenshot, contentType: 'image/png'});
        }
    } catch(e) {
        console.log("Error in aftereach hook:" , String(e));
    }
});

// specId: Test_scenario_01
test('should verify if homepage and its main sections are visible', async () => {
    await navUtils.navigateTo("Home");
    await coreUtils.waitForLoading();
    await homePage.verifyHomepageIsVisble();
    await homePage.verifyHomepageContents();
});
});