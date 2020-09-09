export default () => ({
  getSlot: ({ id, content }) => {
    switch (id) {
      case 'paragraph': {
        return tag => tag('p', (props, { tag }) => {
          tag('blockquote', (props, { text }) => {
            text(content)
          })
        })
      }
      default: {
        return () => null
      }
    }
  },
  paragraph1Text: 'Some paragraph 1',
  paragraph2Text: 'Some paragraph 2'
})
