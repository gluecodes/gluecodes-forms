export const formatMappings = {
  date: 'date',
  'date-time': 'date-time-local',
  email: 'email',
  hostname: 'text',
  ipv4: 'text',
  ipv6: 'text',
  number: 'number',
  password: 'password',
  range: 'range',
  text: 'textarea',
  time: 'time',
  uri: 'url'
}

export const rewriteInputType = (type) => {
  if (type === 'file-list') {
    return 'file'
  }

  if (type === 'string') {
    return 'text'
  }

  return type
}

export const capitalizeString = string => (string && string[0].toUpperCase() + string.slice(1))

export const isInputStringBased = (
  column,
  model
) => (
  column.property && ['date', 'number', 'string'].includes(model.properties[column.property].type) &&
  !model.properties[column.property].oneOf &&
  !model.properties[column.property].anyOf
)

export const isInputText = (
  column,
  model
) => (
  column.property && model.properties[column.property].type === 'string' &&
  model.properties[column.property].format === 'text'
)

export const isInputFileList = (
  column,
  model
) => (
  column.property && model.properties[column.property].type === 'file-list'
)

export const isInputDropdown = (
  column,
  model
) => (
  column.property &&
  (!column.inputElement || column.inputElement === 'select') &&
  model.properties[column.property].oneOf &&
  model.properties[column.property].oneOf.type === 'dictionary'
)

export const isInputRadioChoice = (
  column,
  model
) => (
  column.property &&
  column.inputElement === 'radio' &&
  model.properties[column.property].oneOf &&
  model.properties[column.property].oneOf.type === 'dictionary'
)

export const isInputSingleCheckbox = (
  column,
  model
) => (
  column.property && model.properties[column.property].type === 'boolean'
)

export const isInputMultiCheckboxChoice = (
  column,
  model
) => (
  column.property &&
  model.properties[column.property].anyOf &&
  model.properties[column.property].anyOf.type === 'dictionary'
)

export const isCustomUiControl = (
  column
) => (
  column.property && column.customUiControl
)

export const getInputErrorMessage = (
  column,
  errors,
  model
) => {
  const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`
  const isFieldInvalid = errors[errorName] && !errors[errorName].isCancelled

  if (isFieldInvalid) {
    return errors[errorName].message
  }

  return null
}

export const getSlotNormalizer = renderer => slotResult => (
  typeof slotResult === 'function' ? slotResult(renderer) : slotResult
)
