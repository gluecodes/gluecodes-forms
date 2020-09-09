import * as layouts from './layouts'

import '@app/commands/changeReservationInquiry'
import '@app/commands/submitReservationInquiry'
import '@app/providers/getReservationErrorMessages'
import '@app/providers/getPersonPossibleTitles'
import '@app/providers/getReservationContactFormCopy'
import '@app/providers/getReservationContactFormModels'
import '@app/providers/getReservationContactFormRegistry'
import '@app/providers/getReservationInquiryEditableFields'

const formatReservationDate = (reservationDateTime) => {
  const date = new Date(reservationDateTime.year, reservationDateTime.month, reservationDateTime.day, reservationDateTime.hours, reservationDateTime.minutes)
  return `${date.getDate().toString().padStart(2, 0)}/${(date.getMonth() + 1).toString().padStart(2, 0)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export default ({
  actionResults,
  actions,
  getSlot = () => null,
  model,
  reservationDateTime,
  shouldShowLabels = false,
  selectedServiceId,
  selectedServiceQtyId,
  shouldShowAlert = false
}) => {
  const layout = layouts.form()
  const { baseForm } = getSlot({ name: 'baseForm' })

  if (actionResults.changeReservationInquiry) {
    actionResults.changeReservationInquiry.reservationDateTime = reservationDateTime
    actionResults.changeReservationInquiry.serviceId = selectedServiceId
    actionResults.changeReservationInquiry.serviceQtyId = selectedServiceQtyId
    Object.keys(actionResults.changeReservationInquiry).forEach((fieldName) => {
      actionResults.getReservationInquiry[fieldName] = actionResults.changeReservationInquiry[fieldName]
    })
  }

  return baseForm({
    actionResults,
    actions,
    choicePromptText: `${actionResults.getReservationContactFormCopy['please select']}...`,
    errorMessages: actionResults.getReservationErrorMessages,
    getSlot: (selector) => {
      switch (selector.name) {
        case 'reservationDateTime': {
          return (
            <p>Booking time: {formatReservationDate((reservationDateTime))}</p>
          )
        }
        default: {
          return getSlot(selector)
        }
      }
    },
    layout,
    model,
    shouldShowLabels,
    shouldShowResetButton: false,
    submitCommand: 'submitReservationInquiry',
    submitTitle: actionResults.getReservationContactFormCopy.book,
    shouldShowAlert
  })
}
