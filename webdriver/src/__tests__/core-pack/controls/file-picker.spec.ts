import { Builder, WebDriver, By, until } from "selenium-webdriver";
import {
	findFilePicker,
	FilePickerWebElement,
} from "@oracle/oraclejet-core-pack/webdriver";
import { expect } from "chai";

const DEMO_URL =
	"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=filePickerCorepack&demo=restrictFileTypes";

const ACCEPTED_PNG = { path: "/tmp/demo-image.png", type: "image/png" };
const INVALID_PDF = { path: "/tmp/document.pdf", type: "application/pdf" };

describe("JET Cookbook – Core Pack File Picker (restrictFileTypes)", () => {
	let driver: WebDriver;
	let picker: FilePickerWebElement;

	before(async () => {
		driver = await new Builder().forBrowser("chrome").build();
		await driver.get(DEMO_URL);

		// Locate the component via the Core‑Pack adapter helper
		picker = await findFilePicker(driver, By.css("oj-c-file-picker"));
		await picker.whenReady(); // BusyContext + visibility guard
	});

	after(async () => {
		await driver.quit();
	});

	it("accepts a PNG and lists it in the UI", async () => {
		const accepted = await picker.doSelect([ACCEPTED_PNG]);
		expect(accepted).to.equal(true, "PNG should be accepted by default");

		// Cookbook renders selected files in a <ul aria-label="selected-files">
		await driver.wait(
			until.elementLocated(By.css('[aria-label="selected-files"] li')),
			5000
		);
	});

	it("rejects a PDF and shows an invalidSelect message", async () => {
		const accepted = await picker.doSelect([INVALID_PDF]);
		expect(accepted).to.equal(false, "PDF should be rejected");

		// Wait for an invalid-select message – depends on cookbook markup
		await driver.wait(
			until.elementLocated(
				By.css(
					".oj-message .oj-message-title, .oj-c-file-picker .oj-invalid-select"
				)
			),
			5000
		);
	});
});
