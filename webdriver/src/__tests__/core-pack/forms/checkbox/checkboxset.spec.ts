import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findCheckboxset, CheckboxsetWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Checkboxset', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/checkboxset-states/demo.html?theme=redwood&cssVars=default&debug=min&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('applies multi-value via changeValue()', async () => {
    const set: CheckboxsetWebElement = await findCheckboxset(driver, By.css('oj-c-checkboxset')); // helper :contentReference[oaicite:2]{index=2}
    await set.whenReady();
    await set.changeValue(['red', 'blue']);                       // semantic setter :contentReference[oaicite:3]{index=3}
    expect(await set.getValue()).to.deep.equal(['red', 'blue']);
  });
});
