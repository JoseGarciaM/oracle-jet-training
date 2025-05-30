import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojListView, OjListView } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – ListView (overview demo)", function () {
	let driver: WebDriver;
	let lv!: OjListView;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=listView&demo=overviewListView";
	const LIST_LOCATOR = By.css("oj-list-view");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		lv = await ojListView(driver, LIST_LOCATOR);
		await lv.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Click the “New Task” button that inserts a row at the top. */
	const clickAddTask = async () => {
		// Cookbook uses an oj-button with an embedded icon. Adjust selector if needed.
		await driver
			.findElement(By.css('#addTaskBtn, #addItemBtn, .oj-button[slot="add"]'))
			.click();
	};

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await lv.isDisplayed()).to.be.true;
	});

	it("supports high-water-mark scrolling (index 40 loads)", async () => {
		await lv.changeScrollPosition({
			index: 40,
			key: null,
			parent: null, // ← add this line
			offsetX: 0,
			offsetY: 0,
			x: 0,
			y: 0,
		});

		const pos = await lv.getScrollPosition();
		expect((pos as any).index).to.be.at.least(40);
	});

	it("can add a new task that appears as the first item", async () => {
		// 1️⃣ Create
		await clickAddTask();

		// 2️⃣ First rendered <li> text becomes the newly added task’s label
		const firstLi = await lv.findElement(By.css("li.oj-listview-item, li"));
		const text = await firstLi.getText();
		expect(text.toLowerCase()).to.include("new"); // “New Task”, “New item”, etc.
	});

	it("programmatically selects an item and reports it back", async () => {
		// In this demo items keys are simple numbers (0-based).  Adjust if needed.
		const KEY = "0";
		await lv.changeSelected<string>([KEY]);

		const selected = await lv.getSelected<string>();
		expect(selected).to.include(KEY);
	});
});
