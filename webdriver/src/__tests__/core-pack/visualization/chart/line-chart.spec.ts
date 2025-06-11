import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findLineChart, LineChartWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Line Chart', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/lineChart-basic/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('exposes non-empty series data', async () => {
    const chart: LineChartWebElement = await findLineChart(driver, By.css('oj-c-line-chart'));
    await chart.whenReady();
    expect(await chart.getData()).to.not.be.empty;            // adapter API:contentReference[oaicite:7]{index=7}
  });
});
