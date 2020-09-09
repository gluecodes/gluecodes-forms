import '@app/providers/getReservationAvailableServices'
import '@app/providers/getReservationDefaultService'
import '@app/providers/getReservationDefaultServiceQty'
import '@app/providers/getReservationServiceQtyOptions'

export default (actionResults) => {
  const selectedServiceId = actionResults.changeReservationService || actionResults.getReservationDefaultService
  const selectedQtyId = actionResults.changeReservationServiceQty || actionResults.getReservationDefaultServiceQty
  const selectedService = actionResults.getReservationAvailableServices.find(({
    id
  }) => id === selectedServiceId)
  return {
    name: selectedService.name,
    qty: actionResults.getReservationServiceQtyOptions.find(({
      id
    }) => id === selectedQtyId).name,
    summary: selectedService.summary,
    fullDescription: selectedService.fullDescription,
    image: selectedService.image
  }
}
