import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojCollapsible } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-collapsible Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.)
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook page for collapsibles => "basicCollapsible"
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=collapsible&demo=basicCollapsible"
		);
	});

	after(async function () {
		// Release/quit the driver after tests
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-collapsible is on the page and is collapsed initially", async function () {
		// 1) Locate the collapsible by ID (check the actual ID in the DOM)
		const collapsible = await ojCollapsible(driver, By.id("collapsible1"));
		await collapsible.whenReady();

		// 2) Verify it’s displayed
		const displayed = await collapsible.isDisplayed();
		expect(displayed).to.be.true;

		// 3) Check if it’s disabled (usually false by default)
		const disabled = await collapsible.getDisabled();
		expect(disabled).to.be.false;

		// 4) Check initial expanded state (often collapsible starts collapsed)
		const isExpanded = await collapsible.getExpanded();
		expect(isExpanded).to.be.false;
	});

	it("should expand and collapse the collapsible programmatically", async function () {
		const collapsible = await ojCollapsible(driver, By.id("collapsible1"));
		await collapsible.whenReady();

		// Expand the collapsible
		await collapsible.doExpand();
		const expandedAfter = await collapsible.getExpanded();
		expect(expandedAfter).to.be.true;

		// Collapse it again
		await collapsible.doCollapse();
		const expandedNow = await collapsible.getExpanded();
		expect(expandedNow).to.be.false;
	});
});
