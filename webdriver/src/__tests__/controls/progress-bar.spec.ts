import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojProgress, OjProgress } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Progress Bar (overview demo)", function () {
	let driver!: WebDriver;
	let bar!: OjProgress; // first <oj-progress-bar>

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=progressBar&demo=overview";
	const LOCATOR = By.css("oj-progress-bar");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		bar = await ojProgress(driver, LOCATOR);
		await bar.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await bar.isDisplayed()).to.be.true;
	});

	it("exposes max and initial value properties", async () => {
		const max = await bar.getMax();
		const value = await bar.getValue();

		expect(max).to.be.a("number").and.greaterThan(0);
		expect(value).to.be.at.least(0).and.at.most(max);
	});

	it("changeValue() updates the visual value property", async () => {
		const max = await bar.getMax();
		const newVal = Math.min(max, Math.floor(max / 2)); // halfway

		await bar.changeValue(newVal);
		await bar.whenBusyContextReady();

		const after = await bar.getValue();
		expect(after).to.equal(newVal);
	});

	it('type property is either "linear" or "circular"', async () => {
		const t = await bar.getType();
		expect(["linear", "circular"]).to.include(t);
	});
});
