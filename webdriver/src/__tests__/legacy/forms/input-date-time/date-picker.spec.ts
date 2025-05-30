// webdriver/src/__tests__/components/date-picker.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojDatePicker,
	OjDatePicker,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Inline Date Picker (basic demo)", function () {
	let driver!: WebDriver;
	let picker!: OjDatePicker;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=datepicker&demo=datepicker";
	const PICKER_LOCATOR = By.css("oj-date-picker"); // only one on the page

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		picker = await ojDatePicker(driver, PICKER_LOCATOR);
		await picker.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await picker.isDisplayed()).to.be.true;
	});

	it("programmatically sets a date with changeValue()", async () => {
		const iso = "2025-05-14"; // ISO-8601 yyyy-MM-dd

		await picker.changeValue(iso);
		await picker.whenBusyContextReady();

		expect(await picker.getValue()).to.equal(iso);
	});

	it("clear() empties the value", async () => {
		await picker.clear(); // TA helper
		await picker.whenBusyContextReady();

		const val = await picker.getValue();
		expect(val === null || val === "").to.be.true;
	});

	it("exposes min / max properties (if configured)", async () => {
		const min = await picker.getMin(); // may be null in this demo
		const max = await picker.getMax();

		expect([null, "string"].includes(typeof min)).to.be.true;
		expect([null, "string"].includes(typeof max)).to.be.true;
	});

	it("disabled property is a boolean", async () => {
		const disabled = await picker.getDisabled();
		expect(disabled).to.be.a("boolean");
	});
});
