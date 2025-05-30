import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojTable, OjTable } from "@oracle/oraclejet-webdriver/elements";

/* helper: unwrap SlotProxy → WebElement */
const unwrap = async (slot: any): Promise<WebElement> =>
	slot as unknown as WebElement;

describe("Oracle JET Cookbook – Table (basicTable demo)", function () {
	let driver: WebDriver;
	let table!: OjTable;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=table&demo=basicTable";
	const LOCATOR = By.css("oj-table");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		table = await ojTable(driver, LOCATOR);
		await table.whenReady();
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("high-water-mark scroll loads row 40", async () => {
		await table.changeScrollPosition({
			rowIndex: 40,
			columnIndex: 0,
			rowKey: "",
			columnKey: "",
			offsetX: 0,
			offsetY: 0,
			x: 0,
			y: 0,
		});

		const pos = (await table.getScrollPosition()) as any;
		expect(pos.rowIndex).to.be.at.least(40);
	});

	it("sorting first column ascending then descending changes order", async () => {
		// the demo’s first column key is "DepartmentId"
		await table.doSort("DepartmentId", "ascending");
		await table.whenBusyContextReady();

		const aAsc = await (
			await unwrap(await table.findCell({ rowIndex: 0, columnIndex: 0 }))
		).getText();
		const bAsc = await (
			await unwrap(await table.findCell({ rowIndex: 1, columnIndex: 0 }))
		).getText();
		expect(aAsc.localeCompare(bAsc)).to.be.below(0); // a < b

		await table.doSort("DepartmentId", "descending");
		await table.whenBusyContextReady();

		const aDsc = await (
			await unwrap(await table.findCell({ rowIndex: 0, columnIndex: 0 }))
		).getText();
		const bDsc = await (
			await unwrap(await table.findCell({ rowIndex: 1, columnIndex: 0 }))
		).getText();
		expect(aDsc.localeCompare(bDsc)).to.be.above(0); // a > b
	});

	it("row click selects a single row and getSelectedKeys() reports it", async () => {
		// click first data row
		const row0 = await table.findRow({ rowIndex: 0 });
		await (await unwrap(row0)).click();
		await table.whenBusyContextReady();

		const sel = await table.getSelectedKeys<string>();
		const rowKeys = sel.row?.keys ?? [];
		expect(rowKeys.length).to.equal(1);
	});
});
