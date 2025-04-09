`@oracle/oraclejet-webdriver/elements/OjColorPalette`

# OjColorPalette

The component WebElement for `oj-color-palette`. Do not instantiate this class directly; instead, use `ojColorPalette`.

---

## Constructors

### constructor

```ts
new OjColorPalette(el, locators): OjColorPalette
```

**Constructor.** Pass an instance of WebDriver’s `WebElement` that represents the DOM node on which we’ll perform operations.

**Parameters**

- **el**: `WebElement`  
  The basic `WebElement` with which this WebElement will work.
- **locators**: `ElementLocators`

**Returns**  
`OjColorPalette`

_Inherited from OjColorPaletteBase.constructor_

---

## Methods

### changeMessagesCustom

```ts
changeMessagesCustom(messagesCustom): Promise<void>
```

Sets the value of `messagesCustom` property. A list of messages added by an application to the component. See the Help documentation for more information.

**Parameters**

- **messagesCustom**: `object[]` – The value to set for `messagesCustom`

**Returns**  
A promise that resolves to `void`.

**Deprecated** since 18.0.0. The oj-color-palette is not meant to display messages, be labeled, or be in a form layout. Per Redwood UX specification, it is not intended to be a form component.

_Inherited from OjColorPaletteBase.changeMessagesCustom_

---

### changeValue

```ts
changeValue(value): Promise<void>
```

Sets the value of the `value` property. Represents the current value of the palette element.

**Parameters**

- **value**: `string | object` – The value to set for `value`

**Returns**  
A promise that resolves to `void`.

_Inherited from OjColorPaletteBase.changeValue_

---

### clear

```ts
clear(): Promise<void>
```

Schedules a command to clear the `value` of this element. Has no effect if the underlying DOM element is neither a text `<input>` nor a `<textarea>`.

**Returns**  
A promise resolved when the element’s value is cleared.

_Inherited from OjColorPaletteBase.clear_

---

### click

```ts
click(): Promise<void>
```

Schedules a command to click on this element.

**Returns**  
A promise resolved when the click command completes.

_Inherited from OjColorPaletteBase.click_

---

### findElement

```ts
findElement(locator): WebElementPromise
```

Schedules a command to find a single descendant of this element. If the element isn’t found, returns a `NO_SUCH_ELEMENT` error. Also acts as an assertion that the element must be present. Use `findElements` if the element may or may not exist.

**Parameters**

- **locator**: `Locator`

**Returns**  
A `WebElementPromise` for the found element.

_Inherited from OjColorPaletteBase.findElement_

---

### findElements

```ts
findElements(locator): Promise<WebElement[]>
```

Schedules a command to find **all** descendants matching a given locator.

**Parameters**

- **locator**: `Locator`

**Returns**  
A promise resolving to an array of `WebElement`s.

_Inherited from OjColorPaletteBase.findElements_

---

### getAttribute

```ts
getAttribute(attributeName): Promise<string>
```

Retrieves the named attribute’s value (if present), otherwise attempts to read the property with the same name. Boolean attributes return `'true'` or `null`, while `'style'` has a trailing semicolon.

**Parameters**

- **attributeName**: `string` – The attribute to query

**Returns**  
A promise that resolves to the attribute’s value or `null`.

_Inherited from OjColorPaletteBase.getAttribute_

---

### getCssValue

```ts
getCssValue(cssStyleProperty): Promise<string>
```

Queries for the computed style of this element. Color values may be converted to hex.

**Warning**: The value is how the browser interprets it.

**Parameters**

- **cssStyleProperty**: `string` – The CSS property name

**Returns**  
A promise resolving to the requested CSS value.

_Inherited from OjColorPaletteBase.getCssValue_

---

### getDescribedBy (Deprecated)

```ts
getDescribedBy(): Promise<string>
```

Gets the `describedBy` property. Typically auto-set by `oj-label` and not meant to be set by the application.

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. The oj-color-palette is not meant to be labeled or display messages. It’s not intended to be a form component.

