// webdriver/src/__tests__/charts/combination-chart.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Combination Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=combinationChart&demo=default";
	const CHART_LOCATOR = By.css("oj-chart");
	const ORIENT_BTN = By.css('oj-button[value="orientation"]');
	const STACK_BTN = By.css('oj-button[value="stack"]');

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** CSS for the first bar rectangle of Series 2 */
	const barSelector = 'g[role="series"][data-series-id="Series 2"] rect';

	/** CSS for the first line point (circle) of Series 3 */
	const pointSelector = 'g[role="series"][data-series-id="Series 3"] circle';

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("combo");
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

	it("clicking a bar from Series 2 updates selection", async () => {
		const bar = await chart.findElement(By.css(barSelector));
		await bar.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 2");
	});

	it("clicking a line point from Series 3 updates selection", async () => {
		const point = await chart.findElement(By.css(pointSelector));
		await point.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 3");
	});
});
