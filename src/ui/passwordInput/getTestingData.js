const passwordErrors = [
  'very weak, to strengthen add at least 1 lowercase letter',
  'very weak, to strengthen add at least 1 uppercase letter',
  'very weak, to strengthen keep it 6 characters or longer',
  'weak, to strengthen add at least 1 number',
  'medium, to strengthen add at least one special character',
  'medium, to strengthen keep it 10 characters or longer'
]

const getPasswordStrengthStages = messages => ({
  weak: {
    test: password => /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password),
    upgradeSteps: [
      {
        test: password => /^(?=.*[a-z])/.test(password),
        message: messages[passwordErrors[0]]
      },
      {
        test: password => /^(?=.*[A-Z])/.test(password),
        message: messages[passwordErrors[1]]
      },
      {
        test: password => /^(?=.{6,})/.test(password),
        message: messages[passwordErrors[2]]
      }
    ]
  },
  medium: {
    test: password => /^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password),
    upgradeSteps: [
      {
        test: password => /^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))/.test(password),
        message: messages[passwordErrors[3]]
      }
    ]
  },
  strong: {
    // eslint-disable-next-line no-useless-escape
    test: password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"£$%^&*()\-_+=\[\]{};:'@#~,.<>?\\\/])(?=.{10,})/.test(password),
    upgradeSteps: [
      {
        // eslint-disable-next-line no-useless-escape
        test: password => /^(?=.*[!"£$%^&*()\-_+=\[\]{};:'@#~,.<>?\\\/])/.test(password),
        message: messages[passwordErrors[4]]
      },
      {
        test: password => /^(?=.{10,})/.test(password),
        message: messages[passwordErrors[5]]
      }
    ]
  }
})

export default () => ({
  cancelError: () => {},
  getErrorMessage: () => 'Some error',
  hasActiveError: () => true,
  passwordStrengthStages: getPasswordStrengthStages(
    passwordErrors.reduce((acc, message) => ({ ...acc, [message]: message }), {})
  ),
  passwordStrongMessage: 'strong',
  placeholder: 'Password',
  rememberPasswordQuestion: 'Remember?',
  shouldPreventAutoCompletion: false,
  shouldShowPasswordConsentCheckbox: false,
  shouldShowPasswordStrengthIndicator: true,
  // title: 'Password',
  updateValue: () => {},
  value: ''
})