_Inherited from OjColorPaletteBase.getDescribedBy_

---

### getDisabled (Deprecated)

```ts
getDisabled(): Promise<boolean>
```

Gets the `disabled` property. Specifies if the component is disabled. The default is `false`.

**Returns**  
A promise resolving to a boolean.

**Deprecated** since 18.0.0. Disabled is not supported by the Color Palette UX specification.

_Inherited from OjColorPaletteBase.getDisabled_

---

### getDisplayOptions (Deprecated)

```ts
getDisplayOptions(): Promise<DisplayOptions>
```

Gets the `displayOptions` property (form component display settings).

**Returns**  
A promise resolving to `DisplayOptions`.

**Deprecated** since 18.0.0. The oj-color-palette is not meant to show messages, be labeled, or be in a form layout.

_Inherited from OjColorPaletteBase.getDisplayOptions_

---

### getDriver

```ts
getDriver(): WebDriver
```

Returns the parent `WebDriver` for this instance.

_Inherited from OjColorPaletteBase.getDriver_

---

### getHelp (Deprecated)

```ts
getHelp(): Promise<Help>
```

Gets the `help` property, describing form component help info.

**Returns**  
A promise resolving to a `Help` object.

**Deprecated** since 18.0.0.

_Inherited from OjColorPaletteBase.getHelp_

---

### getHelpHints (Deprecated)

```ts
getHelpHints(): Promise<HelpHints>
```

Gets the `helpHints` property for `oj-form-layout` label hints.

**Returns**  
A promise resolving to `HelpHints`.

**Deprecated** since 18.0.0.

_Inherited from OjColorPaletteBase.getHelpHints_

---

### getId

```ts
getId(): Promise<string>
```

A promise that resolves to the server-assigned opaque ID of this element.

_Inherited from OjColorPaletteBase.getId_

---

### getLabelDisplay (Deprecated)

```ts
getLabelDisplay(): Promise<string>
```

Gets the `labelDisplay` property, controlling whether a text label accompanies the color swatch.

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. Labels are no longer supported.

_Inherited from OjColorPaletteBase.getLabelDisplay_

---

### getLabelEdge (Deprecated)

```ts
getLabelEdge(): Promise<string>
```

Gets the `labelEdge` property. See the Help docs for more info.

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. The oj-color-palette is not intended to be a form component.

_Inherited from OjColorPaletteBase.getLabelEdge_

---

### getLabelHint (Deprecated)

```ts
getLabelHint(): Promise<string>
```

Gets the `labelHint` property, typically for `oj-form-layout` to render a label.

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. Not intended as a form component.

_Inherited from OjColorPaletteBase.getLabelHint_

---

### getLabelledBy (Deprecated)

```ts
getLabelledBy(): Promise<string>
```

Gets the `labelledBy` property, which establishes a relationship between this element and another labeled element.

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0.

_Inherited from OjColorPaletteBase.getLabelledBy_

---

### getLayout (Deprecated)

```ts
getLayout(): Promise<string>
```

Gets the `layout` property, specifying how color swatches are laid out.

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. Only “grid” layout is currently supported.

_Inherited from OjColorPaletteBase.getLayout_

---

### getLocation (Deprecated)

```ts
getLocation(): Promise<ILocation>
```

**DEPRECATED 3.0** – Schedules a command to compute this element’s location in page space (`{ x: number, y: number }`).

_Inherited from OjColorPaletteBase.getLocation_

---

### getMessagesCustom (Deprecated)

```ts
getMessagesCustom(): Promise<object[]>
```

Gets the `messagesCustom` property. A list of messages added by the application.

**Returns**  
A promise resolving to an array of objects.

**Deprecated** since 18.0.0.

_Inherited from OjColorPaletteBase.getMessagesCustom_

---

### getPalette

```ts
getPalette(): Promise<Palette[]>
```

Gets the `palette` property. This is an array of objects defining the color swatches available in the palette.

