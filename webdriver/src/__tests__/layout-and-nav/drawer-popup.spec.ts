// webdriver/src/__tests__/patterns/drawer-popup.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojDrawerPopup,
	OjDrawerPopup,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Drawer Popup (basic demo)", function () {
	let driver!: WebDriver;
	let drawer!: OjDrawerPopup;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=drawerPopup&demo=basic";
	const DRAWER_LOCATOR = By.css("oj-drawer-popup"); // appears only when opened
	const LAUNCH_BTN_LOCATOR = By.css("oj-button, button"); // “Open Drawer Popup” in demo

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Launch the popup via demo’s button and obtain the adapter handle. */
	const openDrawer = async () => {
		await driver.findElement(LAUNCH_BTN_LOCATOR).click();
		drawer = await ojDrawerPopup(driver, DRAWER_LOCATOR);
		await drawer.whenReady(); // BusyContext ✓
	};

	/** Wait until the popup is fully dismissed. */
	const waitUntilClosed = async () =>
		driver.wait(async () => !(await drawer.isDisplayed()), 4_000);

	/* ───────── tests ───────── */

	it("opens on button click and reports opened === true", async () => {
		await openDrawer();

		expect(await drawer.isDisplayed()).to.be.true;
		expect(await drawer.getOpened()).to.be.true;

		// Cookbook drawer uses “start” edge by default
		expect(await drawer.getEdge()).to.equal("start");
	});

	it("doClose() programmatically dismisses the popup", async () => {
		await drawer.doClose(); // adapter helper :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
		await waitUntilClosed();
	});

	it("opening again → OK button closes the drawer (user action)", async () => {
		// 1️⃣ re-open
		await openDrawer();

		// 2️⃣ click the user-defined OK button inside the drawer footer
		const okBtn = await drawer.findElement(
			By.css('oj-button[slot="footer"], button')
		);
		await okBtn.click();
		await waitUntilClosed();
	});
});
