import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojSlider, OjSlider } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Slider (states demo)", function () {
	let driver!: WebDriver;
	let slider!: OjSlider;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=slider&demo=states";
	const SLIDER = By.css("oj-slider"); // first slider on the page

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		slider = await ojSlider(driver, SLIDER);
		await slider.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await slider.isDisplayed()).to.be.true;
	});

	it("changeValue(42) updates the component", async () => {
		await slider.changeValue(42); // TA helper
		await slider.whenBusyContextReady();

		const val = await slider.getValue(); // returns number
		expect(val).to.equal(42);
	});

	it("getTransientValue() returns a number while editing", async () => {
		// bump the value again to generate a transient update
		await slider.changeValue(55);
		const tVal = await slider.getTransientValue(); // no generic arg → ✔
		expect(typeof tVal).to.equal("number");
	});

	it("can be reset to its minimum via changeValue(min)", async () => {
		const min = await slider.getMin();
		await slider.changeValue(min);
		await slider.whenBusyContextReady();

		expect(await slider.getValue()).to.equal(min);
	});
});