**Returns**  
A promise resolving to an array of `Palette` objects.

_Inherited from OjColorPaletteBase.getPalette_

---

### getPlaceholder (Deprecated)

```ts
getPlaceholder(): Promise<string>
```

Gets the `placeholder` property (placeholder text).

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. This component has no text input.

_Inherited from OjColorPaletteBase.getPlaceholder_

---

### getProperty

```ts
getProperty<T>(propertyName): Promise<T>
```

Waits for the busy context, then retrieves a named property value on this component.

**Parameters**

- **propertyName**: `string`

**Returns**  
A `Promise<T>` for the requested property.

_Inherited from OjColorPaletteBase.getProperty_

---

### getRect

```ts
getRect(): Promise<IRectangle>
```

Describes the element’s location (relative to the document) and size in pixels.

**Returns**  
A promise resolving to an `IRectangle` object.

_Inherited from OjColorPaletteBase.getRect_

---

### getShadowRoot

```ts
getShadowRoot(): ShadowRootPromise
```

Gets the shadow root of the current web element.

**Returns**  
A promise that resolves to the shadow root, or rejects if none.

_Inherited from OjColorPaletteBase.getShadowRoot_

---

### getSize (Deprecated)

```ts
getSize(): Promise<ISize>
```

**DEPRECATED 3.0** – Computes the bounding box size (`width`, `height`) in pixels.

_Inherited from OjColorPaletteBase.getSize_

---

### getSwatchSize

```ts
getSwatchSize(): Promise<string>
```

Gets the `swatchSize` property, indicating the size of each color swatch.

**Returns**  
A promise resolving to a string (e.g., `"sm"`, `"lg"`, etc.).

_Inherited from OjColorPaletteBase.getSwatchSize_

---

### getTagName

```ts
getTagName(): Promise<string>
```

Queries for the tag/node name of this element.

**Returns**  
A promise that resolves to the tag name.

_Inherited from OjColorPaletteBase.getTagName_

---

### getText

```ts
getText(): Promise<string>
```

Retrieves the visible (not hidden by CSS) inner text of this element, including sub-elements, without leading or trailing whitespace.

_Inherited from OjColorPaletteBase.getText_

---

### getTranslations (Deprecated)

```ts
getTranslations(): Promise<Translations>
```

Gets the `translations` property, i.e. a bundle of translated resources. May be `null` if none exist.

**Returns**  
A promise resolving to a `Translations` object.

**Deprecated** since 18.0.0. The color palette is not intended for form usage or validation.

_Inherited from OjColorPaletteBase.getTranslations_

---

### getUserAssistanceDensity (Deprecated)

```ts
getUserAssistanceDensity(): Promise<string>
```

Gets the `userAssistanceDensity` property, describing how form component user assistance is presented.

**Returns**  
A promise resolving to a string (e.g., `"compact"`).

**Deprecated** since 18.0.0. The color palette is not intended as a form component.

_Inherited from OjColorPaletteBase.getUserAssistanceDensity_

---

### getValid (Deprecated)

```ts
getValid(): Promise<string>
```

Gets the `valid` property, indicating the validity state of the component (e.g., `'valid'`, `'invalidShown'`).

**Returns**  
A promise resolving to a string.

**Deprecated** since 18.0.0. The color palette is not meant to be validated, labeled, or used in a form layout.

_Inherited from OjColorPaletteBase.getValid_

---

### getValue

```ts
getValue(): Promise<string | object>
```

Retrieves the `value` property, representing the color palette’s current value (color).

**Returns**  
A promise that resolves to a string or an object, depending on how the color is represented.

_Inherited from OjColorPaletteBase.getValue_

---

#### Protected

### hasSize (Deprecated)

```ts
hasSize(): Condition<Promise<boolean>>
```

Creates a wait condition that’s satisfied when this element’s DOM has a non-zero size.

**Returns**  
`Condition<Promise<boolean>>` for use with `driver.wait()`.

**Deprecated** since 11.0.0. Use normal WebElement methods to test the size.

