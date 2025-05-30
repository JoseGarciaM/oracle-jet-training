import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojInputText, OjInputText } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Input Text (states demo)", function () {
	let driver!: WebDriver;
	let txt!: OjInputText;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=textInput&demo=states";

	// first enabled, non-required <oj-input-text>
	const TXT_LOCATOR = By.css("oj-input-text:not([disabled]):not([required])");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		txt = await ojInputText(driver, TXT_LOCATOR);
		await txt.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await txt.isDisplayed()).to.be.true;
	});

	it('changeValue("Hello") sets the value', async () => {
		await txt.changeValue("Hello");
		await txt.whenBusyContextReady();

		expect(await txt.getValue()).to.equal("Hello");
	});

	it('changeValue("") clears the value', async () => {
		await txt.changeValue("");
		await txt.whenBusyContextReady();

		const cleared = await txt.getValue();
		expect(cleared === "" || cleared === null).to.be.true;
	});

	it("getProperty('rawValue') reflects in-progress typing", async () => {
		await txt.clear();
		await txt.click(); // focus
		await txt.sendKeys("abc"); // type, don’t wait for BC

		const raw = await txt.getProperty<string>("rawValue");
		expect(typeof raw === "string" && raw.includes("abc")).to.be.true;
	});

	it("required field reports invalid when emptied", async () => {
		const requiredTxt = await ojInputText(
			driver,
			By.css("oj-input-text[required]")
		);
		await requiredTxt.whenReady();

		await requiredTxt.changeValue(""); // clear it
		await requiredTxt.whenBusyContextReady();

		const validity = await requiredTxt.getProperty<string>("valid");
		expect(validity).to.contain("invalid");
	});
});
