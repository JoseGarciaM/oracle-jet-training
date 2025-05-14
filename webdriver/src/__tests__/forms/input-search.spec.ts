import { expect } from "chai";
import { By, Key, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojInputSearch,
	OjInputSearch,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Input Search (basic demo)", function () {
	let driver!: WebDriver;
	let search!: OjInputSearch;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=inputSearch&demo=basic";
	const SEARCH_LOCATOR = By.css("oj-input-search"); // only one in this demo

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		search = await ojInputSearch(driver, SEARCH_LOCATOR);
		await search.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await search.isDisplayed()).to.be.true;
	});

	it('changeValue("abc") updates getValue()', async () => {
		await search.changeValue("abc");
		await search.whenBusyContextReady();

		expect(await search.getValue()).to.equal("abc");
	});

	it("clear() empties the field", async () => {
		await search.clear();
		await search.whenBusyContextReady();

		const val = await search.getValue();
		expect(val === "" || val === null).to.be.true;
	});

	it("typing text and pressing Enter commits the value", async () => {
		// focus the inner <input> and simulate user typing, then Enter
		const input = await search.findElement(By.css("input"));
		await input.clear();
		await input.sendKeys("pear", Key.ENTER);

		// No BusyContext wait is strictly required, but add one for safety
		await search.whenBusyContextReady();

		expect(await search.getValue()).to.equal("pear");
	});
});
