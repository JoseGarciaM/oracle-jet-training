// webdriver/src/__tests__/controls/button.spec.ts
import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButton } from "@oracle/oraclejet-webdriver/elements";
import { By, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

describe("Oracle JET Cookbook Button Test", function () {
	let driver: WebDriver;

	before(async function () {
		driver = await DriverManager.getDriver();
		// Navigate directly to the button demo component
		await ojwd.get(
			driver,
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pushButtons&demo=pushButton"
		);
	});

	it("should click the primary button and verify its properties", async function () {
		// Select the primary button by id as shown in the JET cookbook demo
		const button = await ojButton(driver, By.id("button1"));

		// Ensure button is ready and visible
		await button.whenReady();

		// Verify the button label
		const label = await button.getLabel();
		expect(label).to.equal("Button");

		// Verify the button is enabled
		const isEnabled = await button.isEnabled();
		expect(isEnabled).to.be.true;

		// Click the button
		await button.click();

		// You might want to test side effects of clicking (such as observing a message or event).
		// This example checks for button click interaction visually or logs. Adjust as needed.
	});

	after(async function () {
		await DriverManager.releaseDriver(driver);
	});
});
