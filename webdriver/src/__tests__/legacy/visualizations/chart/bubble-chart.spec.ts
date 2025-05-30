import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Bubble Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=bubbleChart&demo=default";
	const CHART = By.css("oj-chart"); // the single chart on page

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns the first bubble (<circle>) for a given series id. */
	const firstBubble = async (seriesId: string) =>
		chart.findElement(
			By.css(`g[role="series"][data-series-id="${seriesId}"] circle`)
		);

	/* ───────── tests ───────── */

	it("renders, is displayed, and reports type === 'bubble'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("bubble");
	});

	it("programmatic changeSelection(['Series 1']) selects that series", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a bubble from Series 2 updates selection accordingly", async () => {
		const bubble = await firstBubble("Series 2");
		await bubble.click();
		await chart.whenBusyContextReady();

		const sel = await chart.getSelection();
		expect(sel).to.include("Series 2");
	});

	it("doItemDrill() triggers drill without throwing", async () => {
		// bubble charts are single-group; group id array is [] in this demo
		await chart.doItemDrill("Series 1", [], 0); // first item of Series 1
		await chart.whenBusyContextReady();

		// After drill the cookbook redraws; just assert chart is still displayed
		expect(await chart.isDisplayed()).to.be.true;
	});

	it("hiding a category via changeHiddenCategories() removes it from legend", async () => {
		await chart.changeHiddenCategories(["Series 3"]);
		await chart.whenBusyContextReady();

		const hidden = await chart.getHiddenCategories();
		expect(hidden).to.include("Series 3");
	});
});
