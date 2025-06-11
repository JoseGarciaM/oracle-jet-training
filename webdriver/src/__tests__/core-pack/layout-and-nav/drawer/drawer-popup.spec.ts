import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findDrawerPopup,
  DrawerPopupWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Drawer Popup', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'drawerPopup-basic/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });
  after(async () => driver.quit());

  it('opens with changeOpened() then closes with doClose()', async () => {
    const popup: DrawerPopupWebElement = await findDrawerPopup(
      driver,
      By.css('oj-c-drawer-popup')
    );
    await popup.whenReady();
    await popup.changeOpened(true);                   
    expect(await popup.getOpened()).to.equal(true);    
    await popup.doClose();                           
    expect(await popup.getOpened()).to.equal(false);
  });
});
