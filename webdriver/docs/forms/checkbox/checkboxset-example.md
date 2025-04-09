# Testing an oj-checkboxset with @oracle/oraclejet-webdriver

The following **TypeScript** example shows how to automate tests against an **oj-checkboxset** in the [JET Cookbook checkboxsets “states” demo](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=checkboxsets&demo=states). It uses:

- **Mocha** for test structure (`describe`, `it`)
- **Chai** for assertions (`expect`)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojCheckboxset` function to wrap a Selenium `WebElement` as an `OjCheckboxset` instance

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojCheckboxset } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-checkboxset Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.)
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook page for checkboxsets => "states"
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=checkboxsets&demo=states"
		);
	});

	after(async function () {
		// Release/quit the driver
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-checkboxset is displayed and ready", async function () {
		// 1) Locate the oj-checkboxset by ID, e.g. "checkboxset1" (check actual ID in the DOM)
		const checkboxSet = await ojCheckboxset(driver, By.id("checkboxset1"));
		await checkboxSet.whenReady();

		// 2) Confirm it's displayed
		const displayed = await checkboxSet.isDisplayed();
		expect(displayed).to.be.true;

		// 3) Confirm it's enabled
		const enabled = await checkboxSet.isEnabled();
		expect(enabled).to.be.true;

		// 4) Retrieve the current selected values
		const initialValue = await checkboxSet.getValue();
		console.log("Initial selected values:", initialValue);
	});

	it("should select multiple checkboxes and verify them", async function () {
		// Re-locate or reuse the same reference
		const checkboxSet = await ojCheckboxset(driver, By.id("checkboxset1"));
		await checkboxSet.whenReady();

		// Suppose we want to select two checkboxes
		const newValues = ["optionA", "optionC"];
		await checkboxSet.changeValue(newValues);

		// Verify the updated selection
		const updatedValue = await checkboxSet.getValue();
		expect(updatedValue).to.deep.equal(newValues);
	});
});
```

## Key Points

1. **Driver Setup**

   - The example uses `DriverManager` to obtain a Selenium driver. If you have a custom setup, adapt accordingly (e.g., `new Builder().forBrowser("chrome").build()`).

2. **Locating the oj-checkboxset**

   - The call to `ojCheckboxset(driver, By.id("checkboxset1"))` wraps the raw Selenium `WebElement` in an `OjCheckboxset`. Adjust `"checkboxset1"` to match the actual ID in the Cookbook DOM.

3. **Readiness**

   - Use `await checkboxSet.whenReady()` to ensure the BusyContext is clear before proceeding with checks or interactions.

4. **Basic Checks**

   - `isDisplayed()` verifies visibility.
   - `isEnabled()` checks if the checkboxset is disabled or not.

5. **Reading/Setting Values**

   - `getValue()` retrieves the array of currently selected values.
   - `changeValue([...])` sets new selections for the checkbox set. In this demo, multiple selections are allowed, so you can specify several options.

6. **Assertions**

   - We use **Chai** for a fluent assertion style (`expect(...).to.be.true` and `expect(...).to.deep.equal(...)`).

7. **Tear Down**
   - `after()` calls `DriverManager.releaseDriver(driver)` to close the browser session when tests are done.
