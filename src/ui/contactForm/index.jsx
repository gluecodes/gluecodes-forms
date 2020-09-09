import * as layouts from './layouts'

import '@app/commands/changeInquiry'
import '@app/commands/submitInquiry'
import '@app/providers/getContactFormCopy'
import '@app/providers/getContactFormErrorMessages'
import '@app/providers/getContactFormModels'
import '@app/providers/getContactFormRegistry'
import '@app/providers/getInquiryEditableFields'
import '@app/providers/getPersonPossibleTitles'

export default ({
  actionResults,
  actions,
  getSlot = () => null,
  model,
  shouldShowLabels = false
}) => {
  const layout = layouts.form()
  const { baseForm } = getSlot({ name: 'baseForm' })

  return baseForm({
    actionResults,
    actions,
    choicePromptText: `${actionResults.getContactFormCopy['please select']}...`,
    errorMessages: actionResults.getContactFormErrorMessages,
    getSlot: (selector) => {
      switch (selector.name) {
        case 'captcha': {
          return getSlot(selector)
        }
        default: {
          return null
        }
      }
    },
    layout,
    model,
    resetTitle: actionResults.getContactFormCopy.reset,
    shouldShowLabels,
    submitCommand: 'submitInquiry',
    submitTitle: actionResults.getContactFormCopy.send
  })
}
