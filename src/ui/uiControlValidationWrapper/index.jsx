import externalStyles from '@app/styles'

import styles from './styles.css'

const getResetForwarder = (event) => {
  const resetEvent = new Event('reset', { bubbles: false, cancelable: false })

  resetEvent.initialValue = event.initialValue
  event.target.querySelector(`.${styles.uiControl}`).dispatchEvent(resetEvent)
}

export default ({
  errorMessage,
  forwardReset = true,
  hasActiveError,
  uiControl
}) => (
  <div className={styles['font-weight-normal']} {...(forwardReset ? { onreset: getResetForwarder } : {})}>
    <style>
      {`.${styles.uiControl}~.${externalStyles['invalid-feedback']} {display: block}`}
    </style>
    <div className={externalStyles['form-group']}>
      {uiControl}
      {
        hasActiveError ? (
          <div
            className={externalStyles['invalid-feedback']}
            gc-onceDomNodeVisited={(node) => {
              node.previousSibling.classList.add(styles.uiControl)
            }}>
            {errorMessage}
          </div>
        ) : <div/>
      }
    </div>
  </div>
)
