import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findButtonsetSingle,
  ButtonsetSingleWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Buttonset Single', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'buttonsetsingle-overview/demo.html?theme=redwood&cssVars=default&debug=min' +
    '&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('sets a single value via changeValue()', async () => {
    const set: ButtonsetSingleWebElement = await findButtonsetSingle(
      driver,
      By.css('oj-c-buttonset-single')
    );                                              // helper exists in TA docs :contentReference[oaicite:4]{index=4}
    await set.whenReady();
    await set.changeValue('bold');
    expect(await set.getValue()).to.equal('bold');
  });
});
