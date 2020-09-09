import getTestingData from './getTestingData'

import externalStyles from '@app/styles'

import styles from './styles.css'

export default ({
  errorMessage,
  hasActiveError,
  uiControl
} = getTestingData()) => `
  <div class="${styles['font-weight-normal']}">
    <style>
      .${styles.uiControl}~.${externalStyles['invalid-feedback']} {display: block}
    </style>
    <div class="${externalStyles['form-group']}">
      ${uiControl}
      ${
        hasActiveError ? `
          <div
            class="${externalStyles['invalid-feedback']}">
            ${errorMessage}
          </div>
        ` : '<div></div>'
      }
    </div>
  </div>
`
