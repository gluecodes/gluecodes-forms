export default (actionResults) => {
  if (actionResults.getReservationContactFormRegistry) {
    return actionResults.getReservationContactFormRegistry
  }

  return {
    initialValuesCopy: undefined,
    inputDomNodes: {}
  }
}
