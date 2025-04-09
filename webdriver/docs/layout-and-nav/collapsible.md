`@oracle/oraclejet-webdriver/elements/OjCollapsible`

# OjCollapsible

The component WebElement for `oj-collapsible`. Do not instantiate this class directly; instead, use `ojCollapsible`.

### Migration

When you migrate a page from using `oj-collapsible` to `oj-c-collapsible`, you will also need to migrate your WebDriver tests from **OjCollapsible** to **CollapsibleWebElement**. To do that, revise type and locator instances as follows:

- **Type**: from `OjCollapsible` to `CollapsibleWebElement`
- **Locator**: from `ojCollapsible` to `findCollapsible`

For more details on migrating from legacy to core pack, please see the component’s migration section.

---

## Constructors

### constructor

```ts
new OjCollapsible(el, locators): OjCollapsible
```

**Constructor.** Pass an instance of WebDriver’s `WebElement` that represents the DOM node on which we’ll perform operations.

**Parameters**

- **el**: `WebElement`  
  The basic `WebElement` with which this WebElement will work.
- **locators**: `ElementLocators`

**Returns**  
`OjCollapsible`

_Inherited from OjCollapsibleBase.constructor_

---

## Methods

### changeExpanded

```ts
changeExpanded(expanded): Promise<void>
```

Sets the value of the `expanded` property, specifying whether the content is expanded.

**Parameters**

- **expanded**: `boolean` – The new expanded state.

**Returns**  
A promise that resolves to `void`.

**Deprecated**  
Since 13.0.0. Use `doCollapse` / `doExpand` instead.

---

### clear

```ts
clear(): Promise<void>
```

Schedules a command to clear the `value` of this element. No effect if the DOM element is neither a text `<input>` nor `<textarea>`.

**Returns**  
A promise resolved once the element is cleared.

_Inherited from OjCollapsibleBase.clear_

---

### click

```ts
click(): Promise<void>
```

Schedules a command to click on this element.

**Returns**  
A promise resolved once the click command has completed.

_Inherited from OjCollapsibleBase.click_

---

### doCollapse

```ts
doCollapse(): Promise<void>
```

Collapses the **oj-collapsible**. If already expanded, this method collapses it; if it is already collapsed, it does nothing.

**Returns**  
A promise resolved when the collapse action is complete.

---

### doExpand

```ts
doExpand(): Promise<void>
```

Expands the **oj-collapsible**. If already collapsed, this method expands it; if it is already expanded, it does nothing.

**Returns**  
A promise resolved when the expand action is complete.

---

### findElement

```ts
findElement(locator): WebElementPromise
```

Locates a single descendant of this element via a `By` locator or custom function. If not found, throws a `NO_SUCH_ELEMENT` error. This also acts as an assertion that the element is present.  
Use `findElements` if the element might not exist.

**Parameters**

- **locator**: `Locator`

**Returns**  
A `WebElementPromise` for chaining commands.

_Inherited from OjCollapsibleBase.findElement_

---

### findElements

```ts
findElements(locator): Promise<WebElement[]>
```

Locates all descendants matching a given locator.

**Parameters**

- **locator**: `Locator`

**Returns**  
A promise resolved with an array of `WebElement`s.

_Inherited from OjCollapsibleBase.findElements_

---

### getAttribute

```ts
getAttribute(attributeName): Promise<string>
```

Retrieves the named attribute’s value. If missing, attempts to read the corresponding property. Boolean attributes are returned as `'true'` or `null`, while `'style'` is formatted with a trailing semicolon.

**Parameters**

- **attributeName**: `string`

**Returns**  
A promise that resolves to a string or `null`.

_Inherited from OjCollapsibleBase.getAttribute_

---

### getCssValue

```ts
getCssValue(cssStyleProperty): Promise<string>
```

Schedules a query for the computed style of this element. Color values may be converted to hex.

**Warning**: The returned value is browser-interpreted.

**Parameters**

- **cssStyleProperty**: `string`

**Returns**  
A promise resolved to the requested CSS value.

_Inherited from OjCollapsibleBase.getCssValue_

---

### getDisabled

```ts
getDisabled(): Promise<boolean>
```

Gets the `disabled` property. If `true`, the collapsible is disabled.

**Returns**  
A promise resolved to a boolean.

_Inherited from OjCollapsibleBase.getDisabled_

---

### getDriver

```ts
getDriver(): WebDriver
```

Returns the parent `WebDriver` instance.

_Inherited from OjCollapsibleBase.getDriver_

---

### getExpandArea (Deprecated)

```ts
getExpandArea(): Promise<string>
```

Gets the `expandArea` property, specifying where in the header to click to toggle disclosure.

**Returns**  
A promise resolved to a string representing the expand area.

**Deprecated**  
Since 14.0.0. The expand-area attribute is no longer used.

_Inherited from OjCollapsibleBase.getExpandArea_

---

### getExpanded

```ts
getExpanded(): Promise<boolean>
```

Gets the `expanded` property, indicating whether the content is expanded.

**Returns**  
A promise resolved to a boolean.

_Inherited from OjCollapsibleBase.getExpanded_

---

### getId

```ts
getId(): Promise<string>
```

A promise that resolves to the server-assigned ID of this element.

_Inherited from OjCollapsibleBase.getId_

---

### getLocation

```ts
getLocation(): Promise<ILocation>
```

