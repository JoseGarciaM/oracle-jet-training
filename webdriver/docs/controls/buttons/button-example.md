# Testing an oj-button with @oracle/oraclejet-webdriver

The following **TypeScript** example illustrates how to automate tests against an **oj-button** in the [JET Cookbook pushButtons demo](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pushButtons&demo=pushButton). It uses:

- **Mocha** (describe/it)
- **Chai** (expect)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojButton` function to wrap a Selenium `WebElement` as an `OjButton` instance.

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButton } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook Button Test", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.) using DriverManager
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook pushButtons demo
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=pushButtons&demo=pushButton"
		);
	});

	it("should click the push button and verify it is displayed", async function () {
		// Wrap the raw DOM element as an OjButton.
		// Replace "button1" with the actual DOM id used in the JET Cookbook.
		const button = await ojButton(driver, By.id("button1"));

		// Wait until the button is fully ready (BusyContext is clear).
		await button.whenReady();

		// Confirm it's displayed.
		const isDisplayed = await button.isDisplayed();
		expect(isDisplayed).to.be.true;

		// Confirm it's enabled.
		const enabled = await button.isEnabled();
		expect(enabled).to.be.true;

		// (Optional) Retrieve and log the button label
		const label = await button.getLabel();
		console.log("Button label is:", label);

		// Click the button
		await button.click();

		// TODO: Add assertions to verify any side effects triggered by the click
	});

	after(async function () {
		// Clean up: release/quit the driver
		await DriverManager.releaseDriver(driver);
	});
});
```

## Key Points

1. **Locating the oj-button**

   - The code searches by ID (`By.id("button1")`) in the JET Cookbook’s DOM. Adjust this string to match the real ID used in the pushButtons demo (could be `"pushButton1"`, `"button1"`, etc.).

2. **Wrapping as OjButton**

   - `ojButton(driver, By.id(...))` returns a `Promise<OjButton>`. Always **await** this before calling methods like `.whenReady()`.

3. **Awaiting BusyContext**

   - Call `await button.whenReady()` to ensure the component is fully rendered, so further interactions or checks don’t happen prematurely.

4. **Basic Assertions**

   - `isDisplayed()` and `isEnabled()` confirm the button is visible and interactive.
   - `getLabel()` retrieves the button’s text/label from the DOM (useful if verifying text or for debugging).

5. **Click Action**

   - Use `await button.click()` to simulate a user click. If your JET page triggers a UI update or console output upon clicking, you can assert those side effects here.

6. **Driver Lifecycle**
   - Using `DriverManager.getDriver()` and `releaseDriver(driver)` is a convenient pattern provided by **@oracle/oraclejet-webdriver**. If you have a custom Selenium setup, adapt accordingly.
