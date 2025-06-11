import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputDateMask, InputDateMaskWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Date Mask', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'inputDateMask-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('accepts a new date via changeValue()', async () => {
    const mask: InputDateMaskWebElement = await findInputDateMask(driver, By.css('oj-c-input-date-mask'));
    await mask.whenReady();
    await mask.changeValue('2025-06-01');
    expect(await mask.getValue()).to.equal('2025-06-01');
  });
});
