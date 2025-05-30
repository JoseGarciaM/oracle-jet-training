// webdriver/src/__tests__/patterns/accordion.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojAccordion, OjAccordion } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Accordion (basic demo)", function () {
	let driver!: WebDriver;
	let acc!: OjAccordion;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=accordion&demo=basicAccordion";
	const LOCATOR = By.css("oj-accordion");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		acc = await ojAccordion(driver, LOCATOR);
		await acc.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Fetch all child collapsibles (<oj-c-collapsible>) to know their count. */
	const collapsibles = async () =>
		await acc.findElements(By.css("oj-c-collapsible"));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await acc.isDisplayed()).to.be.true;
	});

	it("exposes multiple == false (single-open mode)", async () => {
		const multiple = await acc.getMultiple();
		expect(multiple).to.be.false;
	});

	it("programmatic changeExpanded([0]) selects first pane", async () => {
		await acc.changeExpanded([0]);

		await acc.whenBusyContextReady();

		const expanded = (await acc.getExpanded()) as number[] | null;
		expect(expanded).to.include(0);
	});

	it("clicking a header toggles its expansion state", async () => {
		/* locate first collapsible’s header button inside the accordion */
		const header = await driver.findElement(
			By.css("oj-c-collapsible:first-of-type button")
		);

		/* click → collapse (it was open from previous test) */
		await header.click();
		await acc.whenBusyContextReady();

		let expanded = (await acc.getExpanded()) as number[] | null;
		expect(expanded ?? []).to.not.include(0);

		/* click again → expand */
		await header.click();
		await acc.whenBusyContextReady();

		expanded = (await acc.getExpanded()) as number[] | null;
		expect(expanded).to.include(0);
	});

	it("has at least two collapsible sections", async () => {
		const count = (await collapsibles()).length;
		expect(count).to.be.at.least(2);
	});
});
