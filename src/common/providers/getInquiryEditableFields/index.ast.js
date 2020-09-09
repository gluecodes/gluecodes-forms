import { generators } from '@gluecodes/components'

import '@app/providers/getContactFormModels'

export default ({
  appImports,
  identifiers
}) => generators.modelFieldListProvider({
  appImports,
  modelName: 'inquiry',
  modelsProviderName: identifiers.getContactFormModels
})
