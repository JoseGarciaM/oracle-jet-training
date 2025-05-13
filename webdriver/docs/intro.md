`@oracle/oraclejet-webdriver`

# Oracle JET Component WebElements

**`oraclejet-webdriver`** is a UI automation library built on top of [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver), and designed to work with [Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html)-based applications.

---

## Installation

```bash
npm install -D @oracle/oraclejet-webdriver
```

---

## Usage

The library is available with type definitions so that tests can be authored in TypeScript.

The root module `@oracle/oraclejet-webdriver` has a default export where common utilities can be found. WebElements that correspond to JET components can be found underneath `@oracle/oraclejet-webdriver/elements`.

### A sample test script using Mocha:

```typescript
import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojInputText } from "@oracle/oraclejet-webdriver/elements";
import { By, WebDriver } from "selenium-webdriver";

describe("My suite of tests", function () {
	let driver: WebDriver;

	before(async function () {
		driver = await DriverManager.getDriver();
		await ojwd.get(driver, "http://myapp.com/");
	});

	it("changes an <oj-input-text> value", async function () {
		const input = await ojInputText(driver, By.id("text-input-1"));
		await input.changeValue("...");
	});

	after(function () {
		DriverManager.releaseDriver(driver);
	});
});
```

---

## Compatibility

It's important to use the same version of `oraclejet-webdriver` which matches your `oraclejet`.  
If the versions differ, the library will throw an exception upon opening the page and a console error will be logged.

---

## Dependencies

This library depends on the following:

- `@oracle/oraclejet`
- `selenium-webdriver >= 4.0.0`
- `NodeJS v12+`

// get value and change value methods
