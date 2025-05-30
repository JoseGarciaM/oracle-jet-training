import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Line Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=lineChart&demo=default";
	const CHART_LOCATOR = By.css("oj-chart"); // single chart
	const ORIENT_BTN = By.css('oj-button[value="orientation"]'); // orientation toggle

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns the first point (<circle>) in Series 2. */
	const firstPointSeries2 = async () =>
		chart.findElement(
			By.css('g[role="series"][data-series-id="Series 2"] circle')
		);

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'line'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("line");
	});

	it("orientation toggle flips chart.orientation", async () => {
		const before =
			(await chart.getProperty<"horizontal" | "vertical">("orientation")) ??
			"vertical";

		await driver.findElement(ORIENT_BTN).click();
		await chart.whenBusyContextReady();

		const after = await chart.getProperty<"horizontal" | "vertical">(
			"orientation"
		);
		expect(after).to.equal(before === "vertical" ? "horizontal" : "vertical");
	});

	it("programmatic changeSelection(['Series 1']) selects that line", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a point from Series 2 updates chart.selection", async () => {
		const point = await firstPointSeries2();
		await point.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 2");
	});
});
