`@oracle/oraclejet-webdriver/elements/OjCheckboxset`

# OjCheckboxset

The component WebElement for `oj-checkboxset`. Do not instantiate this class directly; instead, use `ojCheckboxset`.

---

## Constructors

### constructor

```ts
new OjCheckboxset(el, locators): OjCheckboxset
```

**Constructor.** Pass an instance of WebDriver’s `WebElement` that represents the DOM node on which we’ll perform operations.

**Parameters**

- **el**: `WebElement`  
  The basic `WebElement` with which this WebElement will work.
- **locators**: `ElementLocators`

**Returns**  
`OjCheckboxset`

_Inherited from OjCheckboxsetBase.constructor_

---

## Methods

### changeMessagesCustom

```ts
changeMessagesCustom(messagesCustom): Promise<void>
```

Sets the value of the `messagesCustom` property. This is a list of messages added by an application to the component. See the Help documentation for more information.

**Parameters**

- **messagesCustom**: `object[]`  
  The value to set for `messagesCustom`.

**Returns**  
A promise that resolves to `void`.

_Inherited from OjCheckboxsetBase.changeMessagesCustom_

---

### changeValue

```ts
changeValue(value): Promise<void>
```

Sets the value of the `"value"` property. This should be an array representing the value of the component. See the Help documentation for more info.

**Parameters**

- **value**: `any[]` – The new array of selected values.

**Returns**  
A promise that resolves to `void`.

**Throws**

- If the API is called while the control is `readonly` or disabled.
- If the `value` parameter contains non-existent values.

_Overrides OjCheckboxsetBase.changeValue_

---

### clear

```ts
clear(): Promise<void>
```

Schedules a command to clear the `value` of this element. This command has no effect if the underlying DOM element is neither a text `<input>` nor a `<textarea>`.

**Returns**  
A promise resolved when the element’s value is cleared.

_Inherited from OjCheckboxsetBase.clear_

---

### click

```ts
click(): Promise<void>
```

Schedules a command to click on this element.

**Returns**  
A promise that resolves when the click command has completed.

_Inherited from OjCheckboxsetBase.click_

---

### findElement

```ts
findElement(locator): WebElementPromise
```

Schedule a command to find a descendant of this element using a locator or a custom function. If not found, a `NO_SUCH_ELEMENT` error is returned. This effectively asserts the element is present. (Use `findElements` to handle possibly absent elements more gracefully.)

**Parameters**

- **locator**: `Locator`

**Returns**  
`WebElementPromise` – A `WebElement` to issue commands against.

_Inherited from OjCheckboxsetBase.findElement_

---

### findElements

```ts
findElements(locator): Promise<WebElement[]>
```

Finds all descendants of this element that match the given search criteria.

**Parameters**

- **locator**: `Locator`

**Returns**  
A promise that resolves to an array of `WebElement`s.

_Inherited from OjCheckboxsetBase.findElements_

---

### getAttribute

```ts
getAttribute(attributeName): Promise<string>
```

Schedules a command to query the named attribute of this element. If the attribute is absent, attempts to return the corresponding property instead. Boolean attributes are returned as `'true'` or `null`, and `'style'` is represented with a trailing semicolon if present.

**Parameters**

- **attributeName**: `string`

**Returns**  
A promise that resolves to the attribute value (string or `null`).

_Inherited from OjCheckboxsetBase.getAttribute_

---

### getCssValue

```ts
getCssValue(cssStyleProperty): Promise<string>
```

Schedules a command to query for the computed style of this element, converting color values to hex where possible.

**Warning**: The returned value is how the browser interprets it, so might be tricky for assertions.

**Parameters**

- **cssStyleProperty**: `string`

**Returns**  
A promise resolving to the requested CSS value.

_Inherited from OjCheckboxsetBase.getCssValue_

---

### getDescribedBy

```ts
getDescribedBy(): Promise<string>
```

Gets the value of the `describedBy` property. For form components, `oj-label` automatically sets `described-by`. Not meant to be set by the app developer.

**Returns**  
A promise resolving to the `describedBy` string.

_Inherited from OjCheckboxsetBase.getDescribedBy_

---

### getDisabled

```ts
getDisabled(): Promise<boolean>
```

