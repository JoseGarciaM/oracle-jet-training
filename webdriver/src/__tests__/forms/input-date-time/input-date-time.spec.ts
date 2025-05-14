// webdriver/src/__tests__/collections/input-date-time.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojInputDateTime,
	OjInputDateTime,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Input Date Time (states demo)", function () {
	let driver!: WebDriver;
	let dt!: OjInputDateTime;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=dateTime&demo=states";
	const DATE_TIME_LOCATOR = By.css("oj-input-date-time");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		// first (enabled) component in the demo
		dt = await ojInputDateTime(driver, DATE_TIME_LOCATOR);
		await dt.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await dt.isDisplayed()).to.be.true;
	});

	it("changeValue( ) updates the component’s value", async () => {
		const NEW_VALUE = "2025-05-14T15:30:00";

		await dt.changeValue(NEW_VALUE); // TA helper
		await dt.whenBusyContextReady();

		expect(await dt.getValue()).to.equal(NEW_VALUE);
	});

	it("clear() empties the value", async () => {
		await dt.clear(); // use clear()
		await dt.whenBusyContextReady();

		const cleared = await dt.getValue();
		expect(cleared === null || cleared === "").to.be.true;
	});

	it("required field reports invalid when emptied", async () => {
		// 2nd component in the demo is `required`
		const requiredDt = await ojInputDateTime(
			driver,
			By.css("oj-input-date-time[required]")
		);
		await requiredDt.whenReady();

		await requiredDt.clear(); // clear it
		await requiredDt.whenBusyContextReady();

		const validity = await requiredDt.getProperty<string>("valid");
		expect(validity).to.contain("invalid");
	});
});
