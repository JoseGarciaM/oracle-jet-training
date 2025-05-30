// webdriver/src/__tests__/charts/polar-chart.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Polar Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=polarChart&demo=default";

	const CHART_LOCATOR = By.css("oj-chart"); // only chart on page
	const GRID_BTN = By.css('oj-button[value="gridshape"]'); // “Grid Shape” toggle in demo

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns the first data point (circle) in Series 1. */
	const firstPoint = () =>
		chart.findElement(
			By.css('g[role="series"][data-series-id="Series 1"] circle')
		);

	/* ───────── tests ───────── */

	it("renders, is displayed, and uses a polar coordinate system", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("coordinateSystem")).to.equal(
			"polar"
		);
	});

	it("Grid Shape toggle flips styleDefaults.polar.gridShape", async () => {
		const before =
			(await chart.getProperty<any>("styleDefaults"))?.polar?.gridShape ??
			"circular";

		// if the demo ever changes and the button is missing simply skip
		if (await driver.findElements(GRID_BTN).then((a) => a.length)) {
			await driver.findElement(GRID_BTN).click();
			await chart.whenBusyContextReady();

			const after = (await chart.getProperty<any>("styleDefaults"))?.polar
				?.gridShape;
			expect(after).to.equal(before === "circular" ? "polygon" : "circular");
		}
	});

	it("programmatic changeSelection(['Series 1']) selects that series", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a point from Series 1 updates chart.selection", async () => {
		const pt = await firstPoint();
		await pt.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});
});
