import '@app/providers/getReservationDefaultServiceQty'
import '@app/providers/getReservationServiceContentToDisplay'
import '@app/providers/getReservationServiceQtyOptions'

export default (actionResults) => {
  if (!actionResults.changeReservationDate) {
    return ''
  }

  const selectedQtyId = actionResults.changeReservationServiceQty || actionResults.getReservationDefaultServiceQty
  const selectedServiceName = actionResults.getReservationServiceContentToDisplay.name
  const selectedQtyName = actionResults.getReservationServiceQtyOptions.find(({ id }) => id === selectedQtyId).name
  const selectedDate = new Date(
    actionResults.changeReservationDate.year,
    actionResults.changeReservationDate.month,
    actionResults.changeReservationDate.day
  )
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  return `${selectedServiceName} times available for ${selectedQtyName} on ${selectedDate}`
}
