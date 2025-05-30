import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojColorSpectrum,
	OjColorSpectrum,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Color Spectrum (spectrum demo)", function () {
	let driver!: WebDriver;
	let spectrum!: OjColorSpectrum;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=colorSpectrum&demo=spectrum";
	const SPEC_LOCATOR = By.css("oj-color-spectrum");
	const INITIAL_SWATCH = By.css(
		'[data-oj-test="initial-swatch"], .oj-color-spectrum-initial'
	);

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		spectrum = await ojColorSpectrum(driver, SPEC_LOCATOR);
		await spectrum.whenReady();
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await spectrum.isDisplayed()).to.be.true;
	});

	it('changeValue("#ff0000") updates the component value', async () => {
		await spectrum.changeValue("#ff0000");
		await spectrum.whenBusyContextReady();

		expect(await spectrum.getValue()).to.equal("#ff0000");
	});

	it("clicking the “Initial” swatch restores the original color", async () => {
		const original = await spectrum.getValue(); // generic removed

		await spectrum.changeValue("#00ff00");
		await spectrum.whenBusyContextReady();
		expect(await spectrum.getValue()).to.equal("#00ff00");

		await driver.findElement(INITIAL_SWATCH).click();
		await spectrum.whenBusyContextReady();

		expect(await spectrum.getValue()).to.equal(original);
	});

	it("reports transient value changes via getTransientValue()", async () => {
		const tVal = await spectrum.getTransientValue(); // generic removed
		expect(tVal).to.be.an("object");
	});

	it("respects the disabled property", async () => {
		const disabled = await spectrum.getDisabled();
		expect(disabled).to.be.a("boolean");
	});
});
