// webdriver/src/__tests__/charts/spark-chart.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojChart, OjChart } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Spark Chart (default demo)", function () {
	let driver!: WebDriver;
	let spark!: OjChart; // generic chart adapter

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=sparkChart&demo=default";
	const SPARK_LOCATOR = By.css("oj-spark-chart"); // element tag for spark chart

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		spark = await ojChart(driver, SPARK_LOCATOR);
		await spark.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await spark.isDisplayed()).to.be.true;
	});

	it("reports a non-empty chart type", async () => {
		const type = await spark.getProperty<string>("type"); // 'line','bar',etc.
		expect(type).to.be.a("string").and.not.equal("");
	});

	it("items array (property) is not empty", async () => {
		const items = await spark.getProperty<any[]>("items"); // spark data array
		expect(Array.isArray(items) && items.length).to.be.greaterThan(0);
	});
});