Gets the `disabled` property value. If `true`, the component and all related inputs/labels are disabled.

**Returns**  
A promise resolving to a boolean.

_Inherited from OjCheckboxsetBase.getDisabled_

---

### getDisplayOptions

```ts
getDisplayOptions(): Promise<DisplayOptions>
```

Gets the `displayOptions` property, which controls how auxiliary content is displayed.

**Returns**  
A promise resolving to the `DisplayOptions` object.

_Inherited from OjCheckboxsetBase.getDisplayOptions_

---

### getDriver

```ts
getDriver(): WebDriver
```

Returns the parent WebDriver instance for this component.

_Inherited from OjCheckboxsetBase.getDriver_

---

### getHelp

```ts
getHelp(): Promise<Help>
```

Gets the `help` property, which describes form component help information.

**Returns**  
A promise resolving to a `Help` object.

_Inherited from OjCheckboxsetBase.getHelp_

---

### getHelpHints

```ts
getHelpHints(): Promise<HelpHints>
```

Gets the `helpHints` property. These hints are for `oj-form-layout` to render help on the label of the editable component.

**Returns**  
A promise resolving to the `HelpHints` object.

_Inherited from OjCheckboxsetBase.getHelpHints_

---

### getId

```ts
getId(): Promise<string>
```

A promise that resolves to the server-assigned opaque ID for this element.

_Inherited from OjCheckboxsetBase.getId_

---

### getLabelEdge

```ts
getLabelEdge(): Promise<string>
```

Gets how the label of a component is created (e.g., `'inside'`, `'none'`, etc.). Refer to Help documentation.

**Returns**  
A promise resolving to a string label edge setting.

_Inherited from OjCheckboxsetBase.getLabelEdge_

---

### getLabelHint

```ts
getLabelHint(): Promise<string>
```

Gets the `labelHint` property, a hint for `oj-form-layout` to render a label on the editable component.

**Returns**  
A promise resolving to the label hint string.

_Inherited from OjCheckboxsetBase.getLabelHint_

---

### getLabelledBy

```ts
getLabelledBy(): Promise<null | string>
```

Gets the `labelledBy` property, establishing a relationship between this component and another element (often an `oj-label`).

**Returns**  
A promise resolving to either `null` or a string ID reference.

_Inherited from OjCheckboxsetBase.getLabelledBy_

---

### getLocation

```ts
getLocation(): Promise<ILocation>
```

**DEPRECATED 3.0** – Schedules a command to compute this element’s location in page space.

**Returns**  
A promise resolving to `{ x: number, y: number }`.

_Inherited from OjCheckboxsetBase.getLocation_

---

### getMessagesCustom

```ts
getMessagesCustom(): Promise<object[]>
```

Gets the `messagesCustom` property. A list of application-added messages for the component.

**Returns**  
A promise resolving to an array of objects describing custom messages.

_Inherited from OjCheckboxsetBase.getMessagesCustom_

---

### getOptionRenderer

```ts
getOptionRenderer(): Promise<null>
```

Gets the `optionRenderer` property. This is a renderer function used to render each option.

**Returns**  
A promise resolving to `null` if no custom renderer is set.

_Inherited from OjCheckboxsetBase.getOptionRenderer_

---

### getOptions

```ts
getOptions(): Promise<null | object>
```

Gets the `options` property. Represents the option items for the checkbox set.

**Returns**  
A promise resolving to `null` or an object describing the options.

_Inherited from OjCheckboxsetBase.getOptions_

---

### getOptionsKeys

```ts
getOptionsKeys(): Promise<OptionsKeys>
```

Gets the `optionsKeys` property, used to specify key names in the `options` array when data doesn’t match the standard signature.

**Returns**  
A promise resolving to an `OptionsKeys` object.

_Inherited from OjCheckboxsetBase.getOptionsKeys_

---

### getProperty

```ts
getProperty<T>(propertyName): Promise<T>
```

Gets a named property from this component, waiting for the BusyContext to clear first.

**Parameters**

- **propertyName**: `string`

**Returns**  
A `Promise<T>` for the property value.

_Inherited from OjCheckboxsetBase.getProperty_

---

### getReadonly

