`@oracle/oraclejet-webdriver/elements/OjButton`

# OjButton

The component WebElement for `oj-button`. Do not instantiate this class directly, instead, use `ojButton`.

### Migration

When you migrate a page from using `oj-button` to `oj-c-button` you will also need to migrate your WebDriver tests from **OjButton** to **ButtonWebElement**. To do that you will need to revise type and locator instances as follows  
**Type:** from `OjButton` to `ButtonWebElement`  
**Locator:** from `ojButton` to `findButton`

For more details on migrating from legacy to core pack please see component’s migration section

---

## Constructors

### constructor

```
new OjButton(el, locators): OjButton
```

Constructor. Pass an instance of WebDriver’s `WebElement` that represents the DOM node on which we’ll perform operations.

**Parameters**

- **el**: `WebElement`  
  The basic WebElement with which this WebElement will work.
- **locators**: `ElementLocators`

**Returns**  
`OjButton`

_Inherited from OjButtonBase.constructor_

---

## Methods

### clear

```
clear(): Promise<void>
```

Schedules a command to clear the `value` of this element. This command has no effect if the underlying DOM element is neither a text INPUT element nor a TEXTAREA element.

**Returns**  
A promise that will be resolved when the element has been cleared.

_Inherited from OjButtonBase.clear_

---

### click

```
click(): Promise<void>
```

Perform a click on the button.

**Returns**  
A promise that will be resolved once the click is performed.

_Overrides OjButtonBase.click_

---

### doAction

```
doAction(): Promise<void>
```

Perform a click on the button.

**Returns**  
A promise that will be resolved once the click is performed.

---

### doContextClick

```
doContextClick(): Promise<void>
```

Perform a context-click on the button.

**Returns**  
A promise that will be resolved once the context-click is performed.

---

### findElement

```
findElement(locator): WebElementPromise
```

Schedule a command to find a descendant of this element. If the element cannot be found, a `bot.ErrorCode.NO_SUCH_ELEMENT` result will be returned by the driver. Unlike other commands, this error cannot be suppressed. In other words, scheduling a command to find an element doubles as an assert that the element is present on the page. To test whether an element is present on the page, use `#findElements`.

The search criteria for an element may be defined using one of the factories in the `By` namespace, or as a short-hand `By.Hash` object. For example, the following two statements are equivalent:

```js
var e1 = element.findElement(By.id("foo"));
var e2 = element.findElement({ id: "foo" });
```

You may also provide a custom locator function, which takes as input this WebDriver instance and returns a `WebElement`, or a promise that will resolve to a `WebElement`. For example, to find the first visible link on a page, you could write:

```js
var link = element.findElement(firstVisibleLink);

function firstVisibleLink(element) {
	var links = element.findElements(By.tagName("a"));
	return promise
		.filter(links, function (link) {
			return links.isDisplayed();
		})
		.then(function (visibleLinks) {
			return visibleLinks[0];
		});
}
```

**Parameters**

- **locator**: `Locator`  
  The locator strategy to use when searching for the element.

**Returns**  
`WebElementPromise`  
A `WebElement` that can be used to issue commands against the located element. If the element is not found, the element will be invalidated and all scheduled commands aborted.

_Inherited from OjButtonBase.findElement_

---

### findElements

```
findElements(locator): Promise<WebElement[]>
```

Schedules a command to find all of the descendants of this element that match the given search criteria.

**Parameters**

- **locator**: `Locator`  
  The locator strategy to use when searching for the element.

**Returns**  
A promise that will resolve to an array of `WebElement`s.

_Inherited from OjButtonBase.findElements_

---

### getAttribute

```
getAttribute(attributeName): Promise<string>
```

Schedules a command to query for the value of the given attribute of the element. Will return the current value, even if it has been modified after the page has been loaded. More exactly, this method will return the value of the given attribute, unless that attribute is not present, in which case the value of the property with the same name is returned. If neither value is set, `null` is returned (for example, the `'value'` property of a textarea element). The `'style'` attribute is converted as best can be to a text representation with a trailing semi-colon.

The following are deemed to be "boolean" attributes and will return either `'true'` or `null`:

