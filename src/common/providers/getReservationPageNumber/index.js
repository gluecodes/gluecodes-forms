export default (actionResults) => {
  if (actionResults.requestReservationPage === 4) {
    return 4
  }

  if (actionResults.requestReservationPage < actionResults.getReservationPageNumber) {
    return actionResults.requestReservationPage
  }

  if (!actionResults.changeReservationDate || !actionResults.changeReservationDate.day) {
    return 1
  }

  if (actionResults.changeReservationDate) {
    if (actionResults.changeReservationDate.day && !actionResults.changeReservationDate.hours) {
      if (actionResults.requestReservationPage === 2) {
        return 2
      }

      return actionResults.getReservationPageNumber
    }

    if (actionResults.requestReservationPage === 3) {
      return 3
    }

    return actionResults.getReservationPageNumber
  }
}
