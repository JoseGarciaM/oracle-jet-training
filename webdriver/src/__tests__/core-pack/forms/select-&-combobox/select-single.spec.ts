import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findSelectSingle, SelectSingleWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Select Single', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/selectSingle-states/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => {
    await driver.quit();
  });

  it('selects an option, verifies the value, then clears it', async () => {
    // Grab the first oj-c-select-single on the page
    const select: SelectSingleWebElement = await findSelectSingle(
      driver,
      By.css('oj-c-select-single')
    );

    await select.whenReady();

    // Change to a known value from the demo’s data set ("CA" – California)
    await select.changeValue('CA');
    expect(await select.getValue()).to.equal('CA');

    // Clear and confirm it is now empty
    await select.clear();
    expect(await select.getValue()).to.equal(null);
  });
});