```
async, autofocus, autoplay, checked, compact, complete,
controls, declare, defaultchecked, defaultselected, defer,
disabled, draggable, ended, formnovalidate, hidden,
indeterminate, iscontenteditable, ismap, itemscope, loop,
multiple, muted, nohref, noresize, noshade, novalidate, nowrap,
open, paused, pubdate, readonly, required, reversed, scoped,
seamless, seeking, selected, spellcheck, truespeed, willvalidate
```

Finally, the following commonly mis-capitalized attribute/property names are evaluated as expected:

- `'class'`
- `'readonly'`

**Parameters**

- **attributeName**: `string`  
  The name of the attribute to query.

**Returns**  
A promise that will be resolved with the attribute’s value. The returned value will always be either a string or `null`.

_Inherited from OjButtonBase.getAttribute_

---

### getChroming

```
getChroming(): Promise<string>
```

Gets the value of `chroming` property. Indicates in what states the button has chrome (background and border).

**Returns**  
A promise that resolves to the string value of the `chroming` property.

_Inherited from OjButtonBase.getChroming_

---

### getCssValue

```
getCssValue(cssStyleProperty): Promise<string>
```

Schedules a command to query for the computed style of the element represented by this instance. If the element inherits the named style from its parent, the parent will be queried for its value. Where possible, color values will be converted to their hex representation (e.g., `#00ff00` instead of `rgb(0, 255, 0)`).

**Warning:** the value returned will be as the browser interprets it, so it may be tricky to form a proper assertion.

**Parameters**

- **cssStyleProperty**: `string`  
  The name of the CSS style property to look up.

**Returns**  
A promise that will be resolved with the requested CSS value.

_Inherited from OjButtonBase.getCssValue_

---

### getDisabled

```
getDisabled(): Promise<boolean>
```

Gets the value of `disabled` property. Specifies that the button element should be disabled.

**Returns**  
A promise that resolves to the boolean value of the `disabled` property.

_Inherited from OjButtonBase.getDisabled_

---

### getDisplay

```
getDisplay(): Promise<string>
```

Gets the value of `display` property. Specifies whether the button displays label and icons, or just icons.

**Returns**  
A promise that resolves to the string value of the `display` property.

_Inherited from OjButtonBase.getDisplay_

---

### getDriver

```
getDriver(): WebDriver
```

Returns the parent driver for this instance.

_Inherited from OjButtonBase.getDriver_

---

### getId

```
getId(): Promise<string>
```

A promise that resolves to the server-assigned opaque ID assigned to this element.

_Inherited from OjButtonBase.getId_

---

### getLabel

```
getLabel(): Promise<string>
```

Gets the value of `label` property. Text to show in the button. The default is from the label in the DOM.

**Returns**  
A promise that resolves to the string value of the `label` property.

_Inherited from OjButtonBase.getLabel_

---

### getLocation

```
getLocation(): Promise<ILocation>
```

**DEPRECATED 3.0**  
Schedules a command to compute the location of this element in page space.

**Returns**  
A promise that will be resolved to the element’s location as a `{x:number, y:number}` object.

_Inherited from OjButtonBase.getLocation_

---

### getProperty

```ts
getProperty<T>(propertyName): Promise<T>
```

Get a named property value from this component. This function will wait for the application's busy context to complete before attempting to get the property value.

**Parameters**

- **propertyName**: `string` – The name of the property

**Returns**  
A `Promise<T>` that yields a value for the named property.

_Inherited from OjButtonBase.getProperty_

---

### getRect

```
getRect(): Promise<IRectangle>
```

Returns an object describing an element’s location in pixels relative to the document element, and the element’s size in pixels.

**Returns**  
A promise that will be resolved to an `IRectangle` object.

_Inherited from OjButtonBase.getRect_

---

### getShadowRoot

```
getShadowRoot(): ShadowRootPromise
```

Get the shadow root of the current web element.

**Returns**  
A promise that will be resolved with the element’s shadow root or rejected with `NoSuchShadowRootError`.

_Inherited from OjButtonBase.getShadowRoot_

---

### getSize

```
getSize(): Promise<ISize>
```

**DEPRECATED 3.0**  
Schedules a command to compute the size of this element’s bounding box, in pixels.

