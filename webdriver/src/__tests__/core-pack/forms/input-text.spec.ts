import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputText, InputTextWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Text', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/inputText-states/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('round-trips a plain string', async () => {
    const txt: InputTextWebElement = await findInputText(driver, By.css('oj-c-input-text'));
    await txt.whenReady();
    await txt.changeValue('Hello JET');
    expect(await txt.getValue()).to.equal('Hello JET');
  });
});
