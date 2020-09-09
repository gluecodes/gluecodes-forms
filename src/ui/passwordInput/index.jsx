import externalStyles from '@app/styles'
import fa from '@app/fa'
import styles from './styles.css'

const isBrowserChrome = () => /Chrome\/\d/.test(global.navigator.userAgent)

export default ({
  cancelError,
  getErrorMessage,
  hasActiveError,
  inputName = 'password',
  onPasswordConsentChanged,
  passwordStrengthStages,
  passwordStrongMessage,
  placeholder,
  rememberPasswordQuestion = 'remember?',
  shouldPreventAutoCompletion = false,
  shouldRememberPassword = false,
  shouldShowPasswordStrengthIndicator = false,
  shouldShowPasswordConsentCheckbox = false,
  title,
  updateValue,
  value
}) => (
  <div>
    {
      shouldShowPasswordStrengthIndicator ? (
        <style>
          {
            passwordStrengthStages.weak.upgradeSteps.map(({ message }, index) => `
          .${styles.isPasswordMegaWeak}[data-${styles.stage}="${index}"] ~ .${styles.invalidFeedback} .${styles.passwordWeakIndicator}:after { content: "${message}" }
        `).join('')
          }
          {
            passwordStrengthStages.medium.upgradeSteps.map(({ message }, index) => `
          .${styles.isPasswordWeak}[data-${styles.stage}="${index}"] ~ .${styles.invalidFeedback} .${styles.passwordWeakIndicator}:after { content: "${message}" }
        `).join('')
          }
          {
            passwordStrengthStages.strong.upgradeSteps.map(({ message }, index) => `
          .${styles.isPasswordMedium}[data-${styles.stage}="${index}"] ~ .${styles.passwordMediumIndicator}:after { content: "${message}" }
        `).join('')
          }
          {
            `.${styles.isPasswordStrong} ~ .${styles.passwordStrongIndicator}:after { content: "${passwordStrongMessage}" }`
          }
        </style>
      ) : null
    }

    <div className={externalStyles['form-group']}>
      {
        title ? (
          <label>{title}</label>
        ) : null
      }
      <div className={styles.passwordFormGroup}>
        <input
          attributes={{
            ...(shouldPreventAutoCompletion || !shouldRememberPassword ? { autocomplete: isBrowserChrome() ? 'new-password' : 'off' } : {}),
            ...(placeholder ? { placeholder } : {})
          }}
          type="password"
          name={inputName}
          className={`${hasActiveError() ? `${externalStyles['is-invalid']} ${styles.isInvalid}` : ''} ${externalStyles['form-control']}`}
          gc-onceDomNodeVisited={(node) => {
            node.value = value || ''
          }}
          onkeyup={(e) => {
            let firstIndexFound = -1

            if (shouldShowPasswordStrengthIndicator) {
              if (!passwordStrengthStages.weak.test(e.target.value)) { // mega weak
                passwordStrengthStages.weak.upgradeSteps.some(({ test }, index) => {
                  firstIndexFound = index
                  return !test(e.target.value)
                })

                e.target.classList.remove(styles.isPasswordWeak)
                e.target.classList.remove(styles.isPasswordMedium)
                e.target.classList.remove(styles.isPasswordStrong)
                e.target.classList.add(styles.isPasswordMegaWeak)
                e.target.classList.add(externalStyles['is-invalid'])
                e.target.classList.add(styles.isInvalid)
                e.target.setAttribute(`data-${styles.stage}`, firstIndexFound)
              } else if (!passwordStrengthStages.medium.test(e.target.value)) {
                passwordStrengthStages.medium.upgradeSteps.some(({ test }, index) => { // weak
                  firstIndexFound = index
                  return !test(e.target.value)
                })

                e.target.classList.remove(styles.isPasswordMegaWeak)
                e.target.classList.remove(styles.isPasswordMedium)
                e.target.classList.remove(styles.isPasswordStrong)
                e.target.classList.add(styles.isPasswordWeak)
                e.target.classList.add(externalStyles['is-invalid'])
                e.target.classList.add(styles.isInvalid)
                e.target.setAttribute(`data-${styles.stage}`, firstIndexFound)
              } else if (!passwordStrengthStages.strong.test(e.target.value)) { // medium
                passwordStrengthStages.strong.upgradeSteps.some(({ test }, index) => {
                  firstIndexFound = index
                  return !test(e.target.value)
                })

                e.target.classList.remove(externalStyles['is-invalid'])
                e.target.classList.remove(styles.isInvalid)
                e.target.classList.remove(styles.isPasswordMegaWeak)
                e.target.classList.remove(styles.isPasswordWeak)
                e.target.classList.remove(styles.isPasswordStrong)
                e.target.classList.add(styles.isPasswordMedium)
                e.target.setAttribute(`data-${styles.stage}`, firstIndexFound)
              } else { // strong
                e.target.classList.remove(externalStyles['is-invalid'])
                e.target.classList.remove(styles.isInvalid)
                e.target.classList.remove(styles.isPasswordMegaWeak)
                e.target.classList.remove(styles.isPasswordWeak)
                e.target.classList.remove(styles.isPasswordMedium)
                e.target.classList.add(styles.isPasswordStrong)
                e.target.removeAttribute(`data-${styles.stage}`)
              }
            } else if (hasActiveError()) {
              cancelError()
              updateValue(e.target.value)
            }
          }}
          onblur={(e) => {
            e.target.classList.remove(styles.isPasswordStrong)
          }}
          onchange={(e) => {
            e.target.classList.remove(styles.isPasswordMegaWeak)
            e.target.classList.remove(styles.isPasswordWeak)
            e.target.classList.remove(styles.isPasswordMedium)
            e.target.classList.remove(styles.isPasswordStrong)
            e.target.removeAttribute(`data-${styles.stage}`)

            updateValue(e.target.value)
          }}
          onreset={(e) => {
            e.target.value = e.initialValue
          }}/>
        <a href="" className={styles.passwordToggle} onclick={(e) => {
          const thisLink = e.target.closest('a')

          e.preventDefault()
          thisLink.previousSibling.type = thisLink.previousSibling.type === 'text' ? 'password' : 'text'
        }}>
          <i className={`${fa.fa} ${fa['fa-eye']} ${styles.passwordShowIcon}`}/>
          <i className={`${fa.fa} ${fa['fa-eye-slash']} ${styles.passwordHideIcon}`}/>
        </a>
        <div className={`${externalStyles['invalid-feedback']} ${styles.invalidFeedback}`}>
          <span className={styles.activeError}>{getErrorMessage()}</span>
          {
            shouldShowPasswordStrengthIndicator ? (
              <span className={styles.passwordWeakIndicator}/>
            ) : null
          }
        </div>
        {
          shouldShowPasswordStrengthIndicator ? (
            <div className={styles.passwordMediumIndicator}/>
          ) : null
        }
        {
          shouldShowPasswordStrengthIndicator ? (
            <div className={styles.passwordStrongIndicator}/>
          ) : null
        }
      </div>
      {
        shouldShowPasswordConsentCheckbox ? (
          <label className={`${styles.rememberPasswordCheckbox} ${externalStyles['form-group']} ${externalStyles['form-check']}`}>
            <input
              type="checkbox"
              className={externalStyles['form-check-input']}
              gc-onceDomNodeVisited={(node) => {
                node.checked = shouldRememberPassword
              }}
              onchange={(e) => {
                onPasswordConsentChanged(e.target.checked)
              }}/>{` ${rememberPasswordQuestion}`}
          </label>
        ) : null
      }
    </div>
  </div>
)
