import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputNumber, InputNumberWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Number', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'inputNumber-states/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('increments the number value', async () => {
    const num: InputNumberWebElement = await findInputNumber(driver, By.css('oj-c-input-number'));
    await num.whenReady();
    await num.changeValue(99);
    expect(await num.getValue()).to.equal(99);
  });
});
