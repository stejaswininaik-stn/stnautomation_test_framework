import { test } from "@playwright/test";
import { LoginPage } from "../../pageObjects/Common/loginPage";
import { LogoutPage } from "../../pageObjects/Common/logout";
import { InitializeBrowser } from "../../services/InitializeBrowser";

test.describe("Logout Test", () => {
    let loginPage: LoginPage;
    let logoutPage: LogoutPage;

    test.beforeAll(async ({browser}) => {
        const page = await InitializeBrowser.getPage();
        loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
    });

    test("Logout from the application", async () => {
        await logoutPage.performLogout();
    });
});