// webdriver/src/__tests__/patterns/action-card.spec.ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojActionCard,
	OjActionCard,
} from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Action Card (basic demo)", function () {
	let driver!: WebDriver;
	let card!: OjActionCard;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=actioncard&demo=basic";
	const LOCATOR = By.css("oj-action-card");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		card = await ojActionCard(driver, LOCATOR);
		await card.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders, is displayed, and is enabled", async () => {
		expect(await card.isDisplayed()).to.be.true;
		expect(await card.isEnabled()).to.be.true;
	});

	it("doAction() programmatically fires the card’s action", async () => {
		// The adapter provides a helper that performs a user-like click.
		await card.doAction(); // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
		await card.whenBusyContextReady();

		/* Cookbook shows feedback text immediately after the card.
       Verify that some text has changed from its initial empty/placeholder value. */
		const feedback = await driver.findElement(
			By.css("#actionCardFeedback, .demo-feedback, p") // fallback selectors
		);

		const text = await feedback.getText();
		expect(text.trim().length).to.be.greaterThan(0);
	});

	it("direct click behaves the same as doAction()", async () => {
		// Cache current feedback text
		const feedback = await driver.findElement(
			By.css("#actionCardFeedback, .demo-feedback, p")
		);
		const before = await feedback.getText();

		// Native click on the card
		await card.click();
		await card.whenBusyContextReady();

		const after = await feedback.getText();
		expect(after).to.not.equal(before);
	});
});
