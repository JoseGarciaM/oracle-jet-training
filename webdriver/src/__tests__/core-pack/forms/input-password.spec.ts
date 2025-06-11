import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findInputPassword, InputPasswordWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Password', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'inputPassword-states/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('accepts and returns a password string', async () => {
    const pwd: InputPasswordWebElement = await findInputPassword(driver, By.css('oj-c-input-password'));
    await pwd.whenReady();
    await pwd.changeValue('Secr3t!23');
    expect(await pwd.getValue()).to.equal('Secr3t!23');
  });
});
