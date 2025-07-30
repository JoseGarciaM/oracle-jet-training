// __tests__/core-pack/inputs/select-multiple.spec.ts
import { Builder, WebDriver, By } from 'selenium-webdriver';
import {
  findSelectMultiple,
  SelectMultipleWebElement
} from '@oracle/oraclejet-core-pack/webdriver';
import { expect } from 'chai';

describe('Core Pack – Select Multiple', () => {
  let driver: WebDriver;
  const URL =
    'https://www.oracle.com/webfolder/technetwork/jet/content_corepack/' +
    'selectMultiple-states/demo.html?theme=redwood&cssVars=default';

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => driver.quit());

  it('clears then sets a multi-value via changeValue()', async () => {
    const sel: SelectMultipleWebElement = await findSelectMultiple(
      driver,
      By.css('oj-c-select-multiple')
    );
    await sel.whenReady();// BusyContext guard

    // 1️⃣  Ensure we start with no value
    await sel.clear();
    expect(await sel.getValue()).to.equal(null);

    // 2️⃣  Assign two options (demo keys: 'red' and 'blue')
    const newVal = new Set<string>(['red', 'blue']);
    await sel.changeValue(newVal);          // semantic adapter API
    expect(await sel.getValue()).to.deep.equal(newVal);
  });
});
