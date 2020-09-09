import googleReCaptcha from '../googleReCaptcha/index.jsx'
import prerenderGoogleReCaptcha from '../googleReCaptcha/prerender'

export default ({ isCalledByPrerender } = { isCalledByPrerender: true }) => ({
  errorMessage: 'Some error example',
  forwardReset: true,
  hasActiveError: true,
  uiControl: isCalledByPrerender ? prerenderGoogleReCaptcha() : googleReCaptcha({
    onChanged: (response) => {
      console.log('token to be verified on server-side:', response)
    },
    onFailed: (err) => {
      console.log('ReCaptcha failure', err)
    },
    siteKey: global.GOOGLE_RECAPTCHA_SITE_KEY
  })
})
