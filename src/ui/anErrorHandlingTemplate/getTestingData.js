export default ({
  actionResults,
  actions
}) => ({
  cancelPotentialError: () => actions.cancelError({ errorName: 'InvalidPageSearchTermError' }),
  onSearchTermChanged: actions.setPageSearchTerm,
  onSearchSubmitted: actions.submitPageSearch,
  potentialError: actionResults.errors.InvalidPageSearchTermError,
  searchTerm: actionResults.setPageSearchTerm || '',
  submittedSearchTerm: actionResults.submitPageSearch
})
