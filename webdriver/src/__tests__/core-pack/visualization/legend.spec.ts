import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findLegend, LegendWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Legend', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/legend-default/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('returns data and correct orientation', async () => {
    const lgd: LegendWebElement = await findLegend(driver, By.css('oj-c-legend'));
    await lgd.whenReady();
    expect(await lgd.getOrientation()).to.equal('vertical');  // property getter:contentReference[oaicite:5]{index=5}
    expect(await lgd.getData()).to.not.be.empty;              // data getter:contentReference[oaicite:6]{index=6}
  });
});
