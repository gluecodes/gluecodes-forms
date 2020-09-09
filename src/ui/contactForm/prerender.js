import * as layouts from './layouts'
import getTestingData from './getTestingData'

export default ({
  actionResults,
  getSlot,
  model,
  shouldShowLabels
} = getTestingData()) => getSlot({ name: 'baseForm' })({
  actionResults,
  choicePromptText: `${actionResults.getContactFormCopy['please select']}...`,
  getSlot,
  layout: layouts.form(),
  model: model,
  resetTitle: actionResults.getContactFormCopy.reset,
  shouldShowLabels,
  submitTitle: actionResults.getContactFormCopy.send
})
