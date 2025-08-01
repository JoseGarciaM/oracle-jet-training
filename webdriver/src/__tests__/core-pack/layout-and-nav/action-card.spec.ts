import { Builder, WebDriver, By, until } from 'selenium-webdriver';
import {
  findActionCard,
  ActionCardWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

/**
 * Core‑Pack Action Card – basic functionality smoke‑test
 * Cookbook demo: https://www.oracle.com/webfolder/technetwork/jet/content_corepack/actionCard-basicActionCard/demo.html
 */
describe('Core Pack – Action Card', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'actionCard-basicActionCard/demo.html?theme=redwood&cssVars=default&debug=min' +
    '&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => {
    await driver.quit();
  });

  it('fires ojAction when activated and remains visible', async () => {
    // Locate the first action‑card on the page via the TA helper
    const card: ActionCardWebElement = await findActionCard(
      driver,
      By.css('oj-c-action-card')
    );

    await card.whenReady();
    expect(await card.isDisplayed()).to.be.true;

    // The cookbook demo updates a <p id="action-outcome"> element after action.
    // Grab its initial text so we can verify that the action handler ran.
    const outcome = await driver.findElement(By.id('action-outcome'));
    const before = await outcome.getText();

    // Semantic click helper (`doAction`) triggers the component's ojAction event.
    await card.doAction();

    // Wait for the text to change (max 5 s)
    await driver.wait(async () => {
      const after = await outcome.getText();
      return after !== before;
    }, 5000);

    const after = await outcome.getText();
    expect(after).to.not.equal(before);
    expect(await card.isDisplayed()).to.be.true;
  });
});
