// webdriver/src/__tests__/charts/bar-chart.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Bar Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=barChart&demo=default";
	const CHART = By.css("oj-chart");
	const ORIENT = By.css('oj-button[value="orientation"]'); // demo toggle buttons
	const STACK = By.css('oj-button[value="stack"]');

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await chart.isDisplayed()).to.be.true;
	});

	it("orientation toggle flips chart.orientation", async () => {
		const before =
			(await chart.getProperty<"horizontal" | "vertical">("orientation")) ??
			"vertical";

		await driver.findElement(ORIENT).click();
		await chart.whenBusyContextReady();

		const after = await chart.getProperty<"horizontal" | "vertical">(
			"orientation"
		);
		expect(after).to.equal(before === "vertical" ? "horizontal" : "vertical");
	});

	it("stack toggle flips chart.stack", async () => {
		const before = (await chart.getProperty<"on" | "off">("stack")) ?? "off";

		await driver.findElement(STACK).click();
		await chart.whenBusyContextReady();

		const after = await chart.getProperty<"on" | "off">("stack");
		expect(after).to.equal(before === "off" ? "on" : "off");
	});

	it("programmatic changeSelection(['Series 1']) highlights that bar set", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a bar selects its series", async () => {
		// pick the first rect inside Series 2
		const bar = await chart.findElement(
			By.css('g[role="series"][data-series-id="Series 2"] rect')
		);
		await bar.click();
		await chart.whenBusyContextReady();

		const sel = await chart.getSelection();
		expect(sel).to.include("Series 2");
	});
});
