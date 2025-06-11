import { Builder, WebDriver, By, until } from 'selenium-webdriver';
import {
  findCardView,
  CardViewWebElement,
  findActionCard,
  ActionCardWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('JET Cookbook – Card View with Action Card (Core Pack)', () => {
  let driver: WebDriver;

  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/' +
    'content_corepack/cardView-actionCardBehavior/demo.html?' +
    'theme=redwood&cssVars=default&debug=min&dir=ltr&fontSize=fontnone' +
    '&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => {
    await driver.quit();
  });

  it('Card View is keyboard-ready (focusBehavior === "content")', async () => {
    const cardView: CardViewWebElement = await findCardView(
      driver,
      By.css('oj-c-card-view')
    );
    await cardView.whenReady();                     
    expect(await cardView.getFocusBehavior()).to.equal('content'); 
  });

  it('Action Card fires ojAction and updates the output box', async () => {
    // locate the action card inside the view
    const actionCard: ActionCardWebElement = await findActionCard(
      driver,
      By.css('oj-c-action-card')
    );
    await actionCard.whenReady();

    // grab current content of the blue box
    const outputBox = await driver.findElement(
      By.css('[data-test="card-output"]')
    );
    const before = await outputBox.getText();

    // perform the action (semantic click)
    await actionCard.doAction();                  

    // wait for the text to change
    await driver.wait(async () => {
      const after = await outputBox.getText();
      return after !== before;
    }, 5000);

    const after = await outputBox.getText();
    expect(after).to.not.equal(before);
  });
});
