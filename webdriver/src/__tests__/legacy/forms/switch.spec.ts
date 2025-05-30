import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojSwitch, OjSwitch } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Switch (states demo)", function () {
	let driver!: WebDriver;
	let sw!: OjSwitch; // the first, *enabled* switch in the demo
	let disabled!: OjSwitch; // the demo’s disabled switch

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=switch&demo=states";
	const SWITCH = By.css("oj-switch:not([disabled])"); // first enabled control
	const DISABLED = By.css("oj-switch[disabled]");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		sw = await ojSwitch(driver, SWITCH);
		disabled = await ojSwitch(driver, DISABLED);

		await Promise.all([sw.whenReady(), disabled.whenReady()]);
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await sw.isDisplayed()).to.be.true;
	});

	it("changeValue(true) turns the switch on", async () => {
		await sw.changeValue(true);
		await sw.whenBusyContextReady();

		expect(await sw.getValue()).to.equal(true);
	});

	it("programmatic off → on → off round-trip works", async () => {
		await sw.changeValue(false);
		await sw.whenBusyContextReady();
		expect(await sw.getValue()).to.equal(false);

		await sw.changeValue(true);
		await sw.whenBusyContextReady();
		expect(await sw.getValue()).to.equal(true);

		await sw.changeValue(false);
		await sw.whenBusyContextReady();
		expect(await sw.getValue()).to.equal(false);
	});

	it("click toggles the component when enabled", async () => {
		const before = await sw.getValue();
		await sw.click(); // user-style interaction
		await sw.whenBusyContextReady();

		expect(await sw.getValue()).to.equal(!before);
	});

	it("disabled switch remains unchanged after click()", async () => {
		expect(await disabled.getDisabled()).to.equal(true);

		const valBefore = await disabled.getValue();
		await disabled.click(); // should be ignored
		await disabled.whenBusyContextReady();

		expect(await disabled.getValue()).to.equal(valBefore);
	});
});
