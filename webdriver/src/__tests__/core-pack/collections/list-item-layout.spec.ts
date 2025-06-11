import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findListItemLayout, ListItemLayoutWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – List Item Layout', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/listItemLayout-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('renders in the ListView slot', async () => {
    const item: ListItemLayoutWebElement =
      await findListItemLayout(driver, By.css('oj-c-list-item-layout'));
    await item.whenReady();
    expect(await item.isDisplayed()).to.be.true;              // basic visibility check:contentReference[oaicite:8]{index=8}
  });
});
