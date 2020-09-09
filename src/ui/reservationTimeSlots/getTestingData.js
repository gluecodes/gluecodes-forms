export default () => ({
  availableTimeSlots: Array(11).fill(9).map((startTime, index) => (startTime + index)).map((hours, index) => {
    const minutes = index % 0 ? 15 : 30
    return {
      name: `${hours.toString().padStart(2, 0)}:${minutes}`,
      hours,
      minutes
    }
  }),
  summary: 'Dinner times available for 2 people on 22 February 2020',
  onPartOfDayChanged: (id) => { console.log('selected part of day:', id) },
  onTimeSlotChanged: (timeSlot) => { console.log('selected time:', timeSlot) },
  selectedTimeSlot: { hours: 9, minutes: 30 },
  selectedPartOfDay: 'lunch',
  timeOfDayChoice: {
    explanationText: '1. Select a dining time:',
    options: [
      {
        id: 'breakfast',
        name: 'breakfast'
      },
      {
        id: 'lunch',
        name: 'lunch'
      },
      {
        id: 'dinner',
        name: 'dinner'
      }]
  }
})
