import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojNavigationList,
	OjNavigationList,
} from "@oracle/oraclejet-webdriver/elements";

/* helper – cast SlotProxy → WebElement */
const unwrap = (slot: any): WebElement => slot as unknown as WebElement;

describe("Oracle JET Cookbook – Navigation List (basic demo)", function () {
	let driver!: WebDriver;
	let nav!: OjNavigationList;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=navigationlist&demo=basic";
	const NAV_LOCATOR = By.css("oj-navigation-list");
	const DARK_SWITCH = By.css('oj-switch, input[type="checkbox"]'); // dark-mode toggle

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		nav = await ojNavigationList(driver, NAV_LOCATOR);
		await nav.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns true when the component’s dark-background class is present. */
	const isDarkBg = async () =>
		(await nav.getAttribute("class")).includes("oj-navigationlist-dark-bg");

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await nav.isDisplayed()).to.be.true;
	});

	it("programmatically selects the first item via changeSelectionByIndex([0])", async () => {
		await nav.changeSelectionByIndex([0]);
		await nav.whenBusyContextReady();

		const sel = await nav.getSelection();
		expect(sel).to.not.be.null.and.not.equal("");
	});

	it("findItem() returns a SlotProxy whose text matches the DOM", async () => {
		const key = await nav.getSelection(); // current key
		const slot = await nav.findItem({ key }); // SlotProxy
		const txt = await unwrap(slot).getText(); // unwrap → WebElement

		expect(txt.toLowerCase()).to.contain(key.toString());
	});

	it("“Dark Background” switch toggles the themed class", async () => {
		// ensure we start on light
		if (await isDarkBg()) await driver.findElement(DARK_SWITCH).click();

		const before = await isDarkBg();

		await driver.findElement(DARK_SWITCH).click(); // toggle once
		await nav.whenBusyContextReady();

		expect(await isDarkBg()).to.equal(!before); // class flips
	});
});
