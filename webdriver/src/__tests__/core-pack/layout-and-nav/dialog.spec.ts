import { Builder, WebDriver, By, until } from 'selenium-webdriver';
import { findDialog, DialogWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Dialog (modal)', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/dialog-modal/demo.html?theme=redwood&cssVars=default&debug=min&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

  it('first opens, then closes via doClose()', async () => {
    const dlg: DialogWebElement = await findDialog(driver, By.css('oj-c-dialog')); // helper list :contentReference[oaicite:7]{index=7}
    await dlg.whenReady();
    expect(await dlg.getOpened()).to.equal(true);                   // property exists :contentReference[oaicite:8]{index=8}
    await dlg.doClose();
    await driver.wait(async () => !(await dlg.getOpened()), 5000);
    expect(await dlg.getOpened()).to.equal(false);
  });
});
