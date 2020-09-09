export default (actionResults) => {
  if (actionResults.getContactFormRegistry) {
    return actionResults.getContactFormRegistry
  }

  return {
    initialValuesCopy: undefined,
    inputDomNodes: {}
  }
}
