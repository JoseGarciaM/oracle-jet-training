import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojInputTime, OjInputTime } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – oj-input-time (states demo)", function () {
	let driver!: WebDriver;
	let input!: OjInputTime;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=time&demo=states";
	const INPUT_LOCATOR = By.css("oj-input-time"); // the first <oj-input-time> in the demo
	const REQUIRED_LOCATOR = By.css("oj-input-time[required]"); // second component in this demo

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		input = await ojInputTime(driver, INPUT_LOCATOR);
		await input.whenReady(); // ⇢ BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await input.isDisplayed()).to.be.true;
	});

	it("changeValue('T13:45:00') sets the value", async () => {
		await input.changeValue("T13:45:00"); // ISO time; no date part required
		await input.whenBusyContextReady();

		const val = await input.getValue();
		expect(val).to.equal("T13:45:00");
	});

	it("clear() empties the control", async () => {
		await input.clear(); // adapter helper from OjInputTimeBase
		await input.whenBusyContextReady();

		const cleared = await input.getValue();
		expect(cleared === "" || cleared === null).to.be.true;
	});

	it("required field reports invalid when emptied", async () => {
		const required = await ojInputTime(driver, REQUIRED_LOCATOR);
		await required.whenReady();

		await required.clear(); // blank it out
		await required.whenBusyContextReady();

		const validity = await required.getProperty<string>("valid");
		expect(validity).to.contain("invalid");
	});
});
