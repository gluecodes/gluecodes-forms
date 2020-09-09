import renderForm from '../form/index.jsx'
import prerenderForm from '../form/prerender'
import uiControlValidationWrapper from '../uiControlValidationWrapper/index.jsx'
import googleReCaptcha from '../googleReCaptcha/index.jsx'
import models from '../../common/providers/getContactFormModels/models.json'
import copy from '../../common/providers/getContactFormCopy/copy.json'

export default ({
  actionResults,
  actions,
  isCalledByPrerender
} = {
  actionResults: {
    errors: {},
    getContactFormCopy: copy.reduce((acc, content) => ({ ...acc, [content]: content }), {}),
    getContactFormModels: models.reduce((acc, model) => ({ ...acc, [model.name]: model }), {})
  },
  isCalledByPrerender: true
}) => ({
  actionResults,
  actions,
  getSlot: (selector) => {
    switch (selector.name) {
      case 'baseForm': {
        return isCalledByPrerender ? prerenderForm : {
          baseForm: renderForm(actionResults.getContactFormRegistry),
          registry: actionResults.getContactFormRegistry
        }
      }
      case 'captcha': {
        const {
          cancelError,
          fail,
          getErrorMessage,
          hasActiveError,
          updateValue,
          ExternalFormError
        } = selector

        if (isCalledByPrerender) {
          return ''
        }

        return uiControlValidationWrapper({
          errorMessage: getErrorMessage(),
          forwardReset: true,
          hasActiveError,
          uiControl: googleReCaptcha({
            onChanged: (response) => {
              cancelError()
              updateValue(response)
            },
            onFailed: (err) => {
              console.error(err)
              fail(new ExternalFormError('Unexpected Google ReCaptcha failure'))
            },
            siteKey: global.GOOGLE_RECAPTCHA_SITE_KEY
          })
        })
      }
      default: {
        return null
      }
    }
  },
  model: actionResults.getContactFormModels.inquiry,
  shouldShowLabels: false
})
