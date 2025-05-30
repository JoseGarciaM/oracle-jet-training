import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Pyramid Chart (default demo)", function () {
	let driver!: WebDriver;
	let chart!: OjChart;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pyramidChart&demo=default";

	const CHART_LOCATOR = By.css("oj-chart"); // only chart on the page
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

	/** All slice <path> elements */
	const slicePaths = () =>
		chart.findElements(By.css('g[role="data"] path[data-category]'));

	/** data-category of a slice */
	const categoryOf = async (el: any) => el.getAttribute("data-category");

	/* ───────── tests ───────── */

	it("renders, is displayed, and type === 'pyramid'", async () => {
		expect(await chart.isDisplayed()).to.be.true;
		expect(await chart.getProperty<string>("type")).to.equal("pyramid");
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

	it("clicking a different slice updates chart.selection", async () => {
		const slices = await slicePaths();
		const currentSel = await chart.getSelection(); // no <string[]>

		// find a slice whose category is not currently selected
		const targetSlice = await (async () => {
			for (const p of slices) {
				const cat = await categoryOf(p);
				if (!currentSel.includes(cat)) return p;
			}
			return slices[1]; // fallback
		})();

		const targetCat = await categoryOf(targetSlice);
		await targetSlice.click();
		await chart.whenBusyContextReady();

		expect(await chart.getSelection()).to.include(targetCat);
	});
});