**Returns**  
A promise that will be resolved with the element’s size as a `{width:number, height:number}` object.

_Inherited from OjButtonBase.getSize_

---

### getTagName

```
getTagName(): Promise<string>
```

Schedules a command to query for the tag/node name of this element.

**Returns**  
A promise that will be resolved with the element’s tag name.

_Inherited from OjButtonBase.getTagName_

---

### getText

```
getText(): Promise<string>
```

Get the visible (i.e. not hidden by CSS) innerText of this element, including sub-elements, without any leading or trailing whitespace.

**Returns**  
A promise that will be resolved with the element’s visible text.

_Inherited from OjButtonBase.getText_

---

### getTranslations

```
getTranslations(): Promise<object>
```

Gets the value of `translations` property. A collection of translated resources from the translation bundle, or `null` if this component has no resources.

**Returns**  
A promise that will be resolved with the object of translations.

_Inherited from OjButtonBase.getTranslations_

---

#### Protected

### hasSize (Deprecated)

```
hasSize(): Condition<Promise<boolean>>
```

Create a wait condition that is satisfied when the element’s DOM has a non-zero size.

**Returns**  
A `Condition<Promise<boolean>>` to be used with `driver.wait()` that’s satisfied when the element’s DOM has a non-zero size.

**Deprecated** since 11.0.0. Call the appropriate WebElement method to test the size of the element.

_Inherited from OjButtonBase.hasSize_

---

### hasVisibility (Deprecated)

```
hasVisibility(): Condition<Promise<boolean>>
```

Create a wait condition that is satisfied when the element is visible. The condition is satisfied when the element is displayed, as reported by `#isDisplayed`, and is scrolled into view. This method is deprecated. Use `WebElement.isDisplayed` instead to test the display of the element, and scroll it into view if necessary.

_Inherited from OjButtonBase.hasVisibility_

---

### isDisplayed

```
isDisplayed(): Promise<boolean>
```

Schedules a command to test whether this element is currently displayed.

**Returns**  
A promise that will be resolved with whether this element is currently visible on the page.

_Inherited from OjButtonBase.isDisplayed_

---

### isEnabled

```
isEnabled(): Promise<boolean>
```

Schedules a command to query whether the DOM element represented by this instance is enabled, as dictated by the `disabled` attribute.

**Returns**  
A promise that will be resolved with whether this element is currently enabled.

_Inherited from OjButtonBase.isEnabled_

---

### isSelected

```
isSelected(): Promise<boolean>
```

Schedules a command to query whether this element is selected.

**Returns**  
A promise that will be resolved with whether this element is currently selected.

_Inherited from OjButtonBase.isSelected_

---

### sendKeys

```
sendKeys(...varArgs): Promise<void>
```

Schedules a command to type a sequence on the DOM element represented by this instance.

Modifier keys (`SHIFT`, `CONTROL`, `ALT`, `META`) are stateful; once a modifier is processed in the keysequence, that key state is toggled until one of the following occurs:

1. The modifier key is encountered again in the sequence. At this point, the state of the key is toggled (along with the appropriate keyup/down events).
2. The `Key.NULL` key is encountered in the sequence. When this key is encountered, all modifier keys currently in the down state are released (with accompanying keyup events). The `NULL` key can be used to simulate common keyboard shortcuts:

   ```js
   element.sendKeys("text was", Key.CONTROL, "a", Key.NULL, "now text is");
   // Alternatively:
   element.sendKeys("text was", Key.chord(Key.CONTROL, "a"), "now text is");
   ```

3. The end of the keysequence is encountered. When there are no more keys to type, all depressed modifier keys are released (with accompanying keyup events).

If this element is a file input (`<input type="file">`), the specified key sequence should specify the path to the file to attach to the element. This is analogous to the user clicking “Browse...” and entering the path into the file select dialog.

```js
var form = driver.findElement(By.css("form"));
var element = form.findElement(By.css("input[type=file]"));
element.sendKeys("/path/to/file.txt");
form.submit();
```

For uploads to function correctly, the entered path must reference a file on the **browser’s** machine, not the local machine running this script. When running against a remote Selenium server, a `FileDetector` may be used to transparently copy files to the remote machine before attempting to upload them in the browser.

