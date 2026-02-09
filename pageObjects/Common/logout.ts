import { Page } from "@playwright/test";
import { CoreUtils } from "../../utils/CoreUtils";

export class LogoutPage {
    readonly page: Page;
    readonly coreUtils: CoreUtils;

    constructor(page: Page) {
        this.page = page;
        this.coreUtils = new CoreUtils(page);
    }

    /**
     * perform logout functionality
     */
    async performLogout(): Promise<void> {
        await this.coreUtils.clickLogout();
        await this.coreUtils.verifyLogout();
    }
}