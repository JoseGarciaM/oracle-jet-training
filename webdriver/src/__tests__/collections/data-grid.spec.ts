import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojDataGrid, OjDataGrid } from "@oracle/oraclejet-webdriver/elements";
import type { SlotProxy } from "@oracle/oraclejet-webdriver"; // type-only

const asElement = (slot: SlotProxy): WebElement =>
	slot as unknown as WebElement;

describe("Oracle JET Cookbook – Data Grid (overview demo)", function () {
	let driver: WebDriver;
	let grid!: OjDataGrid;

	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=dataGrid&demo=overView";
	const LOCATOR = By.css("oj-data-grid");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		grid = await ojDataGrid(driver, LOCATOR);
		await grid.whenReady();
	});

	after(async () => {
		await DriverManager.releaseDriver(driver);
	});

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await grid.isDisplayed()).to.be.true;
	});

	it("loads row 200 when scrolled", async () => {
		await grid.changeScrollPosition({
			rowIndex: 200,
			columnIndex: 0,
			rowKey: null,
			columnKey: null,
			offsetX: 0,
			offsetY: 0,
			x: 0,
			y: 0,
		});

		const cell = await grid.findCell({ rowIndex: 200, columnIndex: 0 });
		const text = await asElement(cell).getText();
		expect(text).to.not.equal("");
	});

	it("selects a single cell and reports it back", async () => {
		const single = [{ startRow: 2, startColumn: 3, endRow: 2, endColumn: 3 }];
		await grid.changeSelection(single);
		const sel = await grid.getSelection();
		expect(sel).to.deep.include.members(single);
	});

	it("sorts when the first column header is clicked", async () => {
		const header = await grid.findHeader({
			axis: "column",
			index: 0,
			level: 0,
		});
		await asElement(header).click(); // ascending
		await asElement(header).click(); // descending

		const a = await asElement(
			await grid.findCell({ rowIndex: 0, columnIndex: 0 })
		).getText();
		const b = await asElement(
			await grid.findCell({ rowIndex: 1, columnIndex: 0 })
		).getText();
		expect(a).to.not.equal(b);
	});

	it("renders a % sign via the converter template", async () => {
		const pct = await grid.findCell({ rowIndex: 0, columnIndex: 9 });
		const txt = await asElement(pct).getText();
		expect(txt).to.match(/%$/);
	});
});
