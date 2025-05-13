import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojSelector, OjSelector } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Selector (checkboxSelectableTable demo)", function () {
	let driver: WebDriver;

	// Header “select-all” plus the first two data-row selectors
	let head!: OjSelector;
	let row0!: OjSelector;
	let row1!: OjSelector;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=selector&demo=checkboxSelectableTable";

	/* ───────── helpers ───────── */

	/** Returns true iff the passed OjSelector’s checkbox is checked. */
	const checked = async (sel: OjSelector) => sel.isSelected(); // TA API :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}

	/** Counts how many data-row selectors (row0, row1, …) are checked. */
	const selectedRows = async () =>
		(await Promise.all([row0, row1].map(checked))).filter(Boolean).length;

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		// Header and two rows (CSS paths rely on the table structure used in the demo)
		head = await ojSelector(driver, By.css("thead oj-selector"));
		row0 = await ojSelector(
			driver,
			By.css("tbody tr:nth-child(1) oj-selector")
		);
		row1 = await ojSelector(
			driver,
			By.css("tbody tr:nth-child(2) oj-selector")
		);

		await Promise.all([head, row0, row1].map((s) => s.whenReady()));
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders header & row selectors", async () => {
		expect(await head.isDisplayed()).to.be.true;
		expect(await row0.isDisplayed()).to.be.true;
	});

	it("single-row mode: clicking a data row selects only that row", async () => {
		await row0.click();
		await row0.whenBusyContextReady();

		expect(await checked(row0)).to.be.true;
		expect(await selectedRows()).to.equal(1);

		// clean-up
		await row0.click();
		await row0.whenBusyContextReady();
	});

	it("header “select-all” toggles all rows on and off", async () => {
		// SELECT ALL
		await head.click();
		await head.whenBusyContextReady();
		expect(await selectedRows()).to.equal(2);

		// CLEAR ALL
		await head.click();
		await head.whenBusyContextReady();
		expect(await selectedRows()).to.equal(0);
	});

	it("multiple independent row clicks keep both rows selected", async () => {
		await row0.click();
		await row1.click();
		await Promise.all([row0, row1].map((s) => s.whenBusyContextReady()));

		expect(await checked(row0)).to.be.true;
		expect(await checked(row1)).to.be.true;
		expect(await selectedRows()).to.equal(2);

		// clean-up
		await row0.click();
		await row1.click();
	});
});
