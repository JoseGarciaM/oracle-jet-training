import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojCheckboxset } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-checkboxset Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (e.g., Chrome)
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook page for checkboxsets => "states" demo
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=checkboxsets&demo=states"
		);
	});

	after(async function () {
		// Release/quit the driver after tests
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-checkboxset is displayed and ready", async function () {
		// 1) Locate the oj-checkboxset by ID (example: "checkboxset1"). Check the actual ID in the DOM.
		const checkboxSet = await ojCheckboxset(driver, By.id("checkboxset1"));
		// Wait until it's fully ready (BusyContext is clear)
		await checkboxSet.whenReady();

		// 2) Confirm it's displayed
		const displayed = await checkboxSet.isDisplayed();
		expect(displayed).to.be.true;

		// 3) Confirm it's enabled
		const enabled = await checkboxSet.isEnabled();
		expect(enabled).to.be.true;

		// 4) Retrieve the current selected values
		const initialValue = await checkboxSet.getValue();
		console.log("Initial selected values:", initialValue);
		// e.g. could be [], ["option1"], etc., depending on the initial state
	});

	it("should select multiple checkboxes and verify them", async function () {
		// Re-locate or reuse the same reference
		const checkboxSet = await ojCheckboxset(driver, By.id("checkboxset1"));
		await checkboxSet.whenReady();

		// Suppose we want to select two or more options in the set
		const newValues = ["optionA", "optionC"];
		await checkboxSet.changeValue(newValues);

		// Verify the updated selection
		const updatedValue = await checkboxSet.getValue();
		expect(updatedValue).to.deep.equal(newValues);

		// You can also combine selection or test partial checks, e.g.
		// add "optionB" => [...updatedValue, "optionB"]
	});
});
