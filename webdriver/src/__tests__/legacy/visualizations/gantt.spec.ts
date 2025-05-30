// webdriver/src/__tests__/collections/gantt.spec.ts
//--------------------------------------------------
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojGantt, OjGantt } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Gantt (overview demo)", function () {
	let driver!: WebDriver;
	let gantt!: OjGantt;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=gantt&demo=overview";
	const LOCATOR = By.css("oj-gantt");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		gantt = await ojGantt(driver, LOCATOR);
		await gantt.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await gantt.isDisplayed()).to.be.true;
	});

	it("getRows() returns a non-empty array", async () => {
		const rows = await gantt.getRows(); // any[]
		expect(Array.isArray(rows) && rows.length).to.be.greaterThan(0);
	});

	it("changeSelection([...]) selects the first row and reports it back", async () => {
		// rows supplied by the demo have an `id` we can use for selection
		const [first] = (await gantt.getRows()) as Array<{ id?: unknown }>;
		expect(first?.id, "row object should expose an id").to.not.be.undefined;

		await gantt.changeSelection([first!.id as unknown]);
		const sel = await gantt.getSelection();
		expect(sel).to.include(first!.id);
	});

	it("getScrollPosition() exposes numeric x/y and can be round-tripped", async () => {
		const pos = await gantt.getScrollPosition(); // { x, y, … }

		// Sanity: x and y should be numbers (>= 0)
		expect(typeof (pos as any).x).to.equal("number");
		expect(typeof (pos as any).y).to.equal("number");

		// Round-trip without modification (no TypeScript error)
		await gantt.changeScrollPosition(pos as any);
		await gantt.whenBusyContextReady();

		const pos2 = await gantt.getScrollPosition();
		expect((pos2 as any).x).to.equal((pos as any).x);
		expect((pos2 as any).y).to.equal((pos as any).y);
	});
});
