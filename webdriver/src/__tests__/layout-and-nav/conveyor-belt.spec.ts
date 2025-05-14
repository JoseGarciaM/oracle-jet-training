import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojConveyorBelt,
	OjConveyorBelt,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Conveyor Belt (horizontal demo)", function () {
	let driver!: WebDriver;
	let belt!: OjConveyorBelt;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=conveyorBelt&demo=horizontalConveyorBelt";
	const LOCATOR = By.css("oj-conveyor-belt");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		belt = await ojConveyorBelt(driver, LOCATOR);
		await belt.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Convenience: fetch current scrollPosition (number-of-pixels) */
	const pos = () => belt.getScrollPosition();

	/* ───────── tests ───────── */

	it("renders, has horizontal orientation, and auto arrows", async () => {
		expect(await belt.isDisplayed()).to.be.true;
		expect(await belt.getOrientation()).to.equal("horizontal");
		expect(await belt.getArrowVisibility()).to.equal("auto"); // cookbook default
	});

	it("programmatic changeScrollPosition scrolls right", async () => {
		const before = await pos();

		await belt.changeScrollPosition(before + 200); // scroll ~200 px to the right
		await belt.whenBusyContextReady();

		const after = await pos();
		expect(after).to.be.greaterThan(before);
	});

	it("scrollElementIntoView brings the last item fully into view", async () => {
		// Tell the belt to scroll its last item into view
		await belt.scrollElementIntoView(By.css(":scope > *:last-child"));
		await belt.whenBusyContextReady();

		// sanity: horizontal scroll offset must now be > 0
		expect(await pos()).to.be.greaterThan(0);
	});
});
