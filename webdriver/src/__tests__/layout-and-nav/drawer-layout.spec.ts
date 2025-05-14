import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojDrawerLayout,
	OjDrawerLayout,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Drawer Layout (basic demo)", function () {
	let driver!: WebDriver;
	let layout!: OjDrawerLayout;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=drawerLayout&demo=basic";
	const LOCATOR = By.css("oj-drawer-layout");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		layout = await ojDrawerLayout(driver, LOCATOR);
		await layout.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and drawers are closed by default", async () => {
		expect(await layout.isDisplayed()).to.be.true;

		// cookbook starts with all drawers closed
		expect(await layout.getStartOpened()).to.be.false;
		expect(await layout.getEndOpened()).to.be.false;
		expect(await layout.getBottomOpened()).to.be.false;
	});

	it("programmatically opens and closes the “start” drawer", async () => {
		/* open */
		await layout.changeStartOpened(true); // adapter API :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
		await layout.whenBusyContextReady();
		expect(await layout.getStartOpened()).to.be.true;

		/* close */
		await layout.changeStartOpened(false);
		await layout.whenBusyContextReady();
		expect(await layout.getStartOpened()).to.be.false;
	});

	it("programmatically opens and closes the “end” drawer", async () => {
		await layout.changeEndOpened(true);
		await layout.whenBusyContextReady();
		expect(await layout.getEndOpened()).to.be.true;

		await layout.changeEndOpened(false);
		await layout.whenBusyContextReady();
		expect(await layout.getEndOpened()).to.be.false;
	});

	it("programmatically opens and closes the “bottom” drawer", async () => {
		await layout.changeBottomOpened(true);
		await layout.whenBusyContextReady();
		expect(await layout.getBottomOpened()).to.be.true;

		await layout.changeBottomOpened(false);
		await layout.whenBusyContextReady();
		expect(await layout.getBottomOpened()).to.be.false;
	});
});
