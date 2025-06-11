import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputMonthMask, InputMonthMaskWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Month Mask', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'inputMonthMask-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

it('updates month/year via changeValue()', async () => {
  const month: InputMonthMaskWebElement =
    await findInputMonthMask(driver, By.css('oj-c-input-month-mask'));

  await month.whenReady();
  await month.changeValue({ year: 2025, month: 10 });

  expect(await month.getValue()).to.deep.equal({ year: 2025, month: 10 });
});

});
