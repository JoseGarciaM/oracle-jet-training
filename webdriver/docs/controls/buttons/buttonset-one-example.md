# Testing an oj-buttonset-one with @oracle/oraclejet-webdriver

The following **TypeScript** example demonstrates how to automate tests against an **oj-buttonset-one** in the [JET Cookbook buttonsetone demo (oneOverview)](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=buttonsetone&demo=oneOverview). It uses:

- **Mocha** (describe/it)
- **Chai** (expect)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojButtonsetOne` function to wrap a Selenium `WebElement` as an `OjButtonsetOne` instance.

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButtonsetOne } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-buttonset-one Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.)
		driver = await DriverManager.getDriver();

		// Navigate to the buttonsetone "oneOverview" demo
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=buttonsetone&demo=oneOverview"
		);
	});

	after(async function () {
		// Release/quit the driver
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-buttonset-one is displayed and ready", async function () {
		// 1) Locate the oj-buttonset-one by ID, e.g. "buttonsetOne1" (check actual ID in the DOM)
		const buttonsetOne = await ojButtonsetOne(driver, By.id("buttonsetOne1"));
		await buttonsetOne.whenReady();

		// 2) Confirm the element is displayed
		const displayed = await buttonsetOne.isDisplayed();
		expect(displayed).to.be.true;

		// 3) Optionally, check its disabled state
		const isDisabled = await buttonsetOne.getDisabled();
		expect(isDisabled).to.be.false; // Or .to.be.true if that’s expected

		// 4) Retrieve and log the current selected value
		const initialValue = await buttonsetOne.getValue();
		console.log("Initial selected value:", initialValue);
	});

	it("should select a different single value and verify it", async function () {
		// Re-locate the same element or reuse a cached reference if you prefer
		const buttonsetOne = await ojButtonsetOne(driver, By.id("buttonsetOne1"));
		await buttonsetOne.whenReady();

		// Example: we want to change the selection to "optionB"
		await buttonsetOne.changeValue("optionB");

		// Verify the updated value
		const updatedValue = await buttonsetOne.getValue();
		expect(updatedValue).to.equal("optionB");
	});
});
```

## Key Points

1. **Locating the oj-buttonset-one**

   - Use `ojButtonsetOne(driver, By.id("buttonsetOne1"))` to wrap the raw DOM element. Ensure `"buttonsetOne1"` matches the actual ID in the **oneOverview** demo’s HTML.

2. **Ensuring Readiness**

   - Call `await buttonsetOne.whenReady()` to confirm the BusyContext has cleared, preventing premature interactions or verifications.

3. **Visibility and Disabled State**

   - `isDisplayed()` checks for visual presence.
   - `getDisabled()` returns a boolean indicating whether the entire buttonset is disabled.

4. **Reading the Current Selection**

   - `getValue()` retrieves the string that represents the currently selected option.

5. **Changing the Selection**

   - `changeValue("optionB")` updates the buttonset’s selection to the given option value. You must pass a string that matches one of the `oj-options` in the DOM.

6. **Assertions**

   - We use **Chai**’s `expect(...)` to confirm the expected states (e.g., `to.be.true`, `to.equal(...)`).

7. **Driver Lifecycle**
   - The sample uses `DriverManager.getDriver()` and `releaseDriver(driver)` from **@oracle/oraclejet-webdriver** for convenience. Adapt if you have a different Selenium setup.
