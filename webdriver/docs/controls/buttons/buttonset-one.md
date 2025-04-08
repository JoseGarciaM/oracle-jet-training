`@oracle/oraclejet-webdriver/elements/OjButtonsetOne`

# OjButtonsetOne

The component WebElement for `oj-buttonset-one`. Do not instantiate this class directly; instead, use `ojButtonsetOne`.

---

## Constructors

### constructor

```ts
new OjButtonsetOne(el, locators): OjButtonsetOne
```

**Constructor.** Pass an instance of WebDriver’s `WebElement` that represents the DOM node on which we’ll perform operations.

**Parameters**

- **el**: `WebElement`  
  The basic `WebElement` with which this WebElement will work.
- **locators**: `ElementLocators`

**Returns**  
`OjButtonsetOne`

_Inherited from OjButtonsetOneBase.constructor_

---

## Methods

### changeValue

```ts
changeValue(value): Promise<void>
```

Sets the value of the `value` property. Indicates which `oj-option` in the buttonset is selected.

**Parameters**

- **value**: `any` — The value to set for `value`

**Returns**  
A promise that resolves to `void`.

_Inherited from OjButtonsetOneBase.changeValue_

---

### clear

```ts
clear(): Promise<void>
```

Schedules a command to clear the `value` of this element. This command has no effect if the underlying DOM element is neither a text `INPUT` nor a `TEXTAREA`.

**Returns**  
A promise that will be resolved when the element has been cleared.

_Inherited from OjButtonsetOneBase.clear_

---

### click

```ts
click(): Promise<void>
```

Schedules a command to click on this element.

**Returns**  
A promise that will be resolved when the click command has completed.

_Inherited from OjButtonsetOneBase.click_

---

### findElement

```ts
findElement(locator): WebElementPromise
```

Schedule a command to find a descendant of this element. If the element cannot be found, a `bot.ErrorCode.NO_SUCH_ELEMENT` result will be returned by the driver. Scheduling this command doubles as an assertion that the element is present on the page. To test whether an element is present, use `#findElements`.

You may provide a locator from the `By` namespace or a short-hand `By.Hash`. For example:

```js
var e1 = element.findElement(By.id("foo"));
var e2 = element.findElement({ id: "foo" });
```

You can also provide a custom locator function returning a `WebElement` or a promise that resolves to one. For instance:

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

- **locator**: `Locator` – The strategy to use when searching for the element.

**Returns**  
`WebElementPromise` – A `WebElement` that can be used to issue commands against the located element.

_Inherited from OjButtonsetOneBase.findElement_

---

### findElements

```ts
findElements(locator): Promise<WebElement[]>
```

Schedules a command to find all descendants of this element that match the given search criteria.

**Parameters**

- **locator**: `Locator`

**Returns**  
A promise that will resolve to an array of `WebElement`s.

_Inherited from OjButtonsetOneBase.findElements_

---

### getAttribute

```ts
getAttribute(attributeName): Promise<string>
```

Schedules a command to query for the value of the given attribute of the element. Returns the current value, even if modified after the page load. If the attribute isn’t present, the value of the property with the same name is returned. If neither is set, `null` is returned. The `'style'` attribute is converted as best as possible to a text representation with a trailing semicolon.

**Boolean** attributes return `'true'` or `null` (e.g., `checked`, `disabled`, `selected`, etc.).  
Commonly mis-capitalized attribute/property names like `'class'` and `'readonly'` are handled as expected.

**Parameters**

- **attributeName**: `string`

**Returns**  
A promise that resolves to the attribute’s value (string or `null`).

_Inherited from OjButtonsetOneBase.getAttribute_

---

### getChroming

```ts
getChroming(): Promise<string>
```

Gets the value of the `chroming` property. Indicates in what states the buttonset has chrome (background and border).

**Returns**  
A promise that resolves to the string value of `chroming`.

_Inherited from OjButtonsetOneBase.getChroming_

---

### getCssValue

```ts
getCssValue(cssStyleProperty): Promise<string>
```

Schedules a command to query for the computed style of this element. If the element inherits the style from a parent, the parent is queried. Color values are converted to hex where possible.

**Warning**: The returned value is browser-interpreted, so forming an assertion may be tricky.

**Parameters**

- **cssStyleProperty**: `string`

**Returns**  
A promise that resolves to the requested CSS value.

_Inherited from OjButtonsetOneBase.getCssValue_

---

### getDescribedBy

```ts
getDescribedBy(): Promise<string>
```

Gets the value of the `describedBy` property. The buttonset’s `oj-label` automatically sets `described-by` to make it accessible and is not meant to be set by the application developer.

**Returns**  
A promise that resolves to the `describedBy` string.

