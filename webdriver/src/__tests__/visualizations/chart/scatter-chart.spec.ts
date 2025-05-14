import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Scatter Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=scatterChart&demo=default";
	const CHART_LOCATOR = By.css("oj-chart"); // single chart

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns the first point (<circle>) for a given series id. */
	const firstPoint = (seriesId: string) =>
		chart.findElement(
			By.css(`g[role="series"][data-series-id="${seriesId}"] circle`)
		);

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'scatter'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("scatter");
	});

	it("coordinateSystem is cartesian", async () => {
		expect(await chart.getProperty<string>("coordinateSystem")).to.equal(
			"cartesian"
		);
	});

	it("programmatic changeSelection(['Series 1']) selects that series", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a point from Series 2 updates chart.selection", async () => {
		const pt = await firstPoint("Series 2");
		await pt.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 2");
	});
});
