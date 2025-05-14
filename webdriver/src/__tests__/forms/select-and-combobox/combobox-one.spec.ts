import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojComboboxOne,
	OjComboboxOne,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Combobox (One) overview demo", function () {
	let driver!: WebDriver;
	let combo!: OjComboboxOne;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=comboboxOne&demo=overview";
	const COMBO_LOCATOR = By.css("oj-combobox-one");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		combo = await ojComboboxOne(driver, COMBO_LOCATOR);
		await combo.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await combo.isDisplayed()).to.be.true;
	});

	it("changeValue(<first option>) updates getValue()", async () => {
		/* 1️⃣ grab the first option’s value from the component’s options array */
		const opts = (await combo.getOptions()) as Record<string, unknown>[];
		expect(opts).to.be.an("array").that.is.not.empty;

		const firstVal = opts[0]?.value ?? opts[0]?.id;
		expect(firstVal, "unexpected option shape").to.not.be.undefined;

		/* 2️⃣ set that value programmatically */
		await combo.changeValue(firstVal as string);
		await combo.whenBusyContextReady();

		/* 3️⃣ verify getValue() echoes it back */
		expect(await combo.getValue()).to.equal(firstVal);
	});

	it("clear() empties the component’s value", async () => {
		await combo.clear(); // TA helper
		await combo.whenBusyContextReady();

		const val = await combo.getValue();
		expect(val === null || val === "").to.be.true;
	});
});
