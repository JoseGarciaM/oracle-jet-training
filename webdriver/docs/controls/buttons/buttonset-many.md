`@oracle/oraclejet-webdriver/elements/OjButtonsetMany`

# OjButtonsetMany

The component WebElement for `oj-buttonset-many`. Do not instantiate this class directly; instead, use `ojButtonsetMany`.

---

## Constructors

### constructor

```
new OjButtonsetMany(el, locators): OjButtonsetMany
```

Constructor. Pass an instance of WebDriver’s `WebElement` that represents the DOM node on which we’ll perform operations.

**Parameters**

- **el**: `WebElement`  
  The basic WebElement with which this WebElement will work.
- **locators**: `ElementLocators`

**Returns**  
`OjButtonsetMany`

_Inherited from OjButtonsetManyBase.constructor_

---

## Methods

### changeValue

```
changeValue(value): Promise<void>
```

Sets the value of the `value` property. Indicates which `oj-options` in the buttonset are selected.

**Parameters**

- **value**: `null | any[]` – The value to set for `value`

**Returns**  
A promise that resolves to `void`.

_Inherited from OjButtonsetManyBase.changeValue_

---

### clear

```
clear(): Promise<void>
```

Schedules a command to clear the `value` of this element. This command has no effect if the underlying DOM element is neither a text INPUT element nor a TEXTAREA element.

**Returns**  
A promise that will be resolved when the element has been cleared.

_Inherited from OjButtonsetManyBase.clear_

---

### click

```
click(): Promise<void>
```

Schedules a command to click on this element.

**Returns**  
A promise that will be resolved when the click command has completed.

_Inherited from OjButtonsetManyBase.click_

---

### findElement

```
findElement(locator): WebElementPromise
```

Schedule a command to find a descendant of this element. If the element cannot be found, a `bot.ErrorCode.NO_SUCH_ELEMENT` result will be returned by the driver. Unlike other commands, this error cannot be suppressed. In other words, scheduling a command to find an element doubles as an assert that the element is present on the page. To test whether an element is present on the page, use `#findElements`.

You can provide the locator using the factories in the `By` namespace or as a short-hand `By.Hash` object. For example:

```js
var e1 = element.findElement(By.id("foo"));
var e2 = element.findElement({ id: "foo" });
```

You may also provide a custom locator function, which takes as input this WebDriver instance and returns a `WebElement`, or a promise that resolves to a `WebElement`. For example:

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
`WebElementPromise` – A `WebElement` you can use to issue commands against the located element. If the element is not found, it will be invalidated and all scheduled commands aborted.

_Inherited from OjButtonsetManyBase.findElement_

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

_Inherited from OjButtonsetManyBase.findElements_

---

### getAttribute

```
getAttribute(attributeName): Promise<string>
```

Schedules a command to query for the value of the given attribute of the element. Will return the current value, even if it has been modified after the page has been loaded. More exactly, this method returns the value of the given attribute, unless that attribute is not present, in which case the value of the property with the same name is returned. If neither value is set, `null` is returned (for example, the `'value'` property of a textarea element). The `'style'` attribute is converted as best as possible to a text representation with a trailing semicolon.

These attributes are treated as “boolean” and will return either `'true'` or `null`:

```
async, autofocus, autoplay, checked, compact, complete,
controls, declare, defaultchecked, defaultselected, defer, disabled,
draggable, ended, formnovalidate, hidden, indeterminate,
iscontenteditable, ismap, itemscope, loop, multiple, muted, nohref,
noresize, noshade, novalidate, nowrap, open, paused, pubdate,
readonly, required, reversed, scoped, seamless, seeking, selected,
spellcheck, truespeed, willvalidate
```

Finally, these commonly mis-capitalized attribute/property names are handled properly:

- `'class'`
- `'readonly'`

**Parameters**

- **attributeName**: `string` – The name of the attribute to query.

**Returns**  
A promise that resolves to the attribute’s value (either a string or `null`).

_Inherited from OjButtonsetManyBase.getAttribute_

---

### getChroming

