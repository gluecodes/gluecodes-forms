import { generators } from '@gluecodes/components'
import models from '../getContactFormModels/models.json'

export default ({
  appImports,
  identifiers
}) => (
  generators.errorMessagesProvider({
    appImports,
    errorMessages: models.reduce((topLevelAcc, model) => [
      ...topLevelAcc,
      ...Object.keys(model.properties).reduce((acc, fieldName) => [
        ...acc,
        ...(typeof model.properties[fieldName].errorMessage === 'string' ? [
          model.properties[fieldName].errorMessage
        ] : [])
      ], []),
      model.errorMessage
    ], []),
    identifiers
  })
)
