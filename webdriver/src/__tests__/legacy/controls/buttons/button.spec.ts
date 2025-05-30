import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButton } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook Button Test", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance via DriverManager or your custom method
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook pushButtons demo
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pushButtons&demo=pushButton"
		);
	});

	it("should click the push button and verify it is displayed", async function () {
		// Use ojButton(driver, By.id(...)) to get a Promise<OjButton>
		const button = await ojButton(driver, By.id("button1"));
		// or "pushButton1", "button1", etc., depending on the actual DOM

		// Wait until the button's BusyContext is ready
		await button.whenReady();

		// Check that the button is displayed
		const isDisplayed = await button.isDisplayed();
		expect(isDisplayed).to.be.true;

		// Optionally, check that the button is enabled
		const enabled = await button.isEnabled();
		expect(enabled).to.be.true;

		// Optionally, get the label
		const label = await button.getLabel();
		// Just for demonstration; you could compare with an expected text
		console.log("Button label is:", label);

		// Finally, click the button
		await button.click();

		// If the button triggers a side effect, you can verify it here.
	});

	after(async function () {
		// Release / quit the driver
		await DriverManager.releaseDriver(driver);
	});
});
