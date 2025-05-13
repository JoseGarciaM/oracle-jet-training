import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojRowExpander,
	OjRowExpander,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Row Expander (tableRowExpander demo)", function () {
	let driver: WebDriver;
	let expander!: OjRowExpander;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=rowExpanderTable&demo=tableRowExpander";
	const EXPANDER_LOCATOR = By.css("oj-row-expander");

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		// get first row-expander in the table
		expander = await ojRowExpander(driver, EXPANDER_LOCATOR);
		await expander.whenReady();
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Convenience: current expanded state via the public property. */
	const isExpanded = async () => {
		return (await expander.getProperty<boolean>("expanded")) === true;
	};

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await expander.isDisplayed()).to.be.true;
	});

	it("toggles expanded → collapsed → expanded", async () => {
		// ensure starts collapsed
		if (await isExpanded()) await expander.click();

		expect(await isExpanded()).to.be.false;

		// 1️⃣ expand
		await expander.click();
		await expander.whenBusyContextReady();
		expect(await isExpanded()).to.be.true;

		// 2️⃣ collapse
		await expander.click();
		await expander.whenBusyContextReady();
		expect(await isExpanded()).to.be.false;
	});
});
