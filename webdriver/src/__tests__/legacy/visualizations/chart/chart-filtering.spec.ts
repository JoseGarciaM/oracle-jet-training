// webdriver/src/__tests__/charts/chart-filtering.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Chart (filtering demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=chart&demo=filtering";
	const CHART_LOCATOR = By.css("oj-chart"); // single chart
	const LEGEND_PACIFIC = By.css('[data-category="Pacific"]'); // legend swatch
	const LEGEND_MOUNTAIN = By.css('[data-category="Mountain"]');

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("chart renders and starts with no highlighted / hidden categories", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getHighlightedCategories()).to.be.empty;
		expect(await chart.getHiddenCategories()).to.be.empty;
	});

	it("clicking a legend item toggles highlighting for that category", async () => {
		// click Pacific once → highlight
		await driver.findElement(LEGEND_PACIFIC).click();
		await chart.whenBusyContextReady();

		let hi = await chart.getHighlightedCategories();
		expect(hi).to.include("Pacific");

		// click again → un-highlight
		await driver.findElement(LEGEND_PACIFIC).click();
		await chart.whenBusyContextReady();

		hi = await chart.getHighlightedCategories();
		expect(hi).to.not.include("Pacific");
	});

	it("programmatic changeHiddenCategories() hides a category", async () => {
		await chart.changeHiddenCategories(["Mountain"]);
		await chart.whenBusyContextReady();

		expect(await chart.getHiddenCategories()).to.include("Mountain");

		// restore
		await chart.changeHiddenCategories([]);
		await chart.whenBusyContextReady();

		expect(await chart.getHiddenCategories()).to.be.empty;
	});

	it("highlighting + hiding interplay works (UI click > API)", async () => {
		/* 1️⃣ hide 'Mountain' via API */
		await chart.changeHiddenCategories(["Mountain"]);
		await chart.whenBusyContextReady();

		expect(await chart.getHiddenCategories()).to.include("Mountain");

		/* 2️⃣ user clicks the same legend swatch → chart should un-hide it */
		await driver.findElement(LEGEND_MOUNTAIN).click();
		await chart.whenBusyContextReady();

		const hidden = await chart.getHiddenCategories();
		expect(hidden).to.not.include("Mountain");
	});
});
