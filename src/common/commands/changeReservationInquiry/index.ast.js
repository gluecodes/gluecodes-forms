import { generators } from '@gluecodes/components'
import capitalizeString from '../../../lib/helpers/capitalizeString'
import models from '../../providers/getReservationContactFormModels/models.json'

import '@app/reusableFunctions/validateEmail'
import '@app/reusableFunctions/validateFullName'
import '@app/reusableFunctions/validatePhoneNumber'

export default ({ appImports }) => {
  const reservationInquiry = models.find(({ name }) => (name === 'reservationInquiry'))

  return generators.modelUpdater({
    appImports,
    errorMessage: reservationInquiry.errorMessage,
    errorName: 'InvalidReservationInquiryError',
    modelName: reservationInquiry.name,
    provideValidation: ({
      condition,
      fieldName,
      provideFieldValidator
    }) => {
      switch (fieldName) {
        case 'name': {
          provideFieldValidator('validateFullName')
          break
        }
        case 'email': {
          provideFieldValidator('validateEmail')
          break
        }
        case 'phone': {
          provideFieldValidator('validatePhoneNumber')
          break
        }
        case 'message': {
          condition({
            type: 'BooleanLiteral',
            value: false
          })
          break
        }
      }
    },
    sourceObjects: Object.keys(reservationInquiry.properties).reduce((acc, fieldName) => [
      ...acc,
      {
        type: 'input',
        result: {
          modelName: reservationInquiry.name,
          errorMessage: reservationInquiry.properties[fieldName].errorMessage,
          errorName: `InvalidReservationInquiry${capitalizeString(fieldName)}Error`,
          fieldName
        }
      }
    ], [])
  })
}
