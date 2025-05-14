// webdriver/src/__tests__/diagram.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojDiagram, OjDiagram } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Diagram (default demo)", function () {
	let driver!: WebDriver;
	let diagram!: OjDiagram;

	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=diagram&demo=default";
	const DIAGRAM = By.css("oj-diagram");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		diagram = await ojDiagram(driver, DIAGRAM);
		await diagram.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await diagram.isDisplayed()).to.be.true;
	});

	it("getNodeContent() returns a node content object", async () => {
		const node = await diagram.getNodeContent(); // first node in dataset
		expect(node).to.not.equal(null);
	});

	it("panZoomState can be updated (pan)", async () => {
		const before = await diagram.getPanZoomState(); // { zoom, centerX, centerY }

		// Default demos typically supply non-null centers, but guard just in case
		const cx = before.centerX ?? 0;
		const cy = before.centerY ?? 0;

		await diagram.changePanZoomState({
			zoom: before.zoom,
			centerX: cx + 40,
			centerY: cy + 40,
		});
		await diagram.whenBusyContextReady();

		const after = await diagram.getPanZoomState();
		expect(after.centerX!).to.be.closeTo(cx + 40, 2);
		expect(after.centerY!).to.be.closeTo(cy + 40, 2);
	});

	it("panZoomState can be updated (zoom)", async () => {
		const state0 = await diagram.getPanZoomState();

		await diagram.changePanZoomState({
			zoom: state0.zoom * 1.2, // +20 %
			centerX: state0.centerX,
			centerY: state0.centerY,
		});
		await diagram.whenBusyContextReady();

		const state1 = await diagram.getPanZoomState();
		expect(state1.zoom).to.be.greaterThan(state0.zoom);
	});
});
