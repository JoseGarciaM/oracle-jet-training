import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findTextArea,
  TextAreaWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

/**
 * E2E tests for oj‑c‑text‑area Core Pack component.
 * The tests exercise the demo page showcasing various states:
 *   https://www.oracle.com/webfolder/technetwork/jet/content_corepack/textArea-states/demo.html
 *
 * Each test locates the first matching <oj-c-text-area> element within the page
 * and performs simple value‑entry as well as property assertions.
 */
describe('Core Pack – Text Area', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/textArea-states/demo.html?theme=redwood&cssVars=default&debug=min&dir=ltr&fontSize=fontnone&color=default&notagcss=true&scale=lg&density=standard';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => {
    await driver.quit();
  });

  it('accepts input and clears it', async () => {
    const textArea: TextAreaWebElement = await findTextArea(
      driver,
      By.css('oj-c-text-area')
    );

    await textArea.whenReady();

    // Populate the text‑area with sample text
    const sample = 'Hello from WebDriver!';
    await textArea.changeValue(sample);
    expect(await textArea.getValue()).to.equal(sample);

    // Clear the value and verify
    await textArea.clear();
    expect(await textArea.getValue()).to.equal('');
  });

  it('honours readonly and disabled states', async () => {
    // The demo contains examples outside the first form‑layout block
    // where some text areas are readonly/disabled. Select them via nth‑of‑type.

    const readonlyTA: TextAreaWebElement = await findTextArea(
      driver,
      By.css('oj-c-text-area[readonly]')
    );
    await readonlyTA.whenReady();
    expect(await readonlyTA.getReadonly()).to.be.true;

    const disabledTA: TextAreaWebElement = await findTextArea(
      driver,
      By.css('oj-c-text-area[disabled]')
    );
    await disabledTA.whenReady();
    expect(await disabledTA.getDisabled()).to.be.true;
  });

  it('displays required validation styling', async () => {
    const requiredTA: TextAreaWebElement = await findTextArea(
      driver,
      By.css('oj-c-text-area[required]')
    );
    await requiredTA.whenReady();

    // Attempt to clear value to trigger required validation
    await requiredTA.clear();
    // The component should now report invalid state
    expect(await requiredTA.getValid()).to.equal('invalidShown');
  });
});