**DEPRECATED 3.0**  
Computes this element’s location in page space, returning `{ x: number, y: number }`.

_Inherited from OjCollapsibleBase.getLocation_

---

### getProperty

```ts
getProperty<T>(propertyName): Promise<T>
```

Retrieves a named property after the busy context is clear.

**Parameters**

- **propertyName**: `string`

**Returns**  
A `Promise<T>` for the property value.

_Inherited from OjCollapsibleBase.getProperty_

---

### getRect

```ts
getRect(): Promise<IRectangle>
```

Returns an object describing this element’s position and size (in pixels) relative to the document.

_Inherited from OjCollapsibleBase.getRect_

---

### getShadowRoot

```ts
getShadowRoot(): ShadowRootPromise
```

A promise resolved with the element’s shadow root, or rejected if none exists.

_Inherited from OjCollapsibleBase.getShadowRoot_

---

### getSize (Deprecated)

```ts
getSize(): Promise<ISize>
```

**DEPRECATED 3.0**  
Computes the bounding box size (in pixels) of this element.

_Inherited from OjCollapsibleBase.getSize_

---

### getTagName

```ts
getTagName(): Promise<string>
```

Schedules a command to retrieve the element’s tag name.

_Inherited from OjCollapsibleBase.getTagName_

---

### getText

```ts
getText(): Promise<string>
```

Gets the visible (non–CSS-hidden) text inside this element, including sub-elements, trimmed of whitespace.

_Inherited from OjCollapsibleBase.getText_

---

### getTranslations

```ts
getTranslations(): Promise<null | object>
```

Gets the `translations` property, a collection of localized resources or `null` if none exist.

_Inherited from OjCollapsibleBase.getTranslations_

---

#### Protected

### hasSize (Deprecated)

```ts
hasSize(): Condition<Promise<boolean>>
```

Creates a wait condition that’s satisfied when the DOM has a non-zero size.

**Deprecated** since 11.0.0. Use standard `WebElement` methods to test size.

_Inherited from OjCollapsibleBase.hasSize_

---

### hasVisibility (Deprecated)

```ts
hasVisibility(): Condition<Promise<boolean>>
```

Creates a wait condition for when this element is displayed and scrolled into view. Deprecated. Use `WebElement.isDisplayed`.

_Inherited from OjCollapsibleBase.hasVisibility_

---

### isDisplayed

```ts
isDisplayed(): Promise<boolean>
```

Checks if this element is currently visible on the page.

_Inherited from OjCollapsibleBase.isDisplayed_

---

### isEnabled

```ts
isEnabled(): Promise<boolean>
```

Checks whether this element is enabled, as dictated by the `disabled` attribute.

_Inherited from OjCollapsibleBase.isEnabled_

---

### isSelected

```ts
isSelected(): Promise<boolean>
```

Checks whether this element is selected.

_Inherited from OjCollapsibleBase.isSelected_

---

### sendKeys

```ts
sendKeys(...varArgs): Promise<void>
```

Types a sequence of keys into this element. Supports stateful modifier keys and file upload inputs.

**Parameters**

- **...varArgs**: `(string | number | Promise<string | number>)[]`

_Inherited from OjCollapsibleBase.sendKeys_

---

### serialize

```ts
serialize(): Promise<IWebElementId>
```

Returns a promise with the element’s `IWebElementId`.

_Inherited from OjCollapsibleBase.serialize_

---

#### Protected

### setProperty

```ts
setProperty<T>(propertyName, value): Promise<void>
```

Sets a property on the remote element, waiting for BusyContext before and after assignment.

_Inherited from OjCollapsibleBase.setProperty_

---

### submit

```ts
submit(): Promise<void>
```

Submits the form containing this element, if any. No-op otherwise.

_Inherited from OjCollapsibleBase.submit_

---

### takeScreenshot

```ts
takeScreenshot(optScroll?): Promise<string>
```

Takes a screenshot of the visible region of this element.

**Parameters**

- **optScroll?**: `boolean` – Whether to scroll the element into view first (default is `false`).

_Inherited from OjCollapsibleBase.takeScreenshot_

---

### whenBusyContextReady

```ts
whenBusyContextReady(): Promise<void>
```

Resolves once the app’s busy state is ready. Doesn’t guarantee this element is visible or sized; use `whenReady` for that.

_Inherited from OjCollapsibleBase.whenBusyContextReady_

---

### whenReady

```ts
whenReady(): Promise<void>
```

Resolves when the element is ready for interaction—visible, sized, and no busy context. Useful for actions dependent on the element’s position.

_Inherited from OjCollapsibleBase.whenReady_

---

## Static

### buildId

```ts
static buildId(id, opt_noLegacy?): IWebElementId
```

**Parameters**

- **id**: `string`
- **opt_noLegacy?**: `boolean` – Whether to exclude the legacy element key

**Returns**  
An `IWebElementId` for use with WebDriver’s wire protocol.

_Inherited from OjCollapsibleBase.buildId_

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
A promise resolved to a boolean (true if they represent the same DOM node).

_Inherited from OjCollapsibleBase.equals_

---

### extractId

```ts
static extractId(obj): string
```

Extracts an encoded `WebElement` ID from the given object, throwing if invalid.

_Inherited from OjCollapsibleBase.extractId_

---

### isId

```ts
static isId(obj): boolean
```

Checks if the object is a valid encoded `WebElement` ID.

_Inherited from OjCollapsibleBase.isId_
