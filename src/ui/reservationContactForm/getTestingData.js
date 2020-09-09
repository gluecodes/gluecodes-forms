import renderForm from '../form/index.jsx'
import prerenderForm from '../form/prerender'
import uiControlValidationWrapper from '../uiControlValidationWrapper/index.jsx'
import googleReCaptcha from '../googleReCaptcha/index.jsx'
import copy from '../../common/providers/getReservationContactFormCopy/copy.json'

export default ({
  actionResults,
  actions,
  isCalledByPrerender
} = {
  actionResults: {
    errors: {},
    getReservationContactFormCopy: copy.reduce((acc, content) => ({ ...acc, [content]: content }), {})
  },
  isCalledByPrerender: true
}) => ({
  actionResults,
  actions,
  getSlot: (selector) => {
    switch (selector.name) {
      case 'baseForm': {
        return isCalledByPrerender ? prerenderForm : {
          baseForm: renderForm(actionResults.getReservationContactFormRegistry),
          registry: actionResults.getReservationContactFormRegistry
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
  model: !isCalledByPrerender ? actionResults.getReservationContactFormModels.reservationInquiry : null,
  reservationDateTime: {
    day: 23,
    month: 10,
    year: 2020,
    hours: 14,
    minutes: 34
  },
  shouldShowLabels: false
})
