import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputDateText, InputDateTextWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Date Text', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'inputDate-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('round-trips a date string', async () => {
    const text: InputDateTextWebElement = await findInputDateText(driver, By.css('oj-c-input-date-text'));
    await text.whenReady();
    await text.changeValue('2025-08-15');
    expect(await text.getValue()).to.equal('2025-08-15');
  });
});
