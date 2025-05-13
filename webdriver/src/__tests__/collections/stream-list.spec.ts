import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojStreamList,
	OjStreamList,
} from "@oracle/oraclejet-webdriver/elements";

/** Helper: unwrap SlotProxy → WebElement (type cast only) */
const unwrap = async (el: any): Promise<WebElement> =>
	el as unknown as WebElement;

describe("Oracle JET Cookbook – Stream List (streamlist demo)", function () {
	let driver: WebDriver;
	let stream!: OjStreamList;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=streamList&demo=streamlist";
	const LOCATOR = By.css("oj-stream-list");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		stream = await ojStreamList(driver, LOCATOR);
		await stream.whenReady();
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await stream.isDisplayed()).to.be.true;
	});

	it("supports high-water-mark scrolling (y-offset loads more items)", async () => {
		// Scroll ~1000px down; StreamList ScrollPosition typing lacks "index"
		await stream.changeScrollPosition({
			key: null,
			parentKey: null,
			offsetX: 0,
			offsetY: 0,
			x: 0,
			y: 1000,
		} as any); // cast to satisfy TS

		const pos = (await stream.getScrollPosition()) as any;
		expect(pos.y).to.be.greaterThan(0);
	});

	it("group headers collapse and expand on click", async () => {
		// "Pinned" group header
		const hdrSlot = await stream.findGroup<string>({ key: "Pinned" });
		const hdrEl = await unwrap(hdrSlot);

		// collapse
		await hdrEl.click();
		await stream.whenBusyContextReady();

		let firstItemSlot = await stream.findItem<string>({
			parentKey: "Pinned",
			key: "0",
		});
		expect(await (await unwrap(firstItemSlot)).isDisplayed()).to.be.false;

		// expand
		await hdrEl.click();
		await stream.whenBusyContextReady();

		firstItemSlot = await stream.findItem<string>({
			parentKey: "Pinned",
			key: "0",
		});
		expect(await (await unwrap(firstItemSlot)).isDisplayed()).to.be.true;
	});

	it("mutations: “Move to Past” button moves an item between groups", async () => {
		// first item in "Pending"
		const pendSlot = await stream.findItem<string>({
			parentKey: "Pending",
			key: "0",
		});
		const pendEl = await unwrap(pendSlot);
		const txtBefore = await pendEl.getText();

		// click its "Move to Past" demo button
		await pendEl.findElement(By.css('oj-button[data-action="past"]')).click();
		await stream.whenBusyContextReady();

		// verify text now appears in "Past" group
		const pastSlot = await stream.findItem<string>({
			parentKey: "Past",
			key: "0",
		});
		const txtAfter = await (await unwrap(pastSlot)).getText();
		expect(txtAfter).to.equal(txtBefore);
	});
});
