// webdriver/src/__tests__/collections/indexer.spec.ts
import { expect } from "chai";
import { By, WebDriver, until } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojIndexer, OjIndexer } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Indexer (characterIndexer demo)", function () {
	let driver: WebDriver;
	let indexer!: OjIndexer;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=indexer&demo=characterIndexer";
	const LOCATOR = By.css("oj-indexer");

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		indexer = await ojIndexer(driver, LOCATOR);
		await indexer.whenReady();
	});

	after(async () => {
		await DriverManager.releaseDriver(driver);
	});

	/* ───────── helpers ───────── */

	/**
	 * Returns the text content of the first list-view group header
	 * that is currently rendered (i.e., in the DOM after indexer navigation).
	 */
	const firstGroupHeader = async (): Promise<string> => {
		const header = await driver.findElement(
			By.css(
				"oj-list-view li.oj-listview-group-element, \
              oj-list-view li.oj-listview-group"
			)
		);
		return (await header.getText()).trim();
	};

	/**
	 * Click the indexer section button for the given letter.
	 * Uses an XPath search scoped to the indexer element.
	 */
	const clickLetter = async (letter: string) => {
		const sectionBtn = await indexer.findElement(
			By.xpath(`.//*[normalize-space(text())='${letter}']`)
		);
		await sectionBtn.click();
	};

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await indexer.isDisplayed()).to.be.true;
	});

	it("scrolls the list to the chosen letter", async () => {
		const LETTER = "T";

		// 1️⃣ move via indexer
		await clickLetter(LETTER);

		// 2️⃣ wait until the list-view’s first visible group header starts with ‘T’
		await driver.wait(
			async () => (await firstGroupHeader()).startsWith(LETTER),
			5_000,
			"ListView did not scroll to the expected group header"
		);

		// 3️⃣ verify
		const headerText = await firstGroupHeader();
		expect(headerText.charAt(0)).to.equal(LETTER);
	});
});
