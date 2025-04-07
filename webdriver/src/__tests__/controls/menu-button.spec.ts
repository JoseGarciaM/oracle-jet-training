// webdriver/src/__tests__/controls/menu-button.spec.ts
import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojMenuButton } from "@oracle/oraclejet-webdriver/elements";
import { By, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

describe("Oracle JET Cookbook Menu Button Test", function () {
	let driver: WebDriver;

	before(async function () {
		driver = await DriverManager.getDriver();
		// Navigate to the Menu Buttons overview demo
		await ojwd.get(
			driver,
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=menuButtons&demo=overview"
		);
	});

	it("should open menu button and verify its properties", async function () {
		// Locate the oj-menu-button component by ID ('menuButton')
		const menuButton = await ojMenuButton(driver, By.id("menuButton"));

		// Ensure it's ready for interaction
		await menuButton.whenReady();

		// Verify the button label
		const label = await menuButton.getLabel();
		expect(label).to.equal("File");

		// Check if the button is enabled
		const isEnabled = await menuButton.isEnabled();
		expect(isEnabled).to.be.true;

		// Perform action to open the menu
		await menuButton.doAction();

		// Optionally: Verify menu items visibility or other side-effects
		const menuPopup = await driver.findElement(By.id("menu1"));
		const isMenuDisplayed = await menuPopup.isDisplayed();
		expect(isMenuDisplayed).to.be.true;
	});

	after(async function () {
		await DriverManager.releaseDriver(driver);
	});
});
