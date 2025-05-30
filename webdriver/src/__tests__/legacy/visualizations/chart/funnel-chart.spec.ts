import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Funnel Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=funnelChart&demo=default";

	const CHART_LOCATOR = By.css("oj-chart");
	const ORIENT_BTN = By.css('oj-button[value="orientation"]'); // toggle in demo
	const THREED_BTN = By.css('oj-button[value="threed"]'); // 2D ↔ 3D toggle

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'funnel'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("funnel");
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

	it("2D / 3D toggle flips styleDefaults.threeDEffect", async () => {
		// read nested property via getProperty on the root
		const before =
			(await chart.getProperty<any>("styleDefaults"))?.threeDEffect ?? "off";

		await driver.findElement(THREED_BTN).click();
		await chart.whenBusyContextReady();

		const after = (await chart.getProperty<any>("styleDefaults"))?.threeDEffect;
		expect(after).to.equal(before === "off" ? "on" : "off");
	});

	it("programmatic changeSelection(['Prospects']) selects that slice", async () => {
		await chart.changeSelection(["Prospects"]); // id from demo
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include("Prospects");
	});

	it("clicking another slice updates chart.selection", async () => {
		// pick first <path> in slice group "Qualified"
		const slice = await chart.findElement(
			By.css('g[role="data"] path[data-category="Qualified"]')
		);
		await slice.click();
		await chart.whenBusyContextReady();

		const sel = await chart.getSelection();
		expect(sel).to.include("Qualified");
	});
});