**Note:** On browsers where native keyboard events are not supported (e.g., Firefox on OS X), key events will be synthesized. Special punctuation keys will be synthesized according to a standard QWERTY en-us keyboard layout.

**Parameters**

- **...varArgs**: `(string | number | Promise<string | number>)[]`  
  The sequence of keys to type. All arguments will be joined into a single sequence.

**Returns**  
A promise that will be resolved when all keys have been typed.

_Inherited from OjButtonBase.sendKeys_

---

### serialize

```
serialize(): Promise<IWebElementId>
```

_Inherited from OjButtonBase.serialize_

---

### setProperty (Protected)

```ts
setProperty<T>(propertyName, value): Promise<void>
```

Set a property value on the remote element. This function first waits for the BusyContext to clear before setting the property, then after setting, waits again to ensure that no additional busy states were created due to the property setting.

**Type Parameters**

- **T** = `string`

**Parameters**

- **propertyName**: `string` – The property name to set
- **value**: `T` – The value to set for the property

**Returns**  
A Promise which resolves when the remote property has been set to the value. Any value returned from the call to set the remote property is returned in the Promise.

_Inherited from OjButtonBase.setProperty_

---

### submit

```
submit(): Promise<void>
```

Schedules a command to submit the form containing this element (or this element if it is a `FORM` element). This command is a no-op if the element is not contained in a form.

**Returns**  
A promise that will be resolved when the form has been submitted.

_Inherited from OjButtonBase.submit_

---

### takeScreenshot

```
takeScreenshot(optScroll?): Promise<string>
```

Take a screenshot of the visible region encompassed by this element's bounding rectangle.

**Parameters**

- **optScroll?**: `boolean`  
  Optional argument that indicates whether the element should be scrolled into view before taking a screenshot. Defaults to `false`.

**Returns**  
A promise that will be resolved to the screenshot as a base-64 encoded PNG.

_Inherited from OjButtonBase.takeScreenshot_

---

### whenBusyContextReady

```
whenBusyContextReady(): Promise<void>
```

Returns a Promise that is resolved when the application's busy state reports ready. This method checks only that the application's busy context is ready, and not that the DOM element is actually displayed or has a physical size, such as is the case with `#whenReady`. Operations which are read-only in nature should call this method prior to execution.

**Returns**  
A Promise which is resolved when the page's busy state is ready.

_Inherited from OjButtonBase.whenBusyContextReady_

---

### whenReady

```
whenReady(): Promise<void>
```

Returns a Promise that is resolved when the element is ready for interaction—it is visible, has a size, and the app's busy context is ready. Operations on the DOM which rely on its physical location and size to be in a “ready” state should use this command, such as clicking, sending keys, locating child elements, and so on.

**Returns**  
A Promise that’s resolved when all conditions are met.

_Inherited from OjButtonBase.whenReady_

---

## Static

### buildId

```
static buildId(id, opt_noLegacy?): IWebElementId
```

**Parameters**

- **id**: `string` – The raw ID
- **opt_noLegacy?**: `boolean` – Whether to exclude the legacy element key

**Returns**  
The element ID for use with WebDriver's wire protocol.

_Inherited from OjButtonBase.buildId_

---

### equals

```
static equals(a, b): Promise<boolean>
```

Compares two `WebElement`s for equality.

**Parameters**

- **a**: `WebElement`
- **b**: `WebElement`

**Returns**  
A promise that will be resolved to whether the two `WebElement`s are equal.

_Inherited from OjButtonBase.equals_

---

### extractId

```
static extractId(obj): string
```

Extracts the encoded WebElement ID from the object.

**Parameters**

- **obj**: `IWebElementId` – The object to extract the ID from.

**Returns**  
The extracted ID.

**Throws** if the object is not a valid encoded ID.

_Inherited from OjButtonBase.extractId_

---

### isId

```
static isId(obj): boolean
```

**Parameters**

- **obj**: `IWebElementId` – The object to test.

**Returns**  
Whether the object is a valid encoded WebElement ID.

_Inherited from OjButtonBase.isId_