_Inherited from OjButtonsetOneBase.getDescribedBy_

---

### getDisabled

```ts
getDisabled(): Promise<boolean>
```

Gets the value of the `disabled` property. Specifies that the buttonset element should be disabled.

**Returns**  
A promise that resolves to a boolean indicating disabled state.

_Inherited from OjButtonsetOneBase.getDisabled_

---

### getDisplay

```ts
getDisplay(): Promise<string>
```

Gets the value of the `display` property. Specifies whether the buttonset displays label and icons, or just icons.

**Returns**  
A promise that resolves to the string value of `display`.

_Inherited from OjButtonsetOneBase.getDisplay_

---

### getDriver

```ts
getDriver(): WebDriver
```

Returns the parent `WebDriver` instance.

_Inherited from OjButtonsetOneBase.getDriver_

---

### getFocusManagement

```ts
getFocusManagement(): Promise<string>
```

Gets the value of the `focusManagement` property, which should be set to `none` when the buttonset is placed in a toolbar.

**Returns**  
A promise that resolves to the string value of `focusManagement`.

_Inherited from OjButtonsetOneBase.getFocusManagement_

---

### getId

```ts
getId(): Promise<string>
```

A promise that resolves to the server-assigned opaque ID for this element.

_Inherited from OjButtonsetOneBase.getId_

---

### getLabelledBy

```ts
getLabelledBy(): Promise<null | string>
```

Gets the value of the `labelledBy` property, establishing a relationship between this component and another element (often `oj-label`).

**Returns**  
A promise that resolves to either `null` or a string label reference.

_Inherited from OjButtonsetOneBase.getLabelledBy_

---

### getLocation

```ts
getLocation(): Promise<ILocation>
```

**DEPRECATED 3.0** – Schedules a command to compute this element’s location in page space.

**Returns**  
A promise that resolves to an `{ x: number, y: number }` location object.

_Inherited from OjButtonsetOneBase.getLocation_

---

### getProperty

```ts
getProperty<T>(propertyName): Promise<T>
```

Gets a named property value from this component, waiting for the application’s busy context to complete before reading.

**Parameters**

- **propertyName**: `string`

**Returns**  
A `Promise<T>` for the property value.

_Inherited from OjButtonsetOneBase.getProperty_

---

### getRect

```ts
getRect(): Promise<IRectangle>
```

Returns an object describing this element’s location (in pixels, relative to the document element) and size (width/height in pixels).

**Returns**  
A promise resolving to an `IRectangle`.

_Inherited from OjButtonsetOneBase.getRect_

---

### getShadowRoot

```ts
getShadowRoot(): ShadowRootPromise
```

Gets the shadow root of the current web element.

**Returns**  
A promise that resolves with the element’s shadow root or rejects with `NoSuchShadowRootError`.

_Inherited from OjButtonsetOneBase.getShadowRoot_

---

### getSize

```ts
getSize(): Promise<ISize>
```

**DEPRECATED 3.0** – Schedules a command to compute this element’s bounding box size in pixels.

**Returns**  
A promise that resolves to `{ width: number, height: number }`.

_Inherited from OjButtonsetOneBase.getSize_

---

### getTagName

```ts
getTagName(): Promise<string>
```

Schedules a command to query for the tag/node name of this element.

**Returns**  
A promise resolving to the element’s tag name.

_Inherited from OjButtonsetOneBase.getTagName_

---

### getText

```ts
getText(): Promise<string>
```

Gets the visible (not hidden by CSS) innerText of this element, including sub-elements, without leading or trailing whitespace.

**Returns**  
A promise resolving to the element’s visible text.

_Inherited from OjButtonsetOneBase.getText_

---

### getTranslations

```ts
getTranslations(): Promise<null | object>
```

Gets the value of the `translations` property, containing translated resources from the translation bundle, or `null` if none exist.

**Returns**  
A promise resolving to either `null` or an object.

_Inherited from OjButtonsetOneBase.getTranslations_

---

### getValue

```ts
getValue(): Promise<any>
```

Gets the value of the `value` property, indicating which `oj-option` in the buttonset is selected.

**Returns**  
A promise that resolves to the current selection value.

_Inherited from OjButtonsetOneBase.getValue_

---

#### Protected

### hasSize (Deprecated)

```ts
hasSize(): Condition<Promise<boolean>>
```

Create a wait condition that is satisfied when the element’s DOM has a non-zero size.

**Returns**  
A `Condition<Promise<boolean>>` for use with `driver.wait()`.

**Deprecated** since 11.0.0. Use the appropriate WebElement method to test the size instead.

_Inherited from OjButtonsetOneBase.hasSize_

---

### hasVisibility (Deprecated)

```ts
hasVisibility(): Condition<Promise<boolean>>
```

