import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findCheckbox, CheckboxWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Checkbox', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'checkbox-overview/demo.html?theme=redwood&cssVars=default&debug=min' +
    '&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('changes boolean state with changeValue()', async () => {
    const cb: CheckboxWebElement = await findCheckbox(driver, By.css('oj-c-checkbox')); // helper :contentReference[oaicite:5]{index=5}
    await cb.whenReady();
    await cb.changeValue(true);                       // adapter method :contentReference[oaicite:6]{index=6}
    expect(await cb.getValue()).to.equal(true);
  });
});
