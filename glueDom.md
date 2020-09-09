## GlueDOM

Makes non-trivial UI components easy to read and maintain.

- gradual learning curve, no need to learn another templating syntax (directives etc.)
- reads sequentially as HTML while remaining readable and maintainable
- isn't a mix of HTML and JavaScript drawing a clear border between view and logic
- allows to format texts without writing nested inline tags
- makes writing dynamic texts easier with no need for checking whether variables are non-empty
- provides an intuitive way to reference generated DOM elements e.g. to `.focus()`
- is made to facilitate reusing existing libs and APIs
	- integration with third-party libs to enhance generated DOM, e.g. to use Google ReCaptcha or jQuery plugins
	- creating links for SPA websites
	
### Syntax 

Nesting

```
tag(tagName, (props, { component, tag, text }) => { 
  tag(tagName, (props, { component, tag, text }) => { 
    tag(tagName, (props, { component, tag, text }) => { 
      ...
    })
  })
})
```

No child elements

```
tag(tagName, {
  [props]
})
```

No child elements nor props/attributes
```
tag(tagName)
```

Components

```
component(reusableUiPiece, props)
```

Text

```
text(...[textChunk,])
```

- `tagName` A string that specifies the type of element to be created 
- `props` An object to assign element props/attributes
- `component` A function to render component
- `tag` A function to create an element
- `text` A function to create text
- `reusableUiPiece` A function returning reusable virtual DOM
- `textChunk` Either a string or an object which uses text formatters (see below). If any chunk is empty, the whole sentence won't be rendered
