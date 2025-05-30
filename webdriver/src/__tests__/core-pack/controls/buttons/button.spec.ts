/**
 * button.spec.ts
 *
 * E2E test for the Core Pack “Push Button” demo:
 * https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=buttonsCorepack&demo=pushButton
 */
import { Builder, WebDriver, By } from "selenium-webdriver";
import {
	findButton,
	ButtonWebElement,
} from "@oracle/oraclejet-core-pack/webdriver";
import { expect } from "chai";

describe("JET Cookbook – Core Pack Push Button", () => {
	let driver: WebDriver;
	const URL =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=buttonsCorepack&demo=pushButton";

	before(async () => {
		driver = await new Builder().forBrowser("chrome").build();
		await driver.get(URL);
	});

	after(async () => {
		await driver.quit();
	});

	it("renders an enabled “Button” and stays enabled after click", async () => {
		// Locate the component through the Core-Pack Test Adapter
		const pushBtn: ButtonWebElement = await findButton(
			driver,
			// Narrow the search to the first Core-Pack button on the page.
			// If the demo adds more buttons, adjust the locator (e.g. By.id('pushButtonDemo'))
			By.css("oj-c-button")
		);

		// Adapter-level wait that wraps BusyContext
		await pushBtn.whenReady(); // prevents race conditions :contentReference[oaicite:0]{index=0}
		expect(await pushBtn.getLabel()).to.equal("Button"); // property, not text :contentReference[oaicite:1]{index=1}
		expect(await pushBtn.getDisabled()).to.be.false; // component API, not ‘disabled’ attr :contentReference[oaicite:2]{index=2}

		await pushBtn.click(); // high-level click helper :contentReference[oaicite:3]{index=3}

		// Demo has no side-effect to assert, so we simply re-check state
		expect(await pushBtn.getDisabled()).to.be.false;
	});
});
