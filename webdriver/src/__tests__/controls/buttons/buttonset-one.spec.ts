import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButtonsetOne } from "@oracle/oraclejet-webdriver/elements";
import { By, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

describe("Oracle JET Cookbook Buttonset One Test", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire the WebDriver
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook "Buttonset One" demo
		await ojwd.get(
			driver,
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=buttonsetone&demo=oneOverview"
		);
	});

	it("should select a single toggle option and verify selection", async function () {
		// Locate the oj-buttonset-one via its ID in the Cookbook
		// Check DevTools for the correct 'id' or a suitable locator
		const buttonsetOne = await ojButtonsetOne(driver, By.id("buttonsetOne"));

		// Ensure the element is ready
		await buttonsetOne.whenReady();

		// Read current value (could be null or some default, depending on the page)
		const initialValue = await buttonsetOne.getValue();
		console.log("Initial Buttonset One value:", initialValue);

		// Change the value. Must match one of the <oj-option value="..."> inside the buttonset
		// For example, if the buttonset has <oj-option value="dog">Dog</oj-option>:
		await buttonsetOne.changeValue("dog");

		// Verify the new value
		const newValue = await buttonsetOne.getValue();
		expect(newValue).to.equal(
			"dog",
			'Expected the oj-buttonset-one to have value "dog"'
		);

		// Optionally check if the buttonset is enabled
		const isEnabled = await buttonsetOne.isEnabled();
		expect(isEnabled).to.be.true;
	});

	after(async function () {
		// Release the driver
		await DriverManager.releaseDriver(driver);
	});
});
