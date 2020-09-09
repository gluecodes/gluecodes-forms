## Providers

Provider is an action executed prior rendering which provide initial data. Providers pipe through a snapshot of a single app store. They write to the store by returning/resolving and their results are accessible by their names. Similarly, commands write to the store and their results are also accessible in providers. Providers neeed to be called in a particular order. Here is how to set their execution order:

```javascript
import '@app/providers/getTodos'
import '@app/providers/parseUrlQueryParams'

export default async actionResults => (
  actionResults.getTodos
    .filter(todo => (
      !actionResults.parseUrlQueryParams.filter ||
      (actionResults.parseUrlQueryParams.filter === 'active' && todo.isActive) ||
      (actionResults.parseUrlQueryParams.filter === 'completed' && !todo.isActive)
    ))
)
```

This example provider will be executed after `getTodos` and `parseUrlQueryParams`. Note `import '@app/providers/getTodos'` which is a way to tell what your provider needs before it's executed.

Avoid having too much logic in your providers. To prevent from coupling, reusable functions have been introduced. They may serve a purpose of service or model layer. See how you'd use one:

```javascript
export { getTodos as default } from '@app/reusableFunctions'
```

That's the neatest shape your provider may become, just reexport a reusable function which accesses persisting app layer. However, often you may need adapt the provider data to reusable function props or have some flow control. Here is an example:

```javascript
import { getTodos } from '@app/reusableFunctions'

export default async () => {
  const todos = await getTodos()
  
  // some logic
  
  return todos
}
```

You may also use reusable functions in commands, exactly the same as in providers.

Commands, providers and reusable functions can be found in: `src/common`. If you're missing an app-wide action your component would benefit from, write your own. Remember about app-wide naming and keeping it generic so someone else can reuse it. 
