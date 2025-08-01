import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findPopup,
  PopupWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Popup', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'popup-popup/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => driver.quit());

  it('opens with changeOpened(true) then closes with doClose()', async () => {
    const popup: PopupWebElement = await findPopup(
      driver,
      By.css('oj-c-popup')
    );
    await popup.whenReady();

    await popup.doClose();                   // semantic close helper
    expect(await popup.getOpened()).to.equal(false);
  });
});
