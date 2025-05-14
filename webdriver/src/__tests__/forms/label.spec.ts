// webdriver/src/__tests__/forms/label.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojLabel, OjLabel } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Label (basic demo)", function () {
	let driver!: WebDriver;
	let label!: OjLabel;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=label&demo=label";
	const LABEL_LOCATOR = By.css("oj-label");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		label = await ojLabel(driver, LABEL_LOCATOR); // first <oj-label> in the demo
		await label.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await label.isDisplayed()).to.be.true;
	});

	it("has non-empty text", async () => {
		// Most adapters expose getText(); fall back to textContent if needed
		const txt =
			typeof (label as any).getText === "function"
				? await (label as any).getText()
				: await label.getProperty<string>("textContent");

		expect((txt ?? "").trim()).to.not.equal("");
	});

	it("`for` attribute references an existing form control", async () => {
		const forId = await (label as any).getFor?.(); // ojLabel.getFor() → string
		// If getFor() isn’t generated, read the raw attribute
		const id = forId ?? (await label.getAttribute("for"));
		expect(id).to.be.a("string").and.not.equal("");

		// The element referenced by `for` must exist and be displayed
		const target = await driver.findElement(By.id(id));
		expect(await target.isDisplayed()).to.be.true;
	});

	it("show-required flag (if present) surfaces via properties", async () => {
		const showReq =
			typeof (label as any).getShowRequired === "function"
				? await (label as any).getShowRequired()
				: await label.getAttribute("show-required");

		// Demo’s first label isn’t required, so we only assert the API shape
		expect(showReq === null || showReq === "required" || showReq === "").to.be
			.true;
	});
});