```ts
getReadonly(): Promise<boolean>
```

Gets the `readonly` property, indicating whether user interaction is allowed but modifications are disallowed.

**Returns**  
A promise resolving to a boolean.

_Inherited from OjCheckboxsetBase.getReadonly_

---

### getReadonlyUserAssistanceShown

```ts
getReadonlyUserAssistanceShown(): Promise<string>
```

Gets the `readonlyUserAssistanceShown` property, which determines which user assistance types are shown in readonly mode. Examples: `'none'`, `'confirmationAndInfoMessages'`.

**Returns**  
A promise resolving to the user assistance mode string.

_Inherited from OjCheckboxsetBase.getReadonlyUserAssistanceShown_

---

### getRect

```ts
getRect(): Promise<IRectangle>
```

Returns an object describing the element’s location and size (in pixels) relative to the document.

**Returns**  
A promise resolving to an `IRectangle`.

_Inherited from OjCheckboxsetBase.getRect_

---

### getRequired

```ts
getRequired(): Promise<boolean>
```

Gets the `required` property, specifying whether the component is required or optional.

**Returns**  
A promise resolving to a boolean.

_Inherited from OjCheckboxsetBase.getRequired_

---

### getShadowRoot

```ts
getShadowRoot(): ShadowRootPromise
```

Gets the element’s shadow root.

**Returns**  
A promise that resolves with the shadow root or rejects with `NoSuchShadowRootError`.

_Inherited from OjCheckboxsetBase.getShadowRoot_

---

### getSize

```ts
getSize(): Promise<ISize>
```

**DEPRECATED 3.0** – Schedules a command to compute the bounding box size (in pixels) of this element.

**Returns**  
A promise resolving to `{ width: number, height: number }`.

_Inherited from OjCheckboxsetBase.getSize_

---

### getTagName

```ts
getTagName(): Promise<string>
```

Schedules a command to query for the element’s tag/node name.

**Returns**  
A promise resolving to the tag name.

_Inherited from OjCheckboxsetBase.getTagName_

---

### getText

```ts
getText(): Promise<string>
```

Gets the visible (non–CSS-hidden) innerText of this element, without leading or trailing whitespace.

**Returns**  
A promise resolving to the element’s visible text.

_Inherited from OjCheckboxsetBase.getText_

---

### getTranslations

```ts
getTranslations(): Promise<null | Translations>
```

Gets the `translations` property. A collection of translated resources from the translation bundle, or `null` if none exist.

**Returns**  
A promise resolving to `null` or a `Translations` object.

_Inherited from OjCheckboxsetBase.getTranslations_

---

### getUserAssistanceDensity

```ts
getUserAssistanceDensity(): Promise<string>
```

Gets the `userAssistanceDensity` property, which specifies the density of user assistance presentation for this form component.

**Returns**  
A promise resolving to a string representation of the user assistance density.

_Inherited from OjCheckboxsetBase.getUserAssistanceDensity_

---

### getValid

```ts
getValid(): Promise<string>
```

Gets the `valid` property, representing the validity state of the component (e.g. `'valid'`, `'invalidShown'`, `'pending'`, etc.).

**Returns**  
A promise resolving to a string validity state.

_Inherited from OjCheckboxsetBase.getValid_

---

### getValue

```ts
getValue(): Promise<any[]>
```

Gets the `value` property, representing the array of selected values in the checkbox set.

**Returns**  
A promise resolving to an array of any type.

_Inherited from OjCheckboxsetBase.getValue_

---

#### Protected

### hasSize (Deprecated)

```ts
hasSize(): Condition<Promise<boolean>>
```

Creates a wait condition that’s satisfied when the element has a non-zero DOM size.

**Returns**  
`Condition<Promise<boolean>>` for use with `driver.wait()`.

**Deprecated** since 11.0.0. Use a regular WebElement method to test size.

_Inherited from OjCheckboxsetBase.hasSize_

---

### hasVisibility (Deprecated)

```ts
hasVisibility(): Condition<Promise<boolean>>
```

Creates a wait condition satisfied when the element is displayed and scrolled into view. Deprecated. Use `WebElement.isDisplayed` instead.

_Inherited from OjCheckboxsetBase.hasVisibility_