```
getChroming(): Promise<string>
```

Gets the value of the `chroming` property. Indicates in what states the buttonset has chrome (background and border).

**Returns**  
A promise that resolves to the string value of `chroming`.

_Inherited from OjButtonsetManyBase.getChroming_

---

### getCssValue

```
getCssValue(cssStyleProperty): Promise<string>
```

Schedules a command to query for the computed style of the element. If the element inherits the named style from its parent, the parent will be queried for its value. Where possible, color values are converted to hex representation (e.g., `#00ff00` instead of `rgb(0, 255, 0)`).

**Warning**: The value returned is as the browser interprets it, so forming a proper assertion may be tricky.

**Parameters**

- **cssStyleProperty**: `string` – The name of the CSS style property to look up.

**Returns**  
A promise that resolves to the requested CSS value.

_Inherited from OjButtonsetManyBase.getCssValue_

---

### getDescribedBy

```
getDescribedBy(): Promise<string>
```

Gets the value of the `describedBy` property. The buttonset’s `oj-label` automatically sets `described-by` to make it accessible. It is not meant to be set by the application developer.

**Returns**  
A promise that resolves to the `describedBy` string.

_Inherited from OjButtonsetManyBase.getDescribedBy_

---

### getDisabled

```
getDisabled(): Promise<boolean>
```

Gets the value of the `disabled` property. Specifies that the buttonset element should be disabled.

**Returns**  
A promise that resolves to the boolean value of `disabled`.

_Inherited from OjButtonsetManyBase.getDisabled_

---

### getDisplay

```
getDisplay(): Promise<string>
```

Gets the value of the `display` property. Specifies whether the buttonset displays labels and icons, or just icons.

**Returns**  
A promise that resolves to the string value of `display`.

_Inherited from OjButtonsetManyBase.getDisplay_

---

### getDriver

```
getDriver(): WebDriver
```

Returns the parent WebDriver for this instance.

_Inherited from OjButtonsetManyBase.getDriver_

---

### getFocusManagement

```
getFocusManagement(): Promise<string>
```

Gets the value of the `focusManagement` property. Should be set to `none` when the buttonset is placed within a toolbar.

**Returns**  
A promise that resolves to the string value of `focusManagement`.

_Inherited from OjButtonsetManyBase.getFocusManagement_

---

### getId

```
getId(): Promise<string>
```

A promise that resolves to the server-assigned opaque ID assigned to this element.

_Inherited from OjButtonsetManyBase.getId_

---

### getLabelledBy

```
getLabelledBy(): Promise<null | string>
```

Gets the value of the `labelledBy` property. Establishes a relationship between this component and another element (typically an `oj-label` custom element). See the Help documentation for more information.

**Returns**  
A promise that resolves to either `null` or a string.

_Inherited from OjButtonsetManyBase.getLabelledBy_

---

### getLocation

```
getLocation(): Promise<ILocation>
```

**DEPRECATED 3.0**  
Schedules a command to compute the location of this element in page space.

**Returns**  
A promise that resolves to an object `{ x: number, y: number }` representing the element’s location.

_Inherited from OjButtonsetManyBase.getLocation_

---

### getProperty

```ts
getProperty<T>(propertyName): Promise<T>
```

Get a named property value from this component. The function will wait for the application’s busy context to complete before attempting to get the property value.

**Parameters**

- **propertyName**: `string` – The name of the property.

**Returns**  
A promise that yields a value for the named property.

_Inherited from OjButtonsetManyBase.getProperty_

---

### getRect

```
getRect(): Promise<IRectangle>
```

Returns an object describing an element’s location (relative to the document element) and size in pixels.

**Returns**  
A promise that resolves to an `IRectangle` object.

_Inherited from OjButtonsetManyBase.getRect_

---

### getShadowRoot

```
getShadowRoot(): ShadowRootPromise
```

Gets the shadow root of the current web element.

**Returns**  
A promise that resolves with the element’s shadow root or rejects with `NoSuchShadowRootError`.