Create a wait condition satisfied when the element is visible and scrolled into view (as reported by `#isDisplayed`). Deprecated. Use `WebElement.isDisplayed`.

_Inherited from OjButtonsetOneBase.hasVisibility_

---

### isDisplayed

```ts
isDisplayed(): Promise<boolean>
```

Schedules a command to test if this element is currently displayed.

**Returns**  
A promise resolving to `true` if visible, `false` otherwise.

_Inherited from OjButtonsetOneBase.isDisplayed_

---

### isEnabled

```ts
isEnabled(): Promise<boolean>
```

Schedules a command to query whether the DOM element is enabled, as dictated by `disabled`.

**Returns**  
A promise resolving to a boolean of the enabled state.

_Inherited from OjButtonsetOneBase.isEnabled_

---

### isSelected

```ts
isSelected(): Promise<boolean>
```

Schedules a command to query whether this element is selected.

**Returns**  
A promise resolving to whether the element is currently selected.

_Inherited from OjButtonsetOneBase.isSelected_

---

### sendKeys

```ts
sendKeys(...varArgs): Promise<void>
```

Schedules a command to type a sequence on the DOM element. Modifier keys (`SHIFT`, `CONTROL`, `ALT`, `META`) are stateful. If this element is a file input (`<input type="file">`), the specified sequence should specify the file path to attach.

**Parameters**

- **...varArgs**: `(string | number | Promise<string | number>)[]`

**Returns**  
A promise that resolves when all keys have been typed.

_Inherited from OjButtonsetOneBase.sendKeys_

---

### serialize

```ts
serialize(): Promise<IWebElementId>
```

A promise that resolves to the element’s `IWebElementId`.

_Inherited from OjButtonsetOneBase.serialize_

---

#### Protected

### setProperty

```ts
setProperty<T>(propertyName, value): Promise<void>
```

Sets a property value on the remote element. This function waits for the BusyContext to clear before setting, then waits again to ensure no additional busy states were created.

**Type Parameters**

- **T** = `string`

**Parameters**

- **propertyName**: `string`
- **value**: `T`

**Returns**  
A promise resolving when the remote property is set.

_Inherited from OjButtonsetOneBase.setProperty_

---

### submit

```ts
submit(): Promise<void>
```

Schedules a command to submit the form containing this element (or if it is itself a `FORM`). No-op if not in a form.

**Returns**  
A promise resolved when the form is submitted.

_Inherited from OjButtonsetOneBase.submit_

---

### takeScreenshot

```ts
takeScreenshot(optScroll?): Promise<string>
```

Takes a screenshot of the visible region of this element’s bounding rectangle.

**Parameters**

- **optScroll?**: `boolean` – Whether to scroll the element into view first (defaults to `false`).

**Returns**  
A promise resolving to a Base64-encoded PNG string.

_Inherited from OjButtonsetOneBase.takeScreenshot_

---

### whenBusyContextReady

```ts
whenBusyContextReady(): Promise<void>
```

A promise resolved when the application’s busy state is ready, not guaranteeing the DOM is displayed or has physical size (use `#whenReady` for that). Read-only operations may call this first.

_Inherited from OjButtonsetOneBase.whenBusyContextReady_

---

### whenReady

```ts
whenReady(): Promise<void>
```

A promise resolved when the element is ready for interaction: visible, sized, and the app’s busy context is clear. Use for actions that rely on the element’s physical presence.

_Inherited from OjButtonsetOneBase.whenReady_

---

## Static

### buildId

```ts
static buildId(id, opt_noLegacy?): IWebElementId
```

**Parameters**

- **id**: `string` – The raw ID
- **opt_noLegacy?**: `boolean` – Whether to exclude the legacy element key

**Returns**  
The element ID for WebDriver’s wire protocol.

_Inherited from OjButtonsetOneBase.buildId_

---

### equals

```ts
static equals(a, b): Promise<boolean>
```

Compares two `WebElement`s for equality.

**Parameters**

- **a**: `WebElement`
- **b**: `WebElement`

**Returns**  
A promise resolving to `true` if both elements are equal.

_Inherited from OjButtonsetOneBase.equals_

---

### extractId

```ts
static extractId(obj): string
```

Extracts the encoded WebElement ID from the object, throwing if invalid.

**Parameters**

- **obj**: `IWebElementId`

**Returns**  
A string containing the extracted ID.

_Inherited from OjButtonsetOneBase.extractId_

---

### isId

```ts
static isId(obj): boolean
```

**Parameters**

- **obj**: `IWebElementId`

**Returns**  
A boolean indicating whether the object is a valid encoded WebElement ID.

_Inherited from OjButtonsetOneBase.isId_
