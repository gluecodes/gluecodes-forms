## Run together

Commands write to the store and then perform rerendering. Often you want to handle a user-triggered event by calling multiple commands. E.g. to persist some data and then reload all providers. To avoid unnecessary rerenders, you can use a built-in `runTogether()` command. Here is the syntax:

```javascript
await actions.runTogether([
  ['command1', { prop1: 'val1', prop2: 'val2' }], // a command with props as a single object argument
  ['command2', 'arg1', 'arg2'], // a command with multiple arguments
  ['reload'] // no args, will call built-in reload command
])
```

which would replace:

```javascript
await actions.command1({ prop1: 'val1', prop2: 'val2' })
await actions.command2('arg1', 'arg2')
actions.reload()
```
