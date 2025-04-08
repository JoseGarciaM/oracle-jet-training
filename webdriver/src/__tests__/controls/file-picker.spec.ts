import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { WebDriver, By } from "selenium-webdriver";
import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojFilePicker } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook File Picker Test", function () {
	let driver: WebDriver;

	// Increase Mocha timeout if needed (since file IO can be slow in some setups)
	this.timeout(60000);

	before(async function () {
		// Acquire a Selenium WebDriver instance
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook's File Picker demo
		await ojwd.get(
			driver,
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=filePicker&demo=overview"
		);
	});

	after(async function () {
		// Release the driver to free up resources
		await DriverManager.releaseDriver(driver);
	});

	it("should select an accepted file and display it in the list", async function () {
		// 1) Locate the oj-file-picker
		//    Check the actual JET Cookbook DOM for the correct ID or locator
		const filePicker = await ojFilePicker(driver, By.id("filepicker"));

		// 2) Wait until it's fully ready
		await filePicker.whenReady();

		// 3) Verify that multiple image types are accepted (as the demo claims)
		const acceptList = await filePicker.getAccept();
		expect(acceptList).to.include("image/*");

		// 4) Simulate selecting a valid image file:
		//    Replace the path & type with a real file on your test machine
		//    The library will handle sending only the basename to the browser
		const success = await filePicker.doSelect([
			{ path: "/absolute/path/to/myTestImage.jpg", type: "image/jpeg" },
		]);
		// doSelect() returns `true` if it successfully set the file input.
		expect(success).to.be.true;

		// 5) In the cookbook demo, the list of selected files is displayed in an element.
		//    Inspect the DOM to see how it shows the filenames. For instance, maybe there's
		//    an element with ID="results" or "fileList" where the filename appears.
		const fileListEl = await driver.findElement(By.id("fileList"));
		const listText = await fileListEl.getText();

		// Confirm the file's basename is displayed
		// If your local file is "myTestImage.jpg", that should appear in the text
		expect(listText).to.include("myTestImage.jpg");
	});

	it("should select an invalid file type and display an error", async function () {
		// In the Cookbook, dropping an invalid file triggers an "ojInvalidSelect" event.
		// We can simulate that by calling doSelect() with a mismatched type.

		const filePicker = await ojFilePicker(driver, By.id("filepicker"));
		await filePicker.whenReady();

		// Suppose the File Picker is only set to accept images. We'll pass a .txt file
		const success = await filePicker.doSelect([
			{ path: "/absolute/path/to/notes.txt", type: "text/plain" },
		]);
		expect(success).to.be.true;

		// The demo might display an error message or "Invalid file type" somewhere:
		const errorEl = await driver.findElement(By.id("invalidMsg"));
		const errorText = await errorEl.getText();
		expect(errorText).to.include("Invalid file");
	});
});
