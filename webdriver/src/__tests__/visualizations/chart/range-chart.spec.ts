import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Range Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=rangeChart&demo=default";

	const CHART_LOCATOR = By.css("oj-chart"); // only chart on page
	const ORIENT_BTN = By.css('oj-button[value="orientation"]'); // vertical ↔ horizontal
	const TYPE_BTN = By.css('oj-button[value="type"]'); // bar ↔ area

	/* ───────── bootstrap / teardown ───────── */
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

	it("type toggle flips between 'bar' and 'area'", async () => {
		const before = (await chart.getProperty<"bar" | "area">("type")) ?? "bar";

		await driver.findElement(TYPE_BTN).click();
		await chart.whenBusyContextReady();

		const after = await chart.getProperty<"bar" | "area">("type");
		expect(after).to.equal(before === "bar" ? "area" : "bar");
	});

	it("programmatic changeSelection(['Series 1']) selects that series", async () => {
		await chart.changeSelection(["Series 1"]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 1");
	});

	it("clicking a bar/area segment from Series 2 updates selection", async () => {
		// Works for either chart type – both have role="series" groups
		const segment = await chart.findElement(
			By.css('g[role="series"][data-series-id="Series 2"] *')
		);
		await segment.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Series 2");
	});
});
