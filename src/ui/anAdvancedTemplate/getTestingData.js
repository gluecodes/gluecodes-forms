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