_Inherited from OjButtonsetManyBase.getShadowRoot_

---

### getSize

```
getSize(): Promise<ISize>
```

**DEPRECATED 3.0**  
Schedules a command to compute the size of this element’s bounding box, in pixels.

**Returns**  
A promise that resolves to `{ width: number, height: number }`.

_Inherited from OjButtonsetManyBase.getSize_

---

### getTagName

```
getTagName(): Promise<string>
```

Schedules a command to query for the tag/node name of this element.

**Returns**  
A promise that resolves to the element’s tag name.

_Inherited from OjButtonsetManyBase.getTagName_

---

### getText

```
getText(): Promise<string>
```

Gets the visible (i.e., not hidden by CSS) innerText of this element, including sub-elements, without any leading or trailing whitespace.

**Returns**  
A promise that resolves to the element’s visible text.

_Inherited from OjButtonsetManyBase.getText_

---

### getTranslations

```
getTranslations(): Promise<null | object>
```

Gets the value of the `translations` property. A collection of translated resources from the translation bundle, or `null` if this component has no resources.

**Returns**  
A promise that resolves to either `null` or an object containing translated resources.

_Inherited from OjButtonsetManyBase.getTranslations_

---

### getValue

```
getValue(): Promise<null | any[]>
```

Gets the value of the `value` property. Indicates which `oj-options` in the buttonset are selected.

**Returns**  
A promise that resolves to either `null` or an array of any type.

_Inherited from OjButtonsetManyBase.getValue_

---

#### Protected

### hasSize (Deprecated)

```
hasSize(): Condition<Promise<boolean>>
```

Create a wait condition that is satisfied when the element’s DOM has a non-zero size.

**Returns**  
A `Condition<Promise<boolean>>` that can be used with `driver.wait()` to check when the DOM has a non-zero size.

**Deprecated** since 11.0.0. Use the appropriate WebElement method to test the size of the element.

_Inherited from OjButtonsetManyBase.hasSize_

---

### hasVisibility (Deprecated)

```
hasVisibility(): Condition<Promise<boolean>>
```

Create a wait condition that is satisfied when the element is visible (as reported by `#isDisplayed`) and scrolled into view. Deprecated. Use `WebElement.isDisplayed` instead.

_Inherited from OjButtonsetManyBase.hasVisibility_

---

### isDisplayed

```
isDisplayed(): Promise<boolean>
```

Schedules a command to test whether this element is currently displayed.

**Returns**  
A promise that resolves to a boolean indicating whether this element is visible on the page.

_Inherited from OjButtonsetManyBase.isDisplayed_

---

### isEnabled

```
isEnabled(): Promise<boolean>
```

Schedules a command to query whether the DOM element represented by this instance is enabled, dictated by the `disabled` attribute.

**Returns**  
A promise that resolves to a boolean indicating whether the element is currently enabled.

_Inherited from OjButtonsetManyBase.isEnabled_

---

### isSelected

```
isSelected(): Promise<boolean>
```

Schedules a command to query whether this element is selected.

**Returns**  
A promise that resolves to a boolean indicating whether the element is currently selected.

_Inherited from OjButtonsetManyBase.isSelected_

---

### sendKeys

```
sendKeys(...varArgs): Promise<void>
```

Schedules a command to type a sequence on the DOM element represented by this instance. Modifier keys (`SHIFT`, `CONTROL`, `ALT`, `META`) are stateful; once a modifier is processed in the key sequence, that key state is toggled until one of the following occurs:

1. The modifier key is encountered again, toggling it and triggering the appropriate keyup/down events.
2. `Key.NULL` is encountered, releasing all currently pressed modifier keys. For example:

   ```js
   element.sendKeys("text was", Key.CONTROL, "a", Key.NULL, "now text is");
   // or:
   element.sendKeys("text was", Key.chord(Key.CONTROL, "a"), "now text is");
   ```

3. The end of the sequence is reached, releasing all depressed modifier keys.

If this element is a file input (`<input type="file">`), the key sequence should specify the path to the file to attach to the element (like clicking “Browse...” and entering the path in the file dialog).

