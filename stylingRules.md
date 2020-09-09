## Styling rules

Here is a few rules to follow when styling your components:

- You should avoid using IDs or make sure they are unique across whole page.
- Don't rely on jQuery, whenever possible, use pure CSS.
- Components should utilise Bootstrap as much as possible.
- Use camel-case CSS class names, referencing the imported `./style.css`. This not only will scope your CSS but when a class is added to `customizableClasses.json`, it'll inject an override supplied from the "outside world".
- Keep the class names simple and descriptive in context of your component.
- Use media queries and breakpoints recommended by [Bootstrap](https://getbootstrap.com/docs/4.0/layout/overview/).
