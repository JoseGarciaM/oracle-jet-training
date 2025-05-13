// webdriver/src/__tests__/collections/waterfall-layout.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojWaterfallLayout,
	OjWaterfallLayout,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Waterfall Layout (basic demo)", function () {
	let driver!: WebDriver;
	let wl!: OjWaterfallLayout;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=waterfallLayout&demo=basicWaterfallLayout";
	const LOCATOR = By.css("oj-waterfall-layout");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		wl = await ojWaterfallLayout(driver, LOCATOR);
		await wl.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Count rendered tiles (<li> elements inside the layout). */
	const countTiles = async () => (await wl.findElements(By.css("li"))).length;

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await wl.isDisplayed()).to.be.true;
	});

	it("supports high-water-mark scrolling (new tiles load)", async () => {
		const before = await countTiles();

		/* JET’s changeScrollPosition() takes an object whose exact
       shape isn’t important here – all we need is to give it a
       vertical target ‘y’.  Casting to any sidesteps TS strictness
       while still calling the real API. */
		await wl.changeScrollPosition({
			y: 1200, // scroll far enough downward to trigger fetch
			x: 0,
			offsetX: 0,
			offsetY: 0,
		} as any);

		await wl.whenBusyContextReady();
		const after = await countTiles();

		expect(after).to.be.greaterThan(before);
	});

	it("allows selecting a tile and reports it back", async () => {
		// 1️⃣ click the first card
		const first = await wl.findElement(By.css("li"));
		await first.click();

		// 2️⃣ read the 'selected' attribute via getProperty()
		const selected = await wl.getProperty<number[]>("selected");
		expect(selected).to.include(0);
	});
});
