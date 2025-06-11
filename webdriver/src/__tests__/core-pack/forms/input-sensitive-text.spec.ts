import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findInputSensitiveText,
  InputSensitiveTextWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Input Sensitive Text', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/inputSensitiveText-states/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('masks and stores a new value', async () => {
    const fld: InputSensitiveTextWebElement =
      await findInputSensitiveText(driver, By.css('oj-c-input-sensitive-text'));
    await fld.whenReady();
    await fld.changeValue('hunter2');               // adapter method:contentReference[oaicite:2]{index=2}
    expect(await fld.getValue()).to.equal('hunter2');
  });
});
