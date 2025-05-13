import { expect } from "chai";
import { By, Origin, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojRefresher,
	OjRefresher,
	ojListView,
	OjListView,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Refresher (basic demo)", function () {
	let driver: WebDriver;
	let refresher!: OjRefresher;
	let list!: OjListView;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pullToRefresh&demo=basicPullToRefresh";

	const REFRESHER_LOCATOR = By.css("oj-refresher");
	const LIST_LOCATOR = By.css("oj-list-view");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		refresher = await ojRefresher(driver, REFRESHER_LOCATOR);
		list = await ojListView(driver, LIST_LOCATOR);

		await refresher.whenReady();
		await list.whenReady();
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Reads the text of the very first rendered list item. */
	const firstItemText = async (): Promise<string> => {
		const li = await list.findElement(By.css("li.oj-listview-item, li"));
		return (await li.getText()).trim();
	};

	/** Perform a touch “pull-down” gesture that exceeds the threshold. */
	/** Perform a drag-down gesture that exceeds the refresher’s threshold */
	const pullDown = async () => {
		const rect = await refresher.getRect();
		const startX = Math.floor(rect.x + rect.width / 2);
		const startY = Math.floor(rect.y + rect.height * 0.25);
		const endY = startY + 150; // ~150 px drag

		await driver
			.actions({ bridge: true }) // legacy pointer chain
			.move({ origin: Origin.VIEWPORT, x: startX, y: startY })
			.press()
			.move({ origin: Origin.VIEWPORT, x: startX, y: endY })
			.release()
			.perform();
	};

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await refresher.isDisplayed()).to.be.true;
	});

	it("pull-to-refresh updates the ListView content", async () => {
		const before = await firstItemText();

		await pullDown(); // 1️⃣ gesture
		await refresher.whenBusyContextReady(); // 2️⃣ wait for refresh promise to resolve

		const after = await firstItemText(); // 3️⃣ verify
		expect(after).to.not.equal(before);
	});
});
