import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojRangeSlider,
	OjRangeSlider,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Range Slider (states demo)", function () {
	let driver!: WebDriver;
	let rs!: OjRangeSlider; // first non-disabled slider

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=rangeSlider&demo=states";
	const SLIDER_LOCATOR = By.css("oj-range-slider:not([disabled])");

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		rs = await ojRangeSlider(driver, SLIDER_LOCATOR);
		await rs.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await rs.isDisplayed()).to.be.true;
	});

	it("changeValue({start,end}) sets the range", async () => {
		const min = await rs.getMin();
		const max = await rs.getMax();

		const newRange = { start: min + 10, end: max - 10 }; // ← object
		await rs.changeValue(newRange);
		await rs.whenBusyContextReady();

		const val = (await rs.getValue()) as { start: number; end: number };
		expect(val).to.deep.equal(newRange);
	});

	it("getTransientValue() returns an object while editing", async () => {
		const cur = (await rs.getValue()) as { start: number; end: number };
		await rs.changeValue({ start: cur.start + 1, end: cur.end - 1 });

		const transient = (await rs.getTransientValue()) as {
			start: number;
			end: number;
		};
		expect(
			typeof transient.start === "number" && typeof transient.end === "number"
		).to.be.true;
	});

	it("disabled range-slider instance is not enabled", async () => {
		const disabledRs = await ojRangeSlider(
			driver,
			By.css("oj-range-slider[disabled]")
		);
		await disabledRs.whenReady();

		expect(await disabledRs.isEnabled()).to.be.false;
	});
});
