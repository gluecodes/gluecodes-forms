import '@app/providers/getReservationPageNumber'

export default actionResults => {
  if (!actionResults.changeReservationDate || actionResults.getReservationPageNumber < 4) {
    return ''
  }

  const selectedDate = new Date(actionResults.changeReservationDate.year, actionResults.changeReservationDate.month, actionResults.changeReservationDate.day)
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  const selectedTime = `${actionResults.changeReservationDate.hours.toString().padStart(2, 0)}:${actionResults.changeReservationDate.minutes.toString().padStart(2, 0)}`

  return `Thank you for your booking! Your reservation is confirmed on ${selectedDate} at ${selectedTime}`
}