_Inherited from OjColorPaletteBase.hasSize_

---

### hasVisibility (Deprecated)

```ts
hasVisibility(): Condition<Promise<boolean>>
```

Creates a wait condition that’s satisfied when the element is displayed and scrolled into view. Deprecated. Use `WebElement.isDisplayed()` instead.

_Inherited from OjColorPaletteBase.hasVisibility_

---

### isDisplayed

```ts
isDisplayed(): Promise<boolean>
```

Schedules a command to check if this element is currently displayed.

**Returns**  
A promise resolving to `true` if visible, `false` otherwise.

_Inherited from OjColorPaletteBase.isDisplayed_

---

### isEnabled

```ts
isEnabled(): Promise<boolean>
```

Checks whether this element is enabled, as dictated by the `disabled` attribute.

**Returns**  
A promise resolving to a boolean.

_Inherited from OjColorPaletteBase.isEnabled_

---

### isSelected

```ts
isSelected(): Promise<boolean>
```

Checks if this element is selected.

**Returns**  
A promise that resolves to whether it’s selected.

_Inherited from OjColorPaletteBase.isSelected_

---

### sendKeys

```ts
sendKeys(...varArgs): Promise<void>
```

Types a sequence of keys into the DOM element, handling stateful modifier keys. For file inputs, interprets the sequence as a file path to attach.

**Parameters**

- **...varArgs**: `(string | number | Promise<string | number>)[]`

**Returns**  
A promise resolving when all keys have been typed.

_Inherited from OjColorPaletteBase.sendKeys_

---

### serialize

```ts
serialize(): Promise<IWebElementId>
```

Returns a promise that resolves to the element’s `IWebElementId`.

_Inherited from OjColorPaletteBase.serialize_

---

#### Protected

### setProperty

```ts
setProperty<T>(propertyName, value): Promise<void>
```

Sets a property on the remote element, waiting for BusyContext before and after to ensure no additional busy states appear.

**Type Parameters**

- **T** = `string`

**Parameters**

- **propertyName**: `string`
- **value**: `T`

**Returns**  
A promise resolving once the property is set.

_Inherited from OjColorPaletteBase.setProperty_

---

### submit

```ts
submit(): Promise<void>
```

Schedules a command to submit the form containing this element, or does nothing if it isn’t in a form.

_Inherited from OjColorPaletteBase.submit_

---

### takeScreenshot

```ts
takeScreenshot(optScroll?): Promise<string>
```

Takes a screenshot of the visible region of this element’s bounding rectangle.

**Parameters**

- **optScroll?**: `boolean` – (Optional) Whether to scroll the element into view first, defaults to `false`.

**Returns**  
A promise resolving to a Base64-encoded PNG string.

_Inherited from OjColorPaletteBase.takeScreenshot_

---

### whenBusyContextReady

```ts
whenBusyContextReady(): Promise<void>
```

Resolves when the application’s busy state is ready. This does **not** guarantee the DOM element is displayed or has a physical size. Use `whenReady` for fully interactive checks.

_Inherited from OjColorPaletteBase.whenBusyContextReady_

---

### whenReady

```ts
whenReady(): Promise<void>
```

Resolves when the element is ready for interaction—visible, sized, and no longer busy. Useful for actions requiring physical location or size, like clicks or child-element queries.

_Inherited from OjColorPaletteBase.whenReady_

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
An `IWebElementId` for use with WebDriver’s wire protocol.

_Inherited from OjColorPaletteBase.buildId_

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
A promise resolving to `true` if both references the same DOM node.

_Inherited from OjColorPaletteBase.equals_

---

### extractId

```ts
static extractId(obj): string
```

Extracts the encoded `WebElement` ID from the given object, throwing if invalid.

_Inherited from OjColorPaletteBase.extractId_

---

### isId

```ts
static isId(obj): boolean
```

Checks if the object is a valid encoded `WebElement` ID.

_Inherited from OjColorPaletteBase.isId_
