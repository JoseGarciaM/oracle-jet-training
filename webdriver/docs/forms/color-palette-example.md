# Testing an oj-color-palette with @oracle/oraclejet-webdriver

The following **TypeScript** example demonstrates how to automate tests against an **oj-color-palette** in the [JET Cookbook colorPalette “paletteGridSwatchSizes” demo](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=colorPalette&demo=paletteGridSwatchSizes). It uses:

- **Mocha** (describe/it)
- **Chai** (expect)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojColorPalette` function to wrap a Selenium `WebElement` as an `OjColorPalette` instance

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojColorPalette } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-color-palette Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.)
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook colorPalette => "paletteGridSwatchSizes"
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=colorPalette&demo=paletteGridSwatchSizes"
		);
	});

	after(async function () {
		// Release/quit the driver after tests
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-color-palette is displayed and retrieve its initial color", async function () {
		// 1) Locate the oj-color-palette by ID, e.g. "colorPalette1" (check actual DOM ID)
		const colorPalette = await ojColorPalette(driver, By.id("colorPalette1"));
		await colorPalette.whenReady();

		// 2) Confirm it's displayed
		const displayed = await colorPalette.isDisplayed();
		expect(displayed).to.be.true;

		// 3) (Optional) Check if it's disabled
		const isDisabled = await colorPalette.getDisabled();
		console.log("Disabled status:", isDisabled);

		// 4) Retrieve the currently selected color value
		const initialColor = await colorPalette.getValue();
		console.log("Initial color value:", initialColor);
	});

	it("should set a new color value and verify it", async function () {
		const colorPalette = await ojColorPalette(driver, By.id("colorPalette1"));
		await colorPalette.whenReady();

		// 1) Specify the new color to select (e.g. #FF0000)
		const newColor = "#FF0000";

		// 2) Update the palette’s value
		await colorPalette.changeValue(newColor);

		// 3) Retrieve the updated value and verify
		const updatedValue = await colorPalette.getValue();
		expect(updatedValue).to.equal(newColor);
	});
});
```

## Key Points

1. **Locating the oj-color-palette**

   - The spec uses `ojColorPalette(driver, By.id("colorPalette1"))` to locate and wrap the raw element.
   - Replace `"colorPalette1"` with the actual DOM ID used in the **paletteGridSwatchSizes** demo.

2. **Ensuring Readiness**

   - `await colorPalette.whenReady()` ensures the busy context is clear before you interact or check states.

3. **Visibility & Disabled State**

   - `isDisplayed()` checks that the palette is visible on the page.
   - `getDisabled()` returns a boolean if `disabled` is supported by the palette (though it may be deprecated or non-functional per Redwood specs).

4. **Reading the Current Color**

   - `getValue()` returns the palette’s current color, typically a string (e.g., `#FF0000`). In some cases, it could be an object.

5. **Updating the Color**

   - `changeValue(newColor)` programmatically selects the specified color.
   - Retrieving `getValue()` again allows you to verify that the palette updated.

6. **Assertions**

   - Uses **Chai**’s `expect(...)` for straightforward validation (e.g., `expect(...).to.equal(...)`).

7. **Driver Lifecycle**
   - The `before` hook sets up the driver and navigates to the Cookbook, and the `after` hook calls `DriverManager.releaseDriver(driver)` to shut down the browser session.