```js
var form = driver.findElement(By.css("form"));
var element = form.findElement(By.css("input[type=file]"));
element.sendKeys("/path/to/file.txt");
form.submit();
```

For uploads to work properly, the path must reference a file on the **browser’s** machine, not the local machine running this script. When running against a remote Selenium server, a `FileDetector` may be used to copy files to the remote machine before uploading them in the browser.

**Note**: On browsers without native keyboard events (e.g., Firefox on OS X), key events will be synthesized using a standard QWERTY en-us keyboard layout.

**Parameters**

- **...varArgs**: `(string | number | Promise<string | number>)[]` – The sequence of keys to type (all arguments will be joined).

**Returns**  
A promise that resolves when all keys have been typed.

_Inherited from OjButtonsetManyBase.sendKeys_

---

### serialize

```
serialize(): Promise<IWebElementId>
```

Returns a promise that resolves to `IWebElementId`.

_Inherited from OjButtonsetManyBase.serialize_

---

#### Protected

### setProperty

```ts
setProperty<T>(propertyName, value): Promise<void>
```

Sets a property value on the remote element. This function waits for the BusyContext to clear before setting the property, and then waits again after setting to ensure no additional busy states were created.

**Type Parameters**

- **T** = `string`

**Parameters**

- **propertyName**: `string` – The property name to set
- **value**: `T` – The value to set for the property

**Returns**  
A promise that resolves when the remote property has been set. Any value returned from the remote property call is returned in the promise.

_Inherited from OjButtonsetManyBase.setProperty_

---

### submit

```
submit(): Promise<void>
```

Schedules a command to submit the form containing this element (or this element if it’s a `FORM`). This command is a no-op if the element is not contained in a form.

**Returns**  
A promise that resolves when the form has been submitted.

_Inherited from OjButtonsetManyBase.submit_

---

### takeScreenshot

```
takeScreenshot(optScroll?): Promise<string>
```

Takes a screenshot of the visible region encompassed by this element’s bounding rectangle.

**Parameters**

- **optScroll?**: `boolean` – (Optional) Indicates whether the element should be scrolled into view before the screenshot is taken; defaults to `false`.

**Returns**  
A promise that resolves to a Base64-encoded PNG string.

_Inherited from OjButtonsetManyBase.takeScreenshot_

---

### whenBusyContextReady

```
whenBusyContextReady(): Promise<void>
```

Returns a promise that is resolved when the application’s busy state reports ready. This checks only the busy context, not whether the DOM element is displayed or has a physical size (for that, use `#whenReady`). Read-only operations should call this before execution.

**Returns**  
A promise that resolves when the page’s busy state is ready.

_Inherited from OjButtonsetManyBase.whenBusyContextReady_

---

### whenReady

```
whenReady(): Promise<void>
```

Returns a promise that is resolved when the element is ready for interaction (visible, has a size, and the app’s busy context is ready). Operations that rely on the element’s position or size in the DOM (like clicking, sending keys, locating children, etc.) should call this command.

**Returns**  
A promise that resolves when all readiness conditions have been met.

_Inherited from OjButtonsetManyBase.whenReady_

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
The element ID for WebDriver’s wire protocol.

_Inherited from OjButtonsetManyBase.buildId_

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
A promise that resolves to a boolean indicating whether the two `WebElement`s are the same.

_Inherited from OjButtonsetManyBase.equals_

---

### extractId

```
static extractId(obj): string
```

Extracts the encoded `WebElement` ID from the object.

**Parameters**

- **obj**: `IWebElementId` – The object to extract the ID from.

**Returns**  
The extracted ID as a string.

**Throws** if the object is not a valid encoded ID.

_Inherited from OjButtonsetManyBase.extractId_

---

### isId

```
static isId(obj): boolean
```

**Parameters**

- **obj**: `IWebElementId` – The object to test.

**Returns**  
A boolean indicating whether the object is a valid encoded `WebElement` ID.

_Inherited from OjButtonsetManyBase.isId_
