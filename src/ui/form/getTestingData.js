import testModelUpdater from './testModelUpdater'

const testLayout = [
  [
    {
      property: 'title',
      width: 'col-md-2'
    }
  ],
  [
    {
      property: 'name',
      width: 'col-md-6'
    },
    {
      property: 'email',
      width: 'col-md-6',
      placeholder: 'some.name@company.com'
    }
  ],
  [
    {
      property: 'subject'
    }
  ],
  [
    {
      property: 'message',
      placeholder: 'Message'
    }
  ],
  [
    {
      property: 'favoriteDrink',
      width: 'col-md-6',
      inputElement: 'radio'
    }
  ],
  [
    {
      property: 'marketingOptions'
    }
  ],
  [
    {
      property: 'photo',
      dependsOn: record => record.favoriteDrink === 'spirits'
    }
  ],
  [
    {
      property: 'subscribe'
    }
  ],
  [
    {
      property: 'customInput',
      customUiControl: 'customUiControl',
      placeholder: 'Custom UI',
      title: 'Custom UI'
    }
  ],
  [
    {
      element: 'hr'
    }
  ]
]

const testModel = {
  type: 'gc-model',
  name: 'inquiry',
  errorMessage: 'Invalid inquiry, please correct highlighted fields',
  properties: {
    title: {
      type: 'string',
      title: 'Title',
      oneOf: {
        type: 'dictionary',
        items: {
          mr: 'Mr',
          ms: 'Ms'
        }
      },
      errorMessage: 'Title is required'
    },
    name: {
      type: 'string',
      title: 'Name',
      errorMessage: 'Name must be at least two character long'
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
      errorMessage: 'Please provide a valid email address'
    },
    subject: {
      type: 'string',
      title: 'Subject',
      errorMessage: 'Subject must be at least five character long'
    },
    message: {
      type: 'string',
      format: 'text',
      title: 'Message',
      errorMessage: 'Message must be at least ten character long'
    },
    favoriteDrink: {
      type: 'string',
      title: 'Favorite drink',
      oneOf: {
        type: 'dictionary',
        items: {
          coffee: 'Coffee',
          tee: 'Tee',
          beer: 'Beer',
          spirits: 'Spirits'
        }
      },
      errorMessage: 'Please choose your favorite drink'
    },
    marketingOptions: {
      type: 'array',
      title: 'How to contact you?',
      anyOf: {
        type: 'dictionary',
        items: {
          email: 'Email',
          sms: 'SMS',
          phone: 'Phone'
        }
      },
      errorMessage: 'Please choose at least one option but no more than 2'
    },
    photo: {
      type: 'file-list',
      allowMultipleFiles: true,
      title: 'Photo',
      errorMessage: 'Please upload one or max two photos in .jpg format'
    },
    subscribe: {
      type: 'boolean',
      title: 'Subscribe',
      errorMessage: 'You must agree to subscribe'
    },
    customInput: {
      type: 'string',
      title: 'Custom Input',
      errorMessage: 'Value must be a number'
    }
  }
}

export const testStore = {
  errors: {},
  getInquiry: {
    title: 'ms',
    name: 'Some Name',
    email: 'hello@glue.codes',
    subject: 'Some subject',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ducimus officiis quod! Aperiam eveniet nam nostrum odit quasi ullam voluptatum.',
    favoriteDrink: 'beer',
    marketingOptions: ['email', 'sms'],
    subscribe: true,
    customInput: 123
  },
  getInquiryEditableFields: Object.keys(testModel.properties)
}

export const testCommands = {
  changeInquiry: testModelUpdater,
  submitInquiry: async (data) => {
    console.log('submitting inquiry:', data)
  }
}

export default ({
  actionResults,
  actions,
  choicePromptText,
  isCalledByPrerender,
  resetTitle,
  shouldAllowAutoCompletion,
  shouldShowLabels,
  submitTitle
} = {
  actionResults: testStore,
  choicePromptText: 'please select...',
  isCalledByPrerender: true,
  resetTitle: 'reset',
  shouldAllowAutoCompletion: true,
  shouldShowLabels: true,
  shouldShowResetButton: true,
  submitTitle: 'submit'
}) => ({
  actionResults,
  actions,
  choicePromptText,
  errorMessages: Object.keys(testModel.properties).reduce((acc, fieldName) => ({
    ...acc,
    [testModel.properties[fieldName].errorMessage]: testModel.properties[fieldName].errorMessage
  }), { [testModel.errorMessage]: testModel.errorMessage }),
  getSlot: (selector) => {
    switch (selector.name) {
      case 'hr': {
        return tag => tag('hr') // this would be a component
      }
      case 'customUiControl': {
        const { // these are passed for customUiControl
          cancelError,
          getErrorMessage,
          hasActiveError,
          placeholder,
          title,
          updateValue,
          value
        } = selector

        return tag => tag('div', (props, { tag }) => {
          tag('label', (props, { text }) => {
            text(title)
          })
          tag('br')
          tag('input', {
            attributes: {
              ...(placeholder ? { placeholder } : {})
            },
            type: 'text',
            ...(isCalledByPrerender ? { value } : {}),
            'gc-onceDomNodeVisited': (node) => {
              if (['string', 'number'].includes(typeof value)) {
                node.value = value
              }
            },
            onkeyup: (e) => {
              if (hasActiveError()) {
                cancelError()
                updateValue(e.target.value)
              }
            },
            onchange: e => updateValue(e.target.value),
            onreset: (e) => { // this is how reset value
              e.target.value = e.initialValue
            }
          })
          tag('br')
          tag('span', (props, { text }) => {
            if (hasActiveError()) {
              text(getErrorMessage())
            }
          })
        })
      }
      /* case 'resetButton': {
        const { resetForm } = selector

        return tag => tag('a', (props, { text }) => {
          props.href = '#'
          props.onclick = (e) => {
            e.preventDefault()
            resetForm(e)
          }
          text('Reset form')
        })
      }
      case 'submitButton': {
        const { submitForm } = selector

        return tag => tag('a', (props, { text }) => {
          props.href = '#'
          props.onclick = (e) => {
            e.preventDefault()
            submitForm(e)
          }
          text('Submit form')
        })
      } */
      default: {
        return null
      }
    }
  },
  layout: testLayout,
  model: testModel,
  // redirect: global.location.href,
  // reload: true,
  resetTitle,
  shouldAllowAutoCompletion,
  shouldShowLabels,
  shouldShowResetButton: true,
  submitCommand: 'submitInquiry',
  submitTitle
})
