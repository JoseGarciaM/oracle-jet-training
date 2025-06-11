import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findCollapsible, CollapsibleWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Collapsible', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/collapsible-basicCollapsible/demo.html?theme=redwood&cssVars=default&debug=min&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('expands then collapses via toggle()', async () => {
    const col: CollapsibleWebElement = await findCollapsible(driver, By.css('oj-c-collapsible')); // helper :contentReference[oaicite:4]{index=4}
    await col.whenReady();
    await col.doExpand();
    expect(await col.getExpanded()).to.equal(true);
    await col.doCollapse();
    expect(await col.getExpanded()).to.equal(false);
  });
});
