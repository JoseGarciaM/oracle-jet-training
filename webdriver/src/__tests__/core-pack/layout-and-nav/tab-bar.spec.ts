import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findTabBar, TabBarWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Tab Bar', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'tabBar-basic/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => driver.quit());

  it('changes selection via changeSelection()', async () => {
    const tabs: TabBarWebElement = await findTabBar(
      driver,
      By.css('oj-c-tab-bar')
    );
    await tabs.whenReady();

    // The basic demo’s second tab has key 'teams'
    await tabs.changeSelection('teams');
    expect(await tabs.getSelection()).to.equal('teams');
  });
});
