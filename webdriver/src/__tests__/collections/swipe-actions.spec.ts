import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojSwipeActions,
	OjSwipeActions,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Swipe Actions (basicSwipeToReveal demo)", function () {
	let driver: WebDriver;
	let swipe!: OjSwipeActions; // first <oj-swipe-actions> in the list

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=swipeToReveal&demo=basicSwipeToReveal";
	const LOCATOR = By.css("oj-swipe-actions"); // first item is enough
	const RESULT = By.id("actionSummary"); // text above the list

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		swipe = await ojSwipeActions(driver, LOCATOR);
		await swipe.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await swipe.isDisplayed()).to.be.true;
	});

	it('`doAction("default")` triggers the default swipe action', async () => {
		// Grab the text before doing the action
		const before = await driver.findElement(RESULT).getText();

		// Perform the default (full-swipe) action via the test-adapter
		await swipe.doAction("default"); // TA API :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
		await swipe.whenBusyContextReady();

		// Text above the ListView should now be different
		const after = await driver.findElement(RESULT).getText();
		expect(after).to.not.equal(before);
		expect(after).to.not.equal(""); // simple sanity check
	});

	it("any secondary action updates the result text", async () => {
		// The demo registers a secondary action whose <oj-option> value is "flag"
		await swipe.doAction("flag");
		await swipe.whenBusyContextReady();

		const txt = await driver.findElement(RESULT).getText();
		expect(txt.toLowerCase()).to.include("flag");
	});
});
