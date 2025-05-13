import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojTreeView, OjTreeView } from "@oracle/oraclejet-webdriver/elements";

/* helper – unwrap SlotProxy → WebElement */
const unwrap = async (slot: any): Promise<WebElement> =>
	slot as unknown as WebElement;

describe("Oracle JET Cookbook – Tree View (JSON demo)", function () {
	let driver: WebDriver;
	let tree!: OjTreeView;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=treeView&demo=json";
	const LOCATOR = By.css("oj-tree-view");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		tree = await ojTreeView(driver, LOCATOR);
		await tree.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await tree.isDisplayed()).to.be.true;
	});

	it("expands first root item via doExpand / doCollapse", async () => {
		/* 1️⃣ find the DOM id of the first root item */
		const rootLi = await tree.findElement(By.css('[role="treeitem"]'));
		const domId = await rootLi.getAttribute("id");

		/* 2️⃣ wrap it with TA so we can toggle */
		await tree.doExpand({ id: domId }); // adapter API
		await tree.whenBusyContextReady();

		/* 3️⃣ after expand there should be > 1 visible treeitems */
		let items = await tree.findElements(By.css('[role="treeitem"]'));
		expect(items.length).to.be.greaterThan(1);

		/* 4️⃣ collapse back */
		await tree.doCollapse({ id: domId });
		await tree.whenBusyContextReady();

		items = await tree.findElements(By.css('[role="treeitem"]'));
		expect(items.length).to.equal(1);
	});

	it("changeSelected / getSelected round-trips a key", async () => {
		// Use the same DOM id as a key; keys in this demo equal the <li> ids
		const rootLi = await tree.findElement(By.css('[role="treeitem"]'));
		const key = await rootLi.getAttribute("id");

		await tree.changeSelected<string>([key]);
		const sel = await tree.getSelected<string>();
		expect(sel).to.include(key);
	});
});
