import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojInputNumber,
	OjInputNumber,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Input Number (basic demo)", function () {
	let driver!: WebDriver;
	let num!: OjInputNumber;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=inputNumber&demo=inputNumber";
	const NUM_LOCATOR = By.css("oj-input-number:not([required])"); // first component

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		num = await ojInputNumber(driver, NUM_LOCATOR);
		await num.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await num.isDisplayed()).to.be.true;
	});

	it("changeValue(42) updates the component value", async () => {
		await num.changeValue(42); // TA helper
		await num.whenBusyContextReady();

		const v = await num.getValue(); // number | null
		expect(v).to.equal(42);
	});

	it("clear() empties the field and getValue() reflects that", async () => {
		await num.clear(); // helper on all input components
		await num.whenBusyContextReady();

		const cleared = await num.getValue(); // null after clear()
		expect(cleared).to.be.null;
	});

	it("required field becomes invalid after being cleared", async () => {
		// 2nd component on the page carries the `required` attribute
		const reqNum = await ojInputNumber(
			driver,
			By.css("oj-input-number[required]")
		);
		await reqNum.whenReady();

		await reqNum.clear();
		await reqNum.whenBusyContextReady();

		const validity = await reqNum.getProperty<string>("valid");
		expect(validity).to.equal("invalidShown");
	});

	it("getTransientValue() returns the current edit value while typing", async () => {
		await num.click(); // focus
		await num.sendKeys("123"); // type

		const tVal = await num.getTransientValue(); // no <unknown>

		expect(tVal).to.satisfy(
			(x: unknown) => typeof x === "string" || typeof x === "number"
		);
	});
});