---

### isDisplayed

```ts
isDisplayed(): Promise<boolean>
```

Schedules a command to test whether this element is currently displayed.

**Returns**  
A promise resolving to `true` if visible, or `false` otherwise.

_Inherited from OjCheckboxsetBase.isDisplayed_

---

### isEnabled

```ts
isEnabled(): Promise<boolean>
```

Schedules a command to query whether this element is enabled, as dictated by the `disabled` attribute.

**Returns**  
A promise resolving to a boolean indicating enablement.

_Inherited from OjCheckboxsetBase.isEnabled_

---

### isSelected

```ts
isSelected(): Promise<boolean>
```

Schedules a command to query if this element is selected.

**Returns**  
A promise resolving to `true` if selected, or `false` otherwise.

_Inherited from OjCheckboxsetBase.isSelected_

---

### sendKeys

```ts
sendKeys(...varArgs): Promise<void>
```

Schedules a command to type a sequence on this element, handling stateful modifier keys (`SHIFT`, `CONTROL`, etc.). If this is a file `<input>`, it attaches the specified file path.

**Parameters**

- **...varArgs**: `(string | number | Promise<string | number>)[]`

**Returns**  
A promise resolving when all keys are typed.

_Inherited from OjCheckboxsetBase.sendKeys_

---

### serialize

```ts
serialize(): Promise<IWebElementId>
```

Returns a promise that resolves to `IWebElementId`.

_Inherited from OjCheckboxsetBase.serialize_

---

#### Protected

### setProperty

```ts
setProperty<T>(propertyName, value): Promise<void>
```

Sets a property on the remote element. Waits for the BusyContext to clear before and after to ensure no extra busy states appear.

**Type Parameters**

- **T** = `string`

**Parameters**

- **propertyName**: `string` – The property name
- **value**: `T` – The value to assign

**Returns**  
A promise resolving when the property is set. Any return from the remote property call is also returned here.

_Inherited from OjCheckboxsetBase.setProperty_

---

### submit

```ts
submit(): Promise<void>
```

Schedules a command to submit the form containing this element, or if it is itself a `FORM`. No-op if not in a form.

**Returns**  
A promise resolving when submission is complete.

_Inherited from OjCheckboxsetBase.submit_

---

### takeScreenshot

```ts
takeScreenshot(optScroll?): Promise<string>
```

Takes a screenshot of the visible region of this element’s bounding rectangle.

**Parameters**

- **optScroll?**: `boolean` – Whether the element should be scrolled into view before the screenshot (default `false`).

**Returns**  
A promise resolving to a Base64-encoded PNG string.

_Inherited from OjCheckboxsetBase.takeScreenshot_

---

### whenBusyContextReady

```ts
whenBusyContextReady(): Promise<void>
```

A promise resolved when the application’s busy state is ready. This does not guarantee the DOM element is displayed or has size; use `whenReady` for that.

_Inherited from OjCheckboxsetBase.whenBusyContextReady_

---

### whenReady

```ts
whenReady(): Promise<void>
```

A promise that resolves when the element is ready for interaction—visible, sized, and the busy context is clear.

_Inherited from OjCheckboxsetBase.whenReady_

---

## Static

### buildId

```ts
static buildId(id, opt_noLegacy?): IWebElementId
```

**Parameters**

- **id**: `string` – The raw ID
- **opt_noLegacy?**: `boolean` – Exclude the legacy element key?

**Returns**  
The element ID for WebDriver’s wire protocol.

_Inherited from OjCheckboxsetBase.buildId_

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
A promise resolving to `true` if both are equal.

_Inherited from OjCheckboxsetBase.equals_

---

### extractId

```ts
static extractId(obj): string
```

Extracts the encoded `WebElement` ID from `obj`, throwing if it’s invalid.

**Parameters**

- **obj**: `IWebElementId`

**Returns**  
A string representing the extracted ID.

_Inherited from OjCheckboxsetBase.extractId_

---

### isId

```ts
static isId(obj): boolean
```

**Parameters**

- **obj**: `IWebElementId`

**Returns**  
A boolean indicating whether the object is a valid encoded `WebElement` ID.

_Inherited from OjCheckboxsetBase.isId_
