import { Builder, WebDriver, By } from 'selenium-webdriver';
import { findMessageBanner, MessageBannerWebElement } from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Message Banner', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/messagebanner-overview/demo.html?theme=redwood&cssVars=default';

  before(async () => { driver = await new Builder().forBrowser('chrome').build(); await driver.get(URL); });
  after(async () => driver.quit());

it('displays and then closes the banner', async () => {
  const banner: MessageBannerWebElement =
    await findMessageBanner(driver, By.css('oj-c-message-banner'));
  await banner.whenReady();

  expect(await banner.isDisplayed()).to.be.true;

  await banner.doClose({ key: 0 });          // ← adapter method
  expect(await banner.isDisplayed()).to.be.false;
});

});
