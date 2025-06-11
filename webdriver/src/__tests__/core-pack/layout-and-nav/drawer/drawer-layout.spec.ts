import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findDrawerLayout,
  DrawerLayoutWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Drawer Layout', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'drawerLayout-basic/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });
  after(async () => driver.quit());

  it('opens and closes the END drawer with changeEndOpened()', async () => {
    const layout: DrawerLayoutWebElement = await findDrawerLayout(
      driver,
      By.css('oj-c-drawer-layout')
    );
    await layout.whenReady();
    await layout.changeEndOpened(true);                 // :contentReference[oaicite:5]{index=5}
    expect(await layout.getEndOpened()).to.equal(true);
    await layout.changeEndOpened(false);
    expect(await layout.getEndOpened()).to.equal(false);
  });
});
