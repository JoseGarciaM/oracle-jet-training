import { expect } from "chai";
import { By, WebDriver } from "selenium-webdriver";
import { DriverManager } from "@oracle/oraclejet-webdriver";
import { ojTrain, OjTrain } from "@oracle/oraclejet-webdriver/elements";

describe("Oracle JET Cookbook – Train (non-linear demo)", function () {
	let driver!: WebDriver;
	let train!: OjTrain;

	/* ───────── constants ───────── */
	const DEMO =
		"https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=train&demo=nonlinear";
	const LOCATOR = By.css("oj-train");

	/* ───────── bootstrap ───────── */
	before(async () => {
		driver = await DriverManager.getDriver();
		await driver.get(DEMO);

		train = await ojTrain(driver, LOCATOR);
		await train.whenReady(); // BusyContext ✓
	});

	after(async () => DriverManager.releaseDriver(driver));

	/* ───────── tests ───────── */

	it("renders and is displayed", async () => {
		expect(await train.isDisplayed()).to.be.true;
	});

	it("getSteps() returns an array ≥ 3", async () => {
		const steps = await train.getSteps();
		expect(steps.length).to.be.at.least(3);
	});

	it("programmatic changeSelectedStep() selects the 2nd step", async () => {
		const steps = await train.getSteps();
		const secondId = steps[1].id as string;

		await train.changeSelectedStep(secondId);
		await train.whenBusyContextReady();

		const sel = await train.getSelectedStep();
		expect(sel).to.equal(secondId);
	});

	it("clicking a step label selects it", async () => {
		// Pick the last step’s id from the adapter-reported list
		const steps = await train.getSteps();
		const lastId = steps[steps.length - 1].id as string;

		// Click the corresponding <oj-train-step> node
		await driver.findElement(By.css(`oj-train-step[id="${lastId}"]`)).click();
		await train.whenBusyContextReady();

		const sel = await train.getSelectedStep();
		expect(sel).to.equal(lastId);
	});
});
