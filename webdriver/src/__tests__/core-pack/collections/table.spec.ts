import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findTable, TableWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

/**
 * oj-c-table – Core-Pack Test-Adapter spec
 * Demo URL: table-overview (Redwood theme, standard density)
 */
describe('Core Pack – Table', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'table-overview/demo.html?theme=redwood&cssVars=default&debug=min&dir=ltr' +
    '&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => {
    await driver.quit();
  });

  /**
   * The demo’s data provider uses simple integer row keys (0, 1, 2…) so we can
   * select the first row with key 0.  The adapter exposes changeSelected() /
   * getSelected() rather than DOM clicks, keeping the test semantic.
   */
  it('selects the first row via changeSelected()', async () => {
    const table: TableWebElement = await findTable(driver, By.css('oj-c-table'));
    await table.whenReady();

    // Clear any previous selection
    await table.changeSelected({ row: [], column: [] } as any);

    // Select row 0
    await table.changeSelected({ row: [0], column: [] } as any);

    const selected = await table.getSelected() as any;
    expect(selected.row).to.deep.equal([0]);
  });

  /**
   * Verify the grid-line settings that the cookbook advertises
   * (both horizontal & vertical gridlines are visible).
   */
  it('reports both gridlines as visible', async () => {
    const table: TableWebElement = await findTable(driver, By.css('oj-c-table'));
    await table.whenReady();

    expect(await table.getHorizontalGridVisible()).to.equal('visible');
    expect(await table.getVerticalGridVisible()).to.equal('visible');
  });
});
