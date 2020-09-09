import '@app/providers/getReservationDefaultService'
import '@app/providers/getReservationDefaultServiceQty'

export default (actionResults) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()

  console.log(
    'filtering disabled days by:',
    actionResults.changeReservationService || actionResults.getReservationDefaultService,
    actionResults.changeReservationServiceQty || actionResults.getReservationDefaultServiceQty
  )

  return Array(3).fill(0).map((...[, index]) => {
    const nextDate = new Date(year, month, day + index + 5)

    return {
      day: nextDate.getDate(),
      month: nextDate.getMonth(),
      year: nextDate.getFullYear()
    }
  })
}
