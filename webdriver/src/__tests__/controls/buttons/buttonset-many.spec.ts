// webdriver/src/__tests__/controls/buttonset-many.spec.ts
import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButtonsetMany } from "@oracle/oraclejet-webdriver/elements";
import { By, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

describe("Oracle JET Cookbook Buttonset Many Test", function () {
	let driver: WebDriver;

	before(async function () {
		driver = await DriverManager.getDriver();
		// Navigate to the toggle buttons demo directly
		await ojwd.get(
			driver,
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=toggleButtons&demo=manyOverview"
		);
	});

	it("should select multiple toggle buttons and verify selection", async function () {
		// Get the oj-buttonset-many component by its id from the cookbook page
		const buttonsetMany = await ojButtonsetMany(driver, By.id("formatSet"));

		// Ensure it's ready for interaction
		await buttonsetMany.whenReady();

		// Select multiple values ("bold" and "italic") as defined in the demo
		await buttonsetMany.changeValue(["bold", "italic"]);

		// Get and verify the selected values
		const selectedValues = await buttonsetMany.getValue();
		expect(selectedValues).to.have.members(["bold", "italic"]);

		// Optionally, check if the buttonset-many component is enabled
		const isEnabled = await buttonsetMany.isEnabled();
		expect(isEnabled).to.be.true;
	});

	after(async function () {
		await DriverManager.releaseDriver(driver);
	});
});
