import { generators } from '@gluecodes/components'
import capitalizeString from '../../../lib/helpers/capitalizeString'
import models from '../../providers/getContactFormModels/models.json'

import '@app/reusableFunctions/validateEmail'
import '@app/reusableFunctions/validateFullName'

export default ({ appImports }) => {
  const inquiry = models.find(({ name }) => (name === 'inquiry'))

  return generators.modelUpdater({
    appImports,
    errorMessage: inquiry.errorMessage,
    errorName: 'InvalidInquiryError',
    modelName: inquiry.name,
    provideValidation: ({
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
      }
    },
    sourceObjects: Object.keys(inquiry.properties).reduce((acc, fieldName) => [
      ...acc,
      {
        type: 'input',
        result: {
          modelName: inquiry.name,
          errorMessage: inquiry.properties[fieldName].errorMessage,
          errorName: `InvalidInquiry${capitalizeString(fieldName)}Error`,
          fieldName
        }
      }
    ], [])
  })
}
