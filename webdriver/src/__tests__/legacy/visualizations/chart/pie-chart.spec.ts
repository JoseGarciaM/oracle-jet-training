import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Pie Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pieChart&demo=default";
	const CHART_LOCATOR = By.css("oj-chart");
	const THREED_BTN = By.css('oj-button[value="threed"]'); // 2D ↔ 3D toggle

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		chart = await ojChart(driver, CHART_LOCATOR);
		await chart.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns all slice <path> elements in DOM order. */
	const slicePaths = () =>
		chart.findElements(By.css('g[role="data"] path[data-category]'));

	/** Reads the data-category attribute from a slice path element. */
	const categoryOf = async (el: any) => el.getAttribute("data-category");

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'pie'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("pie");
	});

	it("3D toggle flips styleDefaults.threeDEffect", async () => {
		const before =
			(await chart.getProperty<any>("styleDefaults"))?.threeDEffect ?? "off";

		await driver.findElement(THREED_BTN).click();
		await chart.whenBusyContextReady();

		const after = (await chart.getProperty<any>("styleDefaults"))?.threeDEffect;
		expect(after).to.equal(before === "off" ? "on" : "off");
	});

	it("programmatic changeSelection(<first category>) selects that slice", async () => {
		const firstCat = await categoryOf((await slicePaths())[0]);
		await chart.changeSelection([firstCat]);
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include(firstCat);
	});

	it("clicking another slice updates chart.selection", async () => {
		const paths = await slicePaths();
		// choose a different category than currently selected
		const secondCat = await categoryOf(
			paths.find(async (p: any) => {
				return !(await chart.getSelection()).includes(
					await p.getAttribute("data-category")
				);
			}) || paths[1]
		);

		// click that slice
		const target = await chart.findElement(
			By.css(`path[data-category="${secondCat}"]`)
		);
		await target.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include(secondCat);
	});
});
