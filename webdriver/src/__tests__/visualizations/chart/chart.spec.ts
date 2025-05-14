import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Area Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=areaChart&demo=default";
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

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await chart.isDisplayed()).to.be.true;
	});

	it("clicking the orientation toggle flips chart.orientation", async () => {
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

	it("clicking the stack toggle flips chart.stack", async () => {
		const before = (await chart.getProperty<"on" | "off">("stack")) ?? "off";

		await driver.findElement(STACK_BTN).click();
		await chart.whenBusyContextReady();

		const after = await chart.getProperty<"on" | "off">("stack");
		expect(after).to.equal(before === "off" ? "on" : "off");
	});

	it("programmatic changeSelection() selects the first series", async () => {
		await chart.changeSelection(["Series 1"]); // series id from demo
		await chart.whenBusyContextReady();

		const sel = (await chart.getSelection()) as string[];
		expect(sel).to.include("Series 1");
	});

	it("clicking an area updates chart.selection", async () => {
		// select an SVG path representing area of Series 2 group Q1
		const path = await chart.findElement(
			By.css('g[role="series"][data-series-id="Series 2"] path')
		);
		await path.click();
		await chart.whenBusyContextReady();

		const sel = await chart.getSelection();
		expect(sel).to.include("Series 2");
	});
});
