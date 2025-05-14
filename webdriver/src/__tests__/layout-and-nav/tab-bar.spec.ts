import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojTabBar, OjTabBar } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Tab Bar (basic demo)", function () {
	let driver!: WebDriver;
	let tab!: OjTabBar;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=tabbar&demo=tbbasic";
	const TAB_LOCATOR = By.css("oj-tab-bar");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		tab = await ojTabBar(driver, TAB_LOCATOR);
		await tab.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns a list of the <oj-tab-bar> child <li> elements in DOM order. */
	const getTabLis = async (): Promise<WebElement[]> =>
		tab.findElements(By.css('li[role="presentation"]'));

	/** Returns the key used by oj-tab-bar for a given <li>. */
	const keyOf = async (li: WebElement) =>
		li.getAttribute("id") || li.getAttribute("data-oj-key");

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await tab.isDisplayed()).to.be.true;
	});

	it("programmatically selects the first item via changeSelection()", async () => {
		const firstLi = (await getTabLis())[0];
		const firstKey = await keyOf(firstLi);

		await tab.changeSelection(firstKey); // TA helper :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
		await tab.whenBusyContextReady();

		const sel = await tab.getSelection();
		expect(sel).to.equal(firstKey);
	});

	it("clicking another tab moves the selection", async () => {
		const lis = await getTabLis();
		const secondLi = lis[1];
		const secondKey = await keyOf(secondLi);

		await secondLi.click(); // user interaction
		await tab.whenBusyContextReady();

		const sel = await tab.getSelection();
		expect(sel).to.equal(secondKey);
	});

	it("exposes its overflow setting via getOverflow()", async () => {
		const overflow = await tab.getOverflow();
		expect(overflow).to.be.a("string"); // ’popup’ in this demo
	});
});
