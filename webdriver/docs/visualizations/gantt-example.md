# Testing an oj-gantt with @oracle/oraclejet-webdriver

The following **TypeScript** example demonstrates how to automate tests against an **oj-gantt** in the [JET Cookbook gantt "overview" demo](https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=gantt&demo=overview). It uses:

- **Mocha** (describe/it)
- **Chai** (expect)
- **Selenium WebDriver** (with `DriverManager` from `@oracle/oraclejet-webdriver`)
- The `ojGantt` function to wrap a Selenium `WebElement` as an `OjGantt` instance

```ts
import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojGantt } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook Gantt Demo Tests", function () {
        let driver: WebDriver;

        before(async function () {
                driver = await DriverManager.getDriver();
                await driver.get(
                        "https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=gantt&demo=overview"
                );
        });

        after(async function () {
                await DriverManager.releaseDriver(driver);
        });

        it("should load the gantt chart and verify rows", async function () {
                const gantt = await ojGantt(driver, By.css("oj-gantt"));
                await gantt.whenReady();

                const rows = await gantt.getRows();
                expect(Array.isArray(rows) && rows.length).to.be.greaterThan(0);
        });

        it("should select the first row programmatically", async function () {
                const gantt = await ojGantt(driver, By.css("oj-gantt"));
                await gantt.whenReady();

                const [first] = (await gantt.getRows()) as Array<{ id?: unknown }>;
                await gantt.changeSelection([first!.id as unknown]);

                const sel = await gantt.getSelection();
                expect(sel).to.include(first!.id);
        });
});
```

## Key Points

1. **Locating the oj-gantt**
   - `ojGantt(driver, By.css("oj-gantt"))` wraps the DOM element. Adjust the locator if needed.
2. **Checking for data**
   - `getRows()` returns the chart's row data. The example asserts the array is not empty.
3. **Programmatic selection**
   - `changeSelection([...])` selects a row by ID. Retrieve the selection with `getSelection()` to verify.
4. **Driver lifecycle**
   - Use `DriverManager.getDriver()` in `before()` and `DriverManager.releaseDriver()` in `after()` to manage the Selenium session.
