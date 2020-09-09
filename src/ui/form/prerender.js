import glueDomPrerenderer from '../../init/glueDomPrerenderer'
import getTestingData from './getTestingData'
import styles from './styles.css'

import {
  formatMappings,
  isCustomUiControl,
  isInputDropdown,
  isInputMultiCheckboxChoice,
  isInputFileList,
  isInputRadioChoice,
  isInputSingleCheckbox,
  isInputStringBased,
  isInputText,
  rewriteInputType,
  capitalizeString,
  getSlotNormalizer
} from './logic'

import externalStyles from '@app/styles'

const normalizeSlot = getSlotNormalizer(glueDomPrerenderer)

export default ({
  actionResults,
  choicePromptText = 'please select...',
  getSlot = () => '',
  layout,
  model,
  resetTitle = 'reset',
  shouldAllowAutoCompletion = true,
  shouldShowLabels = true,
  shouldShowResetButton = true,
  submitTitle = 'submit'
} = getTestingData()) => {
  const modelUpdaterResultName = `change${capitalizeString(model.name)}`
  const modelProviderResultName = `get${capitalizeString(model.name)}`

  actionResults[modelUpdaterResultName] = actionResults[modelUpdaterResultName] || {}
  actionResults[modelProviderResultName] = actionResults[modelProviderResultName] || {}

  const checkDependency = (
    handler
  ) => {
    if (handler) {
      const isUpdaterResultEmpty = Object.getOwnPropertyNames(actionResults[modelUpdaterResultName]).length === 0
      const record = isUpdaterResultEmpty ? actionResults[modelProviderResultName] : (actionResults[modelUpdaterResultName] || {})

      Object.assign(record, { submissionErrors: {} })

      return handler(record)
    }

    return true
  }

  return `
    <form autocomplete="${shouldAllowAutoCompletion ? 'on' : 'off'}" enctype="multipart/form-data" novalidate class="${styles['font-weight-normal']}">
      <div></div>
      <style>
        .${styles.checkGroup}~.${externalStyles['invalid-feedback']} {display: block}
      </style>
      ${
        layout.map((row, rowIndex) => `
          <div class="${externalStyles.row}">
            ${
              row.map((column, columnIndex) => checkDependency(column.dependsOn) ? (`
                <div class="${column.width
                  ? column.width.split(' ').reduce((acc, className) => [...acc, externalStyles[className]], []).join(' ')
                  : externalStyles['col-md-12']}">
                  ${
                    [
                      ...(!column.customUiControl && (isInputStringBased(column, model) || isInputFileList(column, model)) && !isInputText(column, model) ? [`
                        <div class="${styles['form-group']}">
                          ${shouldShowLabels ? `<label>${model.properties[column.property].title}</label>` : ''}
                          <input
                            ${column.placeholder ? `placeholder="${column.placeholder}"` : ''}
                            ${model.properties[column.property].type === 'file-list' && model.properties[column.property].allowMultipleFiles ? 'multiple' : ''}
                            type="${model.properties[column.property].format ? formatMappings[model.properties[column.property].format] : rewriteInputType(model.properties[column.property].type)}"
                            name="${column.inputName || column.property}"
                            class="${[
                              ...(model.properties[column.property].type === 'file-list' ? [styles['form-control-file']] : []),
                              ...(model.properties[column.property].format === 'range' ? [styles['form-control-range']] : []),
                              ...(model.properties[column.property].type !== 'file-list' && model.properties[column.property].format !== 'range' ? [styles['form-control']] : [])
                            ].join(' ')}"
                            value="${actionResults[modelProviderResultName][column.property] || ''}"/>
                          <div class="${externalStyles['invalid-feedback']}">
                          </div>
                        </div>
                      `] : []),
                      ...(!column.customUiControl && isInputText(column, model) ? [`
                        <div class="${styles['form-group']}">
                          ${shouldShowLabels ? `<label>${model.properties[column.property].title}</label>` : ''}
                          <textarea
                            ${column.placeholder ? `placeholder="${column.placeholder}"` : ''}
                            name="${column.inputName || column.property}"
                            class="${styles['form-control']}">${actionResults[modelProviderResultName][column.property] || ''}</textarea>
                          <div class="${externalStyles['invalid-feedback']}">
                          </div>
                        </div>
                      `] : []),
                      ...(!column.customUiControl && isInputDropdown(column, model) ? [`
                        <div class="${styles['form-group']}">
                          ${shouldShowLabels ? `<label>${model.properties[column.property].title}</label>` : ''}
                          <select
                            name="${column.inputName || column.property}"
                            class="${styles['form-control']}">
                            <option value="">${choicePromptText}</option>
                            ${
                              Object.keys(model.properties[column.property].oneOf.items).map((id) => `
                                <option value="${id}" ${actionResults[modelProviderResultName][column.property] === id ? 'selected' : ''}>${model.properties[column.property].oneOf.items[id]}</option>
                              `).join('')
                            }
                          </select>
                          <div class="${externalStyles['invalid-feedback']}">
                          </div>
                        </div>
                      `] : []),
                      ...(!column.customUiControl && isInputRadioChoice(column, model) ? [`
                        <div class="${externalStyles['form-group']}">
                          <label>${model.properties[column.property].title}</label>
                          <div class="${[
                            styles.checkGroup
                          ].join(' ')}">
                            ${
                              Object.keys(model.properties[column.property].oneOf.items).map((id, index) => `
                                <div
                                  class="${styles['form-check']} ${styles['form-check-inline']}">
                                  <input
                                    id="${`${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}`}"
                                    name="${column.property}" 
                                    type="radio"
                                    class="${styles['form-check-input']}"
                                    value="${id}"
                                    ${actionResults[modelProviderResultName][column.property] === id ? 'checked' : ''}/>
                                  <label
                                    for="${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}"
                                    class="${externalStyles['form-check-label']}">${model.properties[column.property].oneOf.items[id]}</label>
                                </div>
                              `).join('')
                            }
                          </div>
                          <div class="${externalStyles['invalid-feedback']}">
                          </div>
                        </div>
                      `] : []),
                      ...(!column.customUiControl && isInputSingleCheckbox(column, model) ? [`
                        <div class="${styles['form-group']} ${styles['form-check']}">
                          <input
                            id="${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}"
                            type="checkbox"
                            name="${column.inputName || column.property}"
                            class="${styles['form-check-input']}"
                            ${actionResults[modelProviderResultName][column.property] ? 'checked' : ''}/>
                          <label
                            for="${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}"
                            class="${externalStyles['form-check-label']}">
                            ${model.properties[column.property].title}
                          </label>
                          <div class="${externalStyles['invalid-feedback']}">
                          </div>
                        </div>
                      `] : []),
                      ...(!column.customUiControl && isInputMultiCheckboxChoice(column, model) ? [`
                        <div class="${externalStyles['form-group']}">
                          <label>${model.properties[column.property].title}</label>
                          <div class="${[
                            styles.checkGroup
                          ].join(' ')}">
                            ${
                              Object.keys(model.properties[column.property].anyOf.items).map((id, index) => `
                                <div
                                  class="${styles['form-check']} ${styles['form-check-inline']}">
                                  <input
                                    id="${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}"
                                    type="checkbox"
                                    class="${styles['form-check-input']}"
                                    value="${id}"
                                    ${actionResults[modelProviderResultName][column.property] && actionResults[modelProviderResultName][column.property].includes(id) ? 'checked' : ''}/>
                                  <label
                                    for="${externalStyles['form-check-input']}_${rowIndex}_${columnIndex}_${index}"
                                    class="${externalStyles['form-check-label']}">${model.properties[column.property].anyOf.items[id]}</label>
                                </div>
                              `).join('')
                            }
                          </div>
                          <div class="${externalStyles['invalid-feedback']}">
                          </div>
                        </div>
                      `] : []),
                      ...(column.element && !column.shouldPlaceAfterActionButtons ? [normalizeSlot(getSlot({ name: column.element }))] : []),
                      ...(isCustomUiControl(column) ? [
                        normalizeSlot(getSlot({
                          name: column.customUiControl,
                          value: actionResults[modelProviderResultName][column.property],
                          disabled: column.disabled,
                          getErrorMessage: () => '',
                          hasActiveError: () => false,
                          inputName: column.inputName || column.property,
                          placeholder: column.placeholder,
                          title: column.title
                        })),
                        '<span></span>'
                      ] : []),
                      ''
                    ][0]
                  }
                </div>
              `) : '').join('')
            }
          </div>
        `).join('')
      }
      ${
        shouldShowResetButton ? normalizeSlot(getSlot({
          name: 'resetButton'
        })) || (`
          <button
            type="reset"
            class="${`${styles.btn} ${externalStyles['btn-secondary']}`}">${resetTitle}</button>
        `) : ''
      }
      ${
        normalizeSlot(getSlot({
          name: 'submitButton'
        })) || (`
          <button
            type="submit"
            class="${`${styles.btn} ${externalStyles['btn-primary']}`}">
            ${submitTitle}</button>
        `)
      }
      ${
        [
          ...(layout.filter(row => (row.find(column => (column.element && column.shouldPlaceAfterActionButtons)))).map(row => `
            <div class="${externalStyles.row}">
              ${
                row.map((column) => checkDependency(column.dependsOn) ? `
                  <div class="${column.width
                    ? column.width.split(' ').reduce((acc, className) => [...acc, externalStyles[className]], []).join(' ')
                    : externalStyles['col-md-12']}">
                    ${normalizeSlot(getSlot({ name: column.element }))}
                  </div>
                ` : '')
              }
            </div>
          `))
        ].join('')
      }
    </form>
  `
}
