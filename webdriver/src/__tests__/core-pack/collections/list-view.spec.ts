import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findListView, ListViewWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – List View', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'listView-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => driver.quit());

  it('selects the first item via changeSelected()', async () => {
    const list: ListViewWebElement =
      await findListView(driver, By.css('oj-c-list-view'));
    await list.whenReady();

    // Use the adapter API, not DOM pokes
    const firstKey = await list.getCurrentItem();             // returns key of focused item
    await list.changeSelected([firstKey]);                    // change Selected<K>(keys[])
    expect(await list.getSelected()).to.deep.equal([firstKey]); // round-trip
  });
});
