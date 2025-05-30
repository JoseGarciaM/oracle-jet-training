import { expect } from "chai";
import { By, Key, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojComboboxMany,
	OjComboboxMany,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Combobox-Many (overview demo)", function () {
	let driver!: WebDriver;
	let combo!: OjComboboxMany;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=comboboxMany&demo=overview";
	const COMBO_LOCATOR = By.css("oj-combobox-many"); // first combo on page

	/* ───────── bootstrap / teardown ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		combo = await ojComboboxMany(driver, COMBO_LOCATOR);
		await combo.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await combo.isDisplayed()).to.be.true;
	});

	it("allows typing free-form text and reflects it in getValue()", async () => {
		// 1️⃣ add a unique chip via keyboard
		const INPUT = By.css("input");
		const UNIQUE = `test-${Date.now()}`; // guaranteed-unique tag

		await (await combo.findElement(INPUT)).sendKeys(UNIQUE, Key.ENTER);
		await combo.whenBusyContextReady();

		// 2️⃣ the adapter API should now include that value
		const value = (await combo.getValue()) as string[];
		expect(value).to.include(UNIQUE);
	});

	it("changeValue([]) clears the selection", async () => {
		await combo.changeValue([]); // TA helper
		await combo.whenBusyContextReady();

		const cleared = (await combo.getValue()) as string[] | null;
		expect(cleared).to.satisfy(
			(v: string[] | null) => v === null || v.length === 0
		);
	});

	it("supports multiple programmatic selections", async () => {
		// The demo’s inline <oj-option> values are simple ISO codes.
		const MULTI = ["AF", "AL", "DZ"]; // Afghanistan, Albania, Algeria
		await combo.changeValue(MULTI);
		await combo.whenBusyContextReady();

		const selected = (await combo.getValue()) as string[];
		expect(selected).to.have.members(MULTI);
	});
});
