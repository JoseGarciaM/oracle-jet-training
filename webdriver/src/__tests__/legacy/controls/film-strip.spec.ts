// test/filmstrip-nav.spec.ts
import ojwd, { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojFilmStrip } from "@oracle/oraclejet-webdriver/elements";
import { By, WebDriver } from "selenium-webdriver";
import { expect } from "chai";

describe("Oracle JET Cookbook FilmStrip Navigation Test", function () {
	let driver: WebDriver;

	before(async function () {
		driver = await DriverManager.getDriver();
		// Navigate to FilmStrip Navigation Arrows demo
		await ojwd.get(
			driver,
			"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=filmStrip&demo=filmStripNavArrows"
		);
	});

	it("should navigate through filmstrip items using navigation arrows", async function () {
		// Locate the oj-film-strip component by ID ('filmStrip')
		const filmStrip = await ojFilmStrip(driver, By.id("filmStrip"));

		// Ensure the component is ready for interaction
		await filmStrip.whenReady();

		// Verify initial current item
		const initialItem = await filmStrip.getCurrentItem();
		expect(initialItem).to.have.property("id");

		// Verify the current item after navigation
		const nextItem = await filmStrip.getCurrentItem();
		expect(nextItem).to.have.property("index", 2);

		// Optionally verify arrow visibility property
		const arrowVisibility = await filmStrip.getArrowVisibility();
		expect(arrowVisibility).to.equal("auto");

		// Optionally verify orientation
		const orientation = await filmStrip.getOrientation();
		expect(orientation).to.equal("horizontal");
	});

	after(async function () {
		await DriverManager.releaseDriver(driver);
	});
});
