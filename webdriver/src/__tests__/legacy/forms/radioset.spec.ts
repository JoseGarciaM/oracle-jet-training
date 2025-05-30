import { expect } from "chai";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojRadioset, OjRadioset } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Radioset (states demo)", function () {
	let driver!: WebDriver;
	let rs!: OjRadioset;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=radiosets&demo=states";
	const RS_LOCATOR = By.css("oj-radioset:not([disabled]):not([readonly])");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		rs = await ojRadioset(driver, RS_LOCATOR);
		await rs.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── helpers ───────── */

	/** Returns the <input type="radio"> that is currently checked. */
	const checkedInput = async (): Promise<WebElement> =>
		rs.findElement(By.css('input[type="radio"]:checked'));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await rs.isDisplayed()).to.be.true;
	});

	it("programmatic changeValue(first option) selects that radio", async () => {
		const first = await rs.findElement(By.css('input[type="radio"]'));
		const firstVal = await first.getAttribute("value");

		await rs.changeValue(firstVal);
		await rs.whenBusyContextReady();

		expect(await rs.getValue()).to.equal(firstVal);
		expect(await (await checkedInput()).getAttribute("value")).to.equal(
			firstVal
		);
	});

	it("user click updates getValue()", async () => {
		const other = await rs.findElement(
			By.css('input[type="radio"]:not(:checked)')
		);
		const otherVal = await other.getAttribute("value");
		await other.click();
		await rs.whenBusyContextReady();

		expect(await rs.getValue()).to.equal(otherVal);
	});

	it("required radioset reports invalid when cleared", async () => {
		const reqRs = await ojRadioset(driver, By.css("oj-radioset[required]"));
		await reqRs.whenReady();

		await reqRs.changeValue(null); // clear selection
		await reqRs.whenBusyContextReady();

		const validity = await reqRs.getProperty<string>("valid");
		expect(validity).to.contain("invalid");
	});
});
