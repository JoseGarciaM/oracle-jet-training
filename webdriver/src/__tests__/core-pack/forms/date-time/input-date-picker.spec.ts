import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputDatePicker, InputDatePickerWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Date Picker', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'inputDatePicker-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('changes value and reflects it', async () => {
    const picker: InputDatePickerWebElement = await findInputDatePicker(driver, By.css('oj-c-input-date-picker'));
    await picker.whenReady();
    await picker.changeValue('2025-12-31');
    expect(await picker.getValue()).to.equal('2025-12-31');
  });
});
