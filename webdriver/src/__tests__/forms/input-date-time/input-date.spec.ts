import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojInputDate, OjInputDate } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Input Date (states demo)", function () {
	let driver!: WebDriver;
	let date!: OjInputDate;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=date&demo=states";
	const FIRST_DATE = By.css("oj-input-date"); // first component – not required
	const REQUIRED_DATE = By.css("oj-input-date[required]"); // second component – required

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		date = await ojInputDate(driver, FIRST_DATE);
		await date.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await date.isDisplayed()).to.be.true;
	});

	it("changeValue(YYYY-MM-DD) updates the value", async () => {
		const iso = "2025-01-15"; // any ISO-8601 date (local-date form)
		await date.changeValue(iso);
		await date.whenBusyContextReady();

		expect(await date.getValue()).to.equal(iso);
	});

	it("clear() empties the value", async () => {
		await date.clear(); // helper from TA
		await date.whenBusyContextReady();

		const cleared = await date.getValue(); // string | null
		expect(cleared === "" || cleared === null).to.be.true;
	});

	it("required field reports invalid when emptied", async () => {
		const req = await ojInputDate(driver, REQUIRED_DATE);
		await req.whenReady();

		await req.clear(); // empty the required control
		await req.whenBusyContextReady();

		const validity = await req.getProperty<string>("valid");
		expect(validity).to.contain("invalid");
	});
});
