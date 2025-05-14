// webdriver/src/__tests__/charts/stock-chart.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Stock Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=stockChart&demo=default";

	const CHART_LOCATOR = By.css("oj-chart"); // single chart on page

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** First candlestick (path with data-item-id) in the chart. */
	const firstCandle = () =>
		chart.findElement(
			By.css('g[role="data"] path[data-item-id][d*="M"]') // generic candle path
		);

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'stock'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("stock");
	});

	it("coordinateSystem is cartesian", async () => {
		expect(await chart.getProperty<string>("coordinateSystem")).to.equal(
			"cartesian"
		);
	});

	it("programmatic changeSelection([<item-id>]) selects that candlestick", async () => {
		const candle = await firstCandle();
		const itemId = await candle.getAttribute("data-item-id");

		await chart.changeSelection([itemId]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include(itemId);
	});

	it("clicking a candlestick updates chart.selection", async () => {
		const candle = await firstCandle();
		const itemId = await candle.getAttribute("data-item-id");

		await candle.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include(itemId);
	});
});
