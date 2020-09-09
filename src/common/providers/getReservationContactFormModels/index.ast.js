import { generators } from '@gluecodes/components'
import models from './models.json'

import '@app/providers/getPersonPossibleTitles'

export default ({
  appImports,
  identifiers
}) => generators.modelsProvider({
  appImports,
  models,
  overrideField: ({ ast, fieldName, modelName }) => {
    if (modelName === 'reservationInquiry' && fieldName === 'title') {
      return {
        ...ast,
        value: {
          ...ast.value,
          properties: [
            ...ast.value.properties.filter(node => node.key.name !== 'oneOf'),
            {
              ...ast.value.properties.find(node => node.key.name === 'oneOf'),
              value: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'ObjectProperty',
                    key: {
                      type: 'Identifier',
                      name: 'type'
                    },
                    computed: false,
                    value: {
                      type: 'StringLiteral',
                      value: 'dictionary'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  },
                  {
                    type: 'ObjectProperty',
                    key: {
                      type: 'Identifier',
                      name: 'items'
                    },
                    computed: false,
                    value: {
                      type: 'MemberExpression',
                      computed: false,
                      object: {
                        type: 'Identifier',
                        name: 'actionResults'
                      },
                      property: {
                        type: 'Identifier',
                        name: identifiers.getPersonPossibleTitles
                      }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }
})
