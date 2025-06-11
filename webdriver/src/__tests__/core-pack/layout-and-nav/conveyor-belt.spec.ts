import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findConveyorBelt,
  ConveyorBeltWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Conveyor Belt', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'conveyorBelt-horizontalConveyorBelt/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });
  after(async () => driver.quit());

  it('scrolls forward by changing scrollPosition', async () => {
    const belt: ConveyorBeltWebElement = await findConveyorBelt(
      driver,
      By.css('oj-c-conveyor-belt')
    );
    await belt.whenReady();
    const before = await belt.getScrollPosition();     
    await belt.changeScrollPosition(before + 120);  
    expect(await belt.getScrollPosition()).to.be.greaterThan(before);
  });
});
