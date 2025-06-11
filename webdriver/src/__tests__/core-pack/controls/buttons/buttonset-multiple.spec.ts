import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findButtonsetMultiple,
  ButtonsetMultipleWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Buttonset Multiple', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'buttonsetmultiple-overview/demo.html?theme=redwood&cssVars=default&debug=min' +
    '&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });
  after(async () => driver.quit());

  it('toggles a value with changeValue()', async () => {
    const set: ButtonsetMultipleWebElement = await findButtonsetMultiple(
      driver,
      By.css('oj-c-buttonset-multiple')
    );                                               
    await set.whenReady();                        
    await set.changeValue(['bold']);               
    expect(await set.getValue()).to.deep.equal(['bold']);
  });
});
