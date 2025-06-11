import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findLabelledLink, LabelledLinkWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Labelled Link', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/labelledLink-states/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('exposes an href', async () => {
    const link: LabelledLinkWebElement =
      await findLabelledLink(driver, By.css('oj-c-labelled-link'));
    await link.whenReady();
    const href = await link.getHref();              // helper listed in adapter docs:contentReference[oaicite:4]{index=4}
    expect(href).to.match(/^https?:/);
  });
});
