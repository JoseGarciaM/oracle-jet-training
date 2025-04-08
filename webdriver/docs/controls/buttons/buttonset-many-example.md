# Testing an oj-buttonset-many with @oracle/oraclejet-webdriver

The following **TypeScript** example illustrates how to automate tests against an **oj-buttonset-many** in the [JET Cookbook toggleButtons demo (manyOverview)](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=toggleButtons&demo=manyOverview). It uses:

- **Mocha** (describe/it)
- **Chai** (expect)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojButtonsetMany` function to wrap a Selenium `WebElement` as an `OjButtonsetMany` instance.

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojButtonsetMany } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-buttonset-many Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire the WebDriver instance (Chrome, etc.) however your project is set up
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook page for "Toggle Buttons" => "manyOverview"
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=toggleButtons&demo=manyOverview"
		);
	});

	after(async function () {
		// Release/quit the driver
		await DriverManager.releaseDriver(driver);
	});

	it("should load oj-buttonset-many and confirm it's ready", async function () {
		// 1) Locate the oj-buttonset-many element by ID (example: "buttonsetMany1")
		//    Adjust to match the actual ID in the JET Cookbook DOM
		const buttonset = await ojButtonsetMany(driver, By.id("buttonsetMany1"));

		// 2) Wait until it's fully ready (BusyContext is clear)
		await buttonset.whenReady();

		// 3) Confirm it's displayed on the page
		const displayed = await buttonset.isDisplayed();
		expect(displayed).to.be.true;

		// 4) (Optional) Check which items are initially selected
		const initialValue = await buttonset.getValue();
		console.log("Initial selected values:", initialValue);
		// e.g. might be [] or ["option1"] depending on the demo’s defaults
	});

	it("should change the value and verify selection", async function () {
		// Re-locate the same element or reuse a cached reference if you prefer
		const buttonset = await ojButtonsetMany(driver, By.id("buttonsetMany1"));
		await buttonset.whenReady();

		// Suppose we want to select two options in the buttonset.
		// The actual string array you pass to changeValue() must match
		// the "value" or "option" attributes in the JET Cookbook's buttonset
		const newSelection = ["option1", "option3"];

		// 1) Set the new value
		await buttonset.changeValue(newSelection);

		// 2) Retrieve the updated value
		const updatedValue = await buttonset.getValue();

		// 3) Verify it matches what we set
		expect(updatedValue).to.deep.equal(newSelection);

		// You can also click specific buttons within the buttonset,
		// but typically you'd do that by findElement(...) on the child buttons.
	});
});
```

## Key Points

1. **Locating the oj-buttonset-many**

   - The code searches by ID (`By.id("buttonsetMany1")`) in the JET Cookbook’s DOM. Update this string to match the actual ID in the manyOverview example.

2. **Wrapping as OjButtonsetMany**

   - `ojButtonsetMany(driver, By.id(...))` returns a `Promise<OjButtonsetMany>`. You must **await** it before calling methods like `.whenReady()`.

3. **Ensuring Readiness**

   - Call `await buttonset.whenReady()` to ensure the BusyContext is finished before interacting with the buttonset.

4. **Reading/Changing the Value**

   - `getValue()` returns an array (e.g. `["option1"]`) representing currently selected options.
   - `changeValue([...])` sets new selections. You must pass the option names matching the actual `value` attributes in the HTML.

5. **Verifying Selections**

   - After calling `changeValue()`, you can call `getValue()` again to verify the new state. Use `expect(updatedValue).to.deep.equal(...)` for array comparisons in **Chai**.

6. **Driver Lifecycle**
   - The example uses `DriverManager.getDriver()` and `releaseDriver(driver)` from **@oracle/oraclejet-webdriver** for convenience. If you use a different approach (like a custom Selenium builder), adapt accordingly.
