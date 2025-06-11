import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findDatePicker, DatePickerWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Date Picker', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/datePicker-simple/demo.html?theme=redwood&cssVars=default&debug=min&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('updates value via changeValue()', async () => {
    const dp: DatePickerWebElement = await findDatePicker(driver, By.css('oj-c-date-picker')); // helper list :contentReference[oaicite:6]{index=6}
    await dp.whenReady();
    await dp.changeValue('2025-12-25');
    expect(await dp.getValue()).to.equal('2025-12-25');
  });
});
