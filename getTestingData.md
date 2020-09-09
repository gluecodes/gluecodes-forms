## Testing data

Because we want components be installable with a single click, we need them to provide example data. You can do it in `./getTestingData.js`. Here is an example:

`src/ui/anAdvancedTemplate/getTestingData.js`:
```javascript
export default ({
  actionResults,
  actions
} = {
  actionResults: {
    parseUrlQueryParams: {}
  }
}) => ({
  dateTimeWhenLastClicked: actionResults.parseUrlQueryParams.dateTime,
  label: 'Click me',
  onClick: () => {
    actions.setUrlQueryParam({
      name: 'dateTime',
      value: new Date()
    })
    actions.reload()
  }
})
```

The exported function passes `actionResults` (snapshot of the app store) and `actions` (commands). A transformed body of this function will be inserted in [GlueCodes IDE's](https://www.glue.codes) component declaration. Hence, there are several rules to follow:

- Don't declare variables outside the function as they will be stripped out when inserting in the [IDE](https://www.glue.codes)
- If the data your component needs, might be useful by other component(s) or app slots, create a [provider](https://github.com/gluecodes/gluecodes-fruits/blob/master/providers.md)
- Handle events, by calling a command. If it doesn't exist, create one. When installing your component, commands and providers will be generated and the user will be abe to enjoy your well structured logic.
- Use a commonly acceptable language.
- Note that the function have a default object assigned against the deconstructed `actionResults` and `actions`. This is because `./getTestingData` is also used by prerenders which don't have access to the browser environment i.e. JavaScript, DOM etc. Hence, in prerenders, `./getTestingData` is called without any args and the defaults emulate the simplest shape of the store to avoid reference errors.

