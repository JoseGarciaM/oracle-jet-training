import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojSelectMany,
	OjSelectMany,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Select (Many) overview demo", function () {
	let driver!: WebDriver;
	let sel!: OjSelectMany;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=selectMany&demo=overview";
	const LOCATOR = By.css("oj-select-many");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		sel = await ojSelectMany(driver, LOCATOR);
		await sel.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/**
	 * Grabs the first *n* option values inside the Select;
	 * used so we never hard-code cookbook data.
	 */
	const firstOptionValues = async (n = 2): Promise<string[]> =>
		driver.executeScript<string[]>(
			/* istanbul ignore next */
			function (count: number) {
				const select = document.querySelector("oj-select-many")!;
				// ❗ <oj-option> elements aren’t in the light DOM – use component API
				//    Every oj-select-many exposes a `rawValueOptions` private member,
				//    but to stay safe we’ll query shadow DOM instead.
				const opts = (
					(select as any).shadowRoot || (select as any)
				).querySelectorAll("oj-option");
				return Array.from(opts)
					.slice(0, count)
					.map((o: any) => o.value as string);
			},
			n
		);

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await sel.isDisplayed()).to.be.true;
	});

	it("programmatically selects two values via changeValue()", async () => {
		const values = await firstOptionValues(2);
		expect(values.length).to.equal(2); // sanity

		await sel.changeValue(values);
		await sel.whenBusyContextReady();

		const current = (await sel.getValue()) as string[] | null;
		expect(current).to.include.members(values);
	});

	it("changeValue([]) clears the selection", async () => {
		await sel.changeValue([]); // TA helper
		await sel.whenBusyContextReady();

		const cleared = (await sel.getValue()) as string[] | null;
		expect(cleared).to.satisfy(
			(v: unknown) => v === null || (Array.isArray(v) && v.length === 0)
		);
	});

	it("clear() helper works the same as changeValue([])", async () => {
		// make sure there’s at least one value first
		const [first] = await firstOptionValues(1);
		await sel.changeValue([first]);
		await sel.whenBusyContextReady();

		await sel.clear(); // built-in helper
		await sel.whenBusyContextReady();

		const val = (await sel.getValue()) as string[] | null;
		expect(val === null || val.length === 0).to.be.true;
	});
});
