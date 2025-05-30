import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Line-with-Area Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=lineWithAreaChart&demo=default";
	const CHART = By.css("oj-chart");
	const ORIENT_BTN = By.css('oj-button[value="orientation"]');
	const STACK_BTN = By.css('oj-button[value="stack"]');

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** First data point (circle) of Series 2 */
	const pointSeries2 = () =>
		chart.findElement(
			By.css('g[role="series"][data-series-id="Series 2"] circle')
		);

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'lineWithArea'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("lineWithArea");
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

	it("stack toggle flips chart.stack", async () => {
		const before = (await chart.getProperty<"on" | "off">("stack")) ?? "off";

		await driver.findElement(STACK_BTN).click();
		await chart.whenBusyContextReady();

		const after = await chart.getProperty<"on" | "off">("stack");
		expect(after).to.equal(before === "off" ? "on" : "off");
	});

	it("programmatic changeSelection(['Series 1']) selects that series", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a point from Series 2 updates selection", async () => {
		const pt = await pointSeries2();
		await pt.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 2");
	});
});
