import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojPopup, OjPopup } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Popup (basic demo)", function () {
	let driver!: WebDriver;
	let popup!: OjPopup;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=popup&demo=popup";

	// selectors used in the cookbook markup
	const OPEN_BTN = By.css("oj-button#openPopup"); // “Go” button
	const POPUP = By.css("oj-popup"); // the popup itself
	const OK_BTN = By.css('oj-button[slot="footer"]'); // “OK” button inside

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		popup = await ojPopup(driver, POPUP);
		await popup.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Opens the popup via the demo’s “Go” button and waits for it to render. */
	const openPopup = async () => {
		await driver.findElement(OPEN_BTN).click();
		await popup.whenBusyContextReady();
	};

	/** Clicks the “OK” button inside the popup and waits for it to close. */
	const closePopup = async () => {
		await driver.findElement(OK_BTN).click();
		await popup.whenBusyContextReady();
	};

	/* ───────── tests ───────── */

	it("opens when the “Go” button is clicked", async () => {
		await openPopup();
		expect(await popup.isDisplayed()).to.be.true;
	});

	it("closes when the “OK” button is clicked", async () => {
		await openPopup(); // ensure it’s open first
		await closePopup();
		expect(await popup.isDisplayed()).to.be.false;
	});

	it("reports its modality property as “modal”", async () => {
		expect(await popup.getModality()).to.equal("modal");
	});
});
