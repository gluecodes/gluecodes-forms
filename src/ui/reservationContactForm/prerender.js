import getTestingData from './getTestingData'
import * as layouts from './layouts'
import models from '../../common/providers/getReservationContactFormModels/models.json'

export default ({
  actionResults,
  getSlot,
  shouldShowLabels
} = getTestingData()) => getSlot({ name: 'baseForm' })({
  actionResults,
  choicePromptText: `${actionResults.getReservationContactFormCopy['please select']}...`,
  getSlot,
  layout: layouts.form(),
  model: models.find(({ name }) => (name === 'reservationInquiry')),
  shouldShowLabels,
  submitTitle: actionResults.getReservationContactFormCopy.book
})
