import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojColorPalette } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-color-palette Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (e.g., Chrome)
		driver = await DriverManager.getDriver();

		// Navigate to the paletteGridSwatchSizes demo
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=colorPalette&demo=paletteGridSwatchSizes"
		);
	});

	after(async function () {
		// Release/quit the driver after tests
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-color-palette is displayed and read its initial value", async function () {
		// 1) Locate the oj-color-palette by ID (e.g. "colorPalette1").
		//    Check the actual ID in the Cookbook DOM.
		const colorPalette = await ojColorPalette(driver, By.id("colorPalette1"));
		await colorPalette.whenReady();

		// 2) Verify it’s displayed
		const displayed = await colorPalette.isDisplayed();
		expect(displayed).to.be.true;

		// 3) (Optional) Confirm it’s not disabled (by default)
		const isDisabled = await colorPalette.getDisabled();
		// Note: The color palette might not respect the disabled property, or it might be deprecated
		console.log("Disabled?", isDisabled);

		// 4) Retrieve the current color value
		const initialColor = await colorPalette.getValue();
		console.log("Initial color value:", initialColor);
	});

	it("should change the selected color value and verify", async function () {
		const colorPalette = await ojColorPalette(driver, By.id("colorPalette1"));
		await colorPalette.whenReady();

		// Suppose we pick a new color – e.g. #FF0000
		const newColor = "#FF0000";
		await colorPalette.changeValue(newColor);

		// Retrieve and confirm the updated value
		const updatedValue = await colorPalette.getValue();
		expect(updatedValue).to.equal(newColor);
	});
});
