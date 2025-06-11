import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findFormLayout, FormLayoutWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Form Layout', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'formLayout-forminputs/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('renders a form layout with at least one child input', async () => {
    const layout: FormLayoutWebElement = await findFormLayout(driver, By.css('oj-c-form-layout'));
    await layout.whenReady();
    const inputs = await layout.findElements(By.css('input, oj-c-input-text, oj-c-select-single'));
    expect(inputs.length).to.be.greaterThan(0);
  });
});
