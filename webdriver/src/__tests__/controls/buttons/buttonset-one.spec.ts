import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButtonsetOne } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-buttonset-one Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.)
		driver = await DriverManager.getDriver();

		// Navigate to the buttonsetone "oneOverview" demo
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=buttonsetone&demo=oneOverview"
		);
	});

	after(async function () {
		// Release/quit the driver
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-buttonset-one is displayed and ready", async function () {
		// Locate the oj-buttonset-one by ID, e.g. "buttonsetOne1" (check actual ID in the DOM)
		const buttonsetOne = await ojButtonsetOne(driver, By.id("buttonsetOne1"));
		await buttonsetOne.whenReady();

		// Confirm the element is displayed
		const displayed = await buttonsetOne.isDisplayed();
		expect(displayed).to.be.true;

		// Optionally, check its disabled state
		const isDisabled = await buttonsetOne.getDisabled();
		expect(isDisabled).to.be.false; // or .to.be.true if that’s expected

		// Retrieve and log the current selected value
		const initialValue = await buttonsetOne.getValue();
		console.log("Initial selected value:", initialValue);
	});

	it("should select a different single value and verify it", async function () {
		// Suppose we want to change the selection to "optionB"
		const buttonsetOne = await ojButtonsetOne(driver, By.id("buttonsetOne1"));
		await buttonsetOne.whenReady();

		// Use changeValue(...) to pick exactly one option
		await buttonsetOne.changeValue("optionB");

		// Verify the updated value
		const updatedValue = await buttonsetOne.getValue();
		expect(updatedValue).to.equal("optionB");
	});
});
