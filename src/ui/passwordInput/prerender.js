import getTestingData from './getTestingData'
import externalStyles from '@app/styles'
import fa from '@app/fa'
import styles from './styles.css'

export default ({
  inputName = 'password',
  passwordStrengthStages,
  passwordStrongMessage,
  placeholder,
  rememberPasswordQuestion = 'Remember?',
  shouldPreventAutoCompletion = false,
  shouldShowPasswordConsentCheckbox = false,
  shouldShowPasswordStrengthIndicator,
  title = '',
  value = ''
} = getTestingData()) => `
  <div>
    ${
      shouldShowPasswordStrengthIndicator ? `
        <style>
          ${
            passwordStrengthStages.weak.upgradeSteps.map(({ message }, index) => `
              .${styles.isPasswordMegaWeak}[data-${styles.stage}="${index}"] ~ .${styles.invalidFeedback} .${styles.passwordWeakIndicator}:after { content: "${message}" }
            `).join('')
          }
          ${
            passwordStrengthStages.medium.upgradeSteps.map(({ message }, index) => `
              .${styles.isPasswordWeak}[data-${styles.stage}="${index}"] ~ .${styles.invalidFeedback} .${styles.passwordWeakIndicator}:after { content: "${message}" }
            `).join('')
          }
          ${
            passwordStrengthStages.strong.upgradeSteps.map(({ message }, index) => `
              .${styles.isPasswordMedium}[data-${styles.stage}="${index}"] ~ .${styles.passwordMediumIndicator}:after { content: "${message}" }
            `).join('')
          }
          .${styles.isPasswordStrong} ~ .${styles.passwordStrongIndicator}:after { content: "${passwordStrongMessage}" }
        </style>
      ` : ''
    }
    <div class="${externalStyles['form-group']}">
      ${
        title ? (
          `<label>${title}</label>`
        ) : ''
      }
      <div class="${styles.passwordFormGroup}">
        <input
          ${shouldPreventAutoCompletion ? 'autocomplete="new-password"' : ''}
          ${placeholder ? `placeholder="${placeholder}"` : ''}
          type="password"
          name="${inputName}"
          class="${externalStyles['form-control']}"
          value="${value}"/>
        <a href="" class="${styles.passwordToggle}">
          <i class="${`${fa.fa} ${fa['fa-eye']} ${styles.passwordShowIcon}`}"></i>
          <i class="${`${fa.fa} ${fa['fa-eye-slash']} ${styles.passwordHideIcon}`}"></i>
        </a>
        <div class="${externalStyles['invalid-feedback']} ${styles.invalidFeedback}">
          ${shouldShowPasswordStrengthIndicator ? `<span class="${styles.activeError}"></span><span class="${styles.passwordWeakIndicator}"></span>` : ''}
        </div>
        ${
          shouldShowPasswordStrengthIndicator ? `
            <div class="${styles.passwordMediumIndicator}"></span>
            <div class="${styles.passwordStrongIndicator}"></span>
          ` : ''
        }
      </div>
    </div>
    ${
        shouldShowPasswordConsentCheckbox ? `
          <label class="${`${styles.rememberPasswordCheckbox} ${externalStyles['form-group']} ${externalStyles['form-check']}`}">
            <input
              type="checkbox"
              class="${externalStyles['form-check-input']}"/> ${rememberPasswordQuestion}
          </label>
        ` : ''
      }
  </div>
`
