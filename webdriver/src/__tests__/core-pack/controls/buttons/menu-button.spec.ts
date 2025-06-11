import { Builder, WebDriver, By, until } from 'selenium-webdriver';
import { findMenuButton, MenuButtonWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Menu Button', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/menuButtons-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('opens its menu and picks the first item', async () => {
    const btn: MenuButtonWebElement = await findMenuButton(driver, By.css('oj-c-menu-button')); // helper:contentReference[oaicite:10]{index=10}
    await btn.whenReady();
    await btn.click();                                       // opens menu via adapter click
    // Wait for a menu item to appear, then click it.
    const firstItem = await driver.wait(
      until.elementLocated(By.css('oj-option, li[role="menuitem"]')),
      5000
    );
    await firstItem.click();
    // The demo toggles button label to picked item; assert that.
    expect(await btn.getLabel()).to.not.equal('Menu');       // `getLabel` in adapter:contentReference[oaicite:11]{index=11}
  });
});
