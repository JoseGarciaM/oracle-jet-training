import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import {
	ojMessageBanner,
	OjMessageBanner,
} from "@oracle/oraclejet-webdriver/elements";
import type { SlotProxy } from "@oracle/oraclejet-webdriver"; // type-only

/* helper – unwrap SlotProxy → WebElement */
const unwrap = async (el: any): Promise<WebElement> =>
	el as unknown as WebElement;

describe("Oracle JET Cookbook – Message Banner (simple demo)", function () {
	let driver!: WebDriver;
	let banner!: OjMessageBanner;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=messagebanner&demo=simple";
	const LOCATOR = By.css("oj-message-banner");
	const ADD_BTN = By.css('oj-button[data-action="add"]'); // demo’s “Add Banner” button
	const CLEAR_ALL_BTN = By.css('oj-button[data-action="clearAll"]'); // demo’s “Clear All” button

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		banner = await ojMessageBanner(driver, LOCATOR);
		await banner.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Read the component’s `messages` array via getProperty(). */
	const getMessages = async () =>
		await banner.getProperty<{ key: string; summary: string }[]>("messages");

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await banner.isDisplayed()).to.be.true;
	});

	it("“Add Banner” appends a message entry", async () => {
		const before = (await getMessages()).length;

		await driver.findElement(ADD_BTN).click();
		await banner.whenBusyContextReady();

		const after = (await getMessages()).length;
		expect(after).to.equal(before + 1);
	});

	it("findDetail() returns a SlotProxy whose text matches the message", async () => {
		const msgs = await getMessages();
		const { key, summary } = msgs[0]; // newest first in this demo

		// Adapter exposes detail slot:
		const detailSlot = await banner.findDetail<string>({ key });
		const text = await (await unwrap(detailSlot)).getText();

		expect(text).to.include(summary);
	});

	it("doClose() removes the targeted banner", async () => {
		/* 1️⃣ ensure at least one message present */
		await driver.findElement(ADD_BTN).click();
		await banner.whenBusyContextReady();

		const msgsBefore = await getMessages();
		const closeKey = msgsBefore[0].key;

		/* 2️⃣ close it programmatically */
		await banner.doClose<string>({ key: closeKey });
		await banner.whenBusyContextReady();

		const msgsAfter = await getMessages();
		expect(msgsAfter.map((m) => m.key)).to.not.include(closeKey);
	});

	it("“Clear All” button empties the messages array", async () => {
		// add two messages first
		await driver.findElement(ADD_BTN).click();
		await driver.findElement(ADD_BTN).click();
		await banner.whenBusyContextReady();

		await driver.findElement(CLEAR_ALL_BTN).click();
		await banner.whenBusyContextReady();

		const msgs = await getMessages();
		expect(msgs).to.be.empty;
	});
});
