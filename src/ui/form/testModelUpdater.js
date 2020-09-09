class InvalidInquiryError extends Error {
  constructor ({
    message,
    inputErrors
  }) {
    super(message)
    this.name = 'InvalidInquiryError'
    this.due = inputErrors
  }
}

class InvalidInquiryTitleError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryTitleError'
  }
}

class InvalidInquiryNameError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryNameError'
  }
}

class InvalidInquiryEmailError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryEmailError'
  }
}

class InvalidInquirySubjectError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquirySubjectError'
  }
}

class InvalidInquiryMessageError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryMessageError'
  }
}

class InvalidInquiryFavoriteDrinkError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryFavoriteDrinkError'
  }
}

class InvalidInquiryMarketingOptionsError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryMarketingOptionsError'
  }
}

class InvalidInquiryPhotoError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryPhotoError'
  }
}

class InvalidInquirySubscribeError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquirySubscribeError'
  }
}

class InvalidInquiryCustomInputError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidInquiryCustomInputError'
  }
}

const validateModel = ({
  changedData,
  errorMessages
}) => Object.keys(changedData).reduce((errors, fieldName) => {
  switch (fieldName) {
    case 'title':
      if (changedData[fieldName] !== null && !changedData[fieldName]) {
        errors.push(new InvalidInquiryTitleError(errorMessages['Title is required']))
      }

      break
    case 'name':
      if (!/^[A-Za-z]{2,}[A-Za-z\s]*$/.test(changedData[fieldName] || '')) {
        errors.push(new InvalidInquiryNameError(errorMessages['Name must be at least two character long']))
      }

      break
    case 'email':
      if (!/^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*).([A-Za-z]{2,})$/.test(changedData[fieldName] || '')) {
        errors.push(new InvalidInquiryEmailError(errorMessages['Please provide a valid email address']))
      }

      break
    case 'subject':
      if (!/^[\w\s-]{5,}[A-Za-z\s]*$/.test(changedData[fieldName] || '')) {
        errors.push(new InvalidInquirySubjectError(errorMessages['Subject must be at least five character long']))
      }

      break
    case 'message':
      if (!/^[\w\s-.?!,]{10,}$/.test(changedData[fieldName] || '')) {
        errors.push(new InvalidInquiryMessageError(errorMessages['Message must be at least ten character long']))
      }

      break
    case 'marketingOptions':
      if (!changedData[fieldName] || (changedData[fieldName].length < 1 || changedData[fieldName].length > 2)) {
        errors.push(new InvalidInquiryMarketingOptionsError(errorMessages['Please choose at least one option but no more than 2']))
      }

      break
    case 'favoriteDrink':
      if (changedData[fieldName] !== '' && !changedData[fieldName]) {
        errors.push(new InvalidInquiryFavoriteDrinkError(errorMessages['Please choose your favorite drink']))
      }

      break
    case 'photo':
      if (changedData[fieldName] !== null &&
        (Array.from(changedData[fieldName]).some((file) => file.type !== 'image/jpeg') || changedData[fieldName].length < 1 || changedData[fieldName].length > 2)) {
        errors.push(new InvalidInquiryPhotoError(errorMessages['Please upload one or max two photos in .jpg format']))
      }

      break
    case 'subscribe':
      if (!changedData[fieldName]) {
        errors.push(new InvalidInquirySubscribeError(errorMessages['You must agree to subscribe']))
      }

      break
    case 'customInput':
      if (changedData[fieldName] !== null && !/^\d+$/.test(changedData[fieldName])) {
        errors.push(new InvalidInquiryCustomInputError(errorMessages['Value must be a number']))
      }

      break

    default:
  }

  return errors
}, [])

export default ({
  caller,
  changedData = {},
  existingData,
  errorMessages,
  inputErrors = [],
  reset = false
}) => {
  if (reset) {
    return {
      ...existingData,
      ...changedData
    }
  }

  const errors = [
    ...inputErrors,
    ...validateModel({
      changedData,
      errorMessages
    })
  ]

  if (caller === 'commandTrigger') {
    if (errors.length > 0) {
      throw new InvalidInquiryError({
        message: errorMessages['Invalid inquiry, please correct highlighted fields'],
        inputErrors: errors
      })
    }
  } else {
    for (const error of errors) {
      throw error
    }
  }

  return {
    ...existingData,
    ...changedData
  }
}
