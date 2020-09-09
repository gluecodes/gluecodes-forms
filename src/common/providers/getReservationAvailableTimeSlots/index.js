import '@app/providers/getReservationDefaultPartOfDay'
import '@app/providers/getReservationDefaultService'
import '@app/providers/getReservationDefaultServiceQty'

export default (actionResults) => {
  const timeSlots = [
    { name: '09:30', hours: 9, minutes: 30 },
    { name: '10:30', hours: 10, minutes: 30 },
    { name: '11:30', hours: 11, minutes: 30 },
    { name: '12:30', hours: 12, minutes: 30 },
    { name: '13:30', hours: 13, minutes: 30 },
    { name: '14:30', hours: 14, minutes: 30 },
    { name: '15:30', hours: 15, minutes: 30 },
    { name: '16:30', hours: 16, minutes: 30 },
    { name: '17:30', hours: 17, minutes: 30 },
    { name: '18:30', hours: 18, minutes: 30 },
    { name: '19:30', hours: 19, minutes: 30 }
  ]

  const selectedPartOfDay = actionResults.changeReservationPartOfDay || actionResults.getReservationDefaultPartOfDay.id

  console.log(
    'filtering available time slots by:',
    actionResults.changeReservationService || actionResults.getReservationDefaultService,
    actionResults.changeReservationServiceQty || actionResults.getReservationDefaultServiceQty
  )

  if (selectedPartOfDay === 'breakfast') {
    return timeSlots.filter(({ hours }) => hours < 12)
  }

  if (selectedPartOfDay === 'lunch') {
    return timeSlots.filter(({ hours }) => hours >= 12 && hours < 16)
  }

  if (selectedPartOfDay === 'dinner') {
    return timeSlots.filter(({ hours }) => hours >= 16)
  }

  return []
}
