/**
 * menu-button.spec.ts
 *
 * E2E test for the Core Pack “Menu Button” demo:
 * https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=menuButtonsCorepack&demo=overview
 */
import { Builder, WebDriver, By } from "selenium-webdriver";
import {
        findMenuButton,
        MenuButtonWebElement,
} from "@oracle/oraclejet-core-pack/webdriver";
import { expect } from "chai";

describe("JET Cookbook – Core Pack Menu Button", () => {
        let driver: WebDriver;
        const URL =
                "https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=menuButtonsCorepack&demo=overview";

        before(async () => {
                driver = await new Builder().forBrowser("chrome").build();
                await driver.get(URL);
        });

        after(async () => {
                await driver.quit();
        });

        it("opens the File menu when clicked", async () => {
                // Locate the component using the Core Pack Test Adapter
                const menuBtn: MenuButtonWebElement = await findMenuButton(
                        driver,
                        // Adjust locator if additional menu buttons are added
                        By.css("oj-c-menu-button")
                );

                await menuBtn.whenReady();
                expect(await menuBtn.getLabel()).to.equal("File");
                expect(await menuBtn.getDisabled()).to.be.false;

                await menuBtn.click();

                // Verify the menu is displayed after clicking
                const menu = await driver.findElement(By.css("oj-c-menu"));
                const displayed = await menu.isDisplayed();
                expect(displayed).to.be.true;
        });
});
