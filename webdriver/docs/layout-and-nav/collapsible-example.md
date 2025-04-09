# Testing an oj-collapsible with @oracle/oraclejet-webdriver

The following **TypeScript** example shows how to automate tests against an **oj-collapsible** in the [JET Cookbook collapsible “basicCollapsible” demo](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=collapsible&demo=basicCollapsible). It uses:

- **Mocha** (describe/it)
- **Chai** (expect)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojCollapsible` function to wrap a Selenium `WebElement` as an `OjCollapsible` instance

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojCollapsible } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook oj-collapsible Demo Tests", function () {
	let driver: WebDriver;

	before(async function () {
		// Acquire a WebDriver instance (Chrome, etc.)
		driver = await DriverManager.getDriver();

		// Navigate to the JET Cookbook collapsibles => basicCollapsible page
		await driver.get(
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=collapsible&demo=basicCollapsible"
		);
	});

	after(async function () {
		// Release/quit the driver
		await DriverManager.releaseDriver(driver);
	});

	it("should confirm oj-collapsible is displayed and initially collapsed", async function () {
		// 1) Locate the collapsible by ID, e.g. "collapsible1"
		const collapsible = await ojCollapsible(driver, By.id("collapsible1"));
		await collapsible.whenReady();

		// 2) Verify it's displayed
		const displayed = await collapsible.isDisplayed();
		expect(displayed).to.be.true;

		// 3) Check that it’s not disabled
		const disabled = await collapsible.getDisabled();
		expect(disabled).to.be.false;

		// 4) Confirm it's initially collapsed
		const isExpanded = await collapsible.getExpanded();
		expect(isExpanded).to.be.false;
	});

	it("should expand and collapse the collapsible", async function () {
		const collapsible = await ojCollapsible(driver, By.id("collapsible1"));
		await collapsible.whenReady();

		// Expand
		await collapsible.doExpand();
		const expandedAfter = await collapsible.getExpanded();
		expect(expandedAfter).to.be.true;

		// Collapse again
		await collapsible.doCollapse();
		const expandedNow = await collapsible.getExpanded();
		expect(expandedNow).to.be.false;
	});
});
```

## Key Points

1. **Locating the oj-collapsible**

   - We call `ojCollapsible(driver, By.id("collapsible1"))` to wrap the DOM node.
   - Adjust `"collapsible1"` as per the actual DOM ID in the **basicCollapsible** demo.

2. **Readiness**

   - `await collapsible.whenReady()` ensures the collapsible is fully loaded and not in a busy state before interacting.

3. **Visibility & Disabled State**

   - `isDisplayed()` checks if it’s visible.
   - `getDisabled()` returns `true` if the collapsible is disabled, `false` otherwise.

4. **Expanded State**

   - `getExpanded()` returns a boolean indicating whether the collapsible is open (`true`) or closed (`false`).

5. **Expanding & Collapsing**

   - `doExpand()` opens the collapsible if not already open.
   - `doCollapse()` closes it if not already closed.

6. **Assertions**

   - Uses **Chai**’s `expect` to confirm the expected states (e.g., `expect(isExpanded).to.be.false`).

7. **Driver Cleanup**
   - The `after` block calls `DriverManager.releaseDriver(driver)` to release/quit the browser session when tests complete.
