import '@app/providers/getReservationDefaultService'

export default (actionResults) => {
  console.log('filter service qty by:', actionResults.changeReservationService || actionResults.getReservationDefaultService)

  return [
    {
      name: '1 person',
      id: '1'
    },
    {
      name: '2 people',
      id: '2'
    },
    {
      name: '3 people',
      id: '3'
    },
    {
      name: '4 people',
      id: '4'
    }
  ]
}
