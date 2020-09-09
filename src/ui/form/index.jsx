import glueDomRenderer from '../../init/glueDomRenderer'
import styles from './styles.css'

import {
  capitalizeString,
  formatMappings,
  getInputErrorMessage,
  isCustomUiControl,
  isInputDropdown,
  isInputMultiCheckboxChoice,
  isInputFileList,
  isInputRadioChoice,
  isInputSingleCheckbox,
  isInputStringBased,
  isInputText,
  rewriteInputType,
  getSlotNormalizer
} from './logic'

import externalStyles from '@app/styles'

class ExternalFormError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'ExternalFormError'
  }
}

const normalizeSlot = getSlotNormalizer(glueDomRenderer)

export default registry => ({
  actionResults,
  actions,
  choicePromptText = 'please select...',
  errorMessages,
  getSlot = () => null,
  layout,
  model,
  onSubmissionFailed = () => {},
  redirect,
  reload = false,
  resetTitle = 'reset',
  shouldAllowAutoCompletion = true,
  shouldShowAlert = true,
  shouldShowLabels = true,
  shouldShowResetButton = true,
  submissionErrors = [],
  submitCommand,
  submitTitle = 'submit'
}) => {
  const modelUpdaterName = `change${capitalizeString(model.name)}`
  const modelUpdaterResultName = `change${capitalizeString(model.name)}`
  const modelProviderResultName = `get${capitalizeString(model.name)}`
  const modelFieldListProviderResultName = `get${capitalizeString(model.name)}EditableFields`

  actionResults[modelUpdaterResultName] = actionResults[modelUpdaterResultName] || {}
  actionResults[modelProviderResultName] = actionResults[modelProviderResultName] || {}

  if (typeof registry.initialValuesCopy === 'undefined') {
    registry.initialValuesCopy = JSON.parse(JSON.stringify(
      actionResults[modelFieldListProviderResultName].reduce((acc, fieldName) => ({
        ...acc,
        [fieldName]: actionResults[modelProviderResultName][fieldName] || ''
      }), {})
    ))
  }

  const checkDependency = (
    handler
  ) => {
    if (handler) {
      const isUpdaterResultEmpty = Object.getOwnPropertyNames(actionResults[modelUpdaterResultName]).length === 0

      const record = isUpdaterResultEmpty ? actionResults[modelProviderResultName] : (actionResults[modelUpdaterResultName] || {})

      Object.assign(record, {
        submissionErrors: submissionErrors.reduce((acc, errorName) => ({
          ...acc,
          ...(actionResults.errors[errorName] ? { [errorName]: actionResults.errors[errorName] } : {})
        }), {})
      })

      return handler(record)
    }

    return true
  }

  const clearInputs = () => {
    registry.inputDomNodes[Object.keys(registry.inputDomNodes)[0]].focus()

    Object.keys(registry.inputDomNodes).forEach((fieldName) => {
      if (Array.isArray(registry.inputDomNodes[fieldName]) && registry.inputDomNodes[fieldName].some(node => (node.type === 'checkbox'))) { // checkbox multi-choice
        registry.inputDomNodes[fieldName].forEach((node) => {
          node.checked = registry.initialValuesCopy[fieldName] && registry.initialValuesCopy[fieldName].includes(node.value)
        })
      } else if (Array.isArray(registry.inputDomNodes[fieldName]) && registry.inputDomNodes[fieldName].some(node => (node.type === 'radio'))) { // radio choice
        registry.inputDomNodes[fieldName].forEach((node) => {
          node.checked = node.value === registry.initialValuesCopy[fieldName]
        })
      } else if (registry.inputDomNodes[fieldName].nodeName.toLowerCase() === 'select') { // dropdown
        registry.inputDomNodes[fieldName].value = registry.initialValuesCopy[fieldName]
      } else if (registry.inputDomNodes[fieldName].type === 'checkbox') { // single checkbox
        registry.inputDomNodes[fieldName].checked = registry.initialValuesCopy[fieldName]
      } else if (registry.inputDomNodes[fieldName].customUiControlSibling) {
        if (registry.inputDomNodes[fieldName].previousSibling) {
          const event = new Event('reset', { bubbles: false, cancelable: false })

          event.initialValue = registry.initialValuesCopy[fieldName]
          registry.inputDomNodes[fieldName].previousSibling.dispatchEvent(event)

          Array.from(registry.inputDomNodes[fieldName].previousSibling.querySelectorAll('input')).forEach((childNode) => {
            childNode.dispatchEvent(event)
          })
        }
      } else { // any other
        registry.inputDomNodes[fieldName].value = registry.initialValuesCopy[fieldName]
      }
    })
  }

  const handleSubmit = async () => {
    actions.cancelError({ errorName: `Invalid${capitalizeString(model.name)}Error` })

    const data = actionResults[modelFieldListProviderResultName].reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: [
        typeof actionResults[modelUpdaterResultName][fieldName] !== 'undefined' || actionResults[modelUpdaterResultName][fieldName] === null
          ? actionResults[modelUpdaterResultName][fieldName]
          : undefined,
        actionResults[modelProviderResultName][fieldName] ? actionResults[modelProviderResultName][fieldName] : undefined
      ].find(value => typeof value !== 'undefined') || null
    }), {})

    const validationSucceeded = !!actions[modelUpdaterName]({
      caller: 'commandTrigger',
      changedData: data,
      existingData: actionResults[modelUpdaterResultName],
      errorMessages,
      inputErrors: Object.keys(actionResults.errors)
        .map(name => actionResults.errors[name])
        .filter(error => (!error.isCancelled && (new RegExp(`^Invalid${capitalizeString(model.name)}`)).test(error.name)))
    })

    if (validationSucceeded) {
      await actions[submitCommand](data)

      const submissionError = submissionErrors.reduce((acc, errorName) => (
        actionResults.errors[errorName] ? actionResults.errors[errorName] : acc
      ), null)

      if (submissionError) {
        onSubmissionFailed({
          clearInputs,
          error: submissionError
        })
      } else if (redirect) {
        actions.redirect(redirect)
      } else if (reload) {
        actions.reload()
      }
      return true
    }
    return false
  }

  const handleReset = () => {
    const inputErrors = Object.keys(actionResults.errors)
      .map(name => actionResults.errors[name])
      .filter(error => !error.isCancelled)

    const data = actionResults[modelFieldListProviderResultName].reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: JSON.parse(JSON.stringify(registry.initialValuesCopy[fieldName] || null)) || null
    }), {})

    actions.cancelError({ errorName: `Invalid${capitalizeString(model.name)}Error` })

    inputErrors.forEach((error) => {
      actions.cancelError({ errorName: error.name })
    })

    actions[modelUpdaterName]({
      caller: 'commandTrigger',
      changedData: data,
      existingData: actionResults[modelUpdaterResultName],
      errorMessages,
      inputErrors,
      reset: true
    })

    clearInputs()
  }

  return (
    <form
      attributes={{
        autocomplete: shouldAllowAutoCompletion ? 'on' : 'off',
        enctype: 'multipart/form-data',
        novalidate: ''
      }}
      className={styles['font-weight-normal']}
      onsubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
      onreset={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleReset()
      }}>
      {
        (() => {
          const errorName = `Invalid${capitalizeString(model.name)}Error`

          const submissionError = submissionErrors.reduce((acc, errorName) => (
            actionResults.errors[errorName] ? actionResults.errors[errorName] : acc
          ), null)

          if (shouldShowAlert && actionResults.errors[errorName] && !actionResults.errors[errorName].isCancelled) {
            return (
              <div attributes={{ role: 'alert' }} className={`${externalStyles.alert} ${externalStyles['alert-danger']}`}>
                {actionResults.errors[errorName].message}
              </div>
            )
          }

          if (shouldShowAlert && actionResults.errors.ExternalFormError && !actionResults.errors.ExternalFormError.isCancelled) {
            return (
              <div attributes={{ role: 'alert' }} className={`${externalStyles.alert} ${externalStyles['alert-danger']}`}>
                {actionResults.errors.ExternalFormError.message}
              </div>
            )
          }

          if (shouldShowAlert && submissionError && !submissionError.isCancelled) {
            return (
              <div attributes={{ role: 'alert' }} className={`${externalStyles.alert} ${externalStyles['alert-danger']}`}>
                {submissionError.message}
              </div>
            )
          }

          return <div/>
        })()
      }
      <style>
        {`.${styles.checkGroup}~.${externalStyles['invalid-feedback']} {display: block}`}
      </style>
      {
        layout.map((row, rowIndex) => (
          <div className={externalStyles.row}>
            {
              row.map((column, columnIndex) => checkDependency(column.dependsOn) ? (
                <div className={column.width
                  ? column.width.split(' ').reduce((acc, className) => [...acc, externalStyles[className]], []).join(' ')
                  : externalStyles['col-md-12']}>
                  {
                    [
                      ...(!column.customUiControl && (isInputStringBased(column, model) || isInputFileList(column, model)) && !isInputText(column, model) ? [
                        <div className={styles['form-group']}>
                          {
                            shouldShowLabels ? <label>{model.properties[column.property].title}</label> : null
                          }
                          <input
                            attributes={{
                              ...(model.properties[column.property].type === 'file-list' && model.properties[column.property].allowMultipleFiles ? { multiple: '' } : {}),
                              ...(column.placeholder ? { placeholder: column.placeholder } : {})
                            }}
                            type={model.properties[column.property].format
                              ? formatMappings[model.properties[column.property].format]
                              : rewriteInputType(model.properties[column.property].type)}
                            name={column.inputName || column.property}
                            className={[
                              ...(getInputErrorMessage(column, actionResults.errors, model) ? [styles['is-invalid']] : []),
                              ...(model.properties[column.property].type === 'file-list' ? [styles['form-control-file']] : []),
                              ...(model.properties[column.property].format === 'range' ? [styles['form-control-range']] : []),
                              ...(model.properties[column.property].type !== 'file-list' && model.properties[column.property].format !== 'range' ? [styles['form-control']] : [])
                            ].join(' ')}
                            disabled={column.disabled || false}
                            gc-onceDomNodeVisited={(node) => {
                              if (['string', 'number'].includes(typeof actionResults[modelProviderResultName][column.property])) {
                                node.value = actionResults[modelProviderResultName][column.property]
                              }

                              registry.inputDomNodes[column.property] = node
                            }}
                            onkeyup={(e) => {
                              if (model.properties[column.property].type !== 'file-list' && model.properties[column.property].format !== 'range') {
                                const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                                if (actionResults.errors[errorName] && !actionResults.errors[errorName].isCancelled) {
                                  actions.cancelError({ errorName })

                                  actions[modelUpdaterName]({
                                    caller: 'input',
                                    changedData: {
                                      [column.property]: e.target.value || null
                                    },
                                    existingData: actionResults[modelUpdaterResultName],
                                    errorMessages
                                  })
                                }
                              }
                            }}
                            onchange={(e) => {
                              if (model.properties[column.property].type === 'file-list' || model.properties[column.property].format === 'range') {
                                const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                                if (actionResults.errors[errorName]) {
                                  actions.cancelError({ errorName })
                                }
                              }

                              let value = null

                              if (model.properties[column.property].type === 'file-list') {
                                value = e.target.files
                              } else {
                                value = e.target.value
                              }

                              actions[modelUpdaterName]({
                                caller: 'input',
                                changedData: {
                                  [column.property]: value || null
                                },
                                existingData: actionResults[modelUpdaterResultName],
                                errorMessages
                              })
                            }}/>
                          <div className={externalStyles['invalid-feedback']}>
                            {getInputErrorMessage(column, actionResults.errors, model)}
                          </div>
                        </div>
                      ] : []),
                      ...(!column.customUiControl && isInputText(column, model) ? [
                        <div className={styles['form-group']}>
                          {
                            shouldShowLabels ? <label>{model.properties[column.property].title}</label> : null
                          }
                          <textarea
                            attributes={{
                              ...(column.placeholder ? { placeholder: column.placeholder } : {})
                            }}
                            name={column.inputName || column.property}
                            className={[
                              ...(getInputErrorMessage(column, actionResults.errors, model) ? [styles['is-invalid']] : []),
                              styles['form-control']
                            ].join(' ')}
                            disabled={column.disabled || false}
                            gc-onceDomNodeVisited={(node) => {
                              if (['string', 'number'].includes(typeof actionResults[modelProviderResultName][column.property])) {
                                node.value = actionResults[modelProviderResultName][column.property]
                              }

                              registry.inputDomNodes[column.property] = node
                            }}
                            onkeyup={(e) => {
                              const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                              if (actionResults.errors[errorName] && !actionResults.errors[errorName].isCancelled) {
                                actions.cancelError({ errorName })

                                actions[modelUpdaterName]({
                                  caller: 'input',
                                  changedData: {
                                    [column.property]: e.target.value || null
                                  },
                                  existingData: actionResults[modelUpdaterResultName],
                                  errorMessages
                                })
                              }
                            }}
                            onchange={(e) => {
                              actions[modelUpdaterName]({
                                caller: 'input',
                                changedData: {
                                  [column.property]: e.target.value || null
                                },
                                existingData: actionResults[modelUpdaterResultName],
                                errorMessages
                              })
                            }}/>
                          <div className={externalStyles['invalid-feedback']}>
                            {getInputErrorMessage(column, actionResults.errors, model) ||
                            errorMessages[`${model.properties[column.property].title} is required`]}
                          </div>
                        </div>
                      ] : []),
                      ...(!column.customUiControl && isInputDropdown(column, model) ? [
                        <div className={styles['form-group']}>
                          {
                            shouldShowLabels ? <label>{model.properties[column.property].title}</label> : null
                          }
                          <select
                            name={column.inputName || column.property}
                            className={`${styles['form-control']} ${[
                              ...(getInputErrorMessage(column, actionResults.errors, model) ? [styles['is-invalid']] : []),
                              styles['form-control']
                            ].join(' ')}`}
                            disabled={column.disabled || false}
                            gc-onceDomNodeVisited={(node) => {
                              if (['string', 'number'].includes(typeof actionResults[modelProviderResultName][column.property])) {
                                node.value = actionResults[modelProviderResultName][column.property]
                              }

                              registry.inputDomNodes[column.property] = node
                            }}
                            onchange={(e) => {
                              const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                              if (actionResults.errors[errorName]) {
                                actions.cancelError({ errorName })
                              }

                              actions[modelUpdaterName]({
                                caller: 'input',
                                changedData: {
                                  [column.property]: e.target.value || null
                                },
                                existingData: actionResults[modelUpdaterResultName],
                                errorMessages
                              })
                            }}>
                            <option value="">{choicePromptText}</option>
                            {
                              Object.keys(model.properties[column.property].oneOf.items).map((id) => (
                                <option value={id}>{model.properties[column.property].oneOf.items[id]}</option>
                              ))
                            }
                          </select>
                          <div className={externalStyles['invalid-feedback']}>
                            {getInputErrorMessage(column, actionResults.errors, model)}
                          </div>
                        </div>
                      ] : []),
                      ...(!column.customUiControl && isInputRadioChoice(column, model) ? [
                        <div className={externalStyles['form-group']}>
                          <label>{model.properties[column.property].title}</label>
                          <div className={[
                            styles.checkGroup,
                            ...(getInputErrorMessage(column, actionResults.errors, model) ? [externalStyles['is-invalid']] : [])
                          ].join(' ')}>
                            {
                              Object.keys(model.properties[column.property].oneOf.items).map((id, index) => (
                                <div
                                  className={`${styles['form-check']} ${styles['form-check-inline']}`}>
                                  <input
                                    id={`${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}`}
                                    name={column.property}
                                    type="radio"
                                    className={styles['form-check-input']}
                                    value={id}
                                    disabled={column.disabled || false}
                                    gc-onceDomNodeVisited={(node) => {
                                      if (actionResults[modelProviderResultName][column.property] === id) {
                                        node.checked = true
                                      }

                                      registry.inputDomNodes[column.property] = registry.inputDomNodes[column.property] || []
                                      registry.inputDomNodes[column.property].push(node)
                                    }}
                                    onchange={(e) => {
                                      const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                                      if (actionResults.errors[errorName]) {
                                        actions.cancelError({ errorName })
                                      }

                                      actions[modelUpdaterName]({
                                        caller: 'input',
                                        changedData: {
                                          [column.property]: e.target.value || null
                                        },
                                        existingData: actionResults[modelUpdaterResultName],
                                        errorMessages
                                      })
                                    }}/>
                                  <label
                                    attributes={{
                                      for: `${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}`
                                    }}
                                    className={externalStyles['form-check-label']}>{model.properties[column.property].oneOf.items[id]}</label>
                                </div>
                              ))
                            }
                          </div>
                          <div className={externalStyles['invalid-feedback']}>
                            {getInputErrorMessage(column, actionResults.errors, model)}
                          </div>
                        </div>
                      ] : []),
                      ...(!column.customUiControl && isInputSingleCheckbox(column, model) ? [
                        <div className={`${styles['form-group']} ${styles['form-check']}`}>
                          <input
                            id={`${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}`}
                            type="checkbox"
                            name={column.inputName || column.property}
                            className={[
                              ...(getInputErrorMessage(column, actionResults.errors, model) ? [styles['is-invalid']] : []),
                              styles['form-check-input']
                            ].join(' ')}
                            disabled={column.disabled || false}
                            gc-onceDomNodeVisited={(node) => {
                              if (actionResults[modelProviderResultName][column.property]) {
                                node.checked = true
                              }

                              registry.inputDomNodes[column.property] = node
                            }}
                            onchange={(e) => {
                              const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                              if (actionResults.errors[errorName]) {
                                actions.cancelError({ errorName })
                              }

                              actions[modelUpdaterName]({
                                caller: 'input',
                                changedData: {
                                  [column.property]: e.target.checked
                                },
                                existingData: actionResults[modelUpdaterResultName],
                                errorMessages
                              })
                            }}/>
                          <label
                            attributes={{
                              for: `${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}`
                            }}
                            className={externalStyles['form-check-label']}>
                            {model.properties[column.property].title}
                          </label>
                          <div className={externalStyles['invalid-feedback']}>
                            {getInputErrorMessage(column, actionResults.errors, model)}
                          </div>
                        </div>
                      ] : []),
                      ...(!column.customUiControl && isInputMultiCheckboxChoice(column, model) ? [
                        <div className={externalStyles['form-group']}>
                          <label>{model.properties[column.property].title}</label>
                          <div className={[
                            styles.checkGroup,
                            ...(getInputErrorMessage(column, actionResults.errors, model) ? [externalStyles['is-invalid']] : [])
                          ].join(' ')}>
                            {
                              Object.keys(model.properties[column.property].anyOf.items).map((id, index) => (
                                <div
                                  className={`${styles['form-check']} ${styles['form-check-inline']}`}>
                                  <input
                                    id={`${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}`}
                                    type="checkbox"
                                    className={styles['form-check-input']}
                                    value={id}
                                    disabled={column.disabled || false}
                                    gc-onceDomNodeVisited={(node) => {
                                      if (actionResults[modelProviderResultName][column.property] && actionResults[modelProviderResultName][column.property].includes(id)) {
                                        node.checked = true
                                      }

                                      registry.inputDomNodes[column.property] = registry.inputDomNodes[column.property] || []
                                      registry.inputDomNodes[column.property].push(node)
                                    }}
                                    onchange={(e) => {
                                      const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`
                                      const value = actionResults[modelUpdaterResultName][column.property] || actionResults[modelProviderResultName][column.property] || []

                                      if (actionResults[modelUpdaterResultName][column.property] === null) { // has been reset
                                        value.length = 0
                                      }

                                      if (actionResults.errors[errorName]) {
                                        actions.cancelError({ errorName })
                                      }

                                      if (e.target.checked) {
                                        value.push(e.target.value)
                                      } else {
                                        value.splice(value.indexOf(e.target.value), 1)
                                      }

                                      actions[modelUpdaterName]({
                                        caller: 'input',
                                        changedData: {
                                          [column.property]: value
                                        },
                                        existingData: actionResults[modelUpdaterResultName],
                                        errorMessages
                                      })
                                    }}/>
                                  <label
                                    attributes={{
                                      for: `${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}`
                                    }}
                                    className={externalStyles['form-check-label']}>{model.properties[column.property].anyOf.items[id]}</label>
                                </div>
                              ))
                            }
                          </div>
                          <div className={externalStyles['invalid-feedback']}>
                            {getInputErrorMessage(column, actionResults.errors, model)}
                          </div>
                        </div>
                      ] : []),
                      ...(column.element && !column.shouldPlaceAfterActionButtons ? [normalizeSlot(getSlot({ name: column.element }))] : []),
                      ...(isCustomUiControl(column) ? [[
                        normalizeSlot(getSlot({
                          name: column.customUiControl,
                          value: actionResults[modelProviderResultName][column.property],
                          cancelError: () => {
                            const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                            actions.cancelError({ errorName })
                          },
                          disabled: column.disabled,
                          ExternalFormError,
                          fail: actions.fail,
                          getErrorMessage: () => getInputErrorMessage(column, actionResults.errors, model),
                          hasActiveError: () => {
                            const errorName = `Invalid${capitalizeString(model.name)}${capitalizeString(column.property)}Error`

                            return !!(actionResults.errors[errorName] && !actionResults.errors[errorName].isCancelled)
                          },
                          inputName: column.inputName || column.property,
                          placeholder: column.placeholder,
                          title: column.title,
                          updateValue: (value) => {
                            actions[modelUpdaterName]({
                              caller: 'input',
                              changedData: {
                                [column.property]: value || null
                              },
                              existingData: actionResults[modelUpdaterResultName],
                              errorMessages
                            })
                          }
                        })),
                        <span gc-onceDomNodeVisited={(node) => {
                          node.customUiControlSibling = true
                          registry.inputDomNodes[column.property] = node
                        }}/>
                      ]] : [])
                    ][0]
                  }
                </div>
              ) : null)
            }
          </div>
        ))
      }
      {
        shouldShowResetButton ? normalizeSlot(getSlot({
          name: 'resetButton',
          resetForm: () => handleReset()
        })) || (
          <button
            type="reset"
            className={`${styles.btn} ${externalStyles['btn-secondary']}`}>
            {resetTitle}</button>
        ) : null
      }
      {
        normalizeSlot(getSlot({
          name: 'submitButton',
          submitForm: () => handleSubmit()
        })) || (
          <button
            type="submit"
            className={`${styles.btn} ${externalStyles['btn-primary']}`}>{submitTitle}</button>
        )
      }
      {
        [
          ...(layout.filter(row => (row.find(column => (column.element && column.shouldPlaceAfterActionButtons)))).map(row => (
            <div className={externalStyles.row}>
              {
                row.map((column) => checkDependency(column.dependsOn) ? (
                  <div className={column.width
                    ? column.width.split(' ').reduce((acc, className) => [...acc, externalStyles[className]], []).join(' ')
                    : externalStyles['col-md-12']}>
                    {normalizeSlot(getSlot({ name: column.element }))}
                  </div>
                ) : null)
              }
            </div>
          )))
        ]
      }
    </form>
  )
}
