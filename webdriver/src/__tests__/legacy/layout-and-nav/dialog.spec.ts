import { expect } from "chai";
import { By, until, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojDialog, OjDialog } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Dialog (modal demo)", function () {
	let driver!: WebDriver;
	let dlg!: OjDialog; // populated after opening

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=dialog&demo=modal";
	const DIALOG_LOCATOR = By.css("oj-dialog");
	const LAUNCH_BTN_LOCATOR = By.css("oj-button, button");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Launch the modal dialog via the demo’s button. */
	const openDialog = async () => {
		const launchBtn = await driver.findElement(LAUNCH_BTN_LOCATOR);
		await launchBtn.click();

		// obtain adapter handle once dialog becomes part of the DOM
		dlg = await ojDialog(driver, DIALOG_LOCATOR);
		await dlg.whenReady(); // BusyContext ✓
	};

	/** Wait until the dialog is no longer displayed. */
	const waitUntilClosed = async () =>
		driver.wait(async () => !(await dlg.isDisplayed()), 4_000);

	/* ───────── tests ───────── */

	it('opens on button click and reports modality "modal"', async () => {
		await openDialog();

		expect(await dlg.isDisplayed()).to.be.true;
		expect(await dlg.getModality()).to.equal("modal"); // cookbook default
	});

	it("doClose() programmatically dismisses the dialog", async () => {
		await dlg.doClose(); // adapter helper :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
		await waitUntilClosed();
	});

	it("footer “OK” button also closes the dialog", async () => {
		/* re-open the dialog */
		await openDialog();

		/* click the user-supplied OK button in the footer */
		const okBtn = await dlg.findElement(
			By.css('oj-button[slot="footer"], button')
		);
		await okBtn.click();

		await waitUntilClosed();
	});
});
