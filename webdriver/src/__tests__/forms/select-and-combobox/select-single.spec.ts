import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojSelectSingle,
	OjSelectSingle,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Select Single (states demo)", function () {
	let driver!: WebDriver;
	let select!: OjSelectSingle;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=selectSingle&demo=states";
	const SELECT_LOCATOR = By.css("oj-select-single:not([disabled])"); // first interactive instance

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		select = await ojSelectSingle(driver, SELECT_LOCATOR);
		await select.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns the `value` of the first <oj-option> inside `select`. */
	const firstOptionValue = async (): Promise<string> =>
		driver
			.findElement(By.css("oj-option[value]"))
			.getAttribute("value") as Promise<string>;

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await select.isDisplayed()).to.be.true;
	});

	it("changeValue(v) selects the requested option", async () => {
		const v = await firstOptionValue();
		await select.changeValue(v);
		await select.whenBusyContextReady();

		expect(await select.getValue()).to.equal(v);
	});

	it("clear() empties the selection", async () => {
		await select.clear(); // adapter helper
		await select.whenBusyContextReady();

		const val = await select.getValue();
		expect(val === null || val === "").to.be.true;
	});

	it("disabled select instance is not enabled", async () => {
		const disabledSel = await ojSelectSingle(
			driver,
			By.css("oj-select-single[disabled]")
		);
		await disabledSel.whenReady();

		expect(await disabledSel.isEnabled()).to.be.false;
	});

	it("required field reports invalid when cleared", async () => {
		const requiredSel = await ojSelectSingle(
			driver,
			By.css("oj-select-single[required]")
		);
		await requiredSel.whenReady();

		await requiredSel.clear();
		await requiredSel.whenBusyContextReady();

		const validity = await requiredSel.getProperty<string>("valid");
		expect(validity).to.contain("invalid");
	});
});
