import { generators } from '@gluecodes/components'

import '@app/providers/getReservationContactFormModels'

export default ({
  appImports,
  identifiers
}) => generators.modelFieldListProvider({
  appImports,
  modelName: 'reservationInquiry',
  modelsProviderName: identifiers.getReservationContactFormModels
})
