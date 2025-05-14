import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojInputPassword,
	OjInputPassword,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Input Password (overview demo)", function () {
	let driver!: WebDriver;
	let pwd!: OjInputPassword;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=passwordInput&demo=overview";
	const LOCATOR = By.css("oj-input-password");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		pwd = await ojInputPassword(driver, LOCATOR);
		await pwd.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await pwd.isDisplayed()).to.be.true;
	});

	it('changeValue("secret") sets the value', async () => {
		await pwd.changeValue("secret"); // TA helper
		await pwd.whenBusyContextReady();

		const val = await pwd.getValue();
		expect(val).to.equal("secret");
	});

	it("clear() empties the value", async () => {
		await pwd.clear();
		await pwd.whenBusyContextReady();

		const val = await pwd.getValue();
		expect(val === null || val === "").to.be.true;
	});

	it('maskIcon property is "visible" by default', async () => {
		expect(await pwd.getMaskIcon()).to.equal("visible");
	});
});
